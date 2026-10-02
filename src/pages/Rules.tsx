import { Box, Container, Heading, Link as ChakraLink, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

// The community rules the app links to before a player's first public room
// (www.spysocial.app/rules). Short on purpose: the app shows the same four
// rules; this page adds what counts, what happens and how to appeal.
const Rules: React.FC = () => {
  return (
    <Box flex="1" color="whiteAlpha.700" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={5} align="start">
          <Box>
            <Heading as="h1" size="lg" color="white" mb={2}>
              Community rules
            </Heading>
            <Text fontSize="xs" color="whiteAlpha.400">
              Last updated: October 2, 2026
            </Text>
          </Box>

          <Text fontSize="sm" lineHeight="1.8">
            Public rooms put you in a game with people you don't know. These rules keep it fun for everyone. They
            apply to names, photos, chat, drawings and how you play, in public and private rooms.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>
            1. Be kind
          </Heading>
          <UnorderedList fontSize="sm" lineHeight="1.8" spacing={1}>
            <ListItem>No hate or harassment: no insults aimed at a player, slurs, or attacks on anyone's identity.</ListItem>
            <ListItem>No sexual content in chat, names, photos or drawings.</ListItem>
            <ListItem>No threats, and nothing that encourages anyone to hurt themselves.</ListItem>
          </UnorderedList>

          <Heading as="h2" size="sm" color="white" mt={4}>
            2. Bluff, don't cheat
          </Heading>
          <UnorderedList fontSize="sm" lineHeight="1.8" spacing={1}>
            <ListItem>Lying and bluffing are the game. They are never a reason to report anyone.</ListItem>
            <ListItem>Revealing the word or location, or agreeing with other players outside the game, is cheating.</ListItem>
            <ListItem>Leaving games on purpose, going idle or stalling a round spoils it for the rest of the room.</ListItem>
          </UnorderedList>

          <Heading as="h2" size="sm" color="white" mt={4}>
            3. Keep it private
          </Heading>
          <UnorderedList fontSize="sm" lineHeight="1.8" spacing={1}>
            <ListItem>Don't share real names, addresses, phone numbers or social handles, yours or anyone else's.</ListItem>
            <ListItem>No ads, spam or links in public rooms.</ListItem>
          </UnorderedList>

          <Heading as="h2" size="sm" color="white" mt={4}>
            4. A person reads reports
          </Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Long-press a player or a message to report or block them. A person reads every report, usually within 72
            hours (24 hours for personal information, sexual content or a self-harm concern). Public chat is kept for
            14 days so reports can be checked; the player you report isn't told who sent it.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>
            What happens when someone breaks the rules
          </Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Usually a warning first. Repeated or serious problems lead to a chat mute (1 hour to 7 days), a pause from
            public rooms and events (1 to 30 days), or a ban. Sharing someone's personal information can mean an
            immediate ban. Every notice in the app says what is limited, why, and until when, with an ID like S-207.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>
            Age
          </Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Public rooms and events are for players 13 and older. Younger players can play in private rooms with
            people they know.
          </Text>

          <Heading as="h2" size="sm" color="white" mt={4}>
            Think we got it wrong?
          </Heading>
          <Text fontSize="sm" lineHeight="1.8">
            Email{' '}
            <ChakraLink href="mailto:support@spysocial.app" color="orange.300">
              support@spysocial.app
            </ChakraLink>{' '}
            and quote the ID from your notice. See also the{' '}
            <ChakraLink as={Link} to="/terms" color="orange.300">
              Terms of Service
            </ChakraLink>{' '}
            and{' '}
            <ChakraLink as={Link} to="/privacy" color="orange.300">
              Privacy Policy
            </ChakraLink>
            .
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Rules
