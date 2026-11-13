import Link from '../../components/SiteLink'
import { FaTriangleExclamation } from 'react-icons/fa6'
import { artOf, attributesOf, BETA_UNTIL_TOLD, codenameOf, holderOf, lookOf, nameOf, serialText, uniquePath, type ArchiveCopy, type ArchiveSet, type ItemLook } from '../../lib/archive'
import { LIVE } from '../../lib/legalRelease'
import { DisplayCase } from './DisplayCase'
import { fmt, setBadge, useArchive } from './useArchive'
import s from './archive.module.css'

/** The beta chain's notice (the server's; the page's words for it). Shown from the first paint until the server names another chain (site-qa-1113). */
export function BetaNotice({ chain }: { chain?: string }) {
  const { w } = useArchive()
  if (chain === undefined ? !BETA_UNTIL_TOLD : chain !== 'beta') return null
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
export function Piece({ src, alt, unique = true, small = false, eager = false, look = null, wear = false, still = small }: { src: string | null; alt: string; unique?: boolean; small?: boolean; eager?: boolean; look?: ItemLook | null; wear?: boolean; still?: boolean }) {
  return (
    <span className={`${s.piece} ${unique ? '' : s.piecePlain}`}>
      {src && look ? (
        <DisplayCase ring={src} look={look} alt={alt} wear={wear} eager={eager} still={still} />
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
    <div className={s.floatDigits}>
      {/* A plain <div> can't carry a name (aria-label): screen readers read the float from this text instead. */}
      <span className={s.srOnly}>{float}</span>
      <span className={s.lead} aria-hidden>0.</span>
      {digits.map((d, i) => (
        <span key={i} aria-hidden className={`${s.d} ${marks && i < 4 ? s[`d${i + 1}`] : ''}`} data-n={marks && i < 4 ? String(i + 1) : undefined}>
          {d}
        </span>
      ))}
    </div>
  )
}

/**
 * One Unique in a grid: its picture (the gem top-left, its number bottom-left, its colour bottom-right), name,
 * codename, set (its season's mark, then the set), and its price, last sale or holder. The card is one link to the
 * Unique's page (its name's link stretched over the card); a named holder's @username is a link of its own to their
 * profile (spysocial.app/profile/<name>, as on the Unique's page), on top of it. A holder the server doesn't name
 * reads "Held privately"; a server that sends no holder keys, "Held" as before.
 */
export function UniqueCard({ c, sets }: { c: ArchiveCopy; sets: ArchiveSet[] }) {
  const { w, data, art, looks, lang, locale } = useArchive()
  const name = nameOf(data, c.item_code)
  const code = codenameOf(data, c.item_code, c.serial)
  const pic = artOf(art, c.item_code, c.serial, true)
  const look = pic ? lookOf(looks, c.item_code, c.serial, true, { float: c.float, pattern: c.pattern, serial: c.serial }) : null
  const colour = attributesOf(data, c.item_code, c.float).find((a) => a.place === 2)
  const sb = setBadge(sets.find((x) => x.code === c.set), lang, locale, w.card.season)
  const holder = LIVE.archiveHolders && c.status === 'held' ? holderOf(c) : ({ kind: 'unknown' } as const)
  return (
    <li>
      <div className={s.card}>
        <div className={s.cardArt}>
          <Piece src={pic?.src ?? null} alt="" small look={look} />
          <span className={s.cardSerial}>{serialText(c.serial)}</span>
          {colour?.hex ? <span className={s.cardColour} style={{ background: colour.hex }} title={colour.value || undefined} aria-hidden /> : null}
        </div>
        <div className={s.cardBody}>
          <p className={s.cardName}>
            <Link to={uniquePath(c.item_code, c.serial)} className={s.cardLink} aria-label={`${name}${code ? ` · ${code}` : ''} ${serialText(c.serial)}`}>
              {name}
            </Link>
          </p>
          {code ? <p className={s.cardCode}>{code}</p> : null}
          {sb.mark || sb.name ? (
            <p className={s.cardSet}>
              {sb.mark ? <span className={s.setMark}>{sb.mark}</span> : null}
              <span className={s.setName}>{sb.name}</span>
            </p>
          ) : null}
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
            ) : holder.kind === 'named' ? (
              <span className={s.heldBy}>
                <span>{w.item.heldBy}</span>
                <a className={s.holder} href={holder.url} rel="nofollow" title={`@${holder.handle}`} aria-label={w.item.profileOf(`@${holder.handle}`)}>
                  @{holder.handle}
                </a>
              </span>
            ) : holder.kind === 'private' ? (
              <span className={s.heldPrivately}>{w.item.heldPrivately}</span>
            ) : (
              <span>{w.card.held}</span>
            )}
          </div>
        </div>
      </div>
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
