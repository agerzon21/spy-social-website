import { Box, Container, Link as ChakraLink, Text, Flex, HStack, Image } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface FooterProps {
  showLogo?: boolean
}

const Footer = ({ showLogo = false }: FooterProps) => {
  return (
    <Box
      color="whiteAlpha.400"
      width="100%"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      bg="#1a1d2e"
      position="fixed"
      bottom={0}
      left={0}
      zIndex={50}
    >
      <Container maxW="container.lg" py={5}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={3}
        >
          <HStack spacing={5} flexWrap="wrap" justify="center">
            {showLogo && (
              <>
                <ChakraLink as={RouterLink} to="/" _hover={{ opacity: 1 }} _focus={{ boxShadow: 'none' }}>
                  <Image
                    src="/images/logo.svg"
                    alt="SpySocial"
                    h="22px"
                    w="auto"
                    opacity={0.6}
                    _hover={{ opacity: 0.9 }}
                    transition="opacity 0.2s"
                  />
                </ChakraLink>
                <Box h="14px" w="1px" bg="whiteAlpha.200" display={{ base: 'none', md: 'block' }} />
              </>
            )}
            <ChakraLink as={RouterLink} to="/privacy" fontSize="xs" _hover={{ color: 'whiteAlpha.700', textDecoration: 'none' }} transition="all 0.2s">Privacy</ChakraLink>
            <ChakraLink as={RouterLink} to="/terms" fontSize="xs" _hover={{ color: 'whiteAlpha.700', textDecoration: 'none' }} transition="all 0.2s">Terms</ChakraLink>
            <ChakraLink as={RouterLink} to="/support" fontSize="xs" _hover={{ color: 'whiteAlpha.700', textDecoration: 'none' }} transition="all 0.2s">Support</ChakraLink>
            <ChakraLink as={RouterLink} to="/contact-us" fontSize="xs" _hover={{ color: 'whiteAlpha.700', textDecoration: 'none' }} transition="all 0.2s">Contact</ChakraLink>
          </HStack>

          <Text fontSize="xs" color="whiteAlpha.300">
            &copy; {new Date().getFullYear()} SpySocial. All rights reserved
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
