import { useLocation } from 'react-router-dom'
import { useLang, type LangCode } from '../i18n'
import { archiveStrings } from '../pages/archive/strings'
import { canonicalPath, type SiteHost } from '../lib/siteHost'
import SiteLink from './SiteLink'
import PhoneNav from './PhoneNav'
import s from './shell.module.css'

type Section = Exclude<SiteHost, 'main'>
/** A link by canonical path; `also` holds prefixes that mark it current too (a Unique's page is All Uniques'). */
type Item = { to: string; label: string; also?: string[] }

/** Each subdomain's places, in its own words. */
const ITEMS: Record<Section, (lang: LangCode) => { label: string; items: Item[] }> = {
  archive: (lang) => {
    const w = archiveStrings(lang).nav
    return {
      label: w.archive,
      items: [
        { to: '/archive', label: w.archive },
        { to: '/archive/uniques', label: w.browse, also: ['/archive/u/'] },
        { to: '/ledger', label: w.ledger },
        { to: '/transparency', label: w.transparency },
      ],
    }
  },
  market: () => ({ label: '', items: [] }),
}

/**
 * The header's nav on archive.spysocial.app and market.spysocial.app (owner Nov 10): that site's places beside the
 * wordmark, on every page the host serves (the Archive's Ledger and Transparency too), the current one marked.
 * On a computer or tablet, the links in the header's row (approved). On a phone (under 560 px; no sideways scroll,
 * no burger, no tab bolted on), PhoneNav fills the header's middle and opens the site's places from it.
 * Loaded only on those hosts (Header), with the page's words.
 */
const HostNav = ({ section }: { section: Section }) => {
  const { lang } = useLang()
  const { pathname } = useLocation()
  const path = canonicalPath(pathname.replace(/\/+$/, '') || '/')
  const { label, items } = ITEMS[section](lang)
  const current = items.find((it) => path === it.to || it.also?.some((p) => path.startsWith(p)))

  return (
    <nav className={s.hostNav} aria-label={label} data-host-nav={section}>
      <ul className={s.hostList}>
        {items.map((it) => (
          <li key={it.to}>
            <SiteLink to={it.to} className={s.hostLink} aria-current={it === current ? 'page' : undefined}>
              {it.label}
            </SiteLink>
          </li>
        ))}
      </ul>
      <PhoneNav label={label} items={items} current={current} />
    </nav>
  )
}

export default HostNav
