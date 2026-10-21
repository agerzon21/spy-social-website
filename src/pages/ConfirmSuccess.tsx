import { Box, Button, Container, Heading, Text, VStack, Icon } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { useT } from '../i18n'
import { rich } from '../i18n/rich'
import { currentPlatform } from '../lib/platform'
import { PLAY_URL } from '../lib/playUrl'

/**
 * Where a confirmation email's link lands (the signup function's CONFIRM_REDIRECT, /confirm-success/). Supabase Auth
 * sends an expired or already used link here too, with the reason after # (error=access_denied&error_code=otp_expired
 * &error_description=...), or in the query on some flows: then the page says so and points to the app's Resend
 * instead of "Email Confirmed" (QA F4507).
 */
function linkFailed(): boolean {
  if (typeof window === 'undefined') return false
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const query = new URLSearchParams(window.location.search)
  return [hash, query].some((p) => p.has('error') || p.has('error_code'))
}

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
  const strings = useT()
  const t = strings.confirmSuccess
  const failed = useMemo(linkFailed, [])
  const [searchParams] = useSearchParams()
  const fromBrowser = searchParams.get('from') === 'browser'
  // iPadOS Safari says "Macintosh": lib/platform tells it by touch.
  const platform = useMemo(currentPlatform, [])
  // A browser sign-up on a computer gets the way back to the game, also when its link failed (Resend is there).
  const backToBrowser = fromBrowser && platform === 'desktop'
  const text = !fromBrowser ? t.text : backToBrowser ? t.browserText : t.browserPhoneText
  return (
    <Box flex="1" display="flex" alignItems="center" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      {failed && (
        <Helmet>
          <title>{`${t.expiredTitle} · ${strings.meta.siteName}`}</title>
        </Helmet>
      )}
      <Container maxW="container.sm">
        <VStack spacing={6} align="center" textAlign="center">
          <Box
            w="64px"
            h="64px"
            borderRadius="full"
            bg={failed ? 'ss.surfaceStrong' : 'ss.accent'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 0 8px var(--ss-surface-strong)"
            aria-hidden
          >
            <Icon as={failed ? FaExclamationCircle : FaCheckCircle} w={8} h={8} color={failed ? 'ss.danger' : 'ss.onAccent'} />
          </Box>

          <Heading as="h1" size="lg">
            {failed ? t.expiredTitle : t.title}
          </Heading>

          <Text fontSize="17px" color="ss.body" maxW="400px" lineHeight="1.6">
            {failed ? rich(t.expired, { b: (c) => <b>{c}</b> }) : text}
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
