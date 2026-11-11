import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import type { MarketDay } from '../../lib/market'
import { compact, dayText, fmt, useMarketWords } from './useMarket'
import s from './market.module.css'

/** The plot's width in px, following its box (the charts draw in real pixels, so lines stay 2px at any width). */
function useWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((e) => setWidth(Math.round(e[0].contentRect.width)))
    ro.observe(el)
    setWidth(Math.round(el.getBoundingClientRect().width))
    return () => ro.disconnect()
  }, [])
  return { ref, width }
}

/** Three or four round values for an axis from lo to hi. */
function ticks(lo: number, hi: number): number[] {
  if (hi <= lo) return [lo]
  const raw = (hi - lo) / 3
  const mag = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((x) => x >= raw) ?? raw
  const first = Math.ceil(lo / step) * step
  const out: number[] = []
  for (let v = first; v <= hi + 1e-9; v += step) out.push(Math.round(v * 100) / 100)
  return out
}

const PAD = { top: 14, right: 52, bottom: 26, left: 4 }

/**
 * The price graph and the trades-per-day bars of one item, one hover between them: the price line (the 7-day rule),
 * the day's average as dots on days with enough trades, and a bar per day. Two charts, one x axis, never two y axes.
 */
export function ItemCharts({ days }: { days: MarketDay[] }) {
  const { w, locale } = useMarketWords()
  const { ref, width } = useWidth()
  const [hover, setHover] = useState<number | null>(null)
  const [showTable, setShowTable] = useState(false)
  const n = days.length
  const plotW = Math.max(0, width - PAD.left - PAD.right)
  const step = n > 1 ? plotW / (n - 1) : plotW
  const x = (i: number) => PAD.left + (n > 1 ? i * step : plotW / 2)

  const price = useMemo(() => {
    const vals = days.flatMap((d) => [d.p, d.a]).filter((v): v is number => v != null)
    if (!vals.length) return null
    let lo = Math.min(...vals)
    let hi = Math.max(...vals)
    const pad = Math.max((hi - lo) * 0.12, hi * 0.02, 1)
    lo = Math.max(0, lo - pad)
    hi = hi + pad
    return { lo, hi, ticks: ticks(lo, hi) }
  }, [days])
  const H1 = 220
  const y1 = (v: number) => (price ? PAD.top + (1 - (v - price.lo) / (price.hi - price.lo)) * (H1 - PAD.top - PAD.bottom) : 0)
  const path = useMemo(() => {
    let d = ''
    let pen = false
    days.forEach((day, i) => {
      if (day.p == null) {
        pen = false
        return
      }
      d += `${pen ? 'L' : 'M'}${x(i).toFixed(1)},${y1(day.p).toFixed(1)}`
      pen = true
    })
    return d
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, width, price])

  const maxN = Math.max(1, ...days.map((d) => d.n))
  const H2 = 120
  const vTicks = ticks(0, maxN).filter((t) => Number.isInteger(t))
  const y2 = (v: number) => PAD.top + (1 - v / maxN) * (H2 - PAD.top - PAD.bottom)
  const barW = Math.max(1, Math.min(14, step - 2))

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const i = Math.round((e.clientX - r.left - PAD.left) / (step || 1))
    setHover(Math.max(0, Math.min(n - 1, i)))
  }
  const hd = hover != null ? days[hover] : null
  // Date labels: first, middle, last.
  const xLabels = n ? [0, Math.floor((n - 1) / 2), n - 1].filter((v, i, arr) => arr.indexOf(v) === i) : []
  const tipLeft = hover != null ? Math.min(Math.max(x(hover), 70), Math.max(70, width - 70)) : 0

  const empty = !n || !days.some((d) => d.n > 0)

  return (
    <div className={s.charts} ref={ref}>
      {empty ? (
        <p className={s.chartEmpty}>{w.item.noChart}</p>
      ) : width > 0 ? (
        <>
          <div className={s.chartBox}>
            <svg width={width} height={H1} role="img" aria-label={`${w.item.chart}: ${days[0].d} – ${days[n - 1].d}`} onPointerMove={onMove} onPointerLeave={() => setHover(null)} className={s.svg}>
              {price?.ticks.map((t) => (
                <g key={t}>
                  <line x1={PAD.left} x2={PAD.left + plotW} y1={y1(t)} y2={y1(t)} className={s.grid} />
                  <text x={PAD.left + plotW + 8} y={y1(t)} dy="0.35em" className={s.axis}>{compact(t, locale)}</text>
                </g>
              ))}
              {xLabels.map((i) => (
                <text key={i} x={x(i)} y={H1 - 6} textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'} className={s.axis}>{dayText(days[i].d, locale)}</text>
              ))}
              <path d={path} className={s.line} />
              {days.map((d, i) => (d.a != null ? <circle key={d.d} cx={x(i)} cy={y1(d.a)} r={n > 45 ? 2.5 : 4} className={n > 45 ? s.dotDense : s.dot} /> : null))}
              {hover != null ? (
                <>
                  <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={H1 - PAD.bottom} className={s.cross} />
                  {hd?.p != null ? <circle cx={x(hover)} cy={y1(hd.p)} r={5} className={s.hoverDot} /> : null}
                </>
              ) : null}
            </svg>
            {hd ? (
              <div className={s.tip} style={{ left: tipLeft }} role="status">
                <b>{dayText(hd.d, locale, true)}</b>
                <span>{w.item.chartLine}: {hd.p != null ? `${fmt(hd.p, locale)} ${w.intel}` : '—'}</span>
                {hd.a != null ? <span>{w.item.chartAvg}: {fmt(hd.a, locale)}</span> : null}
                <span>{w.cols.trades}: {fmt(hd.n, locale)}</span>
              </div>
            ) : null}
          </div>
          <div className={s.legend} aria-hidden>
            <span><i className={s.legendLine} />{w.item.chartLine}</span>
            <span><i className={s.legendDot} />{w.item.chartAvg}</span>
          </div>

          <h3 className={s.chartTitle}>{w.item.volume}</h3>
          <div className={s.chartBox}>
            <svg width={width} height={H2} role="img" aria-label={w.item.volume} onPointerMove={onMove} onPointerLeave={() => setHover(null)} className={s.svg}>
              {vTicks.map((t) => (
                <g key={t}>
                  <line x1={PAD.left} x2={PAD.left + plotW} y1={y2(t)} y2={y2(t)} className={s.grid} />
                  <text x={PAD.left + plotW + 8} y={y2(t)} dy="0.35em" className={s.axis}>{compact(t, locale)}</text>
                </g>
              ))}
              {days.map((d, i) => {
                if (!d.n) return null
                const top = y2(d.n)
                const h = Math.max(1, y2(0) - top)
                const r = Math.min(barW / 2, 4, h)
                const left = x(i) - barW / 2
                // A bar with rounded top corners, anchored square on the baseline.
                const p = `M${left},${y2(0)}V${top + r}Q${left},${top} ${left + r},${top}H${left + barW - r}Q${left + barW},${top} ${left + barW},${top + r}V${y2(0)}Z`
                return <path key={d.d} d={p} className={hover === i ? s.barOn : s.bar} />
              })}
              <line x1={PAD.left} x2={PAD.left + plotW} y1={y2(0)} y2={y2(0)} className={s.baseline} />
              {xLabels.map((i) => (
                <text key={i} x={x(i)} y={H2 - 6} textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'} className={s.axis}>{dayText(days[i].d, locale)}</text>
              ))}
              {hover != null ? <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={H2 - PAD.bottom} className={s.cross} /> : null}
            </svg>
          </div>
        </>
      ) : (
        <div style={{ height: 380 }} />
      )}
      {empty ? null : <button type="button" className={s.tableToggle} aria-expanded={showTable} onClick={() => setShowTable((v) => !v)}>
        {showTable ? w.item.tableHide : w.item.table}
      </button>}
      {showTable && !empty ? (
        <div className={s.dayTableWrap}>
          <table className={s.dayTable}>
            <thead>
              <tr>
                <th scope="col">{w.item.day}</th>
                <th scope="col">{w.cols.trades}</th>
                <th scope="col">{w.item.chartAvg}</th>
                <th scope="col">{w.item.chartLine}</th>
              </tr>
            </thead>
            <tbody>
              {[...days].reverse().map((d) => (
                <tr key={d.d}>
                  <td>{dayText(d.d, locale, true)}</td>
                  <td>{fmt(d.n, locale)}</td>
                  <td>{d.a != null ? fmt(d.a, locale) : '—'}</td>
                  <td>{d.p != null ? fmt(d.p, locale) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}
