import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../../i18n'
import type * as Engine from '../../lib/backdrop/engine.generated.js'

/**
 * A Legendary backdrop (Vault Zero, Panel Break) as it moves in the app (archive-item-art-1111, owner Nov 11): drawn
 * here by the app's own code (lib/backdrop/engine.generated.js: lib/avatar/legendaryBackdrops' layers and
 * legendaryBackdropMotion's poses, the copy's own colours), filling its box like a scene. `figure`: the standard agent
 * in front of it (Him / Her: "See it worn"), else the backdrop alone. The app spaces its beats 3 to 7 s apart and its big
 * moment 30 to 42 s; here one short loop has both (rest, the beat, rest, the moment, rest), so it is seen at once.
 * Still (the rest pose: the app's still picture) under Reduce Motion, with `still` (the grid, the Market's rows), off
 * screen and in a hidden tab. Panel Break's words are the reader's language (the app's own, LEGENDARY_BACKDROP_WORDS);
 * `simple` (a thumbnail under 72 px) draws the app's simple scene and no words, as the app does.
 * `poster`: the copy's still picture (the rest pose, drawn by the same code: scripts/archive-item-art), shown while the
 * engine loads (`eager`: the page's own picture, not a grid's; speed2-1111: the page paints the picture before the 140 KB engine arrives, then the drawing takes over).
 */

type Copy = { float: string; pattern: number | null; serial?: number | null } | null

let engine: Promise<typeof Engine> | null = null
const loadEngine = () => (engine ??= import('../../lib/backdrop/engine.generated.js'))

const SPOT = '#8e99ae'
const BOOST = 1.15 // components/rarity/rarityClock UNIQUE_BOOST
const REST_A = 1200
const REST_B = 1400
const REST_C = 1000

const inner = (xml: string) => xml.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
const tf = (p: Engine.LayerPose, pivot: readonly [number, number]) =>
  `translate(${p.tx + pivot[0]} ${p.ty + pivot[1]}) rotate(${p.r}) scale(${p.sx} ${p.sy}) translate(${-pivot[0]} ${-pivot[1]})`

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

type Built = {
  kind: 'vault' | 'panel'
  layers: { idx: number; pivot: readonly [number, number]; html: string; word?: Word; nested?: boolean }[]
  figure: string
  peak: string
  unique: boolean
  spin: number
  beat: number
  moment: number
}
type Word = { text: string; x: number; y: number; w: number; h: number; fill: string; ink: string | null; rotate: number; italic: boolean }

function build(E: typeof Engine, item: string, copy: Copy, figure: 'm' | 'f' | null, small: boolean, lang: string): Built | null {
  const art = E.itemByCode(item)?.art
  if (!art || !E.isLiveBackdrop(art)) return null
  const mark = copy ? { ...(E.markSeedOf(null, copy.float) ?? { seed: copy.float }), pattern: copy.pattern ?? undefined, serial: copy.serial ?? null } : null
  const t = mark ? E.backdropCopy(art, mark) : null
  const L = E.backdropLayers(art, t, small)
  if (!L) return null
  const scene = small ? 'simple' : 'full'
  const config = figure === 'f' ? { ...E.NEUTRAL_AVATAR, hair: 'hair_long' } : { ...E.NEUTRAL_AVATAR }
  const fig = (light: string) => (figure ? inner(E.avatarXml({ config, bare: true, spotlight: light, crop: 'bust', scene })) : '')
  const unique = !!t
  if (L.kind === 'vault') {
    const l = L.layers
    const V = E.VL
    const P = E.VAULT_PIVOT
    const [rx, ry] = E.VAULT_RAYS_BOX
    return {
      kind: 'vault',
      unique,
      spin: l.spin,
      beat: E.BACKDROP_BEAT_MS.vault,
      moment: E.BACKDROP_MOMENT_MS.vault,
      figure: fig(SPOT),
      peak: fig(l.peakLight),
      layers: [
        { idx: -1, pivot: [0, 0], html: l.base },
        { idx: V.bolts, pivot: P[V.bolts], html: l.bolts },
        { idx: V.seam, pivot: P[V.seam], html: l.seam },
        { idx: V.openBack, pivot: P[V.openBack], html: l.openBack },
        { idx: V.rays, pivot: P[V.rays], html: `<g transform="translate(${rx} ${ry})">${l.rays}</g>` },
        { idx: V.openFront, pivot: P[V.openFront], html: l.openFront },
        { idx: V.door, pivot: P[V.door], html: l.door },
        { idx: V.handle, pivot: P[V.handle], html: l.handle, nested: true },
        { idx: V.glint0, pivot: P[V.glint0], html: l.glints[0] },
        { idx: V.glint1, pivot: P[V.glint1], html: l.glints[1] },
        { idx: V.glint2, pivot: P[V.glint2], html: l.glints[2] },
        { idx: -2, pivot: [0, 0], html: '' }, // the figure
        { idx: V.peakFigure, pivot: P[V.peakFigure], html: '' }, // the figure in the copy's light
        { idx: V.motes, pivot: P[V.motes], html: l.motes },
      ],
    }
  }
  const l = L.layers
  const Q = E.PL
  const P = E.PANEL_PIVOT
  const words = E.LEGENDARY_BACKDROP_WORDS[lang] ?? E.LEGENDARY_BACKDROP_WORDS.en
  const si = Math.max(0, E.PANEL_SOUNDS.indexOf(L.look.sound ?? 'krak'))
  const sound = words.sounds[si] ?? ''
  const [px, py, pr] = E.POP_AT
  const [bx, by, br] = E.BURST_AT
  const [cx, cy, cw, ch] = E.CAPTION_BOX
  const say = !small
  return {
    kind: 'panel',
    unique,
    spin: 1,
    beat: E.BACKDROP_BEAT_MS.panel,
    moment: E.BACKDROP_MOMENT_MS.panel,
    figure: fig(SPOT),
    peak: '',
    layers: [
      { idx: -1, pivot: [0, 0], html: l.base },
      { idx: Q.pulse, pivot: P[Q.pulse], html: l.pulse },
      { idx: Q.broken, pivot: P[Q.broken], html: l.broken },
      { idx: Q.figure, pivot: P[Q.figure], html: '' },
      { idx: Q.frame, pivot: P[Q.frame], html: l.frame },
      { idx: Q.debris, pivot: P[Q.debris], html: l.debris },
      { idx: Q.crack0, pivot: P[Q.crack0], html: l.cracks[0] },
      { idx: Q.crack1, pivot: P[Q.crack1], html: l.cracks[1] },
      { idx: Q.crack2, pivot: P[Q.crack2], html: l.cracks[2] },
      { idx: Q.shard0, pivot: P[Q.shard0], html: l.shards[0] },
      { idx: Q.shard1, pivot: P[Q.shard1], html: l.shards[1] },
      { idx: Q.shard2, pivot: P[Q.shard2], html: l.shards[2] },
      { idx: Q.shard3, pivot: P[Q.shard3], html: l.shards[3] },
      {
        idx: Q.pop,
        pivot: P[Q.pop],
        html: l.pop,
        word: say && unique ? { text: sound, x: px, y: py, w: pr * 1.45, h: pr * 0.62, fill: l.word.fill, ink: l.word.ink, rotate: -8, italic: true } : undefined,
      },
      { idx: Q.burst, pivot: P[Q.burst], html: l.burst, word: say ? { text: sound, x: bx, y: by, w: br * 1.45, h: br * 0.5, fill: l.word.fill, ink: l.word.ink, rotate: 0, italic: true } : undefined },
      {
        idx: Q.caption,
        pivot: P[Q.caption],
        html: l.caption,
        word: say ? { text: words.caption, x: cx + cw / 2, y: cy + ch / 2, w: cw - 5, h: ch - 4.5, fill: l.captionInk, ink: null, rotate: 0, italic: false } : undefined,
      },
    ],
  }
}

/** A word's starting size for its box (the app's fitSize: by its script's glyph width); fitted to the box once drawn. */
function startSize(w: Word): number {
  const n = Math.max(1, Array.from(w.text).length)
  const em = /[Ѐ-ӿ]/.test(w.text) ? 0.72 : /[一-鿿]/.test(w.text) ? 1.0 : /[A-Za-z]/.test(w.text) ? 0.68 : 0.6
  return Math.max(4, Math.min(w.h, w.w / (n * em)))
}

function WordText({ w }: { w: Word }) {
  const ref = useRef<SVGTextElement>(null)
  const size = startSize(w)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    try {
      const len = el.getComputedTextLength()
      if (len > w.w) el.setAttribute('textLength', String(w.w))
    } catch {
      // Not laid out (a hidden tab): the starting size stands.
    }
  }, [w])
  const off = Math.max(0.6, size * 0.08)
  const common = {
    x: w.x,
    y: w.y,
    fontSize: size,
    fontWeight: 900,
    fontStyle: w.italic && /[A-Za-z]/.test(w.text) ? 'italic' : 'normal',
    textAnchor: 'middle' as const,
    dominantBaseline: 'central' as const,
    lengthAdjust: 'spacingAndGlyphs' as const,
    style: { fontFamily: 'var(--ss-font-display, Impact, sans-serif)', letterSpacing: '0.02em' },
  }
  return (
    <g transform={w.rotate ? `rotate(${w.rotate} ${w.x} ${w.y})` : undefined}>
      {w.ink ? (
        <text {...common} x={w.x + off} y={w.y + off} fill={w.ink} aria-hidden>
          {w.text}
        </text>
      ) : null}
      <text ref={ref} {...common} fill={w.fill}>
        {w.text}
      </text>
    </g>
  )
}

export function LiveBackdrop({ item, copy, figure = null, still = false, simple = false, alt = '', poster = '', eager = false }: { item: string; copy: Copy; figure?: 'm' | 'f' | null; still?: boolean; simple?: boolean; alt?: string; poster?: string; eager?: boolean }) {
  const { lang } = useLang()
  const [E, setE] = useState<typeof Engine | null>(null)
  useEffect(() => {
    let live = true
    loadEngine().then((m) => live && setE(m))
    return () => {
      live = false
    }
  }, [])
  // The copy by value (a new object each render must not rebuild the drawing).
  const ck = copy ? `${copy.float}|${copy.pattern ?? ''}|${copy.serial ?? ''}` : ''
  const B = useMemo(() => {
    if (!E) return null
    const [float, pattern, serial] = ck.split('|')
    return build(E, item, ck ? { float, pattern: pattern ? Number(pattern) : null, serial: serial ? Number(serial) : null } : null, figure, simple, lang)
  }, [E, item, ck, figure, simple, lang])
  const reduced = useReducedMotion()
  const svg = useRef<SVGSVGElement>(null)
  const groups = useRef<(SVGGElement | null)[]>([])

  // The poses at a moment of the loop (u: the beat, v: the moment; -1 outside them).
  useEffect(() => {
    if (!E || !B) return
    const pose = (i: number, u: number, v: number) =>
      B.kind === 'vault' ? E.vaultPose(i, u, v, B.unique ? BOOST : 1, B.spin) : E.panelPose(i, u, v, B.unique ? BOOST : 1, B.unique)
    const apply = (u: number, v: number) => {
      B.layers.forEach((ly, n) => {
        const g = groups.current[n]
        if (!g || ly.idx < 0) return
        const p = pose(ly.idx, u, v)
        g.setAttribute('transform', tf(p, ly.pivot))
        g.setAttribute('opacity', String(p.o))
      })
    }
    apply(-1, -1)
    if (still || reduced) return
    const length = REST_A + B.beat + REST_B + B.moment + REST_C
    let raf = 0
    let start = performance.now()
    let shown = true
    const tick = (now: number) => {
      const t = (now - start) % length
      const u = t >= REST_A && t < REST_A + B.beat ? (t - REST_A) / B.beat : -1
      const m0 = REST_A + B.beat + REST_B
      const v = t >= m0 && t < m0 + B.moment ? (t - m0) / B.moment : -1
      apply(u, v)
      raf = requestAnimationFrame(tick)
    }
    const run = () => {
      cancelAnimationFrame(raf)
      if (shown && !document.hidden) {
        start = performance.now()
        raf = requestAnimationFrame(tick)
      } else apply(-1, -1)
    }
    const io = new IntersectionObserver((es) => {
      shown = es.some((e) => e.isIntersecting)
      run()
    })
    if (svg.current) io.observe(svg.current)
    document.addEventListener('visibilitychange', run)
    run()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', run)
    }
  }, [E, B, still, reduced])

  if (!B)
    return (
      <span style={{ position: 'absolute', inset: 0, background: '#0d121d' }} aria-hidden={poster && alt ? undefined : true}>
        {poster ? <img src={poster} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : null}
      </span>
    )
  // The figure sits where the app's children go; Vault Zero's handle turns on its door (nested in its group).
  const htmlOf = (ly: Built['layers'][number]) =>
    ly.idx === -2 || (B.kind === 'panel' && ly.idx === E!.PL.figure) ? B.figure : B.kind === 'vault' && ly.idx === E!.VL.peakFigure ? B.peak : ly.html
  const layer = (n: number, extra: React.ReactNode = null) => {
    const ly = B.layers[n]
    return (
      <g
        key={n}
        ref={(el) => {
          groups.current[n] = el
        }}
      >
        <g dangerouslySetInnerHTML={{ __html: htmlOf(ly) }} />
        {ly.word ? <WordText w={ly.word} /> : null}
        {extra}
      </g>
    )
  }
  const out: React.ReactNode[] = []
  B.layers.forEach((ly, n) => {
    if (ly.nested) return
    const next = B.layers[n + 1]
    out.push(next?.nested ? layer(n, layer(n + 1)) : layer(n))
  })
  return (
    <svg ref={svg} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}>
      {out}
    </svg>
  )
}
