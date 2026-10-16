import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'
import { IoDesktopOutline, IoLogoGooglePlaystore } from 'react-icons/io5'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { currentPlatform } from '../lib/platform'
import { playJoinUrl } from '../lib/playUrl'
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/stores'
import { RoomCodePlate } from '../components/ui/RoomCodePlate'


const Join = () => {
  const { code = '' } = useParams<{ code: string }>()
  const [searchParams] = useSearchParams()

  // A private room whose host changed its code carries that code as ?p=.
  // Forward it to the app so the invite still joins in one tap, and show it
  // here because it's the code the player would type.
  const passcode = (searchParams.get('p') ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12)
  const displayCode = passcode || code.toUpperCase()
  const appLink = `spysocial://join/${encodeURIComponent(code)}${passcode ? `?p=${encodeURIComponent(passcode)}` : ''}`
  // A friend on a computer: the same room in the browser version (code and ?p=), once LIVE.browserLinks is on.
  const webLink = playJoinUrl(code, passcode)

  // iPadOS Safari says "Macintosh" (desktop-class browsing): lib/platform tells it by touch (QA F207).
  const platform = useMemo(currentPlatform, [])

  const isMobile = platform === 'ios' || platform === 'android'
  // The store buttons step back (outlined) when something above them is the main way in.
  const storesSecondary = isMobile || (platform === 'desktop' && !!webLink)

  // On mobile, try to open the app immediately via the custom scheme.
  // If the universal/app link matched, the OS would have handed off to the app
  // before React even loaded, so reaching this page means the app isn't installed
  // (or the App Links / Universal Links verification hasn't propagated yet).
  useEffect(() => {
    if (isMobile && code) {
      window.location.href = appLink
    }
  }, [isMobile, code, appLink])

  const handleOpenInApp = () => {
    window.location.href = appLink
  }

  return (
    <Box flex="1" pt={{ base: 10, md: 16 }} pb={{ base: 16, md: 24 }} bgImage="radial-gradient(70% 320px at 50% 0, var(--ss-glow), transparent 70%)">
      <Container maxW="560px" px={{ base: 4, md: 6 }}>
        <VStack spacing={8} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" size="xl">
              Join Game
            </Heading>
            <Text color="ss.muted" fontSize={{ base: '18px', md: '20px' }} lineHeight="1.45">
              {!code
                ? 'No room code provided'
                : platform === 'desktop' && webLink
                  ? 'Play in your browser, or on your phone with the app'
                  : 'Open SpySocial to join the room'}
            </Text>
          </VStack>

          {code && <RoomCodePlate code={displayCode} />}

          <VStack spacing={3} align="stretch">
            {platform === 'desktop' && webLink && (
              <Button as="a" href={webLink} size="lg" variant="primary" leftIcon={<IoDesktopOutline size={22} />}>
                Play in Your Browser
              </Button>
            )}

            {isMobile && code && (
              <Button size="lg" variant="primary" onClick={handleOpenInApp}>
                Open in SpySocial
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
                {platform === 'ios' ? "Don't have the app? Download" : 'Download on the App Store'}
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
                {platform === 'android' ? "Don't have the app? Get it" : 'Get it on Google Play'}
              </Button>
            )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Join
