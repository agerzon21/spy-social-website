// What the legal pages (Privacy, Terms, Community Rules, Delete Account) say
// depends on what SpySocial does today. Each switch turns on the text for one
// piece of the app when that piece is live: its branch merged, its server
// side deployed, and (for app pieces) the store build that has it released.
// Flip a switch in the same change that ships the piece, check the text it
// turns on against the shipped code, and update LEGAL_LAST_UPDATED.
//
// The 2.1.1 store app stays in use for a while after 2.2: oldAppsInUse keeps
// the lines about what older versions do (MyMemory called from the phone)
// until 2.1.1 can no longer connect.

export const LIVE = {
  /**
   * fix/account-photo-cleanup's housekeeping migration (20261004132500) applied: chat, translations,
   * usage events and security logs are deleted on a clock, not only when traffic happens to prune.
   */
  scheduledRetention: true,
  /** fix/account-photo-cleanup deployed (migration 20261004132000 and purge-avatars): a deleted account's photo file is deleted. */
  photoCleanup: true,
  /** merge/avatars-1 deployed: profile photos are checked by Azure AI Content Safety (moderate-avatar). */
  photoScreening: false,
  /** feature/age-terms-gate in the released app: everyone gives a birth year before their first game. */
  ageGateEveryone: false,
  /** The native age signals in the released app: Apple's Declared Age Range, Google Play Age Signals. */
  storeAgeSignals: false,
  /** Crash reports go to Sentry (the 2.2 native build). */
  crashReports: false,
  /** Push notifications: push tokens on our servers, delivery through Expo, APNs and FCM. */
  pushNotifications: false,
  /** Sign in with Apple and Google (feature/social-sign-in), including Apple token revocation on deletion. */
  socialSignIn: false,
  /** Buying packs and memberships through the App Store and Google Play, checked with RevenueCat (feature/buying). */
  purchases: false,
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
  /** App versions before 2.2 still connect (they call MyMemory from the phone). */
  oldAppsInUse: true,
}

/**
 * Who runs SpySocial: the legal name and a postal address, shown on the
 * Privacy Policy (the data controller) and the Terms (the contracting party,
 * Apple's minimum end-user terms). Owner to fill in.
 */
export const OPERATOR: { name: string | null; address: string | null } = {
  name: 'Aleksandr Gerzon',
  address: '55 Ash Gap Road, Clifton Township, PA 18424-7702, United States',
}

/** "Last Updated" on the Privacy Policy, the Terms, the Community Rules and Delete Account: the day a change is published. */
export const LEGAL_LAST_UPDATED = 'October 5, 2026'

/**
 * The May 1, 2026 Terms promised at least 30 days' notice before material new terms take effect.
 * People who used SpySocial before these Terms were published are bound by them from TERMS_EFFECTIVE_FOR_EXISTING,
 * or earlier if they accept them in the app; everyone else from their first use or acceptance.
 */
export const TERMS_PUBLISHED = 'October 4, 2026'
export const TERMS_EFFECTIVE_FOR_EXISTING = 'November 3, 2026'
export const TERMS_PREVIOUS = 'May 1, 2026'

