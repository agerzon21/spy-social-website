import { Box, Button, Container, Heading, Text, VStack, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { BiErrorCircle } from 'react-icons/bi'
import { Footer, PageBackground } from '../components'

const NotFound: React.FC = () => {
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
            <Icon as={BiErrorCircle} w={16} h={16} color="blue.500" />
            
            <Heading as="h1" size="xl" textAlign="center">
              Page Not Found
            </Heading>
            
            <Text fontSize="lg" textAlign="center">
              Oops! The page you're looking for doesn't exist or has been moved.
            </Text>
            
            <Button as={Link} to="/" colorScheme="blue" size="md" mt={4}>
              Return to Home
            </Button>
          </VStack>
        </Container>
      </PageBackground>
      <Footer />
    </Box>
  )
}

export default NotFound 