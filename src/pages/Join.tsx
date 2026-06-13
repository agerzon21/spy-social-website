import { Box, Container, Heading, Text, VStack, Button, HStack } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'
import { IoLogoGooglePlaystore } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'

const APP_STORE_URL = 'https://apps.apple.com/us/app/spysocial-a-party-game/id6746734390'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.gerz.spysocial'

const Join = () => {
  const { code = '' } = useParams<{ code: string }>()
  const displayCode = code.toUpperCase()

  const platform = useMemo<'ios' | 'android' | 'desktop'>(() => {
    if (typeof navigator === 'undefined') return 'desktop'
    const ua = navigator.userAgent || ''
    if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
    if (/Android/i.test(ua)) return 'android'
    return 'desktop'
  }, [])

  const isMobile = platform === 'ios' || platform === 'android'

  // On mobile, try to open the app immediately via the custom scheme.
  // If the universal/app link matched, the OS would have handed off to the app
  // before React even loaded, so reaching this page means the app isn't installed
  // (or the App Links / Universal Links verification hasn't propagated yet).
  useEffect(() => {
    if (isMobile && code) {
      window.location.href = `spysocial://join/${code}`
    }
  }, [isMobile, code])

  const handleOpenInApp = () => {
    window.location.href = `spysocial://join/${code}`
  }

  return (
    <Box flex="1" pt={{ base: 12, md: 20 }} pb={{ base: 12, md: 16 }}>
      <Container maxW="container.sm">
        <VStack spacing={10} align="stretch">
          <VStack spacing={3} textAlign="center">
            <Heading as="h1" size="xl" color="white" fontWeight="600" letterSpacing="-0.02em">
              Join Game
            </Heading>
            <Text color="whiteAlpha.700" fontSize="lg">
              {code
                ? 'Open SpySocial to join the room'
                : 'No room code provided'}
            </Text>
          </VStack>

          {code && (
            <VStack
              spacing={3}
              py={8}
              px={6}
              bg="whiteAlpha.50"
              borderRadius="xl"
              borderWidth="1px"
              borderColor="whiteAlpha.200"
            >
              <Text color="whiteAlpha.600" fontSize="sm" textTransform="uppercase" letterSpacing="0.1em">
                Room Code
              </Text>
              <Heading
                as="div"
                color="white"
                fontSize={{ base: '4xl', md: '5xl' }}
                fontWeight="700"
                letterSpacing="0.15em"
                fontFamily="mono"
              >
                {displayCode}
              </Heading>
            </VStack>
          )}

          <VStack spacing={4} align="stretch">
            {isMobile && code && (
              <Button
                size="lg"
                height="56px"
                bg="white"
                color="black"
                fontWeight="600"
                _hover={{ bg: 'whiteAlpha.900' }}
                onClick={handleOpenInApp}
              >
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
                height="56px"
                bg={platform === 'ios' ? 'whiteAlpha.100' : 'white'}
                color={platform === 'ios' ? 'white' : 'black'}
                borderWidth={platform === 'ios' ? '1px' : '0'}
                borderColor="whiteAlpha.300"
                fontWeight="600"
                _hover={{ bg: platform === 'ios' ? 'whiteAlpha.200' : 'whiteAlpha.900' }}
              >
                <HStack spacing={3}>
                  <FaApple size={22} />
                  <Text>
                    {platform === 'ios' ? "Don't have the app? Download" : 'Download on the App Store'}
                  </Text>
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
                _hover={{ bg: platform === 'android' ? 'whiteAlpha.200' : 'whiteAlpha.900' }}
              >
                <HStack spacing={3}>
                  <IoLogoGooglePlaystore size={22} />
                  <Text>
                    {platform === 'android' ? "Don't have the app? Get it" : 'Get it on Google Play'}
                  </Text>
                </HStack>
              </Button>
            )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Join
