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
 * lang.js matches a browser's language; vercel.json's rewrites pick the file by ?lang= and the browser's first language), and the English one over the page's own file too (dist/<page>/index.html, dist/_page/<page>.html). Help
 * keeps a plain copy (_pre/support/shell.html) for a search link (?q=), which the page answers in the browser.
 *
 * Usage: node scripts/prerender.mjs dist
 */
import { existsSync } from 'node:fs'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// React's production build, as in the browser.
process.env.NODE_ENV = 'production'
const dist = resolve(process.argv[2] ?? 'dist')
const ssrEntry = resolve('dist-ssr/prerender.js')
if (!existsSync(ssrEntry)) throw new Error(`prerender: no ${ssrEntry} (run vite build --ssr src/prerender.tsx first)`)
const { render, PRERENDER_PAGES, LANGUAGE_CODES } = await import(pathToFileURL(ssrEntry).href)

/**
 * Every page vercel.json's language rewrites name: each needs a file per language, rendered or (its route off) the
 * page's own file as it is, so a rewrite never points at a missing file. Keep in step with vercel.json.
 */
const ROUTED = ['privacy', 'terms', 'rules', 'safety', 'game-night-rules', 'ledger', 'transparency', 'child-safety', 'contact-us', 'support', 'whats-new', 'roadmap', 'beta', 'delete-account']
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

/** The built page with the rendered one in it, in `lang`. */
function compose(template, lang, rtl, html, styles, files) {
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
  return out
}

const rendered = new Map(PRERENDER_PAGES.map((p) => [p.path === '/' ? 'home' : p.path.slice(1), p]))
for (const slug of ROUTED) if (!rendered.has(slug) && !existsSync(resolve(dist, fileOf(slug)))) throw new Error(`prerender: no built file for ${slug}`)
for (const slug of rendered.keys()) if (slug !== 'home' && !ROUTED.includes(slug)) throw new Error(`prerender: ${slug} isn't in ROUTED (and vercel.json)`)

let count = 0
let bytes = 0
for (const slug of ['home', ...ROUTED]) {
  const template = await readFile(resolve(dist, fileOf(slug)), 'utf8')
  await mkdir(resolve(dist, '_pre', slug), { recursive: true })
  const page = rendered.get(slug)
  if (!page) {
    // Its route is off: every language gets the page's file as it is (the app answers the address).
    for (const { code } of LANGUAGE_CODES) await writeFile(resolve(dist, '_pre', slug, `${baseOf(code)}.html`), template)
    continue
  }
  if (slug === 'support') await writeFile(resolve(dist, '_pre', slug, 'shell.html'), template)
  const files = pageFiles(page.src)
  for (const { code, rtl } of LANGUAGE_CODES) {
    const { html, styles } = await render(page.path, code)
    if (!html.includes('<main')) throw new Error(`prerender: ${page.path} in ${code} rendered no <main>`)
    const out = compose(template, code, rtl, html, styles, files)
    await writeFile(resolve(dist, '_pre', slug, `${baseOf(code)}.html`), out)
    if (code === 'en' && slug !== 'home') await writeFile(resolve(dist, fileOf(slug)), out)
    count++
    bytes += out.length
  }
}
await rm(resolve(dist, '.vite'), { recursive: true, force: true })
console.log(`prerender: ${count} pages (${rendered.size} addresses x ${LANGUAGE_CODES.length} languages), ${Math.round(bytes / 1024)} KB of HTML`)
