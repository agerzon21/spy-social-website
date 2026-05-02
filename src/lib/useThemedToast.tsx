import { useToast, Box, HStack, VStack, Text, Icon, IconButton } from '@chakra-ui/react'
import type { UseToastOptions } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { FaCheck, FaXmark, FaInfo, FaTriangleExclamation } from 'react-icons/fa6'
import type { IconType } from 'react-icons'

type Status = 'success' | 'error' | 'info' | 'warning'

const accents: Record<Status, { color: string; bg: string; icon: IconType }> = {
  success: { color: '#48bb78', bg: 'rgba(72, 187, 120, 0.15)', icon: FaCheck },
  error:   { color: '#f56565', bg: 'rgba(245, 101, 101, 0.15)', icon: FaXmark },
  info:    { color: '#63b3ed', bg: 'rgba(99, 179, 237, 0.15)', icon: FaInfo },
  warning: { color: '#ecc94b', bg: 'rgba(236, 201, 75, 0.15)', icon: FaTriangleExclamation },
}

export function useThemedToast() {
  const toast = useToast()

  return (opts: UseToastOptions) => {
    const status = (opts.status ?? 'info') as Status
    const { color, bg, icon } = accents[status]
    const isClosable = opts.isClosable ?? true

    return toast({
      duration: opts.duration ?? 4000,
      position: opts.position ?? 'top',
      ...opts,
      render: ({ onClose }) => (
        <Box
          minW={{ base: '280px', md: '340px' }}
          maxW="420px"
          bg="rgba(44, 50, 82, 0.95)"
          backdropFilter="blur(16px)"
          borderRadius="xl"
          border="1px solid"
          borderColor="whiteAlpha.200"
          boxShadow="0 20px 40px rgba(0, 0, 0, 0.5)"
          overflow="hidden"
          position="relative"
          mt={2}
        >
          <Box position="absolute" left={0} top={0} bottom={0} w="3px" bg={color} />
          <HStack p={4} pl={5} spacing={3} align="flex-start">
            <Box
              w="32px"
              h="32px"
              borderRadius="full"
              bg={bg}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Icon as={icon} color={color} boxSize={3.5} />
            </Box>
            <VStack align="stretch" spacing={opts.description ? 1 : 0} flex="1" minW={0} pt="6px">
              {opts.title && (
                <Text fontSize="sm" fontWeight="600" color="white" lineHeight="1.4">
                  {opts.title}
                </Text>
              )}
              {opts.description && (
                <Text fontSize="xs" color="whiteAlpha.700" lineHeight="1.6">
                  {opts.description}
                </Text>
              )}
            </VStack>
            {isClosable && (
              <IconButton
                aria-label="Close"
                icon={<CloseIcon boxSize={2} />}
                size="xs"
                variant="ghost"
                color="whiteAlpha.400"
                _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                onClick={onClose}
              />
            )}
          </HStack>
        </Box>
      ),
    })
  }
}
