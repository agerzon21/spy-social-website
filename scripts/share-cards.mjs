#!/usr/bin/env node
/**
 * The link-preview cards (seo-1117): what Discord, iMessage, WhatsApp, X, Slack and search show for a shared link.
 * Film Noir like the home page's hero: the cream wordmark, the hero's eyebrow and poster line, its facts, and the
 * line-up of Noir agents against the height wall with the spotlight on suspect 3 (src/components/home/LineUp.tsx).
 * Drawn by headless Chrome at 1200 x 630 CSS px and 2x (2400 x 1260), so a retina phone's card is sharp.
 *
 *   node scripts/share-cards.mjs <puppeteer-core module dir> <sharp module dir> [--play <out.jpg>]
 *
 * <puppeteer-core module dir>: a folder holding puppeteer-core (the site has no such dependency), e.g.
 *   ~/.npm/_npx/<hash>/node_modules/puppeteer-core; Chrome from /Applications (CHROME=<path> to use another).
 * <sharp module dir>: as scripts/store-shots.mjs takes it.
 *
 * Writes public/images/share/<kind>-<lang>.jpg for every language in src/i18n/languages.ts:
 * - site: the site's card (every www page, the Archive's and the Market's): eyebrow, "Trust no one." and the facts.
 * - invite: a room's invite (/join/<CODE>, /join?p=) and a Game Night's (/join/e/<ID>): the poster says "Join a game"
 *   (meta.titles.join), the page's own title in that language.
 * With --play <out.jpg>, also play.spysocial.app's card (English, the poster "Play in your browser", home.hero.browser)
 * for the app repo's public/ (its index.html is the browser version's page).
 * Every word comes from the site's locales, so a card says what the page says.
 */
import { createRequire } from 'node:module'
import { mkdir, readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { transform } from 'esbuild'

const args = process.argv.slice(2)
const playAt = args.indexOf('--play')
const playOut = playAt >= 0 ? resolve(args[playAt + 1]) : null
const [puppeteerArg, sharpArg] = args.filter((_a, i) => playAt < 0 || (i !== playAt && i !== playAt + 1))
if (!puppeteerArg || !sharpArg) {
  console.error('usage: node scripts/share-cards.mjs <puppeteer-core module dir> <sharp module dir> [--play <out.jpg>]')
  process.exit(1)
}
const require = createRequire(import.meta.url)
const puppeteer = require(resolve(puppeteerArg))
const sharp = require(resolve(sharpArg))
const root = resolve(new URL('..', import.meta.url).pathname)
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

/** A TypeScript module of the site (a locale, the languages), as vite.config.ts siteModule loads one. */
async function siteModule(file) {
  const path = resolve(root, file)
  const { code } = await transform(await readFile(path, 'utf8'), { loader: 'ts', format: 'esm' })
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
}

const dataUri = async (file, type) => `data:${type};base64,${(await readFile(resolve(root, file))).toString('base64')}`
const esc = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const FONTS = [
  ['Big Shoulders Display', '100 900', 'big-shoulders-display-latin.woff2', 'U+0000-00FF, U+0131, U+0152-0153, U+2000-206F'],
  ['Big Shoulders Display', '100 900', 'big-shoulders-display-latin-ext.woff2', 'U+0100-02BA, U+1E00-1E9F, U+1EF2-1EFF'],
  ['Barlow', '600', 'barlow-600-latin.woff2', 'U+0000-00FF, U+0131, U+0152-0153, U+2000-206F'],
  ['Barlow', '600', 'barlow-600-latin-ext.woff2', 'U+0100-02BA, U+1E00-1E9F, U+1EF2-1EFF'],
  ['Barlow', '700', 'barlow-700-latin.woff2', 'U+0000-00FF, U+0131, U+0152-0153, U+2000-206F'],
  ['Barlow', '700', 'barlow-700-latin-ext.woff2', 'U+0100-02BA, U+1E00-1E9F, U+1EF2-1EFF'],
  ['Oswald', '500 700', 'oswald-cyrillic.woff2', 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'],
]
/** The poster's and the copy's faces per script: the site's own where they draw it, else the Mac's heaviest system face. */
const SCRIPT_FACES = {
  'zh-Hans': { display: '"PingFang SC", "Hiragino Sans GB"', weight: 600, body: '"PingFang SC"', leading: 1.04 },
  hi: { display: '"Kohinoor Devanagari", "Devanagari Sangam MN"', weight: 700, body: '"Kohinoor Devanagari"', leading: 1.12 },
  bn: { display: '"Kohinoor Bangla", "Bangla Sangam MN"', weight: 700, body: '"Kohinoor Bangla"', leading: 1.12 },
  ar: { display: '"SF Arabic", "Geeza Pro", Damascus', weight: 800, body: '"SF Arabic", "Geeza Pro"', leading: 1.1 },
}

const SUSPECTS = ['f-cyan', 'f-orange', 'f-spy', 'f-lime', 'f-lilac']
const MARKS = ["7'", "6'", "5'", "4'", "3'", "2'", "1'"]

async function page({ lang, rtl, eyebrow, poster, mark, facts }) {
  const fontCss = (
    await Promise.all(
      FONTS.map(async ([family, weight, file, range]) => {
        const src = await dataUri(`src/assets/fonts/${file}`, 'font/woff2')
        return `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;src:url(${src}) format('woff2');unicode-range:${range}}`
      }),
    )
  ).join('\n')
  const wordmark = await dataUri('src/assets/brand/wordmark-cream-outline.svg', 'image/svg+xml')
  const agents = await Promise.all(SUSPECTS.map((name) => dataUri(`src/assets/home/agents/${name}.svg`, 'image/svg+xml')))
  const face = SCRIPT_FACES[lang]
  const display = face ? `${face.display}, sans-serif` : `'Big Shoulders Display', Oswald, 'Arial Narrow', sans-serif`
  const body = face ? `Barlow, ${face.body}, system-ui, sans-serif` : 'Barlow, system-ui, sans-serif'
  const weight = face?.weight ?? 900
  const leading = face?.leading ?? (lang === 'ru' ? 0.98 : 0.86)
  // Latin and Cyrillic posters are tracked capitals, as on the site; the other scripts have no case.
  const caps = face ? 'none' : 'uppercase'
  return `<!doctype html>
<html lang="${lang}"${rtl ? ' dir="rtl"' : ''}><head><meta charset="utf-8"><style>
${fontCss}
*{box-sizing:border-box}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#0a111c}
.card{position:relative;width:1200px;height:630px;isolation:isolate;
  background:radial-gradient(90% 75% at 72% -12%,rgba(78,140,255,.2),transparent 62%),
  radial-gradient(60% 60% at 0% 100%,rgba(255,149,0,.07),transparent 70%),
  linear-gradient(180deg,#0a111c 0%,#0c1726 62%,#0e1a2b 100%)}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.5;
  background:radial-gradient(130% 110% at 50% 45%,transparent 58%,rgba(3,6,12,.75) 100%)}
.copy{position:absolute;inset-block:0;inset-inline-start:0;width:560px;z-index:4;display:flex;flex-direction:column;
  padding-block:54px 50px;padding-inline:64px 0}
.wordmark{display:block;width:236px;height:auto;margin-inline-start:-4px}
.mid{margin-block:auto}
.eyebrow{display:flex;align-items:center;gap:14px;margin:0 0 18px;font:700 ${face ? 20 : 17}px/1.3 ${body};letter-spacing:${face ? '0.02em' : '0.2em'};
  text-transform:uppercase;color:#ffd166}
.eyebrow::before{content:'';flex:none;width:34px;height:2px;background:currentColor}
.poster{margin:0;font-family:${display};font-weight:${weight};line-height:${leading};letter-spacing:.005em;text-transform:${caps};color:#fefaea;
  font-size:150px;max-width:470px;text-wrap:balance;overflow-wrap:normal}
.poster .m{color:#ff9500}
.foot{display:flex;flex-wrap:wrap;align-items:center;gap:8px 20px;margin:0;padding:0;list-style:none;
  font:700 18px/1.2 ${body};color:rgba(254,250,234,.78)}
.foot li{display:flex;align-items:center;gap:10px}
.foot li::before{content:'';flex:none;width:7px;height:7px;background:#ff9500;transform:rotate(45deg)}
.url{margin-top:16px;font:600 17px/1 Barlow,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:rgba(254,250,234,.55)}
.url b{color:#fefaea;font-weight:700}
/* the line-up: the height wall, its marks, the spotlight on suspect 3, the agents, the floor */
.wall{--u:58px;position:absolute;top:0;bottom:0;inset-inline-end:0;width:650px;z-index:1;overflow:hidden;
  background:repeating-linear-gradient(0deg,transparent 0 calc(var(--u) - 2px),rgba(254,250,234,.12) calc(var(--u) - 2px) var(--u)) 0 calc(100% - 46px)/100% 100%,
  linear-gradient(180deg,#132338,#0d1828);
  -webkit-mask-image:linear-gradient(${rtl ? '270deg' : '90deg'},transparent 0,#000 110px)}
.marks{position:absolute;inset-inline-start:62px;bottom:46px;display:flex;flex-direction:column-reverse;
  font:800 15px/1 'Big Shoulders Display',sans-serif;letter-spacing:.06em;color:rgba(254,250,234,.42)}
.marks span{height:var(--u);padding-top:5px;direction:ltr;unicode-bidi:isolate}
.floor{position:absolute;inset-inline:0;bottom:0;height:46px;background:linear-gradient(180deg,#05080d,#000);border-top:2px solid #000}
.spot{position:absolute;top:-6%;bottom:30px;inset-inline-end:calc(316px - 150px);width:300px;z-index:3;
  background:linear-gradient(180deg,rgba(255,240,205,0),rgba(255,240,205,.15) 70%,rgba(255,240,205,.21));
  clip-path:polygon(41% 0,59% 0,100% 100%,0 100%);filter:blur(7px);mix-blend-mode:screen}
.pool{position:absolute;bottom:22px;inset-inline-end:calc(316px - 155px);width:310px;height:56px;z-index:2;border-radius:50%;
  background:radial-gradient(closest-side,rgba(255,240,205,.34),transparent)}
.suspects{position:absolute;top:0;bottom:0;inset-inline-end:-4px;width:640px;z-index:2;display:flex;justify-content:center;align-items:flex-end;padding-bottom:26px}
.suspect{position:relative;flex:none;width:176px;margin:0 -23px;display:flex;flex-direction:column;align-items:center}
.suspect img{display:block;width:100%;height:auto;filter:brightness(.6) saturate(.78)}
.suspect.lit img{filter:none}
.plate{position:relative;z-index:2;margin-bottom:8px;padding:6px 10px 4px;font:800 24px/1 'Big Shoulders Display',sans-serif;
  letter-spacing:.08em;background:#05080d;color:#fefaea;border:2px solid rgba(254,250,234,.5)}
</style></head><body>
<div class="card">
  <div class="wall" aria-hidden="true">
    <div class="marks">${MARKS.slice().reverse().map((m) => `<span>${m}</span>`).join('')}</div>
    <div class="floor"></div>
  </div>
  <div class="pool"></div>
  <div class="spot"></div>
  <div class="suspects">${agents
    .map((src, i) => `<div class="suspect${i === 2 ? ' lit' : ''}"><span class="plate">${i + 1}</span><img src="${src}" alt=""></div>`)
    .join('')}</div>
  <div class="copy">
    <img class="wordmark" src="${wordmark}" alt="SpySocial">
    <div class="mid">
      <p class="eyebrow">${esc(eyebrow)}</p>
      <h1 class="poster">${esc(poster)}<span class="m">${esc(mark)}</span></h1>
    </div>
    <ul class="foot">${facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
    <div class="url" dir="ltr"><b>spysocial</b>.app</div>
  </div>
  <div class="grain"></div>
</div>
<script>
// The poster at the largest size that keeps it to the column (470 px) and three lines (two for a short one).
(async () => {
  await document.fonts.ready
  const el = document.querySelector('.poster')
  const room = 290
  let size = 168
  const fits = () => el.scrollWidth <= 470 && el.getBoundingClientRect().height <= room
  el.style.fontSize = size + 'px'
  while (size > 40 && !fits()) { size -= 2; el.style.fontSize = size + 'px' }
  document.body.dataset.ready = String(size)
})()
</script>
</body></html>`
}

const { LANGUAGES } = await siteModule('src/i18n/languages.ts')
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars', '--font-render-hinting=none'] })
const tab = await browser.newPage()
await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 })

async function card(spec, out) {
  await tab.setContent(await page(spec), { waitUntil: 'load' })
  await tab.waitForFunction(() => document.body.dataset.ready, { timeout: 15000 })
  const size = await tab.evaluate(() => document.body.dataset.ready)
  const png = await tab.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } })
  // 2400 x 1260; 4:4:4 keeps the type's edges clean (orange on navy smears at 4:2:0). WhatsApp drops a card whose
  // image is much over 300 KB, so the quality steps down until it fits.
  let quality = 86
  let jpg
  for (;;) {
    jpg = await sharp(png).jpeg({ quality, mozjpeg: true, chromaSubsampling: '4:4:4' }).toBuffer()
    if (jpg.length <= 290_000 || quality <= 70) break
    quality -= 2
  }
  await sharp(jpg).toFile(out)
  const meta = await sharp(out).metadata()
  console.log(`${out.replace(root + '/', '')}: ${meta.width}x${meta.height}, ${Math.round(jpg.length / 1024)} KB, q${quality}, poster ${size}px`)
}

const outDir = join(root, 'public', 'images', 'share')
await mkdir(outDir, { recursive: true })
for (const { code, rtl } of LANGUAGES) {
  const { default: t } = await siteModule(`src/i18n/locales/${code}.ts`)
  const hero = t.home.hero
  const common = { lang: code, rtl, eyebrow: hero.eyebrow, facts: hero.facts }
  await card({ ...common, poster: hero.title, mark: hero.titleMark }, join(outDir, `site-${code}.jpg`))
  await card({ ...common, poster: t.meta.titles.join, mark: hero.titleMark }, join(outDir, `invite-${code}.jpg`))
  if (playOut && code === 'en') await card({ ...common, poster: hero.browser, mark: hero.titleMark }, playOut)
}
await browser.close()
