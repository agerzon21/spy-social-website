import { Box, Container, Link, Stack, Text, Flex, useColorModeValue } from '@chakra-ui/react'

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
          <Link href={'#'}>Privacy Policy</Link>
          <Link href={'#'}>Terms of Service</Link>
          <Link href={'#'}>Contact Us</Link>
          <Link href={'#'}>About</Link>
          <Link href={'#'}>Careers</Link>
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