import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  Link as ChakraLink, 
  Image, 
  Flex,
  useToast,
  HStack,
  Icon
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { Link } from 'react-router-dom'
import { Footer, PageBackground } from '../components'
import { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

const Support = () => {
  const [copied, setCopied] = useState(false)
  const toast = useToast()
  const email = 'support@spysocial.app'

  const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      toast({
        title: 'Email copied!',
        description: 'You can now paste it in your email client',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({
        title: 'Failed to copy',
        description: 'Please select and copy the email manually',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
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
        <Flex justify="center" pt={{ base: 8, md: 10 }} pb={{ base: 6, md: 10 }}>
          <ChakraLink as={Link} to="/">
            <Image 
              src="/images/logo.svg" 
              alt="SpySocial Logo"
              width={{ base: "60%", md: "350px" }}
              maxWidth="350px"
              height="auto"
              filter="drop-shadow(0 0 25px rgba(64, 146, 255, 0.4))"
              transition="all 0.2s"
              _hover={{ 
                transform: "scale(1.05)",
                filter: "drop-shadow(0 0 15px rgba(64, 146, 255, 0.6))"
              }}
              mx="auto"
            />
          </ChakraLink>
        </Flex>

        <Container maxW="container.sm" pb={{ base: 16, md: 20 }}>
          <VStack 
            spacing={8} 
            bg="white" 
            p={{ base: 6, md: 10 }}
            borderRadius="md" 
            boxShadow="xl"
            width="100%"
            align="center"
          >
            <Heading as="h1" size="xl" textAlign="center">
              Contact Support
            </Heading>
            
            <Text fontSize="lg" textAlign="center" color="gray.600">
              Need help with SpySocial? Send us an email and we'll get back to you as soon as possible.
            </Text>

            <VStack spacing={4} width="100%">
              <Box
                p={6}
                bg="blue.50"
                borderRadius="lg"
                width="100%"
                position="relative"
                cursor="pointer"
                onClick={handleCopy}
                transition="all 0.2s"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'md'
                }}
                animation={copied ? `${pulse} 0.3s ease-in-out` : undefined}
              >
                <HStack spacing={4} justify="center">
                  <Text 
                    fontSize="xl" 
                    fontWeight="medium" 
                    color="blue.600"
                    letterSpacing="wide"
                  >
                    {email}
                  </Text>
                  <Icon 
                    as={copied ? FiCheck : FiCopy} 
                    color={copied ? "green.500" : "blue.500"}
                    boxSize={5}
                  />
                </HStack>
              </Box>

              <Text fontSize="sm" color="gray.500" textAlign="center">
                Click to copy our support email address
              </Text>
            </VStack>
          </VStack>
        </Container>
      </PageBackground>
      <Footer />
    </Box>
  )
}

export default Support 