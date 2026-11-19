import { Fragment, useMemo } from 'react'
import Link from '../../components/SiteLink'
import { FaFingerprint, FaHashtag, FaLink } from 'react-icons/fa6'
import ActionLink from '../../components/ui/ActionLink'
import DisplayHeading from '../../components/ui/DisplayHeading'
import Eyebrow from '../../components/ui/Eyebrow'
import ui from '../../components/ui/ui.module.css'
import { artKey, artOf, attributesOf, codenameOf, copyNameOf, lookOf, nameOf, ownArtOf, serialText, uniquePath } from '../../lib/archive'
import { launchDayShort, launchDayWeekday } from '../../lib/launchDay'
import { LIVE } from '../../lib/legalRelease'
import { TRADE_UP_TEXT_UNIQUES } from '../../lib/ledgerScope'
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

/** A fan card's width (archive.module.css .fan --card): what its picture's srcset picks by (crawl2-1114). */
const FAN_SIZES = '(min-width: 900px) 240px, (min-width: 560px) 200px, min(168px, 38vw)'

/** The empty Archive's fan (pick 10A, archive-empty-1115): three real Legendaries, dimmed, before the first Unique is minted. */
const FIRST_MINT_FAN = ['celebration_heist', 'accessory_spy_cat', 'celebration_paper_plane']

/**
 * The empty Archive, seen locally: `?empty` on the dev server (archive.localhost:5173/?empty) shows it over today's data (the ledger read's list
 * emptied). Production builds drop it (import.meta.env.DEV is false there), so the live page only shows it with no Uniques.
 */
const PREVIEW_EMPTY = import.meta.env.DEV && typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('empty')

/** "{day}" and "{n}" in a line, filled; the day in bold (pick 10A's caption). */
function fillCaption(text: string, day: string, n: string) {
  return text.split(/(\{day\}|\{n\})/).map((part, i) =>
    part === '{day}' ? <b key={i}>{day}</b> : part === '{n}' ? <Fragment key={i}>{n}</Fragment> : <Fragment key={i}>{part}</Fragment>,
  )
}

const ArchiveHome = () => {
  const { w, data, art, looks, locale, lang } = useArchive()
  const h = w.home
  const { list, state: readState, retry } = useUniques()
  const state = PREVIEW_EMPTY ? 'ok' : readState
  const copies = useMemo(() => (PREVIEW_EMPTY ? [] : list?.copies ?? []), [list])
  // No Unique minted yet (after the Dec 7 reset, until the first mint at launch): the fan shows three Legendaries under
  // a "First mint" stamp and the stats say what launch brings, instead of placeholders that never fill and four zeros.
  const empty = state === 'ok' && copies.length === 0

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

  // The Legendaries a first Unique can be (15 at launch), before the app's tables load: never "one of the 0".
  const legendaries = stats.items || 15

  const example = copies.find((c) => c.item_code === EXAMPLE_ITEM) ?? null
  const exampleFloat = example?.float ?? '0.4808210000000000'
  const exampleCode = example ? codenameOf(data, EXAMPLE_ITEM, example.serial) : null
  const exampleAttrs = attributesOf(data, EXAMPLE_ITEM, exampleFloat)
  const cats = copies.filter((c) => c.item_code === EXAMPLE_ITEM)
  const breed = data?.items[EXAMPLE_ITEM]?.attrs.find((a) => a.place === 1)
  const colour = data?.items[EXAMPLE_ITEM]?.attrs.find((a) => a.place === 2)

  return (
    <div className={`${s.page} ${s.foil}`}>
      <div className={ui.wrap}>
        <BetaNotice chain={PREVIEW_EMPTY ? 'launch' : list?.chain} />

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
            {empty ? (
              <figure className={s.mintFigure}>
                <div className={`${s.fan} ${s.mintFan}`} aria-hidden="true">
                  {FIRST_MINT_FAN.map((code) => (
                    <div key={code} className={s.fanCard}>
                      <Piece src={artKey(`l-${code}`)} alt="" unique={false} eager still sizes={FAN_SIZES} />
                    </div>
                  ))}
                  <div className={s.mintStamp}>
                    <span className={s.mintStampTop}>{h.empty.stampTop}</span>
                    <span className={s.mintStampDay} suppressHydrationWarning>{launchDayShort(locale)}</span>
                  </div>
                </div>
                <figcaption className={s.mintCaption} suppressHydrationWarning>
                  {fillCaption(h.empty.caption, launchDayWeekday(locale), fmt(legendaries, locale))}
                </figcaption>
              </figure>
            ) : (
            <div className={s.fan} aria-hidden="true">
              {(fan.length ? fan : [null, null, null]).map((c, i) => (
                <div key={c ? `${c.item_code}-${c.serial}` : i} className={s.fanCard}>
                  <Piece src={c ? artOf(art, c.item_code, c.serial)?.src ?? null : null} alt="" eager still sizes={FAN_SIZES} look={c && artOf(art, c.item_code, c.serial) ? lookOf(looks, c.item_code, c.serial, false, { float: c.float, pattern: c.pattern, serial: c.serial }) : null} />
                </div>
              ))}
            </div>
            )}
          </div>
        </section>

        {state === 'soon' || state === 'busy' ? <ArchiveState kind={state} onRetry={retry} /> : null}

        <dl className={s.stats}>
          {(empty
            ? [
                [launchDayShort(locale), h.empty.statDay],
                [fmt(legendaries, locale), h.stats.items],
                [`#${fmt(1, locale)}`, h.empty.statSerial],
                [(0.005).toLocaleString(locale, { style: 'percent', maximumFractionDigits: 1 }), h.empty.statOdds],
              ]
            : (
                [
                  [stats.minted, h.stats.minted],
                  [stats.items, h.stats.items],
                  [stats.listed, h.stats.listed],
                  [stats.sales, h.stats.sales],
                ] as const
              ).map(([n, label]) => [state === 'ok' ? fmt(n, locale) : '—', label])
          ).map(([value, label], i) => (
            <div key={label} className={s.stat}>
              <dt className={s.statLabel}>{label}</dt>
              <dd className={`${s.statValue} ${empty && i === 0 ? s.statDay : ''}`}>{value}</dd>
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
              {/* The copy's codename first, its Legendary and number after it (codename-1118, as the app's uniqueFullName),
                  the two kept whole so a phone wraps between them, not inside "Spy Cat #00022". */}
              {h.float.example}: {exampleCode ? <>{exampleCode} · </> : null}
              <span className={s.floatBase}>{nameOf(data, EXAMPLE_ITEM)}{example ? ` ${serialText(example.serial)}` : ''}</span>
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
            <h3 className={s.tenTitle} id="ten-variants">{h.float.variantsTitle}</h3>
            {/* Each picture's alt is empty: its caption names it (said once, not twice). Scrolls sideways on a phone: a Tab stop so a keyboard can scroll it too (WCAG 2.1.1, a11y-1111). */}
            <div className={s.tenRow} role="region" aria-labelledby="ten-variants" tabIndex={0}>
              {Array.from({ length: 10 }, (_, d) => (
                <figure key={d} className={s.tenCell} style={{ margin: 0 }}>
                  <img src={artKey(`x-cat-d1-${d}`, true)} alt="" width={320} height={320} loading="lazy" decoding="async" />
                  <figcaption className={s.tenDigit}>
                    <b>{d}</b>
                    <span>{breed?.values[d]?.name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className={s.ten}>
            <h3 className={s.tenTitle} id="ten-colours">{h.float.coloursTitle}</h3>
            {/* Each picture's alt is empty: its caption names it (said once, not twice). Scrolls sideways on a phone: a Tab stop so a keyboard can scroll it too (WCAG 2.1.1, a11y-1111). */}
            <div className={s.tenRow} role="region" aria-labelledby="ten-colours" tabIndex={0}>
              {Array.from({ length: 10 }, (_, d) => (
                <figure key={d} className={s.tenCell} style={{ margin: 0 }}>
                  <img src={artKey(`x-cat-d2-${d}`, true)} alt="" width={320} height={320} loading="lazy" decoding="async" />
                  <figcaption className={s.tenDigit}>
                    <b>{d}</b>
                    {colour?.values[d]?.hex ? <span className={s.sw} style={{ background: colour.values[d].hex ?? undefined }} aria-hidden /> : null}
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
                    title={`${copyNameOf(data, c.item_code, c.serial)} · ${c.float.slice(0, 8)}`}
                    // Its name for a screen reader: the copy and its float, as the tooltip says, not just "#21".
                    aria-label={`${copyNameOf(data, c.item_code, c.serial)} · ${c.float.slice(0, 8)}`}
                  >
                    {/* The copy's own picture only (unique-look-1115: never its plain Legendary); not drawn yet, its colour. */}
                    {ownArtOf(art, c.item_code, c.serial) ? (
                      <img src={lookOf(looks, c.item_code, c.serial)?.alone ?? ownArtOf(art, c.item_code, c.serial, true)?.src} alt="" width={30} height={30} loading="lazy" />
                    ) : (
                      <span className={s.pinPending} style={{ background: attributesOf(data, c.item_code, c.float).find((a) => a.place === 2)?.hex ?? undefined }} />
                    )}
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
              {/* ledger-uniques-1111: the ten Legendary copies aren't burned on the ledger once it carries Uniques only */}
              <p>{LIVE.ledgerUniquesOnly ? TRADE_UP_TEXT_UNIQUES[lang] : h.sources.tradeUp.text}</p>
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
