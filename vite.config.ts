import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, transformWithEsbuild, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** The address search engines know the site by (components/SiteHead.tsx). */
const ORIGIN = 'https://www.spysocial.app'

/**
 * Pages that join sitemap.xml only while their switch in src/lib/legalRelease.ts's LIVE is on (their routes work
 * either way): the roadmap with LIVE.roadmap. public/sitemap.xml lists every other page.
 */
const SWITCHED_PAGES = [{ path: '/roadmap', live: 'roadmap' }]

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
      const on = SWITCHED_PAGES.filter((page) => LIVE[page.live] === true)
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), switchedSitemap()],
  // Built files live in /static/ (renamed from /assets/ on 2026-10-17, so no browser keeps a stale copy from before)
  build: { assetsDir: 'static' },
})
