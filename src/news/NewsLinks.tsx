import Link from '../components/SiteLink'
import ui from '../components/ui/ui.module.css'
import { linkLabel, type NewsLink } from '.'

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/** An entry's links (src/news/entries.ts): a page of this site, or another site's in a new tab. */
const NewsLinks = ({ links, lang, className }: { links: NewsLink[]; lang: string; className?: string }) => (
  <p className={className}>
    {links.map((link) =>
      link.to.startsWith('/') ? (
        <Link key={link.to} to={link.to} className={ui.iconLink}>
          <Arrow />
          {linkLabel(link, lang)}
        </Link>
      ) : (
        <a key={link.to} href={link.to} className={ui.iconLink} target="_blank" rel="noopener noreferrer">
          <Arrow />
          {linkLabel(link, lang)}
        </a>
      ),
    )}
  </p>
)

export default NewsLinks
