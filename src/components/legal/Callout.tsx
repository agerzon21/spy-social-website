import { Box, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

/** A highlighted box with a bold first line, like the Terms' short version (Safety, Child Safety). */
export const Callout = ({ title, children }: { title: string; children: ReactNode }) => (
  <CalloutBox>
    <Text textStyle="body" color="ss.text" fontWeight="700" mb={1}>
      {title}
    </Text>
    {children}
  </CalloutBox>
)

/** The box itself, for a callout whose first line isn't a plain title (the Terms' short version). */
export const CalloutBox = ({ children }: { children: ReactNode }) => (
  <Box
    w="100%"
    bg="ss.surface"
    border="var(--ss-card-border) solid"
    borderColor="ss.line"
    borderInlineStart="3px solid"
    borderInlineStartColor="ss.accent"
    borderRadius="var(--ss-radius-card)"
    boxShadow="var(--ss-shadow-card)"
    px={{ base: 4, md: 5 }}
    py={4}
  >
    {children}
  </Box>
)
