import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FaChevronDown, FaFolderClosed, FaFolderOpen } from 'react-icons/fa6'
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

/** The phone's drawer is the header's below this width (shell.module.css: the round mark, the file tab). */
const PHONE = '(max-width: 559px)'

/**
 * The header's nav on archive.spysocial.app and market.spysocial.app (owner Nov 10): that site's places beside the
 * wordmark, on every page the host serves (the Archive's Ledger and Transparency too), the current one marked.
 * On a computer or tablet, the links in the header's row. On a phone (owner Nov 10: no sideways scroll, no burger),
 * a case-file tab naming the current page opens a file drawer that slides down from the header with every place,
 * numbered like a dossier's tabs: Escape, a tap outside, choosing a place or leaving the page close it; while it's
 * open Tab stays between the tab and the drawer. Loaded only on those hosts (Header), with the page's words.
 */
const HostNav = ({ section }: { section: Section }) => {
  const { lang } = useLang()
  const { pathname } = useLocation()
  const path = canonicalPath(pathname.replace(/\/+$/, '') || '/')
  const { label, items } = ITEMS[section](lang)
  const current = items.find((it) => path === it.to || it.also?.some((p) => path.startsWith(p)))
  const [open, setOpen] = useState(false)
  const tab = useRef<HTMLButtonElement>(null)
  const drawer = useRef<HTMLDivElement>(null)
  const drawerId = useId()

  // Leaving the page closes the drawer.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const links = () => [...(drawer.current?.querySelectorAll<HTMLElement>('a') ?? [])]
    // Into the drawer: the current place, else the first.
    ;(drawer.current?.querySelector<HTMLElement>('[aria-current="page"]') ?? links()[0])?.focus()
    const onDown = (e: PointerEvent) => {
      const at = e.target as Node
      if (!drawer.current?.contains(at) && !tab.current?.contains(at)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        tab.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      // Tab and Shift+Tab go round the tab and the drawer's links.
      const ring = [tab.current, ...links()].filter((el): el is HTMLElement => !!el)
      const at = ring.indexOf(document.activeElement as HTMLElement)
      e.preventDefault()
      ring[(at + (e.shiftKey ? -1 : 1) + ring.length) % ring.length]?.focus()
    }
    // Turning a phone to a wider screen shows the row instead: close.
    const wide = window.matchMedia(PHONE)
    const onWide = () => !wide.matches && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [open])

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

      <button
        ref={tab}
        type="button"
        className={s.fileTab}
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <FaFolderOpen aria-hidden focusable={false} /> : <FaFolderClosed aria-hidden focusable={false} />}
        <span className={s.fileTabText}>{current?.label ?? label}</span>
        <FaChevronDown className={s.fileChevron} aria-hidden focusable={false} />
      </button>
      <div ref={drawer} id={drawerId} className={s.fileDrawer} data-open={open || undefined}>
        <p className={s.fileHead} aria-hidden="true">{label}</p>
        <ol className={s.fileList}>
          {items.map((it, i) => (
            <li key={it.to}>
              <SiteLink
                to={it.to}
                className={s.fileLink}
                aria-current={it === current ? 'page' : undefined}
                tabIndex={open ? undefined : -1}
                onClick={() => setOpen(false)}
              >
                <span className={s.fileNo} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span>{it.label}</span>
              </SiteLink>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export default HostNav
