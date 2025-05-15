import { useState, useEffect } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Text, useToast, VStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Footer, PageBackground } from '../components'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    // Extract the token from the URL hash to support both approaches
    const hash = window.location.hash
    const tokenMatch = hash.match(/#access_token=([^&]+)/)
    
    if (tokenMatch && tokenMatch[1]) {
      setToken(tokenMatch[1])
      console.log('Found reset token in URL')
    } else {
      // Check if we're already authenticated via session
      const checkSession = async () => {
        try {
          const { data } = await supabase.auth.getSession()
          if (data && data.session) {
            console.log('Active session found')
          } else {
            console.error('No token or active session found')
            setError('Invalid or expired reset link. Please request a new password reset link.')
          }
        } catch (err) {
          console.error('Error checking session:', err)
          setError('An error occurred. Please try again or request a new password reset link.')
        }
      }
      
      checkSession()
    }
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    
    setLoading(true)
    
    try {
      console.log('Attempting to reset password')
      
      // Try token-based approach first if we have a token
      if (token) {
        try {
          // Try to set the session with the token first
          const sessionResult = await supabase.auth.setSession({
            access_token: token,
            refresh_token: '',
          })
          
          if (sessionResult.error) {
            console.error('Session error:', sessionResult.error)
          }
        } catch (sessionErr) {
          console.error('Error setting session:', sessionErr)
        }
      }
      
      // Now try to update the password (works with both approaches)
      const updateResult = await supabase.auth.updateUser({
        password
      })
      
      if (updateResult.error) {
        throw new Error(`Update error: ${updateResult.error.message}`)
      }
      
      toast({
        title: 'Password reset successful',
        description: 'Your password has been updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      
      // Try to sign out
      try {
        await supabase.auth.signOut()
      } catch (signOutErr) {
        console.error('Error signing out:', signOutErr)
      }
      
      // Redirect to home page after successful reset
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      console.error('Password reset error:', errorMessage)
      
      toast({
        title: 'Error resetting password',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      flexDirection="column" 
      width="100vw" 
      maxWidth="100%" 
      overflowX="hidden"
    >
      <PageBackground>
        <Container maxW="container.sm" centerContent py={{ base: 28, md: 20 }}>
          <VStack 
            spacing={6} 
            bg="white" 
            p={8} 
            borderRadius="md" 
            boxShadow="xl"
            width="100%"
          >
            <Heading as="h1" size="xl" textAlign="center">
              Reset Your Password
            </Heading>
            
            {error ? (
              <VStack spacing={6} width="100%">
                <Text color="red.500">{error}</Text>
                <Text>Please request a new password reset link.</Text>
                <Button as={Link} to="/" colorScheme="blue">
                  Return to Home
                </Button>
              </VStack>
            ) : (
              <Box as="form" width="100%" onSubmit={handleResetPassword}>
                <VStack spacing={4} align="flex-start" width="100%">
                  <FormControl isRequired>
                    <FormLabel>New Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                      minLength={8}
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Confirm New Password</FormLabel>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                    />
                  </FormControl>
                  
                  <Button
                    type="submit"
                    colorScheme="blue"
                    width="100%"
                    mt={4}
                    isLoading={loading}
                  >
                    Reset Password
                  </Button>
                </VStack>
              </Box>
            )}
            
            {!error && (
              <Box textAlign="center" pt={4}>
                <ChakraLink as={Link} to="/" color="blue.500">
                  Return to Home
                </ChakraLink>
              </Box>
            )}
          </VStack>
        </Container>
      </PageBackground>
      <Footer />
    </Box>
  )
}

export default ResetPassword 