// What the legal pages (Privacy, Terms, Community Rules, Delete Account) say
// depends on what SpySocial does today. Each switch turns on the text for one
// piece of the app when that piece is live: its branch merged, its server
// side deployed, and (for app pieces) the store build that has it released.
// Flip a switch in the same change that ships the piece, check the text it
// turns on against the shipped code, and update LEGAL_LAST_UPDATED.
//
// The 2.1.1 store app stays in use for a while after 2.2: oldAppsInUse keeps
// the lines about what older versions do (MyMemory called from the phone,
// profile photos) until 2.1.1 can no longer connect.
//
// AT THE 2.2 LAUNCH (the hour 2.2 is out on both stores), flip, after
// checking each one's condition in its comment: photosRemoved, ageGateEveryone,
// birthMonth, under13Deletion, storeAgeSignals, crashReports, notifications,
// socialSignIn, purchases, drawingCheck, onDeviceTranslation, storedQuestions,
// qrScanner; revenueCatDeletion only once the delete flow deletes the
// RevenueCat customer; myMemory to what the translate function does then;
// oldAppsInUse to false once the lockdown (DB3) shuts 2.1.1 out. Then set
// LEGAL_LAST_UPDATED to the launch day, and, since the Terms change
// (purchases, automated drawing checks), raise app_config.terms_version so
// the app asks everyone to agree again.

export const LIVE = {
  /**
   * fix/account-photo-cleanup's housekeeping migration (20261004132500) applied: chat, translations,
   * usage events and security logs are deleted on a clock, not only when traffic happens to prune.
   */
  scheduledRetention: true,
  /** fix/account-photo-cleanup deployed (migration 20261004132000 and purge-avatars): a deleted account's photo file is deleted. */
  photoCleanup: true,
  /**
   * Profile photos are gone: the released app (2.2) shows only the avatar each player designs, and the
   * photos uploaded before 2.2 have been deleted from storage. While oldAppsInUse, the pages still
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
  /** The native age signals in the released app: Apple's Declared Age Range, Google Play Age Signals. */
  storeAgeSignals: false,
  /**
   * Crash reports go to Sentry (the 2.2 native build). Flip only once the Sentry project's
   * "Prevent Storing of IP Addresses" is on (owner setup); the text says Sentry doesn't keep the IP address.
   */
  crashReports: false,
  /**
   * The 2.2 notifications: Remind Me on a game night schedules a notification on the phone (no push token
   * leaves a player's phone), and the only server pushes are report alerts to the owner's phones (push
   * tokens, Expo's push service, APNs, FCM).
   */
  notifications: false,
  /** Sign in with Apple and Google (feature/social-sign-in), including Apple token revocation on deletion. */
  socialSignIn: false,
  /**
   * Buying packs and memberships through the App Store and Google Play, checked with RevenueCat
   * (feature/buying). Guests can buy, and Restore Purchases moves purchases to the account in use.
   */
  purchases: false,
  /**
   * Deleting an account also deletes the player's RevenueCat customer record within 30 days (a server-side
   * call to RevenueCat's DELETE /v1/subscribers in the delete flow). Not built yet: until it is, the pages
   * say RevenueCat keeps its record and that we have it deleted on request.
   */
  revenueCatDeletion: false,
  /**
   * The drawing check (feature/drawing-check deployed with OPENAI_API_KEY): OpenAI judges every drawing
   * turn in public rooms and any reported drawing, from an image of the drawing and the round's word.
   * Before flipping, check the Drawing Checks text (Privacy) and the automated-tools text (Terms, Rules)
   * against what the build sends, keeps and does.
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
  /** App versions before 2.2 still connect (they call MyMemory from the phone, and can add a profile photo). */
  oldAppsInUse: true,
}

/** Whether any player can still have a profile photo: before 2.2's avatars, or while versions before 2.2 connect. */
export const photosInUse = (): boolean => !LIVE.photosRemoved || LIVE.oldAppsInUse

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
 * or earlier if they accept them in the app; everyone else from their first use or acceptance.
 */
export const TERMS_PUBLISHED = 'October 4, 2026'
export const TERMS_EFFECTIVE_FOR_EXISTING = 'November 3, 2026'
export const TERMS_PREVIOUS = 'May 1, 2026'
