import { Box, Button, Container, Heading, Text, VStack, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import { useT } from '../i18n'

const ConfirmSuccess: React.FC = () => {
  const t = useT().confirmSuccess
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
            {t.title}
          </Heading>

          <Text fontSize="17px" color="ss.body" maxW="400px" lineHeight="1.6">
            {t.text}
          </Text>

          <Button
            as={Link}
            to="/"
            variant="primary"
            size="md"
            mt={2}
          >
            {t.home}
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default ConfirmSuccess
