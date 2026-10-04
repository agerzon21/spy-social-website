import { Link as ChakraLink, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { LIVE, photosInUse } from '../../lib/legalRelease'

// What deleting an account removes and what stays, for the Privacy Policy and
// the Delete Account page (Google Play links to it), so the two never differ.
// Checked against the live database (2026-10-03): the profile's foreign keys
// delete stats, XP, achievements, blocks, warnings, mutes and bans, game-night
// history and rewards, age and terms answers and entitlements with it; reports
// and cases keep the names copied into them with the account link cleared;
// chat lines, game_events, room_votes and app_events keep a user ID that no
// longer leads anywhere; auth_attempts and the Auth audit log hold e-mail
// addresses until the housekeeping job deletes them.

const SupportEmail = () => (
  <ChakraLink as={Link} to="/contact-us" color="blue.300" _hover={{ color: 'blue.200' }}>
    support@spysocial.app
  </ChakraLink>
)

/** What stays after a deletion, and for how long. */
export const AfterDeletionList = () => (
  <UnorderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
    <ListItem>
      Chat messages{LIVE.storedQuestions ? ' and typed questions and answers' : ''} you sent stay in their room until{' '}
      {LIVE.scheduledRetention
        ? "they're deleted: about 24 hours after you sent them in a private room, 14 days after in a public room."
        : 'they expire (after 24 hours in private rooms, 14 days in public rooms); after that nobody can read them.'}
    </ListItem>
    <ListItem>
      Reports, including the names and chat lines attached to them, are kept for as long as we need them to keep players
      safe, handle appeals and meet legal obligations. They're no longer linked to your account.
    </ListItem>
    <ListItem>
      Records of games you played (such as moves, votes and results) stay with those games. They identify players only
      by a random ID, which no longer leads to your account. Usage events, which use the same ID, are deleted after 180
      days{LIVE.playOnline ? ", and Play Online's matchmaking log, which uses it too, after 90 days" : ''}.
    </ListItem>
    <ListItem>
      Security logs of account activity (such as sign-ups, sign-ins, password resets and email changes), which can include
      your email address and IP address, are kept{LIVE.scheduledRetention ? ' for 180 days' : ''} to protect accounts and
      prevent abuse.
    </ListItem>
    {photosInUse() &&
      (LIVE.photoCleanup ? (
        <ListItem>
          A copy of your profile photo that our content delivery network cached can still open by its link for up to an
          hour.
        </ListItem>
      ) : (
        <ListItem>
          Your profile photo's file isn't deleted automatically yet. If you had one, email <SupportEmail /> and we'll
          delete it within one month.
        </ListItem>
      ))}
    {LIVE.purchases && (
      <ListItem>
        {LIVE.revenueCatDeletion ? (
          <>
            RevenueCat's record of your purchases (an ID linked to your account, and what you bought) is deleted within
            30 days.
          </>
        ) : (
          <>
            RevenueCat keeps its record of your purchases (an ID linked to your account, and what you bought); email{' '}
            <SupportEmail /> and we'll have it deleted within one month.
          </>
        )}{' '}
        Apple and Google keep their own records of your purchases, under their policies and the law, so what you bought
        can come back on another SpySocial account with Restore Purchases, on the App Store or Google Play account you
        paid with. Deleting your account doesn't cancel a subscription: cancel it in your App Store or Google Play
        settings.
      </ListItem>
    )}
    <ListItem>Copies in our database backups are deleted as those backups expire, within 30 days.</ListItem>
  </UnorderedList>
)

/** The closing line both pages show under the list. */
export const AfterDeletionLaw = () => (
  <Text fontSize="sm" lineHeight="1.8">
    We may also keep information for longer when the law requires it, for example when we have to report illegal content
    to the authorities.
  </Text>
)
