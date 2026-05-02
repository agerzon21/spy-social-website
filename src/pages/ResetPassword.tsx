import { useState, useEffect } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Text, VStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useThemedToast } from '../lib/useThemedToast'

type PreviewMode = 'form' | 'error' | 'success' | null

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const previewMode = (searchParams.get('preview') as PreviewMode) ?? null
  const isPreview = previewMode !== null

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(previewMode === 'success')
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(
    previewMode === 'error' ? 'Invalid or expired reset link. Please request a new one.' : null
  )
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
          if (!data?.session) setError('Invalid or expired reset link. Please request a new one.')
        } catch {
          setError('An error occurred. Please try again.')
        }
      }
      checkSession()
    }
  }, [isPreview])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast({ title: 'Passwords do not match', status: 'error', duration: 3000, isClosable: true })
      return
    }
    if (isPreview) {
      setSuccess(true)
      toast({ title: 'Preview: password reset successful', status: 'success', duration: 3000, isClosable: true })
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
      toast({ title: 'Password reset successful', status: 'success', duration: 5000, isClosable: true })
      try { await supabase.auth.signOut() } catch { /* continue */ }
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      toast({ title: 'Error', description: err instanceof Error ? err.message : 'Unexpected error', status: 'error', duration: 5000, isClosable: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box flex="1" display="flex" alignItems="center" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="400px">
        <VStack spacing={5} align="stretch">
          <Heading as="h1" size="md" color="white" textAlign="center">Reset Your Password</Heading>

          {error ? (
            <VStack spacing={4}>
              <Text color="red.300" fontSize="sm" textAlign="center">{error}</Text>
              <Button as={Link} to="/" bg="white" color="gray.900" size="sm" _hover={{ bg: 'gray.100' }}>Go Home</Button>
            </VStack>
          ) : success ? (
            <VStack spacing={3} py={4}>
              <Text color="green.300" fontWeight="500" fontSize="sm">Password reset successfully!</Text>
              <Text fontSize="xs" color="whiteAlpha.500">Redirecting...</Text>
            </VStack>
          ) : (
            <Box as="form" onSubmit={handleResetPassword}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" color="whiteAlpha.600">New Password</FormLabel>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" minLength={8} isDisabled={loading} bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200" color="white" _placeholder={{ color: 'whiteAlpha.300' }} _hover={{ borderColor: 'whiteAlpha.300' }} _focus={{ borderColor: 'blue.400', boxShadow: 'none' }} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" color="whiteAlpha.600">Confirm Password</FormLabel>
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" isDisabled={loading} bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200" color="white" _placeholder={{ color: 'whiteAlpha.300' }} _hover={{ borderColor: 'whiteAlpha.300' }} _focus={{ borderColor: 'blue.400', boxShadow: 'none' }} />
                </FormControl>
                <Button type="submit" bg="white" color="gray.900" width="100%" size="sm" isLoading={loading} _hover={{ bg: 'gray.100' }}>Reset Password</Button>
              </VStack>
            </Box>
          )}

          {!error && !success && (
            <Box textAlign="center" pt={2}>
              <ChakraLink as={Link} to="/" color="whiteAlpha.400" fontSize="xs" _hover={{ color: 'whiteAlpha.700' }}>Cancel</ChakraLink>
            </Box>
          )}

          {isPreview && (
            <Box mt={4} p={3} bg="yellow.900" borderRadius="md" borderWidth="1px" borderColor="yellow.700">
              <Text fontSize="xs" color="yellow.200" textAlign="center">
                Preview mode: <b>{previewMode}</b>. Submitting won't hit Supabase.
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default ResetPassword
