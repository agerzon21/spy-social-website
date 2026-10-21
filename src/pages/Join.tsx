import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'
import { IoDesktopOutline, IoLogoGooglePlaystore } from 'react-icons/io5'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { openAppHref, tryAppOnLoad, tryAppOnce } from '../lib/appLink'
import { currentPlatform } from '../lib/platform'
import { playJoinUrl } from '../lib/playUrl'
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/stores'
import { RoomCodePlate } from '../components/ui/RoomCodePlate'
import { useT } from '../i18n'


const Join = () => {
  const { code = '' } = useParams<{ code: string }>()
  const [searchParams] = useSearchParams()
  const strings = useT()
  const t = strings.join
  const c = strings.common

  // A private room whose host changed its code carries that code as ?p=.
  // Forward it to the app so the invite still joins in one tap, and show it
  // here because it's the code the player would type.
  const passcode = (searchParams.get('p') ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12)
  const displayCode = passcode || code.toUpperCase()
  // The app's own path for this invite, ?p= included (lib/appLink makes it spysocial:// or Android's intent://).
  const appPath = `join/${encodeURIComponent(code)}${passcode ? `?p=${encodeURIComponent(passcode)}` : ''}`
  // A friend on a computer: the same room in the browser version (code and ?p=), once LIVE.browserLinks is on.
  const webLink = playJoinUrl(code, passcode)

  // iPadOS Safari says "Macintosh" (desktop-class browsing): lib/platform tells it by touch (QA F207).
  const platform = useMemo(currentPlatform, [])

  const isMobile = platform === 'ios' || platform === 'android'
  const appLink = openAppHref(appPath, platform)
  // The store buttons step back (outlined) when something above them is the main way in.
  const storesSecondary = isMobile || (platform === 'desktop' && !!webLink)

  // Nothing opens by itself in Safari or Chrome: an installed app already took the link (Universal Links, App Links),
  // and spysocial:// without the app is iOS Safari's "Cannot Open Page". Only an in-app browser on iOS (Instagram,
  // TikTok, Facebook), which never hands a link to the app, tries it once (lib/appLink).
  useEffect(() => {
    if (code && tryAppOnLoad(platform, navigator.userAgent || '')) tryAppOnce(appPath)
  }, [platform, code, appPath])

  return (
    <Box flex="1" pt={{ base: 10, md: 16 }} pb={{ base: 16, md: 24 }} bgImage="radial-gradient(70% 320px at 50% 0, var(--ss-glow), transparent 70%)">
      <Container maxW="560px" px={{ base: 4, md: 6 }}>
        <VStack spacing={8} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" size="xl">
              {t.title}
            </Heading>
            <Text color="ss.muted" fontSize={{ base: '18px', md: '20px' }} lineHeight="1.45">
              {!code
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

            {isMobile && code && (
              <Button as="a" href={appLink} size="lg" variant="primary">
                {c.openInApp}
              </Button>
            )}

            {(platform === 'ios' || platform === 'desktop') && (
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

            {(platform === 'android' || platform === 'desktop') && (
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
        </VStack>
      </Container>
    </Box>
  )
}

export default Join
