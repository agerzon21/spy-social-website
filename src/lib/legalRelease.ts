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
// online safety text in the Terms and the Rules, and the Safety page:
// ONLINE_SAFETY_TEXT (below LEGAL_LAST_UPDATED) holds it back until LIVE.launchSite. At the
// launch, flip the same switches in LIVE, empty PRIVACY_AHEAD, set
// PRIVACY_LAST_UPDATED back to LEGAL_LAST_UPDATED; ONLINE_SAFETY_TEXT follows LIVE.launchSite on its own.

export const LIVE = {
  /**
   * SpySocial LLC runs SpySocial (owner 2026-11-02; plan .claude/handoff/scratchpad/llc/FLIP-DAY.md in the app repo).
   * OFF (false): the pages name Aleksandr Gerzon as the operator. ON: set it to the day Pennsylvania approves the
   * LLC and the assignment of SpySocial to it is signed, as a "Month D, YYYY" string (e.g. 'November 9, 2026'),
   * which is the whole flip: Terms' "we" and Apple and contact lines, Privacy's controller and contact, the
   * DMCA notice line (the agent stays Aleksandr Gerzon, named for SpySocial LLC), Child Safety's maker and contact
   * (the person stays the point of contact), the UK online safety "who is responsible" (the LLC, with the person
   * accountable), the footer's copyright in 10 languages, a dated change line on the Terms and the Privacy Policy,
   * Privacy's "If SpySocial Changes Hands", and both Last Updated dates (to this day). Same address, phone and email.
   */
  llcOperator: 'November 9, 2026' as false | string,
  /**
   * Both store accounts show SpySocial LLC (FLIP-DAY.md, gate G6). While false and llcOperator is on, the Terms' and the
   * Privacy Policy's change lines also say the stores may still show Aleksandr Gerzon (LLC_STORE_NOTE). That keeps the
   * person a store shows and the company the policies name tied together during review (Google Play's User Data policy:
   * the entity in the listing appears in the privacy policy). Set true only when BOTH stores show the LLC.
   */
  llcStoresMoved: false,
  /**
   * IP vault (owner 2026-10-31; app repo feat/ipvault, server file 20261203750000_ipvault, live 20261031070824): the
   * real IP address of each sign-up (the Auth hook's payload) and of each sign-in / app start (note_device, Cloudflare's
   * address; at most one row per account and network every 6 hours), with the time and the account, SEALED on write
   * with an OpenPGP public key (pgcrypto); the private key is only on the owner's Mac, so the database can't open
   * them. Opened offline only (tools/ipvault/decrypt) for an NCMEC report, serious rule breaking, market manipulation
   * or a law-enforcement request; every export audited (who, why, case, time). Next to each, the integrity system's
   * keyed network code (/24, /48). Deleted after 90 days; kept up to 1 year for an NCMEC report, an open case, a
   * child-safety case or an owner hold (law enforcement). Turns on: the IP Address item's sentences, a Data Retention
   * sentence, the Legitimate Interests clause and an AfterDeletionList bullet. POLICY WITH CAPTURE: the site went up
   * with it on the day the key was set (capture starts then). A server switch: set in LIVE, never in PRIVACY_AHEAD.
   */
  ipVault: true,
  /**
   * Beta 2's paid playtest (owner 2026-10-31): the /beta sign-up form asks for a PayPal email to send the $10, and
   * Privacy's Test Versions item says so (used only for that payment, deleted once paid). The site went up with it on
   * October 31, 2026.
   */
  playtestPayPal: true,
  /**
   * Integrity's sign-up network code (app repo feat/integrity, server files 20261031060528_integrity_core_20261203600000
   * and 20261031060529_integrity_console_20261203610000, live 2026-10-31 06:05 UTC; owner Oct 31: the salted network
   * hash and the network block). The Supabase Auth "Before User Created" hook (public.integrity_before_user_created)
   * keeps, for each new account (email, Apple / Google or guest), an HMAC-SHA256 of its network (the /24 of an IPv4
   * address, the /48 of an IPv6 one) under a secret salt that never leaves the database (table
   * integrity_signup_networks), never the address; deleted after 30 days. The owner can block a network that is used
   * for abuse (with a case): new accounts and guests from it are refused for 30 days (renewable); existing accounts are
   * never affected. Turns on one passage in Privacy's IP Address item. Flip it the same hour the hook is switched on in
   * the Supabase dashboard (until then nothing is recorded), and set its PRIVACY_LAST_UPDATED date (below) to that day.
   * A server switch for every app version at once: set in LIVE, never in PRIVACY_AHEAD. No Terms or Rules text reads it.
   */
  integritySignupNetwork: true,
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
   * Nov 3, 2026: no page says "every" turn. Each public turn is queued, but one goes unchecked if the checks can't run
   * (an outage, or past the day's caps). Name no cap on a page.
   * Check the Drawing Checks text (Privacy) and the automated-tools text (Terms section 8, Rules) against the
   * wiring that shipped before flipping.
   */
  drawingCheck: true,
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
  drawingCheckTesters: false,
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
  /**
   * Translation v3, send time (server 20261201999000_translate_send_time + the translate-send function, owner
   * 2026-10-30): a chat, lobby or Q&A line is translated by OpenAI when it is SENT (app_config translation_send
   * {"enabled": true}: the database asks translate-send for the app languages of the line's other readers who agreed
   * to OpenAI's note), before any reader's app asks; the same text, context lines, names, languages, age (16+) and
   * own-yes rule per line, the same 24-hour cache, nothing sent that a reader's request wouldn't send. On, it turns on
   * Privacy's Translations sentence on send time and the OpenAI item's "usually as soon as they're sent". Flip when
   * translation_send goes {"enabled": true} live (not for a rooms-only test), and set PRIVACY_LAST_UPDATED's entry to
   * that day. Off again if send time goes off for good. A server switch: set in LIVE, never in PRIVACY_AHEAD.
   */
  translateSendTime: true,
  /**
   * Money talk in chat, the middle path (app server 20261204160000_money_chat_middle + 20261204161000_money_offer_tuning,
   * live 2026-11-01): a chat line that offers to trade items, Intel or accounts for real money is refused, and each such
   * refusal (and, with a minor there, a refusal of payment words) is an Integrity signal F3 on the sender's account:
   * when, which kind of words (a payment app, "real money" or a price; a sell word or an account, item or Intel word),
   * the surface, room and game, whether a minor was there; never the message. Kept with the other Integrity evidence
   * (pruned after 400 days). Turns on one sentence in Privacy's Chat Messages item. A server fact for every app version
   * at once: set in LIVE, never in PRIVACY_AHEAD. The Terms' rule (rmtGambling) is already live.
   */
  moneyChatSignals: true,
  /**
   * Translation v3, Microsoft off for messages (app_config translation_secrets_engine "none" or no row, with the
   * translate function of feat/translate-v3 deployed; owner 2026-10-30, option (a)): a message OpenAI may not take
   * (an author under 16, with no declared age, or who didn't agree; an app that never named OpenAI; OpenAI's limits)
   * is sent to no translation service and is translated only on the readers' devices (the app's phone backup in every
   * room, lib/phoneBackup, on-device Apple / ML Kit), or not at all. Packs keep translate-pack's own rule (OpenAI,
   * Microsoft only as its fallback) until that changes. On, it turns on: Privacy's Translations ("never sent to OpenAI
   * or to any other translation service" instead of "go to Microsoft Translator"; OpenAI the only server translator
   * of messages; the device's own translation shown when our service has none), the Microsoft provider item without
   * messages, and the Age item's wording. Flip when the ship's bridge rows (translation_secrets_engine "microsoft",
   * translation_openai_age_rule "table") are deleted live, and set PRIVACY_LAST_UPDATED's entry to that day. OFF
   * again whenever translation_secrets_engine goes back to "microsoft". The Terms (section 10: "Microsoft Translator
   * or OpenAI ... or translated on your device") stay true either way. A server switch: set in LIVE, never in
   * PRIVACY_AHEAD.
   */
  messagesOnDeviceOnly: true,
  /**
   * Translation v3 + AI spend guards, the bridge drop (app server ship/translate-v3: translate-pack v10, which uses
   * Microsoft only while app_config translation_secrets_engine says "microsoft"; the drop sets it to "none"): Microsoft
   * translates nothing at all, chat or packs. A pack OpenAI can't translate at that moment waits for its next try and
   * plays in its own language meanwhile. On (only together with messagesOnDeviceOnly: Privacy reads both), it removes
   * the Microsoft provider item, Custom Packs' "or, only when OpenAI can't translate it at that moment, Microsoft
   * Translator" (both sentences) and "Microsoft" in the contracts sentence; and in the Terms (section 10,
   * Translations) "sent to Microsoft Translator or OpenAI" becomes "sent to OpenAI" (fewer recipients, not a material
   * change: LEGAL_LAST_UPDATED moves, no new TERMS_PUBLISHED or terms_version). Flip with messagesOnDeviceOnly on the
   * drop day, and set PRIVACY_LAST_UPDATED's and LEGAL_LAST_UPDATED's entries to that day. OFF again (with
   * messagesOnDeviceOnly) whenever translation_secrets_engine goes back to "microsoft". A server switch: set in LIVE,
   * never in PRIVACY_AHEAD.
   */
  microsoftOff: true,
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
  playOnline: true,
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
   * Flip when the owner says "open the shop" (planned for the 2.2 launch, Tuesday December 8, 2026), and only once the
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
   * feat/launch-console): Spy Talk on Tuesday, December 8, Spy Sketch on Friday, December 11 and Spy Mafia on
   * Saturday, December 12, 2026, each 8 to 10 PM ET. On, the Roadmap's Game nights card and What's New's 2.2 Game
   * nights line name them (src/i18n: roadmap.now.launchWeek; What's New has no launchWeek line yet). Off until the owner OKs the
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
   * launch-week nights on (from Tue Dec 8, 2026, 7:55 PM ET); flipping it also moves PRIVACY_LAST_UPDATED (below) to its date: set
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
   * only); the Safety page's parents line; the Game Night rules' no-purchase line. (The Roadmap's Shop card and the home
   * page's closing line, no legal text, say memberships only already: fix/membership-only, 2026-10-30.) The Terms' and the Safety page's text sits inside LIVE.purchases (and the celebrations bullet
   * inside avatarsLive), so before the launch only Privacy, the Game Night rules and the Roadmap show it. On since
   * 2026-10-30 (fix/membership-only; owner's standing OK for policy updates, coordinator's decision): no item is sold
   * for money today (the released app has no buying, LIVE.purchases is off) and from the launch only the three
   * memberships are, so "only memberships are sold" is true now; it no longer waits for the v8 Window W switches (Mon
   * Dec 7). PRIVACY_LAST_UPDATED and the Game Night rules' UPDATED moved to October 30, 2026; LEGAL_LAST_UPDATED moves
   * only when LIVE.purchases goes on (the Terms' and the Safety page's memberships text is inside it). Not ahead-safe
   * (it says we sell less): a server fact for every app version at once, set in LIVE, never in PRIVACY_AHEAD.
   */
  membershipsOnly: true,
  /**
   * The Terms' membership section ("Buying a membership", section 9) shown before LIVE.purchases (PRESUBMIT-AUDIT B4,
   * 2026-11-02; owner's standing OK for policy updates): the 2.2 paywall links Terms of Use here and App Review opens it
   * from Nov 10 (memberships go to review with the build), weeks before the launch hour. With LIVE.purchases off it adds
   * a first bullet: memberships go on sale with version 2.2, nothing is sold before, and review / tester test
   * purchases are taken back. Everything else in the section (auto-renewal, cancelling on each store, no free trial
   * today, Lifetime, price changes, Family Sharing off for all three products, no cash value, refunds, deletion,
   * Restore) describes how the 2.2 memberships work and stays true while nothing is sold. The other purchase lines
   * (section 3's guests, section 9's Restore exception and after-deletion line) still wait for LIVE.purchases.
   * Facts checked 2026-11-02: three products only (spysocial.pass.monthly / spysocial.pass.yearly /
   * spysocial.lifetime), Family Sharing off (apple-forms), no intro offer or trial (lib/purchases.ts has no offer
   * handling, none configured). Server-independent: set in LIVE.
   */
  membershipTerms: true,
  /**
   * Intercepts (app repo feat/crates-server, server file 20261127000000_crates.sql, "crates" in code; app
   * feat/intercepts-client; owner 2026-10-25): sealed containers earned only by playing, each opening into one random
   * item (an avatar item, celebrations among them, or a title). Final rules (owner 2026-10-25): every 10 counted wins
   * at Play Online tables give 5 (4 of a random tier + 1 Secret or better; Game Night tables count; never a private
   * room, never a game that pays no Intel: farm, idle, alt-farm, left or removed, no result; no daily cap since owner
   * 2026-10-25, app 20261129000000_crates_no_daily_cap: was 20 wins a day); a
   * daily Intercept for the stats day's first counted Play Online game, on top of daily Intel (its tier rolled from
   * the tier odds; every 7th day of a streak: +1 Secret or better on top; every 30th day of a streak: +1 Enigma on top (20261201690000; was days-played weekly + day 14 Top Secret, then days 30, 60, 90
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
   * ON 2026-10-28 (owner's standing OK of 2026-10-28 for Terms / Privacy changes; F2 / F21: before the Oct 29 beta's
   * outside testers), with the text re-checked against integrate/2.2 2ef01a2e and the live files: codes give what each
   * code is set to (crate_rewards / creators.intercept_tiers: a free creator code 5 by default, one of each tier;
   * LEVVIS is set to Enigmas; the SPOTTED reward code 1 Restricted; the review code 5), held until the first counted
   * Play Online game (20261129600000_code_intercept_hold); purchase-linked codes none; the daily is claimed in the app
   * and never expires (20261201080000_daily_claim); milestones 14 -> Top Secret, every 30 -> Enigma; the odds sheet
   * (OddsSheet, get_crate_odds) lists tier and rarity odds, any guarantee, the shred values and "Odds updated <date>",
   * but NO item list (owner 2026-10-27), so the Terms no longer say "the items each can give"; the drafted promise
   * "odds change only between series" (never an owner decision) is replaced by "the app always shows the odds every
   * opening uses, with the date they last changed"; trade-ups as 20261128800000 ships them (5 spares of one rarity,
   * the next rarity, unowned first; 5 Legendary -> a Unique of one of the five; 10 since LIVE.uniquesRarer); the reset (pending
   * 20261127190000_crates_reset, Window W) wipes every pre-release Intercept, copy and trade-up, testers' included,
   * and takes back every pool item except the Beta Pin and anything bought; Intel stays.
   */
  intercepts: true,
  /**
   * Minted collectibles and the public ledger (app repo feat/minting: 20261202200000_mint_ledger, genesis
   * 20261202300000 at the launch hour; owner 2026-10-29 / 30). Every Game Night title, the Beta Pin, Field Tester and
   * every Intercept item is minted: a copy with its own number (every copy, commons too), the rule it was earned under
   * and its evidence (the night and game, the tester list, the Intercept or trade-up); the database refuses a copy
   * outside its window or without its evidence, whoever asks, and a closed collectible never mints again. Every mint,
   * burn (shred, trade-up, a correction for cheating or an error, a revoke) and retirement (account deleted) is a row
   * of a hash chain; the 00:00 UTC checkpoint's hash (supply + the rules' fingerprint) is the day's head, committed to
   * this repository (public/ledger/heads.csv, by .github/workflows/ledger-heads.yml) and saved to the Wayback Machine;
   * spysocial.app/ledger shows the supply and recomputes the chain. Holders are per-copy tags (HMAC of the copy id
   * under a random secret per account, deleted with it): never an account id or a name. Stored per copy (with the
   * account, private): the account, the tag, the age band when held (under 18 / adult / unknown, from the declared birth
   * year), earned and minted times, the evidence ids (game, night, Intercept, trade-up, the tester list's reasons),
   * burns with their reason and evidence; the ledger rows are kept for good (a deleted account's tags then point at
   * nobody). No new provider: GitHub and the Internet Archive get only the day's head hash (no personal data). Turns
   * on: the /ledger route; the Terms' section 9 collectibles bullet; Privacy's Collectibles item and its retention
   * line. Not ahead-safe (a server fact from genesis): set in LIVE at the launch hour, with both dates moved (below).
   * ON since November 1, 2026: the BETA TEST CHAIN (app 20261202295000) has been live since Oct 31 21:17 UTC (minting,
   * the public ledger function, transfers for trades and Black Market sales), so the text says so: Privacy's
   * Collectibles item, the Game Night and Intercepts items' ledger clause, the Trades item's ledger clause, Terms 9's
   * bullet, all naming the beta chain and its wipe before launch. At the launch (the real genesis) drop the beta-chain
   * sentences and set both dates.
   */
  mintedCollectibles: true,
  /**
   * Uniques rarer (owner 2026-10-30; app server 20261202450000_unique_rarity, app branch fix/unique-rarity, pending):
   * no Unique from Top Secret (Legendary 3%, Mythic 18%), Enigma's Unique 0.5% (Legendary 10%, Mythic 24.5%), and the
   * Legendary -> Unique trade-up takes 10 spare Legendaries (was 5; every other rarity 5). Turns on: Terms 9's
   * trade-up sentence ("10 spare Legendary copies ... one of those ten items") and the transparency page's rule
   * changes (src/lib/transparency.ts). Not a material change (section 9's existing rules: the app shows the odds in
   * use and the day they changed): LEGAL_LAST_UPDATED moves (below), no TERMS_PUBLISHED or terms_version. Deploy the
   * site with it on the same hour the server file is applied (the app shows the new odds from the server at once);
   * off only if the file is rolled back (the old text: 5 Legendaries).
   */
  uniquesRarer: true,
  /**
   * No real-money trading and no gambling (owner's standing OK; trading spec section 12, published ahead of trading on
   * Oct 31, 2026): Terms 9 gains two lines. Selling items or Intel for money was already refused by section 9 ("You can't
   * sell or trade them ... or exchange them for money"); these name accounts, other sites and gambling, and what we may do.
   * Not a material change (it restates a ban already in force): LEGAL_LAST_UPDATED moves (below), no TERMS_PUBLISHED or
   * terms_version. A website fact: set in LIVE, never in PRIVACY_AHEAD. The rest of trading's Terms waits for its switch-on.
   */
  rmtGambling: true,
  /**
   * Membership codes (app repo feat/membership-codes, server file 20261203440000_membership_codes, owner 2026-10-31:
   * codes that give a month, a year or Lifetime, for giveaways, creators and apologies; granted as the owner's gifts
   * already are). Terms 3's gift line names codes and says how a gifted month or year counts (it adds to the time held,
   * never renews; after Lifetime a code adds no time); Privacy's Creator and Reward Codes item names membership among a
   * code's rewards. Not a material change (gifts were already in the Terms): LEGAL_LAST_UPDATED and PRIVACY_LAST_UPDATED
   * move (below), no TERMS_PUBLISHED or terms_version. Deploy the site with it on in the update that ships the app's
   * Membership field (update 12); off only if the server file is rolled back.
   */
  membershipCodes: true,
  /**
   * Volunteer community moderators (app repo feat/moderator, server 20261202460000_moderator_role: moderators, scopes,
   * moderator_agreements, mod_actions; owner 2026-10-30/31; first test moderator granted on live 2026-10-31). Terms 8
   * says trusted volunteers may act on reports (warn, mute, pause up to 7 days, remove from a Play Online table) and
   * that bans are confirmed by SpySocial; Privacy's Data Sharing says what they see (the report, the chat and account
   * details a case needs), that they sign a confidentiality agreement, that child safety goes to the developer only,
   * and that every action is logged. Not a material change (moderation was already in the Terms): LEGAL_LAST_UPDATED
   * and PRIVACY_LAST_UPDATED move (below), no TERMS_PUBLISHED or terms_version. A website fact: set in LIVE, never in
   * PRIVACY_AHEAD. Off only if the moderator role is removed.
   */
  volunteerModerators: true,
  /**
   * The username's 30 days (app repo feat/username-limit, server 20261204120000_username_limit, live 2026-11-01 03:21
   * UTC as 20261101032151; owner 2026-10-31): one username change every 30 days, a name you stop using reserved for 14
   * days (Terms' Rules for accounts), and the past usernames kept with when they changed, deleted with the account
   * (Privacy's Account Information). Not a material change: LEGAL_LAST_UPDATED and PRIVACY_LAST_UPDATED move (below),
   * no TERMS_PUBLISHED or terms_version. A server fact for every app version at once: set in LIVE, never in
   * PRIVACY_AHEAD. Off only if the server file is rolled back.
   */
  usernameLimit: true,
  /**
   * Economy Integrity E0 (app repo feat/economy-integrity, server file 20261202020000_intel_ledger_lock, applied live by
   * the owner): no free-form Adjust Intel (owner_coins_adjust answers retired); the Intel ledger is append-only (no line
   * edited or deleted, not even by us; the wallet is the ledger's sum); every line names its cause; an erased account's
   * lines stay with no account (the profiles FK is ON DELETE SET NULL) and each line's client part (app api, build,
   * platform) is dropped after 2 years; test Intel (test_grant) goes only to our own test accounts, locked. Turns on:
   * Terms 9's Intel line (no Intel by hand, the ledger kept whole) and the Intercepts line's launch-reset sentence
   * (shredding Intel from before the reset taken back, Intel spent on taken-back items refunded: WI, incident I-1;
   * owner 2026-10-28), Privacy's Intel item (the ledger's client part and actor, kept for good without the account,
   * the locked part), Data Retention, the deletion summary and After Deletion. POLICY FIRST: on the day E0 is applied;
   * set its dates below to that day. A server switch for every app version at once: set in LIVE, never in PRIVACY_AHEAD.
   * On 2026-10-30: E0 live since ~02:45 ET (intel_ledger_lock_20261202020000).
   */
  intelLedger: true,
  /**
   * Economy Integrity E1 (server file 20261202030000_intel_corrections + Edge Function economy-mail): Intel is
   * corrected only by reversing one ledger line, refunding a published bug incident, or a clawback a closed fair-play
   * case covers (plus a make-good, the same locked amount to everyone an announced outage lists); over 500 Intel or 5
   * players a correction waits 24 h; a clawback may leave a debt (below 0, paid back by what is earned next, nothing
   * spent meanwhile); 30 days to appeal a reversal or a clawback; Uniques burned only for a published incident or a
   * closed fair-play case (24 h wait, the number stays used, restored on an upheld appeal within 30 days), frozen during
   * a case; every correction e-mailed to support@ through Resend (the account's username in it); a daily digest with
   * each correction's blinded reference (HMAC of the line under the account's secret) and the monthly report on
   * /transparency. Turns on: Terms 9's Intel corrections line and the Intercepts line's take-back sentence, Privacy's
   * Intel Corrections item, the Resend item, Data Retention and After Deletion. POLICY FIRST: the day E1 is applied;
   * set its dates below. A server switch: set in LIVE, never in PRIVACY_AHEAD.
   * On 2026-10-30: E1 live since ~03:40 ET (intel_corrections_20261202030000) and economy-mail deployed.
   */
  intelCorrections: true,
  /**
   * The owner's support tools (app server 20261208350000_owner_support_tools): a ban's notice is emailed to the account's
   * address (reference, reason, how to appeal, Terms 8; Privacy's Resend item), a banned account can read it in the app with a
   * code sent there, the owner can change an account's email and tell the old address, and the fourth Intel correction:
   * one player's bug refund with no public incident (Terms 9, Privacy's Intel Corrections). The Terms' "three ways" is false
   * from the day that tool is used on a real player, so this goes up with the server. A server switch: set in LIVE.
   */
  accountNotices: true,
  /**
   * Legal audit 2026-11-03 (app repo .claude/handoff/scratchpad/nov03/legal-audit-1103.md): the text for things already live
   * on the server that the pages missed or had wrong. A trading pause by us or our email change closes the account's open
   * Black Market offers and listings (owner_support_2, 20261208640000; a correction to under 18: market_minor_close,
   * 20261208610000); sign-out, theft cases and the support record (owner_support_tools, 20261208350000); trade and market
   * pushes, push receipts and the 120-day token prune (push_audit_1102, 20261207430000); the account mail queue's 30 days;
   * Discord's extra posts (discord_wire). A server fact for every app version at once: set in LIVE, never in PRIVACY_AHEAD.
   * Describes what's in force and adds no duty for players, so no TERMS_PUBLISHED or terms_version raise. Dates: Nov 3 by
   * accountNotices in LEGAL_LAST_UPDATED and PRIVACY_LAST_UPDATED.
   */
  audit1103: true,
  /**
   * Second legal audit 2026-11-03 (app repo .claude/handoff/scratchpad/nov03/legal-audit-1103b.md): the day's server changes against the
   * pages. Text already true of live was edited in place; this switch only shows the Transparency rule change for counted games
   * (decided_t7_1103, live). A server fact: set in LIVE, never in PRIVACY_AHEAD. Describes what's in force and adds no duty, so no
   * TERMS_PUBLISHED or terms_version raise. Dates stay November 3 through accountNotices.
   */
  audit1103b: true,
  /**
   * Drawing-check wording 2026-11-04 (app repo .claude/handoff/scratchpad/nov03/drawing-check-wording.md): no page implies
   * every drawing is caught. Short notes say drawing turns "may be" checked; the check acts on what it finds; Privacy says a
   * drawing the first check flags as sexual content involving a child gets no second check and goes to a person. Describes
   * what's in force and adds no duty, so no TERMS_PUBLISHED or terms_version raise. Dates: November 4 by this switch in
   * LEGAL_LAST_UPDATED and PRIVACY_LAST_UPDATED. Name no cap, rate or threshold on a page.
   */
  drawingWording1104: true,
  /**
   * Help truth 4, 2026-11-05 (app repo .claude/handoff/scratchpad/nov03/help-truth-4.md): server facts live since Nov 4-5 that
   * the pages missed. Terms 9's Trades: what's in an open trade is held for it (trade_intel_held, live 20261104215602; items
   * were already held by _trade_copy_problem). Privacy's Reminders and Notifications: a player under 18 gets our answer about
   * a Community pack only from 7 AM to 10 PM local time, and none while we don't know their time zone (push_sendtime_1105,
   * live 20261105023708). Describes what's in force and adds no duty, so no TERMS_PUBLISHED or terms_version raise. Dates:
   * November 5 by this switch in LEGAL_LAST_UPDATED and PRIVACY_LAST_UPDATED. A server fact: set in LIVE, never in PRIVACY_AHEAD.
   */
  helpTruth1105: true,
  /**
   * Membership words, 2026-11-05 (app repo .claude/handoff/scratchpad/nov03/site-membership-1105.md, after store-text-1105):
   * the hold on friends, follows, parties, trading and social pushes for players under 18 keys on platform 'ios', so it
   * covers iPad too (_social_on, ios_minor_hold). Terms 4 and 9 and Privacy's Reminders and Notifications say "iPhone and
   * iPad". Describes what's in force and adds no duty, so no TERMS_PUBLISHED or terms_version raise. Dates: November 5 by
   * this switch in LEGAL_LAST_UPDATED and PRIVACY_LAST_UPDATED. A server fact: set in LIVE, never in PRIVACY_AHEAD.
   */
  membershipWords1105: true,
  /**
   * Beta 2's open Black Market for testers (owner `open`, Nov 3; app repo .claude/handoff/scratchpad/nov03/beta2-market-open.md
   * and site-nov12-prep.md). false: before the switch file runs. 'open': from Thu Nov 12, 2026 (set it no earlier than
   * 7 PM ET, and only once the market switch is applied on live): adult testers buy and sell for Intel for real, and every
   * sale is undone by Nov 16 (WP). 'closed': from Mon Nov 16, once the undo file and WP have run (the market is look-only
   * for testers again). The Terms' Black Market bullet names Beta 2's dates at any setting (legal-1106); 'open' turns on the help center's line that
   * testers trade there now, in place of "until then, you can look around" ('closed' brings that line back). Describes
   * what's in force and adds no duty, so no TERMS_PUBLISHED or terms_version raise. Dates: November 12 by this switch in
   * LEGAL_LAST_UPDATED (Terms, Rules, Safety); Privacy has no line about it, so PRIVACY_LAST_UPDATED doesn't move.
   * A server fact: set in LIVE, never in PRIVACY_AHEAD.
   */
  testerMarket: false as false | 'open' | 'closed',
  /**
   * Retention audit 2026-11-03 (app repo .claude/handoff/scratchpad/nov03/retention-1103.md). Off: the pages say what happens today: room exits, unblocks, the
   * coded email and sign-up records, push receipts and sent notices are cleared by a later action, not on a clock, and the note that a trade or market code
   * was sent stays with the account. On: flip the day the owner says yes and supabase/migrations_pending/20261209970000_retention_sweep_1103.sql is live (an
   * hourly job): the pages then state the plain periods. A server switch: set in LIVE, never in PRIVACY_AHEAD. Set PRIVACY_LAST_UPDATED's date that day.
   */
  retentionSweep: false,
  /**
   * Unopened Intercepts inside a friend trade. The server takes them (trade_set_intercepts), and the app offers it since
   * update 48 (November 7, 2026); Terms 9, Privacy's Intercepts item, Transparency, help and Safety say so.
   */
  interceptsInTrades: true,
  /**
   * The launch reset's Intel (WI, 20261201950000, Window W) ran: incident I-1 "Pre-launch Intercept Intel" is published
   * (its summary is the database's economy_incidents row I-1, copied in src/lib/transparency.ts). Turns on I-1 in the
   * transparency page's incidents. Set the day WI runs.
   */
  launchResetIncident: false,
  /**
   * The transparency page (/transparency): what the monthly report covers and when the first one comes, the incidents
   * published so far, the rule changes. A skeleton until the first report (owner 2026-10-30: the first one on the 1st
   * of the month after launch). Its route, footer link and sitemap entry exist only while this is on.
   */
  transparencyPage: true,
  /**
   * The AI players ("spybots", the owner's own tool: .claude/handoff/scratchpad/tools/spybots, a Node program on the
   * developer's Mac that signs in as bot accounts and plays through the normal app server). Owner rule (launch-rule.mjs):
   * a bot plays only at a table where the owner is seated (his private rooms, and Play Online tables he sits at);
   * at Play Online, anyone but the owner and the adults on friends.json makes the bots leave (the pre-launch
   * exception, PRELAUNCH_UNTIL, was removed on 2026-10-28). For a bot's move the program sends OpenAI's Responses API (store: false, no
   * safety_identifier; gpt-5.5 / gpt-5.4-mini / gpt-5.4-nano) the table's transcript as the bot's seat sees it: names as
   * the table shows them (display names in private rooms, agent names at Play Online), the questions, answers and
   * chat (the spies' chat for a spy bot), game events, Spy Sketch drawings as pictures, and the bot's own secret; no
   * user id, username, email, age or IP address. Bots show like any other seat (no label). The program keeps its own
   * logs of every game (run/spybots-*.log, run/games.jsonl: the table's lines) on the developer's computer, with no
   * deletion schedule. Turns on Privacy's "AI Players" item and the OpenAI provider line (usesOpenAi). On since
   * 2026-10-28 (the tool has played at tables with real people since Oct 21). Off only once the bots stop playing at
   * tables with anyone but our own test accounts. An owner-side fact for every app version at once: set in LIVE, never
   * in PRIVACY_AHEAD. No Terms text reads it.
   */
  spybots: true,
  /**
   * The Practice Game's AI rating (app repo feat/practice-rate-live; server 20261202022000_practice_rate +
   * 20261202022100_practice_rate_spend_watch, live 2026-11-01; the practice-rate edge function; owner 2026-10-30: "the
   * phone rates everyone; OpenAI re-rates for 16+ players who agree"). The phone rates every practice line; for a saved
   * account (never a guest) that declared 16 or older (app_config.practice_openai_min_age, counted the careful way) and
   * chose Try It on the one-time "Rate with AI?" note naming OpenAI (practice_rate_consents: the note's version and
   * when, until answered again or the account is deleted; Not Now keeps the phone's rating), our server also sends
   * OpenAI's Responses API (store: false, no safety_identifier, a fixed prompt_cache_key) the line (at most 160
   * characters), what it is (answer, question, follow-up), the practice role (Local or spy), the game's secret location
   * and the pack's location names, the app's own question or answer it replies to, and its language; never a name,
   * account, user id, age or IP address. A line our public chat filter refuses is never sent. Kept on our side: counts
   * only (rated lines per account per UTC day, deleted after 14 days; the app's daily totals with no user). On, it
   * turns on Privacy's "Practice Games" item, the OpenAI provider line, the Age item's use and How We Use's line. POLICY
   * FIRST: flip it and deploy the site the same day as app_config.practice_rate_enabled goes true, before that UPDATE,
   * and set its PRIVACY_LAST_UPDATED date (below) to that day. A server switch for every app version at once: set in
   * LIVE, never in PRIVACY_AHEAD. No Terms text reads it. If the owner changes practice_openai_min_age, change "16" in
   * the Practice Games item.
   */
  practiceAi: false,
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
   * [Oct 28, Packs Studio 20261201530000 + Post Anonymously / Show My Name 20261201680000, both live] Submit to Community
   * sends a frozen copy of the draft as a new listing (the draft stays editable; again later = "<title> v2", linked);
   * Cancel Submission deletes the copy in review. Drafts hold up to 200 entries (at most 50 drafts). The 7-day undo is
   * gone: Post Anonymously can be chosen at Submit, and the creator can switch between Anonymous and Show My Name on a
   * listing in review or live as often as they like, each switch locking the next for 24 hours; each switch is logged
   * (custom_pack_reviews: pack, account, when); the owner can put a name back any time; only account deletion is for
   * good. An anonymous pack is off the Pack Maker / Featured Creator counts and out of username search. Approve/reject
   * tells the creator in the app (custom_pack_notices) and by push. A refused Create keeps a snapshot in the log
   * (create_refused). Players of a pack's recent games can open it with its entries (_readable_pack_ids).
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
   * site, then apply the file (Window W, Mon Dec 7, 2026); set PRIVACY_LAST_UPDATED's date for it to the deploy day. A server
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
   * [Oct 28 audit] What SHIPPED in integrate/2.2 (cloud/email-code-signin, d9764beb) is NOT the email-code Edge Function
   * described above: lib/emailCode.ts uses Supabase Auth's own email OTP (signInWithOtp / verifyOtp; 6 digits, 3600 s,
   * a 60 s resend cooldown; the 5-wrong-tries limit is the app's), and there is no email_codes table. The Rate Limits
   * sentence is rewritten to that; before flipping, also check whether our own account-email records
   * (auth_attempts) see code requests at all, and every other line here, against the passwords-off dashboard step.
   */
  passwordless: false,
  /**
   * Social Phase 1 for everyone (app repo feat/social-switchon; server social files live Oct 31, 2026 for testers:
   * social graph 20261031024235, presence / invites / profile 024240, report contexts 024242, followers list 024244,
   * party 024246, Social Watch 033922, social push 053549, Following feed 055059, Report Party 062014, iOS minors' hold
   * 065014, Social Watch push 090125). Friends (two-way; paths by age band: Friend Code in person for everyone, a private
   * game in the last 24 h except adult with 13-15, a public table and @username adults with adults only), follows and
   * public profiles (adults only, with a showcase; the one-time "your profile is public" notice), the Following feed,
   * online status for friends, room and party invites, Ask to Join, parties (the leader a member; a private room plays
   * the host's packs; members-only matchmaking needs every member to be a member), party chat (the room chat's filters,
   * kept 30 days), social push notices (a switch each, the sender's display name, none 10 PM-7 AM for under-18s, deleted
   * after 7 days), Social Watch and Party Watch, Report Party, and the iOS minors' hold (social off for under-18s on the
   * iPhone app until the in-app parental consent build). Turns on: Privacy's Friends, Follows and Profiles, Party and
   * Party Chat and Social Notifications items, Presence, Safety Information, How We Use, Legitimate Interests, Data
   * Retention, Data Sharing, Children's Privacy and the deletion summary; the Terms' section 4 "Friends, follows and
   * parties", fair play in parties and section 8's Report Party. Trading is NOT in this switch (Phase 2). PUBLISH WITH
   * THE SWITCH-ON (spy-social .claude/handoff/scratchpad/oct31/SOCIAL-SWITCH-ON.md step 2.5): flip it the same hour
   * app_config.social goes 'on', and set its two dates (LEGAL_LAST_UPDATED, PRIVACY_LAST_UPDATED) to that day. A server
   * switch for every app version at once: set in LIVE, never in PRIVACY_AHEAD. BEFORE FLIPPING, check: the social log
   * (social_events) has its 1-year purge live (Data Retention says 1 year; on Oct 31 nothing deleted it), and
   * app_config.social.ios_minor_hold is still true (the iOS sentence says so).
   */
  socialFeatures: true,
  /**
   * Trading for everyone (owner 2026-11-01: app_config.trading enabled 'testers' -> 'on', so players try it before the
   * launch and store reviewers see it; server trading files live since Oct 31, 2026, with gifted items tradable after 3
   * real games, 20261204140000). Trades between friends of 3+ days (both accounts 14+ days old, email confirmed, level
   * 20); 13-17s items for items only, with Friend Code friends, 3 trades a day; Intel only adult with adult (and on the
   * beta chain only the test fleet, so for players from the 2.2 release); 7-day protection and one self-reversal per 90
   * days (all protected trades back, trading paused 30 days); an emailed code for big trades; locks after an email /
   * sign-in change, a new device, or a self-lock; Trade Watch (shadow, flags for a person). Turns on: Terms 9's
   * virtual-items line, the Intel and Intercepts lines' trading words and the "Trades" H3; Privacy's Trades item, Safety
   * Information's Trade Watch sentence, How We Use, Data Retention, Resend's trade codes and the deletion summary; the
   * UK online-safety row on fraud. A server switch for every app version at once: set in LIVE, never in PRIVACY_AHEAD.
   * Off only if app_config.trading goes back to 'testers' (the old text: nothing can be traded).
   */
  trading: true,
  /**
   * The Black Market (app repo feat/black-market-server, server file 20261205100000_black_market, live as
   * 20261101121549; app_config.market 'on' Nov 1, 2026; the Vault's fourth tab). Two markets, Intel only (earned, never
   * money): Items, an order book for tradable plain collectibles (buy and sell offers, price-time matching, partial
   * fills, a 2% fee burned, max 5,000 a copy), and Rare Finds, each Unique copy listed on its own (price, optional
   * offers, 3-day protection with reversal). Adults only, the trading gates (level 20, email confirmed, account 14 days
   * old, no trade lock), an emailed code for big actions; on the beta chain only the test fleet and admins move Intel,
   * so players can look until the 2.2 release. Other players see only anonymous prices, quantities, times and a Unique's
   * number and colour, never who. Kept: offers, listings, offers on listings, fills and sales, escrow lines on the Intel
   * ledger, market events; on deletion the account is taken out (ON DELETE SET NULL), codes deleted. Market Watch
   * (Integrity family E, shadow): linked-account fills (same phone or sign-up network), round trips, far-from-guide
   * prices, spoofing, concentration. Turns on: Privacy's Black Market item, the Intel item's spending line, the
   * Intercepts item's "who sees" line, Safety Information's Market Watch sentence, How We Use, Data Retention, Resend's
   * market codes, Data Sharing's market line, the deletion list; Terms 9's virtual-items line and Intel line and the
   * "Black Market" H3. A server switch for every app version at once: set in LIVE, never in PRIVACY_AHEAD. Not a
   * material change (an opt-in feature under the existing virtual-items, trading and fair-play rules; no terms_version).
   */
  blackMarket: true,
  /**
   * Social spam limits (app repo fix/friends-owner-1101, server file 20261204150000_social_follow_fixes, STAGED, not
   * applied yet; owner 2026-11-01: generous limits, stop only rapid-fire spam): a slow-down after 10 follows, unfollows
   * or friend requests in 10 seconds or 4 follow changes toward one player in a minute (read from the social safety
   * log's times, nothing new kept), and a shadow count of daily-limit hits (follows 200 a day, friend requests 200 a
   * day): the account, which limit, the UTC day and how many times, for the team to spot spam, deleted after 90 days
   * (daily pg_cron) and with the account. Turns on: Privacy's Rate Limits sentence and Data Retention's line. Flip to
   * true when the server file is applied live (and set PRIVACY_LAST_UPDATED's date for it to that day). A server
   * fact for every app version at once: set in LIVE, never in PRIVACY_AHEAD. Not a material change.
   */
  socialLimits: true,
  /**
   * Gifted copies tradable now (owner 2026-11-01; app server 20261101213455_market_rules_1101 + 1101b, live; switch
   * app_config.economy.gift_copies_tradable true): copies we give (owner gifts) and the code / Beta copies that were
   * waiting for 3 real games are tradable at once, each flip written to the public ledger with its evidence; while
   * the switch is on, new ones mint tradable. Switching it off binds FUTURE copies only (a flipped or traded copy is
   * never bound again). Turns on: Terms 9 Trades' tradable-items line. Off again (the old 3-real-games line) when the
   * owner turns economy.gift_copies_tradable off before the launch (planned, with a gift icon in the app); set
   * LEGAL_LAST_UPDATED's entry to that day. A server switch for every app version at once: set in LIVE.
   */
  giftsTradable: true,
  /**
   * The party's size in the Terms and the Privacy Policy, corrected (November 3, 2026): they said a leader and up to 3
   * friends; the app server's rule is up to 21 people in all (live app_config.party.max_size 21, checked that day), the
   * leader a member, at most half a table at Play Online and Game Night (2 at 4, 4 at 8; party_search), bigger parties
   * in a private room, as the help center's #parties says. Not a material change (it describes a limit already in force
   * and adds no duty or penalty): LEGAL_LAST_UPDATED and PRIVACY_LAST_UPDATED move (below), no TERMS_PUBLISHED or
   * terms_version. Only those dates read it; the corrected text is unconditional.
   */
  partySizeCorrected: true,
  /**
   * Trading's gates (owner 2026-11-02, live on the app server: app_config.trading.min_friend_days 0 and
   * 20261102002603_trade_games_not_level): friends can trade right away (no 3 days as friends; the 7-day protection and
   * reversal stay; under-18s still only with Friend Code friends), an account 7 days old (was 14), 3 counted games
   * (player_stats.games_eligible: finished games that count toward stats and that the fair-play checks don't flag) in
   * place of level 20; email confirmed, trade locks and the new-device wait unchanged. Turns on: Terms 9 Trades' who-
   * can-trade line and the Black Market's, Privacy's Trades item (counted games and account age decide), and the
   * Transparency Report's November 2 rule changes; LEGAL_LAST_UPDATED / PRIVACY_LAST_UPDATED November 2, 2026. A
   * server switch for every app version at once: set in LIVE, never in PRIVACY_AHEAD. Off only if those values go back.
   */
  tradeGatesNov2: true,
  /**
   * No trade volume limits (owner 2026-11-02 ~04:30 UTC: "we target bots and cheaters, never make the game worse for
   * real players"; live on the app server: app_config.trading daily_trades, daily_trades_minor, weekly_copies_in and
   * intel_weekly_in effectively unlimited, and 0 means no limit from 20261207640000): nobody, adult or under 18, has a
   * daily or weekly limit on trades or on the items and Intel they receive. Under-18s keep their rules that aren't
   * volume limits: items for items only, only with friends added in person by Friend Code, no gifts, no Intel, never
   * unopened Intercepts. Per-trade size (10 items a side) and the emailed code for big trades stay. Turns on: Terms 9
   * Trades (the 3-a-day line and the weekly-limits line go), Child Safety's and the parents' page trading line, the
   * Transparency Report's November 2 rule changes. A server switch for every app version at once: set in LIVE.
   */
  tradeNoLimits: true,
  /**
   * Same-device checks on the app server (owner 2026-11-02; 20261207670000 same_device_now, 20261207690000
   * counted_games_device, 20261207695000 device_records_prune): the coded install code of the device each sign-in
   * session is on, each Play Online search was made from and each game was played from, so two accounts on one device
   * at the same moment aren't seated at one Play Online table or put in one party, and counted games for trading are
   * played by different people. Kept 90 days (daily cleanup), deleted with the account. Turns on: Privacy's Trades item
   * and Device Information, and the retention line; PRIVACY_LAST_UPDATED stays November 2, 2026. A server switch: set
   * in LIVE, never in PRIVACY_AHEAD.
   */
  gameDeviceChecks: true,
  /**
   * Volunteer moderators' room and pack actions (live functions mod_watch_table, mod_table_help, mod_end_game,
   * mod_end_night, mod_remove_message, mod_review_pack; each behind the moderator's own permission and the owner's
   * moderator_settings): a moderator with the permission may watch a Game Night table, help at it, end a Game Night
   * game or the night (with a written note), remove a reported message, and approve or reject Community Packs in the
   * review queue. Turns on: Terms 8's Community moderators paragraph and Privacy's community-moderator sentence. A
   * server fact: set in LIVE.
   */
  moderatorRoomActions: true,
  /**
   * Public live stats (app repo feat/public-stats, 20261101124400_public_stats + Edge Function public-stats v1, live
   * Nov 1, 2026): aggregate counts only (online now, games in progress by mode, games ended today / this week, saved
   * accounts rounded down to 10; any count under 5 reads "<5"), for the website and the Discord stats channels.
   * Turns on: Privacy's Information Sharing line on published totals. A server fact: set in LIVE.
   */
  publicStats: true,
  /**
   * Unopened Intercepts tradable and listable (app repo feat/intercepts-market, IN PROGRESS, no server file yet).
   * When it ships: adults (the trading gates) can trade an unopened Intercept with a friend and buy or sell one on the
   * Black Market for Intel; players 13-17 never (items for items only, and no Black Market). It changes Terms 9's
   * "You can't buy an Intercept ... with Intel" and "can't be ... traded ... unopened" lines, Privacy's Intercepts
   * item and the parents' Safety line, and the store listing must keep "never sold for money". BEFORE FLIPPING,
   * check against the shipped server: an Intercept received in a trade or a market sale can't be opened while
   * protected (or a reversal takes the opened copies back); gifted and code Intercepts keep the gift switch's and the
   * 3-games rule's status; no Intercept given with a purchase is ever tradable (Terms: purchase-linked codes give
   * none). Set LEGAL_LAST_UPDATED's and PRIVACY_LAST_UPDATED's entries to the day. Records v2.2 G35 (re-read fraud and
   * gambling first). A server switch for every app version at once: set in LIVE, never in PRIVACY_AHEAD.
   * ON November 2, 2026 (legal audit 1102): the server went live 2026-11-01 23:33 UTC (20261101233357_intercepts_market,
   * app_config.economy.intercepts_tradable unset = on; the update-22 app lists unopened Intercepts on the Black Market;
   * no app offers them in a friend trade yet). Checked: open_crate refuses in_market / in_trade / protected; a traded
   * one is sealed for the protection; deletion returns protected ones (20261102011736); bound (gift/code) ones never
   * move. Known server gap (reported, not in the text): trade_set_intercepts doesn't refuse a trade with a minor,
   * so the "never unopened Intercepts" rule for 13-17 is held by the app only until the server fix.
   */
  interceptsMarket: true,
  /**
   * Home's Discord pill (app repo feat/home-discord, update 23+, server 20261207900000_home_discord, applied after the
   * OTA): a link out to the official Discord invite; get_home_discord answers per caller: under 16 or no birth year,
   * never; 16-17 a one-time safety note first (none on iOS while social.ios_minor_hold); adults. The text says "can
   * show", so it is true before the server file is applied. Turns on: the parents' Safety line, Child Safety's line,
   * Privacy's Links to Other Services and the Terms' Other services example. Off only if the pill is dropped.
   */
  homeDiscord: true,
  /**
   * Data rights on the server (app server 20261102112834_data_rights_20261207881000, live 2026-11-02 11:28 UTC): the
   * privacy-request log kept 24 months after each answer (data_rights_requests, cron data-rights-prune), the JSON copy
   * of an account's data (_data_export), the birth-year correction (_correct_birth_year) and the fair-play score
   * deleted with the account (zz_profiles_integrity_gone). Turns on Privacy's Your Rights detail and record line and
   * the Data Retention lines. A server fact for every app version at once: set in LIVE, never in PRIVACY_AHEAD.
   */
  dataRights: true,
  /**
   * Fair-play notes of requests the app never makes (app server 20261102132446_integrity_rings_probes_20261207910000,
   * live 2026-11-02 13:24 UTC): which account, what kind of request, the UTC day and how many, kept 90 days and deleted
   * with the account (integrity_probe_hits). Turns on one sentence in Privacy's Safety Information (fair play) and one
   * in Data Retention. Never name the requests anywhere public. A server fact for every app version at once: set in
   * LIVE, never in PRIVACY_AHEAD.
   */
  integrityProbes: true,
  /**
   * Child-safety holds (child-safety audit 2026-11-03; app server 20261208340000_child_safety_holds): a flagged message and
   * the chat before it are copied with the flag and kept with its case; party chat is flagged as room chat is; sexual
   * talk is refused in a room or party with a player under 18 and at public tables, and an adult's refused line there is
   * flagged with its words; deleting an account that is part of a child-safety case first keeps a restricted copy of its
   * details and messages for 1 year, with its sealed IP addresses. Turns on Privacy's lines and a bullet in Child Safety's
   * chat filter. POLICY WITH CAPTURE: the site goes up with it just before the server file is applied. A server fact for
   * every app version at once: set in LIVE, never in PRIVACY_AHEAD. Never publish the phrases the check reads.
   */
  childSafetyHolds: true,
  /**
   * The owner's child-safety answers of 2026-11-06 (app repo nov03/safety-answers-1106; server 20261212150000_safety_answers_1106):
   * personal info (a home address, where someone lives, their school, their real name) is refused like contact details, at
   * public tables for everyone and in any room or party with a player under 18 or without a birth year; reports of a minor
   * sharing personal info go to the developer only, never to community moderators; Translations' Not Now line says "never
   * sent to OpenAI to be translated"; and the chat safety check (the minor reader, 20261211400000, built and OFF until the
   * owner's OpenAI key): what adults write beside a player who said they're under 18 MAY be read after it's sent by OpenAI's
   * models, and flagged for a person, never blocked (worded "may" so it is true while the reader is off and when it is on).
   * POLICY FIRST: the site goes up with it just before the server file is applied. A server fact for every app version at
   * once: set in LIVE, never in PRIVACY_AHEAD. Never publish the phrases the filter or the reader read.
   */
  safetyAnswers1106: true,
  /**
   * mod-translate-1106: the Mod Console translates what a moderator may already read of a report or a pack in review, beside
   * the original: the game's translation when there is one; otherwise OpenAI under chat's rule (16+ and the author's own
   * yes), a pack's text as Custom Packs already says; everything else only on the moderator's own device, or not at all.
   * Kept for 30 days (app server 20261216100000, pg_cron mod-translate-prune), never shown to a player.
   * POLICY FIRST: the site goes up with it before the server file. A server fact for every app version: set in LIVE.
   */
  modTranslate1106: true,
  /**
   * The launch version of the public site (2.2 out on both stores; flip Tuesday, December 8, 2026, 10 AM ET; steps in
   * the app repo's .claude/handoff/scratchpad/nov02/website-launch.md). On: the hero says 2.2 is out, the home page's
   * New in 2.2 section (the store screenshots in the page's language, Spy Sketch, Play Online, Game Night, the Black
   * Market and membership) and its Discord + press/creator strip, What's New's 2.2.0 entry, the Roadmap's 2.2 stage
   * reads "Out now", the Contact page's press line, /beta goes to the home page (and leaves the sitemap and search),
   * and the build gives every page the launch link-preview card (public/images/og-launch.jpg, large) and the app's
   * structured data (vite.config.ts reads this switch). The browser link stays on LIVE.browserLinks (play.spysocial.app
   * is invite-only while the server's web_beta gate is on). It also turns on ONLINE_SAFETY_TEXT (below LEGAL_LAST_UPDATED:
   * the Safety page, its links and the Terms' and Rules' UK online safety text), which the launch publishes with the Terms
   * again (LEGAL_LAST_UPDATED and TERMS_PUBLISHED set to the launch day, top of this file). Help's odds line and the
   * Terms' and Game Night rules' odds sentence say "open or buy" with it (the offer sheet's odds, Nov 10 store build).
   * A website fact: set in LIVE, never in PRIVACY_AHEAD.
   */
  launchSite: false,
  /**
   * The launch reminder form on /hello (RPC launch_reminder_signup, owner Nov 7): Privacy's Launch Reminder section, Resend's item, a Data
   * Retention sentence and Consent. Stays on until the launch email is sent and the addresses are deleted; then off with its own Last Updated.
   */
  launchReminder: true,
  /** site-full-1106: Terms 9 and help say the Dec 7 rule for what comes from a code or a gift, Privacy's market lines follow Nov 6's locks: Last Updated November 7. Text already in force or dated; no TERMS_PUBLISHED or terms_version raise (the launch republishes). */
  siteFull1107: true,
  /** delete-account-1108 (account-flows-1108): /delete-account's steps as the app does them (Send Code, then the 6-digit code; a guest's row is Delete Account, Sign Out in earlier versions) and "within one month" as Privacy says. That page's Last Updated (PRIVACY_LAST_UPDATED) November 8; no Privacy text changed. */
  deleteSteps1108: true,
  /**
   * store-privacy-1108 (app repo nov03/store-privacy-1108.md), two facts already live, read from the code:
   *   - dictation: in every game composer (chat, Questions, the out players' chat) the app asks the phone's speech
   *     recognizer to listen for the players' names at the table and the agent colors (lib/dictationHints.ts
   *     dictationPhrases via components/game/useSpeechToText.ts recognizerOptions: contextualStrings on iOS,
   *     EXTRA_BIASING_STRINGS on Android 13+; live since 2026-10-17/26), so Apple or Google can receive those names
   *     with the recording. The old text said iPhone only, questions and answers only;
   *   - the IP Address item now says our host's request logs keep IP addresses for a short time (Supabase, our plan's
   *     log retention, at most 7 days), which the Launch Reminder paragraph already points to.
   * Privacy's Last Updated November 8, 2026. Not a material change.
   */
  storePrivacy1108: true,
  /**
   * srv-security-1108 (app repo nov03/srv-security-1108.md, server file 20261220400000_reminder_network_cap; owner "reminder
   * cap", Nov 8): the reminder form takes at most 300 sign-ups an hour from one network. Privacy's Launch Reminder paragraph
   * says what that keeps: a one-way code of the network (the IP address, or for IPv6 its first half) made with a secret key,
   * counted per hour and deleted after about two hours, never the address itself and never with an email address. Push the
   * site the same day the server file is applied (never before), with PRIVACY_LAST_UPDATED's entry below set to that day.
   * Off only if that file is rolled back.
   */
  reminderNetworkCap1108: true,
  /**
   * policy-1108: the drawing check's AGREE kept on the server (app server 20261219200000_sketch_consent, table
   * drawing_check_consents: account, the note's version, when; deleted with the account; NOT NOW writes nothing), sent by
   * the app (fix/sketch-consent-app-1108, own-tap in u53) only for the account that tapped AGREE (coordinator 2026-11-08);
   * the matchers can seat only agreed players at public Spy Sketch tables (app_config.sketch_consent_required), and a party's
   * leader is told which member hasn't agreed. Turns on a passage in Privacy's Drawing Checks item and a Data Retention
   * sentence. POLICY FIRST: flip it, and set SKETCH_CONSENT_RECORD_DAY (below) to the deploy day, when the server file is
   * applied live (before any app can write a row). A server fact for every app version at once: set in LIVE, never in
   * PRIVACY_AHEAD. Name no rate limit on a page.
   * ON since 2026-11-09: server 20261109065729_sketch_consent_20261219200000 applied live Nov 9 01:57 ET (srv-apply-1109);
   * the switch itself (app_config.sketch_consent_required) stays off until the owner turns it on. Off only if that file is
   * rolled back.
   */
  sketchConsentRecord: true,
  /**
   * privacy-reports-1109 (app repo nov03/practice-log-1109.md, update 57; server file 20261224610000_problem_reports):
   * the device keeps the last three practice games; Report a Problem sends the last one to our servers (table
   * problem_reports: account, transcript, version/phone/language line; deleted after 90 days and with the account) only
   * when the player leaves "Include my last Practice game" ticked (unticked by default for under-18s and unknown ages). Turns on a passage
   * in Privacy's Practice Games item (shown even while practiceAi is off), the ImprovMX and Google exception, a Data
   * Retention sentence and a deletedSummary line. POLICY FIRST: on from 2026-11-10, before update 57 and the server file.
   * A fact for every app version at once: set in LIVE, never in PRIVACY_AHEAD. Off only if the feature is removed.
   */
  practiceReportLog: true,
  /**
   * rarefinds-page-1110 (app repo nov03/rarefinds-page-1110.md; server file 20261225300000_mint_unique_public and the
   * ledger function's ops uniques / unique): the Archive (/archive, /archive/uniques, /archive/u/<item>/<serial>; the
   * app's "View in the Archive" and archive.spysocial.app land there). Turns on its routes (with mintedCollectibles)
   * and a passage in Privacy's "Collectibles and the public ledger": each Unique's page shows its Black Market sales'
   * dates and prices in Intel, its holders only as numbers. Push the site with it on only after the server file is
   * applied and the ledger function redeployed, and set its PRIVACY_LAST_UPDATED day (below) to that day.
   */
  uniqueArchive: true,
  /**
   * export-reports-1110 (app repo nov03/export-reports-1110.md; server file 20261226710000_data_export_testers): the
   * data export (Your Rights, "A copy of your data") names the problem reports a player sent (with any practice game
   * included; problem_reports was already in it since 20261224610000) and their entry on a beta tester list (beta_testers,
   * linked or matched by the account's email), and says it leaves out the coded copies (sha256) of the emails a tester
   * gave us. Push the site with it on only after the server file is applied, and set EXPORT_TESTERS_DAY (below) to the
   * push day. A server fact for every app version at once: set in LIVE, never in PRIVACY_AHEAD.
   */
  exportTesters: true,
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
 * LIVE), spybots (the developer's AI players, an owner-side fact: set in LIVE), gameNightRules (the Game Night rules
 * page and the Terms' pointer to it, no Privacy text),
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

/** The day SpySocial LLC took over SpySocial (LIVE.llcOperator), or null while Aleksandr Gerzon runs it himself. */
export const LLC_SINCE: string | null = typeof LIVE.llcOperator === 'string' ? LIVE.llcOperator : null

/** Said on the Terms and the Privacy Policy between the flip and the day both store accounts show the LLC. */
export const LLC_STORE_NOTE: string | null =
  LLC_SINCE && !LIVE.llcStoresMoved
    ? "Until Apple and Google finish moving our store accounts to the company, the App Store and Google Play may still show Aleksandr Gerzon as the seller or developer. It's the same SpySocial, and purchases and refunds work as before."
    : null

/** The later of the flip day and a page's own date, so a legal change after the flip still moves "Last Updated". */
const sinceLlc = (day: string): string =>
  LLC_SINCE && Date.parse(LLC_SINCE) > Date.parse(day) ? LLC_SINCE : day

/**
 * Who runs SpySocial: the legal name and a postal address, shown on the
 * Privacy Policy (the data controller) and the Terms (the contracting party,
 * Apple's minimum end-user terms). `name` is the short form used in sentences,
 * `legalName` the first mention ("SpySocial LLC, a Pennsylvania limited
 * liability company"), `person` the individual the law or a store wants named
 * (the DMCA designated agent, the child safety point of contact, the UK online
 * safety accountable person), `isCompany` picks "which" over "who".
 */
export const OPERATOR: {
  name: string | null
  legalName: string | null
  address: string | null
  phone: string
  person: string
  isCompany: boolean
} = {
  name: LLC_SINCE ? 'SpySocial LLC' : 'Aleksandr Gerzon',
  legalName: LLC_SINCE ? 'SpySocial LLC, a Pennsylvania limited liability company' : 'Aleksandr Gerzon',
  address: '55 Ash Gap Road, Clifton Township, PA 18424-7702, United States',
  phone: '(570) 445-3516',
  person: 'Aleksandr Gerzon',
  isCompany: LLC_SINCE !== null,
}

/**
 * "Last Updated" on the Terms, the Community Rules and the Safety page, and (through PRIVACY_LAST_UPDATED) on the
 * Privacy Policy and Delete Account: the day a change is published. Like PRIVACY_LAST_UPDATED below, a switch prepared
 * before its feature goes live carries its date here (newest first), so its one-line flip in LIVE moves the date too;
 * set each date to its deploy day when flipping. The first switch that's on wins, so a later change that isn't one of
 * these switches (the 2.2 launch's, for one) must fold the chain back to a plain string first, then set it.
 */
/**
 * The day unopened Intercepts in friend trades go up (LIVE.interceptsInTrades; app branch fix/intercept-trades-1106): Terms' and
 * Privacy's Last Updated and Transparency's list. Update 48 offered it on November 7, 2026, and the site went up that day.
 */
export const INTERCEPTS_IN_TRADES_DAY = 'November 7, 2026'

/** LIVE.exportTesters's day in PRIVACY_LAST_UPDATED: the day the site goes up with it on (after 20261226710000 is live). Never earlier than November 10, 2026 (Last Updated never moves back). */
export const EXPORT_TESTERS_DAY = 'November 10, 2026'

/** LIVE.sketchConsentRecord's day in PRIVACY_LAST_UPDATED: the day the site went up with it on (server 20261109065729 = Nov 9 01:57 ET). */
export const SKETCH_CONSENT_RECORD_DAY = 'November 9, 2026'

export const LEGAL_LAST_UPDATED: string = sinceLlc(
  LIVE.tournaments
  ? 'December 4, 2026' // tournaments' Terms section: set to the day the site goes up with it on
  : LIVE.testerMarket
    ? 'November 12, 2026' // Terms 9's Black Market bullet: "except during testing" (Beta 2's open market): the site goes up with it on Nov 12
  : LIVE.interceptsInTrades
    ? INTERCEPTS_IN_TRADES_DAY // Terms 9: adults trade unopened Intercepts with friends (the app update that offers it)
  : LIVE.siteFull1107
    ? 'November 7, 2026' // site-full-1106: the site went up with it on
  : LIVE.safetyAnswers1106
    ? 'November 6, 2026' // the owner's child-safety answers (Child Safety: personal info refused with a minor, the chat safety check): the site went up with it on
  : LIVE.membershipWords1105
    ? 'November 5, 2026' // membership words (Terms 4 and 9: the under-18 hold is on iPhone and iPad): the site went up with it on
  : LIVE.helpTruth1105
    ? 'November 5, 2026' // help truth 4 (Terms 9: what's in an open trade is held; Community Rules: Game Nights, not events): the site went up with it on
  : LIVE.drawingWording1104
    ? 'November 4, 2026' // drawing-check wording (no page implies every drawing is caught): the site went up with it on
  : LIVE.accountNotices
    ? 'November 3, 2026' // the owner's support tools (20261208350000): set to the day the site goes up with it on
  : LIVE.partySizeCorrected
    ? 'November 3, 2026' // Terms 4: a party's size corrected to the live rule (up to 21 people, half a table, bigger parties in a private room): the site went up with it on
  : LIVE.membershipTerms
    ? 'November 2, 2026' // Terms 9: Buying a membership shown before the launch (B4): the site went up with it on
  : LIVE.tradeNoLimits
    ? 'November 2, 2026' // Terms 9: no daily or weekly trade limits for anyone (owner 2026-11-02): the site went up with it on
  : LIVE.tradeGatesNov2
    ? 'November 2, 2026' // Terms 9: friends trade right away, a 7-day-old account and 3 counted games (no level): the site went up with it on
  : LIVE.interceptsMarket
    ? 'November 2, 2026' // Terms 9: unopened Intercepts tradable and on the Black Market (feat/intercepts-market): set to the day the site goes up with it on
  : LIVE.mintedCollectibles
    ? 'November 1, 2026' // minted collectibles (Terms 9), the beta test chain live since Oct 31: the site went up with it on
  : LIVE.ranked
    ? 'December 4, 2026' // ranked's Terms paragraph: set to the day the site goes up with it on
    : LIVE.passwordless
    ? 'December 7, 2026' // sign-in codes instead of passwords (Terms 2): set to the day the site goes up with it on
    : LIVE.membershipsOnly && LIVE.purchases
      ? 'December 7, 2026' // memberships only (Terms 3, 9; Safety; membershipsOnly on since October 30, 2026), visible once LIVE.purchases is on: set to the day purchases goes on
      : LIVE.blackMarket
      ? 'November 1, 2026' // Terms 9: the Black Market H3, the virtual-items and Intel lines (20261205100000): the site went up with it on
      : LIVE.messagesOnDeviceOnly && LIVE.microsoftOff
      ? 'November 1, 2026' // Terms 10: translation v3's bridge drop, messages sent to OpenAI only (Microsoft translates nothing): set to the day the site goes up with it on
      : LIVE.trading
      ? 'November 1, 2026' // Terms 9: trading between friends (Trades H3, the virtual-items line): the site went up with it on (trading switch-on day)
      : LIVE.usernameLimit
      ? 'October 31, 2026' // Terms' Rules for accounts: one username change every 30 days, an old name reserved 14 days (20261204120000): the site went up with it on
      : LIVE.socialFeatures
      ? 'October 31, 2026' // Terms 4's Friends, follows and parties, fair play in parties, section 8's Report Party: the site went up with it on (social switch-on day)
      : LIVE.volunteerModerators
      ? 'October 31, 2026' // Terms 8: volunteer community moderators (20261202460000): the site went up with it on
      : LIVE.membershipCodes
      ? 'October 31, 2026' // Terms 3: memberships given with a code (20261203440000): set to the day the site goes up with it on
      : LIVE.rmtGambling
      ? 'October 31, 2026' // Terms 9: no real-money trading, no gambling: set to the day the site goes up with it on
      : LIVE.uniquesRarer
      ? 'October 31, 2026' // Terms 9: 10 spare Legendaries for a Unique (app server 20261202450000_unique_rarity): set to the day the site goes up with it on
      : LIVE.intelCorrections
      ? 'October 30, 2026' // Terms 9's Intel corrections and the Intercepts take-back line (E1), and Terms 9's no-Intel-by-hand line and the reset's Intel (E0, WI): the site went up with both on
      : LIVE.intelLedger
      ? 'October 30, 2026' // Terms 9: no Intel by hand, the ledger kept whole, the launch reset's Intel (E0, WI): set to the day the site goes up with it on
      : 'October 28, 2026' // Intercepts on (Terms 9; Safety; Game Night rules) and Terms 6's Post Anonymously / Show My Name (20261201680000) and Packs Studio wording; the Community Rules' swearing line (section 5: fine in private packs, censored in Community, 20261201790000), Terms 6's reviewer edits to a Community submission (a mild swear hidden, an entry taken out, the theme changed; told to the creator; 20261201860000); before it, October 27, 2026 (Custom, Community and featured Packs), October 25 (section 5: no votes at Play Online tables), October 24 (QA 110)
)

/**
 * "Last Updated" on the Privacy Policy and Delete Account, which can run ahead of the Terms (PRIVACY_AHEAD): the
 * day the ahead text goes up. Back to LEGAL_LAST_UPDATED at the launch. A switch prepared before its server side
 * goes live can carry its date here (LIVE.<switch> ? its day : the current date), so the one-line flip in LIVE moves
 * the date too; once the switch is on for good, fold this back to a plain string.
 */
export const PRIVACY_LAST_UPDATED: string = sinceLlc(
  LIVE.tournaments
  ? 'December 4, 2026' // the Tournaments item: set to the day the site goes up with it on
  : LIVE.exportTesters
    ? EXPORT_TESTERS_DAY // Your Rights' data export: problem reports and the beta tester list in, testers' email hashes out (export-reports-1110)
  : LIVE.uniqueArchive
    ? 'November 10, 2026' // the Archive: each Unique's sales and prices on its own page (rarefinds-page-1110). The site went up with it on Nov 9, 2026 (srv-apply-1110a: server 20261109195256, ledger v5), but the page already said November 10 (practiceReportLog, eadaffb) and Last Updated never moves back, so it stays November 10
  : LIVE.practiceReportLog
    ? 'November 10, 2026' // Practice Games: the last practice game sent with Report a Problem when left ticked (privacy-reports-1109)
  : LIVE.sketchConsentRecord
    ? SKETCH_CONSENT_RECORD_DAY // Drawing Checks: the AGREE kept with the account (policy-1108): the day the site goes up with it on
  : LIVE.reminderNetworkCap1108
    ? 'November 8, 2026' // the reminder form's per-network count (srv-security-1108): the site went up with it on (server 20261109023637 = Nov 8 21:36 ET)
  : LIVE.storePrivacy1108
    ? 'November 8, 2026' // store-privacy-1108: dictation's listen-for words, the host's request logs (IP Address): the site went up with it on
  : LIVE.deleteSteps1108
    ? 'November 8, 2026' // Delete Account's steps and "within one month" (delete-account-1108): the site went up with it on
  : LIVE.interceptsInTrades
    ? INTERCEPTS_IN_TRADES_DAY // the Intercepts item: an unopened one offered in a trade (the app update that offers it)
  : LIVE.launchReminder
    ? 'November 7, 2026' // Launch Reminder, the form on /hello: set to the day the site goes up with it on
  : LIVE.siteFull1107
    ? 'November 7, 2026' // site-full-1106: the site went up with it on
  : LIVE.safetyAnswers1106
    ? 'November 6, 2026' // the owner's child-safety answers: personal info refused with a minor, Chat Safety Checks, "never sent to OpenAI to be translated": the site went up with it on
  : LIVE.membershipWords1105
    ? 'November 5, 2026' // membership words (Reminders and Notifications: the under-18 hold is on iPhone and iPad): the site went up with it on
  : LIVE.helpTruth1105
    ? 'November 5, 2026' // help truth 4 (a minor's Community pack answer waits for 7 AM; Spy Talk's Questions; Game Nights, not events): the site went up with it on
  : LIVE.drawingWording1104
    ? 'November 4, 2026' // drawing-check wording (no page implies every drawing is caught): the site went up with it on
  : LIVE.accountNotices
    ? 'November 3, 2026' // the owner's support tools (20261208350000): set to the day the site goes up with it on
  : LIVE.partySizeCorrected
    ? 'November 3, 2026' // the Party and Party Chat item: a party's size corrected to the live rule (up to 21 people): the site went up with it on
  : LIVE.childSafetyHolds
    ? 'November 3, 2026' // child-safety holds: flagged lines kept with the case, party chat flagged, the hold on deletion
  : LIVE.integrityProbes
    ? 'November 2, 2026' // fair play: notes of requests the app never makes (90 days): the site went up with it on
  : LIVE.dataRights
    ? 'November 2, 2026' // Your Rights (how each right is met, the request record), California (no selling or sharing), Children's Privacy (parents' requests), fair-play retention: the site went up with it on
  : LIVE.gameDeviceChecks
    ? 'November 2, 2026' // the Trades item and Device Information: the device each game is played from, 90 days: the site went up with it on
  : LIVE.tradeGatesNov2
    ? 'November 2, 2026' // the Trades item: counted games and the account's age decide who can trade: the site went up with it on; also If SpySocial Changes Hands (business transfers), added November 2, 2026
  : LIVE.interceptsMarket
    ? 'November 2, 2026' // the Intercepts item: unopened Intercepts traded and sold for Intel (feat/intercepts-market): set to the day the site goes up with it on
  : LIVE.mintedCollectibles
    ? 'November 1, 2026' // the Collectibles item (beta test chain live since Oct 31): the site went up with it on
  : LIVE.ranked
    ? 'December 4, 2026' // the Ranked item: set to the day the site goes up with it on
    : creatorShortLive(LIVE)
      ? 'November 20, 2026' // the YouTube item (the home page's creator Short): set to the day the site goes up with it on
    : LIVE.passwordless
    ? 'December 7, 2026' // sign-in codes instead of passwords: set to the day the site goes up with it on
    : LIVE.banTombstone
    ? 'December 7, 2026' // sanction records kept after a deletion (ban tombstone): set to the day the site goes up with it on
    : LIVE.blackMarket
    ? 'November 1, 2026' // the Black Market item, Market Watch, market codes by Resend, the Intel and Intercepts lines (20261205100000): the site went up with it on
    : LIVE.practiceAi
    ? 'November 1, 2026' // the Practice Games item (OpenAI rates practice lines for 16+ who agreed): set to the day the site goes up with it on
    : LIVE.moneyChatSignals
    ? 'November 1, 2026' // Chat Messages: the record of a refused real-money offer (Integrity F3, 20261204160000): set to the day the site goes up with it on
    : LIVE.messagesOnDeviceOnly && LIVE.microsoftOff
    ? 'November 1, 2026' // Translation v3's bridge drop: Microsoft translates nothing (its provider item and the packs' fallback gone): set to the day the site goes up with it on
    : LIVE.messagesOnDeviceOnly
    ? 'November 1, 2026' // Translation v3: Microsoft off for messages (under-16, undeclared and not-agreed lines only on the readers' devices): set to the day the site goes up with it on
    : LIVE.translateSendTime
    ? 'November 1, 2026' // Translation v3: messages translated by OpenAI when they're sent: set to the day the site goes up with it on
    : LIVE.socialLimits
    ? 'November 1, 2026' // social spam limits' count of daily-limit hits (20261204150000): set to the day the site goes up with it on
    : LIVE.trading
    ? 'November 1, 2026' // the Trades item, Trade Watch, device codes, trade codes by Resend: the site went up with it on (trading switch-on day)
    : LIVE.usernameLimit
    ? 'October 31, 2026' // Account Information: past usernames and when they changed, for the 30-day limit (20261204120000): the site went up with it on
    : LIVE.socialFeatures
    ? 'October 31, 2026' // friends, follows, profiles, party and party chat, social notifications, Social Watch: the site went up with it on (social switch-on day)
    : LIVE.volunteerModerators
    ? 'October 31, 2026' // Data Sharing: volunteer moderators, what they see, their confidentiality agreement (20261202460000): the site went up with it on
    : LIVE.integritySignupNetwork
    ? 'October 31, 2026' // the sign-up network code and network blocks (Integrity): set to the day the site goes up with it on
    : LIVE.ipVault
    ? 'October 31, 2026' // IP Address: sign-up and sign-in IP addresses kept encrypted (IP vault): the site went up with it on
    : LIVE.membershipCodes
    ? 'October 31, 2026' // Creator and Reward Codes: membership among a code's rewards (20261203440000): set to the day the site goes up with it on
    : LIVE.playtestPayPal
    ? 'October 31, 2026' // Test Versions: the paid playtest's sign-up form and its PayPal email (deleted once paid): the site went up with it on
    : LIVE.membershipsOnly
      ? 'October 30, 2026' // Purchases and the deletion summary: memberships only (Privacy shows purchases ahead): the site went up with it on
      : LIVE.intelCorrections
      ? 'October 30, 2026' // Intel Corrections, Resend's copies to support@, the public digest (E1), and the Intel ledger kept for good without the account (E0): the site went up with both on; the same day, Usage Data's Beta Pin dates moved with the launch (December 8, 2026; accounts created before December 7, 2026)
      : LIVE.intelLedger
      ? 'October 30, 2026' // the Intel ledger kept for good without the account, its client part 2 years (E0): set to the day the site goes up with it on
      : 'October 28, 2026' // the Intercepts item, AI Players (spybots), Test Versions, the packs' Post Anonymously / Show My Name and Studio facts, the pack review notices' push, child-safety preservation, every pack translated by OpenAI (Microsoft only as the fallback: translate-pack v4), the AI pre-review of Community submissions and the reviewer's edits told to the creator (app server 20261201860000; policy first, the same day); before it, October 27, 2026 (Custom, Community and featured Packs, pack auto-translate), October 25 (owner live moderation), October 24 (QA 110)
)

/**
 * The launch text that no feature switch covers: the UK online safety text (Terms section 7's line on suicide,
 * self-harm, eating disorders and dangerous challenges, section 8's pointer to section 22, section 22 itself
 * (components/legal/UkOnlineSafety), and the Community Rules' matching line) and the Safety page (/safety, its route
 * and its footer link; it points to section 22). false holds all of it back, so the Terms, the Rules and the site
 * render as on the website's main before this branch. It follows LIVE.launchSite (website-check-1103: on its own, a
 * launch flip of launchSite left /safety a 404 while the app's Safety Tips link points there once safety_page_live is
 * on), so the launch flip turns it on in the same change, when the Terms are published again. Its own text follows the
 * feature switches in LIVE, like the rest of the Terms.
 */
export const ONLINE_SAFETY_TEXT: boolean = LIVE.launchSite

/**
 * Whether the site sends people to the stores (owner Nov 7). Until the launch the stores hold the old 2.1.1, so the home page,
 * /join, /join/e, the password page and Contact show the launch date and the reminder instead (components/ui/LaunchReminder).
 * It follows LIVE.launchSite: the launch flip brings every store button and line back, with nothing else to change.
 */
export const STORES_OPEN: boolean = LIVE.launchSite

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
