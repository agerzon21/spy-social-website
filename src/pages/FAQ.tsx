import { Box, Container, Heading, Text, VStack, Link as ChakraLink, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, UnorderedList, ListItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface FAQSection {
  title: string
  items: { question: string; answer: React.ReactNode }[]
}

const faqSections: FAQSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "How do I start a game?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>Create a room as host (tap "Create Room")</ListItem>
            <ListItem>Join an existing room with a 6-letter code</ListItem>
            <ListItem>At least 3 players are needed to start</ListItem>
          </UnorderedList>
        )
      },
      {
        question: "How many players can play?",
        answer: (
          <Box>
            <Text mb={2}>3 to 21 players. Recommended spies:</Text>
            <UnorderedList spacing={1.5}>
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
          <UnorderedList spacing={1.5}>
            <ListItem><Text as="span" fontWeight="500" color="whiteAlpha.800">Classic:</Text> Spies don't know each other</ListItem>
            <ListItem><Text as="span" fontWeight="500" color="whiteAlpha.800">Spy Mafia:</Text> Spies can see who the other spies are</ListItem>
          </UnorderedList>
        )
      }
    ]
  },
  {
    title: "Language Support",
    items: [
      {
        question: "How do languages work?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>Set your interface language in your profile</ListItem>
            <ListItem>The host sets the game language for locations</ListItem>
            <ListItem>If languages differ, you'll see both</ListItem>
          </UnorderedList>
        )
      }
    ]
  },
  {
    title: "Troubleshooting",
    items: [
      {
        question: "Room code isn't working?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>Check you've entered exactly 6 letters</ListItem>
            <ListItem>Make sure the room hasn't been closed</ListItem>
            <ListItem>Verify your internet connection</ListItem>
          </UnorderedList>
        )
      },
      {
        question: "Lost connection?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>The app will try to reconnect automatically</ListItem>
            <ListItem>Reload the app to see a reconnect option</ListItem>
            <ListItem>Your role and progress will be preserved</ListItem>
          </UnorderedList>
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
          <UnorderedList spacing={1.5}>
            <ListItem>Number of spies and game mode</ListItem>
            <ListItem>Game language and turn duration</ListItem>
            <ListItem>Voting rules</ListItem>
          </UnorderedList>
        )
      }
    ]
  }
]

const FAQ = () => {
  return (
    <Box flex="1" color="whiteAlpha.700" pt={{ base: 10, md: 16 }} pb={{ base: 20, md: 24 }}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="lg" color="white">Support & FAQ</Heading>

          {faqSections.map((section, idx) => (
            <Box key={idx}>
              <Text fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.08em" color="whiteAlpha.400" mb={3}>
                {section.title}
              </Text>
              <Accordion allowMultiple>
                {section.items.map((item, itemIdx) => (
                  <AccordionItem key={itemIdx} border="none" mb={2}>
                    <AccordionButton
                      bg="whiteAlpha.50"
                      _hover={{ bg: 'whiteAlpha.100' }}
                      _expanded={{ bg: 'whiteAlpha.100' }}
                      borderRadius="lg"
                      px={4}
                      py={3}
                    >
                      <Box flex="1" textAlign="left" fontWeight="500" fontSize="sm" color="whiteAlpha.800">{item.question}</Box>
                      <AccordionIcon color="whiteAlpha.400" />
                    </AccordionButton>
                    <AccordionPanel pb={3} pt={3} px={4} fontSize="sm" color="whiteAlpha.600">
                      {item.answer}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>
          ))}

          <Text fontSize="sm" color="whiteAlpha.400" pt={4}>
            Need more help?{' '}
            <ChakraLink as={Link} to="/contact-us" color="blue.300" _hover={{ color: 'blue.200' }}>support@spysocial.app</ChakraLink>
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default FAQ
