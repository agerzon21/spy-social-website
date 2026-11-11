import { useEffect, useId, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import SiteLink from './SiteLink'
import s from './phoneNav.module.css'

/**
 * The phone's nav on archive.spysocial.app and market.spysocial.app (under 560 px): built into the header bar,
 * filling the whole space between the round mark and the language menu + light / dark switch. The owner's pick for
 * both sites (Nov 11), the Index Rule: the page's name with "03/04", and the header's bottom rule cut into one
 * segment per page, the current one in the accent; it opens a 2 x 2 grid of the site's places flush with the header.
 * The computer's row of links (HostNav) doesn't change.
 *
 * A disclosure (aria-expanded / aria-controls): focus goes to the current place; Tab stays between the button and the
 * grid while it's open; Escape, a tap outside, choosing a place, leaving the page or widening past 560 px close it,
 * and Escape brings focus back to the button. Logical sides throughout, so Arabic mirrors. No motion under Reduce
 * Motion.
 */

export type PhoneNavItem = { to: string; label: string }
type Props = { label: string; items: PhoneNavItem[]; current?: PhoneNavItem }

/** Below this width the header shows the phone's nav (shell.module.css hides the row of links). */
const PHONE = '(max-width: 559px)'

const Chevron = () => (
  <svg className={s.chev} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const no = (i: number) => String(i + 1).padStart(2, '0')

/**
 * Fits a label in display type to its box: one line from `max` down to `oneLine` px; when it still doesn't fit (long
 * Russian names), two lines from `oneLine` down to `twoLines`.
 */
function useFit(ref: RefObject<HTMLElement | null>, max: number, oneLine: number, twoLines: number, key: string) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const set = (px: number) => (el.style.fontSize = `${px}px`)
    const wide = () => el.scrollWidth > el.clientWidth + 0.5
    const tall = () => el.scrollHeight > el.clientHeight + 1
    const fit = () => {
      delete el.dataset.wrap
      let size = max
      set(size)
      while (size > oneLine && wide()) set(--size)
      if (!wide()) return
      // One long word can't take two lines: it shrinks further on its one line (then ellipsis), never breaks mid-word.
      if (!/\s/.test((el.textContent ?? '').trim())) {
        while (size > twoLines && wide()) set(--size)
        return
      }
      el.dataset.wrap = ''
      while (size > twoLines && (wide() || tall())) set(--size)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    document.fonts?.ready.then(fit).catch(() => {})
    return () => ro.disconnect()
  }, [ref, max, oneLine, twoLines, key])
}

/** Open / closed, with the keyboard and pointer rules above. */
function useDisclosure() {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const id = useId()
  const { pathname } = useLocation()

  // Leaving the page closes it.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const links = () => [...(menu.current?.querySelectorAll<HTMLElement>('a[href]') ?? [])]
    // Into the menu: the current place, else the first.
    ;(menu.current?.querySelector<HTMLElement>('[aria-current="page"]') ?? links()[0])?.focus({ preventScroll: true })
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
      const ring = [trigger.current, ...links()].filter((el): el is HTMLElement => !!el)
      const at = ring.indexOf(document.activeElement as HTMLElement)
      e.preventDefault()
      ring[(at + (e.shiftKey ? -1 : 1) + ring.length) % ring.length]?.focus()
    }
    // Turning a phone to a wider screen shows the row instead: close.
    const phone = window.matchMedia(PHONE)
    const onWide = () => !phone.matches && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    phone.addEventListener('change', onWide)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
      phone.removeEventListener('change', onWide)
    }
  }, [open])

  const close = () => setOpen(false)
  const button = { ref: trigger, type: 'button' as const, 'aria-expanded': open, 'aria-controls': id, onClick: () => setOpen((o) => !o) }
  return { open, close, button, menu, id }
}

/** Dims the page under the open grid (under the header, which stays lit). Taps on it close the grid. */
const Scrim = ({ open }: { open: boolean }) =>
  createPortal(<div className={s.scrim} data-open={open || undefined} aria-hidden="true" />, document.body)

const PhoneNav = ({ items, current, label }: Props) => {
  const d = useDisclosure()
  const name = useRef<HTMLSpanElement>(null)
  const at = current ? items.indexOf(current) : -1
  const text = current?.label ?? label
  useFit(name, 25, 17, 12, text)
  return (
    <div className={s.root}>
      <button {...d.button} className={s.trigger}>
        <span ref={name} className={s.name}>{text}</span>
        {at >= 0 && (
          <span className={s.count} dir="ltr" aria-hidden="true">
            {no(at)}/{no(items.length - 1)}
          </span>
        )}
        <Chevron />
        <span className={s.rule} aria-hidden="true">
          {items.map((it, i) => (
            <i key={it.to} data-on={i === at || undefined} />
          ))}
        </span>
      </button>
      <div ref={d.menu} id={d.id} className={s.panel} data-open={d.open || undefined}>
        <ul className={s.grid}>
          {items.map((it, i) => (
            <li key={it.to}>
              <SiteLink
                to={it.to}
                className={s.tile}
                aria-current={it === current ? 'page' : undefined}
                tabIndex={d.open ? undefined : -1}
                onClick={d.close}
              >
                <span className={s.tileNo} aria-hidden="true">{no(i)}</span>
                <span className={s.tileName}>{it.label}</span>
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
      <Scrim open={d.open} />
    </div>
  )
}

export default PhoneNav
