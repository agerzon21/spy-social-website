import { ChakraProvider, Box, Flex } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route } from 'react-router-dom'
import { Hero, Footer } from './components'
import ResetPassword from './pages/ResetPassword'
import { lazy, Suspense } from 'react'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Support from './pages/Support'
import FAQ from './pages/FAQ'
import BreakingNewsBanner from './components/BreakingNewsBanner'

// Use lazy loading for the ConfirmSuccess component
const ConfirmSuccess = lazy(() => import('./pages/ConfirmSuccess'))

function App() {
  return (
    <HelmetProvider>
      <ChakraProvider>
        <BreakingNewsBanner />
        <Suspense fallback={
          <Flex 
            width="100vw" 
            height="100vh" 
            justify="center" 
            align="center" 
            bgGradient="linear(to-b, #1a365d, #2a4365, #2c5282)"
          >
            <Box color="white" fontSize="xl">Loading...</Box>
          </Flex>
        }>
          <Routes>
            <Route path="/" element={
              <Flex 
                direction="column" 
                minH="100vh" 
                width="100vw" 
                maxWidth="100%" 
                overflowX="hidden"
                position="relative"
              >
                {/* Main content with background */}
                <Box 
                  position="relative"
                  flexGrow={1}
                  bgGradient="linear(to-b, #1a365d, #2a4365, #2c5282)"
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
                  >
                    <Hero />
                  </Box>
                </Box>
                
                {/* Footer with separate styling */}
                <Footer />
              </Flex>
            } />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/confirm-success" element={<ConfirmSuccess />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact-us" element={<Support />} />
            <Route path="/support" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ChakraProvider>
    </HelmetProvider>
  )
}

export default App
