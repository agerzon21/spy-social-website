import { Box, Container, Heading, Text, VStack, HStack, Icon, Link as ChakraLink } from '@chakra-ui/react'
import { useState } from 'react'
import { FiCopy, FiCheck, FiMail } from 'react-icons/fi'
import { FaApple } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useThemedToast } from '../lib/useThemedToast'

const Support = () => {
  const [copied, setCopied] = useState(false)
  const toast = useThemedToast()
  const email = 'support@spysocial.app'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      toast({ title: 'Email copied!', status: 'success', duration: 2000, isClosable: true })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({ title: 'Failed to copy', status: 'error', duration: 2000, isClosable: true })
    }
  }

  return (
    <Box flex="1" pt={{ base: 12, md: 20 }} pb={{ base: 12, md: 16 }}>
      <Container maxW="container.sm">
        <VStack spacing={10} align="stretch">
          {/* Header */}
          <VStack spacing={3} textAlign="center">
            <Heading as="h1" size="xl" color="white" fontWeight="600" letterSpacing="-0.02em">
              How can we help?
            </Heading>
            <Text fontSize="md" color="whiteAlpha.500" maxW="400px">
              We're here to help with any questions or issues you have with SpySocial.
            </Text>
          </VStack>

          {/* Contact card */}
          <Box
            bg="whiteAlpha.50"
            borderRadius="xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            p={{ base: 6, md: 8 }}
          >
            <VStack spacing={4} align="stretch">
              <HStack spacing={3}>
                <Box
                  w="36px"
                  h="36px"
                  borderRadius="lg"
                  bg="blue.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiMail} color="white" boxSize={4} />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="600" color="white">Email us</Text>
                  <Text fontSize="xs" color="whiteAlpha.500">We typically respond within 24 hours</Text>
                </Box>
              </HStack>

              <Box
                px={4}
                py={3}
                bg="whiteAlpha.100"
                borderRadius="lg"
                cursor="pointer"
                onClick={handleCopy}
                transition="all 0.2s"
                _hover={{ bg: 'whiteAlpha.150' }}
              >
                <HStack spacing={3} justify="space-between">
                  <Text fontSize="sm" fontWeight="500" color="blue.300">{email}</Text>
                  <Icon as={copied ? FiCheck : FiCopy} color={copied ? "green.400" : "whiteAlpha.400"} boxSize={4} />
                </HStack>
              </Box>
            </VStack>
          </Box>

          {/* Quick links */}
          <VStack spacing={3} align="stretch">
            <Text fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.08em" color="whiteAlpha.400">
              Quick links
            </Text>

            <ChakraLink
              as={Link}
              to="/support"
              _hover={{ textDecoration: 'none' }}
            >
              <HStack
                spacing={3}
                p={4}
                bg="whiteAlpha.50"
                borderRadius="lg"
                border="1px solid"
                borderColor="whiteAlpha.100"
                transition="all 0.2s"
                _hover={{ bg: 'whiteAlpha.100' }}
              >
                <Text fontSize="sm" color="whiteAlpha.700" flex="1">FAQ & Troubleshooting</Text>
                <Text color="whiteAlpha.300">&rarr;</Text>
              </HStack>
            </ChakraLink>

            <Box
              as="a"
              href="https://apps.apple.com/us/app/spysocial-a-party-game/id6746734390"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HStack
                spacing={3}
                p={4}
                bg="whiteAlpha.50"
                borderRadius="lg"
                border="1px solid"
                borderColor="whiteAlpha.100"
                transition="all 0.2s"
                _hover={{ bg: 'whiteAlpha.100' }}
              >
                <Icon as={FaApple} color="whiteAlpha.600" boxSize={4} />
                <Text fontSize="sm" color="whiteAlpha.700" flex="1">Rate us on the App Store</Text>
                <Text color="whiteAlpha.300">&rarr;</Text>
              </HStack>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Support
