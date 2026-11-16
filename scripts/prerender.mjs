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
import { mkdir, readdir, readFile, rm, rmdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// React's production build, as in the browser.
process.env.NODE_ENV = 'production'
const dist = resolve(process.argv[2] ?? 'dist')
const ssrEntry = resolve('dist-ssr/prerender.js')
if (!existsSync(ssrEntry)) throw new Error(`prerender: no ${ssrEntry} (run vite build --ssr src/prerender.tsx first)`)
const { render, renderHostHead, renderSiteHead, invitePreviews, HOST_PAGES, HOSTS_ON, PRERENDER_PAGES, INVITE_SHELL, LANGUAGE_CODES } = await import(pathToFileURL(ssrEntry).href)

/**
 * Every page vercel.json's language rewrites name: each needs a file per language, rendered or (its route off) the
 * page's own file as it is, so a rewrite never points at a missing file. Keep in step with vercel.json.
 */
const ROUTED = ['privacy', 'terms', 'rules', 'safety', 'game-night-rules', 'ledger', 'transparency', 'child-safety', 'contact-us', 'support', 'whats-new', 'roadmap', 'beta', 'delete-account', 'join']
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
  if (previews) {
    const t = escapeAttr(title)
    for (const [re, value] of [
      [/(<meta property="og:title" content=")[^"]*"/, t],
      [/(<meta name="twitter:title" content=")[^"]*"/, t],
      [/(<meta property="og:description" content=")[^"]*"/, desc],
      [/(<meta name="twitter:description" content=")[^"]*"/, desc],
    ]) out = out.replace(re, (_m, a) => `${a}${value}"`)
  }
  return out
}

/** The built page with the rendered one in it, in `lang`. */
function compose(template, lang, rtl, html, styles, files, tags) {
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
  return localHead(out, lang, tags)
}

/**
 * An invite's link preview in the page's language (join-speed-1116): the card's title, description and picture's
 * words (the picture itself, og-launch.jpg, is vite.config.ts INVITE_PREVIEWS'). Nothing from the address: no code,
 * no night, no name.
 */
function invitePreview(out, { title, description, imageAlt }) {
  const t = escapeAttr(title)
  const d = escapeAttr(description)
  const swaps = [
    [/(<meta property="og:title" content=")[^"]*"/, t],
    [/(<meta name="twitter:title" content=")[^"]*"/, t],
    [/(<meta property="og:description" content=")[^"]*"/, d],
    [/(<meta name="twitter:description" content=")[^"]*"/, d],
    ...(imageAlt ? [[/(<meta property="og:image:alt" content=")[^"]*"/, escapeAttr(imageAlt)]] : []),
  ]
  for (const [re, value] of swaps) {
    if (!re.test(out)) throw new Error(`prerender: an invite page has no match for ${re}`)
    out = out.replace(re, (_m, a) => `${a}${value}"`)
  }
  return out
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
    let out = compose(template, code, rtl, html, styles, files, tags)
    if (slug === 'join') out = invitePreview(out, (await invitePreviews(code)).room)
    await writeFile(resolve(dist, '_pre', slug, `${baseOf(code)}.html`), out)
    count++
    bytes += out.length
  }
}
/*
 * Every room's invite, /join/<code> (join-speed-1116): it was the bare app (_page/join.html), so the page waited for
 * the app's script (LCP ~2.6 s on a throttled phone) and its card was English only. Now one page per language drawn
 * at a stand-in address (App.tsx INVITE_SHELL; pages/Join leaves the code out until React has the address, and
 * public/lang.js puts it on the plate before the first paint): dist/_pre/join-room/<lang>.html, which vercel.json
 * picks by ?lang= and the browser's first language as for /join. Its preview card in that language.
 */
{
  const template = await readFile(resolve(dist, fileOf('join')), 'utf8')
  const files = pageFiles(INVITE_SHELL.src)
  await mkdir(resolve(dist, '_pre', INVITE_SHELL.file), { recursive: true })
  for (const { code, rtl } of LANGUAGE_CODES) {
    const { html, styles, head: tags } = await render(INVITE_SHELL.path, code)
    if (!html.includes('<main')) throw new Error(`prerender: ${INVITE_SHELL.path} in ${code} rendered no <main>`)
    if (html.includes(INVITE_SHELL.path)) throw new Error(`prerender: ${INVITE_SHELL.path} in ${code} shows its stand-in address`)
    const out = invitePreview(compose(template, code, rtl, html, styles, files, tags), (await invitePreviews(code)).room)
    await writeFile(resolve(dist, '_pre', INVITE_SHELL.file, `${baseOf(code)}.html`), out)
    count++
    bytes += out.length
  }
}
/*
 * A Game Night's invite, /join/e/<id> (join-speed-1116): its page loads the night from the server, so only its <head>
 * is drawn here, in each language (SiteHead's tags and the night's card in that language; the body stays the app's,
 * as before): dist/_pre/join-event/<lang>.html, picked by vercel.json like the room's.
 */
{
  const template = await readFile(resolve(dist, 'join/e/index.html'), 'utf8')
  await mkdir(resolve(dist, '_pre', 'join-event'), { recursive: true })
  for (const { code, rtl } of LANGUAGE_CODES) {
    const tags = await renderSiteHead('/join/e/-', code)
    let out = template.replace(/<html lang="[^"]*"/, `<html lang="${code}"${rtl ? ' dir="rtl"' : ''}`)
    const { room, event } = await invitePreviews(code)
    out = invitePreview(localHead(out, code, tags, true), { ...event, imageAlt: room.imageAlt })
    await writeFile(resolve(dist, '_pre', 'join-event', `${baseOf(code)}.html`), out)
  }
}
/*
 * The Archive's and the Market's fixed pages (crawl2-1114): the host's own page (dist/_host/<host>.html, the app, its
 * body empty until the script runs) with that page's head in each language, as SiteHead and the page's Helmet set it
 * in the browser: dist/_host/pre/<host>/<page>/<lang>.html, which vercel.json's rewrites pick by ?lang= and the
 * browser's first language as for www. The link-preview tags follow (og:url the page's own address).
 */
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
    await writeFile(resolve(dir, `${baseOf(code)}.html`), out)
    hostCount++
  }
}
if (hostCount) console.log(`prerender: ${hostCount} host pages' heads (the Archive's and the Market's fixed pages x ${LANGUAGE_CODES.length} languages)`)

/*
 * On Vercel a file wins over every rewrite, and /<page> found dist/<page>/index.html before vercel.json's language
 * rewrites could pick _pre/<page>/<lang>.html (www-speed-1112, seen live): the page's own file goes (its English is
 * _pre/<page>/en.html, which vercel.json serves by default). /join's too: /join/<code> has its own (join-room, above).
 */
for (const slug of ROUTED) {
  if (SHARED.has(slug)) continue
  const file = resolve(dist, fileOf(slug))
  await rm(file)
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
console.log(`prerender: ${count} pages (${rendered.size + 1} addresses with /join/<code> x ${LANGUAGE_CODES.length} languages), ${Math.round(bytes / 1024)} KB of HTML`)
