import { Box, Container, Heading, Text, VStack, HStack, Badge, Stack, Icon } from '@chakra-ui/react'
import { FaWandSparkles, FaPalette, FaWrench, FaBug, FaGears } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

interface BulletItem {
  title?: string
  text: string
}

interface Section {
  label: string
  icon: IconType
  accent: string
  items: BulletItem[]
}

interface Release {
  version: string
  date: string
  tag?: string
  summary: string
  sections: Section[]
}

const releases: Release[] = [
  {
    version: '2.0.0',
    date: 'April 30, 2026',
    tag: 'Major Update',
    summary:
      'A full rebuild of the multiplayer experience: every screen has been redesigned, the realtime engine has been rewritten for stability, and a stack of new features lands together.',
    sections: [
      {
        label: 'New Features',
        icon: FaWandSparkles,
        accent: 'blue.300',
        items: [
          { title: 'Tutorial & profile setup', text: 'First-time players are walked through the game and prompted to set up their profile.' },
          { title: 'In-game Notebook', text: 'Jot down notes about who said what during the round. Players are smart-sorted: active players with notes first, then other active players, then eliminated players last.' },
          { title: 'Hint translation', text: 'When your UI language differs from the game language, tap a hint to see the same question in your language. Hints stay in the game language so every player at the table reads the same prompt.' },
          { title: 'Player pokes', text: "Tap a teammate's card in the lobby to send them a poke." },
          { title: 'QR-code sharing', text: 'Share rooms via a native share sheet with a scannable QR code.' },
          { title: 'Universal links', text: 'spysocial.app/join/<code> opens the app and drops you straight into the room (with cold-launch handling).' },
          { title: '5-character room codes', text: 'Shorter codes that are easier to share verbally. Legacy 6-character codes still work.' },
          { title: 'Reveal Vote Caller', text: 'Lobby setting to optionally show who triggered the vote.' },
          { title: 'Host End Game', text: 'Hosts can now end a game early.' },
          { title: 'Extra 1 location pack', text: 'A new batch of locations to play with.' },
          { title: 'In-game Leave button', text: 'Quick exit from active games without backing all the way out.' },
        ],
      },
      {
        label: 'Visual Revamp',
        icon: FaPalette,
        accent: 'purple.300',
        items: [
          { text: 'Lobby UI completely modernized with interactive player cards.' },
          { text: 'Lobby settings screen redesigned (with a reusable PickerModal under the hood).' },
          { text: 'Game screen redesigned.' },
          { text: 'Voting screen redesigned with a vote-caller display and progress UI.' },
          { text: 'Vote results screen redesigned, with standardized results / eliminated UX.' },
          { text: "Role-reveal phase polished — shows waiting players' names, extended to 60 seconds." },
          { text: 'Home cards now auto-fit text; refresh button slimmed down.' },
          { text: 'All in-game screens now share the same dark-navy header (Solve and Solve Results no longer use white/transparent variants).' },
          { text: 'Offline banner standardized across every screen — consistent height, safe-area aware, no longer crashes into the Dynamic Island.' },
          { text: 'Account screen has a polished offline empty state with a cloud-offline icon.' },
        ],
      },
      {
        label: 'Improvements',
        icon: FaWrench,
        accent: 'teal.300',
        items: [
          { title: 'Network resilience overhaul', text: 'Fixes a long-standing iOS quirk where NetInfo could lie ("offline") after a long background sleep, leaving screens stuck in reconnect states even though the network was actually fine. The shared useNetwork hook now verifies any "offline" claim with a real HTTP probe to Supabase; all in-game and pre-game screens consume this same hook.' },
          { text: "The Play screen now trusts actual fetch results over NetInfo's stale state, retries automatically every 5 seconds while offline, serializes concurrent fetches, and never falsely shows the logged-out fallback when the user is merely offline." },
          { text: 'Realtime sync stability hardened across every phase (lobby, role reveal, game, voting, results).' },
          { text: 'Game timer is now server-synced — clock drift fixed.' },
          { text: 'Stronger offline handling and reconnection logic.' },
          { text: 'Auth & login flows tightened: signup hardening, reset-password flow, and the guest-upgrade flow.' },
          { text: 'Account screen polish with a redesigned snackbar messaging system.' },
          { text: 'Full translation parity across English, Spanish, and Russian (171 hint suggestions per language, indexed by stable position so future translation features just work).' },
          { text: 'Notebook UX: keyboard no longer pops automatically when selecting a player; sheet sizes itself appropriately.' },
          { text: 'Hint drawer: tapping the hint sentence no longer accidentally re-rolls the hint — the dedicated reload icon is the only way to refresh.' },
          { text: 'iOS 26 compatibility — opted out of the Liquid Glass capsule on header bar items.' },
          { text: 'Header consolidated into a shared useGameScreenHeader hook for consistency across screens.' },
          { text: 'Production logging stripped from release builds.' },
        ],
      },
      {
        label: 'Bug Fixes',
        icon: FaBug,
        accent: 'red.300',
        items: [
          { text: 'Fixed vote / end-of-game race condition.' },
          { text: 'Fixed double-tally and timer-end edge cases on votes.' },
          { text: 'Fixed Plurality tally vs. abstain handling; abstain now pinned to the action dock.' },
          { text: 'Fixed solve-results header overlap (body crashing into transparent header).' },
          { text: 'Fixed animation initial-state bleed-through on the game screen.' },
          { text: 'Fixed Reanimated render-write warnings on the voting screen.' },
          { text: 'Fixed guest-upgrade flow that was unintentionally signing the guest out.' },
          { text: 'Fixed Account email field.' },
          { text: 'Fixed home-card text truncation and Spanish header trims.' },
        ],
      },
      {
        label: 'Technical',
        icon: FaGears,
        accent: 'gray.300',
        items: [
          { text: 'Migrated state management to useRoom and useGame hooks.' },
          { text: 'Flattened routing — dropped the (tabs) route group in favor of flat routes.' },
          { text: 'Pinned react-native-screens to ~4.18 for expo-router 6.0.23 compatibility.' },
          { text: 'Realtime publication fix on the Supabase side.' },
          { text: 'Question suggestions restructured into parallel translation triples ({ en, es, ru }) — single source of truth.' },
          { text: 'Removed deprecated Expo schema fields (privacy, privacyPolicyUrl, termsOfServiceUrl); privacy/terms URLs are owned by App Store Connect.' },
        ],
      },
    ],
  },
  {
    version: '1.0.1',
    date: 'May 16, 2025',
    tag: 'Initial Release',
    summary: 'First public release of SpySocial on the App Store.',
    sections: [],
  },
]

const SectionBlock = ({ section }: { section: Section }) => (
  <Box>
    <HStack spacing={3} mb={4}>
      <Box
        w="32px"
        h="32px"
        borderRadius="lg"
        bg="whiteAlpha.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={section.icon} color={section.accent} boxSize={4} />
      </Box>
      <Text fontSize="sm" fontWeight="600" textTransform="uppercase" letterSpacing="0.08em" color={section.accent}>
        {section.label}
      </Text>
    </HStack>
    <Stack spacing={2.5} pl={1}>
      {section.items.map((item, idx) => (
        <HStack key={idx} align="flex-start" spacing={3}>
          <Box w="6px" h="6px" mt="9px" borderRadius="full" bg="whiteAlpha.300" flexShrink={0} />
          <Text fontSize="sm" color="whiteAlpha.700" lineHeight="1.7">
            {item.title && (
              <Text as="span" color="white" fontWeight="600">
                {item.title}
              </Text>
            )}
            {item.title && ' — '}
            {item.text}
          </Text>
        </HStack>
      ))}
    </Stack>
  </Box>
)

const ReleaseBlock = ({ release, isFirst }: { release: Release; isFirst: boolean }) => (
  <MotionBox
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    bg="whiteAlpha.50"
    borderRadius="2xl"
    border="1px solid"
    borderColor="whiteAlpha.100"
    p={{ base: 6, md: 8 }}
    position="relative"
    overflow="hidden"
  >
    {isFirst && (
      <Box
        position="absolute"
        top="-100px"
        right="-100px"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="blue.500"
        opacity={0.06}
        filter="blur(80px)"
        pointerEvents="none"
      />
    )}

    <VStack spacing={6} align="stretch" position="relative">
      <Box>
        <HStack spacing={3} mb={2} flexWrap="wrap">
          <Heading as="h2" size="lg" color="white" fontWeight="700" letterSpacing="-0.02em">
            v{release.version}
          </Heading>
          {release.tag && (
            <Badge
              bg="blue.500"
              color="white"
              fontSize="2xs"
              textTransform="uppercase"
              letterSpacing="0.08em"
              px={2}
              py={0.5}
              borderRadius="md"
              fontWeight="600"
            >
              {release.tag}
            </Badge>
          )}
        </HStack>
        <Text fontSize="xs" color="whiteAlpha.400" mb={4}>
          {release.date}
        </Text>
        <Text fontSize="md" color="whiteAlpha.700" lineHeight="1.7">
          {release.summary}
        </Text>
      </Box>

      {release.sections.length > 0 && (
        <VStack spacing={6} align="stretch" pt={2}>
          {release.sections.map((section, idx) => (
            <SectionBlock key={idx} section={section} />
          ))}
        </VStack>
      )}
    </VStack>
  </MotionBox>
)

const WhatsNew = () => {
  return (
    <Box flex="1" pt={{ base: 12, md: 20 }} pb={{ base: 12, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={10} align="stretch">
          <VStack spacing={3} textAlign="center">
            <Heading as="h1" size="xl" color="white" fontWeight="600" letterSpacing="-0.02em">
              What's New
            </Heading>
            <Text fontSize="md" color="whiteAlpha.500" maxW="500px">
              Release notes for SpySocial. Major updates, new features, and improvements as we ship them.
            </Text>
          </VStack>

          <VStack spacing={6} align="stretch">
            {releases.map((release, idx) => (
              <ReleaseBlock key={release.version} release={release} isFirst={idx === 0} />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default WhatsNew
