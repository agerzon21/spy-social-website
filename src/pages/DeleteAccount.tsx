import { Box, Container, Heading, Text, VStack, Link as ChakraLink, ListItem, OrderedList, UnorderedList } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const DeleteAccount: React.FC = () => {
  return (
    <Box flex="1" color="whiteAlpha.700" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={5} align="start">
          <Box>
            <Heading as="h1" size="lg" color="white" mb={2}>Delete Your SpySocial Account</Heading>
            <Text fontSize="xs" color="whiteAlpha.400">Last Updated: May 15, 2026</Text>
          </Box>

          <Text fontSize="sm" lineHeight="1.8">
            SpySocial lets you permanently delete your account and all associated data at any time. For any
            questions, contact us at{' '}
            <ChakraLink as={Link} to="/contact-us" color="blue.300" _hover={{ color: 'blue.200' }}>support@spysocial.app</ChakraLink>
            .
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>How to delete your account from the app</Heading>
          <OrderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem>Open SpySocial and sign in.</ListItem>
            <ListItem>Tap the <Text as="span" fontWeight="600" color="whiteAlpha.800">Account</Text> icon in the bottom right of the home screen.</ListItem>
            <ListItem>Scroll to the <Text as="span" fontWeight="600" color="whiteAlpha.800">Danger Zone</Text> at the bottom of the Account screen.</ListItem>
            <ListItem>Tap <Text as="span" fontWeight="600" color="whiteAlpha.800">Delete Account</Text> and confirm.</ListItem>
          </OrderedList>
          <Text fontSize="sm" lineHeight="1.8">Your account is deleted immediately.</Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Don't have the app installed anymore?</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Email{' '}
            <ChakraLink as={Link} to="/contact-us" color="blue.300" _hover={{ color: 'blue.200' }}>support@spysocial.app</ChakraLink>
            {' '}from the address tied to your account with the subject "Delete my SpySocial account". Requests are processed within 30 days.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>What is deleted</Heading>
          <Text fontSize="sm" lineHeight="1.8">The following are permanently deleted at the time of the request:</Text>
          <UnorderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem>Your email address and password hash</ListItem>
            <ListItem>Your display name and profile photo</ListItem>
            <ListItem>Your game history and room participation records</ListItem>
            <ListItem>Your preferences (language, color, in-game settings)</ListItem>
          </UnorderedList>

          <Heading as="h2" size="sm" color="white" mt={4}>What may be retained</Heading>
          <UnorderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem>Anonymized analytics that are no longer linked to you personally</ListItem>
            <ListItem>Encrypted database backups, which expire within 30 days</ListItem>
          </UnorderedList>

          <Heading as="h2" size="sm" color="white" mt={4}>Guest accounts</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Guest accounts are automatically and permanently deleted the moment you sign out. There is no recovery.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default DeleteAccount
