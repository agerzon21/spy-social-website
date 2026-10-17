import { useToast, Box, HStack, VStack, Text, Icon, IconButton } from '@chakra-ui/react'
import type { UseToastOptions } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { FaCheck, FaXmark, FaInfo, FaTriangleExclamation } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { useT } from '../i18n'

type Status = 'success' | 'error' | 'info' | 'warning'

// The skin's status colours (AA on the band in both themes), the icon's disc a soft tint of the same.
const tint = (v: string) => `color-mix(in srgb, var(${v}) 15%, transparent)`
const accents: Record<Status, { color: string; bg: string; icon: IconType }> = {
  success: { color: 'ss.success', bg: tint('--ss-success'), icon: FaCheck },
  error:   { color: 'ss.danger', bg: tint('--ss-danger'), icon: FaXmark },
  info:    { color: 'ss.link', bg: tint('--ss-link'), icon: FaInfo },
  warning: { color: 'ss.warn', bg: tint('--ss-warn'), icon: FaTriangleExclamation },
}

export function useThemedToast() {
  const toast = useToast()
  const close = useT().common.close

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
          bg="ss.band"
          backdropFilter="blur(16px)"
          borderRadius="xl"
          border="1px solid"
          borderColor="ss.lineStrong"
          boxShadow="0 20px 40px rgba(0, 0, 0, 0.5)"
          overflow="hidden"
          position="relative"
          mt={2}
        >
          <Box position="absolute" insetStart={0} top={0} bottom={0} w="3px" bg={color} />
          <HStack p={4} ps={5} spacing={3} align="flex-start">
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
                <Text fontSize="sm" fontWeight="600" color="ss.text" lineHeight="1.4">
                  {opts.title}
                </Text>
              )}
              {opts.description && (
                <Text fontSize="xs" color="ss.body" lineHeight="1.6">
                  {opts.description}
                </Text>
              )}
            </VStack>
            {isClosable && (
              <IconButton
                aria-label={close}
                icon={<CloseIcon boxSize={2} />}
                size="xs"
                variant="ghost"
                color="ss.muted"
                _hover={{ color: 'ss.text', bg: 'ss.surfaceStrong' }}
                onClick={onClose}
              />
            )}
          </HStack>
        </Box>
      ),
    })
  }
}
