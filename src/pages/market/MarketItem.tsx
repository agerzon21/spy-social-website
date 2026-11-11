import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { FaFlask } from 'react-icons/fa6'
import Link from '../../components/SiteLink'
import { categoryOf, changeOf, type MarketItem as Item } from '../../lib/market'
import { Change, ItemMeta, ItemThumb, MarketPage, MarketState, Price } from './MarketBits'
import { ItemCharts } from './MarketCharts'
import { compact, fmt, useMarketItem, useMarketWords } from './useMarket'
import a from '../archive/archive.module.css'
import s from './market.module.css'

const RANGES = ['30', '90', '180'] as const

/** One item: its price, its changes (today, 1, 3, 6 months), the graph with a 1 / 3 / 6-month switch and its trades. */
const MarketItem = () => {
  const { w, locale } = useMarketWords()
  const { code = '' } = useParams()
  const { page, state, retry } = useMarketItem(code)
  const [range, setRange] = useState<(typeof RANGES)[number]>('90')
  const it: Item | null = page?.item ?? null
  const days = useMemo(() => (page ? page.days.slice(-Number(range)) : []), [page, range])

  return (
    <MarketPage head={page}>
      {it ? (
        <Helmet>
          <title>{`${it.nm} · ${w.name} · SpySocial`}</title>
        </Helmet>
      ) : null}
      <ol className={a.crumbs}>
        <li><Link to="/market">{w.nav.market}</Link></li>
        {it ? <li><Link to={`/market/catalogue/${categoryOf(it)}`}>{w.categories[categoryOf(it)]}</Link></li> : null}
        {it ? <li>{it.nm}</li> : null}
      </ol>
      {state === 'loading' ? <div className={a.loading} aria-busy="true" /> : null}
      {state === 'soon' || state === 'busy' ? <MarketState kind={state} onRetry={retry} /> : null}
      {state === 'ok' && !it ? (
        <div className={a.empty}>
          <p style={{ margin: 0 }}>{w.item.notFound}</p>
          <Link to="/market/catalogue" className={`${a.linkBtn} ${s.notFoundLink}`}>{w.item.notFoundLink}</Link>
        </div>
      ) : null}
      {it ? (
        <>
          {it.demo ? (
            <p className={`${a.notice} ${s.sample}`} role="note">
              <FaFlask aria-hidden focusable={false} />
              <span>{w.demoNote}</span>
            </p>
          ) : null}
          <header className={s.itemHead}>
            <div className={s.itemStage}>
              <ItemThumb it={it} size="lg" />
            </div>
            <div className={s.itemInfo}>
              <ItemMeta it={it} />
              <h1 className={s.itemTitle}>{it.nm}</h1>
              <div className={s.priceBox}>
                <span className={s.priceLabel}>{w.item.price}</span>
                <Price n={it.p} big />
                {it.p != null ? <span className={s.priceNote}>{w.item.priceNote}</span> : <p className={s.priceNote}>{w.noPriceLong(page?.min_trades ?? 5)}</p>}
              </div>
              <dl className={s.facts}>
                {it.g != null ? (
                  <div>
                    <dt>{w.item.guide}</dt>
                    <dd>{fmt(it.g, locale)} <small className={s.factUnit}>{w.intel}</small></dd>
                  </div>
                ) : null}
                {it.s != null ? (
                  <div>
                    <dt>{w.item.floor}</dt>
                    <dd>{fmt(it.s, locale)} <small className={s.factUnit}>{w.intel}</small></dd>
                  </div>
                ) : null}
              </dl>
              <p className={s.tradeIt}>{w.item.tradeIt}</p>
            </div>
          </header>

          {it.p != null ? (
            <dl className={s.changes}>
              {(
                [
                  [w.item.changes.today, it.b?.[0]],
                  [w.item.changes.m1, it.b?.[2]],
                  [w.item.changes.m3, it.b?.[3]],
                  [w.item.changes.m6, it.b?.[4]],
                ] as const
              ).map(([label, before]) => {
                const f = changeOf(it.p, before)
                return (
                  <div key={label} className={s.changeCell}>
                    <dt>{label}</dt>
                    <dd>
                      <Change f={f} big />
                      {before != null && it.p != null ? (
                        <span className={s.changeAbs}>
                          {it.p - before > 0 ? '+' : it.p - before < 0 ? '−' : ''}
                          {fmt(Math.abs(it.p - before), locale)}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                )
              })}
            </dl>
          ) : null}

          {page && page.days.length ? (
            <section className={s.chartSection} aria-labelledby="item-chart">
              <div className={s.chartHead}>
                <h2 id="item-chart" className={s.chartTitleBig}>{w.item.chart}</h2>
                <div className={s.chips} role="group" aria-label={w.item.chart}>
                  {RANGES.map((r) => (
                    <button key={r} type="button" className={a.chip} aria-pressed={range === r} onClick={() => setRange(r)}>
                      {w.item.chartRanges[r]}
                    </button>
                  ))}
                </div>
              </div>
              <ItemCharts days={days} />
            </section>
          ) : null}

          {it.v ? (
            <dl className={`${a.summary} ${s.itemStats}`}>
              {(
                [
                  [it.v[1], w.item.stats.trades7],
                  [it.v[2], w.item.stats.trades30],
                  [it.x?.[2] ?? null, w.item.stats.value30],
                  [it.v[4], w.item.stats.trades180],
                ] as const
              ).map(([n, label]) => (
                <div key={label}>
                  <b title={n != null ? fmt(n, locale) : undefined}>{n == null ? '—' : n >= 100_000 ? compact(n, locale) : fmt(n, locale)}</b>
                  <span>{label}</span>
                </div>
              ))}
            </dl>
          ) : null}
        </>
      ) : null}
    </MarketPage>
  )
}

export default MarketItem
