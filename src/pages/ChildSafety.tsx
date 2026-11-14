import { Link as ChakraLink, OrderedList, Text } from '@chakra-ui/react'
import { Callout } from '../components/legal/Callout'
import { ChildSafetyContacts } from '../components/legal/ChildSafetyContacts'
import { B, Bullets, H2, H3, P, PageLink, SupportEmail } from '../components/legal/LegalText'
import { UK_SECTION_NUMBER } from '../components/legal/UkOnlineSafety'
import {
  LEGAL_LAST_UPDATED,
  LIVE,
  ONLINE_SAFETY_TEXT,
  OPERATOR,
  drawingCheckLive,
  drawingCheckTestersOnly,
  photosInUse,
  photosShown,
} from '../lib/legalRelease'
import { LegalPage } from '../components/legal/LegalPage'

// SpySocial's child sexual abuse and exploitation (CSAE) standards
// (www.spysocial.app/child-safety), the page Google Play's Child Safety
// Standards policy asks for (Play Console Help 14747720): published standards
// that prohibit CSAE and name the app and its developer as the Play listing
// does, the in-app way to report, how we deal with CSAM, child safety laws,
// and the child safety point of contact. Every statement comes from the
// Terms (sections 7 and 8), the Community Rules, the Privacy Policy, the UK
// online safety section and the Safety page; what depends on a release
// follows src/lib/legalRelease.ts, like those pages. NCMEC registration as an
// ESP is done (October 16, 2026); the page says we report to NCMEC as the law
// requires, which is all a reader needs.

/** The day this page first went up. Set it to the day it's published. */
const PUBLISHED = 'October 8, 2026'

/** The later of two "Month D, YYYY" dates: the page changes when it goes up and when a switch it reads flips. */
const later = (a: string, b: string): string => (new Date(a).getTime() >= new Date(b).getTime() ? a : b)

const ChildSafety: React.FC = () => {
  // Profile photos other players can see (photosShown); photosPrivate: kept, but shown to no one since 2026-10-20.
  const photos = photosShown(LIVE)
  const photosKept = photosInUse(LIVE) && LIVE.photosPrivate
  const drawings = drawingCheckLive(LIVE)
  const developer = OPERATOR.legalName ? `, made by ${OPERATOR.legalName}` : ''

  return (
    <LegalPage english title="Child Safety Standards" updated={<>Last updated: {later(PUBLISHED, LEGAL_LAST_UPDATED)}</>}>

      <P>
        SpySocial is a party game for players 13 and older{developer}. These are SpySocial's standards against child
        sexual abuse and exploitation (CSAE): what we prohibit, how to report it, what we do about it, and how to reach
        us. They're part of our <PageLink to="/terms">Terms of Service</PageLink> and{' '}
        <PageLink to="/rules">Community Rules</PageLink>, and they apply everywhere in SpySocial: names,
        {photos ? ' profile photos,' : ''} chat, typed questions and answers
        {LIVE.customPacks ? ', Spy Sketch drawings and custom packs' : ', and Spy Sketch drawings'}, in public and
        private rooms. Jump to:{' '}
        <ChakraLink href="#standards">what we prohibit</ChakraLink>,{' '}
        <ChakraLink href="#protections">how SpySocial protects children</ChakraLink>,{' '}
        <ChakraLink href="#report">how to report</ChakraLink>,{' '}
        <ChakraLink href="#response">what we do</ChakraLink>,{' '}
        <ChakraLink href="#laws">child safety laws</ChakraLink>,{' '}
        <ChakraLink href="#contact">our child safety contact</ChakraLink>.
      </P>

      <Callout title="Is a child in danger right now?">
        <Text textStyle="body">
          Call your local emergency number first: 911 in the US, 999 in the UK, 112 in the EU. Then tell us.
        </Text>
      </Callout>

      <H2 id="standards">1. What we prohibit</H2>
      <P>
        We have zero tolerance for child sexual abuse and exploitation. Nobody, of any age, may use SpySocial to:
      </P>
      <Bullets>
        <li>share, ask for or create sexual content involving anyone under 18, in chat, names or drawings, or link to it</li>
        <li>
          groom a child: win a young player's trust in order to sexualize or exploit them, for example by asking how
          old they are, where they live or which school they go to, asking for photos, asking to talk in another app,
          offering gifts or money, or asking them to keep a secret
        </li>
        <li>talk about sex with a minor, or send a minor sexual messages or drawings</li>
        <li>
          sexualize or exploit a child in any other way, such as pressuring or threatening a child for sexual images
          (sextortion), or helping anyone traffic a child
        </li>
      </Bullets>
      <P>
        Anything like this is removed, the accounts involved are banned, and we report it to NCMEC{LIVE.ncmecOnly ? ', as US law requires, which passes it to the police in the country it concerns' : ' and other authorities as the law requires'} (see{' '}
        <ChakraLink href="#response">what we do</ChakraLink>).
      </P>

      <H2 id="protections">2. How SpySocial protects children</H2>
      <Bullets>
        <li>
          <B>Age:</B> SpySocial is for players 13 and older.
          {LIVE.ageGateEveryone &&
            ` Before the first game, the app asks for a birth year${LIVE.under13Deletion ? ', and an answer under 13 deletes the account' : ''}.`}
          {LIVE.storeAgeSignals &&
            " If Apple or Google tells the app that its user is under 13, the app doesn't let them play."}{' '}
          If you find that a child under 13 has an account, email us and we'll delete it.
          {LIVE.safetyAnswers1106 &&
            " A birth year can't be changed in the app. Only SpySocial's developer can raise an age from under 18 to an adult's, by email and with proof of age; an answer under 13 has no way back."}
        </li>
        {/* LIVE.socialFeatures: friends, follows, parties (Oct 31, 2026); LIVE.trading, LIVE.blackMarket (Nov 1). */}
        {LIVE.socialFeatures ? (
          <li>
            <B>No stranger can find or message a child:</B> there are no direct messages and no player search, and we
            never suggest friends. An adult can add a player under 16 as a friend only in person, by scanning the Friend
            Code on their phone (players 16 and 17 also from a private game they just played together); adding from a
            public table or by username is only between adults. Players under 18 have no public profile, can't be
            followed and get no social or trade notifications at night. Friends can invite each other to games and play as a
            party with a party chat, which goes through the same filters as game chat (the stricter ones when anyone
            in the party is under 18) and can be reported.{' '}
            {/* legal-1113 item 2 (SPY_CHAT_DISCLOSED_DAY): the one chat a few players at a table share apart from the rest. */}
            In a Spy Mafia game, the spies dealt also share a chat that only they can read, for that game only. It
            goes through the same filters, the same grooming check and the same reports as the table's chat, and when
            anyone in the room is under 18 or hasn't told us their age, the stricter rules apply there too. On iPhone{LIVE.membershipWords1105 ? ' and iPad' : ''}, friends and parties stay off for players under
            18 for now.
          </li>
        ) : (
          <li>
            <B>No way to reach a player outside a room:</B> players meet only inside a game room and chat only with the
            players in it. There are no direct messages, no friend or follower lists, no player search and no profiles
            to browse, so nobody can look a player up or contact them afterwards.
          </li>
        )}
        {LIVE.trading && (
          <li>
            <B>Trading:</B> players 13–17 can trade game items only for other items, only with friends they added in
            person{LIVE.tradeGatesNov2 ? ` with a Friend Code (friends can trade as soon as they're friends, so adding each other in person is what keeps strangers out; an account also has to be 7 days old and have played 3 counted games${LIVE.launchSite ? '' : ', though these two rules are off for everyone until December 7, 2026, while SpySocial is being tested'})` : ''}{LIVE.tradeNoLimits ? '' : ', at most 3 trades a day'}, with no gifts, no messages and no Intel. Trades with a player under 18 are
            checked for signs of grooming or unfair trades, and a person reviews what the checks flag.
            {LIVE.tradeMinorSafety ? " A trade between an adult and a player under 18 that is lopsided either way, or a third trade between the same two within 30 days, opens a child-safety case that our developer is alerted to and reviews first. It doesn't block or undo the trade by itself." : ''}
            {LIVE.blackMarket ? ' Players under 18 can look at the Black Market but can\'t buy or sell there.' : ''}{' '}
            Nothing in SpySocial can be bought or sold for real money between players.
          </li>
        )}
        {/* LIVE.homeDiscord: Home's Discord pill (server get_home_discord: under 16 never, 16-17 a safety note first). */}
        {LIVE.homeDiscord && (
          <li>
            <B>Our Discord server:</B> the app can show a link to SpySocial's official Discord server, a separate app
            with its own rules and minimum age. Players under 16 (and players who haven't told us their age) never see
            the link; players 16 and 17 first see a note on staying safe there (Discord has private messages we can't
            see; keep your real name, school and address to yourself; tell a parent or guardian), and on iPhone{LIVE.membershipWords1105 ? ' and iPad' : ''}, no
            player under 18 sees it for now. Our team and
            volunteer moderators look after the server, and links to other apps stay blocked in any room with a player
            under 18.
          </li>
        )}
        <li>
          <B>No voice, video or photo sharing:</B> there's no voice or video chat, and no way to send photos or
          videos.
          {photos
            ? ' Versions of the app before 2.2 let a player add a profile photo, which only shows next to their name.'
            : " The only pictures are Spy Sketch drawings, drawn with a finger during a turn, and avatars built from the parts the app offers."}
          {photosKept &&
            " Until October 20, 2026, versions of the app before 2.2 let a player add a profile photo, which only showed next to their name; no one can add one now, and those photos aren't shown to anyone."}
        </li>
        <li>
          <B>Rooms:</B> only people with a private room's code, link or QR code{LIVE.socialFeatures ? ", or a friend's invite," : ''} can join it, and the host can remove a
          player. Players under 16 (and players who haven't told us their age) see no other player's private rooms in
          the app's room list, and a private room hosted by a player under 18 is listed to no one but its host. Some of
          the game's suggested questions are never offered to a player under 18, and the game never picks one by itself
          while a player under 18 is in the room or game. Public rooms are only for
          saved accounts of players 13 or older who have agreed to our Community
          Rules; guests can play only in private rooms, and a player with a pause or a ban can't join public rooms.
        </li>
        <li>
          <B>Chat filter:</B> names and chat are checked before anyone else sees them. In public rooms, explicit sexual
          words are blocked; in private rooms, the most serious words are blocked. In any room{LIVE.safetyAnswers1106 ? " or party with a player under 18 or one who hasn't told us their age, " : ' with a player under 18, '}
          links, email addresses, phone numbers and social accounts are blocked for everyone
          {LIVE.safetyAnswers1106 ? ", and so is other personal info (a home address, asking or saying where someone lives, a school or a real name): a player under 18 can't share it or be asked for it, and the app says \"Sorry, sharing personal info or links isn't allowed here.\"" : ''}
          {LIVE.childSafetyHolds ? `${LIVE.safetyAnswers1106 ? ' Sexual talk is blocked there too' : ', and so is sexual talk'}, along with lines that could be sexual` : ''}{LIVE.safetyAnswers1106 && LIVE.childSafetyHolds ? '.' : ''}{LIVE.safetyAnswers1106 && LIVE.childSafetyHolds ? '' : '.'} At Play Online tables
          and game nights {LIVE.safetyAnswers1106 ? 'links, contact details and personal info are' : "they're"} always blocked{LIVE.childSafetyHolds ? ', and so is explicit sexual talk' : ''}. Sharing real names, addresses, phone numbers or social media handles
          is against our Community Rules.
          {LIVE.childSafetyHolds &&
            " Messages that can be part of grooming, and explicit sexual talk even when it was refused, in rooms and party chats with a player under 18, are flagged automatically for a person to read."}
          {LIVE.safetyAnswers1106 &&
            " What adults write in rooms and party chats with a player who told us they're under 18 may also be read, after it's sent, by an automated check (OpenAI's models) that looks for sexual talk aimed at a younger player and flags it for a person to read. It never blocks or changes a message, and what players under 18 or players who haven't told us their age write is never sent to it."}
        </li>
        {/* LIVE.communityPacks: shared packs are reviewed before anyone else sees them (legalRelease). */}
        {LIVE.communityPacks && (
          <li>
            <B>Community Packs:</B> every pack's text goes through our word filter and an automated check (OpenAI's
            moderation model) before anyone else can play or see it, and a pack it flags for child sexual content is
            logged for our child-safety review; a person on our team reads every pack a member publishes before anyone
            else can see it, and any player can report a Community Pack.
          </li>
        )}
        <li>
          <B>Evidence:</B> chat is kept on our servers for a while (about 24 hours in a private room, 14 days in a
          public room, 30 days in a party), so a report comes with the words actually sent.
        </li>
        {drawings ? (
          <li>
            <B>Drawing check:</B> Spy Sketch drawing turns in a public room are checked automatically as they're
            played, and so is a drawing reported in a private room. When the check finds a drawing that sexualizes a
            child, in any room, the drawing is taken off the board, the account is banned with no appeal, and the drawing is reported to NCMEC. A turn can
            go unchecked if the check can't run at that moment; a report of it still goes to a person.
            {drawingCheckTestersOnly(LIVE) &&
              ' For now, while we test it, the check runs only in games where every player is one of our testers (players trying a test version of the app); in other games, a person reviews the drawings players report.'}
          </li>
        ) : (
          <li>
            <B>Drawings:</B> a person reviews the drawings players report.
          </li>
        )}
      </Bullets>

      <H2 id="report">3. How to report a concern</H2>
      <H3>In the app</H3>
      <OrderedList spacing={2} pl={4} textStyle="body">
        <li>
          Long-press the player{LIVE.messageReports ? ', or something they wrote in the chat,' : ''} and tap{' '}
          <B>Report</B>.{drawings ? ' You can also report a drawing.' : ''}
        </li>
        <li>
          Choose <B>Child Safety</B> ("Sexual talk with a minor, or a child at risk"), add details if you like, and
          send.
        </li>
        <li>
          To stop seeing their chat, long-press the player again and tap <B>Block</B>.
        </li>
      </OrderedList>
      <P>
        You report without leaving the app, and you don't need screenshots: the report includes our servers' own copy
        of the chat around it. The player you report isn't told who reported them.
        {LIVE.oldAppsInUse && ' Report and Block are in SpySocial 2.2 and later; in older versions, email us instead.'}
      </P>

      <H3>By email</H3>
      <P>
        Anyone, with or without an account, can email <SupportEmail subject="Child safety" /> with "Child safety" in
        the subject. Tell us where it happened (for example, the room code and the player's name) and what happened.
        You don't have to give your name. Please don't send us images or copies of the material: describe what you
        saw instead. We'll confirm that we got your report, review it, and tell you what we decided.
      </P>

      <H3>Straight to the authorities</H3>
      <ChildSafetyContacts />

      <H2 id="response">4. What we do</H2>
      <OrderedList spacing={2} pl={4} textStyle="body">
        <li>
          A person reads every report within 24 hours. Reports about child safety, and reports involving a player
          under 18, are marked urgent and read first.
          {LIVE.safetyAnswers1106 &&
            (LIVE.modCoverHold
              ? " Reports about a child's safety are decided by SpySocial's developer only. If he hasn't opened one within 15 minutes, volunteer moderators see a limited view of it (never who reported it, never details or messages of a player under 18, never a private room's code, never a drawing) and can pause the reported player from public rooms and mute their chat for 24 hours, remove them from the room or party, or hide their messages until he does; he reviews and can undo each step, and only he reports to the authorities. Reports of personal info shared by or with a player under 18 are read by SpySocial's developer only."
              : " Reports about a child's safety, and reports of personal info shared by or with a player under 18, are read by SpySocial's developer only, never by volunteer moderators.")}
        </li>
        <li>We take the content down: the message, the drawing or the name.</li>
        <li>
          We ban the accounts involved.
          {drawings ? ' A drawing that sexualizes a child ends the account, with no appeal.' : ''}
        </li>
        <li>
          We keep the evidence the law requires us to keep
          {LIVE.childSafetyHolds ? ', even if the account is deleted first' : ''}.
        </li>
        <li>
          We report it to the National Center for Missing &amp; Exploited Children (NCMEC), as US law requires. NCMEC
          passes reports linked to the UK to the UK's National Crime Agency, so we never report the same case twice.
          If we believe a child's life or safety is at risk, we tell the police.
        </li>
      </OrderedList>

      <H2 id="laws">5. Child safety laws</H2>
      <P>
        We follow the child safety laws that apply to SpySocial. They include the US law that requires online services
        to report apparent child sexual abuse material to NCMEC and to preserve what they report (18 U.S.C. § 2258A),
        and the UK's Online Safety Act 2023
        {ONLINE_SAFETY_TEXT ? (
          <>
            , which section {UK_SECTION_NUMBER} of our <PageLink to="/terms">Terms of Service</PageLink> covers
          </>
        ) : (
          ''
        )}
        . We share information with the police and other authorities when the law requires it, and we answer lawful
        requests. We don't knowingly collect personal information from children under 13 (see our{' '}
        <PageLink to="/privacy">Privacy Policy</PageLink>).
      </P>

      <H2 id="contact">6. Our child safety contact</H2>
      <P>
        {OPERATOR.name
          ? `SpySocial's child safety point of contact is ${OPERATOR.person}, who ${OPERATOR.isCompany ? `owns and runs ${OPERATOR.name}, the company that runs SpySocial,` : 'runs SpySocial'} and handles child safety reports. `
          : ''}
        Email <SupportEmail subject="Child safety" /> with "Child safety" in the subject, and we'll deal with it first.
        Law enforcement and other organizations can reach us at the same address.
      </P>

      <P>
        See also our <PageLink to="/rules">Community Rules</PageLink>,{' '}
        <PageLink to="/terms">Terms of Service</PageLink>
        {ONLINE_SAFETY_TEXT ? (
          <>
            , <PageLink to="/privacy">Privacy Policy</PageLink> and <PageLink to="/safety">Safety page</PageLink>
          </>
        ) : (
          <>
            {' '}and <PageLink to="/privacy">Privacy Policy</PageLink>
          </>
        )}
        .
      </P>
    </LegalPage>
  )
}

export default ChildSafety
