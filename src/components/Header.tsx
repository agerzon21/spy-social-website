import { Suspense } from 'react'
import { HostNav } from './hostNavChunk'
import { useLocation } from 'react-router-dom'
import Link from './SiteLink'
import { useT } from '../i18n'
import { LIVE } from '../lib/legalRelease'
import { SIGN_IN_URL } from '../lib/playUrl'
import { SHOP_URL } from '../lib/shop'
import LanguageMenu from './LanguageMenu'
import ThemeToggle from './ThemeToggle'
import Wordmark from './Wordmark'
import { sectionOf } from '../lib/siteHost'
import ui from './ui/ui.module.css'
import s from './shell.module.css'

/**
 * The wordmark (home), Join a room (the home page's room-code box), the Market and the Archive (market. and
 * archive.spysocial.app, same tab; only where the row has room, the footer carries them everywhere), once
 * LIVE.merchShop is on the Shop (same tab), then the language menu and the light / dark switch at the far end. Sticky on every page. On a phone the room
 * link takes its short label, so the two controls keep their room in every language. On archive.spysocial.app and
 * market.spysocial.app the site's own places follow the wordmark (components/HostNav).
 */

const Header = ({ isHome = false }: { isHome?: boolean }) => {
  const t = useT()
  // On archive.spysocial.app and market.spysocial.app, that site's places sit beside the wordmark (which still goes
  // to www's home); www's Join a room and Shop stay on a computer, where there's room (shell.module.css).
  const section = sectionOf(useLocation().pathname)
  return (
    <header className={[s.header, isHome ? s.headerHome : '', section ? s.headerHost : ''].filter(Boolean).join(' ')}>
      <div className={`${ui.wrap} ${s.bar}`}>
        <Link to="/" className={s.home} aria-label={t.header.home}>
          <Wordmark />
          {/* On a phone the Archive's and the Market's headers show the round mark instead, to leave their nav room. */}
          {section && <img className={s.homeMark} src="/favicon.svg" alt="" width={34} height={34} decoding="async" />}
        </Link>
        {section && (
          <Suspense fallback={<div className={s.hostNav} />}>
            <HostNav section={section} />
          </Suspense>
        )}
        <div className={s.tools}>
          <nav className={s.nav} aria-label={t.header.nav}>
            <Link to="/#join" className={`${s.navLink} ss-hit`}>
              <span className={s.long}>{t.header.join}</span>
              <span className={s.short} aria-hidden="true">
                {t.header.joinShort}
              </span>
            </Link>
            {/* The Market and the Archive (their own subdomains, same tab): on www's pages, where the row has room
                (s.roomy); on their own hosts HostNav names their places instead. */}
            {!section && LIVE.marketSite && (
              <Link to="/market" className={`${s.navLink} ${s.roomy}`}>
                {t.header.market}
              </Link>
            )}
            {!section && LIVE.mintedCollectibles && LIVE.uniqueArchive && (
              <Link to="/archive" className={`${s.navLink} ${s.roomy}`}>
                {t.header.archive}
              </Link>
            )}
            {LIVE.webSignIn && (
              <a href={SIGN_IN_URL} className={s.navLink}>
                {t.header.signIn}
              </a>
            )}
            {LIVE.merchShop && (
              <a href={SHOP_URL} className={s.navLink}>
                {t.header.shop}
              </a>
            )}
          </nav>
          <div className={s.controls}>
            <LanguageMenu />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
