import { Box, Container, Heading, Text, VStack, HStack, useColorModeValue, Flex, Icon } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'
import { IoLogoGooglePlaystore } from 'react-icons/io5'

const Download = () => {
  return (
    <Box 
      id="download" 
      bg={useColorModeValue('gray.100', 'gray.700')} 
      py={20}
      width="100%"
    >
      <Container maxW="100%" px={4} textAlign="center">
        <VStack spacing={6}>
          <Heading as="h2" size="xl">
            Download SpySocial Today
          </Heading>
          
          <Text fontSize="lg" maxW="2xl">
            Gather your friends, download the game, and start uncovering who's the spy! Available for iOS and Android.
          </Text>

          <HStack 
            spacing={{ base: 4, sm: 6 }} 
            mt={6} 
            flexDir={{ base: 'column', sm: 'row' }}
          >
            <Box
              as="a"
              href="#"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              bg="black"
              color="white"
              borderRadius="md"
              minW="200px"
              h="60px"
              px={3}
              _hover={{ opacity: 0.9 }}
              boxShadow="md"
            >
              <Icon as={FaApple} boxSize={8} />
              <Flex direction="column" align="flex-start" ml={2}>
                <Text fontSize="xs" fontWeight="normal" mb={-1}>
                  Download on the
                </Text>
                <Text fontSize="xl" fontWeight="semibold">
                  App Store
                </Text>
              </Flex>
            </Box>
            
            <Box
              as="a"
              href="#"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              bg="black"
              color="white"
              borderRadius="md"
              minW="200px"
              h="60px"
              px={3}
              _hover={{ opacity: 0.9 }}
              boxShadow="md"
            >
              <Icon as={IoLogoGooglePlaystore} boxSize={8} />
              <Flex direction="column" align="flex-start" ml={2}>
                <Text fontSize="xs" fontWeight="normal" mb={-1}>
                  GET IT ON
                </Text>
                <Text fontSize="xl" fontWeight="semibold">
                  Google Play
                </Text>
              </Flex>
            </Box>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Download 