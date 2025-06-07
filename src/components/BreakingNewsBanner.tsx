import { Box, Flex, Text, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { FaRegNewspaper } from 'react-icons/fa'
import { CloseIcon } from '@chakra-ui/icons'
import { keyframes } from '@emotion/react'

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(66,153,225,0.7); }
  70% { box-shadow: 0 0 16px 8px rgba(66,153,225,0.15); }
  100% { box-shadow: 0 0 0 0 rgba(66,153,225,0.7); }
`

const BreakingNewsBanner = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const bg = useColorModeValue('rgba(66,153,225,0.85)', 'rgba(44, 114, 210, 0.85)')
  const color = useColorModeValue('white', 'white')
  const blur = 'blur(8px)'

  if (!isOpen) return null

  return (
    <Box
      w="100vw"
      left={0}
      top={0}
      position="fixed"
      zIndex={2000}
      style={{ backdropFilter: blur }}
      bg={bg}
      color={color}
      fontWeight="bold"
      fontSize={{ base: 'md', md: 'lg' }}
      boxShadow="0 8px 32px 0 rgba(66,153,225,0.25)"
      animation={`${pulse} 2.5s infinite`}
      borderBottom="2px solid #4299e1"
      py={3}
      px={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex align="center" justify="center" position="relative" width="100%">
        <Box as={FaRegNewspaper} boxSize={6} mr={3} filter="drop-shadow(0 0 6px #fff)" />
        <Text as="span" textShadow="0 2px 8px rgba(0,0,0,0.18)">
          🚨 <b>SpySocial</b> just released: <u>LIVE</u> on the App Store!{' '}
          <a href="https://apps.apple.com/us/app/spysocial-a-party-game/id6746734390" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit', fontWeight: 600 }}>
            Download now
          </a>{' '}and outwit your friends!
        </Text>
        <IconButton
          aria-label="Dismiss announcement"
          icon={<CloseIcon />}
          size="sm"
          variant="ghost"
          color={color}
          position="absolute"
          right={0}
          top={0}
          onClick={onClose}
          _hover={{ bg: 'whiteAlpha.300' }}
        />
      </Flex>
    </Box>
  )
}

export default BreakingNewsBanner 