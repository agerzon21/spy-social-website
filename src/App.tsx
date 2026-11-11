import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import { Global } from '@emotion/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components'
import ScrollManager from './components/ScrollManager'
import OffHost from './components/OffHost'
import { HOST, onThisHost, sharedHere, sitePath } from './lib/siteHost'
import Home from './pages/Home'
import { lazy, Suspense, useMemo } from 'react'
import { LIVE, ONLINE_SAFETY_TEXT } from './lib/legalRelease'
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
// The Archive (rarefinds-page-1110): every Unique, its own page per copy; with the ledger (LIVE.mintedCollectibles).
const ArchiveHome = page(() => import('./pages/archive/ArchiveHome'))
const ArchiveBrowse = page(() => import('./pages/archive/ArchiveBrowse'))
const ArchiveItem = page(() => import('./pages/archive/ArchiveItem'))
// The Market (market-site-1110): the Black Market's prices, read from the ledger function (LIVE.marketSite).
const MarketHome = page(() => import('./pages/market/MarketHome'))
const MarketMovers = page(() => import('./pages/market/MarketMovers'))
const MarketCatalogue = page(() => import('./pages/market/MarketCatalogue'))
const MarketItem = page(() => import('./pages/market/MarketItem'))
// The Beta 2 playtester page (linked from Reddit and Discord), its own chunk.
const Beta = page(() => import('./pages/Beta'))

// The Archive's routes, on the host it lives on (lib/siteHost: archive.spysocial.app; www's /archive goes there).
const archiveOn = LIVE.mintedCollectibles && LIVE.uniqueArchive && onThisHost('/archive')
// The Market's, likewise (market.spysocial.app; www's /market goes there).
const marketOn = LIVE.marketSite && onThisHost('/market')

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
              {/* The Archive on archive.spysocial.app ('/', '/uniques', '/u/<item>/<serial>'; lib/siteHost), at /archive on
                  a preview build. */}
              {archiveOn && <Route path={sitePath('/archive')} element={<Layout><ArchiveHome /></Layout>} />}
              {archiveOn && <Route path={sitePath('/archive/uniques')} element={<Layout><ArchiveBrowse /></Layout>} />}
              {archiveOn && <Route path={sitePath('/archive/u/:item/:serial')} element={<Layout><ArchiveItem /></Layout>} />}
              {/* The Market on market.spysocial.app ('/', '/movers/<list>', '/catalogue[/<shelf>]', '/item/<code>'). */}
              {marketOn && <Route path={sitePath('/market')} element={<Layout><MarketHome /></Layout>} />}
              {marketOn && <Route path={sitePath('/market/movers/:list')} element={<Layout><MarketMovers /></Layout>} />}
              {marketOn && <Route path={sitePath('/market/movers')} element={<Navigate to={sitePath('/market/movers/rises')} replace />} />}
              {marketOn && <Route path={sitePath('/market/catalogue')} element={<Layout><MarketCatalogue /></Layout>} />}
              {marketOn && <Route path={sitePath('/market/catalogue/:cat')} element={<Layout><MarketCatalogue /></Layout>} />}
              {marketOn && <Route path={sitePath('/market/item/:code')} element={<Layout><MarketItem /></Layout>} />}
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
