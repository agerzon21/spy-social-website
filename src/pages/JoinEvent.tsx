import { Badge, Box, Button, Container, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'
import { IoLogoGooglePlaystore } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { LIVE } from '../lib/legalRelease'
import { supabase } from '../lib/supabase'
import { currentPlatform } from '../lib/platform'
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/stores'
import { useLang, useT } from '../i18n'


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
  // The event's own words come in English, Spanish and Russian: the site's language when it's one of them.
  const { lang: siteLang, language } = useLang()
  const lang = siteLang.slice(0, 2)
  const strings = useT()
  const t = strings.joinEvent
  const c = strings.common

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
    new Intl.DateTimeFormat(language.locale, timeZone ? { ...opts, timeZone } : opts).format(new Date(iso))
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
      ? { label: t.live, scheme: 'red' }
      : event.state === 'cancelled'
        ? { label: t.cancelled, scheme: 'gray' }
        : event.state === 'ended'
          ? { label: t.ended, scheme: 'gray' }
          : { label: t.upcoming, scheme: 'yellow' }
    : null

  return (
    <Box flex="1" pt={{ base: 10, md: 16 }} pb={{ base: 16, md: 24 }} bgImage="radial-gradient(70% 320px at 50% 0, var(--ss-glow), transparent 70%)">
      <Container maxW="560px" px={{ base: 4, md: 6 }}>
        <VStack spacing={8} align="stretch">
          <VStack spacing={2} textAlign="center">
            <Text textStyle="label">
              {t.label}
            </Text>
            {status === 'loading' ? (
              <Spinner color="ss.text" />
            ) : status === 'ok' && event ? (
              <Heading as="h1" size="xl" textDecoration={event.state === 'cancelled' ? 'line-through' : undefined}>
                {pick(event.title, lang)}
              </Heading>
            ) : (
              <>
                <Heading as="h1" size="lg">
                  {t.broken}
                </Heading>
                <Text color="ss.body">{t.brokenHelp}</Text>
              </>
            )}
          </VStack>

          {status === 'ok' && event ? (
            <VStack spacing={4} py={7} px={6} bg="ss.surface" borderRadius="var(--ss-radius-card)" border="var(--ss-card-border) solid" borderColor="ss.lineStrong" boxShadow="var(--ss-shadow-card)" align="stretch">
              <HStack justify="space-between" align="center">
                {stateBadge ? <Badge colorScheme={stateBadge.scheme}>{stateBadge.label}</Badge> : null}
                {event.state === 'live' && event.room ? (
                  <Text color="ss.body" fontSize="sm">
                    {event.room.full ? t.full : t.inRoom(event.room.player_count, event.capacity)}
                  </Text>
                ) : null}
              </HStack>
              <Box>
                <Text color="ss.text" fontFamily="heading" fontSize="28px" lineHeight="1.1" fontWeight="800">
                  {viewerWhen}
                </Text>
                <Text color="ss.muted" fontSize="sm">
                  {t.yourTime}
                  {differs ? ` · ${t.hostTime(event.host_name ?? t.theHost, hostWhen)}` : ''}
                </Text>
              </Box>
              {event.state === 'cancelled' && event.cancel_reason ? (
                <Text color="ss.text">“{pick(event.cancel_reason, lang)}”</Text>
              ) : pick(event.description, lang) ? (
                <Text color="ss.text">{pick(event.description, lang)}</Text>
              ) : null}
              <Text color="ss.muted" fontSize="sm">
                {/* One pool (LIVE.onePool): a game night has no language, every player sees it in their own. */}
                {[event.game_type, event.game_mode, LIVE.onePool ? null : event.room_language.toUpperCase(), event.host_name ? t.hostedBy(event.host_name) : null]
                  .filter(Boolean)
                  .join(' · ')}
              </Text>
            </VStack>
          ) : null}

          <VStack spacing={4} align="stretch">
            {isMobile && linkId ? (
              <Button size="lg" variant="primary" onClick={() => (window.location.href = appLink)}>
                {c.openInApp}
              </Button>
            ) : null}
            {(platform === 'ios' || platform === 'desktop') && (
              <Button
                as="a"
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant={platform === 'ios' ? 'secondary' : 'primary'}
                leftIcon={<FaApple size={22} />}
              >
                {platform === 'ios' ? c.noAppIos : c.appStore}
              </Button>
            )}
            {(platform === 'android' || platform === 'desktop') && (
              <Button
                as="a"
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant={platform === 'android' ? 'secondary' : 'primary'}
                leftIcon={<IoLogoGooglePlaystore size={22} />}
              >
                {platform === 'android' ? c.noAppAndroid : c.googlePlay}
              </Button>
            )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default JoinEvent
