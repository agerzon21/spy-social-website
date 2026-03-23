import { Box, Flex, Image, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      bg="rgba(23, 25, 35, 0.85)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      width="100%"
    >
      <Flex
        maxW="container.lg"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={3}
        align="center"
        justify="space-between"
      >
        <ChakraLink as={RouterLink} to="/" _hover={{ opacity: 1 }} _focus={{ boxShadow: 'none' }}>
          <Image
            src="/images/logo.svg"
            alt="SpySocial"
            h="28px"
            w="auto"
            opacity={0.85}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s"
          />
        </ChakraLink>

        <HStack spacing={5} display={{ base: isHome ? 'none' : 'flex', md: 'flex' }}>
          {!isHome && (
            <ChakraLink
              as={RouterLink}
              to="/"
              fontSize="sm"
              color="whiteAlpha.500"
              _hover={{ color: 'whiteAlpha.800', textDecoration: 'none' }}
              transition="all 0.2s"
            >
              Home
            </ChakraLink>
          )}
          <ChakraLink
            as={RouterLink}
            to="/support"
            fontSize="sm"
            color="whiteAlpha.500"
            _hover={{ color: 'whiteAlpha.800', textDecoration: 'none' }}
            transition="all 0.2s"
          >
            Support
          </ChakraLink>
          <ChakraLink
            as={RouterLink}
            to="/contact-us"
            fontSize="sm"
            color="whiteAlpha.500"
            _hover={{ color: 'whiteAlpha.800', textDecoration: 'none' }}
            transition="all 0.2s"
          >
            Contact
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Header
