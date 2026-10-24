import { Link as RouterLink } from 'react-router-dom'
import { useMemo } from 'react'
import { useT } from '../i18n'
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
        <li key={link.to ?? link.href}>
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

  const t = useT()
  const f = t.footer
  const play: FooterLinkItem[] = [
    ...(showBrowser ? [{ label: f.browser, href: PLAY_URL }] : []),
    { label: f.whatsNew, to: '/whats-new' },
    // The roadmap, once the owner has approved it (LIVE.roadmap).
    ...(LIVE.roadmap ? [{ label: f.roadmap, to: '/roadmap' }] : []),
    { label: f.rules, to: '/rules' },
    // The Game Night rules, once they're live (LIVE.gameNightRules).
    ...(LIVE.gameNightRules ? [{ label: f.gameNightRules, to: '/game-night-rules' }] : []),
    { label: f.support, to: '/support' },
    { label: f.contact, to: '/contact-us' },
    ...(LIVE.merchShop ? [{ label: f.shop, href: SHOP_URL }] : []),
  ]
  const legal: FooterLinkItem[] = [
    { label: f.privacy, to: '/privacy' },
    { label: f.terms, to: '/terms' },
    { label: f.childSafety, to: '/child-safety' },
    ...(ONLINE_SAFETY_TEXT ? [{ label: f.safety, to: '/safety' }] : []),
    { label: f.deleteAccount, to: '/delete-account' },
  ]

  return (
    <footer className={s.footer}>
      <div className={ui.wrap}>
        <div className={s.top}>
          <div className={s.brand}>
            <RouterLink to="/" aria-label={t.header.home} className={s.brandLink}>
              <Wordmark />
            </RouterLink>
            <p className={s.tagline}>{f.tagline}</p>
          </div>
          <div className={s.cols}>
            <FooterColumn id="footer-play" title={f.play} links={play} />
            <FooterColumn id="footer-legal" title={f.legal} links={legal} />
          </div>
        </div>
        <div className={s.bottom}>
          <p className={s.copy}>{f.rights(new Date().getFullYear())}</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}

export default Footer
