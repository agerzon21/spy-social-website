import { Box, Container, Heading, Text, VStack, HStack, Badge, Stack, Icon } from '@chakra-ui/react'
import { FaWandSparkles, FaPalette, FaWrench, FaBug, FaRocket, FaAndroid } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { motion } from 'framer-motion'
import { useLang, useT, type Strings } from '../i18n'
import { formatDate } from '../i18n/rich'
import { LIVE } from '../lib/legalRelease'

const MotionBox = motion(Box)

interface BulletItem {
  title?: string
  text: string
}

interface Section {
  label: string
  icon: IconType
  items: BulletItem[]
}

interface Release {
  version: string
  date: string
  tag?: string
  summary: string
  sections: Section[]
}

/**
 * The releases, newest first: the version, the day (written "June 13, 2026", shown in the page's language) and each
 * section's icon. Their words are the page's language's (src/i18n: whatsNew.releases, same order), in players' words:
 * what changed for a player, never a library, file or error name.
 */
const RELEASES: { version: string; date: string; icons: IconType[] }[] = [
  { version: '2.1.1', date: 'June 13, 2026', icons: [FaRocket, FaWrench] },
  { version: '2.1.0', date: 'May 15, 2026', icons: [FaWandSparkles, FaPalette, FaAndroid, FaWrench] },
  { version: '2.0.0', date: 'April 30, 2026', icons: [FaWandSparkles, FaPalette, FaWrench, FaBug] },
  { version: '1.0.1', date: 'May 16, 2025', icons: [] },
]

function releasesIn(words: Strings['whatsNew']['releases'], locale: string): Release[] {
  return RELEASES.map((r, i) => ({
    version: r.version,
    date: formatDate(r.date, locale),
    tag: words[i].tag,
    summary: words[i].summary,
    sections: words[i].sections.map((section, j) => ({
      label: section.label,
      icon: r.icons[j] ?? FaWrench,
      items: section.items.map((item) => ({ title: item.title || undefined, text: item.text })),
    })),
  }))
}

/**
 * 2.2.0, the launch release (shown while LIVE.launchSite is on): the home page's five New in 2.2 cards, then the
 * Roadmap's other 2.2 features (not Play Online, Spy Sketch or Game nights, which the cards cover) and its "Plus…"
 * line. Its words come from src/i18n: launch.notes, launch.cards, roadmap.now.
 */
const LAUNCH_DATE = 'December 8, 2026'
const ROADMAP_IN_CARDS = new Set([0, 1, 4])

function launchRelease(strings: Strings, locale: string): Release {
  const n = strings.launch.notes
  return {
    version: '2.2.0',
    date: formatDate(LAUNCH_DATE, locale),
    tag: n.tag,
    summary: n.summary,
    sections: [
      {
        label: n.newLabel,
        icon: FaRocket,
        items: [
          ...strings.launch.cards,
          ...strings.roadmap.now.features.filter((_, i) => !ROADMAP_IN_CARDS.has(i)),
        ].map((item) => ({ title: item.title, text: item.text })),
      },
      { label: n.moreLabel, icon: FaWandSparkles, items: [{ text: strings.roadmap.now.more }] },
    ],
  }
}

const SectionBlock = ({ section }: { section: Section }) => (
  <Box>
    <HStack spacing={3} mb={4}>
      <Box
        w="32px"
        h="32px"
        borderRadius="var(--ss-radius-control)"
        bg="ss.surfaceStrong"
        display="flex"
        alignItems="center"
        justifyContent="center"
        aria-hidden
      >
        <Icon as={section.icon} color="ss.highlight" boxSize={4} />
      </Box>
      <Text textStyle="label">
        {section.label}
      </Text>
    </HStack>
    <Stack spacing={3} ps={1}>
      {section.items.map((item, idx) => (
        <HStack key={idx} align="flex-start" spacing={3}>
          <Box w="6px" h="6px" mt="10px" bg="ss.accent" transform="rotate(45deg)" flexShrink={0} aria-hidden />
          <Text fontSize="16px" color="ss.body" lineHeight="1.65" overflowWrap="anywhere">
            {item.title && (
              <Text as="span" color="ss.text" fontWeight="700">
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
    bg="ss.surface"
    borderRadius="var(--ss-radius-card)"
    border="var(--ss-card-border) solid"
    borderColor={isFirst ? 'ss.lineStrong' : 'ss.line'}
    borderTop={isFirst ? '3px solid' : undefined}
    borderTopColor={isFirst ? 'ss.accent' : undefined}
    boxShadow="var(--ss-shadow-card)"
    p={{ base: 5, md: 8 }}
    position="relative"
    overflow="hidden"
  >
    <VStack spacing={6} align="stretch" position="relative">
      <Box>
        <HStack spacing={3} mb={2} flexWrap="wrap">
          <Heading as="h2" size="lg" dir="ltr">
            v{release.version}
          </Heading>
          {release.tag && (
            <Badge
              bg="ss.accent"
              color="ss.onAccent"
              fontSize="12px"
              textTransform="uppercase"
              letterSpacing="0.08em"
              px={2}
              py={0.5}
              borderRadius="var(--ss-radius-control)"
              fontWeight="700"
            >
              {release.tag}
            </Badge>
          )}
        </HStack>
        <Text textStyle="meta" mb={4}>
          {release.date}
        </Text>
        <Text fontSize={{ base: '17px', md: '18px' }} color="ss.body" lineHeight="1.6">
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
  const strings = useT()
  const t = strings.whatsNew
  const { language } = useLang()
  const releases = [
    ...(LIVE.launchSite ? [launchRelease(strings, language.locale)] : []),
    ...releasesIn(t.releases, language.locale),
  ]
  return (
    <Box flex="1" pt={{ base: 10, md: 16 }} pb={{ base: 16, md: 24 }} bgImage="linear-gradient(180deg, var(--ss-band) 0, var(--ss-page) 360px)">
      <Container maxW="760px" px={{ base: 4, md: 6 }}>
        <VStack spacing={10} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" size="xl">
              {t.title}
            </Heading>
            <Text fontSize={{ base: '17px', md: '18px' }} color="ss.muted" maxW="500px">
              {t.sub}
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
