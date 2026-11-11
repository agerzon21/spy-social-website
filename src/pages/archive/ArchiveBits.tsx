import Link from '../../components/SiteLink'
import { FaTriangleExclamation } from 'react-icons/fa6'
import { artOf, codenameOf, lookOf, nameOf, serialText, swatchOf, uniquePath, type ArchiveCopy, type ArchiveSet, type ItemLook } from '../../lib/archive'
import { DisplayCase } from './DisplayCase'
import { fmt, setText, useArchive } from './useArchive'
import s from './archive.module.css'

/** The beta chain's notice (the server's; the page's words for it). */
export function BetaNotice({ chain }: { chain?: string }) {
  const { w } = useArchive()
  if (chain !== 'beta') return null
  return (
    <p className={s.notice} role="note">
      <FaTriangleExclamation aria-hidden focusable={false} />
      <span>{w.beta}</span>
    </p>
  )
}

/**
 * A piece: its picture in the Unique's foil rim (the plain Legendary in gold). With `look` (archive-item-art-1111) the
 * picture is the item alone in its display case, a backdrop on its wall or a scene filling the frame, inside the
 * copy's own ring (`src`, its tile); `wear` adds "See it worn" (a Unique's page).
 */
export function Piece({ src, alt, unique = true, small = false, eager = false, look = null, wear = false }: { src: string | null; alt: string; unique?: boolean; small?: boolean; eager?: boolean; look?: ItemLook | null; wear?: boolean }) {
  return (
    <span className={`${s.piece} ${unique ? '' : s.piecePlain}`}>
      {src && look ? (
        <DisplayCase ring={src} look={look} alt={alt} wear={wear} eager={eager} />
      ) : src ? (
        <img src={src} alt={alt} width={small ? 320 : 640} height={small ? 320 : 640} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      ) : (
        <span className={s.skeleton} style={{ display: 'block', aspectRatio: '1' }} />
      )}
    </span>
  )
}

/** The float as the certificate prints it: "0." and sixteen digits, the four that pick its looks marked. */
export function FloatDigits({ float, marks = true }: { float: string; marks?: boolean }) {
  const digits = (float.split('.')[1] ?? '').padEnd(16, '0').slice(0, 16).split('')
  return (
    <div className={s.floatDigits} aria-label={float}>
      <span className={s.lead} aria-hidden>0.</span>
      {digits.map((d, i) => (
        <span key={i} aria-hidden className={`${s.d} ${marks && i < 4 ? s[`d${i + 1}`] : ''}`} data-n={marks && i < 4 ? String(i + 1) : undefined}>
          {d}
        </span>
      ))}
    </div>
  )
}

/** One Unique in a grid: its picture, number, name, codename, set, and its price or last sale. */
export function UniqueCard({ c, sets }: { c: ArchiveCopy; sets: ArchiveSet[] }) {
  const { w, data, art, looks, lang, locale } = useArchive()
  const name = nameOf(data, c.item_code)
  const code = codenameOf(data, c.item_code, c.serial)
  const pic = artOf(art, c.item_code, c.serial, true)
  const look = pic ? lookOf(looks, c.item_code, c.serial, true) : null
  const sw = swatchOf(data, c.item_code, c.float)
  const st = setText(sets.find((x) => x.code === c.set), lang)
  return (
    <li>
      <Link to={uniquePath(c.item_code, c.serial)} className={s.card} aria-label={`${name}${code ? ` · ${code}` : ''} ${serialText(c.serial)}`}>
        <div className={s.cardArt}>
          <Piece src={pic?.src ?? null} alt="" small look={look} />
          <span className={s.cardSerial}>{serialText(c.serial)}</span>
        </div>
        <div className={s.cardBody}>
          <p className={s.cardName}>{name}</p>
          {code ? <p className={s.cardCode}>{code}</p> : null}
          <p className={s.cardSet}>
            {sw ? <span className={s.swDot} style={{ background: sw }} aria-hidden /> : null}
            {[st.set, st.season && st.season !== st.set ? st.season : ''].filter(Boolean).join(' · ')}
          </p>
          <div className={`${s.cardFoot} ${c.status === 'listed' ? s.forSale : ''}`}>
            {c.status === 'listed' && c.price != null ? (
              <>
                <span>{w.card.forSale}</span>
                <b>{fmt(c.price, locale)}</b>
              </>
            ) : c.status === 'burned' ? (
              <span>{w.card.retired}</span>
            ) : c.last_sale != null ? (
              <>
                <span>{w.card.lastSale}</span>
                <b>{fmt(c.last_sale, locale)}</b>
              </>
            ) : (
              <span>{w.card.held}</span>
            )}
          </div>
        </div>
      </Link>
    </li>
  )
}

/** The ledger unreachable, or its Archive reads not on the server yet: one plain line and a retry. */
export function ArchiveState({ kind, onRetry }: { kind: 'busy' | 'soon'; onRetry?: () => void }) {
  const { w } = useArchive()
  return (
    <div className={s.state} role="status">
      <p>{kind === 'soon' ? w.soon : w.busy}</p>
      {onRetry ? (
        <button type="button" className={s.linkBtn} onClick={onRetry}>
          {w.retry}
        </button>
      ) : null}
    </div>
  )
}
