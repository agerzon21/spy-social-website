import { Box, Container, Flex, Heading, Icon, Link as ChakraLink, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FiFlag, FiLogOut, FiMessageCircle, FiSlash } from 'react-icons/fi'
import { InfoTable, type InfoRow } from '../components/legal/InfoTable'
import { B, Bullets, H2, H3, OutLink, P, PageLink, SupportEmail } from '../components/legal/LegalText'
import { UK_SECTION_NUMBER } from '../components/legal/UkOnlineSafety'
import { LEGAL_LAST_UPDATED, LIVE, avatarsLive, photosInUse } from '../lib/legalRelease'

// The safety page (www.spysocial.app/safety): for players 13 to 17, for
// parents and carers, child-safety contacts and support lines (UK Online
// Safety Act records, gap G7; Ofcom's Protection of Children Code F1). It
// says only what the app does today: what depends on a release follows
// src/lib/legalRelease.ts, like the legal pages. Helpline details checked on
// each organization's own site on 2026-10-04.

/** One numbered step with an icon, for the teens' section. */
const Step = ({ n, icon, title, children }: { n: number; icon: IconType; title: string; children: ReactNode }) => (
  <Flex
    w="100%"
    gap={4}
    bg="whiteAlpha.50"
    borderWidth="1px"
    borderColor="whiteAlpha.100"
    borderRadius="lg"
    p={4}
    align="flex-start"
  >
    <Box
      w="40px"
      h="40px"
      borderRadius="lg"
      bg="blue.500"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      aria-hidden
    >
      <Icon as={icon} color="white" boxSize={5} />
    </Box>
    <Box>
      <Text fontSize="sm" fontWeight="600" color="white" mb={1}>
        {n}. {title}
      </Text>
      <Text fontSize="sm" lineHeight="1.8">
        {children}
      </Text>
    </Box>
  </Flex>
)

/** A highlighted box, like the Terms' short version. */
const Callout = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box w="100%" bg="whiteAlpha.50" borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="md" p={4}>
    <Text fontSize="sm" lineHeight="1.8" color="whiteAlpha.800" fontWeight="600" mb={1}>
      {title}
    </Text>
    {children}
  </Box>
)

const Safety: React.FC = () => {
  const photos = photosInUse(LIVE)
  const avatars = avatarsLive(LIVE)

  const names = avatars
    ? photos
      ? 'a display name, a username and an avatar built from parts the app offers. Versions of the app before 2.2 can still add a profile photo.'
      : "a display name, a username and an avatar built from parts the app offers. Players can't add photos."
    : 'a display name, a username and an optional profile photo.'

  const childSafety: InfoRow[] = [
    {
      label: 'A child is in danger right now',
      cells: [
        <>
          Call the police: <B>999</B> in the UK, <B>911</B> in the US, <B>112</B> in the EU, or your local emergency
          number. Do this first, before anything else on this page.
        </>,
      ],
    },
    {
      label: 'NCMEC CyberTipline',
      note: 'Child sexual exploitation, from any country',
      cells: [
        <>
          Report online at <OutLink href="https://report.cybertip.org">report.cybertip.org</OutLink>, or call
          1-800-843-5678 (1-800-THE-LOST), any time. Run by the National Center for Missing &amp; Exploited Children.
        </>,
      ],
    },
    {
      label: 'CEOP',
      note: 'In the UK',
      cells: [
        <>
          If you're worried about online sexual abuse, or about the way someone has been talking to a child online,
          report it to CEOP, part of the National Crime Agency:{' '}
          <OutLink href="https://www.ceop.police.uk/Safety-Centre/">ceop.police.uk/Safety-Centre</OutLink>. Young people
          can report too, and a Child Protection Advisor reads every report.
        </>,
      ],
    },
    {
      label: 'SpySocial',
      cells: [
        <>
          Report the player in the app and choose <B>Child Safety</B>, and email <SupportEmail subject="Child safety" />{' '}
          with "Child safety" in the subject. We remove the content, ban the accounts involved, and report it to NCMEC and
          other authorities as the law requires.
        </>,
      ],
    },
  ]

  const helplines: InfoRow[] = [
    {
      label: 'Childline',
      note: 'UK, for anyone under 19',
      cells: [
        <>
          Call <B>0800 1111</B>, free, any time, or chat with a counsellor online at{' '}
          <OutLink href="https://www.childline.org.uk">childline.org.uk</OutLink>. Calls don't show on your phone bill.
        </>,
      ],
    },
    {
      label: 'Samaritans',
      note: 'UK and Ireland, any age',
      cells: [
        <>
          Call <B>116 123</B>, free, any time, day or night (
          <OutLink href="https://www.samaritans.org">samaritans.org</OutLink>).
        </>,
      ],
    },
    {
      label: '988 Suicide & Crisis Lifeline',
      note: 'US',
      cells: [
        <>
          Call or text <B>988</B>, or chat at <OutLink href="https://988lifeline.org">988lifeline.org</OutLink>, free, any
          time.
        </>,
      ],
    },
    {
      label: 'Find A Helpline',
      note: 'Every other country',
      cells: [
        <>
          <OutLink href="https://findahelpline.com">findahelpline.com</OutLink> finds free, confidential helplines in more
          than 175 countries, by phone, text or chat.
        </>,
      ],
    },
  ]

  return (
    <Box flex="1" color="whiteAlpha.700" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={5} align="start">
          <Box>
            <Heading as="h1" size="lg" color="white" mb={2}>
              Safety at SpySocial
            </Heading>
            <Text fontSize="xs" color="whiteAlpha.400">
              Last updated: {LEGAL_LAST_UPDATED}
            </Text>
          </Box>

          <P>
            SpySocial is a party game for players 13 and older. This page is for teens who play it, and for parents and
            carers who want to know what it's like. Jump to:{' '}
            <ChakraLink href="#teens" color="blue.300">players 13 to 17</ChakraLink>,{' '}
            <ChakraLink href="#parents" color="blue.300">parents and carers</ChakraLink>,{' '}
            <ChakraLink href="#child-safety" color="blue.300">child safety contacts</ChakraLink>,{' '}
            <ChakraLink href="#help" color="blue.300">places to get help</ChakraLink>.
          </P>

          <Callout title="Is someone in danger right now?">
            <Text fontSize="sm" lineHeight="1.8">
              Call your local emergency number: 999 in the UK, 911 in the US, 112 in the EU. Then report it to us.
            </Text>
          </Callout>

          <H2 id="teens">For players 13 to 17</H2>
          <P>
            SpySocial should be fun. If someone makes you feel uncomfortable, scared or upset, you can do something about
            it straight away, and you won't be in trouble for it.
          </P>
          <VStack spacing={3} w="100%" align="stretch">
            <Step n={1} icon={FiLogOut} title="Leave">
              You can always leave a room or a game: tap <B>Leave</B>. Your safety matters more than any game.
              {LIVE.playOnline &&
                ' In Play Online, leaving a game that has started gives you a short break from public games. Leave anyway, and report the player if they were the reason.'}
            </Step>
            <Step n={2} icon={FiSlash} title="Block">
              Long-press the player and tap <B>Block</B>. You won't see their chat, and neither of you can join a room the
              other is in. They aren't told. You can unblock them any time in Account, under Blocked Players.
            </Step>
            <Step n={3} icon={FiFlag} title="Report">
              Long-press the player, or something they wrote in the chat, and tap <B>Report</B>. Pick what happened, add
              details if you like, and send. We attach the chat for you, so you don't need screenshots.
            </Step>
            <Step n={4} icon={FiMessageCircle} title="Tell someone">
              Talk to a parent, a carer, a teacher or another adult you trust. If you'd rather talk to someone you don't
              know, the <ChakraLink href="#help" color="blue.300">helplines below</ChakraLink> are free and confidential.
            </Step>
          </VStack>

          <H3>What happens after you report</H3>
          <Bullets>
            <ListItem>A person, not a robot, reads every report within 24 hours. Reports about child safety, self-harm, sexual content or personal information are read first.</ListItem>
            <ListItem>The player you report isn't told who reported them.</ListItem>
            <ListItem>If they broke the rules, we may warn them, mute their chat, pause them from public rooms, or ban them.</ListItem>
            <ListItem>We don't send you the outcome, but every report is read and acted on.</ListItem>
            <ListItem>Bluffing and lying about your role are part of the game, so they're not something to report.</ListItem>
          </Bullets>

          <H3>It's never OK if someone</H3>
          <Bullets>
            <ListItem>asks how old you are, where you live or which school you go to</ListItem>
            <ListItem>asks for photos, or for your phone number or social media, or to talk in another app</ListItem>
            <ListItem>talks about sex, or sends sexual messages or drawings</ListItem>
            <ListItem>offers you gifts or money, or asks you to keep a secret</ListItem>
            <ListItem>tells you to hurt yourself, or bullies you</ListItem>
          </Bullets>
          <P>
            Block them, report them (choose <B>Child Safety</B> if they're asking for photos, sexual talk or meeting up),
            and tell an adult you trust. Keep your real name, address, school, phone number and social media to yourself,
            and never share your password: nobody from SpySocial will ever ask for it.
          </P>

          <H2 id="parents">For parents and carers</H2>
          <P>
            SpySocial is a party game of bluffing and deduction: one or more players are secretly spies, and everyone tries
            to work out who. Each player uses their own phone, in the same room or far apart. Teens need a parent's or
            guardian's permission to play (see our <PageLink to="/terms">Terms of Service</PageLink>, section 2).
          </P>

          <H3>What SpySocial has</H3>
          <Bullets>
            <ListItem>
              <B>Text chat inside a room:</B> the room's chat, the game chat, a private chat for the spies when a game has
              more than one, and a chat for players who are out. Chat is deleted about 24 hours after it's sent in a
              private room, and 14 days after in a public room.
            </ListItem>
            <ListItem>
              <B>Spy Sketch:</B> players take turns drawing with a finger.
            </ListItem>
            <ListItem>
              <B>Names and pictures:</B> {names}
            </ListItem>
            <ListItem>
              <B>Private rooms:</B> only people with the room's code, link or QR code can join, and the host can remove a
              player.
            </ListItem>
            <ListItem>
              <B>Public rooms and events</B> with players your child doesn't know
              {LIVE.playOnline ? ', including Play Online, which seats players at a table automatically' : ''}.
            </ListItem>
            {LIVE.purchases && (
              <ListItem>
                <B>Things to buy:</B> packs and memberships, through the App Store or Google Play.
              </ListItem>
            )}
          </Bullets>

          <H3>What SpySocial doesn't have</H3>
          <Bullets>
            <ListItem>
              No direct messages: players can only chat inside a room, with the players in it. The spies' chat lasts one
              game and is filtered, stored and reportable like the rest.
            </ListItem>
            <ListItem>No friend or follower lists, no player search, no profiles to browse and no bios, so nobody can look your child up or contact them outside a room.</ListItem>
            <ListItem>
              No voice or video chat: the microphone button only turns speech into text, and other players never hear
              anyone's voice.{photos ? '' : ' No photo or video uploads either.'}
            </ListItem>
            <ListItem>No location sharing and no ads.</ListItem>
          </Bullets>

          <H3>How we keep it safe</H3>
          <Bullets>
            <ListItem>
              <B>Age:</B> SpySocial is for players 13 and older.
              {LIVE.ageGateEveryone &&
                ` Before the first game, the app asks for a birth year${LIVE.under13Deletion ? ', and an answer under 13 deletes the account' : ''}.`}
              {LIVE.storeAgeSignals &&
                " If Apple or Google tells the app that its user is under 13, the app doesn't let them play."}{' '}
              We don't verify ages, so if you find that a child under 13 has an account, email us and we'll delete it.
            </ListItem>
            <ListItem>
              <B>Public rooms</B> need a saved account with a confirmed email address, an age of 13 or older and agreement
              to our Community Rules. Guests can play only in private rooms, and players with a pause or a ban can't join
              public rooms.
            </ListItem>
            <ListItem>
              <B>Chat filter:</B> names and chat are checked before anyone sees them. In public rooms, slurs, explicit
              sexual words and insults are blocked, and so are links, email addresses and phone numbers. In private rooms,
              the most serious words are blocked.
            </ListItem>
            <ListItem>
              <B>Reports, blocks and penalties:</B> a person reads every report within 24 hours, and the reported player
              isn't told who sent it. Penalties go from a warning to a chat mute, a pause from public rooms, or a ban. Our{' '}
              <PageLink to="/rules">Community Rules</PageLink> list what isn't allowed.
            </ListItem>
            {LIVE.drawingCheck && (
              <ListItem>
                <B>Drawing check:</B> every drawing turn in a public room is checked automatically, and a turn that breaks
                the rules is taken off the drawing.
              </ListItem>
            )}
          </Bullets>

          {LIVE.purchases && (
            <>
              <H3>Buying</H3>
              <P>
                Teens need a parent's or guardian's permission to buy anything. Purchases go through the App Store or
                Google Play, so their parental controls, such as Apple's Ask to Buy and purchase approvals in Google Family
                Link, work as usual. A Pack Pass renews until it's cancelled in the store's settings.
              </P>
            </>
          )}

          <H3>Deleting an account</H3>
          <OrderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem>Open SpySocial.</ListItem>
            <ListItem>
              Tap the {avatars ? 'avatar' : 'picture'} at the top of the home screen to open <B>Account</B>.
              {LIVE.oldAppsInUse && ' (In versions before 2.2, Account is the icon at the bottom right of the home screen.)'}
            </ListItem>
            <ListItem>
              Scroll to the <B>Danger Zone</B> and tap <B>Delete Account</B>. A guest account is deleted with <B>Sign Out</B>
              instead (in Account, under Sign-In).
            </ListItem>
          </OrderedList>
          <P>
            Or email <SupportEmail subject="Delete my SpySocial account" /> from the address on the account, with the
            subject "Delete my SpySocial account". If you can't write from that address, email us anyway with the
            username and we'll help. Our <PageLink to="/delete-account">Delete Account</PageLink> page says what's deleted
            and what we keep.
          </P>

          <H3>Contact us</H3>
          <P>
            Email <SupportEmail /> about anything on this page. For anything about a child's safety, put "Child safety" in
            the subject and we'll deal with it first. To appeal a decision or make a complaint, including about how we
            meet the UK's Online Safety Act, see section {UK_SECTION_NUMBER} of our{' '}
            <PageLink to="/terms">Terms of Service</PageLink>.
          </P>

          <H2 id="child-safety">Child safety contacts</H2>
          <InfoTable head={['Who', 'How']} rows={childSafety} firstWidth="30%" />

          <H2 id="help">Places to get help</H2>
          <P>
            If you're struggling, or you're worried about someone, these services are free and confidential, and you can
            talk to them about anything.
          </P>
          <InfoTable head={['Who', 'How']} rows={helplines} firstWidth="30%" />

          <P>
            See also our <PageLink to="/rules">Community Rules</PageLink>,{' '}
            <PageLink to="/terms">Terms of Service</PageLink> and <PageLink to="/privacy">Privacy Policy</PageLink>.
          </P>
        </VStack>
      </Container>
    </Box>
  )
}

export default Safety
