import { Box, Flex, HStack, Text, useColorModeValue, Link } from '@chakra-ui/react'

const Header = () => {
  return (
    <Box 
      as="header" 
      position="sticky" 
      top="0"
      zIndex="sticky"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="sm"
      width="100vw"
      maxWidth="100%"
    >
      <Flex 
        alignItems="center" 
        justifyContent="space-between" 
        mx="auto" 
        width="100%"
        px={{ base: 4, md: 6 }} 
        py={4}
      >
        <Flex alignItems="center">
          <Text 
            fontSize="2xl" 
            fontWeight="bold" 
            letterSpacing="tight"
          >
            SpySocial
          </Text>
        </Flex>

        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          <Link href="#about">About</Link>
          <Link href="#privacy">Privacy</Link>
          <Link href="#contact">Contact</Link>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Header 