import { Box, Container, Heading, Text, VStack, Link as ChakraLink, ListItem, UnorderedList, Image, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Footer, PageBackground } from '../components'

const Terms: React.FC = () => {
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
              Terms of Service for SpySocial
            </Heading>
            
            <Text fontWeight="bold" fontSize="sm" color="gray.600" textAlign="center" width="100%">
              Last Updated: May 16, 2025
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Agreement to Terms
            </Heading>
            <Text>
              By accessing or using SpySocial ("the App"), you agree to be bound by these Terms of Service ("Terms"). 
              If you disagree with any part of the Terms, you do not have permission to access or use the App.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Description of Service
            </Heading>
            <Text>
              SpySocial is a multiplayer social deduction game where players gather in-person and use the App to 
              facilitate gameplay. The App provides game management, role assignment, and gameplay assistance features.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              User Accounts
            </Heading>
            
            <Heading as="h3" size="md" mt={2}>
              Account Creation
            </Heading>
            <Text>
              To use certain features of the App, you may need to create an account and provide certain information. 
              You are responsible for maintaining the confidentiality of your account information and are fully 
              responsible for all activities under your account.
            </Text>
            
            <Heading as="h3" size="md" mt={2}>
              Account Requirements
            </Heading>
            <Text>
              You must provide accurate, current, and complete information during the registration process and 
              update such information to keep it accurate, current, and complete.
            </Text>
            
            <Heading as="h3" size="md" mt={2}>
              Account Termination
            </Heading>
            <Text>
              We reserve the right to suspend or terminate your account and access to the App if you violate 
              these Terms or if we believe your actions may cause liability for us or other users.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              User Conduct
            </Heading>
            <Text>
              You agree not to use the App to:
            </Text>
            <UnorderedList spacing={2} pl={4}>
              <ListItem>Harass, abuse, or harm another person or engage in any form of bullying or harassment</ListItem>
              <ListItem>Use offensive, discriminatory, or inappropriate display names or content</ListItem>
              <ListItem>Impersonate any person or entity or falsely state or misrepresent your affiliation</ListItem>
              <ListItem>Attempt to circumvent any content filtering techniques or security measures</ListItem>
              <ListItem>Upload or transmit viruses, malware, or other malicious code</ListItem>
              <ListItem>Interfere with or disrupt the App or servers or networks</ListItem>
              <ListItem>Collect or store personal data about other users without their consent</ListItem>
              <ListItem>Use the App for any illegal purpose</ListItem>
            </UnorderedList>
            
            <Heading as="h2" size="lg" mt={4}>
              Intellectual Property
            </Heading>
            
            <Heading as="h3" size="md" mt={2}>
              Our Intellectual Property
            </Heading>
            <Text>
              The App and its original content, features, and functionality are owned by SpySocial and are protected 
              by copyright, trademark, and other intellectual property laws. You may not copy, modify, create 
              derivative works, publicly display or perform, republish, or distribute any material from our App 
              without our prior written consent.
            </Text>
            
            <Heading as="h3" size="md" mt={2}>
              User Content
            </Heading>
            <Text>
              By submitting content within the App (such as display names or avatar images), you grant us a worldwide, 
              non-exclusive, royalty-free license to use, reproduce, and display such content in connection with 
              providing and promoting the App.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Disclaimers
            </Heading>
            
            <Heading as="h3" size="md" mt={2}>
              As-Is Service
            </Heading>
            <Text>
              The App is provided on an "as is" and "as available" basis without warranties of any kind, either 
              express or implied.
            </Text>
            
            <Heading as="h3" size="md" mt={2}>
              Technical Issues
            </Heading>
            <Text>
              We do not guarantee that the App will always be secure, error-free, or available at any particular 
              time or location.
            </Text>
            
            <Heading as="h3" size="md" mt={2}>
              Third-Party Links
            </Heading>
            <Text>
              The App may contain links to third-party websites or services that are not owned or controlled by us. 
              We have no control over and assume no responsibility for the content, privacy policies, or practices 
              of any third-party websites or services.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Limitation of Liability
            </Heading>
            <Text>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your access to or use of, or inability to access or 
              use, the App.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Indemnification
            </Heading>
            <Text>
              You agree to defend, indemnify, and hold us harmless from and against any claims, liabilities, damages, 
              losses, and expenses arising out of or in any way connected with your access to or use of the App or 
              your violation of these Terms.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Changes to These Terms
            </Heading>
            <Text>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
              provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change 
              will be determined at our sole discretion.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Governing Law
            </Heading>
            <Text>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without 
              regard to its conflict of law provisions.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Severability
            </Heading>
            <Text>
              If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck 
              and the remaining provisions shall be enforced.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Entire Agreement
            </Heading>
            <Text>
              These Terms constitute the entire agreement between you and us regarding our App and supersede any prior 
              agreements.
            </Text>
            
            <Heading as="h2" size="lg" mt={4}>
              Contact Us
            </Heading>
            <Text>
              If you have any questions about these Terms, please contact us at:
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

export default Terms 