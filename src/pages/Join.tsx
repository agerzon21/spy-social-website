import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'
import { IoDesktopOutline, IoLogoGooglePlaystore } from 'react-icons/io5'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { openAppHref, tryAppOnLoad, tryAppOnce } from '../lib/appLink'
import { keepCodeChars } from '../lib/roomCode'
import { currentPlatform } from '../lib/platform'
import { useClientValue } from '../lib/clientValue'
import { playJoinUrl } from '../lib/playUrl'
import { STORES_OPEN } from '../lib/legalRelease'
import { REMINDER_PAGE } from '../lib/launchDay'
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/stores'
import { LaunchLine } from '../components/ui/LaunchReminder'
import { RoomCodePlate } from '../components/ui/RoomCodePlate'
import { useT } from '../i18n'


const Join = () => {
  const { code: rawCode = '', token = '' } = useParams<{ code: string; token: string }>()
  // A link typed in lowercase or with spaces, or with a code's look-alike letters: the code the app reads (lib/roomCode).
  const code = keepCodeChars(rawCode)
  const [searchParams] = useSearchParams()
  const strings = useT()
  const t = strings.join
  const c = strings.common

  // A private room whose host changed its code carries that code as ?p=.
  // Forward it to the app so the invite still joins in one tap, and show it
  // here because it's the code the player would type.
  const passcode = keepCodeChars(searchParams.get('p') ?? '')
  const displayCode = passcode || code
  // The app's own path for this invite, ?p= included (lib/appLink makes it spysocial:// or Android's intent://).
  // A Friend Code's link (/join/f/<token>, shown as a QR in person): the same way in, no room to name.
  const appPath = token ? `join/f/${encodeURIComponent(token)}` : `join/${encodeURIComponent(code)}${passcode ? `?p=${encodeURIComponent(passcode)}` : ''}`
  // A friend on a computer: the same room in the browser version (code and ?p=), once LIVE.browserLinks is on.
  const webLink = playJoinUrl(code, passcode)

  // iPadOS Safari says "Macintosh" (desktop-class browsing): lib/platform tells it by touch (QA F207).
  // The browser's (a computer until React has taken over the build's HTML of /join: www-speed-1112).
  const platform = useClientValue(currentPlatform, 'desktop')

  const isMobile = platform === 'ios' || platform === 'android'
  // Until the launch the stores hold the old 2.1.1. A room code keeps its way there, as the second choice with plain words: a
  // friend on 2.1.1 can only be joined from 2.1.1. A Friend Code (2.2 only) or no code has no use for it: the reminder instead.
  const storesHere = STORES_OPEN || (!!code && !token)
  const appLink = storesHere ? openAppHref(appPath, platform) : openAppHref(appPath, platform, `${typeof window === 'undefined' ? '' : window.location.origin}${REMINDER_PAGE}`)
  // The store buttons step back (outlined) when something above them is the main way in.
  const storesSecondary = !STORES_OPEN || isMobile || (platform === 'desktop' && !!webLink)

  // Nothing opens by itself in Safari or Chrome: an installed app already took the link (Universal Links, App Links),
  // and spysocial:// without the app is iOS Safari's "Cannot Open Page". Only an in-app browser on iOS (Instagram,
  // TikTok, Facebook), which never hands a link to the app, tries it once (lib/appLink).
  useEffect(() => {
    if ((code || token) && tryAppOnLoad(platform, navigator.userAgent || '')) tryAppOnce(appPath)
  }, [platform, code, token, appPath])

  return (
    <Box flex="1" pt={{ base: 10, md: 16 }} pb={{ base: 16, md: 24 }} bgImage="radial-gradient(70% 320px at 50% 0, var(--ss-glow), transparent 70%)">
      <Container maxW="560px" px={{ base: 4, md: 6 }}>
        <VStack spacing={8} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" size="xl">
              {token ? t.friendTitle : t.title}
            </Heading>
            <Text color="ss.muted" fontSize={{ base: '18px', md: '20px' }} lineHeight="1.45">
              {token
                ? t.friendLink
                : !code
                ? t.noCode
                : platform === 'desktop'
                  ? webLink
                    ? t.browserOrPhone
                    : t.onPhone
                  : t.openToJoin}
            </Text>
          </VStack>

          {code && <RoomCodePlate code={displayCode} label={t.roomCode} />}

          <VStack spacing={3} align="stretch">
            {platform === 'desktop' && webLink && (
              <Button as="a" href={webLink} size="lg" variant="primary" leftIcon={<IoDesktopOutline size={22} />}>
                {c.playInBrowser}
              </Button>
            )}

            {isMobile && (code || token) && (
              <Button as="a" href={appLink} size="lg" variant="primary">
                {c.openInApp}
              </Button>
            )}

            {storesHere && (platform === 'ios' || platform === 'desktop') && (
              <Button
                as="a"
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant={storesSecondary ? 'secondary' : 'primary'}
                leftIcon={<FaApple size={22} />}
              >
                {platform === 'ios' ? c.noAppIos : c.appStore}
              </Button>
            )}

            {storesHere && (platform === 'android' || platform === 'desktop') && (
              <Button
                as="a"
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant={storesSecondary ? 'secondary' : 'primary'}
                leftIcon={<IoLogoGooglePlaystore size={22} />}
              >
                {platform === 'android' ? c.noAppAndroid : c.googlePlay}
              </Button>
            )}
          </VStack>

          {!STORES_OPEN && <LaunchLine note={storesHere} />}

          {isMobile && code && (STORES_OPEN || storesHere) && (
            <Text color="ss.muted" fontSize="15px" lineHeight="1.45" textAlign="center" mt={-4}>
              {t.afterInstall}
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default Join
