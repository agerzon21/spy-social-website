import { PRIVACY, avatarsLive, photosInUse } from './legalRelease'

// Sentences the Privacy Policy and the Delete Account page share (the lists
// themselves are components/legal/AfterDeletion). They read PRIVACY, which can
// run ahead of the Terms (legalRelease.ts, PRIVACY_AHEAD).

/** The names and picture a deletion removes. */
const namesAndPicture = (): string => {
  if (avatarsLive(PRIVACY)) {
    return photosInUse(PRIVACY) && PRIVACY.photoCleanup
      ? 'your display name, username, avatar and any profile photo'
      : 'your display name, username and avatar'
  }
  return PRIVACY.photoCleanup ? 'your display name, username and profile photo' : 'your display name and username'
}

/** What a deletion removes, as one sentence. */
export const deletedSummary = (): string =>
  [
    'your email address and password',
    PRIVACY.socialSignIn ? 'the Apple or Google sign-in linked to your account' : null,
    namesAndPicture(),
    'your stats, XP, levels and achievements, and your mini-game scores and Call It picks',
    'your game-night history and rewards',
    PRIVACY.purchases ? 'the purchases linked to your account (such as packs, avatar items and memberships)' : null,
    'the players you blocked, and the warnings, mutes and bans on your account',
    'your settings and the answers you gave the app (such as your birth year)',
    PRIVACY.notifications ? "your devices' push addresses" : null,
  ]
    .filter(Boolean)
    .join('; ')

/**
 * After deletedSummary(): what else a deletion does. Apple's access is revoked only from Delete Account in the
 * app on an Apple device, once Apple's sheet confirms the account (apple-revoke needs that fresh code); never on
 * Android, for a deletion asked by email, or for the under-13 deletion on the server. An account we delete
 * ourselves (a request by email, a safety or legal reason: the owner console's Delete Account,
 * owner_delete_account, runs the player's own deletion as the player) goes the same way, without Apple's step.
 */
export const deletedAlso = (): string =>
  PRIVACY.socialSignIn
    ? " If you signed in with Apple and delete your account in the app on an iPhone or iPad, the app has you confirm with Apple, and we then also ask Apple to end SpySocial's access to your Apple ID. An account we delete ourselves, at your request or for safety reasons, is deleted the same way, but without that request to Apple, which needs your confirmation in the app. You can end that access yourself at any time in your Apple ID settings, under Sign in with Apple."
    : ' An account we delete ourselves, at your request or for safety reasons, is deleted the same way.'
