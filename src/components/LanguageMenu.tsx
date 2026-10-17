import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { LANGUAGES, useLang, useT, type LangCode } from '../i18n'
import { Flag } from './flags'
import s from './LanguageMenu.module.css'

/**
 * The header's language switch, next to the light / dark pill and drawn like it: a slim outlined pill with the
 * current language's flag and two-letter code. It opens a small menu of the ten languages in the app's order, each
 * with its flag and its own name; the current one is ticked. A menu of radio items: arrows, Home / End, Enter or
 * Space to pick, Escape or a tap outside to close. The choice is kept for the next visit (src/i18n).
 */
const LanguageMenu = () => {
  const { lang, language, setLang } = useLang()
  const t = useT()
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const items = useRef<(HTMLButtonElement | null)[]>([])
  const menuId = useId()

  // Open: the current language takes the focus. A tap or click anywhere else closes the menu.
  useEffect(() => {
    if (!open) return
    items.current[LANGUAGES.findIndex((l) => l.code === lang)]?.focus()
    const away = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', away)
    return () => document.removeEventListener('pointerdown', away)
  }, [open, lang])

  const close = (refocus: boolean) => {
    setOpen(false)
    if (refocus) button.current?.focus()
  }

  const pick = (code: LangCode) => {
    close(true)
    if (code !== lang) void setLang(code)
  }

  const onMenuKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const list = items.current.filter(Boolean) as HTMLButtonElement[]
    const at = list.indexOf(document.activeElement as HTMLButtonElement)
    const go = (i: number) => list[(i + list.length) % list.length]?.focus()
    if (e.key === 'ArrowDown') go(at + 1)
    else if (e.key === 'ArrowUp') go(at - 1)
    else if (e.key === 'Home') go(0)
    else if (e.key === 'End') go(list.length - 1)
    else if (e.key === 'Escape') close(true)
    else if (e.key === 'Tab') {
      setOpen(false)
      return
    } else return
    e.preventDefault()
  }

  const onButtonKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div className={s.wrap} ref={wrap}>
      <button
        ref={button}
        type="button"
        className={s.toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={t.language.button(language.native)}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKey}
      >
        <span className={s.pill} aria-hidden="true">
          <Flag code={language.flag} className={s.pillFlag} />
          <span className={s.code}>{language.short}</span>
          <svg className={s.chevron} viewBox="0 0 10 6" focusable="false">
            <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div id={menuId} className={s.menu} role="menu" aria-label={t.language.menu} onKeyDown={onMenuKey}>
          <p className={s.title} aria-hidden="true">
            {t.language.menu}
          </p>
          {LANGUAGES.map((l, i) => (
            <button
              key={l.code}
              ref={(el) => {
                items.current[i] = el
              }}
              type="button"
              role="menuitemradio"
              aria-checked={l.code === lang}
              tabIndex={-1}
              className={s.item}
              lang={l.code}
              onClick={() => pick(l.code)}
            >
              <Flag code={l.flag} className={s.flag} />
              {/* Lined up with the others whichever way it's written; <bdi> keeps its own order. */}
              <span className={s.name}>
                <bdi>{l.native}</bdi>
              </span>
              <svg className={s.check} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageMenu
