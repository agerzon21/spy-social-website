// What the legal pages (Privacy, Terms, Community Rules, Delete Account) say
// depends on what SpySocial does today. Each switch turns on the text for one
// piece of the app when that piece is live: its branch merged, its server
// side deployed, and (for app pieces) the store build that has it released.
// Flip a switch in the same change that ships the piece, check the text it
// turns on against the shipped code, and update LEGAL_LAST_UPDATED.
//
// The 2.1.1 store app stays in use for a while after 2.2: oldAppsInUse keeps
// the lines about what older versions do (profile photos, where Account is)
// until 2.1.1 can no longer connect. 2.1.1 (396be1f) has no chat and never
// calls MyMemory: the phone called MyMemory only in development builds of
// main from 2026-10-02 until feature/small-compliance.
//
// AT THE 2.2 LAUNCH (the hour 2.2 is out on both stores), flip, after
// checking each one's condition in its comment: avatarCreator,
// ageGateEveryone, birthMonth, under13Deletion, storeAgeSignals, crashReports,
// notifications, socialSignIn, purchases, onDeviceTranslation,
// storedQuestions, qrScanner, playOnline (before the play_online switch goes
// 'on', runbook 3.8c), onePool, messageReports; oldAppsInUse to false once the lockdown (DB3) shuts 2.1.1 out, and
// photosRemoved once no photo file is left. myMemory is already 'off' (the
// translate function's MyMemory backup is off from the 2.2 submissions, owner
// 2026-10-07): it stays 'off' unless the backup comes back. Not at launch unless its own
// condition holds by then: drawingCheck (the game itself checks drawings;
// deploying check-drawing is not enough). revenueCatDeletion is on already
// (2026-10-22: the delete flow deletes the RevenueCat customer). Then set LEGAL_LAST_UPDATED to the
// launch day. drawingCheckTesters goes off in the same change as drawingCheck goes on (it only adds "for now,
// only in testers' games" to drawingCheck's text). The Terms gain material sections at launch (buying, Restore
// Purchases moving purchases between accounts, and the automated drawing
// check once it's on), so they're published again: set TERMS_PUBLISHED to
// the launch day, TERMS_EFFECTIVE_FOR_EXISTING to 30 days after it and
// TERMS_PREVIOUS to ['October 4, 2026', 'May 1, 2026'], and raise
// app_config.terms_version so the app asks everyone to agree again.
//
// Check the text each setting turns on before launch day: render the four
// pages with the settings of each website update (the runbook's Update 1 and
// Update 2 columns), not only with everything on. The Safety page
// (src/pages/Safety.tsx) and the Terms' UK online safety section
// (components/legal/UkOnlineSafety.tsx) follow the same switches.
//
// THE PRIVACY POLICY CAN GO FIRST (PRIVACY_AHEAD, below LIVE). Store reviewers
// compare the Privacy Policy with the App Store privacy labels and Google Play's
// Data safety form, so it describes the 2.2 build from the day 2.2 is submitted,
// while the Terms and the Community Rules wait for the launch hour (publishing the
// Terms again makes everyone agree again). The pages that share the Privacy
// Policy's data facts read PRIVACY = LIVE with PRIVACY_AHEAD on top: Privacy,
// Delete Account, components/legal/AfterDeletion and lib/legalText. The Terms,
// the Community Rules, the Terms' UK online safety section and the Safety page
// keep reading LIVE (the Safety page's switch lines say what the app offers
// players and parents, not what data we process). While a switch runs ahead,
// 2.1.1 is still the store version, so what a 2.1.1 player would take for their
// own app's behavior says "from version 2.2" while oldAppsInUse (Privacy.tsx).
// Merging this branch into main before the launch would also publish the UK
// online safety text in the Terms and the Rules, and the Safety page: set
// ONLINE_SAFETY_TEXT (below LEGAL_LAST_UPDATED) false in that merge. At the
// launch, flip the same switches in LIVE, empty PRIVACY_AHEAD, set
// PRIVACY_LAST_UPDATED back to LEGAL_LAST_UPDATED and ONLINE_SAFETY_TEXT to true.

export const LIVE = {
  /**
   * fix/account-photo-cleanup's housekeeping migration (20261004132500) applied: chat, translations,
   * usage events and security logs are deleted on a clock, not only when traffic happens to prune.
   */
  scheduledRetention: true,
  /** fix/account-photo-cleanup deployed (migration 20261004132000 and purge-avatars): a deleted account's photo file is deleted. */
  photoCleanup: true,
  /**
   * The avatar creator in the released app (2.2): players design an avatar from the parts the app offers, and
   * 2.2 can't add a profile photo. On from the 2.2 launch (Update 1), while the photos uploaded before 2.2 are
   * still stored and 2.1.1 can still add one; photosRemoved comes later and implies it (see avatarsLive below).
   */
  avatarCreator: false,
  /**
   * Profile photos are gone: the photos uploaded before 2.2 have been deleted from storage (after DB3 shuts
   * 2.1.1 out and the purge has finished; implies avatarCreator). While oldAppsInUse, the pages still
   * describe the photo that versions before 2.2 let a player add (see photosInUse below).
   */
  photosRemoved: false,
  /**
   * Profile photos are private and can't be added any more (server, every app version at once): the storage bucket
   * 'avatars' went private on 2026-10-20 at 18:44 UTC (20261103000000_avatars_bucket_private, the record of that
   * change), so a photo's public link no longer opens and 2.1.1, which shows photos only by that link, shows none,
   * not even its owner's; and 20261103300000_avatars_no_client_writes (live 2026-10-20) dropped the upload and
   * update policies, so no app can add or change a photo (2.1.1's upload now fails). The photos already uploaded
   * (49 on 2026-10-20) stay in the bucket: only their owner's own account can still read or delete its file
   * through the storage API (the two kept policies), and the server's photo purge (purge-avatars, service role)
   * deletes a deleted account's file. On, it turns on: no photo shown to other players anywhere (Privacy's Data
   * Sharing, Child Safety, the Terms' summary, the Community Rules), no photo uploads, no cached-photo line after a
   * deletion, and Privacy's Account Information says photos could be added until October 20, 2026 (photosShown
   * below). The photos themselves are still data we hold (photosInUse). Off only if photos come back. A server
   * switch for every app version at once: set in LIVE, never in PRIVACY_AHEAD.
   */
  photosPrivate: true,
  /** feature/age-terms-gate in the released app: everyone gives a birth year before their first game. */
  ageGateEveryone: false,
  /**
   * Migration 20261005100200_birth_month applied with the 2.2 app: only a player born in this year less 13
   * (the one year where the year alone can't tell 12 from 13) is asked the month too, and only then is it kept.
   * Widened by 20261030900000_birth_month_16 (live with the website change of 2026-10-15): set_birth_year keeps
   * the month for a player turning 13 to 16 in the year they answer (born this year less 16 to less 13), and the
   * app asks those players for it (app c7af0733). The Privacy Age item and the Terms' section 2 say "13 to 16".
   */
  birthMonth: false,
  /**
   * Migration 20261005100100_under_13_account_removal applied: a birth year under 13 deletes the account at
   * once (set_birth_year runs the player's own deletion), and the phone keeps refusing every room.
   */
  under13Deletion: false,
  /**
   * The native age signals in the released app: Apple's Declared Age Range, Google Play Age Signals. A range
   * under 13 stops the app without asking and deletes nothing (lib/entryGate.ts; the range never leaves the
   * phone), and Privacy's Children section says so. If the app starts deleting the account on that signal,
   * change that sentence.
   */
  storeAgeSignals: false,
  /**
   * Crash reports go to Sentry (the 2.2 native build). Flip only once the Sentry project's
   * "Prevent Storing of IP Addresses" is on (owner setup); the text says Sentry doesn't keep the IP address.
   * Every report carries an installation ID the native SDKs add whatever sendDefaultPii says (sentry-android's
   * contexts.device.id = Installation.id; sentry-cocoa's contexts.app.device_app_hash, a SHA-1 of
   * identifierForVendor, the model and the bundle id), and the text says so.
   */
  crashReports: false,
  /**
   * Sentry keeps an approximate location with each crash report. Read by the Crash Reports text (with crashReports).
   * Sentry looks up the sender's IP address as a report arrives and stores what it finds as user.geo (country code,
   * region and city) even with "Prevent Storing of IP Addresses" on (on for the org and the project, read through the
   * API 2026-10-15): the re-test sweep's probe event ac56eb8a (web, 2026-10-15 13:24 UTC) has ip_address null and
   * geo {country_code US, region, city}. The IP is dropped after the lookup, so the IP sentence stays true. Our own
   * scrubbing can't stop it (the lookup is Sentry's, from the connection, after beforeSend; the SDK already sends
   * infer_ip 'never'). Set false once an Advanced Data Scrubbing rule in the Sentry project removes $user.geo and a
   * fresh labelled test event read back through the API has no geo (the owner adds the rule; QA F1158), and set
   * PRIVACY_LAST_UPDATED to that day. A Sentry-side fact for every app version at once: set in LIVE, never in
   * PRIVACY_AHEAD. While it's true, the store forms should declare an approximate location for crash reports (Google
   * Data safety: Approximate location; Apple: Coarse Location's reason), so the owner's rule is the better fix.
   * Off 2026-10-24: the org-level rule (Remove, Anything, $user.geo.**) is in place, and the owner's test crash of
   * 2026-10-24 10:01 UTC reads back through the API with geo {} and ip_address null.
   */
  crashReportLocation: false,
  /**
   * The 2.2 notifications (expo-notifications in the build): Remind Me on a game night schedules a notification on
   * the phone; Play Online's "Match found!" push (lib/matchPush.ts, the match-push Edge Function): the first FIND A
   * GAME asks for permission, and where notifications are allowed a saved player's Expo push token goes to
   * push_tokens (token, platform, app version, session_id since 20261007400000_push_token_sessions: pushes only while
   * that sign-in stands), refreshed at most daily, removed at sign-out, when permission is gone (next open) and with the
   * account; match_push_queue rows kept a day; guests never register. The owner's report alerts use the same table.
   * Ahead-safe: the push-token text reads this switch (not onePool), so the Privacy pages declare the token from the
   * submission day, as the store forms do.
   */
  notifications: false,
  /**
   * Shown with notifications: true says the Android build registers every phone with Firebase Cloud Messaging when
   * the app starts. expo-notifications brings firebase-messaging 24.0.1, whose component is always eager and whose
   * auto-init (on unless the manifest says otherwise) fetches a token at launch once google-services.json is in
   * the build, so Google gets a Firebase installation ID and app and device details from every Android player.
   * false: the build turns auto-init off (meta-data firebase_messaging_auto_init_enabled=false, app commit 44bdde6e,
   * plugins/withFcmAutoInitOff.js), so a token is fetched only when the app asks for one (match notifications, the
   * owner's report alerts), and the text says Google hears from the phone only then. 44bdde6e is in bb1a1ca2 (builds
   * iOS 27 / Android 10) and every later build. 2.1.1 has no Firebase at all, so this switch describes only 2.2 and is
   * set here (never in PRIVACY_AHEAD) to match the submitted Android build (runbook 1K step 2).
   */
  fcmAutoInit: false,
  /**
   * Sign in with Apple and Google (feature/social-sign-in). Apple's access is revoked (apple-revoke) only when the
   * account is deleted in the app on an Apple device and Apple's sheet confirms it, and the text says only that.
   */
  socialSignIn: false,
  /**
   * Buying packs and memberships through the App Store and Google Play, checked with RevenueCat
   * (feature/buying). Guests can buy, and Restore Purchases moves purchases to the account in use from any
   * other account, a deleted one included (RevenueCat's restore behavior "Transfer to new App User ID").
   * Once a phone has opened a buy screen, RevenueCat starts at every launch there and logs in whoever signs
   * in; purchases-ios sends identifierForVendor (X-Apple-Device-Identifier) with every request, and both SDKs
   * send the model, locales and storefront. The text names "an ID linked to your account", which stays true
   * if RevenueCat's app user id becomes a random per-account id (SEC-08).
   */
  purchases: false,
  /**
   * Deleting an account also deletes the player's RevenueCat customer record within 30 days (a server-side
   * call to RevenueCat's DELETE /v1/subscribers in the delete flow). Built and live since 2026-10-04: migration
   * 20261006140000_revenuecat_customer_deletion queues every deleted account (a BEFORE DELETE trigger) and
   * pg_cron's revenuecat-purge-tick runs purge-revenuecat, which retries until RevenueCat answers 200 or 404.
   * It can only work once REVENUECAT_SECRET_KEY is set in the function secrets (owner setup prompt 4): flip
   * when it is and one test deletion has emptied its revenuecat_purges row. Until then the pages say
   * RevenueCat keeps its record and that we have it deleted on request. On since 2026-10-22: the key is set,
   * and a throwaway guest made and deleted on live through the app's own calls (signInAnonymously, then
   * delete_guest_user, as Sign Out does) was queued at 08:52:38 UTC and its row emptied by the 08:55 tick
   * (purge-revenuecat 200 {"purged":1,"absent":1,"failed":0}; a wrong key would have stopped the run, 401/403);
   * every purge run in the logs since 2026-10-21 finished the same way. A server switch for every app version
   * at once: set in LIVE.
   */
  revenueCatDeletion: true,
  /**
   * The drawing check is live in the game, not only deployed. feature/drawing-check's check-drawing (31a1820)
   * is the engine alone: the game doesn't call it (a committed turn answers 501 not_wired), it stores nothing
   * about a turn, and the app has no Report a drawing. Flip only when the released app and the server do all
   * of this:
   *   - check every public-room drawing turn when it's committed, and a private-room drawing when it's
   *     reported (Report a drawing in the store build), sending OpenAI the picture, the secret word and the
   *     hashed drawer id (safety_identifier);
   *   - carry out the verdicts as the texts say: in public rooms a strike takes the turn's strokes off with a
   *     warning and counts on the strike ladder (pauses, then a permanent online-play ban); flagrant (hate
   *     symbol, slur, hate aimed at someone) removes the player and bans them from online play for good, in
   *     any room; a sexualized child's drawing comes off in any room and a person takes it from there; in a
   *     private room a strike does nothing by itself;
   *   - store each check's result and the strokes it took off, with a retention the Privacy text then states.
   * Check the Drawing Checks text (Privacy) and the automated-tools text (Terms section 8, Rules) against the
   * wiring that shipped before flipping.
   */
  drawingCheck: false,
  /**
   * The drawing check runs for the testers only: app_config drawing_check.enabled is "testers" on the live server
   * (since 2026-10-05, 20261006300100_drawing_check_testers; public_every_turn true). A room is checked only when
   * every member of it (room_players, its Play Online seats and every player of its running game) is a tester
   * (match_testers: the QA accounts and the saved accounts that used a 2.2 test build) or an admin, and a check is
   * sent only when every player of its game is one; nobody else's drawing ever goes to OpenAI, Spy Sketch stays
   * closed in public rooms for everyone else, and report_user answers drawing_check 'none' for them. Spy Sketch is
   * 2.2 only (2.1.1 has none). In those testers' games the check does everything drawingCheck's text says: every
   * public turn and every reported drawing, strikes and the ladder (_drawing_ladder: a warning, 3, 7 and 30 days,
   * then for good), flagrant removals with a second check, the child-safety path. On (and drawingCheck off), the
   * Terms (section 8, Automated tools), the Community Rules and Child Safety show drawingCheck's approved text with
   * one more sentence: for now, while we test it, only in games where every player is one of our testers
   * (drawingCheckLive, drawingCheckTestersOnly below). The Privacy pages describe the check through drawingCheck
   * (PRIVACY_AHEAD) and don't read this. At the launch (drawing_check.enabled true for everyone, runbook 3.5) flip
   * drawingCheck on and this off. Off also if the switch goes back to false. A server switch: set in LIVE, never in
   * PRIVACY_AHEAD.
   */
  drawingCheckTesters: true,
  /** The phone translates by itself when our service can't (feature/on-device-translation). */
  onDeviceTranslation: false,
  /**
   * Where the current app's backup translation goes when Microsoft can't answer:
   * 'device'  the phone calls MyMemory (main before feature/small-compliance)
   * 'server'  the translate function calls MyMemory (feature/small-compliance, TRANSLATE_BACKUP=mymemory)
   * 'off'     no backup: the translate function's MyMemory backup is off (app fix/mymemory-off: off unless
   *           TRANSLATE_BACKUP=mymemory; live TRANSLATE_BACKUP=off), so the text goes only to Microsoft, and
   *           with onDeviceTranslation the phone translates by itself when our service can't
   * 'off' from the 2.2 submission day (owner, 2026-10-07: Google Play's Data safety keeps "No data shared with
   * third parties"). The server switch covers every app version at once (2.1.1 never calls MyMemory), so 'off'
   * is true for everyone as soon as the backup is off live: set it in LIVE, on the Terms too (section 10).
   */
  myMemory: 'off' as 'device' | 'server' | 'off',
  /**
   * Automatic translation in the released app (app feat/auto-translate): a chat line (lobby, game, spy, out players)
   * or an interrogation question or answer written in another language than the reader's app language is translated
   * without a tap. Settings' "Translate messages automatically" (on by default) turns it off; off is the old
   * tap-to-translate. Lines in the reader's language and the app's own text are never sent to be translated, and the
   * 24-hour cache still serves only the players of the same chat. The same update lets the phone translate before
   * asking our service (app_config.translation_engine 'device_first') and lets the Android app download a language's
   * files ahead of time in a room's lobby when players at the table use other languages (on Wi-Fi; mobile data only
   * after asking; never ahead of time on iPhone); during a game, only when the player taps "Download <Language>".
   * On, it turns on: Privacy's Translations (automatic unless turned off in Settings, tap wording otherwise; the
   * phone may translate first; Android's downloads ahead of time), the Microsoft provider line and the Legal Basis
   * line; the Terms' section 10 and the FAQ's languages answer (they read LIVE). Flip when the app update that has it
   * is out to players (the store build released, or the OTA published), and set PRIVACY_LAST_UPDATED and
   * LEGAL_LAST_UPDATED (the Terms change too) to that day. Ahead-safe: the text only adds (the tap wording stays for
   * players who turn it off, and for older apps); see AHEAD_SAFE.
   */
  autoTranslation: true,
  /**
   * The translate function can use OpenAI: app_config.translation_engine is 'openai' on the live server ('microsoft'
   * is the default; 'device_first' asks the phone first and the server, through Microsoft, only when the phone
   * can't). With 'openai', our translate function (on the server, never the phone; only for apps whose one-time note
   * named OpenAI, the request's consent: others go to Microsoft) sends OpenAI's Responses API, with store: false, no
   * safety_identifier and a fixed prompt_cache_key: the text of the line(s) being translated; as context, up to three
   * lines of the same chat (those said just before, else its latest three; text only, not who said them); the names
   * not to translate (the table's seat names: display names, or the username where there's none, in private rooms;
   * agent names at public tables; plus the fixed "Agent <Colour>" list); and the languages. Never the account, user
   * id or a code made from it, email, IP address, device details, the secret word or location, or anyone's role. The
   * text quotes OpenAI's data page (developers.openai.com/api/docs/guides/your-data, read 2026-10-15): no training
   * on API data unless opted in (our organization's data sharing is off), abuse-monitoring logs up to 30 days with
   * its exceptions, and extended prompt caching's encrypted cache up to 24 hours (every query of an organization
   * without Zero Data Retention). Check that page again before flipping. Only lines whose authors all declared 16 or
   * older at the age gate go to OpenAI (app_config.translation_openai_min_author_age, 16; the rest, unknown ages
   * included, go to Microsoft), and the context lines and private-room names are only of such players: if the owner
   * changes that number, change "16" in Privacy's Translations, Microsoft and OpenAI items. And only lines whose
   * authors all agreed themselves (server 20261031100000_translate_author_consent, app feat/auto-translate
   * lib/translationConsent.ts: TRANSLATE on the note naming OpenAI; NOT NOW, or automatic translation turned off,
   * takes it back; older apps never agree), so Privacy's three items say "who agreed in the app" and that we keep
   * the answer (the note's version and when) until it changes or the account is deleted (translation_consents, rows
   * deleted with the profile). Flip only once that migration is live. On, it turns on: Privacy's
   * Translations names OpenAI ("Microsoft Translator (Azure AI Translator) or OpenAI, depending on which our service
   * uses") and says that only 16+ players' lines go to OpenAI and what it receives, the OpenAI provider item adds
   * translation (it shows with drawingCheck or this), the Microsoft line says "rather than OpenAI, and always for
   * messages from players under 16 or who haven't told us their age", the Age item adds choosing the translator to
   * what the age is used for, and OpenAI joins the contracts sentence; the Terms' section 10 names OpenAI too. Flip in the same change as the engine goes
   * 'openai' on the live server, or before it (the "or" wording stays true under 'microsoft' and 'device_first'),
   * never after, and set PRIVACY_LAST_UPDATED and LEGAL_LAST_UPDATED (the Terms change too) to that day. Keep it on
   * while the engine might go back to 'openai'; off only once OpenAI is out of the translate function for good. A
   * server switch for every app version at once: set in LIVE, never in PRIVACY_AHEAD (see AHEAD_SAFE).
   */
  openAiTranslation: true,
  /** Typed interrogation questions and answers go through the server and are stored like chat (M7 send_interrogation_line). */
  storedQuestions: false,
  /** The in-app QR scanner (camera). */
  qrScanner: false,
  /**
   * Play Online (feature/play-online-server, migrations 20261006160000 to 160500): FIND A GAME seats saved
   * accounts at standard tables. The server keeps match_searches (what was asked for: Spy Talk / Spy Sketch /
   * either, the table size, when; deleted with the account, finished ones after 30 days), match_seats (the
   * table, last seen, Ready taps; gone when the seat is), match_penalties (breaks: not_ready, declined, absent,
   * unseen_card 5 minutes, left_game 5 / 15 / 60 within 24 hours, the first absence in 24 hours free; deleted
   * with the account, otherwise after 90 days) and match_events (the matchmaking log, with the user id and no
   * link to the profile, so it outlives a deletion; deleted after 90 days). Breaks cover Play Online's standard
   * tables (and, before onePool, players' public rooms), never private rooms or game nights. Same requirements
   * as public rooms (_public_gate).
   * Flip before app_config.play_online goes 'on' for everyone (runbook 3.8c), in website update 1.
   */
  playOnline: false,
  /**
   * One pool (owner decision 2026-10-05; app feat/one-pool, migrations 20261006340000_one_pool_private_rooms and
   * 20261006340100_one_pool_languages): players make private rooms only (create_room and set_room_visibility refuse
   * public), so public rooms are Play Online's standard tables (standard rules, the free packs, and the members'
   * packs when a member sits at the table; no host) and the game nights we schedule and host. A room has no
   * language: every player sees the game (the secret and its description, the spy's list, the hints) in their own
   * app language (profiles.preferred_language, read by the server), chat stays as typed with Translate, and the
   * Globetrotter achievement counts the app languages at a table. 2.1.1 never made public rooms, but its rooms
   * have a host-picked game language, which the FAQ describes until this is on. Flip at the launch, with the
   * migrations live and the released app built from feat/one-pool or later. Not ahead-safe, and the Privacy pages
   * don't read it: their data facts from one pool (the server shows the game in each player's app language and
   * counts it for Globetrotter; list_rooms lists private rooms and game nights with their hosts) are live since
   * 2026-10-05 and stated without a switch, and the Play Online push token follows notifications.
   */
  onePool: false,
  /**
   * Report Message in the released app (2.2): a long-press on a chat line, a question or an answer opens the report
   * sheet on it (lib/messageReport), and report_user attaches the server's copy of that line and the chat around it
   * (20 before, 10 after; 20261006120100_report_user_message_evidence, live since 2026-10-04). The Terms (section 8)
   * and the Community Rules say so when it's on; the Privacy pages describe the evidence without it (a server fact).
   * Flip at the launch with the rest (Update 1).
   */
  messageReports: false,
  /**
   * Account emails (sign-up confirmations, password resets, email changes) go out through Resend (Supabase Auth's
   * SMTP, smtp.resend.com, sender noreply@mail.spysocial.app) instead of ImprovMX: live since 2026-10-07. ImprovMX
   * still forwards mail sent to support@.
   */
  resendAccountEmail: true,
  /**
   * Agent Colours phase 2 (app feat/agent-colours-2, migration 20261021000000_agent_colours_phase2): at Play Online
   * tables and game nights the server stops sending other players' display names and pre-2.2 profile photos. Another
   * player there gets your agent name, your username (in play too, and so do watchers: owner D1) and your drawn
   * avatar, never your profile photo (get_my_game_view / get_watch_view send a photo only to its owner; profiles
   * aren't readable there); watchers are nameless to the players (a count, the "Agent <colour> is watching" line); a
   * game night's stand-in host is listed (list_rooms) and named on its page (_event_json) by agent name, with no
   * photo. Private rooms are unchanged. Flip when 20261021000000 is applied live (it ships after the launch batch,
   * whose 20261020000200 profiles read rule it narrows) and app_config.public_names isn't "display" (that setting
   * reverts phase 2 too: flip back if it's ever set), and set PRIVACY_LAST_UPDATED to the day it goes up. A server
   * switch for every app version at once (what the server sends, whatever app reads it): set in LIVE, never in
   * PRIVACY_AHEAD.
   */
  agentColoursPhase2: true,
  /**
   * The browser version (play.spysocial.app, the app repo's web branch) open to everyone for an account: anyone can
   * sign in or make a guest there and use the account side (Account, the agent, colours, settings, language, Delete
   * Account, How to Play, the Shop, the rules). Playing in it (rooms, Play Online, game nights, watching) is a separate
   * gate: invite-only while the server's web_beta gate is on (app lib/webBeta, components/web/WebPlayGuard; everyone
   * else sees "Browser Play Coming Soon"). Turns on the legal text: Privacy (the browser version named in the
   * introduction, the browser's storage, platform "web", the browser's own speech recognition when someone plays in
   * the browser, crash reports from a browser, the microphone permission in the browser's settings, Vercel hosting
   * play.spysocial.app) and the Terms (a guest account in a browser, the browser's speech recognition when someone
   * plays in the browser). The browser version keeps the sign-in and the device's choices (language, the tour, tips)
   * in localStorage, and while signed in some game data (recent room codes, other players' avatars, drafts, notices
   * seen); sign-out removes the session and that game data (app lib/webPlatform BROWSER_ACCOUNT_KEYS), the choices
   * stay. Requests say platform=web (lib/clientInfo). On since 2026-10-10 (the account side opened to everyone that
   * day; LEGAL_LAST_UPDATED and PRIVACY_LAST_UPDATED set to it). Off only if the browser version closes to players
   * again. Not ahead-safe: it changes the Terms too.
   */
  browserLegal: true,
  /**
   * The site's ways into the browser version: Play in Your Browser on /join/<code> on a computer, the home page's
   * badge on a computer, and the footer link (lib/playUrl, components/Hero, components/Footer, pages/Join). Off while
   * playing in the browser is invite-only (owner 2026-10-10: the links wait until browser play opens to everyone).
   * Flip when the server's web_beta gate goes off (every account can play in a browser). No legal text reads it, so
   * flipping it alone changes no Last Updated date; check that the Privacy and Terms text under browserLegal still
   * fits open play then. VITE_PLAY_URL (Vercel env) can point the links elsewhere (a preview); unset, they go to
   * https://play.spysocial.app.
   */
  browserLinks: false,
  /**
   * The fair-play network codes recorded (migration 20261006480200_web_fair_play_signals, app_config
   * fair_play.record true): a keyed, daily-rotated code of the network, never the address.
   */
  fairPlaySignals: false,
  /**
   * Player Stats (app fix/player-stats, migrations 20261028000000_game_stats_context and 20261028000100_get_my_stats):
   * the server keeps each game's secret location or word and the kind of room with the game's record, and works out a
   * player's own stats from their game records for the app's Stats screen (games, wins, roles, votes, calls, answers,
   * guesses, time played, games per week). Members (Pack Pass or Lifetime, 13 and over) also get their most-played
   * locations and words and a playstyle label worked out from their stats. Each player's stats go only to that player:
   * never to other players, on player cards or in any list. Flip when the two migrations are applied live (the
   * processing starts then, whatever app_config.player_stats says) and set PRIVACY_LAST_UPDATED to the day it goes up.
   * A server switch for every app version at once: set in LIVE, never in PRIVACY_AHEAD.
   */
  playerStats: true,
  /**
   * The merch shop at shop.spysocial.app (lib/shop SHOP_URL): SpySocial merch sold and fulfilled by Fourthwall, the
   * seller of record (it takes payment through its processors such as Stripe and PayPal, collects sales tax and VAT,
   * and handles returns under its own terms). On, it shows a "Shop" link in the header (every page but Home, which has
   * no header) and the footer (every page), both to shop.spysocial.app in the same tab, and turns on the legal text:
   * Privacy (the shop named in the introduction, the Merch Shop section, Fourthwall in the providers list) and the
   * Terms (section 10's Merch line). Off, the site renders exactly as before this switch existed.
   * Flip when the owner says "open the shop" (planned for the 2.2 launch, Tuesday November 10, 2026), and only once the
   * shop is connected and approved: Fourthwall's custom domain serves shop.spysocial.app over HTTPS, the owner has
   * approved the sample, and the shop's password page is off. Check the Merch Shop text against the live shop then:
   * what it collects and who gets it (Fourthwall's privacy policy, https://fourthwall.com/privacy-policy, last read
   * 2026-10-15, Last Updated October 1, 2025: it handles shoppers' data "as a data processor and service provider on
   * our Customers' behalf", names Stripe and PayPal, and gives no fixed retention period, only "no longer necessary"
   * and "mandatory retention periods provided by law"), that orders still aren't linked to SpySocial accounts (no
   * creator codes, member discounts or account sign-in at the shop), and that the shop's footer links to
   * spysocial.app/privacy. In the same change, set PRIVACY_LAST_UPDATED and LEGAL_LAST_UPDATED (the Terms change too)
   * to that day; if it flips with the launch, the launch's dates and the Terms' new publication cover it. The Terms
   * line adds no duty for players, so it needs no new app_config.terms_version by itself. A website fact for every app
   * version at once: set in LIVE, never in PRIVACY_AHEAD.
   */
  merchShop: true,
  /**
   * Creator codes and reward codes (app feat/creator-codes, migration 20261031900000_creator_codes, owner 2026-10-17):
   * an account (never a guest) enters a code in Settings > Enter a Code. The server records which code it entered and
   * when (creator_redemptions, reward_code_redemptions), and grants the code's title and item. A creator code (one per
   * account, for good) links the account to that content creator: from then on each payment it makes through the
   * app (and each refund of one) goes on the creator's ledger (creator_sales: the store, our product id, RevenueCat's
   * price in USD, the store's tax / commission / take-home percentages, the date, the creator's share rate, and an MD5
   * of the store's transaction ids to match a refund; no user id, no country), so the owner can work out the creator's
   * share (a percentage of the proceeds; the player pays nothing extra). A deleted account leaves its redemption and
   * the ledger rows without anything that leads to it. A creator's own attached account shows a CONTENT CREATOR badge
   * to the players who see it by name (get_content_creators: _co_player_ids, private rooms only while public play uses
   * agent names). The creator sees totals only, from the owner. Turns on the Privacy text: Creator and Reward Codes
   * (Information We Collect), how we use it, the legal bases, Data Retention, Data Sharing (the badge, totals for the
   * creator) and AfterDeletion. Flip in LIVE when the migration is applied live (processing can start then, whatever
   * build a player has); ahead-safe (PRIVACY_AHEAD) from the day the build or the migration that has it is submitted
   * or applied, and set PRIVACY_LAST_UPDATED that day. No Terms text reads it. On in LIVE since 2026-10-21 (the
   * migration has been live since 2026-10-18; before that the text ran ahead).
   */
  creatorCodes: true,
  /**
   * The roadmap page (/roadmap, pages/Roadmap.tsx; owner 2026-10-21): what 2.2 brings on the launch day and what's
   * planned next (ranked, seasons, tournaments), with no dates beyond the launch. Its route works either way, so the
   * owner can read it before it goes up. On, the page is announced: the footer links to it (components/Footer),
   * search engines may index it (components/SiteHead) and the build adds it to sitemap.xml (vite.config.ts reads
   * this switch). Off until the owner approves the text. No legal text reads it, so flipping it changes no Last
   * Updated date. A website fact for every app version at once: set in LIVE, never in PRIVACY_AHEAD.
   */
  roadmap: true,
  /**
   * The launch-week game nights' days and hours (owner Console Events > Launch Week Game Nights, app
   * feat/launch-console): Spy Talk on Tuesday, November 10, Spy Sketch on Friday, November 13 and Spy Mafia on
   * Saturday, November 14, 2026, each 8 to 10 PM ET. On, the Roadmap's Game nights card and What's New's 2.2 Game
   * nights line name them (src/i18n: roadmap.now.launchWeek, whatsNew.v22's launchWeek). Off until the owner OKs the
   * schedule and the nights are published (app_config.events_enabled on); if a day or hour changes, change those
   * lines in all 10 languages first. No legal text reads it. A website fact: set in LIVE, never in PRIVACY_AHEAD.
   */
  launchGameNights: false,
  /**
   * A creator's YouTube Short on the home page, just below the hero (components/home/CreatorShort; first Levvis's
   * sponsored Short, live around November 20, 2026): a heading naming the creator, the Short in YouTube's
   * privacy-enhanced player (youtube-nocookie.com, 9:16) behind a click-to-load poster, so nothing loads from YouTube
   * until the visitor presses play, the credit linking to the creator's channel, and a button to the browser version.
   * Shown only while enabled with an 11-character youtubeId and an https channelUrl (creatorShortLive). Turns on the
   * Privacy text: YouTube in Third-Party Service Providers; set PRIVACY_LAST_UPDATED's creatorShort date to the
   * deploy day when flipping. No Terms text reads it. A website fact: set in LIVE, never in PRIVACY_AHEAD.
   */
  creatorShort: { enabled: false, youtubeId: '', creator: 'Levvis', channelUrl: '' },
  /**
   * The grooming flag (app repo feat/child-safety-flag, migration 20261105200000_grooming_flag; owner-approved plan item
   * 10, 2026-10-22): every minute, the server's scan (pg_cron grooming-flags) reads the chat lines just written, and in a
   * room or game with anyone under 18 or without a birth year (members, seats, running watchers: the contact block's
   * rule), an adult's line (game chat, the lobby, spy chat, the out chat, a typed question or answer) with a phrase that
   * can be part of grooming (its age or school, secrecy, moving elsewhere, meeting, photos, gifts; the app's ten
   * languages) gets a tag on the owner's Moderation Console: public.chat_flags keeps the case, the line's id and the
   * kinds of phrase, nothing else; the line itself stays in chat_messages for chat's own retention. It blocks, hides and
   * reports nothing and is shown to no player; it opens or joins the player's case like a report, kept as reports are.
   * Turns on the Privacy text: Safety Information (the flag, what it keeps, how long), the Age item's pointer to it, and
   * Legitimate Interests. POLICY FIRST: deploy the site with it on before the migration is applied (the policy rule),
   * and set PRIVACY_LAST_UPDATED to that day. Off only if the migration is rolled back. A server switch for every app
   * version at once: set in LIVE, never in PRIVACY_AHEAD. No Terms or Rules text reads it.
   */
  groomingFlag: true,
  /**
   * The grooming flag's wider scope (app repo fix/sec-oct23, server file 20261106200000_grooming_flag_fixes, findings 3
   * and 4 of the Oct 23 security review): the scan also reads the lines of senders without a birth year (guests, a
   * skipped question); every sender but a declared minor is read, and a line counts only for someone else's age
   * (_minor_present_besides). New table public.chat_minor_lines (the line's id only, deleted with the line; RLS on, no
   * policy, service_role SELECT; never in chat_messages.meta, which players get) stamps, at the send, each player's
   * line sent while someone else in the room or game was under 18 or without a birth year, so the scan still reads it
   * after the minor leaves. Nothing leaves the server, no new provider, nothing new shown to players. Turns on the
   * Privacy text inside groomingFlag's: Safety Information (who is read, the record, kept as long as the line) and the
   * Age item's pointer. Needs groomingFlag (its text sits inside groomingFlag's). POLICY FIRST: deploy the site with it
   * on before the server file is applied; flipping it also moves PRIVACY_LAST_UPDATED (below) to its date: set that
   * date to the deploy day if later. Off only if the server file is rolled back. A server switch for every app version
   * at once: set in LIVE, never in PRIVACY_AHEAD. No Terms or Rules text reads it.
   */
  groomingScope: true,
  /**
   * The developer's visible watch (app repo: the DEV watcher at Play Online tables and game nights): SpySocial's
   * developer can join a live public table as a watcher. The table's chat says "The developer has joined.", he counts
   * among its watchers and gets only the watch view (public names, the questions, answers and general chat, what the
   * game shows everyone; never a role, the word or location, votes before the reveal, or the spy or out chats). His
   * lines show as "DEV Developer" and go through the same chat filters and safety checks, including the grooming flag's
   * review in rooms with players under 18. The moderation log records each watch (the table, the game, the time). He
   * never takes a seat. Since the app repo's 20261121600000_owner_live_moderation (feat/owner-live-moderation), he may
   * act from the watch for safety or a broken rule (owner_table_action, owner_end_game): mute a player for the rest of
   * that game (their general-chat lines there deleted, new ones refused), remove a player (out of the game and the
   * room, no win from it), ban the account (24 hours, 7 days or permanent), or end the game for everyone with no result
   * (cancel_reason 'developer'). A removal or an ending puts a gold line in the table's chat with no name in it; a mute
   * tells the table nothing. Each action files a case and the developer's report with the server's evidence (the
   * game's last 50 general-chat, system and Q&A lines and the player's own general-chat and Q&A lines there; never the
   * spies' or out players' chat), kept as reports are, and a mod_actions row. The Privacy passage says so, dated
   * PRIVACY_LAST_UPDATED's October 25, 2026 (no new data type, provider or purpose: the Safety Information already
   * covers reports, removals, mutes and bans). Turns on one passage in Privacy's Data Sharing (after the watchers). POLICY
   * FIRST: deploy the site with it on before the feature goes live; flipping it also moves PRIVACY_LAST_UPDATED (below)
   * to its date: set that date to the deploy day if later. A server switch for every app version at once: set in LIVE,
   * never in PRIVACY_AHEAD. No Terms or Rules text reads it.
   */
  developerWatch: true,
  /**
   * Game Night v2 (app repo feat/gamenight-v2, server files 20261106100000-150000; QA 110, integrate/postlaunch steps 3-8):
   * each night's titles (the night's, the Local winner's, the Spy winner's) and the developer's bonus title are recorded
   * with the account: which week, each Game Night seat's outcome (whether the game counted, and why not), the game a
   * title came from (if any: the close's last-table rule gives one with no game) and when (public.gamenight_prizes,
   * gamenight_results, gamenight_bonus; ON DELETE CASCADE with the profile). Seating is Play Online's: a Game Night
   * search is a match_searches row with the night's event_id (kept as Play Online searches are; a search the night's
   * close ends, 'gn_over', gives no break), and the tables are Play Online tables. The developer's bonus title is
   * announced at the table by the gold chat line "DEV Developer granted <the seat's name> <the title>." (_grant_chat_line),
   * so the item says the table's chat names who got it. Cosmetic only, no new provider; nothing else leaves our servers.
   * Turns on Privacy's Game Night item (after Play Online). The developer's watch at these tables is developerWatch's
   * text (20261106130000): flip both in the same deploy. POLICY FIRST: deploy the site with it on before the server
   * files are applied (QA 110 step 3), even though app_config gamenight.enabled stays false until the owner turns the
   * first night on (Fri Nov 13, 2026, 7:55 PM ET); flipping it also moves PRIVACY_LAST_UPDATED (below) to its date: set
   * that date to the deploy day. Off only if the Game Night v2 files are rolled back. A server switch for every app
   * version at once: set in LIVE, never in PRIVACY_AHEAD.
   */
  gameNightPrizes: true,
  /**
   * The Game Night rules page (/game-night-rules, src/pages/GameNightRules.tsx): the weekly Game Night's official
   * rules (no purchase, up to four cosmetic titles a night with no cash value, each once per account per night, the
   * developer's bonus title). The page says it is part of the Terms, so on, the Terms' section 5 (Events) also points
   * to it (one sentence: Game Night, its titles, the rules page), and flipping it moves LEGAL_LAST_UPDATED (below) to
   * its date. That sentence adds no duty or penalty a player didn't already have (Game Night tables are Play Online
   * tables, and the titles are virtual items under section 9), so it isn't a material change: no new TERMS_PUBLISHED,
   * no app_config.terms_version raise by itself.
   * Off: the route doesn't exist (the 404 page), nothing links to it and it isn't in the sitemap. On: the route, the
   * footer's link and the sitemap entry (vite.config.ts SWITCHED_PAGES), and the Terms' sentence. Turn it on with
   * gameNightPrizes (the same deploy), and in any case before the owner turns the first night on. If the night's day
   * or hours change, change the page first. No Privacy text reads it: set in LIVE, never in PRIVACY_AHEAD.
   */
  gameNightRules: true,
  /**
   * Intel, the earned shop currency, and the daily streak (app repo feat/coins-streak c79e29ed, server file
   * 20261121000000_coins_streak, switched on by 20261121100000_release_switches: QA 110, integrate/postlaunch steps 9
   * and 11). Players see "Intel"; the server says "coins". Once app_config.coins.enabled is true, the xp_awards trigger
   * (_coins_on_award) pays Intel for every paid XP award (xp > 0, no zero reason: nothing for a left / removed / absent
   * seat, no result, too short, flagged, alone, idle or farm game), whatever app the player has: 5 a game for the first
   * 10 of the stats day (UTC), 20 for the day's first, a streak bonus 5 x days up to 35, a streak freeze every 7 days
   * (at most 1). It stores, per account: coin_wallets (balance, earned and spent totals, streak days, best streak, the
   * last stats day with a paid game, freezes) and coin_ledger (one row per paid game: game id, day, the amount and its
   * parts, the balance after; one row per item bought: item, price, day; kept while the account exists). buy_with_coins
   * spends it on the items coin_prices lists (never Lifetime's, a membership's, an item sold for money, secret or
   * default ones) and adds an unlock row (source 'grant', ref 'coins:<ledger id>'). Every coin table cascades with the
   * profile. Shown only to the player (get_my_coins, get_my_game_coins: Home's streak, the Shop, the Locker, Game Over);
   * the owner's console shows totals across players and logs his config changes (mod_actions 'coins_config'). Intel is
   * never sold (no store product; if it ever is, the stores' virtual-currency rules and a new Terms section apply) and
   * no provider gets anything. Turns on: Privacy's "Intel and Daily Streak" item (after Game Night), How We Use, the
   * contract legal basis, Data Retention, and deletedSummary (lib/legalText: Delete Account too); the Terms' section 9
   * (Intel by name: earned only, no cash value, can't be bought, sold or moved, prices and earning can change, balances
   * corrected or reset). The Terms line only names Intel under section 9's existing rules for virtual items (no money
   * value, no transfer, "we may change how they work", removal for cheating, lost with the account), so it is not a
   * material change: LEGAL_LAST_UPDATED moves (below), no new TERMS_PUBLISHED or terms_version by itself; the 2.2
   * launch's re-publication (TERMS_PUBLISHED, 30 days' notice) carries it anyway if it's on by then. POLICY FIRST:
   * deploy the site with it on before 20261121000000_coins_streak is applied (QA 110 step 9; the processing starts at
   * step 11, coins.enabled true), and set PRIVACY_LAST_UPDATED's and LEGAL_LAST_UPDATED's intel dates to the deploy day.
   * Off only if the file is rolled back (an item bought with Intel stays the player's, as a grant). A server switch for
   * every app version at once: set in LIVE, never in PRIVACY_AHEAD.
   */
  intel: true,
  /**
   * Ranked v2 (app repo feat/ranked-v2 06584ff7, server files 20261120000000_ranked_schema, 20261120100000_ranked_matcher,
   * 20261120200000_ranked_scoring; NOT in QA 110: owner 2026-10-24, a later release). HELD: off until those files are
   * applied live. Stores, per account and ladder (Spy Talk 4, Spy Sketch 4) and season: ranked_ratings (the visible
   * skill rating, MMR, with its uncertainty; games, wins, leaves, placements left, the rank shown and the season's peak,
   * wins at each reward level), ranked_results (one row per seat per ranked game: the outcome, whether it counted and
   * why not, the rating and rank before and after, the points shown), ranked_penalties (Ranked's own breaks: declining
   * 5 / 15 / 60 min within 24 h, leaving 15 min / 2 h / 24 h within 24 h, 3 leaves in 20 ranked games 3 days, or the
   * owner's), ranked_rewards (each season's titles and borders), ranked_public (the leaderboard choice: @username, or
   * "Agent <Colour>" by default), and a Ranked search's ladders in match_searches. Every table cascades with the profile.
   * Only the result moves the rating (never questions, chat, drawings or votes); a farm, flagged or parallel seat isn't
   * counted. get_ranked_leaderboard: the top 100 of a ladder's season with rank and MMR, adults only (a birth year 18+;
   * under 18 or unknown never on a public board), @username only for accounts that chose it, else "Agent <Colour>";
   * opens at 200 placed. Players see their own MMR, points and rank; Game Over shows each player their own change. No
   * provider. Turns on: Privacy's Ranked item, Data Sharing's leaderboard sentence, Data Retention, deletedSummary;
   * the Terms' Ranked paragraph in section 5 (its breaks, seasons, the soft reset, placement, rewards; ranks have no
   * cash value). That Terms paragraph adds penalties (Ranked's breaks), so it IS material for existing players: flip it
   * in a Terms re-publication (TERMS_PUBLISHED the deploy day, TERMS_EFFECTIVE_FOR_EXISTING 30 days later, the version
   * it replaces first in TERMS_PREVIOUS, app_config.terms_version raised so everyone agrees again in the app); players
   * who accept in the app are bound at once, so Ranked can open to them the same day. Before flipping, check the text
   * against the files that ship (they were reworked once already: v1 -> v2), and the Privacy draft in
   * migrations_pending/README.md ("Ranked v2"). POLICY FIRST: deploy before the files are applied, and set the ranked
   * dates (PRIVACY_LAST_UPDATED, LEGAL_LAST_UPDATED) to the deploy day. A server switch: set in LIVE, never in
   * PRIVACY_AHEAD.
   */
  ranked: false,
  /**
   * Tournaments v1 (app repo feat/tournaments-v1 992471d3, server files 20261121000000_tournaments_schema and
   * 20261121100000_tournaments_engine: NOTE those numbers collide with Intel's 20261121000000_coins_streak and
   * 20261121100000_release_switches, so one pair gets renumbered before either ships; the text here doesn't depend on
   * the numbers). HELD: needs Ranked (ranked must be on first); off until the files are applied live. 4-seat cups by
   * Ranked rank bracket: sign-up, check-in, three pod stages (a new table every game, everyone the spy once a stage),
   * the top half advance, byes; stores per account: tournament_entries (signed up, checked in, status: reserve,
   * playing, out, winner, no-show, left, withdrawn, disqualified; the rank at sign-up, the stage reached, wins,
   * points, place, tokens and title given), tournament_stage_players, tournament_tables, tournament_points (per game:
   * spy win 3, Locals' win 1, bye 1, leave or no-show 0), tournament_tokens (the Tournament Tokens ledger: earned by
   * placement, rank bracket and wins, spent in the shop, the owner's adjustments; never sold), tournament_purchases
   * (the season's shop, bought directly, never random). The 48-hour fair-play hold before results are final (the owner
   * can hold, disqualify or release). 2 no-shows in 60 days: no tournaments for 30 days. get_tournament: standings
   * between stages (never live) and the winners show @username for adults and "Agent <Colour>" for players under 18
   * (or without a birth year), with points and place, to any signed-in player who opens that tournament in the app
   * (get_tournament checks only that tournaments are open to the viewer); never anyone's spy game. Every table cascades with the profile (created_by SET NULL). No
   * provider. Turns on: Privacy's Tournaments item, Data Sharing's standings sentence, Data Retention, deletedSummary;
   * the Terms' Tournaments section in section 9 and the tokens' line (free entry, eligibility, check-in, no-shows and
   * their 30-day pause, leaving, byes, the fair-play hold, disqualification, titles and tokens with no cash value, not
   * transferable, can't be bought, shop items and prices can change, we may change, move or cancel a tournament). Material
   * (new rules and a penalty): flip it in a Terms re-publication, as ranked says (the same one if they ship together).
   * Before flipping, check the text against the files that ship and the README's draft line ("Tournaments v1"). POLICY
   * FIRST: deploy before the files are applied; set the tournaments dates to the deploy day. A server switch: set in
   * LIVE, never in PRIVACY_AHEAD.
   */
  tournaments: false,
  /**
   * Money buys only memberships (owner 2026-10-25, top priority for 2.2; final rules the same day): Agent (the monthly
   * Pack Pass), Elite (the yearly Pack Pass) and Spymaster (Lifetime) are the only products for sale; the owner may also
   * gift a membership (the Terms say so). The other 19 (the six packs
   * spysocial.pack.*, spysocial.all_packs, the bundles Grand Tour and Night In, the Masquerade Mask and the nine
   * celebrations spysocial.cosmetic.*) are off sale: never live in store_products, removed from sale in App Store
   * Connect and deactivated on Google Play (app repo .claude/handoff/scratchpad/store-pack/review-v8.md). The free packs
   * stay free; every other pack comes with any membership. Nothing was ever bought (store_purchases had 0 rows on
   * 2026-10-25), so nobody loses anything. Turns on: the Terms' buying section as "Buying a membership" (only
   * memberships are sold, what one unlocks; no "a pack you buy" or "an avatar item you buy"), section 3's guest line and
   * section 9's celebrations bullet (no "sold one by one"); Privacy's Purchases item and deletedSummary (memberships
   * only); the Safety page's parents line; the Game Night rules' no-purchase line; the Roadmap's Shop card and the home
   * page's closing line. The Terms' and the Safety page's text sits inside LIVE.purchases (and the celebrations bullet
   * inside avatarsLive), so before the launch only Privacy, the Game Night rules and the Roadmap show it. Flip when
   * store_products sells only the three memberships on the live server (the v8 Nov 2 switches: those three live, the
   * other 19 draft, the mask included), whatever app a player has, and set PRIVACY_LAST_UPDATED, the Game Night rules'
   * UPDATED and (once LIVE.purchases is on) LEGAL_LAST_UPDATED to that day. Not ahead-safe (it says we sell less): a
   * server fact for every app version at once, set in LIVE, never in PRIVACY_AHEAD.
   */
  membershipsOnly: false,
  /**
   * Intercepts (app repo feat/crates-server, server file 20261127000000_crates.sql, "crates" in code; app
   * feat/intercepts-client; owner 2026-10-25): sealed containers earned only by playing, each opening into one random
   * item (an avatar item, celebrations among them, or a title). Final rules (owner 2026-10-25): every 10 counted wins
   * at Play Online tables give 5 (4 of a random tier + 1 Secret or better; Game Night tables count; never a private
   * room, never a game that pays no Intel: farm, idle, alt-farm, left or removed, no result; no daily cap since owner
   * 2026-10-25, app 20261129000000_crates_no_daily_cap: was 20 wins a day); a
   * daily Intercept for the stats day's first counted Play Online game, on top of daily Intel (its tier rolled from
   * the tier odds; every 7th day played: Secret or better; streak milestones: day 14 Top Secret, then days 30, 60, 90
   * and every 30 days after Enigma, once each per account; rules v2, live 2026-10-25 18:16 EDT,
   * 20261127700000_crates_rules_v2); a Game Night winner (Local or Spy) 1 Enigma, once a night; a free creator code
   * the fan title + 5 Intercepts, one of each tier (Restricted to Enigma), once per account (rules v2; was 1 Secret
   * or better); a code tied to a purchase (merch: creators.gives_intercept false) gives the title only, and reward
   * codes never give one; the owner's gifts (a tier or
   * Secret or better, with a reason; never a pool item directly). Never a featured pack's creator (that's the bound
   * Featured Creator title and border). Spare copies are kept and can be shredded for Intel (never a Unique);
   * trade-ups (owner, later Oct 25): 5 spare copies of one rarity -> 1 random item of the next rarity, 5 Legendary
   * spares -> 1 Unique, odds shown, earned copies only (NOT in feat/crates-server f9138fa8 yet: check the file that
   * ships). REQUISITIONS REMOVED for 2.2 (owner, later Oct 25): Intel is earn-only (games, daily / streak, shredding)
   * with nothing to spend it on until trading; Intel the owner adds is locked (never tradable). At the 2.2 release (20261127190000_crates_reset) every pool item given out before is
   * taken back from every account except the Beta Pin, with a crate_revocations record (cascades). Five tiers
   * (Restricted, Confidential, Secret, Top Secret, Enigma), each rolled when the Intercept is earned and capping the
   * best rarity inside; seven rarities
   * (Common, Uncommon, Rare, Epic, Mythic, Legendary, Unique: a Unique is a one-of-one copy of a Legendary item, with a
   * colour that never repeats for that item and a serial number). Opening rolls a rarity from the tier's published
   * odds, then an item; a guarantee may decide it; a duplicate is kept as a spare copy, shreddable for Intel at a fixed
   * amount per rarity. Never sold:
   * no store product, no Intel price, no keys, re-rolls or speed-ups, an unopened one never moves to another account,
   * and a membership gives none extra. The odds are the server's own tables, the ones the roll uses (get_crate_odds,
   * readable without an account), shown in the app before opening. Stored per account: each Intercept (tier, when, how,
   * the game that completed its set of wins), each opening (rarity, item, duplicate and its Intel, a Unique's serial and
   * colour, the guarantee that decided it, when), the Uniques held, progress toward the next set and the guarantee
   * counters; every row cascades with the profile; shown only to the player (get_my_crates), totals to the owner. No
   * provider. Turns on: Privacy's Intercepts item (after Intel), How We Use, the contract basis, Data Retention and
   * deletedSummary; the Terms' section 9 (Intercepts by name: earned only, never bought with money or Intel, no cash
   * value, no trading or transfer, odds shown before opening and changed only between series after notice in the app,
   * the sources and their numbers, creator codes, gifts, spare copies shredded for Intel, Uniques, the 2.2 reset,
   * trade-ups, corrections), the Intel bullet as an earned currency with nothing to spend it on yet (locked Intel),
   * and its celebrations bullet (only from Intercepts); Privacy's Intel item (shredding, locked, no spending), How We
   * Use and the contract basis without "items you unlock with Intel"; the Safety page's parents line; the Game Night rules' Intercepts
   * paragraph (a winner's Enigma Intercept). Like LIVE.intel, the Terms text names Intercepts under section
   * 9's existing rules for virtual items and adds a promise (odds change only between series), no duty or penalty;
   * but its reset sentence takes back items players hold (section 9 already lets us "retire an item"), so carry it in
   * the 2.2 launch's re-publication rather than as a silent edit (owner's call if it ships separately). Check
   * every line against the server file that ships (the sources, the guarantee, the duplicate rule, what other players
   * see of a Unique) and the app's own word for Intercepts in each language. POLICY FIRST: deploy the site with it on
   * before 20261127000000 is applied live, and set the intercepts dates (PRIVACY_LAST_UPDATED, LEGAL_LAST_UPDATED, the
   * Game Night rules' UPDATED) to the deploy day. A server switch for every app version at once: set in LIVE, never in
   * PRIVACY_AHEAD.
   */
  intercepts: false,
  /**
   * Custom Packs (app repo feat/custom-packs-server and feat/custom-packs-client; owner 2026-10-25): a member (Pack
   * Pass or Lifetime: Agent, Elite, Spymaster) makes their own pack (a name, Spy Talk or Spy Sketch, its language, an optional description and at
   * least 30 entries) and plays it in their private rooms, where the room's players see its name and what the game deals
   * and shows from it (the location or word, the spy's list, the hints). Names and entries go through the word filter
   * when saved, and every pack's text through OpenAI's moderation model (check-pack, omni-moderation-latest; only the
   * texts) before anyone but the creator and the owner plays or sees it; the result and flags are kept with the pack,
   * a change checks again, a sexual/minors flag logs a child-safety record with a snapshot. Kept with the account (cascade) until the creator deletes the pack; a pack stays on the account if the
   * membership ends. Turns on: Privacy's Custom Packs item, How We Use, the contract basis, Data Retention and
   * deletedSummary; the Terms' section 6 (custom packs in "your content", the Custom packs paragraph), section 7 (the
   * rules cover packs) and section 8 (the word filter covers packs; removing a pack, stopping someone from making or
   * sharing packs); the Community Rules' "5. Custom packs" section; the Safety page's parents line; the Child Safety
   * Standards' scope line. The Terms lines
   * extend the content licence and the rules to a new, optional member feature: the app's pack editor should link the
   * Terms where a pack is saved or shared, so they bind whoever uses it. Check against the files that ship: the entry
   * minimum, what's stored, the filter on entries, what a room's players see, what happens to packs when a membership
   * ends. POLICY FIRST: deploy before the custom packs server file is applied live, and set the custom packs dates to
   * the deploy day. A server switch for every app version at once: set in LIVE, never in PRIVACY_AHEAD.
   * [Oct 27, the owner's pack lifecycle; policy/packs-lifecycle] Drafts (any size, private, never played) -> Create a pack
   * (5 to 200 entries; the automated check runs then: a pack that breaks the Terms isn't created; ordinary swearing is
   * fine in private) -> Ready packs play in the creator's private rooms. The Terms' Custom packs paragraph and section 8's
   * automated-tools line, Privacy's Custom Packs item and deletedSummary say so. Check against the lifecycle server file.
   */
  customPacks: true,
  /**
   * Community Packs (the same branches; needs customPacks): a member submits a custom pack, and a person on our team
   * reviews it before anyone else can see it (72-hour target, review_hours; approved, sent back for changes, rejected,
   * removed or held, with a reason; who reviewed it and when are recorded with a snapshot). An approved pack is shown to
   * every player, under-18s included (owner 2026-10-25: Community is the same for every age): its name, description,
   * game, language and entries, its creator's username (never the display name; every age; owner 2026-10-25, fix/packs-show-username), when it was added, the average
   * and number of its 1 to 5 star ratings, and how many players added it (downloads). Players search the packs (the
   * search also matches the creator's username, never the display name: the Safety page's "no player search" means people,
   * not packs), browse our collections, add a pack to their collection and rate it (one rating per account and pack, kept with the account; other players and the creator see only totals).
   * A Community Pack can be reported: the report keeps the pack as it was, the reason and the reporter's text, and a
   * person reads it within 24 hours like any report; a removed pack's copy stays in the moderation log as long as
   * reports are kept. The creator can take a pack out of Community Packs or delete it; deleting the account removes the
   * creator's packs from Community Packs and deletes the account's ratings and added packs. Creators get the bound
   * "Pack Maker" title (counts approved packs). Turns on: Privacy's
   * Community Packs paragraph (in Custom Packs), Data Sharing's sentence, Data Retention, the legitimate-interests line
   * (the review) and deletedSummary; the Terms' Community Packs sentences (the licence to show, list and translate an
   * approved pack and let players add, rate and play it; review, removal with a reason, appeal) and section 8's "report
   * a Community Pack"; the Community Rules' Community Packs line; the Safety page's parents line; the Child Safety
   * Standards' Community Packs line. Check against the
   * files that ship: the creator name shown (and for players under 18), what can be searched, ratings and counts, what a
   * deletion removes (from other players' packs too). POLICY FIRST: deploy before the server file is applied; set the
   * community packs dates to the deploy day. A server switch: set in LIVE, never in PRIVACY_AHEAD.
   * [Oct 27, the owner's pack lifecycle; policy/packs-lifecycle] Publish (from a created pack only; the app asks the
   * player to agree to the Terms and Community Rules again) -> a person's stricter 13+ review -> approved or turned down
   * with a reason. A published pack is frozen (no edit, no delete by the creator; a new version is a separate pack);
   * the licence for published packs is perpetual; the creator can remove their name (Anonymous; undo by them or the owner
   * within 7 days, then final; every removal and undo logged); deleting the account anonymises published packs at once
   * and deletes drafts and unpublished packs. Players can copy a Community Pack into a draft of their own. This replaces
   * the earlier "take it out or delete it at any time" and "deleting the account removes the creator's packs" above.
   */
  communityPacks: true,
  /**
   * Featured Community Packs (owner 2026-10-25; needs communityPacks): we may feature an approved Community Pack. It then
   * plays at Play Online tables and events (where players see its name and creator as Community Packs shows them), and
   * its name, description and entries are translated into the app's ten languages by our translation service (only the
   * pack's text and the languages go to OpenAI or Microsoft Translator, never the creator's account, name or age; the
   * translations are kept with the pack; OpenAI only for a creator 16+ who agreed, else Microsoft). We may edit a
   * featured pack (spelling, an entry that doesn't fit). Its creator gets the bound "Featured Creator" title and border,
   * which count featured packs (owner 2026-10-25, final: never Intercepts, never a Unique). Turns on: Privacy's featured
   * sentences (Community Packs) and the OpenAI and Microsoft provider lines; the Terms' Play Online line (featured packs
   * at tables), the licence's featuring clause (edit, translate, play online) and the Featured Creator sentence (bound
   * title and border, never money or other rewards). Before flipping, check which translator the pack translation uses and whether a pack by
   * a player under 16 goes to OpenAI (chat sends only 16+ authors' lines there), and that the app's Submit step names
   * the translator (Apple 5.1.2(i)). POLICY FIRST: deploy before the first pack is featured; set the featured dates to
   * that day. A server switch: set in LIVE, never in PRIVACY_AHEAD.
   */
  featuredPacks: true,
  /**
   * Every custom pack translated automatically (owner 2026-10-27; app repo fix/pack-auto-translate, server file
   * 20261201475000_pack_auto_translate; needs customPacks): no language to pick. When a member creates a pack (and its
   * automated check passes), our translation service detects the pack's language from its text and translates its
   * name, description and entries into the app's other nine languages, so every player sees it in their own language
   * (private rooms included, not only featured packs). Only the pack's text and the languages go to OpenAI (only for a
   * creator 16+ who agreed to translation by OpenAI in the app: chat's author rule; the language detection too) or else
   * Microsoft Translator, never the creator's account, name or age; store false; each translation goes through OpenAI's
   * moderation model and the word filter before it is stored; the translations are kept with the pack and deleted with
   * it; an edit translates only the changed text again. Turns on: Privacy's Custom Packs sentences (detected language,
   * the translation), How We Use, the Microsoft and OpenAI provider lines (custom packs, not only featured ones). The
   * Terms need nothing: section 6's content licence already covers translating a player's content to run the app.
   * POLICY FIRST: deploy the site with it on BEFORE the server file is applied live, and set its PRIVACY_LAST_UPDATED
   * date (below) to the deploy day. A server switch: set in LIVE, never in PRIVACY_AHEAD.
   */
  packAutoTranslate: true,
  /**
   * Sanctions survive account deletion (app repo fix/ban-tombstone, server file 20261130100000_ban_tombstone; owner
   * 2026-10-26: mode reapply, 12 months (36 for child safety), no Gmail folding). When an account is deleted with a
   * ban, pause or mute still running, or a strike from the last 90 days, the server keeps one tombstone per sanction:
   * its type, reason key, appeal right, ladder level, child-safety flag and dates, plus keyed one-way digests
   * (HMAC-SHA256, the key in Vault) of the confirmed email and each Apple / Google subject id (and the email the
   * provider gave); no email, name, username, provider id, note or chat in clear. A new account (or a newly connected
   * sign-in) that matches gets what is still running re-applied until the same end, and a "Returning sanctioned
   * player" case opens for the owner. Kept 12 months after the sanction's end or its 90-day window; a permanent ban 12
   * months after the deletion (36 for child safety), extended by each matching attempt; purged daily. Turns on one
   * sentence in Privacy's Safety Information, the deletedSummary clause, a bullet in AfterDeletionList (Privacy and
   * /delete-account), a Data Retention sentence and the Legitimate Interests clause. POLICY FIRST: flip it, deploy the
   * site, then apply the file (Nov 2, Window W); set PRIVACY_LAST_UPDATED's date for it to the deploy day. A server
   * switch: set in LIVE, never in PRIVACY_AHEAD. No Terms or Rules text reads it.
   */
  banTombstone: false,
  /**
   * Passwordless sign-in (app repo feat/email-code-signin): passwords go away; a saved account with an email signs in
   * with a one-time code we email (Apple / Google sign-in unchanged). Turns the password lines into code lines:
   * deletedSummary's first item, Privacy's Rate Limits, Data Retention's and AfterDeletionList's security-log
   * examples, the Resend item, the Rate Limits sentence about sign-in codes, and the Terms' "save your account" and
   * "Keeping your account safe" text. Checked against the app branch (2026-10-26): the codes come from the
   * email-code Edge Function and go out through Resend; a code lasts 10 minutes and stops after 5 wrong tries; the
   * function keeps only HMACs of the code and the address (table email_codes), deleted on use, expired ones within a
   * day. Old passwords keep working for 2.1.1 until the passwords_off migration (Phase B); flip this before the app
   * update with the code screens ships. It also turns /reset-password into a short "Passwords are gone: sign in with a
   * one-time code in the app" page with Open SpySocial and the store badges (pages/ResetPassword.tsx; ?preview=gone
   * shows it now; strings resetPassword.gone* in all ten languages). POLICY FIRST: flip and deploy before the
   * app or server drops passwords; set PRIVACY_LAST_UPDATED's (and LEGAL_LAST_UPDATED's) date to that day. A server /
   * app switch: set in LIVE, never in PRIVACY_AHEAD.
   */
  passwordless: false,
  /**
   * App versions before 2.2 still connect: they had a profile photo (added until 2026-10-20: photosPrivate), and
   * Account is the icon at the bottom right of their home screen. (They have no chat and never call MyMemory.)
   */
  oldAppsInUse: true,
}

/** A set of switches: LIVE, or PRIVACY on the pages that share the Privacy Policy's data facts. */
export type Switches = typeof LIVE

type BooleanSwitch = { [K in keyof Switches]: Switches[K] extends boolean ? K : never }[keyof Switches]

/**
 * The switches that may run ahead on the Privacy pages: each one only ADDS a disclosure when it's on (saying we do
 * something before every player's app does it is fine; leaving something out, or saying we stopped doing something,
 * is not). Set one ahead when the submitted 2.2 build (or, for a server piece, the live server) does what its text
 * says, by its comment in LIVE:
 *   avatarCreator, ageGateEveryone, storeAgeSignals, notifications, socialSignIn, purchases, onDeviceTranslation,
 *   qrScanner: in the submitted build;
 *   crashReports: Sentry in the submitted build and the Sentry project's "Prevent Storing of IP Addresses" on (the
 *   text says Sentry doesn't keep the IP address);
 *   birthMonth, under13Deletion, storedQuestions: their migrations live (all three since 2026-10-04) and the
 *   submitted build uses them;
 *   playOnline: its migrations live and the build has FIND A GAME (even while app_config.play_online is 'testers');
 *   revenueCatDeletion: only when its own condition holds (the key works and a test deletion emptied its row);
 *   drawingCheck: only when the build has the wiring and the check is on, or will be switched on at the launch
 *   (runbook 3.5) and the store forms declare drawings sent to OpenAI;
 *   autoTranslation: in the submitted build that has it (the store review compares the policy with the app), or
 *   from the day before an OTA with it goes out; the Terms' section 10 and the FAQ keep the tap wording until LIVE;
 *   creatorCodes: in the submitted build (Settings > Enter a Code) or once its migration (20261031900000) is live.
 * Never ahead (and not in AHEAD_SAFE): onePool and messageReports (the Privacy pages don't read them; they change the
 * Terms, the Rules and the FAQ, which wait for the launch), photosRemoved (says the photos are deleted), oldAppsInUse
 * (false drops what versions before 2.2 do while 2.1.1 is the store version), myMemory (a server switch for every
 * app version at once: set in LIVE to what the translate function does, 'off' since the submission day),
 * openAiTranslation (a server switch for every app version at once, which the Terms read too: set in LIVE, and its
 * "or" wording lets it go on before the engine does), fcmAutoInit (false drops the Firebase text; set it in LIVE to match the build), agentColoursPhase2
 * (says other players no longer see things; a server switch, set in LIVE), browserLegal (changes the Terms too; set
 * in LIVE), browserLinks (the site's links to the browser version, no legal text), roadmap (the roadmap page's link,
 * indexing and sitemap entry, no legal text), launchGameNights (the game nights' days on the Roadmap and What's New, no
 * legal text), creatorShort (the home page's YouTube Short; not a boolean, set in LIVE), merchShop (the shop links and
 * the shop's text, which the Terms read too; set in LIVE), fairPlaySignals and playerStats (server switches),
 * crashReportLocation (a Sentry-side fact, set in LIVE to what Sentry stores), photosPrivate and drawingCheckTesters
 * (server switches for every app version at once, which the Terms and Rules read too: set in LIVE), groomingFlag,
 * groomingScope, developerWatch, gameNightPrizes, intel, ranked and tournaments (server switches for every app version at
 * once: set in LIVE), membershipsOnly (says we sell less; a server fact, set in LIVE), intercepts, customPacks,
 * communityPacks and featuredPacks (server switches for every app version at once, which the Terms read too: set in
 * LIVE), gameNightRules (the Game Night rules page and the Terms' pointer to it, no Privacy text),
 * scheduledRetention,
 * photoCleanup and resendAccountEmail (already on). PRIVACY_AHEAD's type takes only these keys and only true, so anything else fails tsc
 * (npm run build); PRIVACY below also ignores anything else.
 */
const AHEAD_SAFE = [
  'avatarCreator',
  'ageGateEveryone',
  'birthMonth',
  'under13Deletion',
  'storeAgeSignals',
  'crashReports',
  'notifications',
  'socialSignIn',
  'purchases',
  'revenueCatDeletion',
  'drawingCheck',
  'onDeviceTranslation',
  'storedQuestions',
  'qrScanner',
  'playOnline',
  'autoTranslation',
  'creatorCodes',
] as const satisfies readonly BooleanSwitch[]

/**
 * Switches on for the Privacy pages before they're on in LIVE (see the top of this file and AHEAD_SAFE). All off
 * until the 2.2 submission day; emptied at the launch, once LIVE has them.
 */
export const PRIVACY_AHEAD: { readonly [K in (typeof AHEAD_SAFE)[number]]?: true } = {
  avatarCreator: true,
  ageGateEveryone: true,
  birthMonth: true,
  under13Deletion: true,
  storeAgeSignals: true,
  crashReports: true,
  notifications: true,
  socialSignIn: true,
  purchases: true,
  drawingCheck: true,
  onDeviceTranslation: true,
  storedQuestions: true,
  qrScanner: true,
  playOnline: true,
  // creatorCodes ran ahead from 2026-10-18 (site/creator-codes-policy) until LIVE turned it on (2026-10-21).
}

/** What the Privacy Policy, Delete Account, AfterDeletion and legalText read: LIVE, with PRIVACY_AHEAD on top. */
export const PRIVACY: Switches = {
  ...LIVE,
  ...Object.fromEntries(AHEAD_SAFE.filter((key) => PRIVACY_AHEAD[key] === true).map((key) => [key, true])),
}

/** Whether any player can still have a profile photo: before 2.2's avatars, or while versions before 2.2 connect. */
export const photosInUse = (s: Switches): boolean => !s.photosRemoved || s.oldAppsInUse

/**
 * Whether profile photos still show to other players and can still be added: photos in use and not private
 * (photosPrivate, 2026-10-20). Where a page says what other players see, what players can add or upload, or what the
 * rules cover, it reads this; where it says what data we hold or delete, photosInUse.
 */
export const photosShown = (s: Switches): boolean => photosInUse(s) && !s.photosPrivate

/** Whether the drawing check runs for anyone: for everyone (drawingCheck) or for the testers only (drawingCheckTesters). */
export const drawingCheckLive = (s: Switches): boolean => s.drawingCheck || s.drawingCheckTesters

/** Whether the drawing check runs for the testers only, so its text says so. */
export const drawingCheckTestersOnly = (s: Switches): boolean => !s.drawingCheck && s.drawingCheckTesters

/** Whether the released app has the avatar creator (from the 2.2 launch; the photo removal implies it). */
export const avatarsLive = (s: Switches): boolean => s.avatarCreator || s.photosRemoved

/**
 * Whether the Android app uses Google's ML Kit: it translates on the phone (onDeviceTranslation) and reads
 * QR codes (qrScanner). On iPhones, Apple's own frameworks do both.
 */
export const usesMlKit = (s: Switches): boolean => s.onDeviceTranslation || s.qrScanner

/** Whether the home page shows the creator's Short: switched on, with a YouTube video id and the channel's https link. */
export const creatorShortLive = ({ creatorShort: c }: Switches): boolean =>
  c.enabled && /^[\w-]{11}$/.test(c.youtubeId) && /^https:\/\/\S+$/.test(c.channelUrl)

/**
 * Who runs SpySocial: the legal name and a postal address, shown on the
 * Privacy Policy (the data controller) and the Terms (the contracting party,
 * Apple's minimum end-user terms). Owner to fill in.
 */
export const OPERATOR: { name: string | null; address: string | null } = {
  name: 'Aleksandr Gerzon',
  address: '55 Ash Gap Road, Clifton Township, PA 18424-7702, United States',
}

/**
 * "Last Updated" on the Terms, the Community Rules and the Safety page, and (through PRIVACY_LAST_UPDATED) on the
 * Privacy Policy and Delete Account: the day a change is published. Like PRIVACY_LAST_UPDATED below, a switch prepared
 * before its feature goes live carries its date here (newest first), so its one-line flip in LIVE moves the date too;
 * set each date to its deploy day when flipping. The first switch that's on wins, so a later change that isn't one of
 * these switches (the 2.2 launch's, for one) must fold the chain back to a plain string first, then set it.
 */
export const LEGAL_LAST_UPDATED: string = LIVE.tournaments
  ? 'December 4, 2026' // tournaments' Terms section: set to the day the site goes up with it on
  : LIVE.ranked
    ? 'December 4, 2026' // ranked's Terms paragraph: set to the day the site goes up with it on
    : LIVE.passwordless
    ? 'November 2, 2026' // sign-in codes instead of passwords (Terms 2): set to the day the site goes up with it on
    : LIVE.featuredPacks
      ? 'October 27, 2026' // featured Community Packs (Terms 5, 6): set to the day the site goes up with it on
      : LIVE.communityPacks
        ? 'October 27, 2026' // Community Packs (Terms 6, 8; Rules 5; Safety): set to the day the site goes up with it on
        : LIVE.customPacks
          ? 'October 27, 2026' // Custom Packs (Terms 6, 7, 8; Rules 5; Safety): set to the day the site goes up with it on
          : LIVE.intercepts
            ? 'November 2, 2026' // Intercepts (Terms 9; Safety): set to the day the site goes up with it on
            : LIVE.membershipsOnly && LIVE.purchases
              ? 'November 2, 2026' // memberships only (Terms 3, 9; Safety), visible once purchases is on: that day
              : 'October 25, 2026' // section 5: no votes at Play Online tables (Game Night's included); before it, October 24 (QA 110: Intel's section 9 line and the Game Night rules pointer)

/**
 * "Last Updated" on the Privacy Policy and Delete Account, which can run ahead of the Terms (PRIVACY_AHEAD): the
 * day the ahead text goes up. Back to LEGAL_LAST_UPDATED at the launch. A switch prepared before its server side
 * goes live can carry its date here (LIVE.<switch> ? its day : the current date), so the one-line flip in LIVE moves
 * the date too; once the switch is on for good, fold this back to a plain string.
 */
export const PRIVACY_LAST_UPDATED: string = LIVE.tournaments
  ? 'December 4, 2026' // the Tournaments item: set to the day the site goes up with it on
  : LIVE.ranked
    ? 'December 4, 2026' // the Ranked item: set to the day the site goes up with it on
    : creatorShortLive(LIVE)
      ? 'November 20, 2026' // the YouTube item (the home page's creator Short): set to the day the site goes up with it on
    : LIVE.passwordless
    ? 'November 2, 2026' // sign-in codes instead of passwords: set to the day the site goes up with it on
    : LIVE.banTombstone
    ? 'November 2, 2026' // sanction records kept after a deletion (ban tombstone): set to the day the site goes up with it on
    : LIVE.packAutoTranslate
    ? 'October 27, 2026' // every custom pack translated automatically: set to the day the site goes up with it on
    : LIVE.featuredPacks
      ? 'October 27, 2026' // featured Community Packs (translation, rewards): set to the day the site goes up with it on
      : LIVE.communityPacks
        ? 'October 27, 2026' // Community Packs (what's public, ratings, reports): set to the day the site goes up with it on
        : LIVE.customPacks
          ? 'October 27, 2026' // the Custom Packs item: set to the day the site goes up with it on
          : LIVE.intercepts
            ? 'November 2, 2026' // the Intercepts item: set to the day the site goes up with it on
            : LIVE.membershipsOnly
              ? 'November 2, 2026' // Purchases: memberships only (Privacy shows purchases ahead): set to that day
              : 'October 25, 2026' // the developer's watch may end a game or mute, remove or ban a player (owner live moderation); before it, October 24 (QA 110: Intel and Daily Streak, Game Night v2, the developer's watch; crashReportLocation off and groomingScope folded in)

/**
 * The launch text that no feature switch covers: the UK online safety text (Terms section 7's line on suicide,
 * self-harm, eating disorders and dangerous challenges, section 8's pointer to section 22, section 22 itself
 * (components/legal/UkOnlineSafety), and the Community Rules' matching line) and the Safety page (/safety, its route
 * and its footer link; it points to section 22). false holds all of it back, so the Terms, the Rules and the site
 * render as on the website's main before this branch: set it false whenever this branch reaches main before the
 * launch (the 2.2 submission day, with PRIVACY_AHEAD), and true again at the launch, when the Terms are published
 * again. Its own text follows the feature switches in LIVE, like the rest of the Terms.
 */
export const ONLINE_SAFETY_TEXT: boolean = false

/**
 * The May 1, 2026 Terms promised at least 30 days' notice before material new terms take effect.
 * People who used SpySocial before these Terms were published are bound by them from TERMS_EFFECTIVE_FOR_EXISTING,
 * or earlier if they accept them in the app; everyone else from their first use or acceptance. Whenever the Terms
 * gain material sections (the 2.2 launch does: see the top of this file), publish them again: TERMS_PUBLISHED the
 * day they go up, TERMS_EFFECTIVE_FOR_EXISTING 30 days later, and the version they replace first in TERMS_PREVIOUS
 * (newest first; the page names each one).
 */
export const TERMS_PUBLISHED = 'October 4, 2026'
export const TERMS_EFFECTIVE_FOR_EXISTING = 'November 3, 2026'
export const TERMS_PREVIOUS: readonly string[] = ['May 1, 2026']
