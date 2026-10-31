import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, transformWithEsbuild, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** The address search engines know the site by (components/SiteHead.tsx). */
const ORIGIN = 'https://www.spysocial.app'

/**
 * Pages that join sitemap.xml only while their switch in src/lib/legalRelease.ts's LIVE is on (their routes work
 * either way): the roadmap with LIVE.roadmap; the Game Night rules with LIVE.gameNightRules and the transparency page
 * with LIVE.transparencyPage (those routes exist only while they're on). public/sitemap.xml lists every other page.
 */
const SWITCHED_PAGES: { path: string; live: string | null }[] = [
  // The Beta 2 playtester page: listed always (no switch).
  { path: '/beta', live: null },
  { path: '/roadmap', live: 'roadmap' },
  { path: '/game-night-rules', live: 'gameNightRules' },
  { path: '/transparency', live: 'transparencyPage' },
]

/**
 * One of the site's own modules as the source has it now (a .ts file with no imports: legalRelease.ts,
 * i18n/languages.ts). Read through esbuild rather than imported here, so `tsc -b` keeps this config's project to
 * this file and emits nothing into src/.
 */
async function siteModule(root: string, file: string): Promise<Record<string, unknown>> {
  const path = resolve(root, file)
  const { code } = await transformWithEsbuild(await readFile(path, 'utf8'), path, { loader: 'ts', format: 'esm' })
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
}

/** A page's entries as public/sitemap.xml writes them: the bare address and each language's, each with all the alternates. */
function entries(path: string, langs: string[]): string {
  const here = `${ORIGIN}${path}`
  const links = [
    ...langs.map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${here}?lang=${lang}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${here}"/>`,
  ].join('\n')
  return [here, ...langs.map((lang) => `${here}?lang=${lang}`)]
    .map((loc) => `  <url>\n    <loc>${loc}</loc>\n${links}\n  </url>\n`)
    .join('')
}

/** Adds the switched pages that are on to the built sitemap.xml (public/sitemap.xml, copied into the build as is). */
function switchedSitemap(): Plugin {
  let root = process.cwd()
  let outDir = resolve(root, 'dist')
  return {
    name: 'spysocial-switched-sitemap',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
    },
    async writeBundle() {
      const { LIVE } = (await siteModule(root, 'src/lib/legalRelease.ts')) as { LIVE: Record<string, unknown> }
      const on = SWITCHED_PAGES.filter((page) => page.live === null || LIVE[page.live] === true)
      if (!on.length) return
      const { LANGUAGES } = (await siteModule(root, 'src/i18n/languages.ts')) as { LANGUAGES: { code: string }[] }
      const file = resolve(outDir, 'sitemap.xml')
      const xml = await readFile(file, 'utf8')
      if (!xml.includes('</urlset>')) throw new Error(`${file} has no </urlset>`)
      const added = on.map((page) => entries(page.path, LANGUAGES.map((lang) => lang.code))).join('')
      await writeFile(file, xml.replace('</urlset>', `${added}</urlset>`))
    },
  }
}

/** HTML-escapes a value for an attribute or the title. */
const attr = (text: string) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * /beta's link preview. Reddit, Discord and the other link previewers don't run the page's script, so they'd see the
 * home page's title and card; the build writes dist/beta/index.html, the same page with /beta's title, description
 * (src/i18n/locales/en.ts: meta.titles.beta, meta.descriptions.beta) and its own large card (public/images/og-beta.jpg).
 * vercel.json serves it at /beta.
 */
function betaPreview(): Plugin {
  let root = process.cwd()
  let outDir = resolve(root, 'dist')
  return {
    name: 'spysocial-beta-preview',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
    },
    async writeBundle() {
      const { default: en } = (await siteModule(root, 'src/i18n/locales/en.ts')) as {
        default: { meta: { siteName: string; titles: { beta: string }; descriptions: { beta: string } } }
      }
      const title = attr(`${en.meta.titles.beta} · ${en.meta.siteName}`)
      const description = attr(en.meta.descriptions.beta)
      const url = `${ORIGIN}/beta`
      const image = `${ORIGIN}/images/og-beta.jpg`
      let html = await readFile(resolve(outDir, 'index.html'), 'utf8')
      const swaps: [RegExp, string][] = [
        [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
        [/(<meta name="description"[^>]*content=")[^"]*"/, `$1${description}"`],
        [/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`],
        [/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`],
        [/(<meta property="og:description" content=")[^"]*"/, `$1${description}"`],
        [/(<meta property="og:image" content=")[^"]*"/, `$1${image}"`],
        [/(<meta property="og:image:width" content=")[^"]*"/, '$11200"'],
        [/(<meta property="og:image:height" content=")[^"]*"/, '$1630"'],
        [/(<meta property="og:image:alt" content=")[^"]*"/, `$1${attr('SpySocial Beta 2 playtest: Thursday, November 19, 7-8 PM Eastern')}"`],
        [/(<meta name="twitter:card" content=")[^"]*"/, '$1summary_large_image"'],
        [/(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`],
        [/(<meta name="twitter:description" content=")[^"]*"/, `$1${description}"`],
        [/(<meta name="twitter:image" content=")[^"]*"/, `$1${image}"`],
      ]
      for (const [re, to] of swaps) {
        if (!re.test(html)) throw new Error(`betaPreview: index.html has no match for ${re}`)
        html = html.replace(re, to)
      }
      await mkdir(resolve(outDir, 'beta'), { recursive: true })
      await writeFile(resolve(outDir, 'beta', 'index.html'), html)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), switchedSitemap(), betaPreview()],
  // Built files live in /static/ (renamed from /assets/ on 2026-10-17, so no browser keeps a stale copy from before)
  build: { assetsDir: 'static' },
})
