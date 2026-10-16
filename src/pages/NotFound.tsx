import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <Box flex="1" display="flex" alignItems="center" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.sm" centerContent>
        <VStack spacing={4} textAlign="center">
          <Text fontFamily="heading" fontSize={{ base: '120px', md: '160px' }} lineHeight="0.85" fontWeight="900" color="ss.accent">404</Text>
          <Heading as="h1" size="md">Page Not Found</Heading>
          <Text fontSize="17px" color="ss.muted">The page you're looking for doesn't exist.</Text>
          <Button as={Link} to="/" variant="primary" size="md" mt={2}>
            Go Home
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default NotFound
