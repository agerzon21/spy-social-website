import { Link as ChakraLink, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PRIVACY, photosInUse, photosShown } from '../../lib/legalRelease'

// What deleting an account removes and what stays, for the Privacy Policy and
// the Delete Account page (Google Play links to it), so the two never differ.
// They read PRIVACY, which can run ahead of the Terms (legalRelease.ts).
// Checked against the live database (2026-10-03): the profile's foreign keys
// delete stats, XP, achievements, blocks, warnings, mutes and bans, game-night
// history and rewards, age and terms answers and entitlements with it; reports
// and cases keep the names copied into them with the account link cleared;
// chat lines, game_events, room_votes and app_events keep a user ID that no
// longer leads anywhere; auth_attempts and the Auth audit log hold e-mail
// addresses until the housekeeping job deletes them.
// Run again end to end on 2026-10-22 (a throwaway guest, deleted as Sign Out
// does): auth.users, its sessions and refresh tokens, the profile and its
// owned categories all went, nothing else held its id, and the RevenueCat
// queue (revenuecat_purges, filled by the profile's BEFORE DELETE trigger)
// emptied at the next 5-minute tick (revenueCatDeletion).

const SupportEmail = () => (
  <ChakraLink as={Link} to="/contact-us">
    support@spysocial.app
  </ChakraLink>
)

/** What stays after a deletion, and for how long. */
export const AfterDeletionList = () => (
  <UnorderedList spacing={2} ps={4} textStyle="body">
    <ListItem>
      Chat messages{PRIVACY.storedQuestions ? ' and typed questions and answers' : ''} you sent stay in their room until{' '}
      {PRIVACY.scheduledRetention
        ? "they're deleted: about 24 hours after you sent them in a private room, 14 days after in a public room."
        : 'they expire (after 24 hours in private rooms, 14 days in public rooms); after that nobody can read them.'}
    </ListItem>
    <ListItem>
      Reports, including the names and chat lines attached to them, are kept for as long as we need them to keep players
      safe, handle appeals and meet legal obligations. They're no longer linked to your account.
    </ListItem>
    {PRIVACY.banTombstone && (
      <ListItem>
        If your account had a ban, pause or mute that was still running, or a warning or other sanction from the last 90
        days, we keep a short record of each: what it was, the rule it was for (as a category, not our notes), when it
        started and ends, and a coded fingerprint of each way you signed in (your email address once confirmed, and your
        Apple or Google account ID). The fingerprint is made with a secret key that only our server holds: it can't be
        turned back into your email address or ID, and it only tells us that a new sign-in is one of the old ones. If you
        sign up again or connect one of them, the ban, pause or mute applies to the new account until it would have
        ended, and we review it. Each record also keeps its reference number, whether it can be appealed, how many
        warnings came before it and whether it was a child-safety case; none of these identify you. We don't keep your
        name, username, messages or anything else for this.
      </ListItem>
    )}
    <ListItem>
      Records of games you played (such as moves, votes and results) stay with those games, with no end date. They identify players only
      by a random ID, which no longer leads to your account. A room you still host with nobody to pass it to is deleted, with its games' records. Usage events, which use the same ID, are deleted after 180
      days{PRIVACY.playOnline ? ", and Play Online's matchmaking log, which uses it too, after 90 days" : ''}.
    </ListItem>
    {PRIVACY.childSafetyHolds && (
      <ListItem>
        If your account is part of a child-safety case, we first keep a restricted copy of the case, your email address,
        names, sign-in dates and the IP addresses in our sign-in log, your messages still on our servers and your encrypted IP addresses, for 1 year, or longer
        if the authorities ask us to. Nobody but the person who handles child-safety cases and the authorities can see it.
      </ListItem>
    )}
    {PRIVACY.drawingCheck && (
      <ListItem>
        A drawing kept as evidence (see Data Retention) stays until its period ends, even if the account that drew it is
        deleted.
      </ListItem>
    )}
    <ListItem>
      Security logs of account activity (such as sign-ups, sign-ins, {PRIVACY.passwordless ? 'sign-in codes sent' : PRIVACY.emailCodes22 ? 'sign-in codes sent, password resets' : 'password resets'} and email changes), which can include
      your email address and IP address, are kept{PRIVACY.scheduledRetention ? ' for 180 days' : ''} to protect accounts and
      prevent abuse.
    </ListItem>
    {PRIVACY.socialFeatures && (
      <ListItem>
        The social safety log (see Safety Information) keeps its entries for 1 year with your account taken out of them,
        and party chat lines you wrote stay with the party, with your account taken out of them, until they're deleted 30 days after they were sent.
      </ListItem>
    )}
    {PRIVACY.intercepts && (
      <ListItem>
        The signs our fair-play checks found on your account stay until their 400 days end, or longer while they're
        part of an open case or an alert that's waiting for our review, identified only by a random ID that no longer leads to your account.
      </ListItem>
    )}
    {PRIVACY.ipVault && (
      <ListItem>
        The encrypted IP addresses of your account's sign-up and sign-ins stay until their 90 days end, or up to 1 year
        when they're part of a report to NCMEC{PRIVACY.childSafetyHolds ? ', a child-safety case' : ''} or a law-enforcement request.
      </ListItem>
    )}
    {/* photosPrivate: a photo's public link no longer opens at all (the bucket is private), so no cached copy either. */}
    {photosInUse(PRIVACY) &&
      (PRIVACY.photoCleanup ? (
        photosShown(PRIVACY) && (
          <ListItem>
            A copy of your profile photo that our content delivery network cached can still open by its link for up to
            an hour.
          </ListItem>
        )
      ) : (
        <ListItem>
          Your profile photo's file isn't deleted automatically yet. If you had one, email <SupportEmail /> and we'll
          delete it within one month.
        </ListItem>
      ))}
    {PRIVACY.purchases && (
      <ListItem>
        {PRIVACY.revenueCatDeletion ? (
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
    {PRIVACY.creatorCodes && (
      <ListItem>
        If you entered a creator code, the record that a player entered it, and the amounts of the purchases credited to
        the creator, stay so we can pay the creator and keep our accounting records. Nothing in them leads to your
        account any more.
      </ListItem>
    )}
    {PRIVACY.communityPacks && (
      <ListItem>
        The packs you published to Community Packs stay there for other players, with your username removed at once:
        they show Anonymous as their creator, and players who added them keep them.
      </ListItem>
    )}
    {PRIVACY.trading && (
      <ListItem>
        Trades you made stay, with your account taken out of them, because the other player's items and Intel came from
        them (who closed a trade can stay in its record as a random ID that no longer leads to your account). Items and Intel you got in a trade that's still protected (in its first 7 days) go back to the player who
        gave them.
      </ListItem>
    )}
    {PRIVACY.blackMarket && (
      <ListItem>
        Your Black Market offers, listings and sales stay in the market's records, with your account taken out of them,
        because the other players' items and Intel came from them (the market's event log can keep a random ID that no longer leads to your account).
      </ListItem>
    )}
    {PRIVACY.intel && PRIVACY.intelLedger && (
      <ListItem>
        The lines of your Intel ledger{PRIVACY.intelCorrections ? ', and the records of any correction to it,' : ''} stay
        for good with no link to you (we remove who they belonged to), so that totals and our published reports stay
        right; the app version and platform in a line are dropped once it's 2 years old.
      </ListItem>
    )}
    {PRIVACY.mintedCollectibles && (
      <ListItem>
        The public ledger's entries for your {PRIVACY.ledgerUniquesOnly ? 'Uniques' : 'collectibles'} stay for good, so that it can always be checked. They never
        named you: we delete your account's secret and take your account out of your copies' records, so their holder
        codes no longer point at anyone.
      </ListItem>
    )}
    <ListItem>Copies in our database backups are deleted as those backups expire, within 30 days.</ListItem>
  </UnorderedList>
)

/** The closing line both pages show under the list. */
export const AfterDeletionLaw = () => (
  <Text textStyle="body">
    We may also keep information for longer when the law requires it, for example when we have to report illegal content
    to the authorities.
  </Text>
)
