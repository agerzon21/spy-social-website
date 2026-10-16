import { Heading, Text, Link as ChakraLink, ListItem, OrderedList } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AfterDeletionLaw, AfterDeletionList } from '../components/legal/AfterDeletion'
import { deletedAlso, deletedSummary } from '../lib/legalText'
import { PRIVACY, PRIVACY_LAST_UPDATED, avatarsLive } from '../lib/legalRelease'
import { LegalPage } from '../components/legal/LegalPage'

// Google Play's account deletion link. What a deletion removes and keeps comes
// from components/legal/AfterDeletion, the same text as the Privacy Policy.
const DeleteAccount: React.FC = () => {
  return (
    <LegalPage title="Delete Your SpySocial Account" updated={<>Last Updated: {PRIVACY_LAST_UPDATED}</>}>

      <Text textStyle="body">
        You can delete your SpySocial account and the personal data linked to it at any time, in the app or by email.
        For any questions, contact us at{' '}
        <ChakraLink as={Link} to="/contact-us">support@spysocial.app</ChakraLink>
        .
      </Text>

      <Heading as="h2" size="sm" variant="section">How to delete your account from the app</Heading>
      <OrderedList spacing={2} pl={4} textStyle="body">
        <ListItem>Open SpySocial.</ListItem>
        <ListItem>
          Tap your {avatarsLive(PRIVACY) ? 'avatar' : 'picture'} at the top of the home screen to open{' '}
          <Text as="span" fontWeight="600" color="ss.text">Account</Text>.
          {PRIVACY.oldAppsInUse && ' (In versions before 2.2, Account is the icon at the bottom right of the home screen.)'}
        </ListItem>
        <ListItem>
          Tap <Text as="span" fontWeight="600" color="ss.text">Settings</Text> at the top right.
        </ListItem>
        <ListItem>
          Under <Text as="span" fontWeight="600" color="ss.text">Account &amp; Sign-In</Text>, tap{' '}
          <Text as="span" fontWeight="600" color="ss.text">Delete Account</Text> (the last row, in red) and confirm.
          {PRIVACY.oldAppsInUse && ' (In versions before 2.2, Delete Account is in the Danger Zone at the bottom of Account.)'}
        </ListItem>
      </OrderedList>
      <Text textStyle="body">Your account is deleted at once.</Text>

      <Heading as="h2" size="sm" variant="section">Guest accounts</Heading>
      <Text textStyle="body">
        A guest account is deleted the moment you tap <Text as="span" fontWeight="600" color="ss.text">Sign Out</Text> (in
        Settings, under Account &amp; Sign-In; in versions before 2.2, in Account under Account &amp; Security) and confirm. A guest can't sign back
        in, so there is no recovery.
        {PRIVACY.purchases &&
          ' Purchases are the exception, as for any deleted account: anything you bought as a guest comes back with Restore Purchases, on the App Store or Google Play account you paid with.'}
      </Text>

      <Heading as="h2" size="sm" variant="section">Don't have the app installed anymore?</Heading>
      <Text textStyle="body">
        Email{' '}
        <ChakraLink as={Link} to="/contact-us">support@spysocial.app</ChakraLink>
        {' '}from the address tied to your account with the subject "Delete my SpySocial account". Requests are processed within 30 days.
      </Text>

      <Heading as="h2" size="sm" variant="section">What is deleted</Heading>
      <Text textStyle="body">
        Your account and the personal data linked to it: {deletedSummary()}.{deletedAlso()}
      </Text>

      <Heading as="h2" size="sm" variant="section">What stays, and for how long</Heading>
      <AfterDeletionList />
      <AfterDeletionLaw />
      <Text textStyle="body">
        Our{' '}
        <ChakraLink as={Link} to="/privacy">Privacy Policy</ChakraLink>
        {' '}has the details.
      </Text>
    </LegalPage>
  )
}

export default DeleteAccount
