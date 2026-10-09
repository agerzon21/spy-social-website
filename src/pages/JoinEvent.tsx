import { Badge, Box, Button, Container, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'
import { IoLogoGooglePlaystore } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { LIVE } from '../lib/legalRelease'
import { supabase } from '../lib/supabase'
import { currentPlatform } from '../lib/platform'

const APP_STORE_URL = 'https://apps.apple.com/us/app/spysocial-a-party-game/id6746734390'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.gerz.spysocial'

type I18n = Partial<Record<'en' | 'es' | 'ru', string>>

type EventInfo = {
  link_id: string
  title: I18n
  description: I18n
  cancel_reason: I18n | null
  game_type: string
  game_mode: string
  room_language: string
  starts_at: string
  ends_at: string
  author_tz: string
  state: 'scheduled' | 'live' | 'ended' | 'cancelled' | 'draft'
  host_name: string | null
  capacity: number
  room: { player_count: number; full: boolean } | null
}

// The event page for links opened without the app (/join/e/<LINKID>): what,
// when in the viewer's own time (and the host's time when it differs), and a
// way into the app. Reads get_event with the public key; no room codes are
// returned to signed-out readers.
const pick = (t: I18n | null | undefined, lang: string) =>
  (t && (t[lang as keyof I18n] || t.en || t.es || t.ru)) || ''

const JoinEvent = () => {
  const { id = '' } = useParams<{ id: string }>()
  const linkId = id.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
  const [event, setEvent] = useState<EventInfo | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'missing' | 'error'>('loading')
  const appLink = `spysocial://join/e/${encodeURIComponent(linkId)}`
  const lang = (typeof navigator !== 'undefined' ? navigator.language : 'en').slice(0, 2)

  // iPadOS Safari says "Macintosh" (desktop-class browsing): lib/platform tells it by touch (QA F207).
  const platform = useMemo(currentPlatform, [])
  const isMobile = platform !== 'desktop'

  useEffect(() => {
    let cancelled = false
    const client = supabase as unknown as {
      rpc?: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>
    }
    if (!linkId || !client.rpc) {
      setStatus(linkId ? 'error' : 'missing')
      return
    }
    client.rpc('get_event', { p_link_id: linkId }).then(({ data, error }) => {
      if (cancelled) return
      const res = data as { ok?: boolean; error?: string; event?: EventInfo } | null
      if (error || !res) setStatus('error')
      else if (!res.ok || !res.event) setStatus('missing')
      else {
        setEvent(res.event)
        setStatus('ok')
      }
    })
    return () => {
      cancelled = true
    }
  }, [linkId])

  // On a phone, try the app first, as the room invite page does.
  useEffect(() => {
    if (isMobile && linkId) window.location.href = appLink
  }, [isMobile, linkId, appLink])

  const fmt = (iso: string, opts: Intl.DateTimeFormatOptions, timeZone?: string) =>
    new Intl.DateTimeFormat(undefined, timeZone ? { ...opts, timeZone } : opts).format(new Date(iso))
  const viewerWhen = event
    ? `${fmt(event.starts_at, { weekday: 'long', month: 'long', day: 'numeric' })} · ${fmt(event.starts_at, { hour: 'numeric', minute: '2-digit' })} – ${fmt(event.ends_at, { hour: 'numeric', minute: '2-digit' })}`
    : ''
  const hostWhen = event
    ? `${fmt(event.starts_at, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }, event.author_tz)} (${event.author_tz.split('/').pop()?.replace(/_/g, ' ')})`
    : ''
  const differs =
    event &&
    fmt(event.starts_at, { weekday: 'short', hour: 'numeric', minute: '2-digit' }) !==
      fmt(event.starts_at, { weekday: 'short', hour: 'numeric', minute: '2-digit' }, event.author_tz)

  const stateBadge = event
    ? event.state === 'live'
      ? { label: 'Live now', scheme: 'red' }
      : event.state === 'cancelled'
        ? { label: 'Cancelled', scheme: 'gray' }
        : event.state === 'ended'
          ? { label: 'Ended', scheme: 'gray' }
          : { label: 'Upcoming', scheme: 'yellow' }
    : null

  return (
    <Box flex="1" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.sm">
        <VStack spacing={8} align="stretch">
          <VStack spacing={2} textAlign="center">
            <Text color="orange.300" fontSize="sm" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase">
              Public event
            </Text>
            {status === 'loading' ? (
              <Spinner color="white" />
            ) : status === 'ok' && event ? (
              <Heading as="h1" size="xl" color="white" fontWeight="700" letterSpacing="-0.02em" textDecoration={event.state === 'cancelled' ? 'line-through' : undefined}>
                {pick(event.title, lang)}
              </Heading>
            ) : (
              <>
                <Heading as="h1" size="lg" color="white">
                  This event link doesn't work
                </Heading>
                <Text color="whiteAlpha.700">
                  {/* One pool (LIVE.onePool): 2.2 has no public room list; game nights show in Play Online. */}
                  {LIVE.onePool ? 'Check it, or open SpySocial: game nights show in Play Online.' : 'Check it, or open SpySocial and browse rooms.'}
                </Text>
              </>
            )}
          </VStack>

          {status === 'ok' && event ? (
            <VStack spacing={4} py={7} px={6} bg="whiteAlpha.50" borderRadius="xl" borderWidth="1px" borderColor="whiteAlpha.200" align="stretch">
              <HStack justify="space-between" align="center">
                {stateBadge ? <Badge colorScheme={stateBadge.scheme}>{stateBadge.label}</Badge> : null}
                {event.state === 'live' && event.room ? (
                  <Text color="whiteAlpha.700" fontSize="sm">
                    {event.room.full ? 'Full right now' : `${event.room.player_count} / ${event.capacity} in the room`}
                  </Text>
                ) : null}
              </HStack>
              <Box>
                <Text color="white" fontSize="xl" fontWeight="700">
                  {viewerWhen}
                </Text>
                <Text color="whiteAlpha.600" fontSize="sm">
                  Your time{differs ? ` · ${event.host_name ?? 'The host'}'s time: ${hostWhen}` : ''}
                </Text>
              </Box>
              {event.state === 'cancelled' && event.cancel_reason ? (
                <Text color="whiteAlpha.800">“{pick(event.cancel_reason, lang)}”</Text>
              ) : pick(event.description, lang) ? (
                <Text color="whiteAlpha.800">{pick(event.description, lang)}</Text>
              ) : null}
              <Text color="whiteAlpha.600" fontSize="sm">
                {/* One pool (LIVE.onePool): a game night has no language, every player sees it in their own. */}
                {[event.game_type, event.game_mode, LIVE.onePool ? null : event.room_language.toUpperCase(), event.host_name ? `hosted by ${event.host_name}` : null]
                  .filter(Boolean)
                  .join(' · ')}
              </Text>
            </VStack>
          ) : null}

          <VStack spacing={4} align="stretch">
            {isMobile && linkId ? (
              <Button size="lg" height="56px" bg="white" color="black" fontWeight="600" _hover={{ bg: 'whiteAlpha.900' }} onClick={() => (window.location.href = appLink)}>
                Open in SpySocial
              </Button>
            ) : null}
            {(platform === 'ios' || platform === 'desktop') && (
              <Button
                as="a"
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                height="56px"
                bg={platform === 'ios' ? 'whiteAlpha.100' : 'white'}
                color={platform === 'ios' ? 'white' : 'black'}
                borderWidth={platform === 'ios' ? '1px' : '0'}
                borderColor="whiteAlpha.300"
                fontWeight="600"
              >
                <HStack spacing={3}>
                  <FaApple size={22} />
                  <Text>{platform === 'ios' ? "Don't have the app? Download" : 'Download on the App Store'}</Text>
                </HStack>
              </Button>
            )}
            {(platform === 'android' || platform === 'desktop') && (
              <Button
                as="a"
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                height="56px"
                bg={platform === 'android' ? 'whiteAlpha.100' : 'white'}
                color={platform === 'android' ? 'white' : 'black'}
                borderWidth={platform === 'android' ? '1px' : '0'}
                borderColor="whiteAlpha.300"
                fontWeight="600"
              >
                <HStack spacing={3}>
                  <IoLogoGooglePlaystore size={22} />
                  <Text>{platform === 'android' ? "Don't have the app? Get it" : 'Get it on Google Play'}</Text>
                </HStack>
              </Button>
            )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default JoinEvent
