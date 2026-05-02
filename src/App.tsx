import { ChakraProvider, Box } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route } from 'react-router-dom'
import { Hero, Layout } from './components'
import ResetPassword from './pages/ResetPassword'
import { lazy, Suspense } from 'react'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Support from './pages/Support'
import FAQ from './pages/FAQ'
import Join from './pages/Join'
import WhatsNew from './pages/WhatsNew'

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
          bg="#2c3252"
          display="flex"
          flexDirection="column"
        >
          <Suspense fallback={<Box flex="1" bg="#2c3252" />}>
            <Routes>
              <Route path="/" element={<Layout isHome><Hero /></Layout>} />
              <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
              <Route path="/confirm-success" element={<Layout><ConfirmSuccess /></Layout>} />
              <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
              <Route path="/terms" element={<Layout><Terms /></Layout>} />
              <Route path="/contact-us" element={<Layout><Support /></Layout>} />
              <Route path="/support" element={<Layout><FAQ /></Layout>} />
              <Route path="/whats-new" element={<Layout><WhatsNew /></Layout>} />
              <Route path="/join/:code" element={<Layout><Join /></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </Suspense>
        </Box>
      </ChakraProvider>
    </HelmetProvider>
  )
}

export default App
