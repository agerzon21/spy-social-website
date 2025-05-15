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
    // Extract the token from the URL hash
    const hash = window.location.hash
    const tokenMatch = hash.match(/#access_token=([^&]+)/)
    
    if (tokenMatch && tokenMatch[1]) {
      setToken(tokenMatch[1])
      console.log('Found reset token in URL')
    } else {
      setError('Invalid or expired reset link')
      console.error('No token found in URL hash')
    }
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      setError('Invalid or expired reset link')
      return
    }
    
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
      console.log('Attempting to reset password with token')
      
      // Set the auth session with the token first
      const sessionResult = await supabase.auth.setSession({
        access_token: token,
        refresh_token: '',
      })
      
      if (sessionResult.error) {
        throw new Error(`Session error: ${sessionResult.error.message}`)
      }

      // Then update the user's password
      const { error } = await supabase.auth.updateUser({
        password
      })
      
      if (error) {
        throw new Error(`Update error: ${error.message}`)
      }
      
      toast({
        title: 'Password reset successful',
        description: 'Your password has been updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      
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