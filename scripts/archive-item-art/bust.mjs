// Item-alone pictures from the app's own bust drawing (prep/u60.3 lib/avatar, bundled to noir.mjs):
// for each wearable copy, the bust is drawn on three different agents wearing it, the first agent without it, and
// the bare backdrop; a pixel is the item's where all three wearers agree, it differs from the agent without the
// item, and it isn't the backdrop (mask.py). Also the "See it worn" busts on the two standard agents.
const N = await import(process.env.NOIR_BUNDLE);
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(process.env.PLAYWRIGHT_PKG || '/Users/alexgerzon/Documents/Projects/spy-social/.claude/handoff/scratchpad/tools/pw/package.json');
const { chromium } = require('playwright');
const HSD = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1234/';
const HS = HSD + fs.readdirSync(HSD).find((d) => d.startsWith('chrome')) + '/chrome-headless-shell';

const OUT = process.argv[2];
const PX = Number(process.argv[3] || 1600);
fs.mkdirSync(OUT, { recursive: true });

// The two standard agents for "See it worn": the app's neutral agent (NEUTRAL_AVATAR) and the same agent with long hair.
export const STANDARD = {
  m: { ...N.NEUTRAL_AVATAR },
  f: { ...N.NEUTRAL_AVATAR, hair: 'hair_long' },
};
// Three different wearers (skin, hair, its colour, face, outfit colour all differ).
const WEARERS = [
  { v: 1, skin: 'skin_porcelain', hair: 'hair_afro', hair_color: 'hair_color_ginger', face: 'face_grin', outfit: 'outfit_suit', outfit_color: 'outfit_color_red' },
  { v: 1, skin: 'skin_ebony', hair: 'hair_bun', hair_color: 'hair_color_blonde', face: 'face_wink', outfit: 'outfit_hoodie', outfit_color: 'outfit_color_mint' },
  { v: 1, skin: 'skin_honey', hair: 'hair_locs', hair_color: 'hair_color_silver', face: 'face_cool', outfit: 'outfit_turtleneck', outfit_color: 'outfit_color_yellow' },
];
const PLATE = '#8e99ae';
// The whole bust for every kind (QA Nov 11: the app's tight crops cut the head under glasses and the hat's crown on the site).
const CROP = { hat: 'bust', glasses: 'bust', outfit: 'bust', accessory: 'bust' };
// Each wearer on its own spotlight, so the body's rim and cast (its colour) never agree across them.
const PLATES = process.env.PLATES ? process.env.PLATES.split(',') : [PLATE, PLATE, PLATE];

const live = JSON.parse(fs.readFileSync(process.argv[4], 'utf8')).copies.filter((c) => !process.env.ONLY || process.env.ONLY.split(',').includes(`u-${c.item_code}-${c.serial}`));
const WEAR = { hat: 'hat', glasses: 'glasses', outfit: 'outfit', accessory: 'accessory' };
const jobs = [];
for (const c of live) {
  const it = N.itemByCode(c.item_code);
  if (!it || !WEAR[it.slot]) continue;
  const mk = { ...N.markSeedOf(null, c.float), pattern: c.pattern, serial: c.serial };
  jobs.push({ key: `u-${c.item_code}-${c.serial}`, slot: it.slot, code: c.item_code, unique: { [it.slot]: mk } });
}
for (const code of [...new Set(jobs.map((j) => j.code))]) jobs.push({ key: `l-${code}`, slot: N.itemByCode(code).slot, code, unique: null });

const svgs = [];
for (const j of jobs) {
  const same = j.slot === 'outfit' ? { outfit_color: 'outfit_color_slate' } : {};
  WEARERS.forEach((w, i) => svgs.push([`${j.key}.w${i}`, N.avatarXml({ config: { ...w, ...same, [j.slot]: j.code }, unique: j.unique, spotlight: PLATES[i] })]));
  const without = { ...WEARERS[0], ...same };
  if (j.slot === 'outfit') without.outfit = 'outfit_trench'; else delete without[j.slot];
  svgs.push([`${j.key}.base`, N.avatarXml({ config: without, spotlight: PLATES[0] })]);
  svgs.push([`${j.key}.field`, N.avatarXml({ config: WEARERS[0], spotlight: PLATES[0], layer: 'backdrop' })]);
  for (const [g, cfg] of Object.entries(STANDARD)) {
    const wear = { ...cfg, [j.slot]: j.code };
    // Bare (owner Nov 11: the worn view stands in the case's own dark room, never on a light field): the figure alone.
    svgs.push([`${j.key}.worn-${g}`, N.avatarXml({ config: wear, unique: j.unique, spotlight: PLATE, crop: CROP[j.slot], bare: true })]);
  }
}
for (const [g, cfg] of Object.entries(STANDARD)) svgs.push([`plain-${g}`, N.avatarXml({ config: cfg, spotlight: PLATE })]);
// A backdrop's item alone is its scene with no agent (render.ts layer 'backdrop'); worn: the standard agents in it.
for (const c of live) {
  const it = N.itemByCode(c.item_code);
  if (!it || it.slot !== 'background') continue;
  const unique = { background: { ...N.markSeedOf(null, c.float), pattern: c.pattern, serial: c.serial } };
  const key = `u-${c.item_code}-${c.serial}`;
  svgs.push([`${key}.scene`, N.avatarXml({ config: { ...STANDARD.m, background: c.item_code }, unique, spotlight: PLATE, layer: 'backdrop' })]);
  for (const [g, cfg] of Object.entries(STANDARD)) svgs.push([`${key}.worn-${g}`, N.avatarXml({ config: { ...cfg, background: c.item_code }, unique, spotlight: PLATE })]);
}
fs.writeFileSync(OUT + '/jobs.json', JSON.stringify(jobs.map((j) => ({ key: j.key, slot: j.slot, code: j.code }))));

const b = await chromium.launch({ executablePath: HS });
const p = await b.newPage({ viewport: { width: PX, height: PX } });
for (const [name, xml] of svgs) {
  const sized = xml.replace('<svg ', `<svg width="${PX}" height="${PX}" `);
  const clear = /\.worn-/.test(name) && !name.includes('background_');
  await p.setContent(`<html><body style="margin:0;background:${clear ? 'transparent' : '#000'}">${sized}</body></html>`);
  await p.screenshot({ path: `${OUT}/${name}.png`, clip: { x: 0, y: 0, width: PX, height: PX }, omitBackground: clear });
}
await b.close();
console.log('rendered', svgs.length);
