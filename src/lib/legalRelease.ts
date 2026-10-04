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
// storedQuestions, qrScanner; myMemory to what the translate function does
// then; oldAppsInUse to false once the lockdown (DB3) shuts 2.1.1 out, and
// photosRemoved once no photo file is left. Not at launch unless its own
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
// Update 2 columns), not only with everything on.

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
   * The 2.2 notifications: Remind Me on a game night schedules a notification on the phone (no push token
   * leaves a player's phone), and the only server pushes are report alerts to the owner's phones (push
   * tokens, Expo's push service, APNs, FCM).
   */
  notifications: false,
  /**
   * Shown with notifications: the Android build registers every phone with Firebase Cloud Messaging when the
   * app starts. expo-notifications brings firebase-messaging 24.0.1, whose component is always eager and whose
   * auto-init (on unless the manifest says otherwise) fetches a token at launch once google-services.json is in
   * the build, so Google gets a Firebase installation ID and app and device details from every Android player.
   * Set false if the store build turns auto-init off (meta-data firebase_messaging_auto_init_enabled=false):
   * a token is then fetched only by the owner's report-alert switch, and the text about it goes.
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
   * call to RevenueCat's DELETE /v1/subscribers in the delete flow). Not built yet: until it is, the pages
   * say RevenueCat keeps its record and that we have it deleted on request.
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
   * 'server'  the translate function calls MyMemory (feature/small-compliance)
   * 'off'     no backup (the function's TRANSLATE_BACKUP=off)
   */
  myMemory: 'device' as 'device' | 'server' | 'off',
  /** Typed interrogation questions and answers go through the server and are stored like chat (M7 send_interrogation_line). */
  storedQuestions: false,
  /** The in-app QR scanner (camera). */
  qrScanner: false,
  /**
   * App versions before 2.2 still connect: they can add a profile photo, and Account is the icon at the bottom
   * right of their home screen. (They have no chat and never call MyMemory.)
   */
  oldAppsInUse: true,
}

/** Whether any player can still have a profile photo: before 2.2's avatars, or while versions before 2.2 connect. */
export const photosInUse = (): boolean => !LIVE.photosRemoved || LIVE.oldAppsInUse

/** Whether the released app has the avatar creator (from the 2.2 launch; the photo removal implies it). */
export const avatarsLive = (): boolean => LIVE.avatarCreator || LIVE.photosRemoved

/**
 * Whether the Android app uses Google's ML Kit: it translates on the phone (onDeviceTranslation) and reads
 * QR codes (qrScanner). On iPhones, Apple's own frameworks do both.
 */
export const usesMlKit = (): boolean => LIVE.onDeviceTranslation || LIVE.qrScanner

/**
 * Who runs SpySocial: the legal name and a postal address, shown on the
 * Privacy Policy (the data controller) and the Terms (the contracting party,
 * Apple's minimum end-user terms). Owner to fill in.
 */
export const OPERATOR: { name: string | null; address: string | null } = {
  name: 'Alex Gerzon',
  address: null,
}

/** "Last Updated" on the Privacy Policy, the Terms, the Community Rules and Delete Account: the day a change is published. */
export const LEGAL_LAST_UPDATED = 'October 4, 2026'

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
