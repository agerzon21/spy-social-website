import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n'
import type { ItemLook } from '../../lib/archive'
import { archiveStrings } from './strings'
import c from './displayCase.module.css'

/**
 * A wearable Unique alone in the display case, a backdrop framed on the wall (archive-item-art-1111, owner's pick
 * Nov 11: option C, no agent on the picture), inside the copy's own foil ring (`ring`: its full tile, the inside
 * covered). With `wear` (a Unique's page): "See it worn" turns the card over to the standard agent wearing it, on the
 * same dark room, straight (no tilt), Him | Her. It turns only when asked: a click or tap on the chip (Enter or Space
 * on it by keyboard, a button), never on hover (owner Nov 11); "The item" turns it back. Celebrations, locals, titles and borders never come here: their picture is the full frame (Piece's img).
 * Keyboard (a11y-1111): the side turned away is hidden from screen readers, so focus follows the turn (See it worn ->
 * Back, Back -> See it worn), and Escape turns it back.
 */
export function DisplayCase({ ring, look, alt, wear = false, eager = false }: { ring: string; look: ItemLook; alt: string; wear?: boolean; eager?: boolean }) {
  const { lang } = useLang()
  const w = archiveStrings(lang).worn
  const [worn, setWorn] = useState(false)
  const [who, setWho] = useState<'m' | 'f'>('m')
  const canWear = wear && !!look.worn
  const seeBtn = useRef<HTMLButtonElement>(null)
  const backBtn = useRef<HTMLButtonElement>(null)
  // Focus left on the side that just turned away (now aria-hidden) moves to the other side's chip.
  useEffect(() => {
    const away = worn ? seeBtn.current : backBtn.current
    const to = worn ? backBtn.current : seeBtn.current
    const at = document.activeElement
    if (away && to && at instanceof HTMLElement && away.parentElement?.contains(at)) to.focus({ preventScroll: true })
  }, [worn])
  const Ring = <img className={c.ring} src={ring} alt="" width={640} height={640} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  return (
    <span
      className={c.box}
      data-worn={worn ? '1' : undefined}
      onKeyDown={(e) => {
        if (worn && e.key === 'Escape') {
          e.preventDefault()
          setWorn(false)
        }
      }}
    >
      <span className={c.card}>
        <span className={c.face} aria-hidden={worn || undefined}>
          {Ring}
          <span className={c.inside}>
            {look.kind === 'scene' ? null : <span className={c.room} />}
            {look.kind === 'scene' ? null : <span className={c.beam} />}
            {look.kind === 'scene' ? (
              <img className={c.scene} src={look.alone} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
            ) : look.kind === 'case' ? (
              <>
                <span className={c.column} />
                <span className={c.top} />
                <span className={c.glass} />
                <img className={`${c.item} ${look.big ? c.big : ''}`} src={look.alone} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
              </>
            ) : (
              <>
                <span className={c.painting}>
                  <img src={look.alone} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
                </span>
                <span className={c.bench} />
              </>
            )}
          </span>
          {canWear ? (
            <button ref={seeBtn} type="button" className={`${c.chip} ${c.chipSee}`} onClick={() => setWorn(true)} tabIndex={worn ? -1 : 0}>
              <svg viewBox="0 0 24 24" aria-hidden focusable="false">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.2-4.2 4.4-6.5 8-6.5s6.8 2.3 8 6.5" />
              </svg>
              {w.see}
            </button>
          ) : null}
        </span>
        {canWear && look.worn ? (
          <span className={`${c.face} ${c.back}`} aria-hidden={!worn || undefined}>
            {Ring}
            <span className={c.inside}>
              <span className={c.room} />
              <span className={c.beam} />
              <img className={look.kind === 'wall' ? c.scene : c.agent} src={look.worn[who]} alt={worn ? `${w.label}: ${who === 'm' ? w.him : w.her}` : ''} loading="lazy" decoding="async" />
            </span>
            <button ref={backBtn} type="button" className={`${c.chip} ${c.chipBack}`} onClick={() => setWorn(false)} tabIndex={worn ? 0 : -1}>
              <span aria-hidden>↺</span>
              {w.back}
            </button>
            <span className={c.toggle} role="group" aria-label={w.label}>
              {(['m', 'f'] as const).map((g) => (
                <button key={g} type="button" aria-pressed={who === g} onClick={() => setWho(g)} tabIndex={worn ? 0 : -1}>
                  {g === 'm' ? w.him : w.her}
                </button>
              ))}
            </span>
          </span>
        ) : null}
      </span>
    </span>
  )
}
