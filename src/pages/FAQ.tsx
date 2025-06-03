import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
  Image,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
  Divider
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Footer, PageBackground } from '../components'

interface FAQSection {
  title: string
  items: {
    question: string
    answer: React.ReactNode
  }[]
}

const faqSections: FAQSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "How do I start a game?",
        answer: (
          <Box>
            <Text mb={3}>You can either:</Text>
            <UnorderedList spacing={2}>
              <ListItem>Create a room as host (tap "Create Room")</ListItem>
              <ListItem>Join an existing room with a 6-letter code (tap "Join Room")</ListItem>
              <ListItem>At least 3 players are needed to start a game</ListItem>
            </UnorderedList>
          </Box>
        )
      },
      {
        question: "How many players can play?",
        answer: (
          <Box>
            <Text mb={3}>SpySocial supports 3 to 21 players. The recommended number of spies scales with player count:</Text>
            <UnorderedList spacing={2}>
              <ListItem>3-5 players: 1 spy</ListItem>
              <ListItem>6-8 players: 2 spies</ListItem>
              <ListItem>9+ players: 3 spies</ListItem>
            </UnorderedList>
          </Box>
        )
      }
    ]
  },
  {
    title: "Game Modes",
    items: [
      {
        question: "What game modes are available?",
        answer: (
          <Box>
            <Text mb={3}>SpySocial offers two modes:</Text>
            <UnorderedList spacing={2}>
              <ListItem><Text as="span" fontWeight="medium">Classic:</Text> Standard spy game where spies don't know each other</ListItem>
              <ListItem><Text as="span" fontWeight="medium">Spy Mafia:</Text> Spies can see who the other spies are, enabling coordinated play</ListItem>
            </UnorderedList>
          </Box>
        )
      }
    ]
  },
  {
    title: "Language Support",
    items: [
      {
        question: "How do languages work in the game?",
        answer: (
          <Box>
            <Text mb={3}>SpySocial supports English, Spanish, and Russian:</Text>
            <UnorderedList spacing={2}>
              <ListItem>You can set your personal interface language in your profile</ListItem>
              <ListItem>The host sets the game language for locations</ListItem>
              <ListItem>If your profile language differs from the game language, you'll see both</ListItem>
            </UnorderedList>
          </Box>
        )
      }
    ]
  },
  {
    title: "Troubleshooting",
    items: [
      {
        question: "The room code isn't working?",
        answer: (
          <Box>
            <Text mb={3}>Check that:</Text>
            <UnorderedList spacing={2}>
              <ListItem>You've entered exactly 6 letters</ListItem>
              <ListItem>The room hasn't been closed by the host</ListItem>
              <ListItem>You have a stable internet connection</ListItem>
              <ListItem>All players are using the latest app version</ListItem>
            </UnorderedList>
          </Box>
        )
      },
      {
        question: "Lost connection during a game?",
        answer: (
          <Box>
            <Text mb={3}>The app will automatically try to reconnect you. If that fails:</Text>
            <UnorderedList spacing={2}>
              <ListItem>Check your internet connection</ListItem>
              <ListItem>Reload the app, you should see a label to reconnect on the Play screen</ListItem>
              <ListItem>Your role and game progress will be preserved</ListItem>
            </UnorderedList>
          </Box>
        )
      }
    ]
  },
  {
    title: "Host Controls",
    items: [
      {
        question: "What can the host customize?",
        answer: (
          <Box>
            <Text mb={3}>The host can adjust:</Text>
            <UnorderedList spacing={2}>
              <ListItem>Number of spies</ListItem>
              <ListItem>Game mode (Classic or Spy Mafia)</ListItem>
              <ListItem>Game language</ListItem>
              <ListItem>Turn duration</ListItem>
              <ListItem>Voting rules</ListItem>
            </UnorderedList>
          </Box>
        )
      }
    ]
  }
]

const FAQ = () => {
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
            spacing={8} 
            bg="white" 
            p={{ base: 6, md: 10 }}
            borderRadius="md" 
            boxShadow="xl"
            width="100%"
            align="stretch"
          >
            <Heading as="h1" size="xl" textAlign="center">
              Frequently Asked Questions
            </Heading>

            <VStack spacing={8} align="stretch" divider={<Divider />}>
              {faqSections.map((section, idx) => (
                <Box key={idx}>
                  <Heading as="h2" size="lg" mb={4} color="blue.600">
                    {section.title}
                  </Heading>
                  <Accordion allowMultiple>
                    {section.items.map((item, itemIdx) => (
                      <AccordionItem 
                        key={itemIdx}
                        border="none"
                        mb={2}
                      >
                        <AccordionButton
                          bg="blue.50"
                          _hover={{ bg: 'blue.100' }}
                          _expanded={{ bg: 'blue.100' }}
                          borderRadius="md"
                          p={4}
                          transition="all 0.2s"
                        >
                          <Box flex="1" textAlign="left" fontWeight="medium">
                            {item.question}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel 
                          pb={4} 
                          pt={4}
                          px={4}
                        >
                          {item.answer}
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Box>
              ))}
            </VStack>

            <Box textAlign="center" mt={8}>
              <Text color="gray.600" mb={8}>
                Need more help? Contact us at{' '}
                <ChakraLink 
                  as={Link} 
                  to="/contact-us"
                  color="blue.500"
                  _hover={{ textDecoration: 'underline' }}
                >
                  support@spysocial.app
                </ChakraLink>
              </Text>
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

export default FAQ 