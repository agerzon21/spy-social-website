public._crate_copies_guard()
CREATE OR REPLACE FUNCTION public._crate_copies_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  -- The launch reset (20261127190000) and its rollback wipe / restore the pre-release rows (transaction-local mark).
  IF pg_catalog.current_setting('spy_social.crate_reset', true) = 'on' AND NOT public._mint_live() THEN   -- 20261202200000
    RETURN COALESCE(NEW, OLD);
  END IF;
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'crate_copies: a copy is never deleted' USING ERRCODE = 'check_violation';
  END IF;
  IF TG_OP = 'INSERT' THEN
    IF NEW.shredded_at IS NOT NULL THEN
      RAISE EXCEPTION 'crate_copies: a copy is born whole' USING ERRCODE = 'check_violation';
    END IF;
    RETURN NEW;
  END IF;
  IF NEW.id IS DISTINCT FROM OLD.id OR NEW.item_kind IS DISTINCT FROM OLD.item_kind OR NEW.item_code IS DISTINCT FROM OLD.item_code
     OR NEW.rarity IS DISTINCT FROM OLD.rarity OR NEW.source IS DISTINCT FROM OLD.source OR (NEW.owning IS DISTINCT FROM OLD.owning AND NOT (OLD.owning AND NOT NEW.owning AND OLD.shredded_at IS NULL AND NEW.shredded_at IS NOT NULL))
     OR NEW.serial IS DISTINCT FROM OLD.serial OR NEW.seed IS DISTINCT FROM OLD.seed OR NEW.pattern IS DISTINCT FROM OLD.pattern
     OR NEW.obtained_at IS DISTINCT FROM OLD.obtained_at
     OR (NEW.user_id IS DISTINCT FROM OLD.user_id AND NEW.user_id IS NOT NULL
         -- 20261202200000: a restore of the minted copy (held again by this account) brings it back
         AND NOT (OLD.user_id IS NULL AND EXISTS (SELECT 1 FROM public.mint_copies m WHERE m.crate_copy_id = OLD.id AND m.holder = NEW.user_id AND m.status = 'held'))
         -- 20261203200000: a trade moves it with its minted copy (this transaction's transfer)
         AND NOT public._crate_transfer_ok(OLD.id, OLD.user_id, NEW.user_id))
     OR (NEW.crate_id IS DISTINCT FROM OLD.crate_id AND NEW.crate_id IS NOT NULL)
     OR (OLD.shredded_at IS NOT NULL AND (NEW.shredded_at IS DISTINCT FROM OLD.shredded_at OR NEW.shred_ledger_id IS DISTINCT FROM OLD.shred_ledger_id))
     OR (OLD.shredded_at IS NULL AND NEW.shredded_at IS NULL AND NEW.shred_ledger_id IS DISTINCT FROM OLD.shred_ledger_id) THEN
    RAISE EXCEPTION 'crate_copies: a copy is kept as minted (only shredded once, or its account or Intercept gone)' USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$function$

public._crate_copy_events_guard()
CREATE OR REPLACE FUNCTION public._crate_copy_events_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  IF pg_catalog.current_setting('spy_social.crate_reset', true) = 'on' AND NOT public._mint_live() THEN   -- 20261202200000
    RETURN COALESCE(NEW, OLD);
  END IF;
  IF TG_OP = 'TRUNCATE' OR TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'crate_copy_events: a copy''s history is never deleted' USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.id IS DISTINCT FROM OLD.id OR NEW.copy_id IS DISTINCT FROM OLD.copy_id OR NEW.at IS DISTINCT FROM OLD.at
     OR NEW.kind IS DISTINCT FROM OLD.kind OR NEW.ref IS DISTINCT FROM OLD.ref OR NEW.reason IS DISTINCT FROM OLD.reason
     OR NEW.mod_action_id IS DISTINCT FROM OLD.mod_action_id OR NEW.backfilled IS DISTINCT FROM OLD.backfilled
     OR NEW.recorded_at IS DISTINCT FROM OLD.recorded_at
     OR (NEW.from_user IS DISTINCT FROM OLD.from_user AND NEW.from_user IS NOT NULL)
     OR (NEW.to_user IS DISTINCT FROM OLD.to_user AND NEW.to_user IS NOT NULL)
     OR (NEW.by_user IS DISTINCT FROM OLD.by_user AND NEW.by_user IS NOT NULL) THEN
    RAISE EXCEPTION 'crate_copy_events: a copy''s history is kept as written (only an account''s deletion clears its id)'
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$function$

public._crate_copy_events_write()
CREATE OR REPLACE FUNCTION public._crate_copy_events_write()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_reset boolean := COALESCE(pg_catalog.current_setting('spy_social.crate_reset', true), '') = 'on';
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- A copy put back by the reset's rollback gets its mint again (its history went with the wipe): backfilled.
    INSERT INTO public.crate_copy_events (copy_id, at, kind, to_user, ref, backfilled)
    VALUES (NEW.id, NEW.obtained_at, 'mint', NEW.user_id,
            CASE NEW.source WHEN 'requisition' THEN 'requisition' END, v_reset);
    RETURN NULL;
  END IF;
  IF v_reset THEN
    RETURN NULL;
  END IF;
  IF OLD.shredded_at IS NULL AND NEW.shredded_at IS NOT NULL THEN
    INSERT INTO public.crate_copy_events (copy_id, at, kind, from_user, ref)
    VALUES (NEW.id, NEW.shredded_at, 'shred', COALESCE(NEW.user_id, OLD.user_id),
            CASE WHEN NEW.shred_ledger_id IS NOT NULL THEN 'ledger:' || NEW.shred_ledger_id::text END);
  END IF;
  -- 20261202200000: the mint's own revoke / restore rows were written just before.
  IF EXISTS (SELECT 1 FROM public.crate_copy_events e WHERE e.copy_id = NEW.id AND e.kind IN ('revoke', 'restore', 'retire') AND e.recorded_at = pg_catalog.now()) THEN   -- (20261207998000) + a void's retire
    RETURN NULL;
  END IF;
  IF OLD.user_id IS NOT NULL AND NEW.user_id IS NULL THEN
    -- The account still there: a trade-up took it in (trade_up is the only path that releases a copy, and writes
    -- its crate_trade_ups row naming it right after). The account gone: its deletion (the FK's SET NULL).
    IF EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = OLD.user_id) THEN
      INSERT INTO public.crate_copy_events (copy_id, at, kind, from_user)
      VALUES (NEW.id, pg_catalog.now(), 'trade_in', OLD.user_id);
    ELSE
      INSERT INTO public.crate_copy_events (copy_id, at, kind) VALUES (NEW.id, pg_catalog.now(), 'retire');
    END IF;
  ELSIF OLD.user_id IS NOT NULL AND NEW.user_id IS NOT NULL AND NEW.user_id <> OLD.user_id THEN
    INSERT INTO public.crate_copy_events (copy_id, at, kind, from_user, to_user)
    VALUES (NEW.id, pg_catalog.now(), 'transfer', OLD.user_id, NEW.user_id);
  END IF;
  RETURN NULL;
END;
$function$

public._crate_log_guard()
CREATE OR REPLACE FUNCTION public._crate_log_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
DECLARE
  v_old jsonb;
  v_new jsonb;
  v_key text;
BEGIN
  -- The launch reset (20261127190000) and its rollback wipe / restore the pre-release rows (transaction-local mark).
  IF pg_catalog.current_setting('spy_social.crate_reset', true) = 'on' AND NOT public._mint_live() THEN   -- 20261202200000
    RETURN COALESCE(NEW, OLD);
  END IF;
  IF TG_OP = 'DELETE' THEN
    IF TG_TABLE_NAME = 'crate_wins' AND NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = OLD.user_id) THEN
      RETURN OLD;
    END IF;
    RAISE EXCEPTION '%: kept for audits, never deleted', TG_TABLE_NAME USING ERRCODE = 'check_violation';
  END IF;
  v_old := pg_catalog.to_jsonb(OLD);
  v_new := pg_catalog.to_jsonb(NEW);
  FOR v_key IN SELECT k.key FROM pg_catalog.jsonb_object_keys(v_old) AS k(key) LOOP
    IF v_new -> v_key IS DISTINCT FROM v_old -> v_key
       AND NOT (v_key IN ('user_id', 'crate_id', 'grant_id') AND pg_catalog.jsonb_typeof(v_new -> v_key) = 'null') THEN
      RAISE EXCEPTION '%: kept as written (% can''t change)', TG_TABLE_NAME, v_key USING ERRCODE = 'check_violation';
    END IF;
  END LOOP;
  RETURN NEW;
END;
$function$

public._crate_trade_ups_guard()
CREATE OR REPLACE FUNCTION public._crate_trade_ups_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  -- The launch reset (20261127190000) and its rollback wipe / restore the pre-release rows (transaction-local mark).
  IF pg_catalog.current_setting('spy_social.crate_reset', true) = 'on' AND NOT public._mint_live() THEN   -- 20261202200000
    RETURN COALESCE(NEW, OLD);
  END IF;
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'crate_trade_ups: kept for audits, never deleted' USING ERRCODE = 'check_violation';
  END IF;
  IF (pg_catalog.to_jsonb(NEW) - 'user_id') IS DISTINCT FROM (pg_catalog.to_jsonb(OLD) - 'user_id')
     OR (NEW.user_id IS DISTINCT FROM OLD.user_id AND NEW.user_id IS NOT NULL) THEN
    RAISE EXCEPTION 'crate_trade_ups: kept as written (a key goes NULL with its account, nothing else changes)'
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$function$

public._events_gamenight_lock()
CREATE OR REPLACE FUNCTION public._events_gamenight_lock()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
DECLARE
  v_now timestamptz := pg_catalog.now();
BEGIN
  IF OLD.format IS DISTINCT FROM 'tables' OR OLD.starts_at > v_now THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'night_started: a Game Night that has started is never deleted (its prizes are on record)'
      USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.format IS DISTINCT FROM OLD.format OR NEW.link_id IS DISTINCT FROM OLD.link_id
     OR NEW.starts_at IS DISTINCT FROM OLD.starts_at
     OR (NEW.gn -> 'titles') IS DISTINCT FROM (OLD.gn -> 'titles') THEN
    RAISE EXCEPTION 'night_started: a started Game Night keeps its start, its link and its titles'
      USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.ends_at IS DISTINCT FROM OLD.ends_at
     AND (OLD.ends_at <= v_now OR NEW.ends_at > OLD.ends_at OR NEW.ends_at < v_now - interval '2 minutes') THEN
    RAISE EXCEPTION 'night_started: a started Game Night''s end may only move earlier, to now or later, while it runs'
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$function$

public._gamenight_bonus_title(uuid,uuid,uuid,text,uuid)
CREATE OR REPLACE FUNCTION public._gamenight_bonus_title(p_event uuid, p_game uuid, p_user uuid, p_code text, p_by uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  e       public.events;
  mg      public.match_games;
  v_found timestamptz;
  v_n     integer;
  v_coll  text;
BEGIN
  SELECT * INTO e FROM public.events x WHERE x.id = p_event;
  SELECT * INTO mg FROM public.match_games x WHERE x.game_id = p_game;
  SELECT o.created_at INTO v_found FROM public.match_offers o WHERE o.game_id = p_game ORDER BY o.id LIMIT 1;
  IF e.id IS NULL OR p_code IS NULL OR p_code IS DISTINCT FROM e.gn #>> '{titles,bonus,code}'
     OR NOT EXISTS (SELECT 1 FROM public.titles t WHERE t.code = p_code AND t.unlock ->> 'type' = 'event' AND t.unlock ->> 'code' = e.link_id) THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'no_bonus');
  END IF;
  IF e.published_at IS NULL OR e.cancelled_at IS NOT NULL
     OR pg_catalog.now() < e.starts_at OR pg_catalog.now() >= e.ends_at + interval '3 hours'
     OR mg.game_id IS NULL OR mg.event_id IS DISTINCT FROM e.id OR mg.dealt_at < e.starts_at
     OR NOT (mg.dealt_at < e.ends_at OR COALESCE(v_found < e.ends_at, false)) THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'night_closed');
  END IF;
  -- 20261202200000 (Phase 1): the pick recorded first (owner_gamenight_bonus's own insert then finds it), the copy minted.
  INSERT INTO public.gamenight_bonus (event_id, user_id, game_id, room_id, granted_by, kind, code)
  VALUES (e.id, p_user, p_game, (SELECT g.room_id FROM public.games g WHERE g.id = p_game), p_by, 'title', p_code)
  ON CONFLICT (event_id, user_id) DO NOTHING;
  IF public._mint_live() THEN
    SELECT c.code INTO v_coll FROM public.mint_collectibles c JOIN public.mint_sets s ON s.code = c.set_code
     WHERE s.event_id = e.id AND c.rule = 'gn_bonus';
    IF v_coll IS NULL THEN
      RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'no_bonus');
    END IF;
    BEGIN
      PERFORM public._mint_issue(v_coll, p_user, 'live', '{}'::jsonb);
    EXCEPTION WHEN check_violation OR unique_violation THEN
      RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'night_closed');
    END;
  END IF;
  INSERT INTO public.player_titles AS g (user_id, title_code, source, ref, granted_by, unlocked_at)
  VALUES (p_user, p_code, 'event', e.link_id, p_by, pg_catalog.now())
  ON CONFLICT (user_id, title_code) DO UPDATE
     SET source = EXCLUDED.source, ref = EXCLUDED.ref, granted_by = EXCLUDED.granted_by,
         unlocked_at = EXCLUDED.unlocked_at, revoked_at = NULL
   WHERE g.revoked_at IS NOT NULL;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    INSERT INTO public.mod_actions (actor_id, source, action, target_user_id, reason, details)
    VALUES (p_by, 'app', 'title_grant', p_user, 'Game Night bonus', pg_catalog.jsonb_build_object('title', p_code, 'event_id', e.id, 'game_id', p_game));
  END IF;
  RETURN pg_catalog.jsonb_build_object('ok', true, 'granted', v_n > 0);
END;
$function$

public._gamenight_grant(uuid,uuid,text,uuid,text)
CREATE OR REPLACE FUNCTION public._gamenight_grant(p_event_id uuid, p_user_id uuid, p_via text, p_game_id uuid, p_slot text)
 RETURNS boolean
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
DECLARE
  e       public.events;
  mg      public.match_games;
  v_code  text;
  v_found timestamptz;
  v_n     integer;
  v_coll  text;
BEGIN
  SELECT * INTO e FROM public.events x WHERE x.id = p_event_id;
  v_code := e.gn #>> ARRAY['titles', p_slot, 'code'];
  IF e.id IS NULL OR v_code IS NULL OR NOT EXISTS (SELECT 1 FROM public.titles t WHERE t.code = v_code) THEN
    RETURN false;
  END IF;
  -- 20261202100000 (minted collectibles): the window, whoever calls.
  IF e.published_at IS NULL OR e.cancelled_at IS NOT NULL
     OR pg_catalog.now() < e.starts_at OR pg_catalog.now() >= e.ends_at + interval '3 hours'
     OR NOT EXISTS (SELECT 1 FROM public.titles t WHERE t.code = v_code AND t.unlock ->> 'type' = 'event' AND t.unlock ->> 'code' = e.link_id) THEN
    RETURN false;
  END IF;
  IF p_via = 'game' THEN
    SELECT * INTO mg FROM public.match_games x WHERE x.game_id = p_game_id;
    SELECT o.created_at INTO v_found FROM public.match_offers o WHERE o.game_id = p_game_id ORDER BY o.id LIMIT 1;
    IF mg.game_id IS NULL OR mg.event_id IS DISTINCT FROM e.id OR mg.dealt_at < e.starts_at
       OR NOT (mg.dealt_at < e.ends_at OR COALESCE(v_found < e.ends_at, false)) THEN
      RETURN false;
    END IF;
  ELSIF p_via IS DISTINCT FROM 'last_table' OR p_slot IS DISTINCT FROM 'participation' THEN
    RETURN false;
  END IF;
  -- (game_night_1103) Already theirs (a later game of the night): nothing to mint, no lock taken.
  IF EXISTS (SELECT 1 FROM public.gamenight_prizes gp WHERE gp.event_id = p_event_id AND gp.user_id = p_user_id AND gp.slot = p_slot) THEN
    RETURN false;
  END IF;
  BEGIN
    -- (game_night_1103) Tables ending together: a game holding one title's row wanted another's a player with the first
    -- title had taken, a deadlock (or the scoring's 3 s lock wait ran out), and the prize was lost for good. The night's
    -- rows always in the same order, so no deadlock; a lock still busy answers NULL (try again), never false.
    IF public._mint_live() THEN
      PERFORM 1 FROM public.mint_collectibles c JOIN public.mint_sets s ON s.code = c.set_code
        WHERE s.event_id = e.id ORDER BY c.code FOR UPDATE OF c;
    END IF;
    INSERT INTO public.gamenight_prizes (event_id, user_id, slot, via, game_id, kind, code)
    VALUES (p_event_id, p_user_id, p_slot, p_via, p_game_id, 'title', v_code)
    ON CONFLICT (event_id, user_id, slot) DO NOTHING;
    GET DIAGNOSTICS v_n = ROW_COUNT;
    IF v_n = 0 THEN
      RETURN false;
    END IF;
    -- 20261202200000 (Phase 1): once the ledger is live, the copy is minted before the title is written.
    IF public._mint_live() THEN
      SELECT c.code INTO v_coll FROM public.mint_collectibles c JOIN public.mint_sets s ON s.code = c.set_code
       WHERE s.event_id = e.id AND c.rule = CASE p_slot WHEN 'participation' THEN 'gn_participation' WHEN 'local' THEN 'gn_local' ELSE 'gn_spy' END;
      IF v_coll IS NULL THEN
        RAISE EXCEPTION 'mint: night % has no % collectible (not defined)', e.link_id, p_slot;
      END IF;
      PERFORM public._mint_issue(v_coll, p_user_id, 'live', '{}'::jsonb);
    END IF;
    INSERT INTO public.player_titles AS t (user_id, title_code, source, ref, granted_by, unlocked_at)
    VALUES (p_user_id, v_code, 'event', e.link_id, NULL, pg_catalog.now())
    ON CONFLICT (user_id, title_code) DO UPDATE
       SET source = EXCLUDED.source, ref = EXCLUDED.ref, granted_by = NULL, unlocked_at = EXCLUDED.unlocked_at, revoked_at = NULL
     WHERE t.revoked_at IS NOT NULL;
  EXCEPTION WHEN lock_not_available OR deadlock_detected THEN
    RAISE WARNING '_gamenight_grant(%, %, %): busy, tried again: %', e.link_id, p_user_id, p_slot, SQLERRM;
    RETURN NULL;
  WHEN OTHERS THEN
    RAISE WARNING '_gamenight_grant(%, %, %): not granted: %', e.link_id, p_user_id, p_slot, SQLERRM;
    RETURN false;
  END;
  INSERT INTO public.owner_grant_notices AS n (user_id, granted_by, kind, code, days, by_name, room_id)
  VALUES (p_user_id, NULL, 'title', v_code, NULL, 'Game Night', NULL)
  ON CONFLICT (user_id, kind, (COALESCE(code, ''))) WHERE seen_at IS NULL DO NOTHING;
  RETURN true;
END;
$function$

public._gamenight_judge(uuid,uuid)
CREATE OR REPLACE FUNCTION public._gamenight_judge(p_game_id uuid, p_user_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 STABLE
 SET search_path TO ''
AS $function$
DECLARE
  mg      public.match_games;
  e       public.events;
  gs      public.game_stats;
  st      public.game_player_stats;
  v_zero  text;
  v_found timestamptz;
  v_acts  integer;
  v_ch    integer;
BEGIN
  SELECT * INTO mg FROM public.match_games x WHERE x.game_id = p_game_id;
  SELECT * INTO e FROM public.events x WHERE x.id = mg.event_id;
  IF e.id IS NULL THEN
    RETURN NULL;
  END IF;
  -- Started inside the window (owner, D9 / answer 8): dealt in it, or matched in it and dealt after its READYs.
  SELECT o.created_at INTO v_found FROM public.match_offers o WHERE o.game_id = p_game_id ORDER BY o.id LIMIT 1;
  IF mg.dealt_at < e.starts_at OR NOT (mg.dealt_at < e.ends_at OR COALESCE(v_found < e.ends_at, false)) THEN
    RETURN 'late';
  END IF;
  IF public._gamenight_excluded_user(p_user_id) THEN
    RETURN 'excluded';
  END IF;
  SELECT * INTO gs FROM public.game_stats x WHERE x.game_id = p_game_id;
  SELECT * INTO st FROM public.game_player_stats x WHERE x.game_id = p_game_id AND x.user_id = p_user_id;
  IF gs.game_id IS NULL OR st.game_id IS NULL THEN
    RETURN NULL;   -- not scored yet
  END IF;
  SELECT a.factors ->> 'zero' INTO v_zero FROM public.xp_awards a WHERE a.game_id = p_game_id AND a.user_id = p_user_id;
  IF st.seat IN ('left', 'kicked')
     OR EXISTS (SELECT 1 FROM public.game_players gp WHERE gp.game_id = p_game_id AND gp.user_id = p_user_id
                                                     AND gp.elimination_status::text IN ('left', 'kicked')) THEN
    RETURN 'left';
  END IF;
  IF st.seat = 'parallel' OR v_zero IN ('farm', 'flagged', 'parallel')
     OR EXISTS (SELECT 1 FROM public.stats_flags f WHERE f.game_id = p_game_id AND f.user_id = p_user_id
                                                   AND f.rule NOT IN ('alt_farm', 'quick_farm'))
     OR (public._active_sanction(p_user_id, 'ban')).id IS NOT NULL THEN
    RETURN 'flagged';
  END IF;
  IF gs.winner IS NULL
     AND NOT COALESCE('early_spy_leave' = ANY (pg_catalog.string_to_array(gs.stats_note, ','))
                      OR 'early_locals_leave' = ANY (pg_catalog.string_to_array(gs.stats_note, ',')), false) THEN
    RETURN 'no_result';
  END IF;
  IF st.seat IN ('absent', 'away') OR NOT COALESCE(st.showed_up, true) THEN
    RETURN 'no_action';
  END IF;
  v_acts := COALESCE(st.questions_asked, 0) + COALESCE(st.answers_given, 0) + COALESCE(st.ballots_cast, 0)
            + COALESCE(st.votes_called, 0) + CASE WHEN st.solve_attempted THEN 1 ELSE 0 END
            + CASE WHEN st.called_it IS NOT NULL THEN 1 ELSE 0 END + CASE WHEN COALESCE(st.strokes, 0) > 0 THEN 1 ELSE 0 END;
  v_ch := COALESCE(st.turns_offered, 0)
          + LEAST(GREATEST(COALESCE(st.votes_offered, 0) - CASE WHEN st.final_status = 'eliminated_vote' THEN 1 ELSE 0 END, 0), 1);
  IF v_acts = 0 AND v_ch > 0 THEN
    RETURN 'no_action';
  END IF;
  RETURN 'ok';
END;
$function$

public._holder_age_band(uuid)
CREATE OR REPLACE FUNCTION public._holder_age_band(p_user uuid)
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT CASE WHEN p_user IS NULL THEN NULL
              WHEN a.birth_year IS NULL THEN 'unknown'
              WHEN a.birth_year <= (pg_catalog.date_part('year', pg_catalog.now() AT TIME ZONE 'UTC'))::integer - 19 THEN 'adult'
              ELSE 'under_18' END
    FROM (SELECT 1) AS one
    LEFT JOIN public.age_screens a ON a.user_id = p_user
$function$

public._holder_secret(uuid)
CREATE OR REPLACE FUNCTION public._holder_secret(p_user uuid)
 RETURNS bytea
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v bytea;
BEGIN
  IF p_user IS NULL THEN
    RETURN NULL;
  END IF;
  SELECT s.secret INTO v FROM public.holder_secrets s WHERE s.user_id = p_user;
  IF v IS NULL THEN
    INSERT INTO public.holder_secrets (user_id, secret) VALUES (p_user, extensions.gen_random_bytes(32))
    ON CONFLICT (user_id) DO NOTHING;
    SELECT s.secret INTO v FROM public.holder_secrets s WHERE s.user_id = p_user;
  END IF;
  RETURN v;
END;
$function$

public._holder_tag(uuid,bigint)
CREATE OR REPLACE FUNCTION public._holder_tag(p_user uuid, p_copy_id bigint)
 RETURNS text
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT CASE WHEN p_user IS NULL OR p_copy_id IS NULL THEN NULL
              ELSE 'h:' || pg_catalog.left(pg_catalog.encode(extensions.hmac(pg_catalog.convert_to(p_copy_id::text, 'UTF8'),
                                                                               public._holder_secret(p_user), 'sha256'), 'hex'), 12) END
$function$

public._mint_beta(uuid,text)
CREATE OR REPLACE FUNCTION public._mint_beta(p_user uuid, p_which text)
 RETURNS bigint
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT public._mint_issue(CASE p_which WHEN 'pin' THEN 'beta.test.beta_pin' WHEN 'field_tester' THEN 'beta.test.field_tester' END,
                            p_user, 'beta_regrant', '{}'::jsonb)
$function$

public._mint_beta_earned(uuid)
CREATE OR REPLACE FUNCTION public._mint_beta_earned(p_user uuid)
 RETURNS timestamp with time zone
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_cap    timestamptz;
  v_earned timestamptz;
BEGIN
  IF pg_catalog.to_regclass('public.beta_testers_2_2') IS NULL THEN
    RETURN NULL;
  END IF;
  EXECUTE 'SELECT LEAST(b.captured_at, b.topped_up_at) FROM public.beta_testers_2_2 b WHERE b.user_id = $1' INTO v_cap USING p_user;
  SELECT LEAST(
           (SELECT pg_catalog.min((r.before ->> 'unlocked_at')::timestamptz) FROM public.crate_revocations r
             WHERE r.user_id = p_user AND r.batch = 'beta_regrant_2_2' AND r.what IN ('avatar_unlock', 'title_unlock')
               AND r.item_code IN ('accessory_beta_pin', 'code_pvsysb2et7') AND (r.before ->> 'revoked_at') IS NULL),
           (SELECT pg_catalog.min(u.unlocked_at) FROM public.player_avatar_unlocks u
             WHERE u.user_id = p_user AND u.item_code = 'accessory_beta_pin' AND u.ref = 'beta_2026'),
           (SELECT pg_catalog.min(x.redeemed_at) FROM public.reward_code_redemptions x JOIN public.reward_codes q ON q.id = x.code_id
             WHERE x.user_id = p_user AND q.code ~ '^BETATESTING([1-9]|10)?$'),
           v_cap)
    INTO v_earned;
  v_earned := COALESCE(v_earned, v_cap);
  IF v_earned >= public._launch_date('launch_at') THEN
    v_earned := LEAST(v_cap, public._launch_date('launch_at') - interval '1 second');
  END IF;
  RETURN v_earned;
END;
$function$

public._mint_burn(bigint,text,jsonb)
CREATE OR REPLACE FUNCTION public._mint_burn(p_copy_id bigint, p_reason text, p_evidence jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  IF p_reason IS NULL OR p_reason NOT IN ('cheating', 'error') THEN
    RAISE EXCEPTION 'mint burn: the reason is cheating or error' USING ERRCODE = 'invalid_parameter_value';
  END IF;
  IF p_evidence IS NULL OR pg_catalog.jsonb_typeof(p_evidence) <> 'object' OR p_evidence = '{}'::jsonb THEN
    RAISE EXCEPTION 'mint burn: evidence (a case or an incident) is required' USING ERRCODE = 'invalid_parameter_value';
  END IF;
  IF NOT public._mint_live() THEN
    RAISE EXCEPTION 'mint burn: the ledger is not live' USING ERRCODE = 'object_not_in_prerequisite_state';
  END IF;
  UPDATE public.mint_copies m SET status = 'burned', burn_reason = p_reason, burn_evidence = p_evidence
   WHERE m.id = p_copy_id AND m.status = 'held';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'mint burn: copy % is not held', p_copy_id USING ERRCODE = 'no_data_found';
  END IF;
  PERFORM public._mint_drain(true, 100000);
  RETURN (SELECT m.burn_seq FROM public.mint_copies m WHERE m.id = p_copy_id);
END;
$function$

public._mint_close_now(text)
CREATE OR REPLACE FUNCTION public._mint_close_now(p_code text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  c     public.mint_collectibles;
  v_dig text;
BEGIN
  SELECT * INTO c FROM public.mint_collectibles x WHERE x.code = p_code FOR UPDATE;
  IF c.code IS NULL OR c.closed_at IS NOT NULL THEN
    RETURN false;
  END IF;
  SELECT public._mint_sha256(COALESCE(pg_catalog.string_agg(x.serial::text || '=' || x.evidence_sha256, ',' ORDER BY x.serial), ''))
    INTO v_dig FROM public.mint_copies x WHERE x.collectible = c.code;
  UPDATE public.mint_collectibles x SET closed_at = pg_catalog.now(), closes_at = LEAST(x.closes_at, GREATEST(x.opens_at, pg_catalog.now()))
   WHERE x.code = c.code;
  PERFORM public._mint_queue('close', c.code, NULL, '', '',
            'supply:' || c.minted::text || ';burned:' || c.burned::text || ';held:'
            || (SELECT pg_catalog.count(*) FROM public.mint_copies x WHERE x.collectible = c.code AND x.status = 'held')::text
            || CASE WHEN c.minted = 0 THEN ';never_awarded' ELSE '' END,
            pg_catalog.jsonb_build_object('evidence', v_dig));
  IF NOT EXISTS (SELECT 1 FROM public.mint_collectibles x WHERE x.set_code = c.set_code AND x.closed_at IS NULL) THEN
    UPDATE public.mint_sets s SET closed_at = pg_catalog.now() WHERE s.code = c.set_code AND s.closed_at IS NULL;
  END IF;
  RETURN true;
END;
$function$

public._mint_collectibles_guard()
CREATE OR REPLACE FUNCTION public._mint_collectibles_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  -- Before the chain starts nothing is public yet: definitions are drafts (a launch-hour file's rollback may undo them).
  IF NOT public._mint_started() THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  IF TG_OP = 'DELETE' THEN
    IF OLD.minted > 0 OR OLD.define_seq IS NOT NULL OR public._mint_started() THEN
      RAISE EXCEPTION 'mint_collectibles: a defined collectible is never deleted' USING ERRCODE = 'check_violation';
    END IF;
    RETURN OLD;
  END IF;
  IF OLD.closed_at IS NOT NULL AND (NEW.closed_at IS DISTINCT FROM OLD.closed_at OR NEW.closes_at IS DISTINCT FROM OLD.closes_at
                                    OR NEW.minted <> OLD.minted) THEN
    RAISE EXCEPTION 'mint_collectibles: % is closed', OLD.code USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.code IS DISTINCT FROM OLD.code OR NEW.defined_at IS DISTINCT FROM OLD.defined_at
     OR (OLD.define_seq IS NOT NULL AND NEW.define_seq IS DISTINCT FROM OLD.define_seq AND NEW.define_hash IS NOT DISTINCT FROM OLD.define_hash)
     OR (OLD.close_seq IS NOT NULL AND NEW.close_seq IS DISTINCT FROM OLD.close_seq) THEN
    RAISE EXCEPTION 'mint_collectibles: % keeps its code and its stamps', OLD.code USING ERRCODE = 'check_violation';
  END IF;
  IF (OLD.opens_at <= pg_catalog.now() OR OLD.minted > 0)
     AND (NEW.rule IS DISTINCT FROM OLD.rule OR NEW.rule_args IS DISTINCT FROM OLD.rule_args OR NEW.item_kind IS DISTINCT FROM OLD.item_kind
          OR NEW.item_code IS DISTINCT FROM OLD.item_code OR NEW.variant IS DISTINCT FROM OLD.variant OR NEW.set_code IS DISTINCT FROM OLD.set_code
          OR NEW.opens_at IS DISTINCT FROM OLD.opens_at OR (NEW.how ->> 'en') IS DISTINCT FROM (OLD.how ->> 'en')
          OR NEW.tradable IS DISTINCT FROM OLD.tradable OR NEW.grace IS DISTINCT FROM OLD.grace) THEN
    RAISE EXCEPTION 'mint_collectibles: % is open: its rule, item, start and text are frozen', OLD.code USING ERRCODE = 'check_violation';
  END IF;
  IF (OLD.opens_at <= pg_catalog.now() OR OLD.minted > 0) AND NEW.closes_at IS DISTINCT FROM OLD.closes_at
     AND (NEW.closes_at > OLD.closes_at OR NEW.closes_at < LEAST(OLD.closes_at, pg_catalog.now() - interval '2 minutes')) THEN
    RAISE EXCEPTION 'mint_collectibles: %''s end may only move earlier, to now or later', OLD.code USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.minted < OLD.minted AND public._mint_started() THEN
    RAISE EXCEPTION 'mint_collectibles: % never mints fewer', OLD.code USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$function$

public._mint_copies_after_insert()
CREATE OR REPLACE FUNCTION public._mint_copies_after_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  PERFORM public._mint_queue('mint', NEW.collectible, NEW.id, '', COALESCE(NEW.holder_tag, ''),
            NEW.reason || ':' || (SELECT c.rule FROM public.mint_collectibles c WHERE c.code = NEW.collectible)
            -- 20261204140000: a code's Intercept names its code on the public row
            || COALESCE(':code=' || (NEW.evidence ->> 'code'), ''));
  IF NEW.holder IS NULL THEN
    -- A retro copy whose holder's account is gone: minted, then retired.
    UPDATE public.mint_copies x SET status = 'retired', status_at = pg_catalog.now() WHERE x.id = NEW.id;
  END IF;
  RETURN NULL;
END;
$function$

public._mint_copies_after_update()
CREATE OR REPLACE FUNCTION public._mint_copies_after_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  c public.mint_collectibles;
BEGIN
  IF NEW.status IS NOT DISTINCT FROM OLD.status THEN
    RETURN NULL;
  END IF;
  SELECT * INTO c FROM public.mint_collectibles x WHERE x.code = NEW.collectible;
  IF NEW.status = 'burned' THEN
    UPDATE public.mint_collectibles x SET burned = x.burned + 1 WHERE x.code = c.code AND x.closed_at IS NULL;
    IF c.closed_at IS NOT NULL THEN
      UPDATE public.mint_collectibles x SET burned = x.burned + 1 WHERE x.code = c.code;
    END IF;
    PERFORM public._mint_queue('burn', NEW.collectible, NEW.id, COALESCE(OLD.holder_tag, ''), '', 'burn:' || NEW.burn_reason);
    PERFORM public._mint_unlock_follow(NEW, false);
  ELSIF NEW.status = 'retired' THEN
    PERFORM public._mint_queue('retire', NEW.collectible, NEW.id, COALESCE(OLD.holder_tag, ''), '',
                               CASE WHEN public._mint_void_ok(OLD) THEN 'retire:deleted_counterparty' ELSE 'retire:account_closed' END);   -- (20261207998000)
  ELSIF OLD.status = 'burned' AND NEW.status = 'held' THEN
    UPDATE public.mint_collectibles x SET burned = x.burned - 1 WHERE x.code = c.code;
    PERFORM public._mint_queue('restore', NEW.collectible, NEW.id, '', COALESCE(NEW.holder_tag, ''), 'restore:' || COALESCE(OLD.burn_seq::text, 'queued'));
    PERFORM public._mint_unlock_follow(NEW, true);
  END IF;
  RETURN NULL;
END;
$function$

public._mint_copies_commit()
CREATE OR REPLACE FUNCTION public._mint_copies_commit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  m  public.mint_copies;
  cc public.crate_copies;
  t  public.crate_trade_ups;
  v  jsonb;
BEGIN
  SELECT * INTO m FROM public.mint_copies x WHERE x.id = NEW.id;
  IF m.evidence_sha256 = '' THEN
    SELECT * INTO cc FROM public.crate_copies x WHERE x.id = m.crate_copy_id;
    SELECT * INTO t FROM public.crate_trade_ups x WHERE x.copy_id = m.crate_copy_id;
    IF cc.id IS NULL OR t.id IS NULL OR cc.source <> 'trade_up' OR t.user_id IS DISTINCT FROM m.holder THEN
      RAISE EXCEPTION 'mint_refused: copy % (a trade-up) has no trade-up row naming it', m.id USING ERRCODE = 'check_violation';
    END IF;
    -- its inputs' pending burns first, so they name this trade-up
    UPDATE public.mint_copies x SET burn_evidence = pg_catalog.jsonb_build_object('rule', 'trade_up', 'trade_up', t.id, 'into', m.id)
     WHERE x.crate_copy_id = ANY (t.input_ids) AND x.status = 'burned' AND x.burn_reason = 'trade_up' AND x.burn_evidence_sha256 = '';
    v := public._mint_trade_up_evidence(t, cc);
    UPDATE public.mint_copies x
       SET evidence = (v -> 'evidence') || pg_catalog.jsonb_build_object('collectible', x.collectible, 'holder', x.holder_tag),
           evidence_sha256 = public._mint_sha256(((v -> 'evidence') || pg_catalog.jsonb_build_object('collectible', x.collectible, 'holder', x.holder_tag))::text),
           tradable = COALESCE((v ->> 'tradable')::boolean, false)
     WHERE x.id = m.id;
  ELSIF m.status = 'burned' AND m.burn_evidence_sha256 = '' THEN
    SELECT * INTO t FROM public.crate_trade_ups x WHERE m.crate_copy_id = ANY (x.input_ids);
    IF t.id IS NULL THEN
      RAISE EXCEPTION 'mint_refused: copy % was traded in, but no trade-up names it', m.id USING ERRCODE = 'check_violation';
    END IF;
    UPDATE public.mint_copies x SET burn_evidence = pg_catalog.jsonb_build_object('rule', 'trade_up', 'trade_up', t.id,
             'into', (SELECT y.id FROM public.mint_copies y WHERE y.crate_copy_id = t.copy_id))
     WHERE x.id = m.id;
  END IF;
  RETURN NULL;
END;
$function$

public._mint_copies_insert()
CREATE OR REPLACE FUNCTION public._mint_copies_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  c   public.mint_collectibles;
  v   jsonb;
  v_e timestamptz;
BEGIN
  SELECT * INTO c FROM public.mint_collectibles x WHERE x.code = NEW.collectible FOR UPDATE;
  IF c.code IS NULL THEN
    RAISE EXCEPTION 'mint_refused: no collectible %', NEW.collectible USING ERRCODE = 'check_violation';
  END IF;
  IF c.closed_at IS NOT NULL THEN
    RAISE EXCEPTION 'mint_refused: % is closed (ledger entry %)', c.code, c.close_seq USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.reason IS DISTINCT FROM 'live' AND public._mint_live() THEN
    RAISE EXCEPTION 'mint_refused: a % mint only before the ledger goes live', NEW.reason USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.reason = 'live' AND (pg_catalog.now() < c.opens_at OR pg_catalog.now() >= c.closes_at + c.grace) THEN
    RAISE EXCEPTION 'mint_refused: % is not open now (% .. % + %)', c.code, c.opens_at, c.closes_at, c.grace USING ERRCODE = 'check_violation';
  END IF;
  v := public._mint_validate(c, NEW);
  v_e := (v ->> 'earned_at')::timestamptz;
  IF NEW.reason <> 'owner_exception' AND (v_e < c.opens_at OR v_e >= c.closes_at + c.grace) THEN
    RAISE EXCEPTION 'mint_refused: % was earned at %, outside its window', c.code, v_e USING ERRCODE = 'check_violation';
  END IF;
  NEW.serial := CASE WHEN c.variant = 'unique' THEN NEW.serial ELSE c.minted + 1 END;
  IF NEW.serial IS NULL THEN
    RAISE EXCEPTION 'mint_refused: a Unique needs its number' USING ERRCODE = 'check_violation';
  END IF;
  NEW.earned_at := v_e;
  NEW.evidence_key := v ->> 'key';
  NEW.holder_tag := public._holder_tag(NEW.holder, NEW.id);
  NEW.holder_age_band := public._holder_age_band(NEW.holder);
  NEW.held_since := CASE WHEN NEW.holder IS NOT NULL THEN pg_catalog.now() END;
  NEW.evidence := (v -> 'evidence') || pg_catalog.jsonb_build_object('collectible', c.code, 'holder', NEW.holder_tag);
  NEW.evidence_sha256 := CASE WHEN COALESCE((v ->> 'pending')::boolean, false) THEN '' ELSE public._mint_sha256(NEW.evidence::text) END;
  NEW.tradable := COALESCE((v ->> 'tradable')::boolean, false) AND c.tradable;
  NEW.minted_at := pg_catalog.now();
  NEW.status := 'held';
  NEW.status_at := pg_catalog.now();
  NEW.burn_reason := NULL; NEW.burn_evidence := NULL; NEW.burn_evidence_sha256 := NULL; NEW.burn_seq := NULL;
  NEW.frozen_at := NULL; NEW.frozen_reason := NULL; NEW.ledger_seq := NULL;
  UPDATE public.mint_collectibles x SET minted = x.minted + 1 WHERE x.code = c.code;
  RETURN NEW;
END;
$function$

public._mint_copies_update()
CREATE OR REPLACE FUNCTION public._mint_copies_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  IF TG_OP = 'TRUNCATE' THEN
    RAISE EXCEPTION 'mint_copies: never truncated' USING ERRCODE = 'check_violation';
  END IF;
  IF TG_OP = 'DELETE' THEN
    IF public._mint_started() OR OLD.ledger_seq IS NOT NULL THEN
      RAISE EXCEPTION 'mint_copies: a minted copy is never deleted' USING ERRCODE = 'check_violation';
    END IF;
    RETURN OLD;   -- before the chain starts only (a launch-hour file's rollback)
  END IF;
  IF NEW.id IS DISTINCT FROM OLD.id OR NEW.collectible IS DISTINCT FROM OLD.collectible OR NEW.serial IS DISTINCT FROM OLD.serial
     OR NEW.earned_at IS DISTINCT FROM OLD.earned_at OR NEW.minted_at IS DISTINCT FROM OLD.minted_at OR NEW.reason IS DISTINCT FROM OLD.reason
     OR NEW.evidence_key IS DISTINCT FROM OLD.evidence_key OR NEW.crate_copy_id IS DISTINCT FROM OLD.crate_copy_id
     OR NEW.unique_seed IS DISTINCT FROM OLD.unique_seed OR NEW.unique_pattern IS DISTINCT FROM OLD.unique_pattern
     OR (OLD.evidence_sha256 <> '' AND (NEW.evidence IS DISTINCT FROM OLD.evidence OR NEW.evidence_sha256 IS DISTINCT FROM OLD.evidence_sha256))
     -- 20261204140000: tradability is kept as minted, but for a gifted copy's one flip (pending -> tradable at the
     -- account's third real game; _gift_tradable_flip's transaction-local mark names the copy)
     OR (OLD.evidence_sha256 <> '' AND (NEW.tradable IS DISTINCT FROM OLD.tradable
                                       OR NEW.tradable_after_games IS DISTINCT FROM OLD.tradable_after_games
                                       OR NEW.tradable_evidence IS DISTINCT FROM OLD.tradable_evidence)
         AND NOT public._gift_flip_ok(OLD, NEW))
     OR (NEW.evidence_sha256 <> '' AND NEW.evidence_sha256 <> public._mint_sha256(NEW.evidence::text))
     OR (OLD.ledger_seq IS NOT NULL AND NEW.ledger_seq IS DISTINCT FROM OLD.ledger_seq)
     OR (NEW.holder IS DISTINCT FROM OLD.holder AND NEW.holder IS NOT NULL AND NOT public._mint_transfer_ok(OLD, NEW))   -- 20261203200000: a trade
     OR (NEW.holder IS NULL AND OLD.holder IS NOT NULL AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = OLD.holder)
         AND NOT public._mint_void_ok(OLD))   -- (20261207998000) a deal its giver's deletion undid
     OR ((NEW.holder_tag IS DISTINCT FROM OLD.holder_tag OR NEW.holder_age_band IS DISTINCT FROM OLD.holder_age_band
         OR NEW.held_since IS DISTINCT FROM OLD.held_since) AND NOT public._mint_transfer_ok(OLD, NEW)) THEN
    RAISE EXCEPTION 'mint_copies: copy % is kept as minted', OLD.id USING ERRCODE = 'check_violation';
  END IF;
  -- An account deleted: its copies retire (their history stays; the tag points at nobody).
  IF NEW.holder IS NULL AND OLD.holder IS NOT NULL AND OLD.status = 'held' THEN
    NEW.status := 'retired';
    NEW.status_at := pg_catalog.now();
  END IF;
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF OLD.status = 'held' AND NEW.status = 'burned' THEN
      IF NEW.burn_reason IS NULL OR NEW.burn_evidence IS NULL
         OR (NEW.burn_reason IN ('cheating', 'error') AND NEW.burn_evidence = '{}'::jsonb) THEN
        RAISE EXCEPTION 'mint_copies: a burn needs its reason and evidence' USING ERRCODE = 'check_violation';
      END IF;
      IF NEW.burn_reason = 'shred' AND NOT EXISTS (
           SELECT 1 FROM public.crate_copies x JOIN public.coin_ledger l ON l.id = x.shred_ledger_id AND l.kind = 'shred'
            WHERE x.id = OLD.crate_copy_id AND x.shredded_at IS NOT NULL) THEN
        RAISE EXCEPTION 'mint_copies: a shred burn needs the shred (its Intel row)' USING ERRCODE = 'check_violation';
      END IF;
      NEW.burn_evidence_sha256 := CASE WHEN NEW.burn_evidence ->> 'trade_up' = 'pending' THEN '' ELSE public._mint_sha256(NEW.burn_evidence::text) END;
      NEW.status_at := pg_catalog.now();
      NEW.burn_seq := NULL;
    ELSIF OLD.status = 'held' AND NEW.status = 'retired' THEN
      IF NEW.holder IS NOT NULL THEN
        RAISE EXCEPTION 'mint_copies: only a copy whose holder is gone retires' USING ERRCODE = 'check_violation';
      END IF;
      NEW.status_at := pg_catalog.now();
    ELSIF OLD.status = 'burned' AND NEW.status = 'held' THEN
      IF OLD.burn_reason NOT IN ('cheating', 'error', 'revoke') OR OLD.holder IS NULL OR NEW.holder IS DISTINCT FROM OLD.holder THEN
        RAISE EXCEPTION 'mint_copies: only a cheating / error / revoke burn is restored, to its holder' USING ERRCODE = 'check_violation';
      END IF;
      NEW.burn_reason := NULL; NEW.burn_evidence := NULL; NEW.burn_evidence_sha256 := NULL; NEW.burn_seq := NULL;
      NEW.status_at := pg_catalog.now();
    ELSE
      RAISE EXCEPTION 'mint_copies: copy % can''t go from % to %', OLD.id, OLD.status, NEW.status USING ERRCODE = 'check_violation';
    END IF;
  ELSIF NEW.burn_reason IS DISTINCT FROM OLD.burn_reason OR NEW.burn_evidence IS DISTINCT FROM OLD.burn_evidence AND OLD.burn_evidence_sha256 <> ''
        OR (NEW.burn_seq IS DISTINCT FROM OLD.burn_seq AND OLD.burn_seq IS NOT NULL) OR NEW.status_at IS DISTINCT FROM OLD.status_at THEN
    RAISE EXCEPTION 'mint_copies: copy %''s burn is kept as written', OLD.id USING ERRCODE = 'check_violation';
  ELSIF NEW.burn_evidence IS DISTINCT FROM OLD.burn_evidence THEN
    NEW.burn_evidence_sha256 := public._mint_sha256(NEW.burn_evidence::text);   -- a pending trade-up burn completed
  END IF;
  RETURN NEW;
END;
$function$

public._mint_define(text,text,text,text,text,text,jsonb,jsonb,timestamp with time zone,timestamp with time zone,interval,boolean)
CREATE OR REPLACE FUNCTION public._mint_define(p_code text, p_set text, p_kind text, p_item text, p_variant text, p_rule text, p_args jsonb, p_how jsonb, p_opens timestamp with time zone, p_closes timestamp with time zone, p_grace interval, p_tradable boolean)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  c public.mint_collectibles;
BEGIN
  SELECT * INTO c FROM public.mint_collectibles x WHERE x.code = p_code FOR UPDATE;
  IF c.code IS NULL THEN
    INSERT INTO public.mint_collectibles (code, set_code, item_kind, item_code, variant, rule, rule_args, how, opens_at, closes_at, grace, tradable)
    VALUES (p_code, p_set, p_kind, p_item, p_variant, p_rule, p_args, p_how, p_opens, GREATEST(p_closes, p_opens), p_grace, p_tradable);
  ELSIF c.closed_at IS NOT NULL THEN
    RETURN;
  ELSIF c.opens_at > pg_catalog.now() AND c.minted = 0 THEN
    IF (c.set_code, c.item_kind, c.item_code, c.variant, c.rule, c.rule_args, c.how, c.opens_at, c.closes_at, c.grace, c.tradable)
       IS NOT DISTINCT FROM (p_set, p_kind, p_item, p_variant, p_rule, p_args, p_how, p_opens, GREATEST(p_closes, p_opens), p_grace, p_tradable) THEN
      RETURN;
    END IF;
    UPDATE public.mint_collectibles x
       SET set_code = p_set, item_kind = p_kind, item_code = p_item, variant = p_variant, rule = p_rule, rule_args = p_args, how = p_how,
           opens_at = p_opens, closes_at = GREATEST(p_closes, p_opens), grace = p_grace, tradable = p_tradable
     WHERE x.code = p_code;
  ELSIF p_closes < c.closes_at THEN
    UPDATE public.mint_collectibles x SET closes_at = GREATEST(p_closes, pg_catalog.now() - interval '2 minutes', x.opens_at) WHERE x.code = p_code;
  ELSE
    RETURN;
  END IF;
  -- Before the chain starts the genesis file writes every definition itself; after it, the writer does.
  IF public._mint_started() THEN
    PERFORM public._mint_queue('define', p_code, NULL, '', '', '');
  END IF;
END;
$function$

public._mint_define_night(uuid)
CREATE OR REPLACE FUNCTION public._mint_define_night(p_event uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  e       public.events;
  s       public.mint_seasons;
  v_set   text;
  v_slot  text;
  v_code  text;
  v_coll  text;
  v_en    text;
  v_ru    text;
  v_close timestamptz;
BEGIN
  SELECT * INTO e FROM public.events x WHERE x.id = p_event AND x.format = 'tables';
  IF e.id IS NULL OR (e.published_at IS NULL AND NOT EXISTS (SELECT 1 FROM public.mint_sets z WHERE z.event_id = e.id)) THEN
    RETURN NULL;
  END IF;
  s := public._mint_season_at(e.starts_at);
  IF s.code IS NULL THEN
    RAISE WARNING 'mint: no season covers night % (%): not defined', e.link_id, e.starts_at;
    RETURN NULL;
  END IF;
  v_set := COALESCE((SELECT z.code FROM public.mint_sets z WHERE z.event_id = e.id),
                    CASE WHEN e.link_id = 'LPGFWM' THEN 'beta.gn.beta_game_night' ELSE s.code || '.gn.' || pg_catalog.lower(e.link_id) END);
  INSERT INTO public.mint_sets AS z (code, season, track, names, event_id)
  VALUES (v_set, s.code, 'game_night', e.title_i18n, e.id)
  ON CONFLICT (code) DO UPDATE SET names = EXCLUDED.names WHERE z.names IS DISTINCT FROM EXCLUDED.names;
  v_en := COALESCE(e.title_i18n ->> 'en', 'Game Night');
  v_ru := COALESCE(e.title_i18n ->> 'ru', v_en);
  v_close := CASE WHEN e.cancelled_at IS NOT NULL THEN LEAST(e.ends_at, GREATEST(e.cancelled_at, e.starts_at)) ELSE e.ends_at END;
  FOREACH v_slot IN ARRAY ARRAY['participation', 'local', 'spy', 'bonus'] LOOP
    v_code := e.gn #>> ARRAY['titles', v_slot, 'code'];
    v_coll := v_set || '.' || v_slot;
    IF v_code IS NULL OR NOT EXISTS (SELECT 1 FROM public.titles t WHERE t.code = v_code) THEN
      -- A slot emptied before the night: a never-published collectible goes; a published one closes at its start.
      IF EXISTS (SELECT 1 FROM public.mint_collectibles x WHERE x.code = v_coll) THEN
        IF NOT public._mint_started() AND EXISTS (SELECT 1 FROM public.mint_collectibles x WHERE x.code = v_coll AND x.minted = 0 AND x.define_seq IS NULL) THEN
          DELETE FROM public.mint_collectibles x WHERE x.code = v_coll;
        ELSE
          PERFORM public._mint_define(x.code, x.set_code, x.item_kind, x.item_code, x.variant, x.rule, x.rule_args, x.how, x.opens_at,
                                      x.opens_at, x.grace, x.tradable)
             FROM public.mint_collectibles x WHERE x.code = v_coll;
        END IF;
      END IF;
      CONTINUE;
    END IF;
    PERFORM public._mint_define(
      v_coll, v_set, 'title', v_code, 'plain',
      CASE v_slot WHEN 'participation' THEN 'gn_participation' WHEN 'local' THEN 'gn_local' WHEN 'spy' THEN 'gn_spy' ELSE 'gn_bonus' END,
      pg_catalog.jsonb_build_object('event_id', e.id, 'night', e.link_id, 'slot', v_slot),
      CASE v_slot
        WHEN 'participation' THEN pg_catalog.jsonb_build_object('en', 'Played a counted game at ' || v_en, 'ru', 'Засчитанная игра: ' || v_ru)
        WHEN 'local' THEN pg_catalog.jsonb_build_object('en', 'Won as a Local at ' || v_en, 'ru', 'Победа за местных: ' || v_ru)
        WHEN 'spy' THEN pg_catalog.jsonb_build_object('en', 'Won as a spy at ' || v_en, 'ru', 'Победа за шпионов: ' || v_ru)
        ELSE pg_catalog.jsonb_build_object('en', 'Picked by the developer at a table of ' || v_en, 'ru', 'Выбор разработчика: ' || v_ru)
      END,
      e.starts_at, v_close, interval '3 hours', true);
  END LOOP;
  RETURN v_set;
END;
$function$

public._mint_define_note(public.mint_collectibles)
CREATE OR REPLACE FUNCTION public._mint_define_note(c public.mint_collectibles)
 RETURNS text
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  SELECT 'item:' || c.item_kind || ':' || c.item_code || ';variant:' || c.variant || ';rule:' || c.rule
         || ';args:' || public._mint_sha256(c.rule_args::text) || ';how:' || public._mint_sha256(c.how ->> 'en')
         || ';opens:' || pg_catalog.to_char(c.opens_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
         || ';closes:' || pg_catalog.to_char(c.closes_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
         || ';grace:' || pg_catalog.date_part('epoch', c.grace)::bigint::text || 's;tradable:' || c.tradable::text || ';cap:none'
$function$

public._mint_define_pool_item(text,text,text,timestamp with time zone)
CREATE OR REPLACE FUNCTION public._mint_define_pool_item(p_season text, p_kind text, p_code text, p_from timestamp with time zone)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  s       public.mint_seasons;
  ci      public.crate_items;
  v_set   text;
  v_base  text;
BEGIN
  SELECT * INTO s FROM public.mint_seasons x WHERE x.code = p_season;
  SELECT * INTO ci FROM public.crate_items x WHERE x.item_kind = p_kind AND x.item_code = p_code;
  IF s.code IS NULL OR ci.item_code IS NULL THEN
    RAISE EXCEPTION 'mint: no season % or no pool item % %', p_season, p_kind, p_code;
  END IF;
  v_set := s.code || '.intercepts';
  INSERT INTO public.mint_sets (code, season, track, names)
  VALUES (v_set, s.code, 'intercepts', s.names || pg_catalog.jsonb_build_object('en', (s.names ->> 'en') || ' · Intercepts', 'ru', COALESCE(s.names ->> 'ru', s.names ->> 'en') || ' · Перехваты'))
  ON CONFLICT (code) DO NOTHING;
  INSERT INTO public.mint_pool (season, item_kind, item_code, active_from) VALUES (s.code, p_kind, p_code, p_from)
  ON CONFLICT (season, item_kind, item_code) DO NOTHING;
  v_base := s.code || '.intercepts.' || p_kind || '.' || p_code;
  PERFORM public._mint_define(v_base, v_set, p_kind, p_code, 'plain', 'ic_open',
            pg_catalog.jsonb_build_object('season', s.code, 'series', ci.series),
            pg_catalog.jsonb_build_object('en', 'From an Intercept or a trade-up in ' || (s.names ->> 'en'),
                                          'ru', 'Из перехвата или обмена: ' || COALESCE(s.names ->> 'ru', s.names ->> 'en')),
            p_from, s.ends_at, interval '0', true)
   WHERE NOT EXISTS (SELECT 1 FROM public.mint_collectibles x WHERE x.code = v_base);
  IF ci.mintable THEN
    PERFORM public._mint_define(v_base || '.unique', v_set, p_kind, p_code, 'unique', 'ic_open',
              pg_catalog.jsonb_build_object('season', s.code, 'series', ci.series),
              pg_catalog.jsonb_build_object('en', 'A Unique, from an Intercept or a trade-up in ' || (s.names ->> 'en'),
                                            'ru', 'Уникальный, из перехвата или обмена: ' || COALESCE(s.names ->> 'ru', s.names ->> 'en')),
              p_from, s.ends_at, interval '0', true)
     WHERE NOT EXISTS (SELECT 1 FROM public.mint_collectibles x WHERE x.code = v_base || '.unique');
  END IF;
END;
$function$

public._mint_drain(boolean,integer)
CREATE OR REPLACE FUNCTION public._mint_drain(p_wait boolean, p_max integer)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  o    public.mint_outbox;
  cp   public.mint_copies;
  c    public.mint_collectibles;
  r    public.mint_ledger;
  v_n  integer := 0;
  v_note text;
BEGIN
  IF NOT public._mint_started() THEN
    RETURN 0;
  END IF;
  IF p_wait THEN
    PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('mint_ledger_writer', 0));
  ELSIF NOT pg_catalog.pg_try_advisory_xact_lock(pg_catalog.hashtextextended('mint_ledger_writer', 0)) THEN
    RETURN 0;
  END IF;
  FOR o IN SELECT * FROM public.mint_outbox x ORDER BY x.id LIMIT p_max LOOP
    r := NULL;
    IF o.kind = 'define' THEN
      SELECT * INTO c FROM public.mint_collectibles x WHERE x.code = o.collectible;
      IF c.code IS NOT NULL THEN
        v_note := public._mint_define_note(c);
        IF c.define_hash IS DISTINCT FROM public._mint_sha256(v_note) THEN
          r := public._mint_ledger_append('define', c.code, NULL, NULL, '', '', v_note, '');
          UPDATE public.mint_collectibles x SET define_seq = r.seq, define_hash = public._mint_sha256(v_note) WHERE x.code = c.code;
        END IF;
      END IF;
    ELSIF o.kind = 'close' THEN
      r := public._mint_ledger_append('close', o.collectible, NULL, NULL, '', '', o.note, COALESCE(o.extra ->> 'evidence', ''));
      UPDATE public.mint_collectibles x SET close_seq = r.seq WHERE x.code = o.collectible AND x.close_seq IS NULL;
    ELSIF o.kind = 'checkpoint' THEN
      r := public._mint_ledger_append('checkpoint', NULL, NULL, NULL, '', '', o.note, '');
      INSERT INTO public.mint_heads (day, seq, hash, at, supply, rules_fp, intel)
      VALUES ((o.extra ->> 'day')::date, r.seq, r.hash, r.at, o.extra -> 'supply', o.extra ->> 'rules_fp', o.extra -> 'intel')
      ON CONFLICT (day) DO NOTHING;
      -- feat/economy-integrity: Intel's day rides on this checkpoint.
      -- 20261202210000 (E1, 7d270d593): the stored digest stamped with this row's seq (once). An Intel failure never
      -- stalls the ledger. (Only a digest the checkpoint carried: no Intel part, no stamp.)
      IF pg_catalog.jsonb_typeof(o.extra -> 'intel') = 'object' THEN
        BEGIN
          IF pg_catalog.to_regprocedure('public._intel_digest_checkpoint(date,bigint)') IS NOT NULL THEN
            EXECUTE 'SELECT public._intel_digest_checkpoint($1, $2)' USING (o.extra ->> 'day')::date, r.seq;
          ELSIF pg_catalog.to_regclass('public.intel_digests') IS NOT NULL THEN
            EXECUTE 'UPDATE public.intel_digests SET checkpoint_seq = $1 WHERE day = $2 AND checkpoint_seq IS NULL'
              USING r.seq, (o.extra ->> 'day')::date;
          END IF;
        EXCEPTION WHEN OTHERS THEN
          RAISE WARNING 'mint writer: Intel digest stamp for % (seq %) failed: %', o.extra ->> 'day', r.seq, SQLERRM;
        END;
      END IF;
    ELSE
      SELECT * INTO cp FROM public.mint_copies x WHERE x.id = o.copy_id;
      IF cp.id IS NULL THEN
        RAISE EXCEPTION 'mint writer: outbox % names copy % that is not there', o.id, o.copy_id;
      END IF;
      IF o.kind = 'mint' THEN
        IF cp.evidence_sha256 = '' THEN
          RAISE EXCEPTION 'mint writer: copy %''s evidence was never completed', cp.id;
        END IF;
        r := public._mint_ledger_append('mint', cp.collectible, cp.serial, cp.id, '', o.to_tag, o.note, cp.evidence_sha256);
        UPDATE public.mint_copies x SET ledger_seq = r.seq WHERE x.id = cp.id;
      ELSIF o.kind = 'burn' THEN
        r := public._mint_ledger_append('burn', cp.collectible, cp.serial, cp.id, o.from_tag, '', o.note,
                                        COALESCE(NULLIF(o.extra ->> 'evidence', ''), cp.burn_evidence_sha256, ''));
        UPDATE public.mint_copies x SET burn_seq = r.seq WHERE x.id = cp.id AND x.status = 'burned' AND x.burn_seq IS NULL;
      ELSE
        r := public._mint_ledger_append(o.kind, cp.collectible, cp.serial, cp.id, o.from_tag, o.to_tag, o.note,
                                        COALESCE(o.extra ->> 'evidence', ''));
      END IF;
    END IF;
    DELETE FROM public.mint_outbox x WHERE x.id = o.id;
    v_n := v_n + 1;
  END LOOP;
  RETURN v_n;
END;
$function$

public._mint_evidence_stamp()
CREATE OR REPLACE FUNCTION public._mint_evidence_stamp()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF TG_TABLE_NAME = 'gamenight_prizes' THEN
      NEW.granted_at := pg_catalog.now();
    ELSE
      NEW.at := pg_catalog.now();
    END IF;
    RETURN NEW;
  END IF;
  IF (TG_TABLE_NAME = 'gamenight_prizes' AND (NEW.granted_at IS DISTINCT FROM OLD.granted_at OR NEW.event_id IS DISTINCT FROM OLD.event_id
        OR NEW.user_id IS DISTINCT FROM OLD.user_id OR NEW.slot IS DISTINCT FROM OLD.slot OR NEW.via IS DISTINCT FROM OLD.via
        OR NEW.code IS DISTINCT FROM OLD.code OR (NEW.game_id IS DISTINCT FROM OLD.game_id AND NEW.game_id IS NOT NULL)))
     OR (TG_TABLE_NAME = 'gamenight_results' AND (NEW.at IS DISTINCT FROM OLD.at OR NEW.outcome IS DISTINCT FROM OLD.outcome
        OR NEW.titles IS DISTINCT FROM OLD.titles OR NEW.game_id IS DISTINCT FROM OLD.game_id OR NEW.user_id IS DISTINCT FROM OLD.user_id))
     OR (TG_TABLE_NAME = 'gamenight_bonus' AND (NEW.at IS DISTINCT FROM OLD.at OR NEW.event_id IS DISTINCT FROM OLD.event_id
        OR NEW.user_id IS DISTINCT FROM OLD.user_id OR NEW.code IS DISTINCT FROM OLD.code
        OR (NEW.game_id IS DISTINCT FROM OLD.game_id AND NEW.game_id IS NOT NULL))) THEN
    RAISE EXCEPTION '%: a Game Night record is kept as written', TG_TABLE_NAME USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$function$

public._mint_gift_kind(text,jsonb)
CREATE OR REPLACE FUNCTION public._mint_gift_kind(p_collectible text, p_evidence jsonb)
 RETURNS text
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  -- (20261204140000) Which copies the gift rule waits on: 'code' (an opened code Intercept: grant source creator_code),
  -- 'beta' (the Beta set: Beta Pin, Field Tester); null for everything else (Developer's Pick, Game Night titles, an
  -- owner's gift, an earned Intercept ...). A trade-up follows its inputs (_mint_gift_tradeup).
  SELECT CASE WHEN p_evidence ->> 'rule' = 'ic_open' AND p_evidence ->> 'source' = 'creator_code' AND p_evidence -> 'moved' IS NULL THEN 'code'
              WHEN (SELECT c.rule FROM public.mint_collectibles c WHERE c.code = p_collectible) IN ('beta_pin', 'field_tester') THEN 'beta'
         END
$function$

public._mint_gift_pending()
CREATE OR REPLACE FUNCTION public._mint_gift_pending()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_kind text;
  v_ref  text;
  v_code text;
  v_n    integer := public._gift_games_needed();
BEGIN
  v_kind := public._mint_gift_kind(NEW.collectible, NEW.evidence);
  IF v_kind = 'code' THEN
    SELECT g.ref INTO v_ref FROM public.player_crates k JOIN public.crate_grants g ON g.id = k.grant_id
     WHERE k.id = (NEW.evidence ->> 'intercept')::uuid;
    v_code := NULLIF(pg_catalog.regexp_replace(pg_catalog.split_part(COALESCE(v_ref, ''), ':', 2), '[^A-Za-z0-9_-]', '', 'g'), '');
    IF v_code IS NOT NULL THEN
      NEW.evidence := NEW.evidence || pg_catalog.jsonb_build_object('code', v_code,
                        'code_kind', CASE pg_catalog.split_part(v_ref, ':', 1) WHEN 'creator' THEN 'creator' ELSE 'reward' END);
      IF NEW.evidence_sha256 <> '' THEN
        NEW.evidence_sha256 := public._mint_sha256(NEW.evidence::text);
      END IF;
    END IF;
  END IF;
  -- (20261207745500 gift_untradable, owner 2026-11-01) while economy.gift_copies_tradable is off, a code's Intercept is
  -- just for its account: the copy it opens into is bound by its origin, as an owner's gift's is (no games wait); the
  -- switch turned on frees it (_gift_bound_kind 'code_gift', _gift_switch_flip). Never one that changed hands
  -- (_mint_gift_kind: no 'moved').
  IF v_kind = 'code' AND NEW.tradable AND NEW.holder IS NOT NULL AND NOT public._gift_switch_on() THEN
    NEW.tradable := false;
    NEW.tradable_after_games := NULL;
    RETURN NEW;
  END IF;
  IF v_kind IS NOT NULL AND NEW.tradable AND NEW.holder IS NOT NULL
     AND COALESCE(pg_catalog.cardinality(public._real_games(NEW.holder, v_n)), 0) < v_n
     -- the Beta set: a tester who played a real game in an official Beta session keeps it tradable (owner 2026-11-01)
     AND NOT (v_kind = 'beta' AND public._beta_session_game(NEW.holder))
     -- market_rules_1101: no wait while economy.gift_copies_tradable is on
     AND NOT public._gift_switch_on() THEN
    NEW.tradable := false;
    NEW.tradable_after_games := v_n;
  END IF;
  RETURN NEW;
END
$function$

public._mint_gift_tradeup()
CREATE OR REPLACE FUNCTION public._mint_gift_tradeup()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_ok  boolean;
  v_any boolean;
  v_n   integer := public._gift_games_needed();
BEGIN
  SELECT pg_catalog.bool_and(m.tradable OR m.tradable_after_games IS NOT NULL), pg_catalog.bool_or(m.tradable_after_games IS NOT NULL)
    INTO v_ok, v_any
    FROM public.mint_copies m
   WHERE m.id IN (SELECT x.value::bigint FROM pg_catalog.jsonb_array_elements_text(COALESCE(NEW.evidence -> 'inputs', '[]'::jsonb)) AS x);
  IF COALESCE(v_ok, false) AND COALESCE(v_any, false) AND NEW.holder IS NOT NULL THEN
    IF public._gift_switch_on() OR COALESCE(pg_catalog.cardinality(public._real_games(NEW.holder, v_n)), 0) >= v_n THEN
      NEW.tradable := true;
      NEW.tradable_after_games := NULL;
    ELSE
      NEW.tradable := false;
      NEW.tradable_after_games := v_n;
    END IF;
  END IF;
  RETURN NEW;
END
$function$

public._mint_ic_collectible(text,text,text,timestamp with time zone,boolean)
CREATE OR REPLACE FUNCTION public._mint_ic_collectible(p_kind text, p_code text, p_variant text, p_at timestamp with time zone, p_define boolean)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  m public.mint_pool;
  s public.mint_seasons;
BEGIN
  SELECT * INTO m FROM public.mint_pool p
   WHERE p.item_kind = p_kind AND p.item_code = p_code AND p.active_from <= p_at AND (p.retired_at IS NULL OR p.retired_at > p_at)
   ORDER BY p.active_from DESC LIMIT 1;
  IF m.season IS NULL AND p_define THEN
    s := public._mint_season_at(p_at);
    IF s.code IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.mint_pool p WHERE p.season = s.code AND p.item_kind = p_kind AND p.item_code = p_code)
       AND EXISTS (SELECT 1 FROM public.crate_items ci WHERE ci.item_kind = p_kind AND ci.item_code = p_code AND ci.active) THEN
      PERFORM public._mint_define_pool_item(s.code, p_kind, p_code, GREATEST(s.starts_at, LEAST(p_at, pg_catalog.now())));
      SELECT * INTO m FROM public.mint_pool p WHERE p.season = s.code AND p.item_kind = p_kind AND p.item_code = p_code;
    END IF;
  END IF;
  IF m.season IS NULL THEN
    RETURN NULL;
  END IF;
  RETURN m.season || '.intercepts.' || p_kind || '.' || p_code || CASE WHEN p_variant = 'unique' THEN '.unique' ELSE '' END;
END;
$function$

public._mint_issue(text,uuid,text,jsonb,bigint,integer,numeric,smallint)
CREATE OR REPLACE FUNCTION public._mint_issue(p_collectible text, p_holder uuid, p_reason text, p_pointer jsonb DEFAULT '{}'::jsonb, p_crate_copy_id bigint DEFAULT NULL::bigint, p_serial integer DEFAULT NULL::integer, p_seed numeric DEFAULT NULL::numeric, p_pattern smallint DEFAULT NULL::smallint)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_id bigint;
BEGIN
  INSERT INTO public.mint_copies (collectible, serial, holder, earned_at, minted_at, reason, evidence, evidence_sha256, evidence_key,
                                  crate_copy_id, unique_seed, unique_pattern, tradable)
  VALUES (p_collectible, COALESCE(p_serial, 1), p_holder, pg_catalog.now(), pg_catalog.now(), p_reason, COALESCE(p_pointer, '{}'::jsonb), '',
          '-', p_crate_copy_id, p_seed, p_pattern, false)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$function$

public._mint_ledger_append(text,text,integer,bigint,text,text,text,text)
CREATE OR REPLACE FUNCTION public._mint_ledger_append(p_kind text, p_collectible text, p_serial integer, p_copy_id bigint, p_from text, p_to text, p_note text, p_evidence text)
 RETURNS public.mint_ledger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  last public.mint_ledger;
  r    public.mint_ledger;
BEGIN
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('mint_ledger_writer', 0));
  SELECT * INTO last FROM public.mint_ledger l ORDER BY l.seq DESC LIMIT 1;
  r.seq := COALESCE(last.seq, 0) + 1;
  r.at := GREATEST(pg_catalog.clock_timestamp(), COALESCE(last.at + interval '1 microsecond', '-infinity'::timestamptz));
  r.kind := p_kind;
  r.collectible := p_collectible;
  r.serial := p_serial;
  r.copy_id := p_copy_id;
  r.from_tag := COALESCE(p_from, '');
  r.to_tag := COALESCE(p_to, '');
  r.note := COALESCE(p_note, '');
  r.evidence_sha256 := COALESCE(p_evidence, '');
  r.prev_hash := COALESCE(last.hash, pg_catalog.repeat('0', 64));
  r.hash := public._mint_sha256(public._mint_line(r));
  INSERT INTO public.mint_ledger VALUES (r.*);
  RETURN r;
END;
$function$

public._mint_ledger_guard()
CREATE OR REPLACE FUNCTION public._mint_ledger_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
DECLARE
  last public.mint_ledger;
BEGIN
  IF TG_OP <> 'INSERT' THEN
    RAISE EXCEPTION 'mint_ledger: the ledger is never changed or deleted' USING ERRCODE = 'check_violation';
  END IF;
  SELECT * INTO last FROM public.mint_ledger l ORDER BY l.seq DESC LIMIT 1;
  IF last.seq IS NULL THEN
    IF NEW.seq <> 1 OR NEW.kind <> 'genesis' OR NEW.prev_hash <> pg_catalog.repeat('0', 64) THEN
      RAISE EXCEPTION 'mint_ledger: the chain starts with one genesis row (seq 1, prev 0...)' USING ERRCODE = 'check_violation';
    END IF;
  ELSIF NEW.seq <> last.seq + 1 OR NEW.prev_hash <> last.hash OR NEW.at <= last.at OR NEW.kind = 'genesis' THEN
    RAISE EXCEPTION 'mint_ledger: row % does not extend the chain (last % %)', NEW.seq, last.seq, pg_catalog.left(last.hash, 10)
      USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.hash <> public._mint_sha256(public._mint_line(NEW)) THEN
    RAISE EXCEPTION 'mint_ledger: row %''s hash is not the SHA-256 of its line', NEW.seq USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.kind IN ('mint', 'burn', 'retire', 'restore', 'transfer', 'tradable')
     AND NOT EXISTS (SELECT 1 FROM public.mint_copies c WHERE c.id = NEW.copy_id AND c.collectible = NEW.collectible AND c.serial = NEW.serial) THEN
    RAISE EXCEPTION 'mint_ledger: row % names no such copy', NEW.seq USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.kind = 'mint' AND EXISTS (SELECT 1 FROM public.mint_copies c WHERE c.id = NEW.copy_id AND c.ledger_seq IS NOT NULL) THEN
    RAISE EXCEPTION 'mint_ledger: copy % is on the ledger already', NEW.copy_id USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.kind IN ('define', 'close') AND NOT EXISTS (SELECT 1 FROM public.mint_collectibles c WHERE c.code = NEW.collectible) THEN
    RAISE EXCEPTION 'mint_ledger: row % names no such collectible', NEW.seq USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$function$

public._mint_line(public.mint_ledger)
CREATE OR REPLACE FUNCTION public._mint_line(r public.mint_ledger)
 RETURNS text
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  SELECT 'v1|' || r.seq::text || '|' || pg_catalog.to_char(r.at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') || '|' || r.kind
         || '|' || COALESCE(r.collectible, '') || '|' || COALESCE(r.serial::text, '') || '|' || COALESCE(r.copy_id::text, '')
         || '|' || r.from_tag || '|' || r.to_tag || '|' || r.note || '|' || r.evidence_sha256 || '|' || r.prev_hash
$function$

public._mint_live()
CREATE OR REPLACE FUNCTION public._mint_live()
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE
 SET search_path TO ''
AS $function$
#variable_conflict use_column
BEGIN
  -- (20261211900000, bootstrap-speed-1105) plpgsql: its plan is kept; a SQL function with SET is planned again on every call. The query is the SQL body's, word for word.
  RETURN (SELECT q.x FROM (
  SELECT COALESCE((SELECT s.live FROM public.mint_state s), false)
  ) AS q(x) LIMIT 1);
END
$function$

public._mint_on_copy_event()
CREATE OR REPLACE FUNCTION public._mint_on_copy_event()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  IF NOT public._mint_live() OR NEW.kind NOT IN ('shred', 'trade_in', 'transfer') THEN
    RETURN NULL;
  END IF;
  IF NEW.kind = 'transfer' THEN
    -- 20261203200000: trading ships: a transfer passes with its trade's evidence (this transaction's mint_transfers row)
    IF public._crate_transfer_ok(NEW.copy_id, NEW.from_user, NEW.to_user) THEN
      RETURN NULL;
    END IF;
    RAISE EXCEPTION 'mint: copies don''t change hands until trading ships' USING ERRCODE = 'check_violation';
  END IF;
  UPDATE public.mint_copies m
     SET status = 'burned', burn_reason = CASE NEW.kind WHEN 'shred' THEN 'shred' ELSE 'trade_up' END,
         burn_evidence = CASE NEW.kind
                           WHEN 'shred' THEN pg_catalog.jsonb_build_object('rule', 'shred', 'intel_row',
                                               (SELECT x.shred_ledger_id FROM public.crate_copies x WHERE x.id = NEW.copy_id))
                           ELSE pg_catalog.jsonb_build_object('rule', 'trade_up', 'trade_up', 'pending') END
   WHERE m.crate_copy_id = NEW.copy_id AND m.status = 'held';
  IF NOT FOUND AND NOT EXISTS (SELECT 1 FROM public.mint_copies m WHERE m.crate_copy_id = NEW.copy_id) THEN
    RAISE EXCEPTION 'mint: Intercept copy % has no minted copy', NEW.copy_id USING ERRCODE = 'check_violation';
  END IF;
  RETURN NULL;
END;
$function$

public._mint_on_crate_copy()
CREATE OR REPLACE FUNCTION public._mint_on_crate_copy()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_live boolean := public._mint_live();
  v_coll text;
BEGIN
  -- The launch reset's rollback puts pre-release copies back as they were (before the ledger only).
  IF pg_catalog.current_setting('spy_social.crate_reset', true) = 'on' AND NOT v_live THEN
    RETURN NEW;
  END IF;
  IF NEW.serial IS NOT NULL THEN
    PERFORM 1 FROM public.crate_items x WHERE x.item_kind = NEW.item_kind AND x.item_code = NEW.item_code FOR UPDATE;
    NEW.serial := COALESCE((SELECT pg_catalog.max(x.serial) FROM public.crate_copies x
                             WHERE x.item_kind = NEW.item_kind AND x.item_code = NEW.item_code AND x.serial IS NOT NULL), 0) + 1;
  END IF;
  IF v_live THEN
    v_coll := public._mint_ic_collectible(NEW.item_kind, NEW.item_code, CASE WHEN NEW.serial IS NOT NULL THEN 'unique' ELSE 'plain' END,
                                          pg_catalog.now(), true);
    IF v_coll IS NULL THEN
      RAISE EXCEPTION 'mint_refused: % % is not in the Intercept pool now', NEW.item_kind, NEW.item_code USING ERRCODE = 'check_violation';
    END IF;
    PERFORM public._mint_issue(v_coll, NEW.user_id, 'live', pg_catalog.jsonb_build_object('crate_copy', pg_catalog.to_jsonb(NEW)),
                               NEW.id, NEW.serial, NEW.seed, NEW.pattern);
  END IF;
  RETURN NEW;
END;
$function$

public._mint_on_crate_item()
CREATE OR REPLACE FUNCTION public._mint_on_crate_item()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  s public.mint_seasons;
  m public.mint_pool;
BEGIN
  IF NOT public._mint_live() THEN
    RETURN NULL;
  END IF;
  s := public._mint_season_at(pg_catalog.now());
  IF s.code IS NULL THEN
    RETURN NULL;
  END IF;
  SELECT * INTO m FROM public.mint_pool p WHERE p.season = s.code AND p.item_kind = NEW.item_kind AND p.item_code = NEW.item_code;
  IF NEW.active AND (TG_OP = 'INSERT' OR NOT OLD.active OR (NEW.mintable AND NOT OLD.mintable)) THEN
    IF m.retired_at IS NOT NULL AND m.retired_at <= pg_catalog.now() THEN
      RAISE EXCEPTION 'mint: % % retired from the pool this season; it can come back next season', NEW.item_kind, NEW.item_code
        USING ERRCODE = 'check_violation';
    END IF;
    PERFORM public._mint_define_pool_item(s.code, NEW.item_kind, NEW.item_code, COALESCE(m.active_from, pg_catalog.now()));
  ELSIF TG_OP = 'UPDATE' AND OLD.active AND NOT NEW.active AND m.season IS NOT NULL THEN
    UPDATE public.mint_pool p SET retired_at = LEAST(COALESCE(p.retired_at, pg_catalog.now()), pg_catalog.now())
     WHERE p.season = m.season AND p.item_kind = m.item_kind AND p.item_code = m.item_code;
    PERFORM public._mint_define(x.code, x.set_code, x.item_kind, x.item_code, x.variant, x.rule, x.rule_args, x.how, x.opens_at,
                                pg_catalog.now(), x.grace, x.tradable)
       FROM public.mint_collectibles x
      WHERE x.code IN (m.season || '.intercepts.' || m.item_kind || '.' || m.item_code, m.season || '.intercepts.' || m.item_kind || '.' || m.item_code || '.unique');
  END IF;
  IF TG_OP = 'UPDATE' AND OLD.mintable AND NOT NEW.mintable AND m.season IS NOT NULL THEN
    PERFORM public._mint_define(x.code, x.set_code, x.item_kind, x.item_code, x.variant, x.rule, x.rule_args, x.how, x.opens_at,
                                pg_catalog.now(), x.grace, x.tradable)
       FROM public.mint_collectibles x WHERE x.code = m.season || '.intercepts.' || m.item_kind || '.' || m.item_code || '.unique';
  END IF;
  RETURN NULL;
END;
$function$

public._mint_on_event()
CREATE OR REPLACE FUNCTION public._mint_on_event()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  IF NEW.format = 'tables' THEN
    PERFORM public._mint_define_night(NEW.id);
  END IF;
  RETURN NULL;
END;
$function$

public._mint_on_launch_dates()
CREATE OR REPLACE FUNCTION public._mint_on_launch_dates()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_s1s timestamptz := (NEW.value ->> 'season1_start')::timestamptz;
  v_s1e timestamptz := (NEW.value ->> 'season1_end')::timestamptz;
  v_l   timestamptz := (NEW.value ->> 'launch_at')::timestamptz;
  s1    public.mint_seasons;
BEGIN
  -- BETA TEST CHAIN (20261202295000; the wipe at Window W puts the real body back): the chain has started but Season 1
  -- hasn't, so a moved launch still moves it. The Beta season stays open to the wipe; the Beta test set's end (never
  -- minted on this chain) is set from launch_dates by the wipe.
  SELECT * INTO s1 FROM public.mint_seasons x WHERE x.code = 's1';
  UPDATE public.mint_seasons x SET ends_at = '2100-01-01'::timestamptz WHERE x.code = 's1';
  UPDATE public.mint_seasons x SET starts_at = v_s1s WHERE x.code = 's1';
  UPDATE public.mint_seasons x SET ends_at = v_s1e WHERE x.code = 's1';
  RETURN NULL;
END;
$function$

public._mint_on_unlock_revoke()
CREATE OR REPLACE FUNCTION public._mint_on_unlock_revoke()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_kind text := CASE WHEN TG_TABLE_NAME = 'player_titles' THEN 'title' ELSE 'avatar' END;
  v_code text;
  v_mod  bigint;
BEGIN
  IF v_kind = 'title' THEN v_code := NEW.title_code; ELSE v_code := NEW.item_code; END IF;
  IF NOT public._mint_live() OR OLD.revoked_at IS NOT NULL OR NEW.revoked_at IS NULL
     OR NOT EXISTS (SELECT 1 FROM public.mint_collectibles c WHERE c.item_kind = v_kind AND c.item_code = v_code) THEN
    RETURN NULL;
  END IF;
  SELECT m.id INTO v_mod FROM public.mod_actions m
   WHERE m.target_user_id = NEW.user_id AND m.action IN ('title_revoke', 'avatar_revoke')
     AND COALESCE(m.details ->> 'title', m.details ->> 'item') = v_code
   ORDER BY m.id DESC LIMIT 1;
  UPDATE public.mint_copies m
     SET status = 'burned', burn_reason = 'revoke',
         burn_evidence = pg_catalog.jsonb_build_object('rule', 'revoke', 'unlock_revoked_at', NEW.revoked_at, 'log', v_mod)
   WHERE m.holder = NEW.user_id AND m.status = 'held'
     AND m.collectible IN (SELECT c.code FROM public.mint_collectibles c WHERE c.item_kind = v_kind AND c.item_code = v_code);
  RETURN NULL;
END;
$function$

public._mint_public_url()
CREATE OR REPLACE FUNCTION public._mint_public_url()
 RETURNS text
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  SELECT COALESCE(
           (SELECT c.value #>> '{}' FROM public.app_config c WHERE c.key = 'mint_public_url' AND c.value #>> '{}' ~ '^https://'),
           (SELECT pg_catalog.substring(c.value #>> '{}', '^(https://[^/]+)/storage/v1/') || '/functions/v1/ledger'
              FROM public.app_config c WHERE c.key = 'avatar_url_prefix'))
$function$

public._mint_queue(text,text,bigint,text,text,text,jsonb)
CREATE OR REPLACE FUNCTION public._mint_queue(p_kind text, p_collectible text, p_copy_id bigint, p_from text, p_to text, p_note text, p_extra jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  INSERT INTO public.mint_outbox (kind, collectible, copy_id, from_tag, to_tag, note, extra)
  VALUES (p_kind, p_collectible, p_copy_id, COALESCE(p_from, ''), COALESCE(p_to, ''), COALESCE(p_note, ''), p_extra)
$function$

public._mint_restore(bigint,bigint)
CREATE OR REPLACE FUNCTION public._mint_restore(p_copy_id bigint, p_burn_seq bigint)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  IF NOT public._mint_live() THEN
    RAISE EXCEPTION 'mint restore: the ledger is not live' USING ERRCODE = 'object_not_in_prerequisite_state';
  END IF;
  PERFORM public._mint_drain(true, 100000);
  UPDATE public.mint_copies m SET status = 'held'
   WHERE m.id = p_copy_id AND m.status = 'burned' AND m.burn_seq = p_burn_seq AND m.burn_reason IN ('cheating', 'error', 'revoke');
  IF NOT FOUND THEN
    RAISE EXCEPTION 'mint restore: copy % has no such burn (seq %)', p_copy_id, p_burn_seq USING ERRCODE = 'no_data_found';
  END IF;
  PERFORM public._mint_drain(true, 100000);
  RETURN (SELECT pg_catalog.max(l.seq) FROM public.mint_ledger l WHERE l.copy_id = p_copy_id AND l.kind = 'restore');
END;
$function$

public._mint_rules_fp()
CREATE OR REPLACE FUNCTION public._mint_rules_fp()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_sql text := public._mint_rules_sql();
  v_fp  text := public._mint_sha256(v_sql);
BEGIN
  INSERT INTO public.mint_rules (fp, sql) VALUES (v_fp, v_sql) ON CONFLICT (fp) DO NOTHING;
  RETURN v_fp;
END;
$function$

public._mint_rules_sql()
CREATE OR REPLACE FUNCTION public._mint_rules_sql()
 RETURNS text
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  SELECT pg_catalog.string_agg(p.oid::regprocedure::text || E'\n' || pg_catalog.pg_get_functiondef(p.oid), E'\n'
                               ORDER BY p.oid::regprocedure::text COLLATE "C")
    FROM pg_catalog.pg_proc p
   WHERE p.pronamespace = 'public'::regnamespace
     AND (p.proname ~ '^_?mint_' OR p.proname IN ('_holder_tag', '_holder_secret', '_holder_age_band', '_minted_item', '_minted_closed',
                                                  '_minted_unlock_guard', '_events_gamenight_lock', '_gamenight_grant',
                                                  '_gamenight_bonus_title', '_gamenight_judge', 'open_crate', 'trade_up',
                                                  'shred_crate_copies', '_crate_copies_guard', '_crate_log_guard',
                                                  '_crate_trade_ups_guard', '_crate_copy_events_guard', '_crate_copy_events_write'))
$function$

public._mint_season_at(timestamp with time zone)
CREATE OR REPLACE FUNCTION public._mint_season_at(p_at timestamp with time zone)
 RETURNS public.mint_seasons
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  SELECT s.* FROM public.mint_seasons s WHERE s.starts_at <= p_at AND p_at < s.ends_at ORDER BY s.number DESC LIMIT 1
$function$

public._mint_sha256(text)
CREATE OR REPLACE FUNCTION public._mint_sha256(p text)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE STRICT
 SET search_path TO ''
AS $function$
  SELECT pg_catalog.encode(extensions.digest(pg_catalog.convert_to(p, 'UTF8'), 'sha256'), 'hex')
$function$

public._mint_started()
CREATE OR REPLACE FUNCTION public._mint_started()
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  SELECT (SELECT s.genesis_at FROM public.mint_state s) IS NOT NULL
$function$

public._mint_supply()
CREATE OR REPLACE FUNCTION public._mint_supply()
 RETURNS jsonb
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  SELECT COALESCE(pg_catalog.jsonb_agg(pg_catalog.jsonb_build_array(c.code, c.minted, c.burned,
                    (SELECT pg_catalog.count(*) FROM public.mint_copies x WHERE x.collectible = c.code AND x.status = 'held'),
                    c.closed_at IS NOT NULL) ORDER BY c.code COLLATE "C"), '[]'::jsonb)
    FROM public.mint_collectibles c
$function$

public._mint_trade_up_evidence(public.crate_trade_ups,public.crate_copies)
CREATE OR REPLACE FUNCTION public._mint_trade_up_evidence(t public.crate_trade_ups, cc public.crate_copies)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_inputs jsonb;
  v_n      integer;
  v_trade  boolean;
  v_ev     jsonb;
BEGIN
  SELECT pg_catalog.jsonb_agg(m.id ORDER BY m.crate_copy_id), pg_catalog.count(*), pg_catalog.bool_and(m.tradable)
    INTO v_inputs, v_n, v_trade
    FROM public.mint_copies m WHERE m.crate_copy_id = ANY (t.input_ids);
  IF v_n IS DISTINCT FROM pg_catalog.cardinality(t.input_ids) THEN
    RAISE EXCEPTION 'mint_refused: trade-up %''s inputs are not all minted (% of %)', t.id, COALESCE(v_n, 0), pg_catalog.cardinality(t.input_ids)
      USING ERRCODE = 'check_violation';
  END IF;
  IF t.user_id IS DISTINCT FROM cc.user_id AND cc.user_id IS NOT NULL THEN
    RAISE EXCEPTION 'mint_refused: trade-up % is another player''s', t.id USING ERRCODE = 'check_violation';
  END IF;
  v_ev := pg_catalog.jsonb_build_object('rule', 'ic_trade_up', 'trade_up', t.id, 'inputs', v_inputs, 'rarity', cc.rarity, 'odds', t.odds_version);
  IF cc.serial IS NOT NULL THEN
    v_ev := v_ev || pg_catalog.jsonb_build_object('unique', pg_catalog.jsonb_build_object('no', cc.serial, 'float', cc.seed, 'pattern', cc.pattern));
  END IF;
  RETURN pg_catalog.jsonb_build_object('earned_at', t.at, 'key', 'crate_copy:' || cc.id::text, 'tradable', COALESCE(v_trade, false), 'evidence', v_ev);
END;
$function$

public._mint_transfer_ok(public.mint_copies,public.mint_copies)
CREATE OR REPLACE FUNCTION public._mint_transfer_ok(o public.mint_copies, n public.mint_copies)
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  SELECT o.holder IS NOT NULL AND n.holder IS NOT NULL AND n.holder IS DISTINCT FROM o.holder
     AND o.status = 'held' AND n.status = 'held' AND o.frozen_at IS NULL AND n.frozen_at IS NULL AND o.tradable
     AND n.holder_tag IS NOT DISTINCT FROM public._holder_tag(n.holder, n.id)
     AND n.holder_age_band IS NOT DISTINCT FROM public._holder_age_band(n.holder)
     AND n.held_since IS NOT DISTINCT FROM pg_catalog.now()
     AND EXISTS (SELECT 1 FROM public.mint_transfers t
                  WHERE t.copy_id = o.id AND t.from_user = o.holder AND t.to_user = n.holder
                    AND t.txid = pg_catalog.txid_current() AND t.applied_at IS NULL);
$function$

public._mint_undo_prechain(text[],timestamp with time zone)
CREATE OR REPLACE FUNCTION public._mint_undo_prechain(p_codes text[], p_closes timestamp with time zone)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_n integer;
BEGIN
  IF public._mint_started() THEN
    RAISE EXCEPTION 'mint: the ledger has started: nothing minted is undone' USING ERRCODE = 'object_not_in_prerequisite_state';
  END IF;
  DELETE FROM public.mint_outbox o WHERE o.collectible = ANY (p_codes) AND o.kind IN ('mint', 'burn', 'retire', 'restore', 'close');
  DELETE FROM public.mint_copies m WHERE m.collectible = ANY (p_codes);
  GET DIAGNOSTICS v_n = ROW_COUNT;
  UPDATE public.mint_collectibles c SET minted = 0, burned = 0, closed_at = NULL, close_seq = NULL, closes_at = p_closes
   WHERE c.code = ANY (p_codes);
  UPDATE public.mint_sets s SET closed_at = NULL
   WHERE s.code IN (SELECT c.set_code FROM public.mint_collectibles c WHERE c.code = ANY (p_codes));
  RETURN v_n;
END;
$function$

public._mint_unlock_check()
CREATE OR REPLACE FUNCTION public._mint_unlock_check()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_kind text := CASE WHEN TG_TABLE_NAME = 'player_titles' THEN 'title' ELSE 'avatar' END;
  v_user uuid;
  v_code text;
  v_held boolean;
  v_row  boolean;
  v_live boolean;
  v_src  text;
  v_ref  text;
BEGIN
  IF NOT public._mint_live() THEN
    RETURN NULL;
  END IF;
  -- (each table's own column, read in its own branch: a record has only its table's fields)
  IF TG_OP = 'DELETE' THEN
    v_user := OLD.user_id;
    IF v_kind = 'title' THEN v_code := OLD.title_code; ELSE v_code := OLD.item_code; END IF;
  ELSE
    v_user := NEW.user_id;
    IF v_kind = 'title' THEN v_code := NEW.title_code; ELSE v_code := NEW.item_code; END IF;
  END IF;
  -- BETA TEST CHAIN (20261202295000): the Beta test set (Beta Pin, Field Tester) is minted at launch from the tester
  -- list (BR), never on this chain.
  IF NOT EXISTS (SELECT 1 FROM public.mint_collectibles c WHERE c.item_kind = v_kind AND c.item_code = v_code AND c.set_code <> 'beta.test') THEN
    RETURN NULL;
  END IF;
  v_held := EXISTS (SELECT 1 FROM public.mint_copies m JOIN public.mint_collectibles c ON c.code = m.collectible
                     WHERE m.holder = v_user AND m.status = 'held' AND c.item_kind = v_kind AND c.item_code = v_code);
  IF v_kind = 'title' THEN
    SELECT true, g.revoked_at IS NULL, g.source, g.ref INTO v_row, v_live, v_src, v_ref
      FROM public.player_titles g WHERE g.user_id = v_user AND g.title_code = v_code;
  ELSE
    SELECT true, u.revoked_at IS NULL AND u.source <> 'purchase', u.source, u.ref INTO v_row, v_live, v_src, v_ref
      FROM public.player_avatar_unlocks u WHERE u.user_id = v_user AND u.item_code = v_code;
  END IF;
  -- BETA TEST CHAIN: a pool item given outside the Intercepts (an owner gift, a code, the Lifetime Masquerade keep) has
  -- no copy; Window W's W1 takes every such row back before the real chain. Rows the Intercepts or a trade wrote: checked.
  IF COALESCE(v_live, false) AND NOT v_held
     AND (NOT EXISTS (SELECT 1 FROM public.crate_items ci WHERE ci.item_kind = v_kind AND ci.item_code = v_code)
          OR (v_src = 'grant' AND COALESCE(v_ref, '') ~ '^(crate|crate_copy|trade_up|trade):')) THEN
    RAISE EXCEPTION 'minted_item: % % is held without a minted copy', v_kind, v_code USING ERRCODE = 'check_violation';
  END IF;
  IF v_held AND NOT COALESCE(v_row, false) AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = v_user) THEN
    RAISE EXCEPTION 'minted_item: a held copy of % % needs its unlock row', v_kind, v_code USING ERRCODE = 'check_violation';
  END IF;
  RETURN NULL;
END;
$function$

public._mint_unlock_follow(public.mint_copies,boolean)
CREATE OR REPLACE FUNCTION public._mint_unlock_follow(n public.mint_copies, p_restore boolean)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  c public.mint_collectibles;
BEGIN
  SELECT * INTO c FROM public.mint_collectibles x WHERE x.code = n.collectible;
  IF n.holder IS NULL THEN
    RETURN;
  END IF;
  IF NOT p_restore THEN
    IF n.crate_copy_id IS NOT NULL AND n.burn_reason IN ('cheating', 'error', 'revoke') THEN
      INSERT INTO public.crate_copy_events (copy_id, at, kind, from_user, reason)
      VALUES (n.crate_copy_id, pg_catalog.now(), 'revoke', n.holder, 'mint burn: ' || n.burn_reason);
      UPDATE public.crate_copies x SET user_id = NULL WHERE x.id = n.crate_copy_id AND x.user_id = n.holder;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.mint_copies m JOIN public.mint_collectibles k ON k.code = m.collectible
                    WHERE m.holder = n.holder AND m.status = 'held' AND k.item_kind = c.item_kind AND k.item_code = c.item_code) THEN
      IF c.item_kind = 'title' THEN
        UPDATE public.player_titles g SET revoked_at = pg_catalog.now()
         WHERE g.user_id = n.holder AND g.title_code = c.item_code AND g.revoked_at IS NULL;
      ELSE
        UPDATE public.player_avatar_unlocks u SET revoked_at = pg_catalog.now()
         WHERE u.user_id = n.holder AND u.item_code = c.item_code AND u.revoked_at IS NULL AND u.source <> 'purchase';
      END IF;
    END IF;
  ELSE
    IF n.crate_copy_id IS NOT NULL THEN
      INSERT INTO public.crate_copy_events (copy_id, at, kind, to_user, reason)
      VALUES (n.crate_copy_id, pg_catalog.now(), 'restore', n.holder, 'mint restore');
      UPDATE public.crate_copies x SET user_id = n.holder WHERE x.id = n.crate_copy_id AND x.user_id IS NULL;
    END IF;
    -- (the Intercept engine's own mark lets a pool item's row back past the no-direct-items guard, then is cleared)
    PERFORM pg_catalog.set_config('spy_social.crate_write', n.holder::text || ':' || c.item_kind || ':' || c.item_code, true);
    IF c.item_kind = 'title' THEN
      UPDATE public.player_titles g SET revoked_at = NULL WHERE g.user_id = n.holder AND g.title_code = c.item_code AND g.revoked_at IS NOT NULL;
    ELSE
      UPDATE public.player_avatar_unlocks u SET revoked_at = NULL WHERE u.user_id = n.holder AND u.item_code = c.item_code AND u.revoked_at IS NOT NULL;
    END IF;
    PERFORM pg_catalog.set_config('spy_social.crate_write', '', true);
  END IF;
END;
$function$

public._mint_validate(public.mint_collectibles,public.mint_copies)
CREATE OR REPLACE FUNCTION public._mint_validate(c public.mint_collectibles, n public.mint_copies)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  e        public.events;
  p        public.gamenight_prizes;
  b        public.gamenight_bonus;
  mg       public.match_games;
  cc       public.crate_copies;
  k        public.player_crates;
  g        public.crate_grants;
  t        public.crate_trade_ups;
  v_slot   text;
  v_found  timestamptz;
  v_earned timestamptz;
  v_res    text;
  v_titles text[];
  v_win    text;
  v_role   text;
  v_src    text;
  v_tier   smallint;
  v_odds   text;
  v_reasons text[];
  v_cap    timestamptz;
  v_roll   bigint;
  v_ev     jsonb;
  v_minter uuid;
  -- 20261202290000: 'owner' out: an Intercept the owner gives (owner_crates_grant) mints bound, as the approved spec's
  -- tradability table says of owner gifts (Social + Trading section 9); its trade-ups follow (_mint_trade_up_evidence).
  c_tradable_sources constant text[] := ARRAY['wins', 'daily', 'game_night', 'featured_pack', 'creator_code'];
BEGIN
  IF n.holder IS NULL AND NOT (c.rule = 'ic_open' AND n.reason = 'retro') THEN
    RAISE EXCEPTION 'mint_refused: % needs a holder', c.code USING ERRCODE = 'check_violation';
  END IF;

  -- ---- Game Night: participation, Local Hero, Master Spy -------------------------------------------------------
  IF c.rule IN ('gn_participation', 'gn_local', 'gn_spy') THEN
    v_slot := CASE c.rule WHEN 'gn_participation' THEN 'participation' WHEN 'gn_local' THEN 'local' ELSE 'spy' END;
    SELECT * INTO e FROM public.events x WHERE x.id = (c.rule_args ->> 'event_id')::uuid;
    SELECT * INTO p FROM public.gamenight_prizes x
     WHERE x.event_id = e.id AND x.user_id = n.holder AND x.slot = v_slot AND x.revoked_at IS NULL;
    IF e.id IS NULL OR p.event_id IS NULL OR p.code IS DISTINCT FROM c.item_code THEN
      RAISE EXCEPTION 'mint_refused: no % prize of % for this player', v_slot, e.link_id USING ERRCODE = 'check_violation';
    END IF;
    IF n.reason = 'owner_exception' THEN
      -- Owner-approved exceptions, each named here (and so in the rules' fingerprint): RodneyRugerton's Beta Game Night
      -- participation (he left the 23:22 table early; granted by the owner on Oct 30, 2026 at 05:50 UTC).
      IF NOT (e.id = '0505ccb9-8325-4e04-a1aa-637fc193679e'::uuid AND v_slot = 'participation' AND p.via = 'game'
              AND p.game_id = 'aa9095bf-9dc2-4c71-92e5-9d3bdb349b6c'::uuid
              AND p.granted_at = '2026-10-30 05:50:21.415719+00'::timestamptz) THEN
        RAISE EXCEPTION 'mint_refused: not an owner-approved exception' USING ERRCODE = 'check_violation';
      END IF;
      v_earned := p.granted_at;
    ELSIF p.via = 'game' THEN
      SELECT * INTO mg FROM public.match_games x WHERE x.game_id = p.game_id;
      SELECT o.created_at INTO v_found FROM public.match_offers o WHERE o.game_id = p.game_id ORDER BY o.id LIMIT 1;
      IF mg.game_id IS NULL OR mg.event_id IS DISTINCT FROM e.id OR mg.dealt_at < e.starts_at
         OR NOT (mg.dealt_at < e.ends_at OR COALESCE(v_found < e.ends_at, false)) THEN
        RAISE EXCEPTION 'mint_refused: the game is not one of % dealt in its window', e.link_id USING ERRCODE = 'check_violation';
      END IF;
      IF n.reason = 'live' THEN
        v_res := public._gamenight_judge(p.game_id, n.holder);
        IF v_res IS DISTINCT FROM 'ok' THEN
          RAISE EXCEPTION 'mint_refused: the judge says % for this seat', COALESCE(v_res, 'not scored') USING ERRCODE = 'check_violation';
        END IF;
        SELECT x.winner::text INTO v_win FROM public.games x WHERE x.id = p.game_id;
        SELECT x.player_role::text INTO v_role FROM public.game_players x WHERE x.game_id = p.game_id AND x.user_id = n.holder;
        IF (v_slot = 'local' AND NOT (v_win = 'Locals' AND v_role = 'Local')) OR (v_slot = 'spy' AND NOT (v_win = 'Spies' AND v_role = 'Spy')) THEN
          RAISE EXCEPTION 'mint_refused: the seat did not win as %', v_slot USING ERRCODE = 'check_violation';
        END IF;
      ELSE
        SELECT x.outcome, x.titles INTO v_res, v_titles FROM public.gamenight_results x WHERE x.game_id = p.game_id AND x.user_id = n.holder;
        IF v_res IS DISTINCT FROM 'granted' OR NOT (v_slot = ANY (v_titles)) THEN
          RAISE EXCEPTION 'mint_refused: the recorded result is % for this seat', COALESCE(v_res, 'missing') USING ERRCODE = 'check_violation';
        END IF;
      END IF;
      SELECT COALESCE(x.ended_at, p.granted_at) INTO v_earned FROM public.games x WHERE x.id = p.game_id;
      v_earned := COALESCE(v_earned, p.granted_at);
    ELSIF p.via = 'last_table' AND v_slot = 'participation' THEN
      SELECT q.ended_at INTO v_earned FROM public.match_searches q
       WHERE q.event_id = e.id AND q.user_id = n.holder AND q.end_reason = 'gn_over'
         AND q.ended_at >= e.ends_at AND q.ended_at < e.ends_at + interval '1 day'
       ORDER BY q.ended_at LIMIT 1;
      IF v_earned IS NULL THEN
        RAISE EXCEPTION 'mint_refused: no last-table search for this player at %', e.link_id USING ERRCODE = 'check_violation';
      END IF;
    ELSE
      RAISE EXCEPTION 'mint_refused: prize via % is not a Game Night rule', p.via USING ERRCODE = 'check_violation';
    END IF;
    RETURN pg_catalog.jsonb_build_object(
      'earned_at', v_earned, 'key', 'gn:' || n.holder::text || ':' || v_slot, 'tradable', true,
      'evidence', pg_catalog.jsonb_build_object('rule', c.rule, 'night', e.link_id, 'slot', v_slot, 'via', p.via, 'game', p.game_id,
                                                'earned_at', v_earned, 'exception', CASE WHEN n.reason = 'owner_exception'
                                                  THEN 'left early; granted by the owner on Oct 30, 2026 at 05:50 UTC' END));

  -- ---- Game Night: Developer's Pick ------------------------------------------------------------------------------
  ELSIF c.rule = 'gn_bonus' THEN
    SELECT * INTO e FROM public.events x WHERE x.id = (c.rule_args ->> 'event_id')::uuid;
    SELECT * INTO b FROM public.gamenight_bonus x WHERE x.event_id = e.id AND x.user_id = n.holder;
    SELECT * INTO mg FROM public.match_games x WHERE x.game_id = b.game_id;
    SELECT o.created_at INTO v_found FROM public.match_offers o WHERE o.game_id = b.game_id ORDER BY o.id LIMIT 1;
    IF e.id IS NULL OR b.id IS NULL OR b.code IS DISTINCT FROM c.item_code OR b.kind <> 'title'
       OR mg.game_id IS NULL OR mg.event_id IS DISTINCT FROM e.id OR mg.dealt_at < e.starts_at
       OR NOT (mg.dealt_at < e.ends_at OR COALESCE(v_found < e.ends_at, false))
       OR b.at < e.starts_at OR b.at >= e.ends_at + interval '3 hours' THEN
      RAISE EXCEPTION 'mint_refused: no Developer''s Pick of % for this player at a live table of the night', e.link_id
        USING ERRCODE = 'check_violation';
    END IF;
    RETURN pg_catalog.jsonb_build_object(
      'earned_at', b.at, 'key', 'gn:' || n.holder::text || ':bonus', 'tradable', true,
      'evidence', pg_catalog.jsonb_build_object('rule', c.rule, 'night', e.link_id, 'slot', 'bonus', 'game', b.game_id, 'earned_at', b.at));

  -- ---- Beta: the Beta Pin and Field Tester, from the tester list --------------------------------------------------
  ELSIF c.rule IN ('beta_pin', 'field_tester') THEN
    IF pg_catalog.to_regclass('public.beta_testers_2_2') IS NULL THEN
      RAISE EXCEPTION 'mint_refused: no tester list (WS, 20261201955000)' USING ERRCODE = 'check_violation';
    END IF;
    EXECUTE 'SELECT b.reasons, LEAST(b.captured_at, b.topped_up_at) FROM public.beta_testers_2_2 b WHERE b.user_id = $1'
      INTO v_reasons, v_cap USING n.holder;
    IF v_reasons IS NULL THEN
      RAISE EXCEPTION 'mint_refused: % is not on the tester list', n.holder USING ERRCODE = 'check_violation';
    END IF;
    v_earned := public._mint_beta_earned(n.holder);
    RETURN pg_catalog.jsonb_build_object(
      'earned_at', v_earned, 'key', 'beta:' || n.holder::text, 'tradable', true,
      'evidence', pg_catalog.jsonb_build_object('rule', c.rule, 'list', 'beta_testers_2_2', 'reasons', pg_catalog.to_jsonb(v_reasons),
                                                'earned_at', v_earned));

  -- ---- Intercepts: an opened Intercept, or a trade-up ------------------------------------------------------------
  ELSIF c.rule = 'ic_open' THEN
    IF n.reason = 'live' THEN
      cc := pg_catalog.jsonb_populate_record(NULL::public.crate_copies, n.evidence -> 'crate_copy');
    ELSE
      SELECT * INTO cc FROM public.crate_copies x WHERE x.id = n.crate_copy_id;
    END IF;
    -- who it was minted to: the holder now (live), or the registry's mint row (retro: a copy since traded in, shredded
    -- or retired was still minted to whoever made it)
    v_minter := CASE WHEN n.reason = 'live' THEN cc.user_id
                     ELSE COALESCE((SELECT ev.to_user FROM public.crate_copy_events ev WHERE ev.copy_id = cc.id AND ev.kind = 'mint' ORDER BY ev.id LIMIT 1),
                                   cc.user_id) END;
    IF cc.id IS NULL OR cc.id IS DISTINCT FROM n.crate_copy_id OR cc.item_kind <> c.item_kind OR cc.item_code <> c.item_code
       OR (cc.serial IS NOT NULL) <> (c.variant = 'unique') OR v_minter IS DISTINCT FROM n.holder
       OR (c.variant = 'unique' AND (n.serial IS DISTINCT FROM cc.serial OR n.unique_seed IS DISTINCT FROM cc.seed OR n.unique_pattern IS DISTINCT FROM cc.pattern)) THEN
      RAISE EXCEPTION 'mint_refused: the copy is not this collectible''s (% %, %)', cc.item_kind, cc.item_code, c.code USING ERRCODE = 'check_violation';
    END IF;
    v_earned := CASE WHEN n.reason = 'live' THEN pg_catalog.now() ELSE cc.obtained_at END;
    IF public._mint_ic_collectible(cc.item_kind, cc.item_code, c.variant, v_earned, false) IS DISTINCT FROM c.code THEN
      RAISE EXCEPTION 'mint_refused: % % is not in the pool as % at %', cc.item_kind, cc.item_code, c.code, v_earned USING ERRCODE = 'check_violation';
    END IF;
    IF cc.source = 'crate' THEN
      SELECT * INTO k FROM public.player_crates x WHERE x.id = cc.crate_id;
      IF n.reason = 'live' THEN
        -- the Intercept being opened now, by its holder (open_crate holds it locked; one copy per Intercept)
        IF k.id IS NULL OR k.user_id IS DISTINCT FROM n.holder OR k.opened_at IS NOT NULL THEN
          RAISE EXCEPTION 'mint_refused: not an unopened Intercept of this player' USING ERRCODE = 'check_violation';
        END IF;
        SELECT * INTO g FROM public.crate_grants x WHERE x.id = k.grant_id;
        v_src := g.source;
        v_tier := k.tier;
        v_odds := (SELECT x.odds_version FROM public.crate_config x);
      ELSE
        SELECT r.id, r.source, r.tier, r.odds_version INTO v_roll, v_src, v_tier, v_odds
          FROM public.crate_rolls r WHERE r.copy_id = cc.id AND r.event = 'open' ORDER BY r.id LIMIT 1;
        IF v_roll IS NULL THEN
          RAISE EXCEPTION 'mint_refused: copy % has no opening roll', cc.id USING ERRCODE = 'check_violation';
        END IF;
      END IF;
      v_ev := pg_catalog.jsonb_build_object('rule', 'ic_open', 'intercept', cc.crate_id, 'source', v_src, 'tier', v_tier, 'odds', v_odds,
                                            'rarity', cc.rarity, 'roll', v_roll);
      -- intercepts_market: an Intercept that changed hands unopened (bought or traded) gives a tradable copy, whatever
      -- its origin (a gift is only a gift while it never left its account)
      IF k.moved_at IS NOT NULL THEN
        v_ev := v_ev || '{"moved": true}'::jsonb;
      END IF;
      IF cc.serial IS NOT NULL THEN
        v_ev := v_ev || pg_catalog.jsonb_build_object('unique', pg_catalog.jsonb_build_object('no', cc.serial, 'float', cc.seed, 'pattern', cc.pattern));
      END IF;
      -- Decision (design 3.1): an opened Intercept's copy can trade, whatever its source, none being sold; except the
      -- owner's gifts (20261202290000), bound like every owner gift.
      -- TODO(minting): an Intercept ever sold, or given with a paid plan, must make its copies bound (loot-box rules).
      RETURN pg_catalog.jsonb_build_object('earned_at', v_earned, 'key', 'crate_copy:' || cc.id::text,
                                           -- market_rules_1101: an owner's gift trades while economy.gift_copies_tradable is on (owner 2026-11-01)
                                           'tradable', COALESCE(v_src = ANY (c_tradable_sources) OR (v_src = 'owner' AND public._gift_switch_on()) OR k.moved_at IS NOT NULL, false),
                                           'evidence', v_ev);
    ELSIF cc.source = 'trade_up' THEN
      IF n.reason = 'live' THEN
        -- The trade-up's own row is written right after this copy: completed at commit (_mint_copies_commit).
        RETURN pg_catalog.jsonb_build_object('earned_at', v_earned, 'key', 'crate_copy:' || cc.id::text, 'tradable', false, 'pending', true,
                 'evidence', pg_catalog.jsonb_build_object('rule', 'ic_trade_up', 'trade_up', 'pending', 'rarity', cc.rarity));
      END IF;
      SELECT * INTO t FROM public.crate_trade_ups x WHERE x.copy_id = cc.id;
      IF t.id IS NULL THEN
        RAISE EXCEPTION 'mint_refused: copy % has no trade-up', cc.id USING ERRCODE = 'check_violation';
      END IF;
      RETURN public._mint_trade_up_evidence(t, cc);
    ELSE
      -- TODO(minting, owner decision 7 deferred): requisitions with Intel have no rule yet; requisitions are off
      -- (crate_config.requisitions_on false). Decide tradable or bound, then add the rule here.
      RAISE EXCEPTION 'mint_refused: % copies have no rule yet (requisitions: decision 7 deferred)', cc.source USING ERRCODE = 'check_violation';
    END IF;
  END IF;
  RAISE EXCEPTION 'mint_refused: rule % has no validator', c.rule USING ERRCODE = 'check_violation';
END;
$function$

public._mint_verify(bigint)
CREATE OR REPLACE FUNCTION public._mint_verify(p_from bigint DEFAULT 1)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SET search_path TO ''
AS $function$
DECLARE
  r      public.mint_ledger;
  v_prev text;
  v_n    bigint := 0;
BEGIN
  SELECT l.hash INTO v_prev FROM public.mint_ledger l WHERE l.seq = p_from - 1;
  IF p_from <= 1 THEN
    v_prev := pg_catalog.repeat('0', 64);
  END IF;
  FOR r IN SELECT * FROM public.mint_ledger l WHERE l.seq >= p_from ORDER BY l.seq LOOP
    IF r.prev_hash <> v_prev OR r.hash <> public._mint_sha256(public._mint_line(r)) OR r.seq <> p_from + v_n THEN
      RETURN pg_catalog.jsonb_build_object('ok', false, 'bad_seq', r.seq, 'rows', v_n);
    END IF;
    v_prev := r.hash;
    v_n := v_n + 1;
  END LOOP;
  RETURN pg_catalog.jsonb_build_object('ok', true, 'rows', v_n, 'head', v_prev);
END;
$function$

public._mint_void_ok(public.mint_copies)
CREATE OR REPLACE FUNCTION public._mint_void_ok(m public.mint_copies)
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  -- (20261207998000) set only by _deletion_void_copy, for one copy and its holder, and cleared right after
  SELECT m.id IS NOT NULL AND m.holder IS NOT NULL
     AND COALESCE(pg_catalog.current_setting('spy_social.mint_void', true), '') = (m.id::text || ':' || m.holder::text)
$function$

public._minted_closed(text,text,uuid,text,timestamp with time zone)
CREATE OR REPLACE FUNCTION public._minted_closed(p_kind text, p_code text, p_user uuid, p_ref text, p_unlocked_at timestamp with time zone)
 RETURNS text
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  c_pin_cut  constant timestamptz := public._launch_date('launch_at');   -- the Beta Pin's claims end (launch)
  c_ft_cut   constant timestamptz := public._launch_date('field_tester_cut');   -- BETATESTING and BETATESTING1-10 expire
  c_br_until constant timestamptz := public._launch_date('br_until');   -- the launch re-grant (BR) runs at the launch hour
  c_grace    constant interval := interval '3 hours';
  v_unlock   jsonb;
  e          public.events;
  v_listed   boolean := false;
BEGIN
  IF p_code IS NULL THEN
    RETURN NULL;
  END IF;
  -- 20261202200000 (Phase 1): once the ledger is live the copies decide.
  -- BETA TEST CHAIN (20261202295000): the Beta Pin and Field Tester keep their pre-ledger windows (BR mints them at launch).
  IF public._mint_live() AND EXISTS (SELECT 1 FROM public.mint_collectibles c WHERE c.item_kind = p_kind AND c.item_code = p_code AND c.set_code <> 'beta.test') THEN
    IF EXISTS (SELECT 1 FROM public.crate_items ci WHERE ci.item_kind = p_kind AND ci.item_code = p_code) THEN
      RETURN NULL;   -- a pool item: checked at commit (_mint_unlock_check)
    END IF;
    IF EXISTS (SELECT 1 FROM public.mint_copies m JOIN public.mint_collectibles c ON c.code = m.collectible
                WHERE m.holder = p_user AND m.status = 'held' AND c.item_kind = p_kind AND c.item_code = p_code) THEN
      RETURN NULL;
    END IF;
    RETURN 'no_copy';
  END IF;
  IF p_kind = 'avatar' AND p_code = 'accessory_beta_pin' THEN
    IF pg_catalog.now() < c_pin_cut THEN
      RETURN NULL;
    END IF;
  ELSIF p_kind = 'title' AND p_code = 'code_pvsysb2et7' THEN
    IF pg_catalog.now() < c_ft_cut THEN
      RETURN NULL;
    END IF;
  ELSE
    IF p_kind = 'title' THEN
      SELECT t.unlock INTO v_unlock FROM public.titles t WHERE t.code = p_code AND t.grp = 'game_night';
    ELSE
      SELECT i.unlock INTO v_unlock FROM public.avatar_items i WHERE i.code = p_code;
    END IF;
    IF v_unlock IS NULL OR v_unlock ->> 'type' IS DISTINCT FROM 'event' THEN
      RETURN NULL;
    END IF;
    SELECT * INTO e FROM public.events x WHERE x.link_id = v_unlock ->> 'code';
    IF e.id IS NOT NULL AND e.cancelled_at IS NULL AND pg_catalog.now() < e.ends_at + c_grace
       AND (p_kind = 'avatar' OR pg_catalog.now() >= e.starts_at) THEN
      RETURN NULL;
    END IF;
  END IF;
  -- Closed. A row kept whole by a reset or the re-grant (crate_revocations) may come back exactly as it was.
  IF p_unlocked_at IS NOT NULL AND EXISTS (
       SELECT 1 FROM public.crate_revocations r
        WHERE r.user_id = p_user AND r.item_code = p_code
          AND r.what = CASE p_kind WHEN 'title' THEN 'title_unlock' ELSE 'avatar_unlock' END
          AND (r.before ->> 'unlocked_at')::timestamptz = p_unlocked_at) THEN
    RETURN NULL;
  END IF;
  IF (p_kind = 'avatar' AND p_code = 'accessory_beta_pin') OR (p_kind = 'title' AND p_code = 'code_pvsysb2et7') THEN
    -- The launch re-grant (BR, 20261201960000) to an account on the tester list (WS, 20261201955000).
    IF p_ref = 'beta_2026_launch' AND pg_catalog.now() < c_br_until AND pg_catalog.to_regclass('public.beta_testers_2_2') IS NOT NULL THEN
      EXECUTE 'SELECT EXISTS (SELECT 1 FROM public.beta_testers_2_2 b WHERE b.user_id = $1)' INTO v_listed USING p_user;
      IF v_listed THEN
        RETURN NULL;
      END IF;
    END IF;
    RETURN CASE WHEN p_kind = 'avatar' THEN 'beta_pin_closed' ELSE 'field_tester_closed' END;
  END IF;
  RETURN 'event_closed';
END;
$function$

public._minted_item(text,text)
CREATE OR REPLACE FUNCTION public._minted_item(p_kind text, p_code text)
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  -- (Field Tester follows its own cut: until then BETATESTING's codes may still be edited, e.g. a moved launch)
  SELECT EXISTS (SELECT 1 FROM public.mint_collectibles c WHERE c.item_kind = p_kind AND c.item_code = p_code
                    AND NOT (c.item_kind = 'title' AND c.item_code = 'code_pvsysb2et7'))
      OR CASE
           WHEN p_kind = 'avatar' AND p_code = 'accessory_beta_pin' THEN true
           -- 20261202436000: Beta Tester comes with the pin (earned only), never from an owner tool.
           WHEN p_kind = 'title' AND p_code = 'beta_tester' THEN true
           WHEN p_kind = 'title' AND p_code = 'code_pvsysb2et7' THEN pg_catalog.now() >= public._launch_date('field_tester_cut')
           WHEN p_kind = 'title' THEN EXISTS (SELECT 1 FROM public.titles t
                                               WHERE t.code = p_code AND t.grp = 'game_night' AND t.unlock ->> 'type' = 'event')
           WHEN p_kind = 'avatar' THEN EXISTS (SELECT 1 FROM public.avatar_items i
                                                WHERE i.code = p_code AND i.unlock ->> 'type' = 'event')
           ELSE false
         END
$function$

public._minted_unlock_guard()
CREATE OR REPLACE FUNCTION public._minted_unlock_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
DECLARE
  v_kind text;
  v_code text;
  v_why  text;
BEGIN
  IF NEW.revoked_at IS NOT NULL THEN
    RETURN NEW;
  END IF;
  IF TG_TABLE_NAME = 'player_titles' THEN
    v_kind := 'title';
    v_code := NEW.title_code;
    IF TG_OP = 'UPDATE' AND OLD.revoked_at IS NULL AND OLD.user_id = NEW.user_id AND OLD.title_code = NEW.title_code THEN
      RETURN NEW;
    END IF;
  ELSE
    v_kind := 'avatar';
    v_code := NEW.item_code;
    IF TG_OP = 'UPDATE' AND OLD.revoked_at IS NULL AND OLD.user_id = NEW.user_id AND OLD.item_code = NEW.item_code THEN
      RETURN NEW;
    END IF;
  END IF;
  v_why := public._minted_closed(v_kind, v_code, NEW.user_id, NEW.ref, NEW.unlocked_at);
  IF v_why IS NOT NULL THEN
    RAISE EXCEPTION 'minted_item: % % can no longer be given (%)', v_kind, v_code, v_why
      USING ERRCODE = 'check_violation', HINT = 'A minted collectible is earned only by its rule, inside its window.';
  END IF;
  RETURN NEW;
END;
$function$

public.mint_checkpoint(date)
CREATE OR REPLACE FUNCTION public.mint_checkpoint(p_day date DEFAULT NULL::date)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_day    date := COALESCE(p_day, (pg_catalog.now() AT TIME ZONE 'UTC')::date - 1);
  v_supply jsonb;
  v_fp     text;
  v_intel  jsonb;
  v_note   text;
BEGIN
  IF NOT public._mint_live() THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'not_live');
  END IF;
  PERFORM public._mint_drain(true, 100000);
  IF EXISTS (SELECT 1 FROM public.mint_heads h WHERE h.day = v_day) THEN
    RETURN pg_catalog.jsonb_build_object('ok', true, 'already', true, 'day', v_day);
  END IF;
  v_supply := public._mint_supply();
  v_fp := public._mint_rules_fp();
  -- 20261202210000 (E1, 7d270d593): the day's digest stored now, its sha256 and rows for the note; the stored
  -- one is the one on the chain. Older E1: the read-only digest. Neither: no Intel part.
  IF pg_catalog.to_regprocedure('public._intel_digest_checkpoint(date,bigint)') IS NOT NULL THEN
    BEGIN
      EXECUTE 'SELECT public._intel_digest_checkpoint($1)' INTO v_intel USING v_day;
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'mint checkpoint: _intel_digest_checkpoint(%) failed: %', v_day, SQLERRM;
      v_intel := NULL;
    END;
  ELSIF pg_catalog.to_regprocedure('public._intel_digest(date)') IS NOT NULL THEN
    BEGIN
      EXECUTE 'SELECT public._intel_digest($1)' INTO v_intel USING v_day;
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'mint checkpoint: _intel_digest(%) failed: %', v_day, SQLERRM;
      v_intel := NULL;
    END;
  END IF;
  v_note := 'day:' || v_day::text || ';supply:' || public._mint_sha256(v_supply::text) || ';rules:' || v_fp
            || CASE WHEN v_intel ->> 'sha256' ~ '^[0-9a-f]{64}$'
                    THEN ';intel:' || (v_intel ->> 'sha256') || ';intel_rows:' || COALESCE((v_intel ->> 'rows')::bigint, 0)::text ELSE '' END;
  PERFORM public._mint_queue('checkpoint', NULL, NULL, '', '', v_note,
            pg_catalog.jsonb_build_object('day', v_day, 'supply', v_supply, 'rules_fp', v_fp, 'intel', v_intel));
  PERFORM public._mint_drain(true, 100000);
  RETURN pg_catalog.jsonb_build_object('ok', true, 'day', v_day, 'head', (SELECT h.hash FROM public.mint_heads h WHERE h.day = v_day));
END;
$function$

public.mint_close_due()
CREATE OR REPLACE FUNCTION public.mint_close_due()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  r   record;
  v_n integer := 0;
BEGIN
  IF NOT public._mint_live() THEN
    RETURN 0;
  END IF;
  -- A retirement set ahead (mint_pool.retired_at in the future) takes the item out of the pool when it falls due.
  FOR r IN SELECT p.item_kind, p.item_code FROM public.mint_pool p JOIN public.crate_items ci USING (item_kind, item_code)
            WHERE p.retired_at IS NOT NULL AND p.retired_at <= pg_catalog.now() AND ci.active LOOP
    UPDATE public.crate_items ci SET active = false WHERE ci.item_kind = r.item_kind AND ci.item_code = r.item_code;
  END LOOP;
  FOR r IN SELECT c.code FROM public.mint_collectibles c
            WHERE c.closed_at IS NULL AND c.closes_at + c.grace <= pg_catalog.now() ORDER BY c.closes_at, c.code LOOP
    IF public._mint_close_now(r.code) THEN
      v_n := v_n + 1;
    END IF;
  END LOOP;
  UPDATE public.mint_state s SET health = public.mint_health(), updated_at = pg_catalog.now() WHERE s.id;
  RETURN v_n;
END;
$function$

public.mint_health()
CREATE OR REPLACE FUNCTION public.mint_health()
 RETURNS jsonb
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  SELECT pg_catalog.jsonb_build_object(
    'at', pg_catalog.now(),
    'unledgered_5m', (SELECT pg_catalog.count(*) FROM public.mint_copies c WHERE c.ledger_seq IS NULL AND c.minted_at < pg_catalog.now() - interval '5 minutes'),
    'outbox', (SELECT pg_catalog.count(*) FROM public.mint_outbox),
    'last_seq', (SELECT pg_catalog.max(l.seq) FROM public.mint_ledger l),
    'last_at', (SELECT pg_catalog.max(l.at) FROM public.mint_ledger l),
    'season_ends_soon_without_next', EXISTS (
       SELECT 1 FROM public.mint_seasons s
        WHERE s.starts_at <= pg_catalog.now() AND s.ends_at > pg_catalog.now() AND s.ends_at < pg_catalog.now() + interval '14 days'
          AND NOT EXISTS (SELECT 1 FROM public.mint_seasons n WHERE n.starts_at = s.ends_at)),
    'ok', NOT EXISTS (SELECT 1 FROM public.mint_copies c WHERE c.ledger_seq IS NULL AND c.minted_at < pg_catalog.now() - interval '5 minutes'))
$function$

public.mint_ledger_drain()
CREATE OR REPLACE FUNCTION public.mint_ledger_drain()
 RETURNS integer
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT public._mint_drain(false, 5000)
$function$

public.mint_public(jsonb)
CREATE OR REPLACE FUNCTION public.mint_public(p_req jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_op    text := p_req ->> 'op';
  v_after bigint;
  v_limit integer;
  v_copy  bigint;
  v_code  text;
  v_day   date;
BEGIN
  IF v_op = 'head' THEN
    IF p_req ? 'day' THEN
      BEGIN v_day := (p_req ->> 'day')::date; EXCEPTION WHEN OTHERS THEN RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'bad_day'); END;
      RETURN (SELECT pg_catalog.jsonb_build_object('ok', true, 'chain', 'beta', 'notice', 'BETA TEST CHAIN: for testing only. Every copy, serial, trade and head on it is wiped before launch; the real chain starts at launch with its own genesis and serials from #1.', 'day', h.day, 'seq', h.seq, 'hash', h.hash,
                       'at', pg_catalog.to_char(h.at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'),
                       'supply_text', h.supply::text, 'rules_fp', h.rules_fp, 'intel', h.intel, 'witnessed', h.witnessed)
                FROM public.mint_heads h WHERE h.day = v_day);
    END IF;
    RETURN pg_catalog.jsonb_build_object('ok', true, 'chain', 'beta', 'notice', 'BETA TEST CHAIN: for testing only. Every copy, serial, trade and head on it is wiped before launch; the real chain starts at launch with its own genesis and serials from #1.',
      'tip', (SELECT pg_catalog.jsonb_build_object('seq', l.seq, 'hash', l.hash, 'at', pg_catalog.to_char(l.at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'))
                FROM public.mint_ledger l ORDER BY l.seq DESC LIMIT 1),
      'genesis', (SELECT pg_catalog.jsonb_build_object('seq', l.seq, 'hash', l.hash) FROM public.mint_ledger l WHERE l.seq = 1),
      'heads', (SELECT COALESCE(pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object('day', h.day, 'seq', h.seq, 'hash', h.hash, 'rules_fp', h.rules_fp,
                                 'supply_sha256', public._mint_sha256(h.supply::text), 'witnessed', h.witnessed) ORDER BY h.day DESC), '[]'::jsonb)
                  FROM (SELECT * FROM public.mint_heads x ORDER BY x.day DESC LIMIT 400) h));
  ELSIF v_op = 'rows' THEN
    v_after := GREATEST(COALESCE((p_req ->> 'after')::bigint, 0), 0);
    v_limit := LEAST(GREATEST(COALESCE((p_req ->> 'limit')::integer, 1000), 1), 2000);
    RETURN pg_catalog.jsonb_build_object('ok', true, 'chain', 'beta', 'notice', 'BETA TEST CHAIN: for testing only. Every copy, serial, trade and head on it is wiped before launch; the real chain starts at launch with its own genesis and serials from #1.', 'rows', (
      SELECT COALESCE(pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object(
               'seq', l.seq, 'at', pg_catalog.to_char(l.at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'), 'kind', l.kind,
               'collectible', l.collectible, 'serial', l.serial, 'copy_id', l.copy_id, 'from_tag', l.from_tag, 'to_tag', l.to_tag,
               'note', l.note, 'evidence_sha256', l.evidence_sha256, 'prev_hash', l.prev_hash, 'hash', l.hash) ORDER BY l.seq), '[]'::jsonb)
        FROM (SELECT * FROM public.mint_ledger x WHERE x.seq > v_after ORDER BY x.seq LIMIT v_limit) l));
  ELSIF v_op = 'supply' THEN
    RETURN pg_catalog.jsonb_build_object('ok', true, 'chain', 'beta', 'notice', 'BETA TEST CHAIN: for testing only. Every copy, serial, trade and head on it is wiped before launch; the real chain starts at launch with its own genesis and serials from #1.', 'collectibles', (
      SELECT COALESCE(pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object(
               'code', c.code, 'set', c.set_code, 'season', s.season, 'track', s.track, 'set_names', s.names,
               'item_kind', c.item_kind, 'item_code', c.item_code, 'variant', c.variant, 'rule', c.rule, 'how', c.how,
               'opens_at', c.opens_at, 'closes_at', c.closes_at, 'grace_s', pg_catalog.date_part('epoch', c.grace)::bigint,
               'tradable', c.tradable, 'minted', c.minted, 'burned', c.burned,
               'held', (SELECT pg_catalog.count(*) FROM public.mint_copies x WHERE x.collectible = c.code AND x.status = 'held'),
               'define_seq', c.define_seq, 'closed_at', c.closed_at, 'close_seq', c.close_seq,
               'name', CASE WHEN c.item_kind = 'title' THEN (SELECT t.meta ->> 'name' FROM public.titles t WHERE t.code = c.item_code) END)
             ORDER BY se.number, c.set_code, c.code), '[]'::jsonb)
        FROM public.mint_collectibles c JOIN public.mint_sets s ON s.code = c.set_code JOIN public.mint_seasons se ON se.code = s.season
       WHERE c.define_seq IS NOT NULL));
  ELSIF v_op = 'collectible' THEN
    v_code := p_req ->> 'code';
    RETURN (SELECT pg_catalog.jsonb_build_object('ok', true, 'chain', 'beta', 'notice', 'BETA TEST CHAIN: for testing only. Every copy, serial, trade and head on it is wiped before launch; the real chain starts at launch with its own genesis and serials from #1.', 'code', c.code, 'set', c.set_code, 'item_kind', c.item_kind, 'item_code', c.item_code,
                     'variant', c.variant, 'rule', c.rule, 'rule_args_text', c.rule_args::text, 'how', c.how, 'opens_at', c.opens_at, 'closes_at', c.closes_at,
                     'grace_s', pg_catalog.date_part('epoch', c.grace)::bigint, 'tradable', c.tradable, 'minted', c.minted, 'burned', c.burned,
                     'define_seq', c.define_seq, 'closed_at', c.closed_at, 'close_seq', c.close_seq,
                     'copies', (SELECT COALESCE(pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object('serial', x.serial, 'copy_id', x.id, 'status', x.status,
                                  'ledger_seq', x.ledger_seq) ORDER BY x.serial), '[]'::jsonb) FROM public.mint_copies x WHERE x.collectible = c.code))
              FROM public.mint_collectibles c WHERE c.code = v_code AND c.define_seq IS NOT NULL);
  ELSIF v_op = 'copy' THEN
    v_copy := (p_req ->> 'id')::bigint;
    RETURN (SELECT pg_catalog.jsonb_build_object('ok', true, 'chain', 'beta', 'notice', 'BETA TEST CHAIN: for testing only. Every copy, serial, trade and head on it is wiped before launch; the real chain starts at launch with its own genesis and serials from #1.', 'copy_id', x.id, 'collectible', x.collectible, 'serial', x.serial, 'status', x.status,
                     'earned_at', x.earned_at, 'minted_at', x.minted_at, 'reason', x.reason, 'evidence_text', x.evidence::text,
                     'evidence_sha256', x.evidence_sha256, 'burn_evidence_text', x.burn_evidence::text, 'ledger_seq', x.ledger_seq,
                     'history', (SELECT COALESCE(pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object('seq', l.seq, 'kind', l.kind, 'at', l.at,
                                   'from_tag', l.from_tag, 'to_tag', l.to_tag, 'note', l.note) ORDER BY l.seq), '[]'::jsonb)
                                   FROM public.mint_ledger l WHERE l.copy_id = x.id))
              FROM public.mint_copies x WHERE x.id = v_copy AND x.ledger_seq IS NOT NULL);
  ELSIF v_op = 'rules' THEN
    RETURN (SELECT pg_catalog.jsonb_build_object('ok', true, 'chain', 'beta', 'notice', 'BETA TEST CHAIN: for testing only. Every copy, serial, trade and head on it is wiped before launch; the real chain starts at launch with its own genesis and serials from #1.', 'fp', r.fp, 'sql', r.sql, 'first_at', r.first_at)
              FROM public.mint_rules r WHERE r.fp = p_req ->> 'fp');
  END IF;
  RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'unknown_op');
END;
$function$

public.mint_unique_public(jsonb)
CREATE OR REPLACE FUNCTION public.mint_unique_public(p_req jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_op     text := p_req ->> 'op';
  v_item   text;
  v_kind   text;
  v_serial integer;
  v_copy   public.mint_copies;
  v_coll   public.mint_collectibles;
  v_hist   jsonb;
  v_head   jsonb := pg_catalog.jsonb_build_object('ok', true, 'chain', 'beta', 'notice', 'BETA TEST CHAIN: for testing only. Every copy, serial, trade and head on it is wiped before launch; the real chain starts at launch with its own genesis and serials from #1.');
BEGIN
  IF v_op = 'uniques' THEN
    RETURN v_head || pg_catalog.jsonb_build_object(
      'sets', (SELECT COALESCE(pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object('code', s.code, 'track', s.track, 'names', s.names,
                 'season', se.code, 'season_number', se.number, 'season_names', se.names) ORDER BY se.number, s.code), '[]'::jsonb)
                 FROM public.mint_sets s JOIN public.mint_seasons se ON se.code = s.season
                WHERE EXISTS (SELECT 1 FROM public.mint_collectibles c WHERE c.set_code = s.code AND c.variant = 'unique' AND c.define_seq IS NOT NULL)),
      'items', (SELECT COALESCE(pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object('code', c.code, 'set', c.set_code, 'item_kind', c.item_kind,
                  'item_code', c.item_code, 'minted', c.minted, 'burned', c.burned) ORDER BY c.set_code, c.item_code), '[]'::jsonb)
                  FROM public.mint_collectibles c WHERE c.variant = 'unique' AND c.define_seq IS NOT NULL),
      'copies', (SELECT COALESCE(pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object(
                   'item_kind', z.item_kind, 'item_code', z.item_code, 'serial', z.serial, 'set', z.set_code,
                   'float', public._unique_float_text(z.unique_seed), 'pattern', z.unique_pattern,
                   'minted_at', z.earned_at, 'source', z.source, 'tier', z.tier, 'status', z.status, 'price', z.price,
                   'last_sale', z.last_price, 'last_sale_at', z.last_at, 'sales', z.sales) ORDER BY z.earned_at DESC, z.id DESC), '[]'::jsonb)
                   FROM (SELECT m.id, c.item_kind, c.item_code, m.serial, c.set_code, m.unique_seed, m.unique_pattern,
                                COALESCE(m.earned_at, m.minted_at) AS earned_at,
                                CASE m.evidence ->> 'rule' WHEN 'ic_trade_up' THEN 'trade_up' WHEN 'ic_open' THEN 'intercept' ELSE 'other' END AS source,
                                CASE WHEN m.evidence ->> 'rule' = 'ic_open' AND (m.evidence ->> 'tier') ~ '^[0-9]{1,2}$' THEN (m.evidence ->> 'tier')::integer END AS tier,
                                CASE WHEN m.status = 'burned' THEN 'burned' WHEN la.price IS NOT NULL THEN 'listed' ELSE 'held' END AS status,
                                la.price, ls.price AS last_price, ls.at AS last_at, COALESCE(ls.n, 0) AS sales
                           FROM public.mint_copies m
                           JOIN public.mint_collectibles c ON c.code = m.collectible
                           LEFT JOIN LATERAL (SELECT l.price FROM public.market_listings l
                                               WHERE l.copy_id = m.id AND l.state = 'active' AND m.status = 'held' AND public._market_listing_sellable(l)
                                               ORDER BY l.listed_at DESC LIMIT 1) la ON true
                           LEFT JOIN LATERAL (SELECT s.price, s.at, pg_catalog.count(*) OVER () AS n FROM public.market_sales s
                                               WHERE s.copy_id = m.id AND s.counted AND s.state IN ('protected', 'final')
                                               ORDER BY s.at DESC LIMIT 1) ls ON true
                          WHERE c.variant = 'unique' AND c.define_seq IS NOT NULL AND m.ledger_seq IS NOT NULL AND m.serial IS NOT NULL
                          ORDER BY COALESCE(m.earned_at, m.minted_at) DESC, m.id DESC
                          LIMIT 5000) z));
  ELSIF v_op = 'unique' THEN
    v_item := p_req ->> 'item';
    v_kind := NULLIF(p_req ->> 'kind', '');
    IF v_item IS NULL OR v_item !~ '^[a-z0-9][a-z0-9_.]{0,127}$' OR COALESCE(v_kind, 'avatar') !~ '^[a-z_]{1,32}$' THEN
      RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'bad_item');
    END IF;
    BEGIN
      v_serial := (p_req ->> 'serial')::integer;
    EXCEPTION WHEN OTHERS THEN
      RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'bad_serial');
    END;
    IF v_serial IS NULL OR v_serial < 1 THEN
      RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'bad_serial');
    END IF;
    SELECT m.* INTO v_copy
      FROM public.mint_copies m JOIN public.mint_collectibles c ON c.code = m.collectible
     WHERE c.variant = 'unique' AND c.define_seq IS NOT NULL AND c.item_code = v_item AND m.serial = v_serial
       AND m.ledger_seq IS NOT NULL AND (v_kind IS NULL OR c.item_kind = v_kind)
     ORDER BY (c.item_kind = 'avatar') DESC, m.id
     LIMIT 1;
    IF v_copy.id IS NULL THEN
      RETURN NULL;
    END IF;
    SELECT c.* INTO v_coll FROM public.mint_collectibles c WHERE c.code = v_copy.collectible;

    -- The copy's own ledger lines, its holders numbered by first appearance (no tag leaves).
    WITH r AS (
      SELECT l.seq, l.at, l.kind, l.note, NULLIF(l.from_tag, '') AS from_tag, NULLIF(l.to_tag, '') AS to_tag,
             CASE WHEN l.note ~ '^market(_reverse)?:sale:[0-9]{1,18}$' THEN pg_catalog.split_part(l.note, ':', 3)::bigint END AS sale_id
        FROM public.mint_ledger l WHERE l.copy_id = v_copy.id
    ), tags AS (
      SELECT t.tag, pg_catalog.row_number() OVER (ORDER BY pg_catalog.min(t.seq)) AS n
        FROM (SELECT r.to_tag AS tag, r.seq FROM r WHERE r.to_tag IS NOT NULL
              UNION ALL SELECT r.from_tag, r.seq FROM r WHERE r.from_tag IS NOT NULL) t
       GROUP BY t.tag
    )
    SELECT COALESCE(pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object(
             'seq', r.seq, 'at', r.at,
             'event', CASE
                        WHEN r.kind = 'mint' THEN 'minted'
                        WHEN r.kind = 'tradable' THEN 'tradable'
                        WHEN r.kind = 'burn' THEN 'burned'
                        WHEN r.kind = 'transfer' AND r.note LIKE 'market:sale:%' THEN 'sold'
                        WHEN r.kind = 'transfer' AND r.note LIKE 'market_reverse:sale:%' THEN 'sale_undone'
                        WHEN r.kind = 'transfer' AND r.note LIKE 'trade:%' THEN 'traded'
                        WHEN r.kind = 'transfer' THEN 'moved'
                        ELSE r.kind END,
             'retro', (r.kind = 'mint' AND r.note LIKE 'retro:%'),
             'burn', CASE WHEN r.kind = 'burn' THEN CASE WHEN r.note = 'burn:trade_up' THEN 'trade_up' WHEN r.note = 'burn:shred' THEN 'shred' ELSE 'other' END END,
             'from', ft.n, 'to', tt.n,
             'price', CASE WHEN r.note LIKE 'market:sale:%' AND s.counted THEN s.price END,
             'sale_state', CASE WHEN r.note LIKE 'market:sale:%' THEN CASE WHEN s.state IN ('protected', 'final') THEN s.state WHEN s.state = 'reversed' THEN 'undone' END END)
             ORDER BY r.seq), '[]'::jsonb)
      INTO v_hist
      FROM r
      LEFT JOIN tags ft ON ft.tag = r.from_tag
      LEFT JOIN tags tt ON tt.tag = r.to_tag
      LEFT JOIN public.market_sales s ON s.id = r.sale_id AND s.copy_id = v_copy.id;

    RETURN v_head || pg_catalog.jsonb_build_object(
      'copy_id', v_copy.id, 'collectible', v_coll.code, 'item_kind', v_coll.item_kind, 'item_code', v_coll.item_code,
      'serial', v_copy.serial, 'float', public._unique_float_text(v_copy.unique_seed), 'pattern', v_copy.unique_pattern,
      'minted_at', COALESCE(v_copy.earned_at, v_copy.minted_at), 'recorded_at', v_copy.minted_at,
      'source', CASE v_copy.evidence ->> 'rule' WHEN 'ic_trade_up' THEN 'trade_up' WHEN 'ic_open' THEN 'intercept' ELSE 'other' END,
      'tier', CASE WHEN v_copy.evidence ->> 'rule' = 'ic_open' AND (v_copy.evidence ->> 'tier') ~ '^[0-9]{1,2}$' THEN (v_copy.evidence ->> 'tier')::integer END,
      'inputs', CASE WHEN pg_catalog.jsonb_typeof(v_copy.evidence -> 'inputs') = 'array' THEN pg_catalog.jsonb_array_length(v_copy.evidence -> 'inputs') END,
      'how', v_coll.how, 'rule', v_coll.rule, 'tradable', v_copy.tradable,
      'evidence_sha256', v_copy.evidence_sha256, 'ledger_seq', v_copy.ledger_seq,
      'set', (SELECT pg_catalog.jsonb_build_object('code', s.code, 'track', s.track, 'names', s.names, 'season', se.code,
                     'season_number', se.number, 'season_names', se.names)
                FROM public.mint_sets s JOIN public.mint_seasons se ON se.code = s.season WHERE s.code = v_coll.set_code),
      'item', pg_catalog.jsonb_build_object('minted', v_coll.minted, 'burned', v_coll.burned,
                'held', (SELECT pg_catalog.count(*) FROM public.mint_copies x WHERE x.collectible = v_coll.code AND x.status = 'held'),
                'serials', (SELECT COALESCE(pg_catalog.jsonb_agg(x.serial ORDER BY x.serial), '[]'::jsonb) FROM public.mint_copies x
                             WHERE x.collectible = v_coll.code AND x.ledger_seq IS NOT NULL)),
      'status', CASE WHEN v_copy.status = 'burned' THEN 'burned'
                     WHEN EXISTS (SELECT 1 FROM public.market_listings l WHERE l.copy_id = v_copy.id AND l.state = 'active' AND public._market_listing_sellable(l)) THEN 'listed'
                     ELSE 'held' END,
      'status_at', CASE WHEN v_copy.status = 'burned' THEN v_copy.status_at END,
      'listing', (SELECT pg_catalog.jsonb_build_object('price', l.price, 'listed_at', l.listed_at)
                    FROM public.market_listings l
                   WHERE l.copy_id = v_copy.id AND l.state = 'active' AND v_copy.status = 'held' AND public._market_listing_sellable(l)
                   ORDER BY l.listed_at DESC LIMIT 1),
      'holders', (SELECT pg_catalog.count(DISTINCT t.tag) FROM (SELECT NULLIF(l.to_tag, '') AS tag FROM public.mint_ledger l WHERE l.copy_id = v_copy.id
                    UNION ALL SELECT NULLIF(l.from_tag, '') FROM public.mint_ledger l WHERE l.copy_id = v_copy.id) t),
      'history', v_hist);
  END IF;
  RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'unknown_op');
END
$function$

public.mint_witness()
CREATE OR REPLACE FUNCTION public.mint_witness()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  h    public.mint_heads;
  v_id bigint;
  v_n  integer := 0;
  v_url text := public._mint_public_url();
BEGIN
  -- BETA TEST CHAIN (20261202295000): no Wayback save of a test head (the public permanent record is the real chain's).
  RETURN 0;
  IF pg_catalog.to_regnamespace('net') IS NULL OR v_url IS NULL THEN
    RETURN 0;
  END IF;
  FOR h IN SELECT * FROM public.mint_heads x WHERE NOT (x.witnessed ? 'wayback') AND x.day >= (pg_catalog.now() AT TIME ZONE 'UTC')::date - 7
            ORDER BY x.day LOOP
    EXECUTE 'SELECT net.http_get(url := $1, timeout_milliseconds := 20000)' INTO v_id
      USING 'https://web.archive.org/save/' || v_url || '?op=head&day=' || h.day::text;
    UPDATE public.mint_heads x
       SET witnessed = x.witnessed || pg_catalog.jsonb_build_object('wayback', pg_catalog.jsonb_build_object(
             'request_id', v_id, 'at', pg_catalog.now(), 'url', 'https://web.archive.org/web/' || v_url || '?op=head&day=' || h.day::text))
     WHERE x.day = h.day;
    v_n := v_n + 1;
  END LOOP;
  RETURN v_n;
END;
$function$

public.open_crate(uuid)
CREATE OR REPLACE FUNCTION public.open_crate(p_crate_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  c        public.crate_config;
  k        public.player_crates;
  g        public.crate_grants;
  w        public.coin_wallets;
  pr       public.crate_progress;
  v_rar    public.crate_rarities;
  v_counts jsonb;
  v_codes  text[];
  v_ws     bigint[];
  v_force  text;
  r        record;
  p        record;
  v_kinds  text[];
  v_items  text[];
  v_slots  text[];
  v_iw     bigint[];
  v_skip   boolean := false;
  v_draws  jsonb := '[]'::jsonb;
  v_kind   text;
  v_code   text;
  v_slot   text;
  v_owning boolean := false;
  v_serial integer;
  v_seed   numeric;
  v_pattern smallint;
  v_mint   record;
  v_copy   bigint;
  v_roll   bigint;
  v_pity   jsonb;
  v_result jsonb;
  v_away   text;
BEGIN
  IF v_uid IS NULL THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;
  SELECT * INTO c FROM public.crate_config;
  IF NOT COALESCE(c.enabled, false) THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'off');
  END IF;
  IF p_crate_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.player_crates x WHERE x.id = p_crate_id AND x.user_id = v_uid) THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;
  -- The game end's lock order (Intel's award locks the wallet, the win count then the progress row): the wallet, the
  -- progress row, the Intercept. A second tap or phone waits here, then finds it opened.
  INSERT INTO public.coin_wallets (user_id) VALUES (v_uid) ON CONFLICT (user_id) DO NOTHING;
  SELECT * INTO w FROM public.coin_wallets x WHERE x.user_id = v_uid FOR UPDATE;
  INSERT INTO public.crate_progress (user_id) VALUES (v_uid) ON CONFLICT (user_id) DO NOTHING;
  SELECT * INTO pr FROM public.crate_progress x WHERE x.user_id = v_uid FOR UPDATE;
  SELECT * INTO k FROM public.player_crates x WHERE x.id = p_crate_id AND x.user_id = v_uid FOR UPDATE;
  -- intercepts_market: it changed hands while this call waited for its lock (a fill, a trade): not yours now
  IF k.id IS NULL THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;
  IF k.opened_at IS NOT NULL THEN
    SELECT * INTO v_rar FROM public.crate_rarities x WHERE x.code = k.result ->> 'rarity';
    RETURN (k.result - 'roll_id') || pg_catalog.jsonb_build_object(
      'ok', true, 'already', true,
      'spares', public._crate_spares(v_uid, k.result -> 'item' ->> 'kind', k.result -> 'item' ->> 'code'),
      'shred_intel', CASE WHEN c.shred_on AND k.result -> 'unique' = 'null'::jsonb THEN v_rar.shred_intel END);
  END IF;
  -- intercepts_market: an Intercept held for a Black Market sell offer, offered in an open friend trade, or received by a
  -- friend trade and still protected (reversible) stays sealed: 'in_market' | 'in_trade' | 'protected' (+ until)
  v_away := public._ic_away(k.id);
  IF v_away IS NOT NULL THEN
    RETURN pg_catalog.jsonb_build_object('ok', false,
      'error', CASE v_away WHEN 'market' THEN 'in_market' WHEN 'trade' THEN 'in_trade' ELSE 'protected' END,
      'until', (SELECT tp.until FROM public.trade_crate_protections tp WHERE tp.crate_id = k.id AND tp.until > pg_catalog.now()));
  END IF;
  SELECT * INTO g FROM public.crate_grants x WHERE x.id = k.grant_id;

  -- The rarity: the tier's odds as published, or the guarantee that is due (the highest; its pool must have items).
  v_counts := public._crate_pool_counts();
  SELECT pg_catalog.array_agg(o.r_code ORDER BY o.r_rank), pg_catalog.array_agg(o.r_weight ORDER BY o.r_rank)
    INTO v_codes, v_ws
    FROM public._crate_tier_odds(k.tier, v_counts) AS o;
  -- (A guarantee forces only an Intercept from one of its sources: odds-2.2 pity.counts, wins only.)
  FOR r IN SELECT y.rarity, y.after FROM public.crate_pity y JOIN public.crate_rarities kr ON kr.code = y.rarity
            WHERE y.active AND g.source = ANY (y.sources) ORDER BY kr.rank DESC LOOP
    IF COALESCE((pr.pity ->> r.rarity)::integer, 0) >= r.after - 1 AND COALESCE((v_counts ->> r.rarity)::integer, 0) > 0 THEN
      v_force := r.rarity;
      EXIT;
    END IF;
  END LOOP;
  IF v_force IS NOT NULL THEN
    SELECT * INTO v_rar FROM public.crate_rarities x WHERE x.code = v_force;
    v_draws := v_draws || pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object('step', 'rarity', 'pity', v_force,
                                                                                      'since', COALESCE((pr.pity ->> v_force)::integer, 0)));
  ELSE
    SELECT * INTO p FROM public._crate_pick(v_ws);
    IF p.o_idx IS NULL THEN
      RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'empty_pool');
    END IF;
    SELECT * INTO v_rar FROM public.crate_rarities x WHERE x.code = v_codes[p.o_idx];
    v_draws := v_draws || pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object(
                 'step', 'rarity', 'draw', p.o_draw, 'total', p.o_total,
                 'odds', (SELECT pg_catalog.jsonb_object_agg(v_codes[j], v_ws[j]) FROM pg_catalog.generate_subscripts(v_codes, 1) AS j WHERE v_ws[j] > 0)));
  END IF;

  -- The item: by weight over the rarity's live pool; a no-repeat rarity skips what the caller owns until they own all.
  IF v_rar.no_repeat THEN
    SELECT pg_catalog.array_agg(x.item_kind ORDER BY x.n), pg_catalog.array_agg(x.item_code ORDER BY x.n),
           pg_catalog.array_agg(x.slot ORDER BY x.n), pg_catalog.array_agg(x.weight::bigint ORDER BY x.n)
      INTO v_kinds, v_items, v_slots, v_iw
      FROM public._crate_pool(v_rar.code) WITH ORDINALITY AS x(item_kind, item_code, slot, series, weight, mintable, n)
     WHERE NOT public._crate_owns(v_uid, x.item_kind, x.item_code);
    v_skip := v_kinds IS NOT NULL;
  END IF;
  IF v_kinds IS NULL THEN
    SELECT pg_catalog.array_agg(x.item_kind ORDER BY x.n), pg_catalog.array_agg(x.item_code ORDER BY x.n),
           pg_catalog.array_agg(x.slot ORDER BY x.n), pg_catalog.array_agg(x.weight::bigint ORDER BY x.n)
      INTO v_kinds, v_items, v_slots, v_iw
      FROM public._crate_pool(v_rar.code) WITH ORDINALITY AS x(item_kind, item_code, slot, series, weight, mintable, n);
  END IF;
  SELECT * INTO p FROM public._crate_pick(v_iw);
  IF p.o_idx IS NULL THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'empty_pool');
  END IF;
  v_kind := v_kinds[p.o_idx];
  v_code := v_items[p.o_idx];
  v_slot := v_slots[p.o_idx];
  v_draws := v_draws || pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object(
               'step', 'item', 'draw', p.o_draw, 'total', p.o_total, 'n', pg_catalog.array_length(v_iw, 1), 'no_repeat', v_skip));

  -- The caller's first copy unlocks it (the existing path; the Locker shows it). The engine's mark lets the
  -- no-direct-items guard pass this one row (player, kind, item), then is cleared.
  IF NOT public._crate_owns(v_uid, v_kind, v_code) THEN
    PERFORM pg_catalog.set_config('spy_social.crate_write', v_uid::text || ':' || v_kind || ':' || v_code, true);
    IF v_kind = 'avatar' THEN
      v_owning := public._avatar_grant(v_uid, v_code, 'grant', 'crate:' || k.id::text, NULL);
    ELSE
      INSERT INTO public.player_titles (user_id, title_code, source, ref, granted_by)
      VALUES (v_uid, v_code, 'grant', 'crate:' || k.id::text, NULL)
      ON CONFLICT (user_id, title_code) DO NOTHING;
      v_owning := FOUND;
    END IF;
    PERFORM pg_catalog.set_config('spy_social.crate_write', '', true);
  END IF;

  -- A Unique: the next running number, and a float of its own.
  IF v_rar.mint_from IS NOT NULL THEN
    -- 20261202200000 (owner decision 2): numbered per item by crate_copies' insert trigger, under this lock.
    PERFORM 1 FROM public.crate_items x WHERE x.item_kind = v_kind AND x.item_code = v_code FOR UPDATE;
    v_serial := 1;
    SELECT * INTO v_mint FROM public._crate_mint_seed(v_kind, v_code, c.unique_hue_gap);
    v_seed := v_mint.o_seed;
    v_pattern := v_mint.o_pattern;
    v_draws := v_draws || pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object(
                 'step', 'seed', 'draw', v_mint.o_draw, 'room', v_mint.o_room, 'spaced', v_mint.o_spaced, 'pattern', v_pattern));
  END IF;

  INSERT INTO public.crate_copies (user_id, item_kind, item_code, rarity, source, crate_id, owning, serial, seed, pattern)
  VALUES (v_uid, v_kind, v_code, v_rar.code, 'crate', k.id, v_owning, v_serial, v_seed, v_pattern)
  RETURNING id, serial INTO v_copy, v_serial;

  -- The guarantees' counters (every rule, on or off, so switching one on starts from the truth): back to 0 on an item
  -- of that rarity or better from any source; one more for an Intercept from one of its sources; else as it was.
  SELECT pr.pity || COALESCE(pg_catalog.jsonb_object_agg(y.rarity, CASE WHEN v_rar.rank >= kr.rank THEN 0
                                                                        WHEN g.source = ANY (y.sources) THEN COALESCE((pr.pity ->> y.rarity)::integer, 0) + 1
                                                                        ELSE COALESCE((pr.pity ->> y.rarity)::integer, 0) END), '{}'::jsonb)
    INTO v_pity
    FROM public.crate_pity y JOIN public.crate_rarities kr ON kr.code = y.rarity;

  INSERT INTO public.crate_rolls (event, user_id, crate_id, grant_id, source, tier, odds_version, rarity, item_kind, item_code, copy_id, pity, draws)
  VALUES ('open', v_uid, k.id, k.grant_id, g.source, k.tier, c.odds_version, v_rar.code, v_kind, v_code, v_copy, v_force, v_draws)
  RETURNING id INTO v_roll;

  v_result := pg_catalog.jsonb_build_object(
    'crate_id', k.id, 'tier', k.tier, 'source', g.source, 'rarity', v_rar.code, 'rank', v_rar.rank,
    'item', pg_catalog.jsonb_build_object('kind', v_kind, 'code', v_code, 'slot', v_slot),
    'copy_id', v_copy,
    'duplicate', v_serial IS NULL AND NOT v_owning,
    'unique', CASE WHEN v_serial IS NOT NULL THEN pg_catalog.jsonb_build_object('serial', v_serial, 'seed', public._unique_float6(v_seed), 'seed_text', public._unique_float_text(v_seed), 'pattern', v_pattern) END,
    'pity', v_force,
    'opened_at', pg_catalog.now(),
    'odds_version', c.odds_version,
    'roll_id', v_roll);
  UPDATE public.player_crates x SET opened_at = pg_catalog.now(), result = v_result WHERE x.id = k.id;
  UPDATE public.crate_progress x SET opened = x.opened + 1, pity = v_pity, updated_at = pg_catalog.now() WHERE x.user_id = v_uid;
  RETURN (v_result - 'roll_id') || pg_catalog.jsonb_build_object(
    'ok', true, 'already', false,
    'spares', public._crate_spares(v_uid, v_kind, v_code),
    'shred_intel', CASE WHEN c.shred_on AND v_serial IS NULL THEN v_rar.shred_intel END);
END;
$function$

public.shred_crate_copies(bigint[])
CREATE OR REPLACE FUNCTION public.shred_crate_copies(p_copy_ids bigint[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  c       public.crate_config;
  w       public.coin_wallets;
  v_ids   bigint[];
  v_parts jsonb;
  v_total integer;
  v_id    bigint;
BEGIN
  IF v_uid IS NULL THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;
  SELECT * INTO c FROM public.crate_config;
  IF NOT COALESCE(c.enabled, false) OR NOT c.shred_on THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'off');
  END IF;
  IF p_copy_ids IS NULL OR COALESCE(pg_catalog.array_length(p_copy_ids, 1), 0) NOT BETWEEN 1 AND 200 THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'invalid_argument');
  END IF;
  INSERT INTO public.coin_wallets (user_id) VALUES (v_uid) ON CONFLICT (user_id) DO NOTHING;
  SELECT * INTO w FROM public.coin_wallets x WHERE x.user_id = v_uid FOR UPDATE;
  SELECT pg_catalog.array_agg(x.id ORDER BY x.id),
         pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object('copy_id', x.id, 'kind', x.item_kind, 'code', x.item_code, 'rarity', x.rarity,
                                                            'intel', kr.shred_intel) ORDER BY x.id),
         COALESCE(pg_catalog.sum(kr.shred_intel), 0)::integer
    INTO v_ids, v_parts, v_total
    FROM (SELECT y.* FROM public.crate_copies y
           WHERE y.id = ANY (p_copy_ids) AND y.user_id = v_uid AND y.id = ANY ((SELECT public._crate_spare_ids(v_uid, NULL, NULL))::bigint[]) AND y.serial IS NULL AND y.shredded_at IS NULL
             AND NOT public._trade_crate_protected(y.id)   -- 20261203210000: protected copies are skipped
           FOR UPDATE) AS x
    JOIN public.crate_rarities kr ON kr.code = x.rarity AND kr.shred_intel IS NOT NULL;
  IF v_ids IS NULL OR v_total <= 0 THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'nothing_to_shred',
                                         'skipped', pg_catalog.to_jsonb((SELECT pg_catalog.array_agg(DISTINCT u ORDER BY u) FROM pg_catalog.unnest(p_copy_ids) AS u)));
  END IF;
  -- (20261202020000) The row moves the wallet's Intel (its triggers).
  INSERT INTO public.coin_ledger (user_id, kind, delta, balance_after, day, parts)
  VALUES (v_uid, 'shred', v_total, w.balance + v_total, public._coins_day(pg_catalog.now()),
          pg_catalog.jsonb_build_object('copies', pg_catalog.to_jsonb(v_ids), 'items', v_parts))
  RETURNING id INTO v_id;
  UPDATE public.crate_copies x SET shredded_at = pg_catalog.now(), shred_ledger_id = v_id, owning = false WHERE x.id = ANY (v_ids);
  RETURN pg_catalog.jsonb_build_object(
    'ok', true, 'shredded', pg_catalog.array_length(v_ids, 1), 'intel', v_total, 'balance', w.balance + v_total,
    'copy_ids', pg_catalog.to_jsonb(v_ids),
    'skipped', pg_catalog.to_jsonb(COALESCE((SELECT pg_catalog.array_agg(DISTINCT u ORDER BY u) FROM pg_catalog.unnest(p_copy_ids) AS u
                                              WHERE NOT (u = ANY (v_ids))), '{}'::bigint[])));
END;
$function$

public.trade_up(bigint[],uuid)
CREATE OR REPLACE FUNCTION public.trade_up(p_copy_ids bigint[], p_request_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_uid     uuid := auth.uid();
  c         public.crate_config;
  w         public.coin_wallets;
  t         public.crate_trade_ups;
  v_ids     bigint[];
  v_order   bigint[];
  v_pick    bigint;
  v_cidx    integer;
  v_bad     bigint[];
  v_from    text;
  v_nfrom   integer;
  v_to      public.crate_rarities;
  v_inputs  jsonb;
  pk        record;
  v_trade   bigint;
  v_owning  boolean := false;
  v_serial  integer;
  v_seed    numeric;
  v_pattern smallint;
  v_mint    record;
  v_copy    bigint;
  v_draws   jsonb;
  v_result  jsonb;
  v_need    integer;
BEGIN
  IF v_uid IS NULL THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;
  SELECT * INTO c FROM public.crate_config;
  IF NOT COALESCE(c.enabled, false) OR NOT COALESCE(c.trade_ups_on, false) THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'off');
  END IF;
  IF p_request_id IS NULL THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'invalid_argument', 'field', 'p_request_id');
  END IF;
  IF p_copy_ids IS NULL OR COALESCE(pg_catalog.array_ndims(p_copy_ids), 1) <> 1 OR pg_catalog.cardinality(p_copy_ids) > 100
     OR pg_catalog.array_position(p_copy_ids, NULL) IS NOT NULL THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'invalid_argument', 'field', 'p_copy_ids');
  END IF;
  SELECT pg_catalog.array_agg(DISTINCT u ORDER BY u) INTO v_ids FROM pg_catalog.unnest(p_copy_ids) AS u;
  v_order := p_copy_ids;

  -- The wallet first (every crate action's lock order): a second tap or phone waits here, then finds its trade.
  INSERT INTO public.coin_wallets (user_id) VALUES (v_uid) ON CONFLICT (user_id) DO NOTHING;
  SELECT * INTO w FROM public.coin_wallets x WHERE x.user_id = v_uid FOR UPDATE;
  SELECT * INTO t FROM public.crate_trade_ups x WHERE x.user_id = v_uid AND x.request_id = p_request_id;
  IF t.id IS NOT NULL THEN
    IF (SELECT pg_catalog.array_agg(u ORDER BY u) FROM pg_catalog.unnest(t.input_ids) AS u) IS DISTINCT FROM v_ids THEN
      RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'request_reused');
    END IF;
    RETURN t.result || pg_catalog.jsonb_build_object('ok', true, 'already', true,
                                                     'spares', public._crate_spares(v_uid, t.item_kind, t.item_code));
  END IF;
  -- 20261202450000: a rung's own count (the Unique rung trade_up_unique_count, 10; the others trade_up_count, 5): a
  -- count neither can be, or a copy twice, refused here; the rung's exact count once the inputs' rarity is known.
  IF pg_catalog.cardinality(p_copy_ids) <> COALESCE(pg_catalog.cardinality(v_ids), 0)
     OR pg_catalog.cardinality(p_copy_ids) NOT IN (c.trade_up_count, c.trade_up_unique_count) THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'wrong_count', 'need', c.trade_up_count, 'need_unique', c.trade_up_unique_count);
  END IF;

  -- The inputs, locked in id order (two trade-ups or a shred sharing a copy wait in turn), then checked.
  PERFORM 1 FROM public.crate_copies x WHERE x.id = ANY (v_ids) ORDER BY x.id FOR UPDATE;
  SELECT pg_catalog.array_agg(u.id ORDER BY u.id) INTO v_bad
    FROM pg_catalog.unnest(v_ids) AS u(id)
    LEFT JOIN public.crate_copies x ON x.id = u.id
   WHERE public._crate_trade_input_why(v_uid, x) IS NOT NULL;
  IF v_bad IS NOT NULL THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'not_spare', 'copy_ids', pg_catalog.to_jsonb(v_bad));
  END IF;
  SELECT pg_catalog.min(x.rarity), pg_catalog.count(DISTINCT x.rarity) INTO v_from, v_nfrom
    FROM public.crate_copies x WHERE x.id = ANY (v_ids);
  IF v_nfrom <> 1 THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'mixed_rarity');
  END IF;
  SELECT k.* INTO v_to FROM public.crate_rarities k WHERE k.code = public._crate_trade_next(v_from);
  IF v_to.code IS NULL THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'not_tradable');
  END IF;
  v_need := CASE WHEN v_to.mint_from IS NOT NULL THEN c.trade_up_unique_count ELSE c.trade_up_count END;
  IF pg_catalog.cardinality(v_ids) <> v_need THEN
    RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'wrong_count', 'need', v_need);
  END IF;

  IF v_to.mint_from IS NOT NULL THEN
    -- The Unique rung (owner 2026-10-25, rule 2): a Unique of ONE OF THE INPUTS, drawn uniformly among the ten in
    -- the order sent (every Legendary can be a Unique: lib/itemRarity canBeUnique).
    SELECT x.item_kind AS o_kind, x.item_code AS o_code, i.slot AS o_slot, pg_catalog.cardinality(v_order) AS o_pool,
           pg_catalog.cardinality(v_order) AS o_eligible, false AS o_prefer, d.v AS o_draw
      INTO pk
      FROM (SELECT public._crate_rand_below(pg_catalog.cardinality(v_order)) AS v) AS d
      JOIN public.crate_copies x ON x.id = v_order[(d.v + 1)::integer]
      LEFT JOIN public.avatar_items i ON x.item_kind = 'avatar' AND i.code = x.item_code;
    v_pick := v_order[(pk.o_draw + 1)::integer];
    v_cidx := pk.o_draw::integer;
    v_draws := pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object(
                 'step', 'input', 'draw', pk.o_draw, 'total', pk.o_eligible, 'chosen_copy_id', v_pick, 'chosen_index', v_cidx));
  ELSE
    -- The draw (uniform; the caller's unowned items while any is left).
    SELECT * INTO pk FROM public._crate_trade_pick(v_uid, v_to.code);
    IF pk.o_kind IS NULL THEN
      RETURN pg_catalog.jsonb_build_object('ok', false, 'error', 'empty_pool');
    END IF;
    v_draws := pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object(
                 'step', 'item', 'draw', pk.o_draw, 'total', pk.o_eligible, 'pool', pk.o_pool, 'prefer_unowned', pk.o_prefer));
  END IF;
  v_trade := pg_catalog.nextval('public.crate_trade_ups_id_seq'::regclass);

  -- The inputs leave the caller's hands (kept, as every copy is).
  SELECT pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object('copy_id', x.id, 'kind', x.item_kind, 'code', x.item_code, 'rarity', x.rarity,
                                                            'source', x.source, 'obtained_at', x.obtained_at) ORDER BY x.id)
    INTO v_inputs FROM public.crate_copies x WHERE x.id = ANY (v_ids);
  UPDATE public.crate_copies x SET user_id = NULL WHERE x.id = ANY (v_ids) AND x.user_id = v_uid;
  IF NOT FOUND OR EXISTS (SELECT 1 FROM public.crate_copies x WHERE x.id = ANY (v_ids) AND x.user_id IS NOT NULL) THEN
    RAISE EXCEPTION 'trade-ups: the inputs of trade % did not all leave the player', v_trade;
  END IF;

  -- The caller's first copy unlocks the item (the existing path; the engine's mark lets the no-direct-items guard pass
  -- this one row, then is cleared).
  IF NOT public._crate_owns(v_uid, pk.o_kind, pk.o_code) THEN
    PERFORM pg_catalog.set_config('spy_social.crate_write', v_uid::text || ':' || pk.o_kind || ':' || pk.o_code, true);
    IF pk.o_kind = 'avatar' THEN
      v_owning := public._avatar_grant(v_uid, pk.o_code, 'grant', 'trade_up:' || v_trade::text, NULL);
    ELSE
      INSERT INTO public.player_titles (user_id, title_code, source, ref, granted_by)
      VALUES (v_uid, pk.o_code, 'grant', 'trade_up:' || v_trade::text, NULL)
      ON CONFLICT (user_id, title_code) DO NOTHING;
      v_owning := FOUND;
    END IF;
    PERFORM pg_catalog.set_config('spy_social.crate_write', '', true);
  END IF;

  -- A Unique: the next running number and a float of its own (open_crate's mint: the serial row, then the item's row).
  IF v_to.mint_from IS NOT NULL THEN
    -- 20261202200000 (owner decision 2): numbered per item by crate_copies' insert trigger, under this lock.
    PERFORM 1 FROM public.crate_items x WHERE x.item_kind = pk.o_kind AND x.item_code = pk.o_code FOR UPDATE;
    v_serial := 1;
    SELECT * INTO v_mint FROM public._crate_mint_seed(pk.o_kind, pk.o_code, c.unique_hue_gap);
    v_seed := v_mint.o_seed;
    v_pattern := v_mint.o_pattern;
    v_draws := v_draws || pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object(
                 'step', 'seed', 'draw', v_mint.o_draw, 'room', v_mint.o_room, 'spaced', v_mint.o_spaced, 'pattern', v_pattern));
  END IF;

  INSERT INTO public.crate_copies (user_id, item_kind, item_code, rarity, source, crate_id, owning, serial, seed, pattern)
  VALUES (v_uid, pk.o_kind, pk.o_code, v_to.code, 'trade_up', NULL, v_owning, v_serial, v_seed, v_pattern)
  RETURNING id, serial INTO v_copy, v_serial;

  v_result := pg_catalog.jsonb_build_object(
    'trade_id', v_trade, 'request_id', p_request_id, 'from_rarity', v_from, 'rarity', v_to.code, 'rank', v_to.rank,
    'item', pg_catalog.jsonb_build_object('kind', pk.o_kind, 'code', pk.o_code, 'slot', pk.o_slot),
    'copy_id', v_copy,
    'duplicate', v_serial IS NULL AND NOT v_owning,
    'unique', CASE WHEN v_serial IS NOT NULL THEN pg_catalog.jsonb_build_object('serial', v_serial, 'seed', public._unique_float6(v_seed), 'seed_text', public._unique_float_text(v_seed), 'pattern', v_pattern) END,
    'consumed', pg_catalog.to_jsonb(v_order),
    'chosen_index', v_cidx, 'chosen_copy_id', v_pick,
    'eligible', pk.o_eligible, 'pool_size', pk.o_pool, 'prefer_unowned', pk.o_prefer,
    'traded_at', pg_catalog.now(), 'odds_version', c.odds_version);
  INSERT INTO public.crate_trade_ups (id, user_id, request_id, from_rarity, rarity, item_kind, item_code, copy_id, input_ids, inputs,
                                      pool_size, eligible, prefer_unowned, odds_version, draws, result)
  VALUES (v_trade, v_uid, p_request_id, v_from, v_to.code, pk.o_kind, pk.o_code, v_copy, v_ids, v_inputs,
          pk.o_pool, pk.o_eligible, pk.o_prefer, c.odds_version, v_draws, v_result);
  RETURN v_result || pg_catalog.jsonb_build_object('ok', true, 'already', false,
                                                   'spares', public._crate_spares(v_uid, pk.o_kind, pk.o_code));
END;
$function$
