import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'

const NotFound: React.FC = () => {
  const t = useT()
  return (
    <Box flex="1" display="flex" alignItems="center" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.sm" centerContent>
        <VStack spacing={4} textAlign="center">
          <Text fontFamily="heading" fontSize={{ base: '120px', md: '160px' }} lineHeight="0.85" fontWeight="900" color="ss.accentText">404</Text>
          <Heading as="h1" size="md">{t.notFound.title}</Heading>
          <Text fontSize="17px" color="ss.muted">{t.notFound.text}</Text>
          <Button as={Link} to="/" variant="primary" size="md" mt={2}>
            {t.common.goHome}
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default NotFound
