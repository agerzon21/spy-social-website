import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import { Global } from '@emotion/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components'
import ScrollManager from './components/ScrollManager'
import OffHost from './components/OffHost'
import { HOST, sharedHere } from './lib/siteHost'
import Home from './pages/Home'
import { Suspense, useMemo } from 'react'
import { lazyPage } from './lib/lazyPage'
import { LIVE, ONLINE_SAFETY_TEXT } from './lib/legalRelease'
import { SKIN_CSS, theme } from './theme'
import { colorModeManager } from './theme/mode'
import ChakraModeBridge from './theme/ChakraModeBridge'
import { archiveRoutes, marketRoutes } from './routes/hostRoutes'
import { useLang } from './i18n'

// A chunk lost to a deploy reloads the page instead of leaving a blank screen (lib/lazyPage).
const page = lazyPage

// Every page but Home in its own chunk (Lighthouse 2026-11-02: the legal pages' text was most of the first load's
// unused JavaScript). The first visit to one of them loads its chunk; `page` handles a chunk lost to a new deploy.
const ResetPassword = page(() => import('./pages/ResetPassword'))
const NotFound = page(() => import('./pages/NotFound'))
const Privacy = page(() => import('./pages/Privacy'))
const Terms = page(() => import('./pages/Terms'))
const Rules = page(() => import('./pages/Rules'))
const Safety = page(() => import('./pages/Safety'))
const ChildSafety = page(() => import('./pages/ChildSafety'))
const Support = page(() => import('./pages/Support'))
const FAQ = page(() => import('./pages/FAQ'))
const Join = page(() => import('./pages/Join'))
const JoinEvent = page(() => import('./pages/JoinEvent'))
// A Unique's holder on the Archive links here (archive-holder-1110): the way into the app's profile. Nothing from the server.
const Profile = page(() => import('./pages/Profile'))
const WhatsNew = page(() => import('./pages/WhatsNew'))
const DeleteAccount = page(() => import('./pages/DeleteAccount'))
const ConfirmSuccess = page(() => import('./pages/ConfirmSuccess'))
const Agree = page(() => import('./pages/Agree'))
// Its own chunk: nothing links to it until LIVE.roadmap is on (the route works either way).
const Roadmap = page(() => import('./pages/Roadmap'))
// The Game Night rules: the route exists only while LIVE.gameNightRules is on (off: the 404 page).
const GameNightRules = page(() => import('./pages/GameNightRules'))
// The minted-collectibles ledger: the route exists only while LIVE.mintedCollectibles is on (from genesis).
const Ledger = page(() => import('./pages/Ledger'))
const Transparency = page(() => import('./pages/Transparency'))
// The Beta 2 playtester page (linked from Reddit and Discord), its own chunk.
const Beta = page(() => import('./pages/Beta'))

function App() {
  // Arabic lays Chakra's own components out right to left too.
  const rtl = useLang().language.rtl
  const themed = useMemo(() => (rtl ? extendTheme({ direction: 'rtl' }, theme) : theme), [rtl])
  return (
    <HelmetProvider>
      {/* Chakra's colour mode reads the page's theme (public/theme.js, the header's switch) and stores nothing itself. */}
      <ChakraProvider theme={themed} colorModeManager={colorModeManager}>
        <ChakraModeBridge />
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
              {/* The Archive's and the Market's pages (routes/hostRoutes): on their own hosts in production their own lean
                  app serves them (src/hosts); here on a preview build (one host) and the dev server. */}
              {archiveRoutes}
              {marketRoutes}
              {/* www's pages a subdomain serves too, with its header nav (lib/siteHost SHARED: the Archive's Ledger and
                  Transparency); their canonical address stays www's. */}
              {HOST !== 'main' && LIVE.mintedCollectibles && sharedHere('/ledger') && <Route path="/ledger" element={<Layout><Ledger /></Layout>} />}
              {HOST !== 'main' && LIVE.transparencyPage && sharedHere('/transparency') && <Route path="/transparency" element={<Layout><Transparency /></Layout>} />}
              {/* www.spysocial.app's own pages: on the Archive's and the Market's hosts, the catch-all sends them there. */}
              {HOST === 'main' && (<>
              <Route path="/" element={<Layout isHome><Home /></Layout>} />
              <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
              <Route path="/confirm-success" element={<Layout><ConfirmSuccess /></Layout>} />
              <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
              <Route path="/terms" element={<Layout><Terms /></Layout>} />
              <Route path="/rules" element={<Layout><Rules /></Layout>} />
              {ONLINE_SAFETY_TEXT && <Route path="/safety" element={<Layout><Safety /></Layout>} />}
              {LIVE.gameNightRules && <Route path="/game-night-rules" element={<Layout><GameNightRules /></Layout>} />}
              {LIVE.mintedCollectibles && <Route path="/ledger" element={<Layout><Ledger /></Layout>} />}
              {LIVE.transparencyPage && <Route path="/transparency" element={<Layout><Transparency /></Layout>} />}
              <Route path="/child-safety" element={<Layout><ChildSafety /></Layout>} />
              <Route path="/contact-us" element={<Layout><Support /></Layout>} />
              <Route path="/support" element={<Layout><FAQ /></Layout>} />
              {/* Help & FAQ is /support (the footer's link, the app's); /help is the address people guess. */}
              <Route path="/help" element={<Navigate to="/support" replace />} />
              <Route path="/whats-new" element={<Layout><WhatsNew /></Layout>} />
              <Route path="/roadmap" element={<Layout><Roadmap /></Layout>} />
              {/* After Beta 2, the launch version sends the old playtest link home (LIVE.launchSite). */}
              <Route path="/beta" element={LIVE.launchSite ? <Navigate to="/" replace /> : <Layout><Beta /></Layout>} />
              {/* The plain reminder page answers /hello until the launch; from the launch flip its file is this app's, which goes home. */}
              <Route path="/hello" element={<Navigate to="/" replace />} />
              <Route path="/delete-account" element={<Layout><DeleteAccount /></Layout>} />
              <Route path="/join/e/:id" element={<Layout><JoinEvent /></Layout>} />
              <Route path="/join/f/:token" element={<Layout><Join /></Layout>} />
              <Route path="/join/:code" element={<Layout><Join /></Layout>} />
              <Route path="/join" element={<Layout><Join /></Layout>} />
              <Route path="/profile/:username" element={<Layout><Profile /></Layout>} />
              <Route path="/agree/:token" element={<Layout><Agree /></Layout>} />
              </>)}
              {/* A page on another host goes there (OffHost); anything else is the 404 page. */}
              <Route path="*" element={<OffHost><Layout><NotFound /></Layout></OffHost>} />
            </Routes>
          </Suspense>
        </Box>
        </MotionConfig>
      </ChakraProvider>
    </HelmetProvider>
  )
}

export default App
