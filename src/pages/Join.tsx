import { Box, Container, Heading, Text, VStack, Button, HStack } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'

const APP_STORE_URL = 'https://apps.apple.com/us/app/spysocial-a-party-game/id6746734390'

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

  // On iOS, try to open the app immediately via the custom scheme.
  // If the universal link matched, the app would have intercepted this route
  // before React even loaded, so reaching this page means the app isn't installed
  // (or the universal link hasn't propagated yet).
  useEffect(() => {
    if (platform === 'ios' && code) {
      window.location.href = `spysocial://join/${code}`
    }
  }, [platform, code])

  const handleOpenInApp = () => {
    window.location.href = `spysocial://join/${code}`
  }

  return (
    <Box flex="1" pt={{ base: 16, md: 24 }} pb={{ base: 24, md: 28 }}>
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
            {platform === 'ios' && code && (
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

            {platform === 'android' && (
              <Text color="whiteAlpha.600" fontSize="sm" textAlign="center" pt={2}>
                SpySocial is currently iOS only. An Android version is coming soon.
              </Text>
            )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Join
