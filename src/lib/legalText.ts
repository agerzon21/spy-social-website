import { LIVE } from './legalRelease'

// Sentences the Privacy Policy and the Delete Account page share (the lists
// themselves are components/legal/AfterDeletion).

/** What a deletion removes, as one sentence. */
export const deletedSummary = (): string =>
  [
    'your email address and password',
    LIVE.socialSignIn ? 'the Apple or Google sign-in linked to your account' : null,
    LIVE.photoCleanup ? 'your display name, username and profile photo' : 'your display name and username',
    'your stats, XP, levels and achievements',
    'your game-night history and rewards',
    LIVE.purchases ? 'the packs and memberships linked to your account' : null,
    'the players you blocked, and the warnings, mutes and bans on your account',
    'your settings and the answers you gave the app (such as your birth year)',
  ]
    .filter(Boolean)
    .join('; ')

/** After deletedSummary(): what else a deletion does, or ''. */
export const deletedAlso = (): string =>
  LIVE.socialSignIn ? " If you signed in with Apple, we also ask Apple to end SpySocial's access to your Apple ID." : ''
