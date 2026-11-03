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
  // The Beta 2 playtester page: listed until the launch version (LIVE.launchSite sends /beta home); '!' means off.
  { path: '/beta', live: '!launchSite' },
  { path: '/roadmap', live: 'roadmap' },
  { path: '/game-night-rules', live: 'gameNightRules' },
  { path: '/transparency', live: 'transparencyPage' },
  // The Safety page joins with the launch text (a switch of its own, beside LIVE).
  { path: '/safety', live: 'ONLINE_SAFETY_TEXT' },
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
      const legal = (await siteModule(root, 'src/lib/legalRelease.ts')) as { LIVE: Record<string, unknown>; ONLINE_SAFETY_TEXT: boolean }
      const LIVE = { ...legal.LIVE, ONLINE_SAFETY_TEXT: legal.ONLINE_SAFETY_TEXT }
      const on = SWITCHED_PAGES.filter((page) =>
        page.live === null ? true : page.live.startsWith('!') ? LIVE[page.live.slice(1)] !== true : LIVE[page.live] === true,
      )
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

/** The site's pages that get their own link preview (title, description, address, card) in the built HTML. */
const PREVIEW_PAGES: { path: string; key: string }[] = [
  { path: '/support', key: 'faq' },
  { path: '/contact-us', key: 'contact' },
  { path: '/rules', key: 'rules' },
  { path: '/safety', key: 'safety' },
  { path: '/privacy', key: 'privacy' },
  { path: '/terms', key: 'terms' },
  { path: '/child-safety', key: 'childSafety' },
  { path: '/whats-new', key: 'whatsNew' },
  { path: '/roadmap', key: 'roadmap' },
  { path: '/delete-account', key: 'deleteAccount' },
  { path: '/transparency', key: 'transparency' },
  { path: '/game-night-rules', key: 'gameNightRules' },
  { path: '/ledger', key: 'ledger' },
  { path: '/beta', key: 'beta' },
]

/** The store listings (src/lib/stores.ts) and the social accounts (components/SocialLinks), for the structured data. */
const APP_STORE_URL = 'https://apps.apple.com/us/app/spysocial-a-party-game/id6746734390'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.gerz.spysocial'
const SAME_AS = [
  'https://www.instagram.com/spysocial.game',
  'https://www.tiktok.com/@spysocial.game',
  'https://www.youtube.com/@SpySocialGame',
  'https://x.com/spysocialgame',
  'https://www.threads.com/@spysocial.game',
  'https://discord.gg/B8MG3xrV6f',
]

type Site = {
  LIVE: Record<string, unknown>
  ONLINE_SAFETY_TEXT: boolean
  en: { meta: { siteName: string; defaultTitle: string; description: string; titles: Record<string, string>; descriptions: Record<string, string> } }
  langs: string[]
}
async function loadSite(root: string): Promise<Site> {
  const legal = (await siteModule(root, 'src/lib/legalRelease.ts')) as { LIVE: Record<string, unknown>; ONLINE_SAFETY_TEXT: boolean }
  const { default: en } = (await siteModule(root, 'src/i18n/locales/en.ts')) as { default: Site['en'] }
  const { LANGUAGES } = (await siteModule(root, 'src/i18n/languages.ts')) as { LANGUAGES: { code: string }[] }
  return { LIVE: legal.LIVE, ONLINE_SAFETY_TEXT: legal.ONLINE_SAFETY_TEXT, en, langs: LANGUAGES.map((l) => l.code) }
}

/** The app's structured data (schema.org): the publisher, the site and the app on both stores, free. Launch version only. */
function structuredData(site: Site): string {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${ORIGIN}/#org`,
        name: 'SpySocial',
        url: `${ORIGIN}/`,
        logo: `${ORIGIN}/images/logo.png`,
        email: 'support@spysocial.app',
        sameAs: SAME_AS,
      },
      { '@type': 'WebSite', '@id': `${ORIGIN}/#site`, name: 'SpySocial', url: `${ORIGIN}/`, inLanguage: site.langs, publisher: { '@id': `${ORIGIN}/#org` } },
      {
        '@type': 'MobileApplication',
        '@id': `${ORIGIN}/#app`,
        name: 'SpySocial',
        description: site.en.meta.description,
        url: `${ORIGIN}/`,
        image: `${ORIGIN}/images/og-launch.jpg`,
        operatingSystem: 'iOS, Android',
        applicationCategory: 'GameApplication',
        applicationSubCategory: 'Party game',
        genre: 'Social deduction',
        softwareVersion: '2.2',
        inLanguage: site.langs,
        installUrl: [APP_STORE_URL, PLAY_STORE_URL],
        sameAs: [APP_STORE_URL, PLAY_STORE_URL],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@id': `${ORIGIN}/#org` },
      },
    ],
  }
  // Inside <script>: no "</" can close it early.
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

/**
 * The launch version's <head> (LIVE.launchSite): the large link-preview card (public/images/og-launch.jpg, made from
 * Google Play's feature graphic by scripts/store-shots.mjs) on X / Twitter and everywhere else, and the structured data.
 */
function launchHead(): Plugin {
  let root = process.cwd()
  return {
    name: 'spysocial-launch-head',
    configResolved(config) {
      root = config.root
    },
    async transformIndexHtml(html) {
      const site = await loadSite(root)
      if (site.LIVE.launchSite !== true) return html
      const image = `${ORIGIN}/images/og-launch.jpg`
      const swaps: [RegExp, string][] = [
        [/(<meta property="og:image" content=")[^"]*"/, `$1${image}"`],
        [/(<meta property="og:image:width" content=")[^"]*"/, '$11200"'],
        [/(<meta property="og:image:height" content=")[^"]*"/, '$1630"'],
        [/(<meta property="og:image:alt" content=")[^"]*"/, `$1${attr('SpySocial: Spy Talk and Spy Sketch, five agents in a police line-up')}"`],
        [/(<meta name="twitter:card" content=")[^"]*"/, '$1summary_large_image"'],
        [/(<meta name="twitter:image" content=")[^"]*"/, `$1${image}"`],
      ]
      for (const [re, to] of swaps) {
        if (!re.test(html)) throw new Error(`launchHead: index.html has no match for ${re}`)
        html = html.replace(re, to)
      }
      return html.replace('</head>', `    ${structuredData(site)}\n  </head>`)
    },
  }
}

/**
 * Each page's link preview. Reddit, Discord, iMessage and the other link previewers don't run the page's script, so
 * they'd see the home page's title and card everywhere; the build writes dist/<page>/index.html for each page in
 * PREVIEW_PAGES, the same page with its English title and description (src/i18n/locales/en.ts: meta.titles,
 * meta.descriptions) and its own address. vercel.json serves each at its path. /beta keeps its own large card
 * (public/images/og-beta.jpg) until the launch version, which sends /beta home (its file is the home page's then);
 * a page whose route is off (its switch) gets the home page's file too.
 */
function pagePreviews(): Plugin {
  let root = process.cwd()
  let outDir = resolve(root, 'dist')
  return {
    name: 'spysocial-page-previews',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
    },
    async writeBundle() {
      const site = await loadSite(root)
      const { LIVE, en } = site
      const home = await readFile(resolve(outDir, 'index.html'), 'utf8')
      const routeOn: Record<string, boolean> = {
        '/safety': site.ONLINE_SAFETY_TEXT,
        '/transparency': LIVE.transparencyPage === true,
        '/game-night-rules': LIVE.gameNightRules === true,
        '/ledger': LIVE.mintedCollectibles === true,
        '/beta': LIVE.launchSite !== true,
      }
      for (const page of PREVIEW_PAGES) {
        let html = home
        if (routeOn[page.path] !== false) {
          const title = attr(`${en.meta.titles[page.key]} · ${en.meta.siteName}`)
          const description = attr(en.meta.descriptions[page.key] ?? en.meta.description)
          const swaps: [RegExp, string][] = [
            [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
            [/(<meta name="description"[^>]*content=")[^"]*"/, `$1${description}"`],
            [/(<meta property="og:url" content=")[^"]*"/, `$1${ORIGIN}${page.path}"`],
            [/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`],
            [/(<meta property="og:description" content=")[^"]*"/, `$1${description}"`],
            [/(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`],
            [/(<meta name="twitter:description" content=")[^"]*"/, `$1${description}"`],
          ]
          if (page.path === '/beta') {
            const image = `${ORIGIN}/images/og-beta.jpg?v=nov12`
            swaps.push(
              [/(<meta property="og:image" content=")[^"]*"/, `$1${image}"`],
              [/(<meta property="og:image:width" content=")[^"]*"/, '$11200"'],
              [/(<meta property="og:image:height" content=")[^"]*"/, '$1630"'],
              [/(<meta property="og:image:alt" content=")[^"]*"/, `$1${attr('SpySocial Beta 2 playtest: Thursday, November 12, 7-8 PM Eastern')}"`],
              [/(<meta name="twitter:card" content=")[^"]*"/, '$1summary_large_image"'],
              [/(<meta name="twitter:image" content=")[^"]*"/, `$1${image}"`],
            )
          }
          for (const [re, to] of swaps) {
            if (!re.test(html)) throw new Error(`pagePreviews: index.html has no match for ${re}`)
            html = html.replace(re, to)
          }
        }
        await mkdir(resolve(outDir, page.path.slice(1)), { recursive: true })
        await writeFile(resolve(outDir, page.path.slice(1), 'index.html'), html)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), launchHead(), switchedSitemap(), pagePreviews()],
  // Built files live in /static/ (renamed from /assets/ on 2026-10-17, so no browser keeps a stale copy from before)
  build: { assetsDir: 'static' },
})
