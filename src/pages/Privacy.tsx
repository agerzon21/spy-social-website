import { Box, Container, Heading, Text, VStack, Link as ChakraLink, ListItem, UnorderedList, Image, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Footer, PageBackground } from '../components'

const Privacy: React.FC = () => {
  return (
    <Box 
      minH="100vh" 
      display="flex" 
      flexDirection="column" 
      width="100vw" 
      maxWidth="100%" 
      overflowX="hidden"
    >
      <PageBackground>
        <Flex justify="center" pt={{ base: 8, md: 10 }} pb={{ base: 6, md: 10 }}>
          <ChakraLink as={Link} to="/">
            <Image 
              src="/images/logo.svg" 
              alt="SpySocial Logo"
              width={{ base: "60%", md: "350px" }}
              maxWidth="350px"
              height="auto"
              filter="drop-shadow(0 0 25px rgba(64, 146, 255, 0.4))"
              transition="all 0.2s"
              _hover={{ 
                transform: "scale(1.05)",
                filter: "drop-shadow(0 0 15px rgba(64, 146, 255, 0.6))"
              }}
              mx="auto"
            />
          </ChakraLink>
        </Flex>
        
        <Container maxW="container.md" pb={{ base: 16, md: 20 }}>
          <VStack 
            spacing={6} 
            bg="white" 
            p={{ base: 6, md: 10 }}
            borderRadius="md" 
            boxShadow="xl"
            width="100%"
            align="start"
          >
            <Heading as="h1" size="xl" textAlign="center" width="100%">
              Privacy Policy for SpySocial
            </Heading>
            
            <Text fontWeight="bold" fontSize="sm" color="gray.600" textAlign="center" width="100%">
              Last Updated: May 16, 2025
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Introduction
            </Heading>
            <Text>
              Welcome to SpySocial ("we," "our," or "us"). We respect your privacy and are committed to 
              protecting your personal data. This privacy policy will inform you about how we handle your 
              personal information when you use our app and tell you about your privacy rights.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Information We Collect
            </Heading>
            <Text>
              When you use SpySocial, we collect the following information:
            </Text>
            <UnorderedList spacing={2} pl={4}>
              <ListItem>
                <Text as="span" fontWeight="bold">Account Information:</Text> Display name, username, 
                and optional avatar image you provide when creating an account
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">Game Data:</Text> Information related to games you've played, 
                including your role assignments and game results
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">Usage Data:</Text> Anonymous information about how you 
                interact with the app to improve functionality
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">Device Information:</Text> Basic information about your device 
                such as model, operating system version, and unique device identifiers
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">Connection Information:</Text> IP address and network status 
                information to optimize gameplay connections
              </ListItem>
            </UnorderedList>
            
            <Heading as="h2" size="lg" mt={4}>
              How We Use Your Information
            </Heading>
            <Text>
              We use your information to:
            </Text>
            <UnorderedList spacing={2} pl={4}>
              <ListItem>Create and manage your account</ListItem>
              <ListItem>Enable multiplayer game functionality</ListItem>
              <ListItem>Improve and optimize the app experience</ListItem>
              <ListItem>Troubleshoot issues and provide support</ListItem>
              <ListItem>Analyze usage patterns to enhance game design and user experience</ListItem>
              <ListItem>Protect against fraudulent or unauthorized activity</ListItem>
            </UnorderedList>
            
            <Heading as="h2" size="lg" mt={4}>
              Legal Basis for Processing
            </Heading>
            <Text>
              We process your information based on the following legal grounds:
            </Text>
            <UnorderedList spacing={2} pl={4}>
              <ListItem>
                <Text as="span" fontWeight="bold">Performance of Contract:</Text> To provide you with the app 
                services you've requested
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">Legitimate Interests:</Text> To improve our services, ensure 
                security, and enhance user experience
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">Consent:</Text> Where you have specifically agreed to certain 
                data collection or processing
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">Legal Obligations:</Text> To comply with applicable laws and regulations
              </ListItem>
            </UnorderedList>
            
            <Heading as="h2" size="lg" mt={4}>
              Data Retention
            </Heading>
            <Text>
              We store your account information and game data for as long as you maintain an account with us. 
              Inactive accounts may be removed after 12 months of inactivity. You can request deletion of your 
              data at any time by contacting us.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Third-Party Service Providers
            </Heading>
            <Text>
              We use the following service providers to help deliver our services:
            </Text>
            <UnorderedList spacing={2} pl={4}>
              <ListItem>
                <Text as="span" fontWeight="bold">Supabase</Text> (https://supabase.io): Our database service provider 
                that helps us store and manage your data securely
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">Expo</Text> (https://expo.dev): Development platform used to build 
                and maintain our app
              </ListItem>
            </UnorderedList>
            <Text>
              These providers are contractually bound to handle your data in accordance with this privacy policy.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Data Storage and Security
            </Heading>
            <Text>
              Your data is stored in our Supabase database with appropriate security measures in place. We implement 
              reasonable security practices including encryption, access controls, and regular security reviews to 
              protect your information from unauthorized access or disclosure.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              International Transfers
            </Heading>
            <Text>
              Your information may be stored and processed in servers located outside of your country of residence, 
              including in the United States, where our servers and some of our service providers are located. 
              By using SpySocial, you consent to the transfer of your information to these locations, which may 
              have different data protection rules than your country.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Data Sharing
            </Heading>
            <Text>
              We do not sell your personal information to third parties. Your display name and avatar may be visible 
              to other players during multiplayer games. We may share anonymous, aggregated data for analytics purposes.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Your Rights
            </Heading>
            <Text>
              Depending on your location, you may have the right to:
            </Text>
            <UnorderedList spacing={2} pl={4}>
              <ListItem>Access the personal information we have about you</ListItem>
              <ListItem>Correct inaccurate information</ListItem>
              <ListItem>Delete your personal information</ListItem>
              <ListItem>Object to or restrict certain processing of your data</ListItem>
              <ListItem>Data portability (receiving your data in a usable format)</ListItem>
              <ListItem>Withdraw consent where processing is based on consent</ListItem>
            </UnorderedList>
            <Text mt={2}>
              To exercise these rights, please contact us at support@spysocial.app.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              California Privacy Rights
            </Heading>
            <Text>
              If you are a California resident, you have specific rights regarding your personal information under 
              the California Consumer Privacy Act (CCPA). You have the right to request information about how we 
              collect, use, and disclose your personal information, and to request access to and deletion of your 
              personal information.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              European Economic Area (EEA) Users
            </Heading>
            <Text>
              If you are in the EEA, you have certain rights under the General Data Protection Regulation (GDPR). 
              In addition to the rights listed above, you have the right to lodge a complaint with your local data 
              protection authority.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Children's Privacy
            </Heading>
            <Text>
              Our app is not intended for children under 13 years of age (or the applicable age in your country), 
              and we do not knowingly collect personal information from children. If we learn we have collected 
              personal information from a child without parental consent, we will delete that information as 
              quickly as possible.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Do Not Track Signals
            </Heading>
            <Text>
              Some browsers have a "Do Not Track" feature that signals websites not to track your online activity. 
              We currently do not respond to Do Not Track signals, as there is not yet a common understanding of how 
              to interpret these signals.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Changes to This Privacy Policy
            </Heading>
            <Text>
              We may update this privacy policy from time to time. We will notify you of any changes by posting 
              the new privacy policy on this page and updating the "Last Updated" date. For significant changes, 
              we may also provide additional notice, such as an in-app notification.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Contact Us
            </Heading>
            <Text>
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </Text>
            <Text mt={2} fontWeight="medium">
              support@spysocial.app
            </Text>
            
            <Box width="100%" textAlign="center" mt={8}>
              <ChakraLink as={Link} to="/" color="blue.500">
                Return to Home
              </ChakraLink>
            </Box>
          </VStack>
        </Container>
      </PageBackground>
      <Footer />
    </Box>
  )
}

export default Privacy 