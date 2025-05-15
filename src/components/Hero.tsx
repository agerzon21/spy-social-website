import { Box, Text, VStack, Container, Stack, Flex, Icon, Image } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'

const Hero = () => {
  return (
    <Box 
      as="section" 
      py={{ base: 28, md: 40 }} 
      width="100%"
      height="100%"
      color="white"
      position="relative"
      zIndex={1}
    >
      <Container maxW="100%" px={4}>
        <VStack spacing={14} textAlign="center">
          <Box
            mb={4}
            filter="drop-shadow(0 0 25px rgba(64, 146, 255, 0.4))"
            position="relative"
            zIndex={2}
            width={{ base: "60%", md: "350px" }}
            maxWidth="350px"
          >
            <Image 
              src="/images/logo.svg" 
              alt="SpySocial Logo"
              width="100%"
              height="auto"
              mx="auto"
            />
          </Box>
          
          <Text 
            fontSize="xl" 
            maxW="3xl" 
            color="rgba(255, 255, 255, 0.8)"
            textShadow="0 2px 10px rgba(0, 0, 0, 0.3)"
          >
            The thrilling mobile party game of social deception.
          </Text>

          <Stack 
            spacing={{ base: 6, md: 8 }} 
            pt={8}
            direction={{ base: "column", md: "row" }}
            align="center"
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
              width="210px"
              h="60px"
              _hover={{ 
                transform: "translateY(-2px)",
                boxShadow: "0 0 20px rgba(64, 146, 255, 0.4)",
                transition: "all 0.2s ease-in-out"
              }}
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
              position="relative"
              transition="all 0.2s ease-in-out"
              border="1px solid rgba(255, 255, 255, 0.1)"
            >
              <Flex 
                width="100%" 
                alignItems="center" 
                justifyContent="center"
                px={4}
              >
                <Box width="40px" display="flex" justifyContent="center" mr={5}>
                  <Icon as={FaApple} boxSize={9} />
                </Box>
                <Flex direction="column" align="flex-start">
                  <Text fontSize="xs" fontWeight="normal" mb={-1}>
                    Download on the
                  </Text>
                  <Text fontSize="xl" fontWeight="semibold">
                    App Store
                  </Text>
                </Flex>
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
              width="210px"
              h="60px"
              _hover={{ 
                transform: "translateY(-2px)",
                boxShadow: "0 0 20px rgba(64, 146, 255, 0.4)",
                transition: "all 0.2s ease-in-out"
              }}
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
              position="relative"
              transition="all 0.2s ease-in-out"
              border="1px solid rgba(255, 255, 255, 0.1)"
            >
              <Flex 
                width="100%" 
                alignItems="center"
                justifyContent="center"
                px={4}
              >
                <Box width="36px" display="flex" justifyContent="center" mr={3}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28" height="28">
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4285F4" />
                      <stop offset="25%" stopColor="#34A853" />
                      <stop offset="50%" stopColor="#FBBC05" />
                      <stop offset="75%" stopColor="#EA4335" />
                      <stop offset="100%" stopColor="#EA4335" />
                    </linearGradient>
                    <path 
                      fill="url(#gradient)" 
                      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.6 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                    />
                  </svg>
                </Box>
                <Flex direction="column" align="flex-start">
                  <Text fontSize="xs" fontWeight="normal" mb={-1}>
                    GET IT ON
                  </Text>
                  <Text fontSize="xl" fontWeight="semibold">
                    Google Play
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Stack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Hero 