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
      bgGradient="linear(to-b, #1a365d, #2a4365, #2c5282)"
      width="100%"
      overflow="hidden"
    >
      {/* Subtle gradient texture */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiAvPgogIDxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIiBmaWxsPSJyZ2JhKDIwMCwgMjMwLCAyNTUsIDAuMikiIC8+Cjwvc3ZnPg==')"
        opacity={0.4}
        zIndex={0}
      />
      
      {/* Subtle gradient overlays for color and depth */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="radial(circle at 70% 20%, rgba(99, 179, 237, 0.18), transparent 60%)"
        zIndex={0}
      />
      
      <Box
        position="absolute"
        top="60%"
        left="20%"
        width="500px"
        height="500px"
        borderRadius="full"
        bgGradient="radial(rgba(144, 205, 244, 0.12), rgba(144, 205, 244, 0.04))"
        filter="blur(100px)"
        zIndex={0}
      />
      
      {/* Soft highlight at the top */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="40%"
        bgGradient="linear(to-b, rgba(255, 255, 255, 0.07), transparent)"
        zIndex={0}
      />
      
      {/* Content overlay */}
      <Box 
        position="relative" 
        zIndex={1}
        height="100%"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        {children}
      </Box>
    </Box>
  )
}

export default PageBackground 