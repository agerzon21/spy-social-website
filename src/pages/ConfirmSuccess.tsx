import { Box, Button, Container, Heading, Text, VStack, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaApple } from 'react-icons/fa'
import { IoLogoGooglePlaystore } from 'react-icons/io5'
import { Footer, PageBackground } from '../components'

const ConfirmSuccess: React.FC = () => {
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
            <Icon as={FaCheckCircle} w={16} h={16} color="green.500" />
            
            <Heading as="h1" size="xl" textAlign="center">
              Email Confirmed!
            </Heading>
            
            <Text fontSize="lg" textAlign="center">
              Your email has been successfully verified. You can now use all features of the SpySocial app.
            </Text>
            
            <Text fontSize="md" fontWeight="bold" textAlign="center">
              Download the app to get started:
            </Text>
            
            <VStack spacing={4} width="100%">
              <Button 
                leftIcon={<FaApple />} 
                colorScheme="blackAlpha" 
                size="lg" 
                width="100%"
                as="a"
                href="#"
                _hover={{ 
                  transform: "translateY(-2px)",
                  boxShadow: "lg"
                }}
              >
                Download on the App Store
              </Button>
              
              <Button 
                leftIcon={<IoLogoGooglePlaystore />} 
                colorScheme="blue" 
                size="lg" 
                width="100%"
                as="a"
                href="#"
                _hover={{ 
                  transform: "translateY(-2px)",
                  boxShadow: "lg"
                }}
              >
                Get it on Google Play
              </Button>
            </VStack>
            
            <Button as={Link} to="/" colorScheme="blue" size="md" mt={2}>
              Return to Home
            </Button>
          </VStack>
        </Container>
      </PageBackground>
      <Footer />
    </Box>
  )
}

export default ConfirmSuccess 