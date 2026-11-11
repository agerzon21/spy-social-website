import { useMemo } from 'react'
import Link from '../../components/SiteLink'
import { FaFingerprint, FaHashtag, FaLink } from 'react-icons/fa6'
import ActionLink from '../../components/ui/ActionLink'
import DisplayHeading from '../../components/ui/DisplayHeading'
import Eyebrow from '../../components/ui/Eyebrow'
import ui from '../../components/ui/ui.module.css'
import { artKey, artOf, attributesOf, lookOf, nameOf, uniquePath } from '../../lib/archive'
import { ArchiveState, BetaNotice, FloatDigits, Piece, UniqueCard } from './ArchiveBits'
import { fmt, useArchive, useUniques } from './useArchive'
import s from './archive.module.css'

const PILLAR_ICONS = [FaFingerprint, FaHashtag, FaLink]

/** The float page's example: a real Spy Cat's float, read digit by digit. */
const EXAMPLE_ITEM = 'accessory_spy_cat'

/** The odds an Enigma Intercept draws from (crate_tier_rarities, tier 5): out of 10,000. */
const ENIGMA = [
  { key: 'unique', weight: 50, colour: 'var(--foil)' },
  { key: 'legendary', weight: 1000, colour: '#e0ad2c' },
  { key: 'rest', weight: 8950, colour: 'var(--ss-line-strong)' },
]

const ArchiveHome = () => {
  const { w, data, art, looks, locale } = useArchive()
  const h = w.home
  const { list, state, retry } = useUniques()
  const copies = useMemo(() => list?.copies ?? [], [list])

  // The hero's fan: three of the newest drawn Uniques, each a different item where there are three.
  const fan = useMemo(() => {
    const out: typeof copies = []
    for (const c of copies) {
      if (out.length >= 3) break
      if (!art.has(`u-${c.item_code}-${c.serial}`)) continue
      if (out.some((o) => o.item_code === c.item_code)) continue
      out.push(c)
    }
    return out
  }, [copies, art])

  const stats = useMemo(() => {
    const items = new Set(copies.map((c) => c.item_code))
    return {
      minted: copies.length,
      items: Math.max(items.size, data ? Object.keys(data.items).length : 0),
      listed: copies.filter((c) => c.status === 'listed').length,
      sales: copies.reduce((n, c) => n + c.sales, 0),
    }
  }, [copies, data])

  const example = copies.find((c) => c.item_code === EXAMPLE_ITEM) ?? null
  const exampleFloat = example?.float ?? '0.4808210000000000'
  const exampleAttrs = attributesOf(data, EXAMPLE_ITEM, exampleFloat)
  const cats = copies.filter((c) => c.item_code === EXAMPLE_ITEM)
  const breed = data?.items[EXAMPLE_ITEM]?.attrs.find((a) => a.place === 1)
  const colour = data?.items[EXAMPLE_ITEM]?.attrs.find((a) => a.place === 2)

  return (
    <div className={`${s.page} ${s.foil}`}>
      <div className={ui.wrap}>
        <BetaNotice chain={list?.chain} />

        <section className={s.hero} aria-labelledby="archive-title">
          <div className={s.heroGrid}>
            <div>
              <Eyebrow>{h.eyebrow}</Eyebrow>
              <DisplayHeading as="h1" size={1} className={s.heroTitle}>
                <span id="archive-title">{h.title}</span>
                <span className={s.mark}>.</span>
              </DisplayHeading>
              <p className={s.lede}>{h.lede}</p>
              <div className={s.ctaRow}>
                <ActionLink to="/archive/uniques">{h.browse}</ActionLink>
                <ActionLink to="/ledger" tone="secondary">
                  {h.verify}
                </ActionLink>
              </div>
            </div>
            <div className={s.fan} aria-hidden="true">
              {(fan.length ? fan : [null, null, null]).map((c, i) => (
                <div key={c ? `${c.item_code}-${c.serial}` : i} className={s.fanCard}>
                  <Piece src={c ? artOf(art, c.item_code, c.serial)?.src ?? null : null} alt="" eager look={c && artOf(art, c.item_code, c.serial) ? lookOf(looks, c.item_code, c.serial) : null} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {state === 'soon' || state === 'busy' ? <ArchiveState kind={state} onRetry={retry} /> : null}

        <dl className={s.stats}>
          {(
            [
              [stats.minted, h.stats.minted],
              [stats.items, h.stats.items],
              [stats.listed, h.stats.listed],
              [stats.sales, h.stats.sales],
            ] as const
          ).map(([n, label]) => (
            <div key={label} className={s.stat}>
              <dt className={s.statLabel}>{label}</dt>
              <dd className={s.statValue}>{state === 'ok' ? fmt(n, locale) : '—'}</dd>
            </div>
          ))}
        </dl>

        <section className={s.section} aria-labelledby="archive-pillars">
          <DisplayHeading id="archive-pillars">{h.pillars.title}</DisplayHeading>
          <ul className={s.pillars}>
            {h.pillars.list.map((p, i) => {
              const Icon = PILLAR_ICONS[i]
              return (
                <li key={p.title} className={s.pillar}>
                  <span className={s.pillarNo}>0{i + 1}</span>
                  <Icon className={s.pillarIcon} aria-hidden focusable={false} />
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              )
            })}
          </ul>
        </section>

        <section className={s.section} aria-labelledby="archive-float">
          <div className={s.sectionHead}>
            <Eyebrow>{h.float.eyebrow}</Eyebrow>
            <DisplayHeading id="archive-float">{h.float.title}</DisplayHeading>
            <p className={s.sectionLede}>{h.float.lede}</p>
          </div>

          <div className={s.floatBox}>
            <div className={s.floatLabel}>
              {h.float.example}: {nameOf(data, EXAMPLE_ITEM)} {example ? `#${String(example.serial).padStart(5, '0')}` : ''}
            </div>
            <FloatDigits float={exampleFloat} />
            <div className={s.floatSub}>
              {exampleAttrs.map((a) => `${a.label}: ${a.value}`).join('  ·  ')}
            </div>
          </div>

          <ul className={s.digitGrid}>
            {h.float.digits.map((d) => (
              <li key={d.n} className={s.digitCard}>
                <div className={s.digitN}>{d.n}</div>
                <div className={s.digitWhat}>{d.what}</div>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
          <p className={s.scaleNote}>{h.float.pattern}</p>

          <div className={s.ten}>
            <h3 className={s.tenTitle}>{h.float.variantsTitle}</h3>
            <div className={s.tenRow}>
              {Array.from({ length: 10 }, (_, d) => (
                <figure key={d} className={s.tenCell} style={{ margin: 0 }}>
                  <img src={artKey(`x-cat-d1-${d}`, true)} alt={breed?.values[d]?.name ?? ''} width={320} height={320} loading="lazy" decoding="async" />
                  <figcaption className={s.tenDigit}>
                    <b>{d}</b>
                    <span>{breed?.values[d]?.name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className={s.ten}>
            <h3 className={s.tenTitle}>{h.float.coloursTitle}</h3>
            <div className={s.tenRow}>
              {Array.from({ length: 10 }, (_, d) => (
                <figure key={d} className={s.tenCell} style={{ margin: 0 }}>
                  <img src={artKey(`x-cat-d2-${d}`, true)} alt={colour?.values[d]?.name ?? ''} width={320} height={320} loading="lazy" decoding="async" />
                  <figcaption className={s.tenDigit}>
                    <b>{d}</b>
                    {colour?.values[d]?.hex ? <span className="sw" style={{ width: 14, height: 14, background: colour.values[d].hex ?? undefined, border: '1px solid rgba(255,255,255,.4)' }} aria-hidden /> : null}
                    <span>{colour?.values[d]?.name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {cats.length ? (
            <div className={s.scale}>
              <h3 className={s.tenTitle}>{h.float.scaleTitle}</h3>
              <div className={s.scaleBar}>
                {Array.from({ length: 10 }, (_, d) => (
                  <div key={d} className={s.band} title={breed?.values[d]?.name}>
                    <span className={s.bandName}>{breed?.values[d]?.name}</span>
                    <span className={s.bandDigit} aria-hidden>{d}</span>
                  </div>
                ))}
                {cats.map((c) => (
                  <Link
                    key={c.serial}
                    to={uniquePath(c.item_code, c.serial)}
                    className={s.pin}
                    // Kept inside the bar at its two ends (a pin is 30 px wide, centred on its float).
                    style={{ left: `clamp(15px, ${Math.min(100, Number(c.float) * 100)}%, calc(100% - 15px))` }}
                    title={`${nameOf(data, c.item_code)} #${String(c.serial).padStart(5, '0')} · ${c.float.slice(0, 8)}`}
                  >
                    <img src={lookOf(looks, c.item_code, c.serial)?.alone ?? artOf(art, c.item_code, c.serial, true)?.src} alt={`#${c.serial}`} width={30} height={30} loading="lazy" />
                  </Link>
                ))}
                {[0, 0.5, 1].map((t) => (
                  <span key={t} className={s.tick} style={{ left: `${t * 100}%` }}>
                    {t.toFixed(1)}
                  </span>
                ))}
              </div>
              <p className={s.scaleNote}>{h.float.scaleNote}</p>
            </div>
          ) : null}
        </section>

        <section className={s.section} aria-labelledby="archive-sources">
          <div className={s.sectionHead}>
            <Eyebrow>{h.sources.eyebrow}</Eyebrow>
            <DisplayHeading id="archive-sources">{h.sources.title}</DisplayHeading>
          </div>
          <div className={s.sources}>
            <div className={s.source}>
              <h3>{h.sources.intercept.title}</h3>
              <p>{h.sources.intercept.text}</p>
              <div className={s.odds} role="img" aria-label={`${data?.words.tiers[4] ?? 'Enigma'}: ${data?.words.unique ?? 'Unique'} 0.5%, ${data?.words.legendary ?? 'Legendary'} 10%`}>
                {ENIGMA.map((o) => (
                  <i key={o.key} style={{ width: `${Math.max(o.weight / 100, o.key === 'unique' ? 2 : 0)}%`, background: o.colour }} />
                ))}
              </div>
              <div className={s.oddsKey}>
                <span><i style={{ background: 'var(--foil)' }} />{data?.words.unique ?? 'Unique'} 0.5%</span>
                <span><i style={{ background: '#e0ad2c' }} />{data?.words.legendary ?? 'Legendary'} 10%</span>
                <span>{data?.words.tiers[4] ?? 'Enigma'}</span>
              </div>
            </div>
            <div className={s.source}>
              <h3>{h.sources.tradeUp.title}</h3>
              <p>{h.sources.tradeUp.text}</p>
              <div className={s.tradeUp} aria-hidden="true">
                <div className={s.tradeGrid}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <i key={i} />
                  ))}
                </div>
                <span className={s.tradeArrow}>→</span>
                <span className={s.tradeOne}>
                  <i />
                </span>
              </div>
            </div>
            <div className={s.source}>
              <h3>{h.sources.market.title}</h3>
              <p>{h.sources.market.text}</p>
            </div>
          </div>
          <h3 className={s.tenTitle} style={{ marginTop: 34 }}>{h.how.title}</h3>
          <ol className={s.steps}>
            {h.how.steps.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        </section>

        {copies.length ? (
          <section className={s.section} aria-labelledby="archive-recent">
            <div className={s.headRow}>
              <DisplayHeading id="archive-recent">{h.recent}</DisplayHeading>
              <Link to="/archive/uniques" className={s.seeAll}>
                {h.seeAll} ({fmt(copies.length, locale)})
              </Link>
            </div>
            <ul className={s.grid}>
              {copies.slice(0, 8).map((c) => (
                <UniqueCard key={`${c.item_code}-${c.serial}`} c={c} sets={list?.sets ?? []} />
              ))}
            </ul>
          </section>
        ) : null}

        <section className={s.trust} aria-labelledby="archive-trust">
          <div>
            <DisplayHeading as="h2" size={3} id="archive-trust">
              {h.trust.title}
            </DisplayHeading>
            <p>{h.trust.text}</p>
          </div>
          <div className={s.trustLinks}>
            <ActionLink to="/ledger" tone="secondary">
              {w.nav.ledger}
            </ActionLink>
            <ActionLink to="/transparency" tone="secondary">
              {w.nav.transparency}
            </ActionLink>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ArchiveHome
