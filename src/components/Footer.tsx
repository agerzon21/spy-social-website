import { Box, Container, Link as ChakraLink, Text, Flex, HStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface FooterProps {
  sticky?: boolean
}

const Footer = ({ sticky = false }: FooterProps) => {
  return (
    <Box
      as="footer"
      color="whiteAlpha.400"
      width="100%"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      bg="#2c3252"
      position={sticky ? 'fixed' : 'relative'}
      bottom={sticky ? 0 : 'auto'}
      left={sticky ? 0 : 'auto'}
      zIndex={sticky ? 50 : 'auto'}
    >
      <Container maxW="container.lg" py={5}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={3}
        >
          <HStack spacing={5} flexWrap="wrap" justify="center">
            <ChakraLink as={RouterLink} to="/whats-new" fontSize="xs" _hover={{ color: 'whiteAlpha.700', textDecoration: 'none' }} transition="all 0.2s">What's New</ChakraLink>
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
