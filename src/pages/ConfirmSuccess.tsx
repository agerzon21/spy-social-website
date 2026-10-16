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
            bg="ss.accent"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 0 8px var(--ss-surface-strong)"
            aria-hidden
          >
            <Icon as={FaCheckCircle} w={8} h={8} color="ss.onAccent" />
          </Box>

          <Heading as="h1" size="lg">
            Email Confirmed
          </Heading>

          <Text fontSize="17px" color="ss.body" maxW="400px" lineHeight="1.6">
            Your email has been successfully verified. You can now use all features of the SpySocial app.
          </Text>

          <Button
            as={Link}
            to="/"
            variant="primary"
            size="md"
            mt={2}
          >
            Return to Home
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default ConfirmSuccess
