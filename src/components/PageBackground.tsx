import { Box } from '@chakra-ui/react'
import React from 'react'

interface PageBackgroundProps {
  children: React.ReactNode
}

const PageBackground: React.FC<PageBackgroundProps> = ({ children }) => {
  return (
    <Box
      position="relative"
      flexGrow={1}
      bg="gray.900"
      width="100%"
      overflow="hidden"
    >
      {/* Subtle accent glows */}
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="purple.600"
        opacity={0.03}
        filter="blur(120px)"
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="-10%"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="blue.500"
        opacity={0.03}
        filter="blur(100px)"
      />

      <Box
        position="relative"
        zIndex={1}
        height="100%"
        width="100%"
        display="flex"
        flexDirection="column"
      >
        {children}
      </Box>
    </Box>
  )
}

export default PageBackground
