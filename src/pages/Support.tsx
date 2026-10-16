import { Box, Container, Heading, Text, VStack, HStack, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { FiCopy, FiCheck, FiMail } from 'react-icons/fi'
import { FaApple } from 'react-icons/fa'
import { useThemedToast } from '../lib/useThemedToast'
import SocialLinks from '../components/SocialLinks'
import { LinkRow, LinkRows } from '../components/ui/LinkRow'
import { APP_STORE_URL } from '../lib/stores'

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
    <Box flex="1" pt={{ base: 10, md: 16 }} pb={{ base: 16, md: 24 }} bgImage="radial-gradient(70% 320px at 50% 0, var(--ss-glow), transparent 70%)">
      <Container maxW="560px" px={{ base: 4, md: 6 }}>
        <VStack spacing={10} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" size="xl">
              How can we help?
            </Heading>
            <Text fontSize={{ base: '17px', md: '18px' }} color="ss.muted" maxW="400px">
              We're here to help with any questions or issues you have with SpySocial.
            </Text>
          </VStack>

          {/* Contact card */}
          <Box
            bg="ss.surface"
            borderRadius="var(--ss-radius-card)"
            border="var(--ss-card-border) solid"
            borderColor="ss.lineStrong"
            boxShadow="var(--ss-shadow-card)"
            p={{ base: 5, md: 7 }}
          >
            <VStack spacing={4} align="stretch">
              <HStack spacing={3}>
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="var(--ss-radius-control)"
                  bg="ss.accent"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                  aria-hidden
                >
                  <Icon as={FiMail} color="ss.onAccent" boxSize={5} />
                </Box>
                <Box>
                  <Text fontSize="17px" fontWeight="700" color="ss.text">Email us</Text>
                  <Text fontSize="14px" color="ss.muted">We typically respond within 24 hours</Text>
                </Box>
              </HStack>

              <Box
                as="button"
                type="button"
                w="100%"
                minH="52px"
                px={4}
                py={3}
                bg="ss.deep"
                border="var(--ss-hairline) solid"
                borderColor="ss.control"
                borderRadius="var(--ss-radius-control)"
                cursor="pointer"
                onClick={handleCopy}
                aria-label={`Copy ${email}`}
                transition="border-color 0.15s"
                _hover={{ borderColor: 'ss.text' }}
              >
                <HStack spacing={3} justify="space-between">
                  <Text fontSize="17px" fontWeight="600" color="ss.link">{email}</Text>
                  <Icon as={copied ? FiCheck : FiCopy} color={copied ? 'ss.success' : 'ss.muted'} boxSize={5} />
                </HStack>
              </Box>
            </VStack>
          </Box>

          {/* Quick links */}
          <VStack spacing={3} align="stretch">
            <Text textStyle="label">
              Quick links
            </Text>
            <LinkRows>
              <LinkRow to="/support" label="FAQ & Troubleshooting" />
              <LinkRow href={APP_STORE_URL} newTab icon={<FaApple />} label="Rate us on the App Store" />
            </LinkRows>
          </VStack>

          <SocialLinks variant="list" />
        </VStack>
      </Container>
    </Box>
  )
}

export default Support
