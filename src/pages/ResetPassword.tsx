import { useState, useEffect } from 'react'
import { Box, Button, Container, FormControl, FormHelperText, FormLabel, Heading, Input, Text, VStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useThemedToast } from '../lib/useThemedToast'
import { useT } from '../i18n'
import { rich } from '../i18n/rich'

type PreviewMode = 'form' | 'error' | 'success' | null

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const previewMode = (searchParams.get('preview') as PreviewMode) ?? null
  const isPreview = previewMode !== null
  const strings = useT()
  const t = strings.resetPassword

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(previewMode === 'success')
  const [token, setToken] = useState<string | null>(null)
  // Which message, not its words: it shows in the page's language even after a switch.
  const [error, setError] = useState<'invalid' | 'failed' | null>(previewMode === 'error' ? 'invalid' : null)
  const toast = useThemedToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (isPreview) return
    const hash = window.location.hash
    const tokenMatch = hash.match(/#access_token=([^&]+)/)
    if (tokenMatch && tokenMatch[1]) {
      setToken(tokenMatch[1])
    } else {
      const checkSession = async () => {
        try {
          const { data } = await supabase.auth.getSession()
          if (!data?.session) setError('invalid')
        } catch {
          setError('failed')
        }
      }
      checkSession()
    }
  }, [isPreview])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast({ title: t.mismatch, status: 'error', duration: 3000, isClosable: true })
      return
    }
    if (isPreview) {
      setSuccess(true)
      toast({ title: t.previewSuccess, status: 'success', duration: 3000, isClosable: true })
      return
    }
    setLoading(true)
    try {
      if (token) {
        try { await supabase.auth.setSession({ access_token: token, refresh_token: '' }) } catch { /* continue */ }
      }
      const updateResult = await supabase.auth.updateUser({ password })
      if (updateResult.error) throw new Error(updateResult.error.message)
      setSuccess(true)
      toast({ title: t.success, status: 'success', duration: 5000, isClosable: true })
      try { await supabase.auth.signOut() } catch { /* continue */ }
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      toast({ title: t.error, description: err instanceof Error ? err.message : t.unexpected, status: 'error', duration: 5000, isClosable: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box flex="1" display="flex" alignItems="center" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="400px">
        <VStack spacing={5} align="stretch">
          <Heading as="h1" size="md" textAlign="center">{t.title}</Heading>

          {error ? (
            <VStack spacing={4}>
              <Text color="ss.danger" fontSize="sm" textAlign="center">{error === 'invalid' ? t.invalid : t.failed}</Text>
              <Button as={Link} to="/" variant="primary" size="sm">{strings.common.goHome}</Button>
            </VStack>
          ) : success ? (
            <VStack spacing={3} py={4}>
              <Text color="ss.success" fontWeight="500" fontSize="sm">{t.done}</Text>
              <Text fontSize="xs" color="ss.muted">{t.redirecting}</Text>
            </VStack>
          ) : (
            <Box as="form" onSubmit={handleResetPassword}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" color="ss.muted">{t.newPassword}</FormLabel>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.newPlaceholder} minLength={6} isDisabled={loading} bg="ss.deep" border="var(--ss-hairline) solid" borderColor="ss.control" borderRadius="var(--ss-radius-control)" color="ss.text" _placeholder={{ color: 'ss.muted' }} _hover={{ borderColor: 'ss.text' }} _focus={{ borderColor: 'ss.focus', boxShadow: '0 0 0 1px var(--ss-focus)' }} />
                  <FormHelperText fontSize="xs" color="ss.muted">{t.minLength}</FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" color="ss.muted">{t.confirm}</FormLabel>
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t.confirmPlaceholder} isDisabled={loading} bg="ss.deep" border="var(--ss-hairline) solid" borderColor="ss.control" borderRadius="var(--ss-radius-control)" color="ss.text" _placeholder={{ color: 'ss.muted' }} _hover={{ borderColor: 'ss.text' }} _focus={{ borderColor: 'ss.focus', boxShadow: '0 0 0 1px var(--ss-focus)' }} />
                </FormControl>
                <Button type="submit" variant="primary" width="100%" size="md" isLoading={loading}>{t.submit}</Button>
              </VStack>
            </Box>
          )}

          {!error && !success && (
            <Box textAlign="center" pt={2}>
              <ChakraLink as={Link} to="/" color="ss.muted" fontSize="15px" display="inline-flex" alignItems="center" minH="44px" _hover={{ color: 'ss.text' }}>{t.cancel}</ChakraLink>
            </Box>
          )}

          {isPreview && (
            <Box mt={4} p={3} bg="ss.warnSurface" borderRadius="var(--ss-radius-control)" borderWidth="1px" borderColor="ss.warnLine">
              <Text fontSize="xs" color="ss.warn" textAlign="center">
                {rich(t.preview(previewMode ?? ''), { b: (c) => <b>{c}</b> })}
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default ResetPassword
