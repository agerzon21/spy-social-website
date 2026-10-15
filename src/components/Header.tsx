import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { LIVE } from '../lib/legalRelease'
import { SHOP_URL } from '../lib/shop'
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
        // The Shop link sits at the right edge while the wordmark stays centered (LIVE.merchShop).
        position={LIVE.merchShop ? 'relative' : undefined}
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
        {LIVE.merchShop && (
          <ChakraLink
            href={SHOP_URL}
            position="absolute"
            // Padded for a comfortable tap target; the text still lines up with the page's edge.
            right={{ base: 2, md: 4 }}
            top="50%"
            transform="translateY(-50%)"
            px={2}
            py={2}
            fontSize="sm"
            fontWeight="500"
            color="whiteAlpha.700"
            _hover={{ color: 'white', textDecoration: 'none' }}
            transition="all 0.2s"
          >
            Shop
          </ChakraLink>
        )}
      </Flex>
    </Box>
  )
}

export default Header
