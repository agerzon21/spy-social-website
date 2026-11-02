#!/usr/bin/env node
/**
 * Copies the 2.2 store screenshots into the site (the home page's New in 2.2 rail, LIVE.launchSite) and makes the
 * launch link-preview card (public/images/og-launch.jpg) from Google Play's feature graphic.
 *
 *   node scripts/store-shots.mjs <store-shots dir> <sharp module dir>
 *
 * <store-shots dir>: the store-shots tool's output (apple/iphone-6.9/<lang>/NN-name.png, google/feature-graphic.png),
 * e.g. ~/Downloads/SpySocial-2.2-store-shots-u24-draft (the Nov 12 re-run on the store build replaces it).
 * <sharp module dir>: a folder holding sharp (the site has no sharp dependency), e.g. ~/.npm/_npx/<hash>/node_modules/sharp.
 *
 * Writes src/assets/shots22/<lang>/<name>-<width>.webp (300 and 600 px wide, captions are baked into the shots, so
 * each language gets its own) for the shots in SHOTS, in every language folder found.
 */
import { createRequire } from 'node:module'
import { mkdir, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const [srcArg, sharpArg] = process.argv.slice(2)
if (!srcArg || !sharpArg) {
  console.error('usage: node scripts/store-shots.mjs <store-shots dir> <sharp module dir>')
  process.exit(1)
}
const require = createRequire(import.meta.url)
const sharp = require(resolve(sharpArg))
const root = resolve(new URL('..', import.meta.url).pathname)
const src = resolve(srcArg)

/** The shots the rail shows, in its order (the store order without Spy Notes, Vote, Final Guess and Game Over). */
export const SHOTS = ['01-talk', '02-sketch', '07-online', '08-gamenight', '09-market', '10-friends']
const WIDTHS = [300, 600]

const phoneDir = join(src, 'apple', 'iphone-6.9')
const langs = (await readdir(phoneDir, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name)
let n = 0
for (const lang of langs) {
  const out = join(root, 'src', 'assets', 'shots22', lang)
  await mkdir(out, { recursive: true })
  for (const shot of SHOTS) {
    const file = join(phoneDir, lang, `${shot}.png`)
    if (!existsSync(file)) throw new Error(`missing ${file}`)
    for (const w of WIDTHS) {
      await sharp(file).resize({ width: w }).webp({ quality: 78, effort: 6 }).toFile(join(out, `${shot.slice(3)}-${w}.webp`))
      n++
    }
  }
}
console.log(`${n} shots written for ${langs.join(', ')}`)

// The link-preview card: the feature graphic (1024 x 500) at 1200 wide, its top and bottom rows stretched to 630.
const fg = join(src, 'google', 'feature-graphic.png')
const scaled = await sharp(fg).resize({ width: 1200 }).toBuffer({ resolveWithObject: true })
const pad = 630 - scaled.info.height
await sharp(scaled.data)
  .extend({ top: Math.floor(pad / 2), bottom: Math.ceil(pad / 2), extendWith: 'copy' })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(join(root, 'public', 'images', 'og-launch.jpg'))
console.log('public/images/og-launch.jpg written')
