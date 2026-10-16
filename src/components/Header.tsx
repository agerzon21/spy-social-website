import { Link } from 'react-router-dom'
import { LIVE } from '../lib/legalRelease'
import { SHOP_URL } from '../lib/shop'
import Wordmark from './Wordmark'
import ui from './ui/ui.module.css'
import s from './shell.module.css'

/**
 * The wordmark (home), Join a room (the home page's room-code box) and, once LIVE.merchShop is on, the Shop
 * (same tab). Sticky on every page.
 */
const Header = ({ isHome = false }: { isHome?: boolean }) => (
  <header className={isHome ? `${s.header} ${s.headerHome}` : s.header}>
    <div className={`${ui.wrap} ${s.bar}`}>
      <Link to="/" className={s.home} aria-label="SpySocial home">
        <Wordmark />
      </Link>
      <nav className={s.nav} aria-label="Site">
        <Link to="/#join" className={s.navLink}>
          Join a room
        </Link>
        {LIVE.merchShop && (
          <a href={SHOP_URL} className={s.navLink}>
            Shop
          </a>
        )}
      </nav>
    </div>
  </header>
)

export default Header
