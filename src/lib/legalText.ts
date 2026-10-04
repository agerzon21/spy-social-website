import { LIVE, avatarsLive, photosInUse } from './legalRelease'

// Sentences the Privacy Policy and the Delete Account page share (the lists
// themselves are components/legal/AfterDeletion).

/** The names and picture a deletion removes. */
const namesAndPicture = (): string => {
  if (avatarsLive()) {
    return photosInUse() && LIVE.photoCleanup
      ? 'your display name, username, avatar and any profile photo'
      : 'your display name, username and avatar'
  }
  return LIVE.photoCleanup ? 'your display name, username and profile photo' : 'your display name and username'
}

/** What a deletion removes, as one sentence. */
export const deletedSummary = (): string =>
  [
    'your email address and password',
    LIVE.socialSignIn ? 'the Apple or Google sign-in linked to your account' : null,
    namesAndPicture(),
    'your stats, XP, levels and achievements',
    'your game-night history and rewards',
    LIVE.purchases ? 'the packs and memberships linked to your account' : null,
    'the players you blocked, and the warnings, mutes and bans on your account',
    'your settings and the answers you gave the app (such as your birth year)',
  ]
    .filter(Boolean)
    .join('; ')

/**
 * After deletedSummary(): what else a deletion does, or ''. Apple's access is revoked only from Delete Account
 * in the app on an Apple device, once Apple's sheet confirms the account (apple-revoke needs that fresh code);
 * never on Android, for a deletion asked by email, or for the under-13 deletion on the server.
 */
export const deletedAlso = (): string =>
  LIVE.socialSignIn
    ? " If you signed in with Apple and delete your account in the app on an iPhone or iPad, the app has you confirm with Apple, and we then also ask Apple to end SpySocial's access to your Apple ID. You can end that access yourself at any time in your Apple ID settings, under Sign in with Apple."
    : ''
