import { Box, Button, Container, Heading, Text, VStack, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'

const ConfirmSuccess: React.FC = () => {
  return (
    <Box flex="1" display="flex" alignItems="center" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.sm">
        <VStack spacing={6} align="center" textAlign="center">
          <Box
            w="64px"
            h="64px"
            borderRadius="full"
            bg="green.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 0 8px rgba(72, 187, 120, 0.12)"
          >
            <Icon as={FaCheckCircle} w={8} h={8} color="white" />
          </Box>

          <Heading as="h1" size="lg" color="white" fontWeight="600" letterSpacing="-0.02em">
            Email Confirmed
          </Heading>

          <Text fontSize="md" color="whiteAlpha.700" maxW="400px" lineHeight="1.7">
            Your email has been successfully verified. You can now use all features of the SpySocial app.
          </Text>

          <Button
            as={Link}
            to="/"
            bg="white"
            color="gray.900"
            size="md"
            mt={2}
            _hover={{ bg: 'gray.100' }}
          >
            Return to Home
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default ConfirmSuccess
