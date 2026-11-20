/*
 * www's pages drawn into their HTML at build time (www-speed-1112): run after `vite build` and
 * `vite build --ssr src/prerender.tsx` (package.json's build). On a throttled phone www showed nothing until its
 * JavaScript had run (first paint ~2.9 s); with the page already in the HTML it paints as soon as the HTML and CSS
 * are in, and main.tsx hydrates it when the app arrives (same markup, so nothing is drawn again).
 *
 * For each page src/App.tsx's PRERENDER_PAGES lists and each language: the page's built HTML (its link preview,
 * written by vite.config.ts pagePreviews) with
 * - #root holding the page in that language (data-pre="<lang>"; main.tsx hydrates only when lang.js chose the same);
 * - a rule that keeps it hidden if lang.js chose another language (a saved choice the server can't see), so that
 *   visitor sees what they saw before (the page drawn by the app, in their language);
 * - the page chunk's CSS linked and its JavaScript modulepreloaded, as the app's loader would add them;
 * - Chakra's styles (Emotion's) for the page in <style data-s> tags after them, where Emotion in the browser finds and
 *   keeps them, the same order as when the app inserts them.
 * Written to dist/_pre/<page>/<base>.html, named by the language's base code (zh for zh-Hans, pt for pt-BR, the way
 * lang.js matches a browser's language; vercel.json's rewrites pick the file by ?lang= and the browser's first
 * language, English by default); the page's own dist/<page>/index.html goes (see the end). Help
 * keeps a plain copy (_pre/support/shell.html) for a search link (?q=), which the page answers in the browser.
 *
 * Usage: node scripts/prerender.mjs dist
 */
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rename, rm, rmdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'

// React's production build, as in the browser.
process.env.NODE_ENV = 'production'
const dist = resolve(process.argv[2] ?? 'dist')
const ssrEntry = resolve('dist-ssr/prerender.js')
if (!existsSync(ssrEntry)) throw new Error(`prerender: no ${ssrEntry} (run vite build --ssr src/prerender.tsx first)`)
/*
 * archive-speed-1116: `--host-bodies <archive|market>` is this script run again for one host (below): lib/siteHost
 * reads the page's host once, when the module loads, so each host's pages are drawn in a process that names it first.
 * It writes dist-ssr/bodies-<host>.json ({ "<file>/<lang>": html }) and stops.
 */
const bodiesFor = process.argv[3] === '--host-bodies' ? process.argv[4] : null
if (bodiesFor) globalThis.__ssSsrHost = `${bodiesFor}.spysocial.app`
const { render, renderHostHead, renderHostBody, SKIN_CSS, HOST_BODIES, HOST_PAGES, HOSTS_ON, PRERENDER_PAGES, PRERENDER_SHELLS, LANGUAGE_CODES, cardAlts } = await import(pathToFileURL(ssrEntry).href)
// The card's alt text per language (localHead), read one language at a time before any page is drawn.
const CARD_ALTS = {}
for (const { code } of LANGUAGE_CODES) CARD_ALTS[code] = await cardAlts(code)
if (bodiesFor) {
  const out = {}
  for (const page of HOST_BODIES.filter((p) => p.host === bodiesFor)) {
    for (const { code } of LANGUAGE_CODES) {
      const html = await renderHostBody(page.path, code)
      if (!html.includes('<main')) throw new Error(`prerender: ${bodiesFor} ${page.path} in ${code} rendered no <main>`)
      out[`${page.file}/${code}`] = html
    }
  }
  await writeFile(resolve('dist-ssr', `bodies-${bodiesFor}.json`), JSON.stringify(out))
  process.exit(0)
}

/**
 * Every page vercel.json's language rewrites name: each needs a file per language, rendered or (its route off) the
 * page's own file as it is, so a rewrite never points at a missing file. Keep in step with vercel.json.
 */
const ROUTED = ['privacy', 'terms', 'rules', 'safety', 'game-night-rules', 'ledger', 'transparency', 'child-safety', 'contact-us', 'support', 'whats-new', 'roadmap', 'press', 'beta', 'delete-account', 'join']
/** Pages whose built file also answers other addresses (dist/join/index.html: every /join/<code>): moved, not dropped. */
const MOVED = { join: '_page/join.html' }
/** The pages whose built file is dist/_page/<page>.html (vite.config.ts SHARED_PAGES), not dist/<page>/index.html. */
const SHARED = new Set(['ledger', 'transparency'])

const manifestFile = resolve(dist, '.vite/manifest.json')
const manifest = JSON.parse(await readFile(manifestFile, 'utf8'))

/** A built file's own path, under dist. */
/** A language's file name under dist/_pre/<page>/: its base code (zh-Hans: zh). */
const baseOf = (code) => code.split('-')[0]

const fileOf = (slug) => (slug === 'home' ? '_host/www.html' : SHARED.has(slug) ? `_page/${slug}.html` : `${slug}/index.html`)

// What www's page already loads (index.html's entry, its static imports and their CSS): never linked again.
const entry = manifest['index.html']
if (!entry) throw new Error('prerender: no index.html entry in the manifest')
const have = new Set()
const walk = (key) => {
  const chunk = manifest[key]
  if (!chunk || have.has(chunk.file)) return
  have.add(chunk.file)
  for (const dep of chunk.imports ?? []) walk(dep)
  for (const css of chunk.css ?? []) have.add(css)
}
walk('index.html')

/** A page chunk's files in the order the app's chunk loader adds them: the chunk, its imports (depth first), then its CSS. */
function pageFiles(src) {
  const js = []
  const css = []
  const seen = new Set()
  const add = (key) => {
    const chunk = manifest[key]
    if (!chunk) throw new Error(`prerender: ${key} is not in the build's manifest`)
    if (seen.has(chunk.file) || have.has(chunk.file)) return
    seen.add(chunk.file)
    js.push(chunk.file)
    for (const dep of chunk.imports ?? []) add(dep)
    for (const file of chunk.css ?? []) if (!have.has(file) && !css.includes(file)) css.push(file)
  }
  if (src !== 'src/pages/Home.tsx') add(src)
  return { js, css }
}

const escapeAttr = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

const unescapeAttr = (text) => text.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

/**
 * The page's <head> in `lang` as SiteHead sets it in the browser (crawl-1114: every language's file had the English
 * title and description and no canonical or hreflang alternates until the app's script ran, so a search engine or a
 * link previewer reading the HTML saw the English page): the title, description, og:locale and, for an indexed page,
 * the canonical and the ten languages' alternates, all marked data-rh so Helmet in the browser takes them over. This
 * file answers ?lang=<lang> and a browser asking for <lang> first, so its canonical is ?lang=<lang> (English: the
 * bare address, the default). The link-preview tags (og:/twitter: title and description) follow in that language.
 */
function localHead(out, lang, head, previews = lang !== 'en') {
  const titleTag = head.title
  const title = unescapeAttr((titleTag.match(/<title[^>]*>([^<]*)<\/title>/) ?? [])[1] ?? '')
  const desc = (head.meta.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/) ?? [])[1]
  if (!title || desc === undefined) throw new Error(`prerender: ${lang}: the rendered head has no title or description`)
  let link = head.link
  if (lang !== 'en') link = link.replace(/(rel="canonical" href="[^"?]*)"/, `$1?lang=${lang}"`)
  if (!/<title>[^<]*<\/title>/.test(out)) throw new Error('prerender: the built page has no <title>')
  if (!/<meta name="description"[^>]*>/.test(out)) throw new Error('prerender: the built page has no description')
  out = out.replace(/<meta name="description"[^>]*>\s*/, '')
  out = out.replace(/<title>[^<]*<\/title>/, () => [titleTag, head.meta, link].filter(Boolean).join('\n    '))
  // og:url names the page in this language (site-audit-1116: every language's file said the bare, English address,
  // and Facebook takes a page's preview from its og:url).
  const canonical = (link.match(/rel="canonical" href="([^"]*)"/) ?? [])[1]
  if (canonical) out = out.replace(/(<meta property="og:url" content=")[^"]*"/, (_m, a) => `${a}${canonical}"`)
  if (previews) {
    const t = escapeAttr(title)
    for (const [re, value] of [
      [/(<meta property="og:title" content=")[^"]*"/, t],
      [/(<meta name="twitter:title" content=")[^"]*"/, t],
      [/(<meta property="og:description" content=")[^"]*"/, desc],
      [/(<meta name="twitter:description" content=")[^"]*"/, desc],
    ]) out = out.replace(re, (_m, a) => `${a}${value}"`)
  }
  // The card in this language (seo-1117, scripts/share-cards.mjs: public/images/share/<site|invite>-<lang>.jpg, the
  // poster and facts in the page's words); English keeps index.html's.
  if (lang !== 'en') {
    const card = /(\/images\/share\/(?:site|invite))-en\.jpg"/g
    if (/<meta property="og:image" content="[^"]*\/images\/share\//.test(out)) {
      if (!existsSync(resolve(dist, 'images', 'share', `site-${lang}.jpg`))) throw new Error(`prerender: no share card for ${lang}`)
      out = out.replace(card, `$1-${lang}.jpg"`)
      // Its alt text in this language too (live walk 1118: English in every file): the invite card's or the site's.
      const alt = escapeAttr(/<meta property="og:image" content="[^"]*\/images\/share\/invite-/.test(out) ? CARD_ALTS[lang].invite : CARD_ALTS[lang].site)
      out = out.replace(/(<meta property="og:image:alt" content=")[^"]*"/, (_m, a) => `${a}${alt}"`)
      out = out.replace(/(<meta name="twitter:image:alt" content=")[^"]*"/, (_m, a) => `${a}${alt}"`)
    }
  }
  return out
}

/** The built page with the rendered one in it, in `lang`. */
function compose(template, lang, rtl, html, styles, files, tags, previews = lang !== 'en') {
  const head = [
    // Shown only to the visitor whose page lang.js put in this language (lang.js runs before this is parsed).
    `<style>html:not([lang="${lang}"]) #root[data-pre]{visibility:hidden}</style>`,
    ...files.css.map((file) => `<link rel="stylesheet" crossorigin href="/${file}">`),
    ...styles
      .filter((s) => s.css)
      .map((s) => `<style data-emotion="${escapeAttr(`${s.key} ${s.ids.join(' ')}`)}" data-s="">${s.css.replace(/<\/style/gi, '<\\/style')}</style>`),
    ...files.js.map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`),
  ]
  // The app's own stylesheets, then the page's CSS, then Emotion's (the order the app puts them in), moved up to just
  // after lang.js: what the first paint waits for is asked for before the fonts and the scripts.
  const own = template.match(/<link rel="stylesheet"[^>]*>/g)
  if (!own) throw new Error('prerender: the built page has no stylesheet link')
  let out = template
  for (const link of own) out = out.replace(`${link}\n`, '').replace(link, '')
  const anchor = '<script src="/lang.js"></script>'
  if (!out.includes(anchor)) throw new Error('prerender: the built page has no lang.js')
  out = out.replace(anchor, () => `${anchor}\n    ${[...own, ...head].join('\n    ')}`)
  if (!out.includes('<div id="root"></div>')) throw new Error('prerender: the built page has no empty #root')
  out = out.replace('<div id="root"></div>', () => `<div id="root" data-pre="${lang}">${html}</div>`)
  out = out.replace(/<html lang="[^"]*"/, `<html lang="${lang}"${rtl ? ' dir="rtl"' : ''}`)
  return localHead(out, lang, tags, previews)
}

const rendered = new Map(PRERENDER_PAGES.map((p) => [p.path === '/' ? 'home' : p.path.slice(1), p]))
for (const slug of ROUTED) if (!rendered.has(slug) && !existsSync(resolve(dist, fileOf(slug)))) throw new Error(`prerender: no built file for ${slug}`)
for (const slug of rendered.keys()) if (slug !== 'home' && !ROUTED.includes(slug)) throw new Error(`prerender: ${slug} isn't in ROUTED (and vercel.json)`)

let count = 0
let bytes = 0
const offPages = []
for (const slug of ['home', ...ROUTED]) {
  const template = await readFile(resolve(dist, fileOf(slug)), 'utf8')
  const page = rendered.get(slug)
  if (page) await mkdir(resolve(dist, '_pre', slug), { recursive: true })
  if (!page) {
    // Its route is off (the app has no such page): no file, so vercel.json's rewrite finds none and the address is the
    // site's 404 (crawl2-1114; it was the app's page, which drew the 404 page with a 200).
    offPages.push(slug)
    continue
  }
  if (slug === 'support') await writeFile(resolve(dist, '_pre', slug, 'shell.html'), template)
  const files = pageFiles(page.src)
  for (const { code, rtl } of LANGUAGE_CODES) {
    const { html, styles, head: tags } = await render(page.path, code)
    if (!html.includes('<main')) throw new Error(`prerender: ${page.path} in ${code} rendered no <main>`)
    const out = compose(template, code, rtl, html, styles, files, tags)
    await writeFile(resolve(dist, '_pre', slug, `${baseOf(code)}.html`), out)
    count++
    bytes += out.length
  }
}
/*
 * Pages whose address carries a value (archive-speed-1116, App.tsx SHELLS): /join/<code> (a room's invite) and
 * /profile/<name>, drawn once per language at a stand-in address; the page shows nothing of the address until React has
 * taken it over (Join, Profile), so the one file answers every code and name (vercel.json: dist/_pre/<slug>/<lang>.html).
 * They kept www's empty page until its app had loaded (first paint ~3 s on a throttled phone). /join/<code> keeps the
 * invite's own link preview (dist/join/index.html, its English); a profile keeps the site's (dist/_host/www.html).
 */
let shellCount = 0
for (const shell of PRERENDER_SHELLS) {
  const join = shell.slug === 'join-code'
  const template = await readFile(resolve(dist, join ? 'join/index.html' : '_host/www.html'), 'utf8')
  const files = pageFiles(shell.src)
  await mkdir(resolve(dist, '_pre', shell.slug), { recursive: true })
  for (const { code, rtl } of LANGUAGE_CODES) {
    const { html, styles, head: tags } = await render(shell.path, code)
    if (!html.includes('<main')) throw new Error(`prerender: ${shell.path} in ${code} rendered no <main>`)
    if (html.includes(shell.path.split('/')[2])) throw new Error(`prerender: ${shell.path} in ${code} shows its stand-in`)
    const out = compose(template, code, rtl, html, styles, files, tags, join && code !== 'en')
    await writeFile(resolve(dist, '_pre', shell.slug, `${baseOf(code)}.html`), out)
    shellCount++
  }
}
if (shellCount) console.log(`prerender: ${shellCount} pages for every address (${PRERENDER_SHELLS.map((s) => s.slug).join(', ')} x ${LANGUAGE_CODES.length} languages)`)

/*
 * The Archive's and the Market's fixed pages (crawl2-1114): the host's own page (dist/_host/<host>.html, the app, its
 * body empty until the script runs) with that page's head in each language, as SiteHead and the page's Helmet set it
 * in the browser: dist/_host/pre/<host>/<page>/<lang>.html, which vercel.json's rewrites pick by ?lang= and the
 * browser's first language as for www. The link-preview tags follow (og:url the page's own address).
 */
/*
 * archive-speed-1116: and the page itself, in the state it has before its reads come back (renderHostBody), drawn
 * into #root (data-pre: hosts/start.tsx hydrates it when lang.js chose the same language; the rule keeps it hidden
 * otherwise, as on www). On a throttled phone the Archive's and the Market's pages showed nothing until the host's
 * app and its words had arrived (first paint ~2.3 s; www's drawn pages ~1.2 s).
 */
const bodies = {}
for (const host of ['archive', 'market']) {
  if (!HOSTS_ON[host]) continue
  execFileSync(process.execPath, [new URL(import.meta.url).pathname, process.argv[2] ?? 'dist', '--host-bodies', host], { stdio: 'inherit' })
  bodies[host] = JSON.parse(await readFile(resolve('dist-ssr', `bodies-${host}.json`), 'utf8'))
}
const withBody = (out, host, file, lang) => {
  const html = bodies[host]?.[`${file}/${lang}`]
  if (html === undefined) throw new Error(`prerender: no body for ${host} ${file} in ${lang}`)
  if (!out.includes('<div id="root"></div>')) throw new Error(`prerender: _host/${host}.html has no empty #root`)
  // The skin's variables (fonts, colours, the display type's size and leading), last in the head where hosts/start.tsx
  // puts them (it doesn't again when they're here): without them the drawn page painted in the browser's defaults and
  // moved when the app arrived.
  if (!SKIN_CSS || /<\/style/i.test(SKIN_CSS)) throw new Error('prerender: no usable SKIN_CSS')
  out = out.replace('</head>', () => `  <style data-ss-skin="">${SKIN_CSS}</style>\n    <style>html:not([lang="${lang}"]) #root[data-pre]{visibility:hidden}</style>\n  </head>`)
  return out.replace('<div id="root"></div>', () => `<div id="root" data-pre="${lang}">${html}</div>`)
}
let hostCount = 0
for (const [i, page] of HOST_PAGES.entries()) {
  if (!HOSTS_ON[page.host]) continue
  const template = await readFile(resolve(dist, '_host', `${page.host}.html`), 'utf8')
  const dir = resolve(dist, '_host', 'pre', page.host, page.file)
  await mkdir(dir, { recursive: true })
  for (const { code, rtl } of LANGUAGE_CODES) {
    const tags = await renderHostHead(i, code)
    const here = (tags.link.match(/rel="canonical" href="([^"]*)"/) ?? [])[1]
    if (!here) throw new Error(`prerender: ${page.path} in ${code} has no canonical`)
    let out = template.replace(/<html lang="[^"]*"/, `<html lang="${code}"${rtl ? ' dir="rtl"' : ''}`)
    if (!/<meta property="og:url" content="[^"]*"/.test(out)) throw new Error(`prerender: _host/${page.host}.html has no og:url`)
    out = out.replace(/(<meta property="og:url" content=")[^"]*"/, (_m, a) => `${a}${here}"`)
    // The title and description in every language's preview tags (English included: a page's own title).
    out = localHead(out, code, tags, true)
    out = withBody(out, page.host, page.file, code)
    await writeFile(resolve(dir, `${baseOf(code)}.html`), out)
    hostCount++
  }
}
/*
 * The Archive's ledger (www's page it serves too): drawn the same way, with www's ledger head in each language (noindex,
 * no canonical: SiteHead's UNLISTED), from its own file (dist/_host/archive-ledger.html); vercel.json picks the
 * language as above.
 */
if (bodies.archive && HOST_BODIES.some((p) => p.host === 'archive' && p.file === 'ledger')) {
  const template = (await readFile(resolve(dist, '_host', 'archive-ledger.html'), 'utf8')).replace(/\s*<meta name="robots"[^>]*>/, '')
  const dir = resolve(dist, '_host', 'pre', 'archive', 'ledger')
  await mkdir(dir, { recursive: true })
  for (const { code, rtl } of LANGUAGE_CODES) {
    const { head: tags } = await render('/ledger', code)
    if (!/name="robots" content="noindex"/.test(tags.meta)) throw new Error(`prerender: the ledger's head in ${code} isn't noindex`)
    let out = template.replace(/<html lang="[^"]*"/, `<html lang="${code}"${rtl ? ' dir="rtl"' : ''}`)
    out = localHead(out, code, tags, true)
    out = withBody(out, 'archive', 'ledger', code)
    await writeFile(resolve(dir, `${baseOf(code)}.html`), out)
    hostCount++
  }
}
if (hostCount) console.log(`prerender: ${hostCount} host pages drawn (the Archive's and the Market's fixed pages and the Archive's ledger x ${LANGUAGE_CODES.length} languages)`)

/*
 * On Vercel a file wins over every rewrite, and /<page> found dist/<page>/index.html before vercel.json's language
 * rewrites could pick _pre/<page>/<lang>.html (www-speed-1112, seen live): the page's own file goes (its English is
 * _pre/<page>/en.html, which vercel.json serves by default). /join's moves to _page/join.html (vercel.json: /join/<code>).
 */
for (const slug of ROUTED) {
  if (SHARED.has(slug)) continue
  const file = resolve(dist, fileOf(slug))
  if (MOVED[slug]) await rename(file, resolve(dist, MOVED[slug]))
  else await rm(file)
  const dir = resolve(dist, slug)
  if (!(await readdir(dir)).length) await rmdir(dir)
}
/*
 * A real 404 (crawl2-1114): vercel.json routes only the addresses the apps have, and Vercel answers any other with
 * dist/404.html and the status 404. It is www's app, which draws the 404 page (on the Archive's and the Market's hosts
 * its catch-all sends a www address to www first, as their own apps do: components/OffHost).
 */
await writeFile(resolve(dist, '404.html'), await readFile(resolve(dist, '_host/www.html'), 'utf8'))
if (offPages.length) console.log(`prerender: off, answered with the 404: ${offPages.join(', ')}`)
await rm(resolve(dist, '.vite'), { recursive: true, force: true })
console.log(`prerender: ${count} pages (${rendered.size} addresses x ${LANGUAGE_CODES.length} languages), ${Math.round(bytes / 1024)} KB of HTML`)
