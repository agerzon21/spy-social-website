import { useEffect, useId, useLayoutEffect, useRef, useState, type ComponentType, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { useT } from '../i18n'
import SiteLink from './SiteLink'
import s from './phoneNav.module.css'

/**
 * The phone's nav on archive.spysocial.app and market.spysocial.app (under 560 px; owner Nov 10): built into the
 * header bar, filling the whole space between the round mark and the language menu + light / dark switch. Five
 * options are kept here for the owner to pick one per site (PHONE_NAV); the computer's row of links (HostNav) is
 * approved and doesn't change.
 *
 *   A  Title Drop      the page's name in display type + a thin chevron; a full-width panel drops from the header
 *   B  Ticker          the page centred, its neighbours dimmed at the edges (swipe, tap); tap the page for the panel
 *   C  Case Line       "ARCHIVE / 03 LEDGER" like a dossier's header row; a full-screen index under the header
 *   D  Masthead        "SpySocial Archive" over "Ledger"; a sheet comes down from the top over the header
 *   E  Index Rule      the name with "03/04" and the header's bottom rule cut into one segment per page; a 2 x 2 grid
 *
 * Every option is a disclosure (aria-expanded / aria-controls): focus goes to the current place; Tab stays inside
 * while it's open; Escape, a tap outside, choosing a place, leaving the page or widening past 560 px close it, and
 * focus comes back to the button. Logical sides throughout, so Arabic mirrors. Motion is off under Reduce Motion.
 */

export type PhoneNavOption = 'A' | 'B' | 'C' | 'D' | 'E'
export type PhoneNavSite = 'archive' | 'market'
export type PhoneNavItem = { to: string; label: string }

/** The owner's pick for each site. */
const PHONE_NAV: Record<PhoneNavSite, PhoneNavOption> = { archive: 'C', market: 'A' }

/** Below this width the header shows the phone's nav (shell.module.css hides the row of links). */
const PHONE = '(max-width: 559px)'

/** The dev server alone takes ?phonenav=a..e, to show any option without a rebuild. */
const optionFor = (site: PhoneNavSite): PhoneNavOption => {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const asked = new URLSearchParams(window.location.search).get('phonenav')?.toUpperCase()
    if (asked && 'ABCDE'.includes(asked) && asked.length === 1) return asked as PhoneNavOption
  }
  return PHONE_NAV[site]
}

type Props = { site: PhoneNavSite; label: string; items: PhoneNavItem[]; current?: PhoneNavItem }

const PhoneNav = (props: Props) => {
  const option = optionFor(props.site)
  const View = VIEWS[option]
  return <View {...props} />
}
export default PhoneNav

/* ---------------------------------------------------------------- shared */

const Chevron = ({ className }: { className?: string }) => (
  <svg className={`${s.chev} ${className ?? ''}`} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Cross = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const no = (i: number) => String(i + 1).padStart(2, '0')

/** Shrinks a one-line label (display type) until it fits its box, down to `min` px; past that it ends in an ellipsis. */
function useFit(ref: RefObject<HTMLElement | null>, max: number, min: number, key: string) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      let size = max
      el.style.fontSize = `${size}px`
      while (size > min && el.scrollWidth > el.clientWidth + 0.5) {
        size -= 1
        el.style.fontSize = `${size}px`
      }
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    document.fonts?.ready.then(fit).catch(() => {})
    return () => ro.disconnect()
  }, [ref, max, min, key])
}

/**
 * Open / closed, with the keyboard and pointer rules above. `covers`: the menu lies over the button (D's sheet), so
 * Tab goes round the menu alone. `lock`: the page under it doesn't scroll (C, D).
 */
function useDisclosure({ covers = false, lock = false } = {}) {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const id = useId()
  const { pathname } = useLocation()

  // Leaving the page closes it.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const focusables = () => [...(menu.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])]
    // Into the menu: the current place, else the first.
    ;(menu.current?.querySelector<HTMLElement>('[aria-current="page"]') ?? focusables()[0])?.focus({ preventScroll: true })
    const onDown = (e: PointerEvent) => {
      const at = e.target as Node
      if (!menu.current?.contains(at) && !trigger.current?.contains(at)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        trigger.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const ring = (covers ? focusables() : [trigger.current, ...focusables()]).filter((el): el is HTMLElement => !!el)
      const at = ring.indexOf(document.activeElement as HTMLElement)
      e.preventDefault()
      ring[(at + (e.shiftKey ? -1 : 1) + ring.length) % ring.length]?.focus()
    }
    // Turning a phone to a wider screen shows the row instead: close.
    const phone = window.matchMedia(PHONE)
    const onWide = () => !phone.matches && setOpen(false)
    const root = document.documentElement
    const was = root.style.overflow
    if (lock) root.style.overflow = 'hidden'
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    phone.addEventListener('change', onWide)
    return () => {
      if (lock) root.style.overflow = was
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
      phone.removeEventListener('change', onWide)
    }
  }, [open, covers, lock])

  const close = (refocus = false) => {
    setOpen(false)
    if (refocus) trigger.current?.focus()
  }
  const button = { ref: trigger, type: 'button' as const, 'aria-expanded': open, 'aria-controls': id, onClick: () => setOpen((o) => !o) }
  return { open, close, button, menu, id }
}

/** Dims the page under an open menu (under the header, which stays lit; over it for D). Taps on it close the menu. */
const Scrim = ({ open, over = false }: { open: boolean; over?: boolean }) =>
  createPortal(<div className={over ? s.scrimOver : s.scrim} data-open={open || undefined} aria-hidden="true" />, document.body)

/** A place in an open menu: the current one marked (aria-current), out of the Tab order while closed. */
const Place = ({ it, current, open, onPick, className, children }: { it: PhoneNavItem; current?: PhoneNavItem; open: boolean; onPick: () => void; className: string; children: ReactNode }) => (
  <SiteLink to={it.to} className={className} aria-current={it === current ? 'page' : undefined} tabIndex={open ? undefined : -1} onClick={onPick}>
    {children}
  </SiteLink>
)

/** A and B's menu: a full-width panel flush with the header's bottom edge, one big line per place. */
const DropPanel = ({ d, items, current }: { d: ReturnType<typeof useDisclosure>; items: PhoneNavItem[]; current?: PhoneNavItem }) => (
  <div ref={d.menu} id={d.id} className={s.panel} data-open={d.open || undefined}>
    <ul className={s.dropList}>
      {items.map((it) => (
        <li key={it.to}>
          <Place it={it} current={current} open={d.open} onPick={() => d.close()} className={s.dropLink}>
            <span className={s.dropName}>{it.label}</span>
          </Place>
        </li>
      ))}
    </ul>
  </div>
)

/* ---------------------------------------------------------------- A  Title Drop */

const TitleDrop = ({ label, items, current }: Props) => {
  const d = useDisclosure()
  const name = useRef<HTMLSpanElement>(null)
  const text = current?.label ?? label
  useFit(name, 30, 15, text)
  return (
    <div className={s.root} data-option="A">
      <button {...d.button} className={`${s.trigger} ${s.aTrigger}`}>
        <span ref={name} className={s.aName}>{text}</span>
        <Chevron />
      </button>
      <DropPanel d={d} items={items} current={current} />
      <Scrim open={d.open} />
    </div>
  )
}

/* ---------------------------------------------------------------- B  Ticker */

const Ticker = ({ label, items, current }: Props) => {
  const d = useDisclosure()
  const strip = useRef<HTMLDivElement>(null)
  const at = current ? items.indexOf(current) : -1
  const before = at < 0 ? [] : items.slice(0, at)
  const after = at < 0 ? items : items.slice(at + 1)
  // The page in the middle of the strip.
  useLayoutEffect(() => {
    const now = d.button.ref.current
    const box = strip.current
    if (!now || !box) return
    const centre = () => {
      const a = now.getBoundingClientRect()
      const b = box.getBoundingClientRect()
      box.scrollLeft += a.left + a.width / 2 - (b.left + b.width / 2)
    }
    centre()
    document.fonts?.ready.then(centre).catch(() => {})
  }, [at, d.button.ref])
  const side = (it: PhoneNavItem) => (
    <SiteLink key={it.to} to={it.to} className={s.bSide}>
      {it.label}
    </SiteLink>
  )
  return (
    <div className={s.root} data-option="B">
      <div ref={strip} className={s.bStrip}>
        <span className={s.bSpacer} aria-hidden="true" />
        {before.map(side)}
        <button {...d.button} className={`${s.trigger} ${s.bNow}`} aria-current={current ? 'page' : undefined}>
          <span>{current?.label ?? label}</span>
          <Chevron />
        </button>
        {after.map(side)}
        <span className={s.bSpacer} aria-hidden="true" />
      </div>
      <DropPanel d={d} items={items} current={current} />
      <Scrim open={d.open} />
    </div>
  )
}

/* ---------------------------------------------------------------- C  Case Line */

const CaseLine = ({ items, current, label }: Props) => {
  const d = useDisclosure({ lock: true })
  const name = useRef<HTMLSpanElement>(null)
  const site = items[0]?.label ?? label
  const at = current ? items.indexOf(current) : -1
  const text = current?.label ?? label
  useFit(name, 24, 14, text)
  // The index lies under the header, whatever its height.
  const [top, setTop] = useState(64)
  useLayoutEffect(() => {
    if (d.open) setTop(Math.round(d.button.ref.current?.closest('header')?.getBoundingClientRect().bottom ?? 64))
  }, [d.open, d.button.ref])
  return (
    <div className={s.root} data-option="C">
      <button {...d.button} className={`${s.trigger} ${s.cTrigger}`}>
        <span className={s.cFile}>{site}</span>
        <span className={s.cSlash} aria-hidden="true">/</span>
        {at >= 0 && <span className={s.cNo} aria-hidden="true">{no(at)}</span>}
        <span ref={name} className={s.cName}>{text}</span>
        <Chevron />
      </button>
      {createPortal(
        <div ref={d.menu} id={d.id} className={s.cIndex} style={{ top }} data-open={d.open || undefined}>
          <p className={s.cHead} aria-hidden="true">
            <span>{site}</span>
            <span dir="ltr">
              {no(0)}–{no(items.length - 1)}
            </span>
          </p>
          <ol className={s.cList}>
            {items.map((it, i) => (
              <li key={it.to}>
                <Place it={it} current={current} open={d.open} onPick={() => d.close()} className={s.cLink}>
                  <span className={s.cLinkNo} aria-hidden="true">{no(i)}</span>
                  <span className={s.cLinkName}>{it.label}</span>
                </Place>
              </li>
            ))}
          </ol>
        </div>,
        document.body,
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- D  Masthead */

const Masthead = ({ items, current, label }: Props) => {
  const t = useT()
  const d = useDisclosure({ covers: true, lock: true })
  const name = useRef<HTMLSpanElement>(null)
  const site = items[0]?.label ?? label
  const text = current?.label ?? label
  useFit(name, 24, 14, text)
  return (
    <div className={s.root} data-option="D">
      <button {...d.button} className={`${s.trigger} ${s.dTrigger}`}>
        <span className={s.dKicker}>
          SpySocial <span className={s.dSite}>{site}</span>
        </span>
        <span className={s.dLine}>
          <span ref={name} className={s.dName}>{text}</span>
          <Chevron />
        </span>
      </button>
      {createPortal(
        <div ref={d.menu} id={d.id} className={s.dSheet} data-open={d.open || undefined}>
          <div className={s.dTop}>
            <span className={s.dKicker} aria-hidden="true">
              SpySocial <span className={s.dSite}>{site}</span>
            </span>
            <button type="button" className={s.dClose} aria-label={t.common.close} tabIndex={d.open ? undefined : -1} onClick={() => d.close(true)}>
              <Cross />
            </button>
          </div>
          <ul className={s.dList}>
            {items.map((it) => (
              <li key={it.to}>
                <Place it={it} current={current} open={d.open} onPick={() => d.close()} className={s.dLink}>
                  {it.label}
                </Place>
              </li>
            ))}
          </ul>
          <span className={s.dHandle} aria-hidden="true" />
        </div>,
        document.body,
      )}
      <Scrim open={d.open} over />
    </div>
  )
}

/* ---------------------------------------------------------------- E  Index Rule */

const IndexRule = ({ items, current, label }: Props) => {
  const d = useDisclosure()
  const name = useRef<HTMLSpanElement>(null)
  const at = current ? items.indexOf(current) : -1
  const text = current?.label ?? label
  useFit(name, 25, 14, text)
  return (
    <div className={s.root} data-option="E">
      <button {...d.button} className={`${s.trigger} ${s.eTrigger}`}>
        <span ref={name} className={s.eName}>{text}</span>
        {at >= 0 && (
          <span className={s.eCount} dir="ltr" aria-hidden="true">
            {no(at)}/{no(items.length - 1)}
          </span>
        )}
        <Chevron />
        <span className={s.eRule} aria-hidden="true">
          {items.map((it, i) => (
            <i key={it.to} data-on={i === at || undefined} />
          ))}
        </span>
      </button>
      <div ref={d.menu} id={d.id} className={`${s.panel} ${s.ePanel}`} data-open={d.open || undefined}>
        <ul className={s.eGrid}>
          {items.map((it, i) => (
            <li key={it.to}>
              <Place it={it} current={current} open={d.open} onPick={() => d.close()} className={s.eTile}>
                <span className={s.eTileNo} aria-hidden="true">{no(i)}</span>
                <span className={s.eTileName}>{it.label}</span>
              </Place>
            </li>
          ))}
        </ul>
      </div>
      <Scrim open={d.open} />
    </div>
  )
}

const VIEWS: Record<PhoneNavOption, ComponentType<Props>> = { A: TitleDrop, B: Ticker, C: CaseLine, D: Masthead, E: IndexRule }
