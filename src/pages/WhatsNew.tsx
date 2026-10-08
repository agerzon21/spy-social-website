import { Box, Container, Heading, Text, VStack, HStack, Badge, Stack, Icon } from '@chakra-ui/react'
import {
  FaWandSparkles,
  FaPalette,
  FaWrench,
  FaBug,
  FaGears,
  FaRocket,
  FaAndroid,
  FaComments,
  FaTrophy,
  FaShieldHalved,
} from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { motion } from 'framer-motion'
import { LIVE, avatarsLive } from '../lib/legalRelease'

const MotionBox = motion(Box)

interface BulletItem {
  title?: string
  text: string
  /** false hides the line (a feature whose switch in src/lib/legalRelease.ts is still off). */
  show?: boolean
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
  /** false hides the whole release (one that isn't out yet). */
  show?: boolean
}

// SpySocial 2.2. Like the legal pages, this entry follows src/lib/legalRelease.ts, so it never announces
// something the launch switches haven't turned on: the entry shows from the 2.2 launch (website Update 1,
// which turns the avatar creator on with the rest; avatarsLive), and each line about a switched feature
// shows only while its switch is on. Play Online stays out while the owner keeps it a closed beta
// (playOnline false), reporting a drawing while the drawing check is off (the Terms and the Rules do the
// same), buying while purchases is off. Spy Sketch is never said to be played online (public Sketch opens
// only with the drawing check). The wording follows the stores' 2.2 What's New (handoff
// store-pack/listing.md, blocks W-EN and R-ALL); "Noir" is the avatar style's internal name, the app says
// Your Agent.
const V2_2_DATE = 'November 10, 2026' // the launch day; if the launch moves, change it here
const V2_2_OUT = avatarsLive(LIVE)

const reportWhat = [
  'a player',
  ...(LIVE.messageReports ? ['a message'] : []),
  ...(LIVE.drawingCheck ? ['a drawing'] : []),
]
const reportList =
  reportWhat.length > 1 ? `${reportWhat.slice(0, -1).join(', ')} or ${reportWhat[reportWhat.length - 1]}` : reportWhat[0]

const releases: Release[] = [
  {
    version: '2.2.0',
    date: V2_2_DATE,
    tag: 'Biggest Update Yet',
    show: V2_2_OUT,
    summary: `SpySocial 2.2 is our biggest update yet: ${
      LIVE.playOnline ? 'Play Online, ' : ''
    }Spy Sketch, chat with translation in 10 languages, your own spy avatar, and a new look on every screen.`,
    sections: [
      {
        label: 'New Ways to Play',
        icon: FaWandSparkles,
        accent: 'blue.300',
        items: [
          { title: 'Spy Sketch', text: 'A new way to play: draw the secret word on one shared whiteboard and catch the spies faking it.' },
          {
            title: 'Play Online',
            show: LIVE.playOnline,
            text: 'Tap Find a Game for a table of 4 or 8 players with standard rules. When a match is found, everyone taps Ready; after the game, Find Another Game starts a new search. Play Online needs a free account.',
          },
          {
            title: 'Private Room',
            text: LIVE.qrScanner
              ? 'Create a room for your friends, or join theirs by scanning its QR code right in the app.'
              : 'Create a room for your friends, with your own rules and packs.',
          },
          {
            title: 'Game nights',
            text: LIVE.notifications
              ? "Scheduled online games. Tap Remind Me and we'll remind you before they start."
              : 'Scheduled online games.',
          },
          { title: 'Spy Mafia', text: 'The spies now share a secret chat.' },
        ],
      },
      {
        label: 'Chat and Languages',
        icon: FaComments,
        accent: 'teal.300',
        items: [
          {
            title: 'Chat',
            text: `Chat in the lobby and during the game, with translation for every message.${
              LIVE.onDeviceTranslation ? " If our translation service can't answer, your phone translates by itself." : ''
            } Speak instead of typing: the mic turns what you say into text.`,
          },
          {
            title: '10 languages',
            text: `SpySocial now speaks English, Spanish, Russian, French, Brazilian Portuguese, Simplified Chinese, Hindi, Arabic, Bengali and Indonesian${
              LIVE.onePool
                ? ', and every player sees the game in their own language, the secret and the hints included, so friends who speak different languages can play together'
                : ''
            }.`,
          },
        ],
      },
      {
        label: 'Packs and Progress',
        icon: FaTrophy,
        accent: 'orange.300',
        items: [
          { title: 'XP, levels and achievements', text: 'Earn XP as you play, level up and unlock achievements.' },
          {
            title: 'Reworked packs',
            text: 'Every pack is marked Easy, Medium or Hard, and every location and word has a one-line description. The hints now offer 188 questions.',
          },
          {
            title: 'Packs and membership',
            show: LIVE.purchases,
            text: 'Free packs for everyone, plus premium packs, bundles, the Pack Pass (monthly or yearly) and Lifetime as optional in-app purchases. Two new Hard packs come with All Packs, the Pack Pass and Lifetime. When anyone in a private room has a pack, everyone in that room can play it, and members get bonus XP and a badge frame.',
          },
          {
            title: 'Shop',
            show: LIVE.purchases,
            text: 'Packs, membership, avatar items and celebrations in one place. Avatar items and celebrations are cosmetic only: they change how you look, never how you play.',
          },
        ],
      },
      {
        label: 'Make It Yours',
        icon: FaPalette,
        accent: 'purple.300',
        items: [
          { title: 'Your Agent', text: 'Profile photos are gone: make your own spy avatar instead.' },
          {
            title: 'Celebrations',
            text: `A moment that plays full screen when you guess the secret as the spy, or call the vote that catches one. Earn some by playing${
              LIVE.purchases ? ', and find more in the Shop' : ''
            }.`,
          },
          { title: 'A new look', text: "Every screen is new, with new moments for votes, the spy's guess and the end of the game." },
          {
            title: 'Out of the game?',
            text: 'Chat with the other players who are out (Ghost Chat), name who you think the spy is (Call It), or play a quick mini-game while the game finishes.',
          },
        ],
      },
      {
        label: 'Accounts and Safety',
        icon: FaShieldHalved,
        accent: 'green.300',
        items: [
          { title: 'Sign in with Apple or Google', show: LIVE.socialSignIn, text: 'Sign in with Apple on iPhone and iPad, or with Google.' },
          {
            title: 'Ages 13 and up',
            show: LIVE.ageGateEveryone,
            text: 'SpySocial is now for ages 13 and up: everyone confirms their birth year before their first game.',
          },
          {
            title: 'Report and block',
            text: `${reportWhat.length > 1 ? `Report ${reportList}, and block players.` : 'Report and block players.'} Chat has a word filter.`,
          },
        ],
      },
    ],
  },
  {
    version: '2.1.1',
    date: 'June 13, 2026',
    tag: 'Android Launch',
    summary:
      'SpySocial is officially live on the Google Play Store — the first public production release on Android, paired with pre-launch polish from closed-test QA on real Android devices.',
    sections: [
      {
        label: 'Now Available',
        icon: FaRocket,
        accent: 'orange.300',
        items: [
          { title: 'Android 2.1.1', text: 'Live on Google Play as of June 13, 2026.' },
          { title: 'iOS 2.1.1', text: 'Same fixes, submitted to App Store Connect.' },
        ],
      },
      {
        label: 'Pre-launch Polish',
        icon: FaWrench,
        accent: 'teal.300',
        items: [
          { title: 'Delete Account button no longer clipped', text: 'The Account screen content now respects the device safe-area bottom inset and reserves room for the unsaved-changes snackbar — Google Play requires in-app account deletion to be reachable.' },
          { title: 'Lobby Leave Room / Start Game buttons', text: 'Now sit above the Android gesture-nav bar via dynamic safe-area insets.' },
          { title: 'Start Game feedback', text: "Now surfaces what's missing (need 3+ players, all-ready, at least one category) when prerequisites aren't met. Previously the button was hard-disabled with no feedback." },
          { title: 'Categories screen', text: 'Back control and "Categories & Locations" title no longer crowd each other. Back button is icon-only on Android (Material convention); title font size trimmed.' },
          { title: 'How to Play modal', text: "Duplicate back button on Android removed (the modal's close X and the inherited stack back button were both rendering)." },
          { title: 'Onboarding tutorial', text: 'Skip is now reachable on every step, not just the first slide.' },
          { title: 'Guest sign-up banner', text: 'Reframed as an invitation ("Unlock Your Full Account") with a sparkles icon and a clear CTA button — was previously styled like a system warning, which felt discouraging.' },
          { title: 'Game results & How to Play screens', text: 'Emojis replaced with Ionicons / FontAwesome glyphs. Emojis render inconsistently across Android vendors; vector icons stay consistent.' },
        ],
      },
      {
        label: 'Infrastructure',
        icon: FaGears,
        accent: 'gray.300',
        items: [
          { text: 'expo-updates now installed and configured against the EAS project. Future JS-only fixes can ship via over-the-air updates without going through Play Store / App Store review.' },
        ],
      },
    ],
  },
  {
    version: '2.1.0',
    date: 'May 15, 2026',
    tag: 'Polish Update',
    summary:
      'A polish release: a redesigned Welcome screen, refreshed Game Over and Account screens, iPad layout improvements, and a stack of stability and quality fixes under the hood.',
    sections: [
      {
        label: 'New Features',
        icon: FaWandSparkles,
        accent: 'blue.300',
        items: [
          { title: 'Welcome screen redesign', text: 'New layered surface with a soft sky-blue gradient and faint spy-themed background details (radar rings, crosshair), an orange "SOCIAL DEDUCTION" eyebrow pill, a tagline beneath the logo, icon-prefixed Login / Sign Up buttons, an OR divider, and a lightweight "Continue as Guest" link. Version badge is now a subtle pill at the bottom of the screen.' },
          { title: 'Account "confirmation pending" flow', text: 'When a guest upgrades to a full account, the Account screen now shows a clear pending state with Resend / Cancel / Refresh actions so they know exactly where they are in the email-confirm process.' },
        ],
      },
      {
        label: 'Visual Revamp',
        icon: FaPalette,
        accent: 'purple.300',
        items: [
          { title: 'Game Over screen redesigned', text: 'Single-surface player cards with a soft gradient and left-edge color accent, a trophy hero with a glow halo, gold-accented winning-team sections, location card with a map-pin icon, and a sky-blue gradient "Return to Lobby" footer button.' },
          { title: 'Account screen redesign', text: 'Single cohesive list, consistent uppercase section headers across every group (Profile, Preferences, Account & Security, Support & Legal, Danger Zone), iOS-Settings-style menu rows for Support / Legal, Danger Zone moved to the bottom.' },
          { title: 'iPad UI polish', text: 'Lobby player cards in 6 columns (was 3), role-reveal card capped at 420pt, larger in-game player tiles (140×178) with a taller container so the third row never clips, notebook column auto-sizes to the role card, home/play deck row sized for iPad with larger HomeCard typography.' },
        ],
      },
      {
        label: 'Android-Specific Fixes',
        icon: FaAndroid,
        accent: 'green.300',
        items: [
          { title: 'Back-gesture guard', text: "The Android-10+ system back swipe (and the hardware back button) now route through the same Leave confirmation dialog as tapping the header's Leave button. Previously, Android users could swipe back out of an in-game screen or the lobby with zero confirmation; gestureEnabled: false only stops the iOS swipe gesture. Implemented via a shared useBackPressGuard hook combining navigation.addListener('beforeRemove') with BackHandler.hardwareBackPress." },
          { title: '"Box-in-box" rendering artifact', text: "Android's compositor was rendering a visible inner edge inside every vote / vote-results / game-over card. Root cause: translucent rgba background + translucent hairline border + borderRadius + overflow:hidden — the rounded clip layer's own edge was showing through the semi-transparent border. Fixed across VotePlayerRow, VoteResultRankCard, VoteOutcomeCard, and the game-over player card." },
          { title: 'Game Over header gap', text: "The screen's SafeAreaView was double-counting the top inset on top of the Stack header, leaving a visible strip of the GameBackground gradient between the header and where scroll content started clipping. Now scoped to ['bottom','left','right'], matching the voting / vote_results screens." },
          { title: 'WheelPicker', text: 'Pure-JS replacement for @react-native-picker/picker. The native picker silently ignores itemStyle on Android (which made our white-text styling render as unreadable black-on-dark) and has long-standing NullPointerException crashes during dismissal — both upstream library bugs. The replacement renders identical UX on both platforms via a ScrollView + snap-to-interval.' },
        ],
      },
      {
        label: 'Improvements',
        icon: FaWrench,
        accent: 'teal.300',
        items: [
          { title: 'Server-synced clock', text: 'Every "seconds remaining" computation now subtracts a measured offset against the server clock (via a new server_now() Postgres function) instead of trusting the device clock. Fixes occasional nonsense countdown values on devices with imperfect time sync.' },
          { title: 'Auth flows consolidated', text: 'Signup, resend confirmation, password reset, and email change all dispatch through a single Edge Function with a shared client wrapper, removing the drift risk across the four UI call sites. New migrations add an idempotency key to signup, extend auth_attempts to cover the additional flow kinds, and add a cancel-email-change RPC.' },
          { title: 'Account: mailto fallback', text: 'Support / Legal email rows now copy the address to the clipboard with a friendly alert when no mail client is configured, instead of throwing an unhandled error.' },
          { text: 'Translation parity maintained across English, Spanish, and Russian for all new keys (welcome eyebrow / tagline, account upgrade-pending strings, etc).' },
        ],
      },
      {
        label: 'Technical',
        icon: FaGears,
        accent: 'gray.300',
        items: [
          { text: 'tsconfig.json now excludes supabase/functions/** — those are Deno Edge Function files with a different module resolution target.' },
          { text: 'Version bumped to 2.1.0; iOS build number incremented for App Store submission.' },
        ],
      },
    ],
  },
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
      {section.items.filter((item) => item.show !== false).map((item, idx) => (
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

const ReleaseBlock = ({ release, isFirst }: { release: Release; isFirst: boolean }) => {
  // A section whose every line is switched off isn't shown.
  const sections = release.sections.filter((section) => section.items.some((item) => item.show !== false))
  return (
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

        {sections.length > 0 && (
          <VStack spacing={6} align="stretch" pt={2}>
            {sections.map((section, idx) => (
              <SectionBlock key={idx} section={section} />
            ))}
          </VStack>
        )}
      </VStack>
    </MotionBox>
  )
}

const WhatsNew = () => {
  return (
    <Box flex="1" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
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
            {releases.filter((release) => release.show !== false).map((release, idx) => (
              <ReleaseBlock key={release.version} release={release} isFirst={idx === 0} />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default WhatsNew
