import { Box, Button, Container, Heading, Text, VStack, Icon } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import { useT } from '../i18n'
import { currentPlatform } from '../lib/platform'
import { PLAY_URL } from '../lib/playUrl'

/**
 * "Email Confirmed": where a sign-up's confirmation link lands (the app's signup function, redirect_to).
 *
 * A sign-up made in the browser version (play.spysocial.app) lands with ?from=browser (the signup function's
 * CONFIRM_REDIRECT_BROWSER, QA 97 F4100: the page offered only "Return to Home", nothing back to the game). On a
 * computer it leads back there, to Log In (an invite opened before the sign-up waits there for 10 minutes). On a
 * phone (the e-mail opened there) it says to go back to the computer. Only that sign-up sees it: no other page
 * points at the browser version while playing in a browser is invite-only (LIVE.browserLinks).
 */
const ConfirmSuccess: React.FC = () => {
  const t = useT().confirmSuccess
  const [searchParams] = useSearchParams()
  const fromBrowser = searchParams.get('from') === 'browser'
  // iPadOS Safari says "Macintosh": lib/platform tells it by touch.
  const platform = useMemo(currentPlatform, [])
  const backToBrowser = fromBrowser && platform === 'desktop'
  const text = !fromBrowser ? t.text : backToBrowser ? t.browserText : t.browserPhoneText
  return (
    <Box flex="1" display="flex" alignItems="center" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.sm">
        <VStack spacing={6} align="center" textAlign="center">
          <Box
            w="64px"
            h="64px"
            borderRadius="full"
            bg="ss.accent"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 0 8px var(--ss-surface-strong)"
            aria-hidden
          >
            <Icon as={FaCheckCircle} w={8} h={8} color="ss.onAccent" />
          </Box>

          <Heading as="h1" size="lg">
            {t.title}
          </Heading>

          <Text fontSize="17px" color="ss.body" maxW="400px" lineHeight="1.6">
            {text}
          </Text>

          {backToBrowser ? (
            <VStack spacing={3} mt={2}>
              <Button as="a" href={`${PLAY_URL}/login`} variant="primary" size="md">
                {t.browserButton}
              </Button>
              <Button as={Link} to="/" variant="secondary" size="md">
                {t.home}
              </Button>
            </VStack>
          ) : (
            <Button
              as={Link}
              to="/"
              variant="primary"
              size="md"
              mt={2}
            >
              {t.home}
            </Button>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default ConfirmSuccess
