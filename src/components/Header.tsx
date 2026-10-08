import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import Wordmark from './Wordmark'

export const HEADER_HEIGHT = 68

const Header = () => {
  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      bg="rgba(44, 50, 82, 0.85)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      width="100%"
      height={`${HEADER_HEIGHT}px`}
    >
      <Flex
        maxW="container.lg"
        mx="auto"
        px={{ base: 4, md: 6 }}
        height="100%"
        align="center"
        justify="center"
      >
        <ChakraLink
          as={RouterLink}
          to="/"
          aria-label="Home"
          _hover={{ opacity: 1 }}
          _focus={{ boxShadow: 'none' }}
        >
          <Wordmark
            h={{ base: '48px', md: '54px' }}
            w="auto"
            opacity={0.85}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s"
          />
        </ChakraLink>
      </Flex>
    </Box>
  )
}

export default Header
