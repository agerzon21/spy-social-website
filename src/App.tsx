import { ChakraProvider, Box } from '@chakra-ui/react'
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
import Join from './pages/Join'

const ConfirmSuccess = lazy(() => import('./pages/ConfirmSuccess'))

function App() {
  return (
    <HelmetProvider>
      <ChakraProvider>
        <Box
          minH="100vh"
          width="100vw"
          maxWidth="100%"
          overflowX="hidden"
          bg="#1a1d2e"
          display="flex"
          flexDirection="column"
        >
          <Suspense fallback={<Box flex="1" bg="#1a1d2e" />}>
            <Routes>
              <Route path="/" element={<><Hero /><Footer /></>} />
              <Route path="/reset-password" element={<><ResetPassword /><Footer showLogo /></>} />
              <Route path="/confirm-success" element={<><ConfirmSuccess /><Footer showLogo /></>} />
              <Route path="/privacy" element={<><Privacy /><Footer showLogo /></>} />
              <Route path="/terms" element={<><Terms /><Footer showLogo /></>} />
              <Route path="/contact-us" element={<><Support /><Footer showLogo /></>} />
              <Route path="/support" element={<><FAQ /><Footer showLogo /></>} />
              <Route path="/join/:code" element={<><Join /><Footer showLogo /></>} />
              <Route path="*" element={<><NotFound /><Footer showLogo /></>} />
            </Routes>
          </Suspense>
        </Box>
      </ChakraProvider>
    </HelmetProvider>
  )
}

export default App
