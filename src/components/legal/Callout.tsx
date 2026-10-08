import { Box, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

/** A highlighted box with a bold first line, like the Terms' short version (Safety, Child Safety). */
export const Callout = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box w="100%" bg="whiteAlpha.50" borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="md" p={4}>
    <Text fontSize="sm" lineHeight="1.8" color="whiteAlpha.800" fontWeight="600" mb={1}>
      {title}
    </Text>
    {children}
  </Box>
)
