import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang, type LangCode } from '../i18n'
import { archiveStrings } from '../pages/archive/strings'
import { marketStrings } from '../pages/market/strings'
import { canonicalPath, type SiteHost } from '../lib/siteHost'
import SiteLink from './SiteLink'
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
  market: (lang) => {
    const w = marketStrings(lang).nav
    return {
      label: w.label,
      items: [
        { to: '/market', label: w.market },
        { to: '/market/movers/rises', label: w.movers, also: ['/market/movers'] },
        // An item's page is the Catalogue's.
        { to: '/market/catalogue', label: w.catalogue, also: ['/market/catalogue', '/market/item/'] },
        { to: '/archive', label: w.archive },
      ],
    }
  },
}

/**
 * The header's nav on archive.spysocial.app and market.spysocial.app (owner Nov 10): that site's places beside the
 * wordmark, in place of the row under the header, on every page the host serves (the Archive's Ledger and
 * Transparency too). The current place is marked. On a phone the links scroll sideways in the header's one row,
 * with the current one brought into view. Loaded only on those hosts (Header), with the page's words.
 */
const HostNav = ({ section }: { section: Section }) => {
  const { lang } = useLang()
  const path = canonicalPath(useLocation().pathname.replace(/\/+$/, '') || '/')
  const { label, items } = ITEMS[section](lang)
  const current = items.find((it) => path === it.to || it.also?.some((p) => path.startsWith(p)))?.to
  const ref = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const list = ref.current
    const here = list?.querySelector<HTMLElement>('[aria-current="page"]')
    if (!list || !here || list.scrollWidth <= list.clientWidth) return
    // Bring the current link to the row's middle (either direction); the header is at the top, so the page stays put.
    here.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [current])
  return (
    <nav className={s.hostNav} aria-label={label} data-host-nav={section}>
      <ul ref={ref} className={s.hostList}>
        {items.map((it) => (
          <li key={it.to}>
            <SiteLink to={it.to} className={s.hostLink} aria-current={it.to === current ? 'page' : undefined}>
              {it.label}
            </SiteLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HostNav
