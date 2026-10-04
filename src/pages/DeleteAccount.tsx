import { Box, Container, Heading, Text, VStack, Link as ChakraLink, ListItem, OrderedList } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AfterDeletionLaw, AfterDeletionList } from '../components/legal/AfterDeletion'
import { deletedAlso, deletedSummary } from '../lib/legalText'
import { LEGAL_LAST_UPDATED } from '../lib/legalRelease'

// Google Play's account deletion link. What a deletion removes and keeps comes
// from components/legal/AfterDeletion, the same text as the Privacy Policy.
const DeleteAccount: React.FC = () => {
  return (
    <Box flex="1" color="whiteAlpha.700" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={5} align="start">
          <Box>
            <Heading as="h1" size="lg" color="white" mb={2}>Delete Your SpySocial Account</Heading>
            <Text fontSize="xs" color="whiteAlpha.400">Last Updated: {LEGAL_LAST_UPDATED}</Text>
          </Box>

          <Text fontSize="sm" lineHeight="1.8">
            You can delete your SpySocial account and the personal data linked to it at any time, in the app or by email.
            For any questions, contact us at{' '}
            <ChakraLink as={Link} to="/contact-us" color="blue.300" _hover={{ color: 'blue.200' }}>support@spysocial.app</ChakraLink>
            .
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>How to delete your account from the app</Heading>
          <OrderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem>Open SpySocial.</ListItem>
            <ListItem>
              Tap your picture at the top of the home screen to open <Text as="span" fontWeight="600" color="whiteAlpha.800">Account</Text>.
              (In versions before 2.2, Account is the icon at the bottom right of the home screen.)
            </ListItem>
            <ListItem>Scroll to the <Text as="span" fontWeight="600" color="whiteAlpha.800">Danger Zone</Text> at the bottom.</ListItem>
            <ListItem>Tap <Text as="span" fontWeight="600" color="whiteAlpha.800">Delete Account</Text> and confirm.</ListItem>
          </OrderedList>
          <Text fontSize="sm" lineHeight="1.8">Your account is deleted at once.</Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Guest accounts</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            A guest account is deleted the moment you tap <Text as="span" fontWeight="600" color="whiteAlpha.800">Sign Out</Text> in
            the Danger Zone. A guest can't sign back in, so there is no recovery.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Don't have the app installed anymore?</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Email{' '}
            <ChakraLink as={Link} to="/contact-us" color="blue.300" _hover={{ color: 'blue.200' }}>support@spysocial.app</ChakraLink>
            {' '}from the address tied to your account with the subject "Delete my SpySocial account". Requests are processed within 30 days.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>What is deleted</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Your account and the personal data linked to it: {deletedSummary()}.{deletedAlso()}
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>What stays, and for how long</Heading>
          <AfterDeletionList />
          <AfterDeletionLaw />
          <Text fontSize="sm" lineHeight="1.8">
            Our{' '}
            <ChakraLink as={Link} to="/privacy" color="blue.300" _hover={{ color: 'blue.200' }}>Privacy Policy</ChakraLink>
            {' '}has the details.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default DeleteAccount
