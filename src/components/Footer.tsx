import { Link as RouterLink } from 'react-router-dom'
import { useMemo } from 'react'
import { LIVE, ONLINE_SAFETY_TEXT } from '../lib/legalRelease'
import { currentPlatform } from '../lib/platform'
import { PLAY_URL } from '../lib/playUrl'
import { SHOP_URL } from '../lib/shop'
import SocialLinks from './SocialLinks'
import Wordmark from './Wordmark'
import ui from './ui/ui.module.css'
import s from './shell.module.css'

// `to` is a route on this site; `href` leaves it (same tab).
interface FooterLinkItem {
  label: string
  to?: string
  href?: string
}

const FooterLink = ({ label, to, href }: FooterLinkItem) =>
  to ? (
    <RouterLink to={to} className={s.link}>{label}</RouterLink>
  ) : (
    <a href={href} className={s.link}>{label}</a>
  )

const FooterColumn = ({ id, title, links }: { id: string; title: string; links: FooterLinkItem[] }) => (
  <nav aria-labelledby={id} style={{ minWidth: 0 }}>
    <p id={id} className={s.colTitle}>
      {title}
    </p>
    <ul className={s.list}>
      {links.map((link) => (
        <li key={link.label}>
          <FooterLink {...link} />
        </li>
      ))}
    </ul>
  </nav>
)

// Logo and tagline, two labelled link columns, then a bottom bar with the copyright and the social icons.
// Desktop and tablet: the logo left, the columns right. Phones: stacked, the columns two-up. Every link is a
// 44 px row.
const Footer = () => {
  // The browser version, on a computer once it's live (LIVE.browserLinks); phones keep the app.
  const showBrowser = useMemo(() => LIVE.browserLinks && currentPlatform() === 'desktop', [])

  const play: FooterLinkItem[] = [
    ...(showBrowser ? [{ label: 'Play in Your Browser', href: PLAY_URL }] : []),
    { label: "What's New", to: '/whats-new' },
    { label: 'Rules', to: '/rules' },
    { label: 'Support', to: '/support' },
    { label: 'Contact', to: '/contact-us' },
    ...(LIVE.merchShop ? [{ label: 'Shop', href: SHOP_URL }] : []),
  ]
  const legal: FooterLinkItem[] = [
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
    { label: 'Child Safety', to: '/child-safety' },
    ...(ONLINE_SAFETY_TEXT ? [{ label: 'Safety', to: '/safety' }] : []),
    { label: 'Delete Account', to: '/delete-account' },
  ]

  return (
    <footer className={s.footer}>
      <div className={ui.wrap}>
        <div className={s.top}>
          <div className={s.brand}>
            <RouterLink to="/" aria-label="SpySocial home" className={s.brandLink}>
              <Wordmark />
            </RouterLink>
            <p className={s.tagline}>The party game of social deception.</p>
          </div>
          <div className={s.cols}>
            <FooterColumn id="footer-play" title="Play" links={play} />
            <FooterColumn id="footer-legal" title="Legal & Safety" links={legal} />
          </div>
        </div>
        <div className={s.bottom}>
          <p className={s.copy}>&copy; {new Date().getFullYear()} SpySocial. All rights reserved</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}

export default Footer
