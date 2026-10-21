import { Box, Button, Container, Heading, Text, VStack, Icon } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { useT } from '../i18n'
import { rich } from '../i18n/rich'

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

const ConfirmSuccess: React.FC = () => {
  const strings = useT()
  const t = strings.confirmSuccess
  const failed = useMemo(linkFailed, [])
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
            {failed ? rich(t.expired, { b: (c) => <b>{c}</b> }) : t.text}
          </Text>

          <Button
            as={Link}
            to="/"
            variant="primary"
            size="md"
            mt={2}
          >
            {t.home}
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default ConfirmSuccess
