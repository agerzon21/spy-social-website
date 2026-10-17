import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import { Global } from '@emotion/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import { lazy, Suspense, useMemo } from 'react'
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
import { colorModeManager } from './theme/mode'
import { useLang } from './i18n'

// A page opened before a deploy asks for chunks the new deploy no longer has: reload once to fetch the new ones,
// instead of leaving a blank screen. The flag stops a reload loop if the chunk is really missing.
const page = <T,>(load: () => Promise<T>) =>
  lazy(() =>
    load()
      .then((mod) => {
        try { sessionStorage.removeItem('ss-chunk-reload') } catch { /* no storage: nothing to clear */ }
        return mod
      })
      .catch((err) => {
        let again = false
        try { again = sessionStorage.getItem('ss-chunk-reload') === '1'; sessionStorage.setItem('ss-chunk-reload', '1') } catch { again = true }
        if (again) throw err
        window.location.reload()
        return new Promise<T>(() => {})
      }) as Promise<{ default: React.ComponentType<object> }>
  )

const ConfirmSuccess = page(() => import('./pages/ConfirmSuccess'))
const Agree = page(() => import('./pages/Agree'))
const Party = page(() => import('./pages/Party'))

function App() {
  // Arabic lays Chakra's own components out right to left too.
  const rtl = useLang().language.rtl
  const themed = useMemo(() => (rtl ? extendTheme({ direction: 'rtl' }, theme) : theme), [rtl])
  return (
    <HelmetProvider>
      {/* Chakra's colour mode reads the page's theme (public/theme.js, the header's switch) and stores nothing itself. */}
      <ChakraProvider theme={themed} colorModeManager={colorModeManager}>
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
              {/* Unlisted: the link the owner sends round at Megan's party (noindex, in no nav). */}
              <Route path="/megan" element={<Layout><Party /></Layout>} />
              <Route path="/megans-party" element={<Navigate to="/megan" replace />} />
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
