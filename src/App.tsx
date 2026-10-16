import { ChakraProvider, Box } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import { Global } from '@emotion/react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import { lazy, Suspense } from 'react'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Rules from './pages/Rules'
import Safety from './pages/Safety'
import ChildSafety from './pages/ChildSafety'
import Support from './pages/Support'
import FAQ from './pages/FAQ'
import Join from './pages/Join'
import JoinEvent from './pages/JoinEvent'
import WhatsNew from './pages/WhatsNew'
import DeleteAccount from './pages/DeleteAccount'
import { ONLINE_SAFETY_TEXT } from './lib/legalRelease'
import { SKIN_CSS, theme } from './theme'

const ConfirmSuccess = lazy(() => import('./pages/ConfirmSuccess'))
const Agree = lazy(() => import('./pages/Agree'))

function App() {
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <Global styles={SKIN_CSS} />
        {/* Framer animations (What's New) stop under Reduce Motion, like the CSS ones (src/theme). */}
        <MotionConfig reducedMotion="user">
        <Box
          minH="100vh"
          width="100vw"
          maxWidth="100%"
          overflowX="clip"
          bg="ss.page"
          display="flex"
          flexDirection="column"
        >
          <ScrollManager />
          <Suspense fallback={<Box flex="1" bg="ss.page" />}>
            <Routes>
              <Route path="/" element={<Layout isHome><Home /></Layout>} />
              <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
              <Route path="/confirm-success" element={<Layout><ConfirmSuccess /></Layout>} />
              <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
              <Route path="/terms" element={<Layout><Terms /></Layout>} />
              <Route path="/rules" element={<Layout><Rules /></Layout>} />
              {ONLINE_SAFETY_TEXT && <Route path="/safety" element={<Layout><Safety /></Layout>} />}
              <Route path="/child-safety" element={<Layout><ChildSafety /></Layout>} />
              <Route path="/contact-us" element={<Layout><Support /></Layout>} />
              <Route path="/support" element={<Layout><FAQ /></Layout>} />
              <Route path="/whats-new" element={<Layout><WhatsNew /></Layout>} />
              <Route path="/delete-account" element={<Layout><DeleteAccount /></Layout>} />
              <Route path="/join/e/:id" element={<Layout><JoinEvent /></Layout>} />
              <Route path="/join/:code" element={<Layout><Join /></Layout>} />
              <Route path="/join" element={<Layout><Join /></Layout>} />
              <Route path="/agree/:token" element={<Layout><Agree /></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </Suspense>
        </Box>
        </MotionConfig>
      </ChakraProvider>
    </HelmetProvider>
  )
}

export default App
