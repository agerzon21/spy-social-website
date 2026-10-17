import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { LIVE } from '../lib/legalRelease'
import { SHOP_URL } from '../lib/shop'
import LanguageMenu from './LanguageMenu'
import ThemeToggle from './ThemeToggle'
import Wordmark from './Wordmark'
import ui from './ui/ui.module.css'
import s from './shell.module.css'

/**
 * The wordmark (home), Join a room (the home page's room-code box), once LIVE.merchShop is on the Shop (same tab),
 * then the language menu and the light / dark switch at the far end. Sticky on every page. On a phone the room
 * link takes its short label, so the two controls keep their room in every language.
 */
const Header = ({ isHome = false }: { isHome?: boolean }) => {
  const t = useT()
  return (
    <header className={isHome ? `${s.header} ${s.headerHome}` : s.header}>
      <div className={`${ui.wrap} ${s.bar}`}>
        <Link to="/" className={s.home} aria-label={t.header.home}>
          <Wordmark />
        </Link>
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
