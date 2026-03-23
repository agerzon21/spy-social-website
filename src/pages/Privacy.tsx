import { Box, Container, Heading, Text, VStack, Link as ChakraLink, ListItem, UnorderedList } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Privacy: React.FC = () => {
  return (
    <Box flex="1" color="whiteAlpha.700" pt={{ base: 10, md: 16 }} pb={{ base: 20, md: 24 }}>
      <Container maxW="container.md">
        <VStack spacing={5} align="start">
          <Box>
            <Heading as="h1" size="lg" color="white" mb={2}>Privacy Policy for SpySocial</Heading>
            <Text fontSize="xs" color="whiteAlpha.400">Last Updated: May 16, 2025</Text>
          </Box>

          <Heading as="h2" size="sm" color="white" mt={4}>Introduction</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Welcome to SpySocial ("we," "our," or "us"). We respect your privacy and are committed to
            protecting your personal data. This privacy policy will inform you about how we handle your
            personal information when you use our app and tell you about your privacy rights.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Information We Collect</Heading>
          <Text fontSize="sm" lineHeight="1.8">When you use SpySocial, we collect the following information:</Text>
          <UnorderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem><Text as="span" fontWeight="600" color="whiteAlpha.800">Account Information:</Text> Display name, username, and optional avatar image you provide when creating an account</ListItem>
            <ListItem><Text as="span" fontWeight="600" color="whiteAlpha.800">Game Data:</Text> Information related to games you've played, including your role assignments and game results</ListItem>
            <ListItem><Text as="span" fontWeight="600" color="whiteAlpha.800">Usage Data:</Text> Anonymous information about how you interact with the app to improve functionality</ListItem>
            <ListItem><Text as="span" fontWeight="600" color="whiteAlpha.800">Device Information:</Text> Basic information about your device such as model, operating system version, and unique device identifiers</ListItem>
            <ListItem><Text as="span" fontWeight="600" color="whiteAlpha.800">Connection Information:</Text> IP address and network status information to optimize gameplay connections</ListItem>
          </UnorderedList>

          <Heading as="h2" size="sm" color="white" mt={4}>How We Use Your Information</Heading>
          <Text fontSize="sm" lineHeight="1.8">We use your information to:</Text>
          <UnorderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem>Create and manage your account</ListItem>
            <ListItem>Enable multiplayer game functionality</ListItem>
            <ListItem>Improve and optimize the app experience</ListItem>
            <ListItem>Troubleshoot issues and provide support</ListItem>
            <ListItem>Analyze usage patterns to enhance game design and user experience</ListItem>
            <ListItem>Protect against fraudulent or unauthorized activity</ListItem>
          </UnorderedList>

          <Heading as="h2" size="sm" color="white" mt={4}>Legal Basis for Processing</Heading>
          <Text fontSize="sm" lineHeight="1.8">We process your information based on the following legal grounds:</Text>
          <UnorderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem><Text as="span" fontWeight="600" color="whiteAlpha.800">Performance of Contract:</Text> To provide you with the app services you've requested</ListItem>
            <ListItem><Text as="span" fontWeight="600" color="whiteAlpha.800">Legitimate Interests:</Text> To improve our services, ensure security, and enhance user experience</ListItem>
            <ListItem><Text as="span" fontWeight="600" color="whiteAlpha.800">Consent:</Text> Where you have specifically agreed to certain data collection or processing</ListItem>
            <ListItem><Text as="span" fontWeight="600" color="whiteAlpha.800">Legal Obligations:</Text> To comply with applicable laws and regulations</ListItem>
          </UnorderedList>

          <Heading as="h2" size="sm" color="white" mt={4}>Data Retention</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            We store your account information and game data for as long as you maintain an account with us.
            Inactive accounts may be removed after 12 months of inactivity. You can request deletion of your
            data at any time by contacting us.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Third-Party Service Providers</Heading>
          <Text fontSize="sm" lineHeight="1.8">We use the following service providers to help deliver our services:</Text>
          <UnorderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem><Text as="span" fontWeight="600" color="whiteAlpha.800">Supabase</Text> (https://supabase.io): Our database service provider that helps us store and manage your data securely</ListItem>
            <ListItem><Text as="span" fontWeight="600" color="whiteAlpha.800">Expo</Text> (https://expo.dev): Development platform used to build and maintain our app</ListItem>
          </UnorderedList>
          <Text fontSize="sm" lineHeight="1.8">These providers are contractually bound to handle your data in accordance with this privacy policy.</Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Data Storage and Security</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Your data is stored in our Supabase database with appropriate security measures in place. We implement
            reasonable security practices including encryption, access controls, and regular security reviews to
            protect your information from unauthorized access or disclosure.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>International Transfers</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Your information may be stored and processed in servers located outside of your country of residence,
            including in the United States, where our servers and some of our service providers are located.
            By using SpySocial, you consent to the transfer of your information to these locations, which may
            have different data protection rules than your country.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Data Sharing</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            We do not sell your personal information to third parties. Your display name and avatar may be visible
            to other players during multiplayer games. We may share anonymous, aggregated data for analytics purposes.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Your Rights</Heading>
          <Text fontSize="sm" lineHeight="1.8">Depending on your location, you may have the right to:</Text>
          <UnorderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem>Access the personal information we have about you</ListItem>
            <ListItem>Correct inaccurate information</ListItem>
            <ListItem>Delete your personal information</ListItem>
            <ListItem>Object to or restrict certain processing of your data</ListItem>
            <ListItem>Data portability (receiving your data in a usable format)</ListItem>
            <ListItem>Withdraw consent where processing is based on consent</ListItem>
          </UnorderedList>
          <Text fontSize="sm" lineHeight="1.8" mt={2}>
            To exercise these rights, please contact us at{' '}
            <ChakraLink as={Link} to="/contact-us" color="blue.300" _hover={{ color: 'blue.200' }}>support@spysocial.app</ChakraLink>
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>California Privacy Rights</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            If you are a California resident, you have specific rights regarding your personal information under
            the California Consumer Privacy Act (CCPA). You have the right to request information about how we
            collect, use, and disclose your personal information, and to request access to and deletion of your
            personal information.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>European Economic Area (EEA) Users</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            If you are in the EEA, you have certain rights under the General Data Protection Regulation (GDPR).
            In addition to the rights listed above, you have the right to lodge a complaint with your local data
            protection authority.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Children's Privacy</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Our app is not intended for children under 13 years of age (or the applicable age in your country),
            and we do not knowingly collect personal information from children. If we learn we have collected
            personal information from a child without parental consent, we will delete that information as
            quickly as possible.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Do Not Track Signals</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Some browsers have a "Do Not Track" feature that signals websites not to track your online activity.
            We currently do not respond to Do Not Track signals, as there is not yet a common understanding of how
            to interpret these signals.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Changes to This Privacy Policy</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            We may update this privacy policy from time to time. We will notify you of any changes by posting
            the new privacy policy on this page and updating the "Last Updated" date. For significant changes,
            we may also provide additional notice, such as an in-app notification.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>Contact Us</Heading>
          <Text fontSize="sm" lineHeight="1.8">
            If you have any questions about this privacy policy or our data practices, please contact us at:{' '}
            <ChakraLink as={Link} to="/contact-us" color="blue.300" _hover={{ color: 'blue.200' }}>support@spysocial.app</ChakraLink>
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Privacy
