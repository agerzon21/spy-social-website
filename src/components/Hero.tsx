import { Box, Text, VStack, Container, Flex, Icon, Image, HStack } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import screenshot1 from '../assets/screenshots/1.webp'
import screenshot2 from '../assets/screenshots/2.webp'
import screenshot3 from '../assets/screenshots/3.webp'
import screenshot4 from '../assets/screenshots/4.webp'
import screenshot5 from '../assets/screenshots/5.webp'
import screenshot6 from '../assets/screenshots/6.webp'

const MotionBox = motion(Box)
const MotionImage = motion(Image)

// Sized for 3x screens at the mockup's 220px width. Imported (not in /public) so Vite
// fingerprints them and they can be cached as immutable.
const screenshots = [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5, screenshot6]

const PhoneMockup = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  // Screenshots are stacked in view (hidden via opacity), so `loading="lazy"` can't defer them.
  // Mount only the current one plus the next, so a visitor who bounces fetches two, not six.
  const [mountedCount, setMountedCount] = useState(2)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setMountedCount((count) => Math.max(count, Math.min(currentIndex + 2, screenshots.length)))
  }, [currentIndex])

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
          {screenshots.slice(0, mountedCount).map((src, index) => (
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
              // Start at the target opacity so a screenshot mounted mid-rotation doesn't flash in
              initial={false}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          ))}
        </Box>
      </Box>
    </MotionBox>
  )
}

// Radar rings + crosshair detail, echoing the app's redesigned Welcome screen.
// Pure SVG so it scales crisp at any DPR, low opacity so it sits as background texture.
const RadarBackdrop = () => (
  <Box
    position="absolute"
    right={{ base: '-180px', md: '-8%' }}
    top={{ base: '8%', md: '6%' }}
    w={{ base: '560px', md: '720px' }}
    h={{ base: '560px', md: '720px' }}
    opacity={{ base: 0.07, md: 0.09 }}
    pointerEvents="none"
    zIndex={0}
  >
    <svg viewBox="0 0 600 600" width="100%" height="100%" fill="none" stroke="white">
      {/* Concentric rings */}
      <circle cx="300" cy="300" r="80" strokeWidth="1" />
      <circle cx="300" cy="300" r="150" strokeWidth="1" />
      <circle cx="300" cy="300" r="220" strokeWidth="1" />
      <circle cx="300" cy="300" r="290" strokeWidth="0.8" strokeDasharray="2 6" />
      {/* Crosshair lines, dashed so they read as a target */}
      <line x1="300" y1="20" x2="300" y2="580" strokeWidth="0.8" strokeDasharray="3 8" />
      <line x1="20" y1="300" x2="580" y2="300" strokeWidth="0.8" strokeDasharray="3 8" />
      {/* Center tick */}
      <circle cx="300" cy="300" r="3" fill="white" stroke="none" />
      <line x1="290" y1="300" x2="310" y2="300" strokeWidth="1" />
      <line x1="300" y1="290" x2="300" y2="310" strokeWidth="1" />
    </svg>
  </Box>
)

// 4-color Google Play triangle, approximating the official brand badge.
// Uses a gradient stop ramp (cyan → green → yellow → red) on a single play-triangle path —
// cleaner than 4 separate path slices and still reads as the multi-color icon.
const GooglePlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
    <defs>
      <linearGradient id="gp-color-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D2FF" />
        <stop offset="33%" stopColor="#43E97B" />
        <stop offset="66%" stopColor="#FFCE00" />
        <stop offset="100%" stopColor="#FF3D00" />
      </linearGradient>
    </defs>
    <path fill="url(#gp-color-grad)" d="M3 2.5v19c0 .4.5.7.8.4l13-9.5c.3-.2.3-.6 0-.8l-13-9.5c-.3-.3-.8 0-.8.4z" />
  </svg>
)

const Hero = () => {
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
      {/* Vertical depth: subtle linear gradient deepens the navy toward the bottom */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, rgba(60, 90, 160, 0.18) 0%, transparent 35%, rgba(15, 20, 45, 0.45) 100%)"
        pointerEvents="none"
      />
      {/* Sky-blue zone, top-left (matches the app's new Welcome screen accent) */}
      <Box
        position="absolute"
        top="-15%"
        left="-10%"
        w="600px"
        h="600px"
        borderRadius="full"
        bg="#4A8FE7"
        opacity={0.10}
        filter="blur(130px)"
        pointerEvents="none"
      />
      {/* Warm orange glow, bottom-right — brings warmth & balances the cool top */}
      <Box
        position="absolute"
        bottom="-15%"
        right="-10%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="#FF8A3D"
        opacity={0.07}
        filter="blur(120px)"
        pointerEvents="none"
      />
      {/* Existing purple highlight, dimmed */}
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
        pointerEvents="none"
      />

      {/* Radar rings + crosshair detail */}
      <RadarBackdrop />

      <Container maxW="container.lg" py={{ base: 20, md: 0 }} pb={{ base: 24, md: 20 }} position="relative" zIndex={1}>
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
            {/* Brand eyebrow pill — echoes the app's Welcome screen "SOCIAL DEDUCTION" tag */}
            <MotionBox
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                display="inline-flex"
                alignItems="center"
                bg="rgba(255, 138, 61, 0.12)"
                borderWidth="1px"
                borderColor="rgba(255, 138, 61, 0.45)"
                color="#FFB48C"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.18em"
                textTransform="uppercase"
              >
                Social Deduction
              </Box>
            </MotionBox>

            <MotionBox
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.05 }}
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

            {/* Download buttons — both rendered as official "black badge" style */}
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
                  bg="black"
                  color="white"
                  borderRadius="xl"
                  w="180px"
                  h="54px"
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  _hover={{
                    borderColor: "whiteAlpha.300",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
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
                  href="https://play.google.com/store/apps/details?id=com.gerz.spysocial"
                  target="_blank"
                  rel="noopener noreferrer"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="black"
                  color="white"
                  borderRadius="xl"
                  w="180px"
                  h="54px"
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  _hover={{
                    borderColor: "whiteAlpha.300",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                  }}
                  transition="all 0.2s"
                >
                  <Flex alignItems="center" px={4} gap={3}>
                    <Box flexShrink={0} display="flex" alignItems="center">
                      <GooglePlayIcon />
                    </Box>
                    <Flex direction="column" align="flex-start">
                      <Text fontSize="10px" fontWeight="normal" lineHeight="1" mb={0.5}>
                        GET IT ON
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
          <Box flexShrink={0} position="relative" zIndex={1}>
            <PhoneMockup />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Hero
