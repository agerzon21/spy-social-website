import { Box, Container, Link as ChakraLink, Stack, Text, Flex, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopWidth={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      width="100%"
    >
      <Container
        as={Stack}
        maxW="100%"
        px={4}
        py={10}
        spacing={8}
      >
        <Stack direction={'row'} spacing={6} justify={'center'} flexWrap="wrap">
          <ChakraLink as={RouterLink} to={'/privacy'}>Privacy</ChakraLink>
          <ChakraLink as={RouterLink} to={'/terms'}>Terms</ChakraLink>
          <ChakraLink as={RouterLink} to={'/support'}>Support</ChakraLink>
          <ChakraLink as={RouterLink} to={'/contact-us'}>Contact Us</ChakraLink>
        </Stack>
        
        <Flex
          textAlign={'center'}
          justifyContent={'center'}
          direction={'column'}
          width={'full'}
        >
          <Text fontSize={'sm'} color={'gray.500'}>
            © {new Date().getFullYear()} SpySocial. All rights reserved
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer 