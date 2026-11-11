import { useMemo, useState } from 'react'
import Link from '../../components/SiteLink'
import { FaArrowRight } from 'react-icons/fa6'
import ActionLink from '../../components/ui/ActionLink'
import DisplayHeading from '../../components/ui/DisplayHeading'
import Eyebrow from '../../components/ui/Eyebrow'
import { CATEGORIES, categoryOf, featuredOf, itemChange, itemPath, movers, MOVER_LISTS, winIndex, type MarketItem, type MoverList, type Win } from '../../lib/market'
import { Change, ItemMeta, ItemThumb, MarketPage, MarketSearch, MarketState, Price, WindowChips } from './MarketBits'
import { compact, fmt, useMarketList, useMarketWords } from './useMarket'
import { CATEGORY_ICON, LIST_ICON } from './icons'
import a from '../archive/archive.module.css'
import s from './market.module.css'

/** One mover in a board: rank, picture, name, price, and the list's own number. */
function MoverRow({ it, n, list, win }: { it: MarketItem; n: number; list: MoverList; win: Win }) {
  const { w, locale } = useMarketWords()
  const i = winIndex(win)
  return (
    <li>
      <Link to={itemPath(it.c)} className={s.moverRow}>
        <span className={s.moverRank}>{n}</span>
        <ItemThumb it={it} />
        <span className={s.rowName}>
          <b>{it.nm}</b>
          <span className={s.moverPrice}>
            <Price n={it.p} />
          </span>
        </span>
        <span className={s.moverMetric}>
          {list === 'rises' || list === 'falls' ? (
            <Change f={itemChange(it, win)} />
          ) : list === 'valuable' ? (
            <span className={s.num} title={`${fmt(it.x?.[i] ?? 0, locale)} ${w.intel}`}>{compact(it.x?.[i] ?? 0, locale)}</span>
          ) : (
            <span className={s.num}>{fmt(it.v?.[i] ?? 0, locale)}</span>
          )}
        </span>
      </Link>
    </li>
  )
}

/** A board: one list's top few, and its Top 100. */
function MoverBoard({ items, list, win, n }: { items: MarketItem[]; list: MoverList; win: Win; n: number }) {
  const { w } = useMarketWords()
  const top = useMemo(() => movers(items, list, win, n), [items, list, win, n])
  const Icon = LIST_ICON[list]
  return (
    <section className={`${s.board} ${s[`board_${list}`]}`} aria-labelledby={`board-${list}`}>
      <header className={s.boardHead}>
        <Icon className={s.boardIcon} aria-hidden focusable={false} />
        <div>
          <h3 id={`board-${list}`} className={s.boardTitle}>{w.lists[list].title}</h3>
          <p className={s.boardText}>{w.lists[list].text}</p>
        </div>
      </header>
      {top.length ? (
        <ol className={s.moverList}>
          {top.map((it, k) => (
            <MoverRow key={it.c} it={it} n={k + 1} list={list} win={win} />
          ))}
        </ol>
      ) : (
        <p className={s.boardEmpty}>{w.movers.none}</p>
      )}
      <Link to={`/market/movers/${list}?w=${win}`} className={s.boardMore}>
        {w.home.top100} <FaArrowRight aria-hidden focusable={false} />
      </Link>
    </section>
  )
}

const MarketHome = () => {
  const { w, locale } = useMarketWords()
  const h = w.home
  const { list, state, retry } = useMarketList()
  const items = useMemo(() => list?.items ?? [], [list])
  const [q, setQ] = useState('')
  const [win, setWin] = useState<Win>('7d')
  const featured = featuredOf(list)
  const priced = items.filter((it) => it.p != null).length
  const shelves = useMemo(() => {
    const m = new Map<string, { n: number; priced: number }>()
    for (const it of items) {
      const c = categoryOf(it)
      const e = m.get(c) ?? { n: 0, priced: 0 }
      e.n++
      if (it.p != null) e.priced++
      m.set(c, e)
    }
    return m
  }, [items])
  const ok = state === 'ok' && list

  return (
    <MarketPage head={list}>
      <section className={`${a.hero} ${s.hero}`} aria-labelledby="market-title">
        <div className={s.heroGrid}>
          <div>
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <DisplayHeading as="h1" size={1} className={a.heroTitle}>
              <span id="market-title">{h.title}</span>
              <span className={a.mark}>.</span>
            </DisplayHeading>
            <p className={a.lede}>{h.lede}</p>
            {ok ? (
              <div className={s.heroSearch}>
                <MarketSearch items={items} q={q} onQ={setQ} limit={20} />
              </div>
            ) : null}
          </div>
          {ok && featured ? (
            <Link to={itemPath(featured.c)} className={s.featured} aria-label={`${h.featured}: ${featured.nm}`}>
              <span className={s.featuredKicker}>{h.featured}</span>
              <span className={s.featuredStage}>
                <ItemThumb it={featured} size="lg" />
              </span>
              <span className={s.featuredName}>{featured.nm}</span>
              <ItemMeta it={featured} />
              <span className={s.featuredRow}>
                <Price n={featured.p} big />
                <Change f={itemChange(featured, '30d')} />
              </span>
              <span className={s.featuredNote}>{h.featuredText}</span>
            </Link>
          ) : null}
        </div>
      </section>

      {state === 'soon' || state === 'busy' ? <MarketState kind={state} onRetry={retry} /> : null}

      {ok ? (
        <>
          <dl className={a.stats}>
            {(
              [
                [priced, h.stats.priced],
                [list.totals.trades_1d, h.stats.trades1d],
                [list.totals.trades_30d, h.stats.trades30d],
                [list.totals.intel_30d, h.stats.intel30d],
              ] as const
            ).map(([n, label]) => (
              <div key={label} className={a.stat}>
                <dt className={a.statLabel}>{label}</dt>
                <dd className={a.statValue} title={n != null ? fmt(n, locale) : undefined}>{n == null ? '—' : n >= 100_000 ? compact(n, locale) : fmt(n, locale)}</dd>
              </div>
            ))}
          </dl>

          <section className={a.section} aria-labelledby="market-movers">
            <div className={s.sectionHeadRow}>
              <div className={a.sectionHead}>
                <DisplayHeading id="market-movers">{h.movers}</DisplayHeading>
                <p className={a.sectionLede}>{h.moversLede}</p>
              </div>
              <WindowChips win={win} onWin={setWin} label={w.movers.window} />
            </div>
            {/* Four boards, five each (layout A, the owner's pick Nov 10). */}
            <div className={s.boards}>
              {MOVER_LISTS.map((l) => (
                <MoverBoard key={l} items={items} list={l} win={win} n={5} />
              ))}
            </div>
          </section>

          <section className={a.section} aria-labelledby="market-catalogue">
            <div className={a.headRow}>
              <div className={a.sectionHead}>
                <DisplayHeading id="market-catalogue">{h.catalogue}</DisplayHeading>
                <p className={a.sectionLede}>{h.catalogueLede}</p>
              </div>
            </div>
            <ul className={s.shelves}>
              {CATEGORIES.filter((c) => shelves.has(c)).map((c) => {
                const Icon = CATEGORY_ICON[c]
                const e = shelves.get(c)!
                return (
                  <li key={c}>
                    <Link to={`/market/catalogue/${c}`} className={s.shelf}>
                      <Icon className={s.shelfIcon} aria-hidden focusable={false} />
                      <span className={s.shelfName}>{w.categories[c]}</span>
                      <span className={s.shelfCount}>{h.items(e.n)}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        </>
      ) : null}

      <section className={a.section} aria-labelledby="market-how">
        <DisplayHeading id="market-how">{h.how.title}</DisplayHeading>
        <ul className={a.pillars}>
          {h.how.list.map((p, i) => (
            <li key={p.title} className={a.pillar}>
              <span className={a.pillarNo}>0{i + 1}</span>
              <h3 style={{ marginTop: 14 }}>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={a.trust} aria-labelledby="market-trust">
        <div>
          <DisplayHeading as="h2" size={3} id="market-trust">
            {h.trust.title}
          </DisplayHeading>
          <p>{h.trust.text}</p>
        </div>
        <div className={a.trustLinks}>
          <ActionLink to="/archive" tone="secondary">
            {h.trust.archive}
          </ActionLink>
          <ActionLink to="/ledger" tone="secondary">
            {h.trust.ledger}
          </ActionLink>
        </div>
      </section>
    </MarketPage>
  )
}

export default MarketHome
