import { Box, Container, Heading, Text, VStack, Link as ChakraLink, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, UnorderedList, ListItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface FAQSection {
  title: string
  items: { question: string; answer: React.ReactNode }[]
}

const Strong = ({ children }: { children: React.ReactNode }) => (
  <Text as="span" fontWeight="500" color="whiteAlpha.800">{children}</Text>
)

const faqSections: FAQSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "How do I start a game?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>Tap <Strong>Create Room</Strong> to host, or join with a 5-character room code</ListItem>
            <ListItem>You need at least 3 players to start a round</ListItem>
            <ListItem>Share the room with friends via the share sheet, QR code, or link</ListItem>
          </UnorderedList>
        )
      },
      {
        question: "First time playing?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>The app walks you through a quick tutorial on first launch</ListItem>
            <ListItem>You'll be prompted to set up a profile (display name and optional avatar)</ListItem>
            <ListItem>Then you're dropped onto the home screen, ready to host or join</ListItem>
          </UnorderedList>
        )
      },
      {
        question: "How many players can play?",
        answer: (
          <Box>
            <Text mb={2}>3 to 21 players. Recommended spies:</Text>
            <UnorderedList spacing={1.5}>
              <ListItem>3–5 players: 1 spy</ListItem>
              <ListItem>6–8 players: 2 spies</ListItem>
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
            <ListItem><Strong>Classic:</Strong> Spies don't know each other</ListItem>
            <ListItem><Strong>Spy Mafia:</Strong> Spies can see who the other spies are</ListItem>
          </UnorderedList>
        )
      }
    ]
  },
  {
    title: "In-Game Features",
    items: [
      {
        question: "What is the Notebook?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>Tap the notebook icon during a round to jot down notes about who said what</ListItem>
            <ListItem>Players are smart-sorted: active players with notes first, then other active players, then eliminated players last</ListItem>
            <ListItem>Notes are private — only you can see them</ListItem>
          </UnorderedList>
        )
      },
      {
        question: "How do hints work across languages?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>Hints are always shown in the <Strong>game language</Strong> so everyone at the table reads the same prompt</ListItem>
            <ListItem>If your interface language is different, tap the hint to see it translated for you</ListItem>
            <ListItem>Use the dedicated reload icon to refresh a hint — tapping the sentence won't accidentally re-roll it</ListItem>
          </UnorderedList>
        )
      },
      {
        question: "What's a poke?",
        answer: (
          <Text>Tap a teammate's card in the lobby to send them a quick poke — handy for getting attention before the round starts.</Text>
        )
      },
      {
        question: "Can I leave mid-game?",
        answer: (
          <Text>Yes — every in-game screen has a Leave button so you can exit without backing all the way out.</Text>
        )
      }
    ]
  },
  {
    title: "Sharing & Joining Rooms",
    items: [
      {
        question: "How do I share a room with friends?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem><Strong>Share sheet:</Strong> Use your phone's native share sheet to send the link anywhere</ListItem>
            <ListItem><Strong>QR code:</Strong> Friends nearby can scan to join instantly</ListItem>
            <ListItem><Strong>Verbal:</Strong> Just read out the 5-character code</ListItem>
          </UnorderedList>
        )
      },
      {
        question: "Can someone join from a link?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>Yes — links like <Strong>spysocial.app/join/&lt;code&gt;</Strong> open the app directly into the room</ListItem>
            <ListItem>If they don't have the app, the link takes them to the App Store</ListItem>
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
            <ListItem>The host picks the game language for locations and hints</ListItem>
            <ListItem>SpySocial supports full parity across <Strong>English, Spanish, and Russian</Strong></ListItem>
            <ListItem>If your language differs from the host's, you'll see translations where it matters</ListItem>
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
            <ListItem>Voting rules and whether the vote-caller is revealed</ListItem>
            <ListItem>Location packs to draw from</ListItem>
          </UnorderedList>
        )
      },
      {
        question: "Can the host end a game early?",
        answer: (
          <Text>Yes — hosts have an <Strong>End Game</Strong> control to wrap things up at any point during play.</Text>
        )
      }
    ]
  },
  {
    title: "Account & Sign-in",
    items: [
      {
        question: "Do I need an account?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>You can play as a guest without signing up</ListItem>
            <ListItem>Creating an account lets you keep your profile and progress across devices</ListItem>
            <ListItem>You can upgrade a guest profile to a full account at any time without losing anything</ListItem>
          </UnorderedList>
        )
      },
      {
        question: "I forgot my password",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>Tap "Forgot password" on the login screen and enter your email</ListItem>
            <ListItem>You'll get a reset link — opening it brings you to a secure reset page</ListItem>
            <ListItem>If the link expired, just request a new one</ListItem>
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
            <ListItem>Codes are now <Strong>5 characters</Strong> (older 6-character codes still work)</ListItem>
            <ListItem>Make sure the host hasn't closed the room or started the game</ListItem>
            <ListItem>Check your internet connection</ListItem>
          </UnorderedList>
        )
      },
      {
        question: "Lost connection?",
        answer: (
          <UnorderedList spacing={1.5}>
            <ListItem>The app reconnects automatically — there's no need to reload</ListItem>
            <ListItem>Your role and progress are preserved while you're away</ListItem>
            <ListItem>If you're stuck on a "reconnecting" screen for more than a few seconds, your network may be off — toggle airplane mode or switch Wi-Fi/cellular</ListItem>
          </UnorderedList>
        )
      },
      {
        question: "App says I'm offline but I'm not?",
        answer: (
          <Text>This was an iOS quirk in older versions; v2.0.0 verifies your connection with a real network probe before showing the offline state. If it still happens, force-close and reopen the app.</Text>
        )
      }
    ]
  }
]

const FAQ = () => {
  return (
    <Box flex="1" color="whiteAlpha.700" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
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
