import { Suspense } from 'react'
import { lazyPage } from '../lib/lazyPage'
import { useLocation } from 'react-router-dom'
import Link from './SiteLink'
import { useT } from '../i18n'
import { LIVE } from '../lib/legalRelease'
import { SHOP_URL } from '../lib/shop'
import LanguageMenu from './LanguageMenu'
import ThemeToggle from './ThemeToggle'
import Wordmark from './Wordmark'
import { sectionOf } from '../lib/siteHost'
import ui from './ui/ui.module.css'
import s from './shell.module.css'

/**
 * The wordmark (home), Join a room (the home page's room-code box), once LIVE.merchShop is on the Shop (same tab),
 * then the language menu and the light / dark switch at the far end. Sticky on every page. On a phone the room
 * link takes its short label, so the two controls keep their room in every language. On archive.spysocial.app and
 * market.spysocial.app the site's own places follow the wordmark (components/HostNav).
 */
// The Archive's and the Market's own nav (archive. / market.spysocial.app): its own chunk, never loaded on www.
// A chunk lost to a deploy reloads the page (lib/lazyPage) rather than taking the whole page down with it.
const HostNav = lazyPage(() => import('./HostNav'), true)

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
            <Link to="/#join" className={s.navLink}>
              <span className={s.long}>{t.header.join}</span>
              <span className={s.short} aria-hidden="true">
                {t.header.joinShort}
              </span>
            </Link>
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
