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
// condition holds by then: revenueCatDeletion (the delete flow deletes the
// RevenueCat customer) and drawingCheck (the game itself checks drawings;
// deploying check-drawing is not enough). Then set LEGAL_LAST_UPDATED to the
// launch day. The Terms gain material sections at launch (buying, Restore
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
  /** feature/age-terms-gate in the released app: everyone gives a birth year before their first game. */
  ageGateEveryone: false,
  /**
   * Migration 20261005100200_birth_month applied with the 2.2 app: only a player born in this year less 13
   * (the one year where the year alone can't tell 12 from 13) is asked the month too, and only then is it kept.
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
  fcmAutoInit: true,
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
   * RevenueCat keeps its record and that we have it deleted on request.
   */
  revenueCatDeletion: false,
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
   * App versions before 2.2 still connect: they can add a profile photo, and Account is the icon at the bottom
   * right of their home screen. (They have no chat and never call MyMemory.)
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
 *   (runbook 3.5) and the store forms declare drawings sent to OpenAI.
 * Never ahead (and not in AHEAD_SAFE): onePool and messageReports (the Privacy pages don't read them; they change the
 * Terms, the Rules and the FAQ, which wait for the launch), photosRemoved (says the photos are deleted), oldAppsInUse
 * (false drops what versions before 2.2 do while 2.1.1 is the store version), myMemory (a server switch for every
 * app version at once: set in LIVE to what the translate function does, 'off' since the submission day), fcmAutoInit (false drops the Firebase text; set it in LIVE to match the build), scheduledRetention,
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
] as const satisfies readonly BooleanSwitch[]

/**
 * Switches on for the Privacy pages before they're on in LIVE (see the top of this file and AHEAD_SAFE). All off
 * until the 2.2 submission day; emptied at the launch, once LIVE has them.
 */
export const PRIVACY_AHEAD: { readonly [K in (typeof AHEAD_SAFE)[number]]?: true } = {}

/** What the Privacy Policy, Delete Account, AfterDeletion and legalText read: LIVE, with PRIVACY_AHEAD on top. */
export const PRIVACY: Switches = {
  ...LIVE,
  ...Object.fromEntries(AHEAD_SAFE.filter((key) => PRIVACY_AHEAD[key] === true).map((key) => [key, true])),
}

/** Whether any player can still have a profile photo: before 2.2's avatars, or while versions before 2.2 connect. */
export const photosInUse = (s: Switches): boolean => !s.photosRemoved || s.oldAppsInUse

/** Whether the released app has the avatar creator (from the 2.2 launch; the photo removal implies it). */
export const avatarsLive = (s: Switches): boolean => s.avatarCreator || s.photosRemoved

/**
 * Whether the Android app uses Google's ML Kit: it translates on the phone (onDeviceTranslation) and reads
 * QR codes (qrScanner). On iPhones, Apple's own frameworks do both.
 */
export const usesMlKit = (s: Switches): boolean => s.onDeviceTranslation || s.qrScanner

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
 * Privacy Policy and Delete Account: the day a change is published.
 */
export const LEGAL_LAST_UPDATED = 'October 7, 2026'

/**
 * "Last Updated" on the Privacy Policy and Delete Account, which can run ahead of the Terms (PRIVACY_AHEAD): the
 * day the ahead text goes up. Back to LEGAL_LAST_UPDATED at the launch.
 */
export const PRIVACY_LAST_UPDATED: string = LEGAL_LAST_UPDATED

/**
 * The launch text that no feature switch covers: the UK online safety text (Terms section 7's line on suicide,
 * self-harm, eating disorders and dangerous challenges, section 8's pointer to section 22, section 22 itself
 * (components/legal/UkOnlineSafety), and the Community Rules' matching line) and the Safety page (/safety, its route
 * and its footer link; it points to section 22). false holds all of it back, so the Terms, the Rules and the site
 * render as on the website's main before this branch: set it false whenever this branch reaches main before the
 * launch (the 2.2 submission day, with PRIVACY_AHEAD), and true again at the launch, when the Terms are published
 * again. Its own text follows the feature switches in LIVE, like the rest of the Terms.
 */
export const ONLINE_SAFETY_TEXT: boolean = true

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
