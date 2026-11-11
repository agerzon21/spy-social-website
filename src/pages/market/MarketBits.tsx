import { useMemo, type ReactNode } from 'react'
import Link from '../../components/SiteLink'
import { FaCaretDown, FaCaretUp, FaFlask, FaTriangleExclamation } from 'react-icons/fa6'
import ui from '../../components/ui/ui.module.css'
import { SearchField } from '../../components/SearchField'
import {
  categoryOf,
  itemChange,
  itemPath,
  RARITY_COLOUR,
  sampleOn,
  samplesShown,
  searchItems,
  winIndex,
  type MarketHead,
  type MarketItem,
  type MoverList,
  type Win,
  WINDOWS,
} from '../../lib/market'
import { compact, fmt, pctText, useMarketLines, useMarketWords, type LoadState } from './useMarket'
import { CATEGORY_ICON } from './icons'
import a from '../archive/archive.module.css'
import { lookOf } from '../../lib/archive'
import { DisplayCase } from '../archive/DisplayCase'
import { LiveBackdrop } from '../archive/LiveBackdrop'
import { lineOf, marketPic, type MarketLines } from '../../lib/marketArt'
import { MarketCase } from './MarketCase'
import { SceneMotion } from '../archive/SceneMotion'
import s from './market.module.css'

/** Every Market page: the dark vault and the lines (its nav is in the header: components/HostNav) that must show above everything (sample, beta, paused). */
export function MarketPage({ head, children, movers = false }: { head?: MarketHead | null; children: ReactNode; /** A page with Market Movers' lists: the beta notice says why some items are tagged Sample. */ movers?: boolean }) {
  const { w } = useMarketWords()
  return (
    <div className={`${a.page} ${s.page}`}>
      <div className={ui.wrap}>
        {sampleOn() ? (
          <p className={`${a.notice} ${s.sample}`} role="note">
            <FaFlask aria-hidden focusable={false} />
            <span>{w.sample}</span>
          </p>
        ) : null}
        {head?.phase === 'beta' && !sampleOn() ? (
          <p className={a.notice} role="note">
            <FaTriangleExclamation aria-hidden focusable={false} />
            <span>
              {w.beta}
              {/* The sample items in Market Movers (speed-1111): said once, with the beta notice. */}
              {movers && samplesShown(head) ? <> {w.demoMovers}</> : null}
            </span>
          </p>
        ) : null}
        {head?.halted ? (
          <p className={a.notice} role="status">
            <FaTriangleExclamation aria-hidden focusable={false} />
            <span>{w.halted}</span>
          </p>
        ) : null}
        {children}
      </div>
    </div>
  )
}

/** The server's Market reads aren't on yet: "Market opens December 8". Busy: a plain line and a retry. */
export function MarketState({ kind, onRetry }: { kind: LoadState; onRetry?: () => void }) {
  const { w } = useMarketWords()
  if (kind === 'soon') {
    return (
      <div className={s.soon} role="status">
        <p className={s.soonKicker}>{w.name}</p>
        <p className={s.soonTitle}>{w.soon.title}</p>
        <p className={s.soonText}>{w.soon.text}</p>
      </div>
    )
  }
  if (kind !== 'busy') return null
  return (
    <div className={a.state} role="status">
      <p>{w.busy}</p>
      {onRetry ? (
        <button type="button" className={a.linkBtn} onClick={onRetry}>
          {w.retry}
        </button>
      ) : null}
    </div>
  )
}

/**
 * An item's picture: a Legendary drawn for the Archive shows the item alone (archive-item-art-1111, owner Nov 11: no
 * sample agent anywhere on the site): big, in the Archive's display case inside its gold ring (a celebration's scene
 * or a moving backdrop filling it); small, the item cut-out (or the scene) on the case's dark room. Every other item (market-art-1111): its
 * Market picture (lib/marketArt): big, in the display case in its rarity's frame (MarketCase), a backdrop or a
 * celebration full frame; small, on the case's dark room in a rarity edge. Else its shelf's mark in its rarity.
 */
export function ItemThumb({ it, size = 'sm' }: { it: Pick<MarketItem, 'k' | 'i' | 't' | 'r' | 'nm'>; size?: 'sm' | 'md' | 'lg' }) {
  const { art, looks, lang } = useMarketWords()
  const cat = categoryOf(it)
  const Icon = CATEGORY_ICON[cat]
  const colour = RARITY_COLOUR[it.r] ?? RARITY_COLOUR.common
  const legendary = it.r === 'legendary'
  const pic = legendary && art.has(`l-${it.i}`) ? `/archive/art/l-${it.i}${size === 'lg' ? '' : '-s'}.webp` : null
  const look = legendary ? lookOf(looks, it.i, null, size !== 'lg') : null
  const mine = look ? null : marketPic(it, lang, size !== 'lg')
  // A celebration's scene fills the big picture with no ring (owner Nov 11: full frame, no case, no frame).
  const fullScene = size === 'lg' && look?.kind === 'scene'
  const frame = fullScene ? s.thumbBare : pic || look ? s.thumbArt : mine ? (size === 'lg' ? s.thumbBare : `${s.thumbArt} ${s.thumbRar}`) : ''
  return (
    <span
      className={`${s.thumb} ${s[`thumb_${size}`]} ${frame}`}
      style={{ ['--rar' as string]: colour.dark, ['--rar-light' as string]: colour.light }}
      aria-hidden
    >
      {fullScene && look ? (
        // Full frame, moving as in the app where the Archive has its loop (pages/archive/SceneMotion).
        <span className={s.caseSceneBox}>
          <SceneMotion poster={look.alone} motion={look.motion} alt="" />
        </span>
      ) : pic && look && size === 'lg' ? (
        <DisplayCase ring={pic} look={look} alt="" />
      ) : look?.kind === 'live' && look.item ? (
        <span className={`${s.thumbAlone} ${s.thumbFill}`}>
          <LiveBackdrop item={look.item} copy={null} still simple={size === 'sm'} />
        </span>
      ) : look ? (
        <span className={`${s.thumbAlone} ${look.kind === 'case' ? '' : s.thumbFill}`}>
          <img src={look.alone} alt="" loading="lazy" decoding="async" />
        </span>
      ) : mine && size === 'lg' ? (
        <MarketCase pic={mine} alt="" />
      ) : mine ? (
        <span className={`${s.thumbAlone} ${mine.kind === 'scene' ? s.thumbFill : mine.kind === 'plate' ? s.thumbPlate : ''}`}>
          <img src={mine.src} alt="" loading="lazy" decoding="async" />
        </span>
      ) : pic ? (
        <img src={pic} alt="" loading="lazy" decoding="async" width={size === 'lg' ? 640 : 320} height={size === 'lg' ? 640 : 320} />
      ) : it.t ? (
        <span className={s.thumbTier}>{it.i}</span>
      ) : (
        <Icon className={s.thumbIcon} focusable={false} />
      )}
    </span>
  )
}

/** "1,240" and a small "Intel", or the no-price words. */
export function Price({ n, big = false }: { n: number | null | undefined; big?: boolean }) {
  const { w, locale } = useMarketWords()
  if (n == null)
    return (
      <>
        <span className={s.noPrice}>{w.noPrice}</span>
        <span className={s.noPriceShort} aria-hidden title={w.noPrice}>—</span>
      </>
    )
  return (
    <span className={big ? s.priceBig : s.price}>
      {fmt(n, locale)}
      <small> {w.intel}</small>
    </span>
  )
}

/** A change: a caret, a sign and the percent; never colour alone. */
export function Change({ f, big = false }: { f: number | null | undefined; big?: boolean }) {
  const { locale } = useMarketWords()
  if (f == null) return <span className={`${s.change} ${s.flat}`}>—</span>
  const dir = f > 0.0005 ? 'up' : f < -0.0005 ? 'down' : 'flat'
  const Icon = dir === 'up' ? FaCaretUp : dir === 'down' ? FaCaretDown : null
  return (
    <span className={`${s.change} ${s[dir]} ${big ? s.changeBig : ''}`}>
      {Icon ? <Icon aria-hidden focusable={false} /> : null}
      {pctText(f, locale)}
    </span>
  )
}

/** Its shelf and rarity, in words (only the rarity on a shelf's own page, where the shelf goes without saying). */
export function ItemMeta({ it, shelf = true }: { it: MarketItem; shelf?: boolean }) {
  const { w } = useMarketWords()
  return (
    <span className={s.meta}>
      <span className={s.rarDot} style={{ ['--rar' as string]: (RARITY_COLOUR[it.r] ?? RARITY_COLOUR.common).dark, ['--rar-light' as string]: (RARITY_COLOUR[it.r] ?? RARITY_COLOUR.common).light }} aria-hidden />
      {shelf ? `${w.categories[categoryOf(it)]} · ` : ''}{w.rarity[it.r] ?? it.r}
    </span>
  )
}

/**
 * A ranked table of items (a mover list, a shelf, search results): rank, the item, its price, and the list's own number
 * (the change for rises / falls, trades for most traded, Intel for most valuable). Rows are links; the price and the
 * second number keep to the right; on a phone the second number sits under the price.
 */
export function ItemTable({ items, list = 'traded', win = '30d', start = 1, showRank = true, showShelf = true, lines = null }: { items: MarketItem[]; list?: MoverList; win?: Win; start?: number; showRank?: boolean; showShelf?: boolean; /** Search results: each item's description under its name, one line. */ lines?: MarketLines | null }) {
  const { w, locale } = useMarketWords()
  const i = winIndex(win)
  const third = `${list === 'rises' || list === 'falls' ? w.cols.change : list === 'valuable' ? w.cols.value : w.cols.trades} · ${w.windows[win]}`
  return (
    <div className={s.tableWrap}>
      <table className={s.table}>
        <thead>
          <tr>
            {showRank ? <th scope="col" className={s.colRank}>{w.cols.rank}</th> : null}
            <th scope="col">{w.cols.item}</th>
            <th scope="col" className={s.colNum}>{w.cols.price}</th>
            <th scope="col" className={s.colNum}>{third}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, n) => (
            <tr key={it.c}>
              {showRank ? <td className={s.colRank}>{start + n}</td> : null}
              <td>
                <Link to={itemPath(it.c)} className={s.rowLink}>
                  <ItemThumb it={it} />
                  <span className={s.rowName}>
                    <b>{it.nm}</b>
                    <ItemMeta it={it} shelf={showShelf} />
                    {lines && lineOf(lines, it) ? <span className={s.rowLine}>{lineOf(lines, it)}</span> : null}
                  </span>
                </Link>
              </td>
              <td className={s.colNum}>
                <Price n={it.p} />
                {it.demo ? <small className={s.sampleTag} title={w.demoNote}>{w.sampleTag}</small> : null}
              </td>
              <td className={s.colNum}>
                {list === 'rises' || list === 'falls' ? (
                  <Change f={itemChange(it, win)} />
                ) : list === 'valuable' ? (
                  it.x?.[i] != null ? <span className={s.num} title={fmt(it.x[i] as number, locale)}>{compact(it.x[i] as number, locale)}</span> : <span className={s.flat}>—</span>
                ) : (
                  <span className={s.num}>{fmt(it.v?.[i] ?? 0, locale)}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** The search box and what it finds as you type (nothing until two letters: never every item). */
export function MarketSearch({ items, q, onQ, limit, autoFocus = false, showShelf = true }: { items: MarketItem[]; q: string; onQ: (q: string) => void; limit: number; autoFocus?: boolean; showShelf?: boolean }) {
  const { w } = useMarketWords()
  const lines = useMarketLines()
  const found = useMemo(() => searchItems(items, q, limit + 1), [items, q, limit])
  const shown = found.slice(0, limit)
  const typed = q.trim().length >= 2
  return (
    <div className={s.searchBox} data-autofocus={autoFocus || undefined}>
      <SearchField value={q} onChange={onQ} label={w.search.label} hint={w.search.hint} clear={w.search.clear} />
      {/* One live region that is always there (a11y-1111): one that appears with its text is often not read out. */}
      <p className={a.srOnly} role="status">
        {typed ? (shown.length ? w.search.results(shown.length) : w.search.none) : ''}
      </p>
      {typed ? (
        shown.length ? (
          <>
            <p className={s.searchCount}>{w.search.results(shown.length)}</p>
            <ItemTable items={shown} showRank={false} list="traded" win="30d" showShelf={showShelf} lines={lines} />
            {found.length > limit ? <p className={s.searchCount}>{w.search.more(limit)}</p> : null}
          </>
        ) : (
          <p className={a.empty}>{w.search.none}</p>
        )
      ) : null}
    </div>
  )
}


/** The window chips: Today, 7, 30, 90, 180 days. */
export function WindowChips({ win, onWin, label }: { win: Win; onWin: (w: Win) => void; label: string }) {
  const { w } = useMarketWords()
  return (
    <div className={s.chips} role="group" aria-label={label}>
      {WINDOWS.map((x) => (
        <button key={x} type="button" className={a.chip} aria-pressed={x === win} onClick={() => onWin(x)}>
          {w.windows[x]}
        </button>
      ))}
    </div>
  )
}

