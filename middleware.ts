/**
 * Link previews for one Unique and one Market item (link-previews-1112). The Archive and the Market are apps: every
 * address answers the host's one page (vercel.json: dist/_host/archive.html, market.html), whose head is the host's
 * own ("The Archive · SpySocial"), and a link previewer (Discord, iMessage, X, Slack, WhatsApp...) runs no script, so
 * every Unique's and item's link showed the host's card. For a previewer or a search crawler only, this answers
 * archive.spysocial.app/u/<item>/<serial> and market.spysocial.app/item/<code> with that same page and the item's own
 * title, description, address and picture (a 1200x630 card, public/og: scripts/og-cards/make.py) in English.
 *
 * Everyone else: untouched (the request goes on as before; no read of the ledger here). For a previewer: the page
 * from this deployment and one read of the public ledger function (cached 60 s there), with a time limit; if the ledger
 * is slow or down, what the site's own files know (the item's name, its line, its card). A copy or item the ledger says
 * doesn't exist keeps the host's card and is noindex, as its page says once it has loaded (f2a975c).
 */
import og from './public/og/index.json'
import archiveEn from './public/archive/data/en.json'
import marketEn from './src/pages/market/words/en.json'
import marketArt from './src/pages/market/art.json'

export const config = { matcher: ['/u/:path*', '/item/:path*'] }

const ORIGIN = 'https://www.spysocial.app'
const LEDGER = 'https://ajobkfasquywiawjfdxg.supabase.co/functions/v1/ledger'
const LEDGER_WAIT_MS = 2500

/**
 * Link previewers and search crawlers (none of them run the page's script). Never an app's own in-app browser (Discord's,
 * Snapchat's, LinkedIn's...) or a speed test (Lighthouse): those are people, and get the page as before.
 */
const PREVIEWER =
  /bot\b|bot\/|crawler|spider|facebookexternalhit|facebot|meta-externalagent|whatsapp\/|skypeuripreview|embedly|iframely|vkshare|mastodon\/|cardyb|kakaotalk-scrap|flipboardproxy|google-inspectiontool|link ?preview/i

type Cards = { a: Record<string, string>; m: Record<string, string> }
type ArchiveItem = { name: string; kindLine: string; pool: string; offset: number }
type ArchiveData = { words: { unique: string }; items: Record<string, ArchiveItem>; codenames: { template: string; mods: string[]; nouns: Record<string, string[]> } }
type Lines = { d: Record<string, string>; n: Record<string, string> }

const CARDS = og as Cards
const ARCHIVE = archiveEn as unknown as ArchiveData
const LINES = marketEn as Lines
const MARKET_ART = marketArt as Record<string, string | string[]>

const ITEM = /^[a-z0-9][a-z0-9_.]{0,127}$/
const SERIAL = /^[1-9]\d{0,8}$/
const CODE = /^[A-Za-z0-9_.-]{1,160}$/

/** Go on as if this file weren't here (@vercel/functions next()). */
const next = () => new Response(null, { headers: { 'x-middleware-next': '1' } })

const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

type Preview = { title: string; description: string; url: string; image: string | null; alt: string; noindex?: false } | { noindex: true }

/** The ledger's answer: the object, null (404: no such copy or item), or undefined (slow, busy, down). */
async function ledger<T>(query: string): Promise<T | null | undefined> {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), LEDGER_WAIT_MS)
  try {
    const r = await fetch(`${LEDGER}?${query}`, { signal: ctl.signal })
    if (r.status === 404) return null
    return r.ok ? ((await r.json()) as T) : undefined
  } catch {
    return undefined
  } finally {
    clearTimeout(timer)
  }
}

const card = (kind: 'a' | 'm', key: string) => (CARDS[kind][key] ? `${ORIGIN}/og/${kind}/${key}.jpg?v=${CARDS[kind][key]}` : null)

const ROMAN: [number, string][] = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]

/** The copy's codename (src/lib/archive.ts codenameOf), in English. */
function codename(item: string, serial: number): string | null {
  const it = ARCHIVE.items[item]
  const nouns = it ? ARCHIVE.codenames.nouns[it.pool] : null
  if (!it || !nouns) return null
  const round = Math.floor((serial - 1) / 128) + 1
  const n = (it.offset + (((serial - 1) % 128) + 1) * 53) % 128
  const noun = (nouns[Math.floor(n / 16)] ?? '').split(':')[0]
  const name = ARCHIVE.codenames.template.replace('{{mod}}', ARCHIVE.codenames.mods[n % 16] ?? '').replace('{{noun}}', noun).replace('{{of}}', '').trim()
  let mark = ''
  let left = round
  for (const [v, r] of ROMAN) while (left >= v) { mark += r; left -= v }
  return round > 1 ? `${name} ${mark}` : name
}

type Unique = { item_kind: string; item: { minted: number }; status: string }

async function uniquePreview(path: string, host: string): Promise<Preview | null> {
  const m = /^\/u\/([^/]+)\/([^/]+)\/?$/.exec(path)
  if (!m) return null
  let item: string
  try {
    item = decodeURIComponent(m[1])
  } catch {
    return { noindex: true }
  }
  if (!ITEM.test(item) || !SERIAL.test(m[2])) return { noindex: true }
  const serial = Number(m[2])
  const u = await ledger<Unique>(`op=unique&item=${encodeURIComponent(item)}&serial=${serial}`)
  if (u === null) return { noindex: true }
  const it = ARCHIVE.items[item]
  // The ledger can't say and the site has never heard of the item: the host's card, as before.
  if (u === undefined && !it) return null
  const name = it?.name ?? item.replace(/^[a-z]+_/, '').split('_').map((w) => (w[0]?.toUpperCase() ?? '') + w.slice(1)).join(' ')
  const number = `#${String(serial).padStart(5, '0')}`
  const cn = codename(item, serial)
  const line = LINES.d[`${u?.item_kind === 'title' ? 'title' : 'avatar'}:${item}`] ?? LINES.d[`avatar:${item}`] ?? LINES.d[`title:${item}`] ?? null
  const what = `${ARCHIVE.words.unique} ${number}${u?.status === 'burned' ? ', retired' : u ? `, one of ${u.item.minted.toLocaleString('en-US')} minted` : ''}`
  const head = cn ? `“${cn}” · ${what}.` : `${what}.`
  return {
    title: `${name} #${serial} · The Archive`,
    description: `${head} ${line ?? 'Its picture, attributes, how it was minted and every sale, on the public record.'}`,
    url: `https://${host}/u/${encodeURIComponent(item)}/${serial}`,
    image: card('a', `u-${item}-${serial}`) ?? card('a', `l-${item}`),
    alt: `${name} ${number}, a SpySocial Unique`,
  }
}

type MarketPage = { phase: string; halted: boolean; demo?: string[]; item?: { c: string; k: string; i: string; nm: string; r: string; t: boolean; p?: number } }

const SHELF: [string, string][] = [['outfit_', 'outfit'], ['hat_', 'hat'], ['glasses_', 'pair of glasses'], ['hair_', 'hair colour'], ['facial_hair_', 'beard colour'], ['frame_', 'border'], ['background_', 'backdrop'], ['celebration_', 'celebration'], ['local_', 'celebration']]

async function itemPreview(path: string, host: string): Promise<Preview | null> {
  const m = /^\/item\/([^/]+)\/?$/.exec(path)
  if (!m) return null
  let code: string
  try {
    code = decodeURIComponent(m[1])
  } catch {
    return { noindex: true }
  }
  if (!CODE.test(code)) return { noindex: true }
  const page = await ledger<MarketPage>(`op=market_item&code=${encodeURIComponent(code)}&lang=en`)
  if (page === null || (page && !page.item)) return { noindex: true }
  // What the code itself says (the books' code ends in the item's: "beta.intercepts.avatar.hat_fez", "intercept.tier.5").
  const tier = /^intercept\.tier\.(\d+)$/.exec(code)
  const guess = tier ? { k: 'intercept', i: tier[1], t: true } : /\.(avatar|title)\.([a-z0-9_]+)$/.exec(code)
  const it = page?.item ?? (Array.isArray(guess) ? { k: guess[1], i: guess[2], t: false } : guess)
  if (!it) return null
  const intercept = it.t || it.k === 'intercept'
  const kind = intercept ? 'intercept' : it.k === 'title' ? 'title' : 'avatar'
  const key = intercept ? `intercept-${it.i}` : it.k === 'title' ? `title-${it.i}` : it.i
  const server = page?.item?.nm
  const name = server && server !== it.i ? server : LINES.n[`${kind}:${it.i}`] ?? null
  // Neither the ledger nor the site's files know it: the host's card, as before.
  if (!name && !CARDS.m[key]) return null
  const shown = name ?? it.i.replace(/^[a-z]+_/, '').split('_').map((w) => (w[0]?.toUpperCase() ?? '') + w.slice(1)).join(' ')
  const rarity = page?.item?.r
  const shelf = intercept ? 'sealed Intercept' : it.k === 'title' ? 'title' : SHELF.find(([p]) => it.i.startsWith(p))?.[1] ?? 'accessory'
  const line = LINES.d[`${kind}:${it.i}`] ?? `${rarity && !intercept ? `${rarity[0].toUpperCase()}${rarity.slice(1)} ` : ''}${shelf} on the SpySocial Black Market.`
  // A price only on the open market (the beta's are testers' trades, wiped before the launch), never a sample's.
  const p = page?.item?.p
  const price = page && page.phase === 'open' && !page.halted && p != null && !(page.demo ?? []).includes(page.item!.c) ? ` Price today: ${p.toLocaleString('en-US')} Intel.` : ''
  const art = typeof MARKET_ART[it.i] === 'string' && !intercept && it.k !== 'title' ? `${ORIGIN}/market-art/${it.i}.webp` : null
  return {
    title: `${shown} · Black Market`,
    description: `${line}${price}`,
    url: `https://${host}/item/${encodeURIComponent(code)}`,
    image: card('m', key) ?? art,
    alt: `${shown} on the SpySocial Black Market`,
  }
}

/** The page's head with the preview's tags (each replaced where the page has it, else added). */
function withPreview(html: string, p: Preview): string {
  const head = html.indexOf('</head>')
  if (head < 0) return html
  let top = html.slice(0, head)
  const add: string[] = []
  const put = (re: RegExp, tag: string) => {
    if (re.test(top)) top = top.replace(re, tag)
    else add.push(tag)
  }
  if (p.noindex) {
    put(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex" />')
  } else {
    const t = attr(p.title)
    const d = attr(p.description)
    put(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    put(/<meta name="description"[^>]*>/, `<meta name="description" content="${d}" />`)
    put(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${attr(p.url)}" />`)
    put(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${t}" />`)
    put(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${d}" />`)
    put(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${t}" />`)
    put(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${d}" />`)
    if (p.image) {
      const big = p.image.includes('/og/')
      const img = attr(p.image)
      put(/<meta property="og:image" [^>]*>/, `<meta property="og:image" content="${img}" />`)
      put(/<meta property="og:image:type"[^>]*>/, `<meta property="og:image:type" content="${big ? 'image/jpeg' : 'image/webp'}" />`)
      if (big) {
        put(/<meta property="og:image:width"[^>]*>/, '<meta property="og:image:width" content="1200" />')
        put(/<meta property="og:image:height"[^>]*>/, '<meta property="og:image:height" content="630" />')
      } else {
        top = top.replace(/<meta property="og:image:(width|height)"[^>]*>\s*/g, '')
      }
      put(/<meta property="og:image:alt"[^>]*>/, `<meta property="og:image:alt" content="${attr(p.alt)}" />`)
      put(/<meta name="twitter:card"[^>]*>/, `<meta name="twitter:card" content="${big ? 'summary_large_image' : 'summary'}" />`)
      put(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${img}" />`)
    }
  }
  return `${top}${add.length ? `    ${add.join('\n    ')}\n  ` : ''}${html.slice(head)}`
}

export default async function middleware(request: Request): Promise<Response> {
  const ua = request.headers.get('user-agent') ?? ''
  if (request.method !== 'GET' && request.method !== 'HEAD') return next()
  if (!PREVIEWER.test(ua)) return next()
  const url = new URL(request.url)
  const host = url.hostname
  // Only a Unique's page on the Archive and an item's on the Market (the matcher lets /u/ and /item/ through on every host).
  const which =
    host === 'archive.spysocial.app' && /^\/u\/[^/]+\/[^/]+\/?$/.test(url.pathname)
      ? 'archive'
      : host === 'market.spysocial.app' && /^\/item\/[^/]+\/?$/.test(url.pathname)
        ? 'market'
        : null
  if (!which) return next()
  try {
    const [page, preview] = await Promise.all([
      fetch(new URL(`/_host/${which}.html`, url)),
      which === 'archive' ? uniquePreview(url.pathname, host) : itemPreview(url.pathname, host),
    ])
    if (!preview || !page.ok) return next()
    const html = withPreview(await page.text(), preview)
    const headers = new Headers(page.headers)
    headers.delete('content-encoding')
    headers.delete('content-length')
    headers.delete('etag')
    headers.set('content-type', 'text/html; charset=utf-8')
    headers.set('cache-control', 'public, max-age=0, must-revalidate')
    headers.set('vary', 'User-Agent')
    return new Response(request.method === 'HEAD' ? null : html, { status: 200, headers })
  } catch {
    return next()
  }
}
