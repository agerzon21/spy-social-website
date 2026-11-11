/**
 * The Archive (archive.spysocial.app, its own host: lib/siteHost; www.spysocial.app/archive sends there): every Unique, read from the app's
 * ledger function without an account (app repo supabase/functions/ledger, ops `uniques` and `unique`: the database's
 * mint_unique_public, 20261225300000). Its answers never carry a player's id or tag; a copy's holders are numbered by
 * their first appearance on its own ledger lines. One Unique's page (op unique) may name its holder today by @username,
 * only when the server allows it (archive-holder-1110: an adult with a public profile; never a minor, an account with no
 * birth year, a guest, a banned or paused account or the test fleet): holderOf. Cached 60 s at the function; a busy
 * answer is tried again.
 *
 * The words and tables come from the app's own code (public/archive/data/<lang>.json, scripts/archive-data/run.sh):
 * a copy's float read digit by digit gives its attributes exactly as the app's certificate lists them, and its serial
 * its codename, so a Unique minted after the export still reads right. The pictures (public/archive/art) are the app's
 * own Unique tiles, drawn from each copy's float (scripts/archive-art/run.sh); a copy drawn after the export shows its
 * plain Legendary until the next run.
 */
import type { LangCode } from '../i18n'

const LEDGER_URL = `${String(import.meta.env.VITE_SUPABASE_URL ?? '').replace(/\/$/, '')}/functions/v1/ledger`

export type CopyStatus = 'held' | 'listed' | 'burned'
export type CopySource = 'intercept' | 'trade_up' | 'other'

/** One Unique in the browse list (op=uniques). */
export type ArchiveCopy = {
  item_kind: 'avatar' | 'title'
  item_code: string
  serial: number
  set: string
  /** "0." and 16 digits. */
  float: string
  pattern: number | null
  minted_at: string
  source: CopySource
  tier: number | null
  status: CopyStatus
  price: number | null
  last_sale: number | null
  last_sale_at: string | null
  sales: number
}

export type ArchiveSet = {
  code: string
  track: string
  names: Record<string, string>
  season: string
  season_number: number
  season_names: Record<string, string>
}

export type ArchiveList = {
  chain?: string
  notice?: string
  sets: ArchiveSet[]
  items: { code: string; set: string; item_kind: string; item_code: string; minted: number; burned: number }[]
  copies: ArchiveCopy[]
}

export type HistoryEvent = {
  seq: number
  at: string
  event: 'minted' | 'tradable' | 'sold' | 'sale_undone' | 'traded' | 'moved' | 'burned' | string
  retro: boolean
  burn: 'trade_up' | 'shred' | 'other' | null
  from: number | null
  to: number | null
  price: number | null
  sale_state: 'protected' | 'final' | 'undone' | null
}

/** One Unique's page (op=unique). */
export type ArchiveUnique = {
  chain?: string
  notice?: string
  copy_id: number
  collectible: string
  item_kind: 'avatar' | 'title'
  item_code: string
  serial: number
  float: string
  pattern: number | null
  minted_at: string
  recorded_at: string
  source: CopySource
  tier: number | null
  inputs: number | null
  how: Record<string, string> | null
  rule: string
  tradable: boolean
  evidence_sha256: string
  ledger_seq: number
  set: ArchiveSet | null
  item: { minted: number; burned: number; held: number; serials: number[] }
  status: CopyStatus
  status_at: string | null
  listing: { price: number; listed_at: string } | null
  holders: number
  /**
   * The holder today (archive-holder-1110, server 20261231997000_archive_holder_1110): their username when the server
   * names them, null when it doesn't (private, under 18, unknown age...). Absent from a server before that file.
   */
  holder_handle?: string | null
  /** https://spysocial.app/profile/<username> alongside holder_handle, else null. */
  profile_url?: string | null
  history: HistoryEvent[]
}

/** A username as the app allows it (update_profile): the only kind the page shows or links. */
const HANDLE = /^[A-Za-z0-9_.]{3,30}$/
const PROFILE_URL = /^https:\/\/spysocial\.app\/profile\/([A-Za-z0-9_.]{3,30})$/

/**
 * Who holds a Unique, as its page says it: 'unknown' (a server before the holder keys, or a retired copy: the page says
 * what it said before), 'private' (Held privately) or 'named' with the handle and its profile link. Anything that
 * doesn't look right reads as private: the page never shows a name the server didn't send in the expected shape.
 */
export type HolderView = { kind: 'unknown' } | { kind: 'private' } | { kind: 'named'; handle: string; url: string }

export function holderOf(u: Pick<ArchiveUnique, 'status' | 'holder_handle' | 'profile_url'>): HolderView {
  if (u.status === 'burned' || !('holder_handle' in u) || u.holder_handle === undefined) return { kind: 'unknown' }
  const handle = u.holder_handle
  if (typeof handle !== 'string' || !HANDLE.test(handle)) return { kind: 'private' }
  const m = typeof u.profile_url === 'string' ? PROFILE_URL.exec(u.profile_url) : null
  return m && m[1] === handle ? { kind: 'named', handle, url: u.profile_url as string } : { kind: 'private' }
}

/** The ledger can't be read now (busy, offline, or the Archive's reads aren't on the server yet). */
export class ArchiveBusy extends Error {}

const wait = (ms: number) => new Promise((done) => setTimeout(done, ms))

/**
 * One read of the ledger function (the Archive's and the Market's). 404: null (nothing there). A busy answer (429, 5xx)
 * or a dropped connection is tried again twice; then ArchiveBusy ("archive 400" when the function doesn't know the op yet).
 */
export async function ledgerGet<T>(query: string): Promise<T | null> {
  for (let attempt = 0; ; attempt++) {
    let r: Response | null = null
    try {
      r = await fetch(`${LEDGER_URL}?${query}`)
    } catch {
      r = null
    }
    if (r?.ok) return (await r.json()) as T
    if (r?.status === 404) return null
    const retry = !r || r.status === 429 || r.status >= 500
    if (!retry || attempt >= 2) throw new ArchiveBusy(r ? `archive ${r.status}` : 'archive unreachable')
    const after = Number(r?.headers.get('retry-after'))
    await wait(Number.isFinite(after) && after > 0 ? Math.min(after, 8) * 1000 : 1500 * (attempt + 1))
  }
}

let listCache: { at: number; p: Promise<ArchiveList | null> } | null = null
/** Every Unique (kept a minute in this tab: the home page and the browse page share it). */
export function fetchUniques(): Promise<ArchiveList | null> {
  if (listCache && Date.now() - listCache.at < 60_000) return listCache.p
  const p = ledgerGet<ArchiveList>('op=uniques')
  p.catch(() => {
    listCache = null
  })
  listCache = { at: Date.now(), p }
  return p
}

export function fetchUnique(item: string, serial: number): Promise<ArchiveUnique | null> {
  return ledgerGet<ArchiveUnique>(`op=unique&item=${encodeURIComponent(item)}&serial=${serial}`)
}

// ------------------------------------------------------------------ the app's words and tables

export type AttrValue = { id: string; name: string; hex?: string | null }
export type AttrSpec = { id: string; place: number; label: string; values: AttrValue[] }
export type ItemData = {
  kind: 'avatar' | 'title'
  name: string
  kindLine: string
  pool: string
  offset: number
  palette: boolean
  attrs: AttrSpec[]
}
export type ArchiveData = {
  lang: string
  words: { unique: string; legendary: string; tiers: string[] }
  palettes: { id: string; base: string | null; name: string }[]
  items: Record<string, ItemData>
  codenames: { template: string; mods: string[]; nouns: Record<string, string[]> }
}

const dataCache = new Map<string, Promise<ArchiveData | null>>()
export function loadArchiveData(code: LangCode | string): Promise<ArchiveData | null> {
  let p = dataCache.get(code)
  if (!p) {
    p = fetch(`/archive/data/${code}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<ArchiveData>) : null))
      .catch(() => null)
      .then((d) => d ?? (code === 'en' ? null : loadArchiveData('en')))
    dataCache.set(code, p)
  }
  return p
}

/** The pictures drawn so far (public/archive/art/index.json: the keys). */
let artCache: Promise<Set<string>> | null = null
export function loadArtIndex(): Promise<Set<string>> {
  if (!artCache) {
    artCache = fetch('/archive/art/index.json')
      .then((r) => (r.ok ? (r.json() as Promise<string[]>) : []))
      .then((keys) => new Set(keys))
      .catch(() => new Set<string>())
  }
  return artCache
}

/**
 * The copy's own picture, else its item's plain Legendary (`own` false: drawn after the pictures were made), else null
 * (an item newer than the pictures). `small`: the 320 px one, for the grid.
 */
export function artOf(art: Set<string>, item: string, serial?: number | null, small = false): { src: string; own: boolean } | null {
  const end = small ? '-s.webp' : '.webp'
  if (serial != null && art.has(`u-${item}-${serial}`)) return { src: `/archive/art/u-${item}-${serial}${end}`, own: true }
  if (art.has(`l-${item}`)) return { src: `/archive/art/l-${item}${end}`, own: false }
  return null
}

/**
 * The item alone and "See it worn" (archive-item-art-1111, owner Nov 11: no agent on a Unique's picture; the
 * standard agent only when asked): public/archive/item/<key>.webp (a wearable cut out of the app's own drawing,
 * transparent; a backdrop's scene) and public/archive/worn/<key>-m|f.webp (the standard agents wearing it), made by
 * scripts/archive-item-art. Celebrations, locals, titles and borders keep their full-frame picture (artOf).
 */
export type Looks = { item: Set<string>; worn: Set<string>; scene: Set<string> }
let lookCache: Promise<Looks> | null = null
export function loadLookIndex(): Promise<Looks> {
  if (!lookCache) {
    const keys = (path: string) =>
      fetch(path)
        .then((r) => (r.ok ? (r.json() as Promise<string[]>) : []))
        .then((k) => new Set(k))
        .catch(() => new Set<string>())
    lookCache = Promise.all([keys('/archive/item/index.json'), keys('/archive/worn/index.json'), keys('/archive/scene/index.json')]).then(
      ([item, worn, scene]) => ({ item, worn, scene }),
    )
  }
  return lookCache
}

/**
 * How a Unique's picture shows its item: in the display case (a wearable), framed on its wall (a backdrop), or its
 * scene filling the picture (a celebration, a local, a border: public/archive/scene, full-bleed, no case).
 */
export type ItemLook = { kind: 'case' | 'wall' | 'scene'; alone: string; worn: { m: string; f: string } | null }

/** The copy's own look, else its item's plain Legendary's, else null (not drawn this way yet: the tile as it is). */
export function lookOf(looks: Looks, item: string, serial?: number | null, small = false): ItemLook | null {
  const pick = (set: Set<string>) => (serial != null && set.has(`u-${item}-${serial}`) ? `u-${item}-${serial}` : set.has(`l-${item}`) ? `l-${item}` : null)
  // An item alone first (a wearable, a backdrop, the border lifted off its scene), else a scene filling the frame.
  const key = pick(looks.item)
  if (!key) {
    const sc = pick(looks.scene)
    return sc ? { kind: 'scene', alone: `/archive/scene/${sc}${small ? '-s' : ''}.webp`, worn: null } : null
  }
  const worn = looks.worn.has(`${key}-m`) && looks.worn.has(`${key}-f`) ? { m: `/archive/worn/${key}-m.webp`, f: `/archive/worn/${key}-f.webp` } : null
  return { kind: item.startsWith('background_') ? 'wall' : 'case', alone: `/archive/item/${key}.webp`, worn }
}

/** A picture by its key (the float page's examples: x-cat-d1-3). */
export const artKey = (key: string, small = false) => `/archive/art/${key}${small ? '-s' : ''}.webp`

/** #00042: a Unique's number as the app's badge writes it. */
export function serialText(n: number): string {
  return `#${String(Math.max(0, Math.floor(n))).padStart(5, '0')}`
}

/** The float's decimal digit at place 1..16 (the app reads the first six: lib/unique/digits). */
export function floatDigit(float: string, place: number): number {
  const d = float.split('.')[1] ?? ''
  return Number(d[place - 1] ?? 0) || 0
}

/** The float's first six digits: what every look reads (the app's lib/unique/floatText visualSeed). */
function lookDigits(float: string): string {
  return (float.split('.')[1] ?? '').replace(/\D/g, '').padEnd(6, '0').slice(0, 6)
}

export type CopyAttribute = { id: string; place: number; label: string; value: string; hex: string | null; digit: number }

/** The copy's attributes, digit by digit, as the app's certificate lists them. */
export function attributesOf(data: ArchiveData | null, item: string, float: string): CopyAttribute[] {
  const it = data?.items[item]
  if (!it) return []
  const digits = lookDigits(float)
  return it.attrs.map((a) => {
    const digit = Number(digits[a.place - 1] ?? 0)
    const v = a.values[digit % a.values.length]
    return { id: a.id, place: a.place, label: a.label, value: v?.name ?? '', hex: v?.hex ?? null, digit }
  })
}

const ROMAN: [number, string][] = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
function roundMark(round: number): string {
  let n = round
  let out = ''
  for (const [v, r] of ROMAN) while (n >= v) { out += r; n -= v }
  return round <= 1 ? '' : out
}

/** The copy's codename ("Midnight Whiskers"), the app's shuffle of its item's 128 names (lib/unique/codename). */
export function codenameOf(data: ArchiveData | null, item: string, serial: number): string | null {
  const it = data?.items[item]
  if (!it || !data || serial < 1) return null
  const nouns = data.codenames.nouns[it.pool]
  if (!nouns) return null
  const s = Math.round(serial)
  const round = Math.floor((s - 1) / 128) + 1
  const k = ((s - 1) % 128) + 1
  const n = (it.offset + k * 53) % 128
  const [noun, gender] = (nouns[Math.floor(n / 16)] ?? '').split(':')
  const of = gender === 'f' ? 'की' : gender === 'p' ? 'के' : 'का'
  const name = data.codenames.template.replace('{{mod}}', data.codenames.mods[n % 16] ?? '').replace('{{noun}}', noun).replace('{{of}}', of)
  const mark = roundMark(round)
  return mark ? `${name} ${mark}` : name
}

/** The copy's main colour (its digit-2 colour's swatch), for a glow behind its picture. */
export function swatchOf(data: ArchiveData | null, item: string, float: string): string | null {
  return attributesOf(data, item, float).find((a) => a.place === 2)?.hex ?? null
}

/** The item's kind for the browse page's filter: what it is in the app. */
export type ItemType = 'celebration' | 'wearable' | 'border' | 'backdrop' | 'title'
export function itemType(code: string, kind: string): ItemType {
  if (kind === 'title') return 'title'
  if (code.startsWith('celebration_') || code.startsWith('local_')) return 'celebration'
  if (code.startsWith('frame_')) return 'border'
  if (code.startsWith('background_')) return 'backdrop'
  return 'wearable'
}

export const nameOf = (data: ArchiveData | null, code: string) => data?.items[code]?.name ?? code.replace(/^[a-z]+_/, '').split('_').map((w) => w[0]?.toUpperCase() + w.slice(1)).join(' ')

/** The page's own address for a copy. */
export const uniquePath = (item: string, serial: number) => `/archive/u/${encodeURIComponent(item)}/${serial}`
