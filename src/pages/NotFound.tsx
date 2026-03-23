import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <Box flex="1" display="flex" alignItems="center" pt={{ base: 10, md: 16 }} pb={{ base: 24, md: 28 }}>
      <Container maxW="container.sm" centerContent>
        <VStack spacing={4}>
          <Text fontSize="6xl" fontWeight="700" color="whiteAlpha.100">404</Text>
          <Heading as="h1" size="md" color="white">Page Not Found</Heading>
          <Text fontSize="sm" color="whiteAlpha.500">The page you're looking for doesn't exist.</Text>
          <Button as={Link} to="/" bg="white" color="gray.900" size="sm" mt={2} _hover={{ bg: 'gray.100' }}>
            Go Home
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default NotFound
