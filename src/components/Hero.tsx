import { Box, Text, VStack, Container, Flex, Icon, Image, useToast, HStack } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const MotionBox = motion(Box)
const MotionImage = motion(Image)

const PhoneMockup = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const screenshots = ['/images/1.JPG', '/images/2.JPG', '/images/3.JPG', '/images/4.JPG']

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [screenshots.length])

  return (
    <MotionBox
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <Box
        bg="gray.900"
        borderRadius="36px"
        p="8px"
        boxShadow="0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)"
        position="relative"
        mx="auto"
      >
        {/* Notch */}
        <Box
          position="absolute"
          top="8px"
          left="50%"
          transform="translateX(-50%)"
          w="80px"
          h="6px"
          bg="gray.800"
          borderRadius="full"
          zIndex={3}
        />
        <Box
          w={{ base: "200px", md: "220px" }}
          h={{ base: "430px", md: "475px" }}
          bg="black"
          borderRadius="30px"
          overflow="hidden"
          position="relative"
        >
          {screenshots.map((src, index) => (
            <MotionImage
              key={src}
              src={src}
              alt={`SpySocial screenshot ${index + 1}`}
              objectFit="cover"
              w="100%"
              h="100%"
              position="absolute"
              top={0}
              left={0}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </Box>
      </Box>
    </MotionBox>
  )
}

const Hero = () => {
  const toast = useToast()

  const handleAndroidClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toast({
      title: "Coming Soon!",
      description: "SpySocial will be available on Android soon.",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top"
    })
  }

  return (
    <Box
      as="section"
      display="flex"
      alignItems="center"
      flex="1"
      position="relative"
      overflow="hidden"
      color="white"
    >
      {/* Subtle background accents */}
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        w="600px"
        h="600px"
        borderRadius="full"
        bg="purple.600"
        opacity={0.05}
        filter="blur(120px)"
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="-10%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="blue.500"
        opacity={0.05}
        filter="blur(100px)"
      />

      <Container maxW="container.lg" py={{ base: 20, md: 0 }} pb={{ base: 24, md: 20 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 12, md: 16 }}
        >
          {/* Left side — copy */}
          <VStack
            align={{ base: "center", md: "start" }}
            spacing={6}
            flex="1"
            textAlign={{ base: "center", md: "left" }}
          >
            <MotionBox
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/images/logo.svg"
                alt="SpySocial"
                maxW={{ base: "220px", md: "280px" }}
                h="auto"
                mb={2}
              />
            </MotionBox>

            <MotionBox
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="whiteAlpha.700"
                maxW="400px"
                lineHeight="1.7"
              >
                The party game of social deception. Find the spy — or fool everyone trying.
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <HStack spacing={2} flexWrap="wrap">
                <Text fontSize="sm" color="whiteAlpha.500">3-21 players</Text>
                <Text fontSize="sm" color="whiteAlpha.300">·</Text>
                <Text fontSize="sm" color="whiteAlpha.500">Real-time multiplayer</Text>
                <Text fontSize="sm" color="whiteAlpha.300">·</Text>
                <Text fontSize="sm" color="whiteAlpha.500">Free to play</Text>
              </HStack>
            </MotionBox>

            {/* Download buttons */}
            <MotionBox
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              pt={2}
            >
              <Flex gap={3} direction={{ base: "column", sm: "row" }} align={{ base: "center", md: "start" }}>
                <Box
                  as="a"
                  href="https://apps.apple.com/us/app/spysocial-a-party-game/id6746734390"
                  target="_blank"
                  rel="noopener noreferrer"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="white"
                  color="gray.900"
                  borderRadius="xl"
                  w="180px"
                  h="54px"
                  _hover={{
                    bg: "gray.100",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                >
                  <Flex alignItems="center" px={4} gap={3}>
                    <Icon as={FaApple} boxSize={7} />
                    <Flex direction="column" align="flex-start">
                      <Text fontSize="10px" fontWeight="normal" lineHeight="1" mb={0.5}>
                        Download on the
                      </Text>
                      <Text fontSize="md" fontWeight="600" lineHeight="1">
                        App Store
                      </Text>
                    </Flex>
                  </Flex>
                </Box>

                <Box
                  as="a"
                  href="#"
                  onClick={handleAndroidClick}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="whiteAlpha.100"
                  color="white"
                  borderRadius="xl"
                  w="180px"
                  h="54px"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  _hover={{
                    bg: "whiteAlpha.200",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                >
                  <Flex alignItems="center" px={4} gap={3}>
                    <Box flexShrink={0}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                        <path
                          fill="currentColor"
                          d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.6 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                        />
                      </svg>
                    </Box>
                    <Flex direction="column" align="flex-start">
                      <Text fontSize="10px" fontWeight="normal" lineHeight="1" mb={0.5} opacity={0.7}>
                        Coming soon on
                      </Text>
                      <Text fontSize="md" fontWeight="600" lineHeight="1">
                        Google Play
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </MotionBox>
          </VStack>

          {/* Right side — phone mockup */}
          <Box flexShrink={0}>
            <PhoneMockup />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Hero
