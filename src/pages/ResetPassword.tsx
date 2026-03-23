import { useState, useEffect } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Text, useToast, VStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
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
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast({ title: 'Passwords do not match', status: 'error', duration: 3000, isClosable: true })
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
    <Box flex="1" display="flex" alignItems="center" pt={{ base: 10, md: 16 }} pb={{ base: 24, md: 28 }}>
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
        </VStack>
      </Container>
    </Box>
  )
}

export default ResetPassword
