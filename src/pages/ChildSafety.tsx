import { Box, Container, Heading, Link as ChakraLink, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react'
import { Callout } from '../components/legal/Callout'
import { ChildSafetyContacts } from '../components/legal/ChildSafetyContacts'
import { B, Bullets, H2, H3, P, PageLink, SupportEmail } from '../components/legal/LegalText'
import { UK_SECTION_NUMBER } from '../components/legal/UkOnlineSafety'
import { LEGAL_LAST_UPDATED, LIVE, ONLINE_SAFETY_TEXT, OPERATOR, photosInUse } from '../lib/legalRelease'

// SpySocial's child sexual abuse and exploitation (CSAE) standards
// (www.spysocial.app/child-safety), the page Google Play's Child Safety
// Standards policy asks for (Play Console Help 14747720): published standards
// that prohibit CSAE and name the app and its developer as the Play listing
// does, the in-app way to report, how we deal with CSAM, child safety laws,
// and the child safety point of contact. Every statement comes from the
// Terms (sections 7 and 8), the Community Rules, the Privacy Policy, the UK
// online safety section and the Safety page; what depends on a release
// follows src/lib/legalRelease.ts, like those pages. NCMEC registration as an
// ESP is still pending, so the page says we report to NCMEC as the law
// requires, never that we're registered with it.

/** The day this page first went up. Set it to the day it's published. */
const PUBLISHED = 'October 8, 2026'

/** The later of two "Month D, YYYY" dates: the page changes when it goes up and when a switch it reads flips. */
const later = (a: string, b: string): string => (new Date(a).getTime() >= new Date(b).getTime() ? a : b)

const ChildSafety: React.FC = () => {
  const photos = photosInUse(LIVE)
  const developer = OPERATOR.name ? `, made by ${OPERATOR.name}` : ''

  return (
    <Box flex="1" color="whiteAlpha.700" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={5} align="start">
          <Box>
            <Heading as="h1" size="lg" color="white" mb={2}>
              Child Safety Standards
            </Heading>
            <Text fontSize="xs" color="whiteAlpha.400">
              Last updated: {later(PUBLISHED, LEGAL_LAST_UPDATED)}
            </Text>
          </Box>

          <P>
            SpySocial is a party game for players 13 and older{developer}. These are SpySocial's standards against child
            sexual abuse and exploitation (CSAE): what we prohibit, how to report it, what we do about it, and how to reach
            us. They're part of our <PageLink to="/terms">Terms of Service</PageLink> and{' '}
            <PageLink to="/rules">Community Rules</PageLink>, and they apply everywhere in SpySocial: names,
            {photos ? ' profile photos,' : ''} chat, typed questions and answers, and Spy Sketch drawings, in public and
            private rooms. Jump to:{' '}
            <ChakraLink href="#standards" color="blue.300">what we prohibit</ChakraLink>,{' '}
            <ChakraLink href="#protections" color="blue.300">how SpySocial protects children</ChakraLink>,{' '}
            <ChakraLink href="#report" color="blue.300">how to report</ChakraLink>,{' '}
            <ChakraLink href="#response" color="blue.300">what we do</ChakraLink>,{' '}
            <ChakraLink href="#laws" color="blue.300">child safety laws</ChakraLink>,{' '}
            <ChakraLink href="#contact" color="blue.300">our child safety contact</ChakraLink>.
          </P>

          <Callout title="Is a child in danger right now?">
            <Text fontSize="sm" lineHeight="1.8">
              Call your local emergency number first: 911 in the US, 999 in the UK, 112 in the EU. Then tell us.
            </Text>
          </Callout>

          <H2 id="standards">1. What we prohibit</H2>
          <P>
            We have zero tolerance for child sexual abuse and exploitation. Nobody, of any age, may use SpySocial to:
          </P>
          <Bullets>
            <ListItem>share, ask for or create sexual content involving anyone under 18, in chat, names or drawings, or link to it</ListItem>
            <ListItem>
              groom a child: win a young player's trust in order to sexualize or exploit them, for example by asking how
              old they are, where they live or which school they go to, asking for photos, asking to talk in another app,
              offering gifts or money, or asking them to keep a secret
            </ListItem>
            <ListItem>talk about sex with a minor, or send a minor sexual messages or drawings</ListItem>
            <ListItem>
              sexualize or exploit a child in any other way, such as pressuring or threatening a child for sexual images
              (sextortion), or helping anyone traffic a child
            </ListItem>
          </Bullets>
          <P>
            Anything like this is removed, the accounts involved are banned, and we report it to NCMEC and other authorities as the law requires (see{' '}
            <ChakraLink href="#response" color="blue.300">what we do</ChakraLink>).
          </P>

          <H2 id="protections">2. How SpySocial protects children</H2>
          <Bullets>
            <ListItem>
              <B>Age:</B> SpySocial is for players 13 and older.
              {LIVE.ageGateEveryone &&
                ` Before the first game, the app asks for a birth year${LIVE.under13Deletion ? ', and an answer under 13 deletes the account' : ''}.`}
              {LIVE.storeAgeSignals &&
                " If Apple or Google tells the app that its user is under 13, the app doesn't let them play."}{' '}
              If you find that a child under 13 has an account, email us and we'll delete it.
            </ListItem>
            <ListItem>
              <B>No way to reach a player outside a room:</B> players meet only inside a game room and chat only with the
              players in it. There are no direct messages, no friend or follower lists, no player search and no profiles
              to browse, so nobody can look a player up or contact them afterwards.
            </ListItem>
            <ListItem>
              <B>No voice, video or photo sharing:</B> there's no voice or video chat, and no way to send photos or
              videos.
              {photos
                ? ' Versions of the app before 2.2 let a player add a profile photo, which only shows next to their name.'
                : " The only pictures are Spy Sketch drawings, drawn with a finger during a turn, and avatars built from the parts the app offers."}
            </ListItem>
            <ListItem>
              <B>Rooms:</B> only people with a private room's code, link or QR code can join it, and the host can remove a
              player. Public rooms are only for saved accounts of players 13 or older who have agreed to our Community
              Rules; guests can play only in private rooms, and a player with a pause or a ban can't join public rooms.
            </ListItem>
            <ListItem>
              <B>Chat filter:</B> names and chat are checked before anyone else sees them. In public rooms, explicit sexual
              words are blocked, and so are links, email addresses and phone numbers; in private rooms, the most serious
              words are blocked. Sharing real names, addresses, phone numbers or social media handles is against our
              Community Rules.
            </ListItem>
            <ListItem>
              <B>Evidence:</B> chat is kept on our servers for a while (about 24 hours in a private room, 14 days in a
              public room), so a report comes with the words actually sent.
            </ListItem>
            {LIVE.drawingCheck ? (
              <ListItem>
                <B>Drawing check:</B> every Spy Sketch drawing turn in a public room is checked automatically, and so is a
                drawing reported in a private room. A drawing that sexualizes a child is taken off the board in any room,
                the account is banned with no appeal, and the drawing is reported to NCMEC.
              </ListItem>
            ) : (
              <ListItem>
                <B>Drawings:</B> a person reviews the drawings players report.
              </ListItem>
            )}
          </Bullets>

          <H2 id="report">3. How to report a concern</H2>
          <H3>In the app</H3>
          <OrderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem>
              Long-press the player{LIVE.messageReports ? ', or something they wrote in the chat,' : ''} and tap{' '}
              <B>Report</B>.{LIVE.drawingCheck ? ' You can also report a drawing.' : ''}
            </ListItem>
            <ListItem>
              Choose <B>Child Safety</B> ("Sexual talk with a minor, or a child at risk"), add details if you like, and
              send.
            </ListItem>
            <ListItem>
              To stop seeing their chat, long-press the player again and tap <B>Block</B>.
            </ListItem>
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
          <OrderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem>
              A person reads every report within 24 hours. Reports about child safety are marked urgent and read first.
            </ListItem>
            <ListItem>We take the content down: the message, the drawing or the name.</ListItem>
            <ListItem>
              We ban the accounts involved.
              {LIVE.drawingCheck ? ' A drawing that sexualizes a child ends the account, with no appeal.' : ''}
            </ListItem>
            <ListItem>We keep the evidence the law requires us to keep.</ListItem>
            <ListItem>
              We report it to the National Center for Missing &amp; Exploited Children (NCMEC), as US law requires, or,
              where UK law requires, to the UK's National Crime Agency. If we believe a child's life or safety is at risk,
              we tell the police.
            </ListItem>
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
              ? `SpySocial's child safety point of contact is ${OPERATOR.name}, who runs SpySocial and handles child safety reports. `
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
        </VStack>
      </Container>
    </Box>
  )
}

export default ChildSafety
