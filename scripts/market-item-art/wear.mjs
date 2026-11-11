// The Market's item-alone renders from the app's own bust and full-body drawing (lib/avatar at the app ref, bundled to
// noir.mjs by run.sh), no agent in the result (owner Nov 11):
//   glasses, accessories, hair colours, facial hair colours   the bust on three wearers + one without (mask.py, the
//                                                             Archive's: a pixel is the item's where all three agree,
//                                                             it differs from the one without and from the bare field)
//   hats, outfits                                             the full-body figure's own layers (an outfit's skin
//                                                             taken out by a second skin, finish.py)
//   outfit colours                                            the standard trench coat's layers in that colour
//   backdrops                                                 the scene alone, full frame (render.ts layer 'backdrop')
//   node wear.mjs <out dir> <codes.json> [px]
const N = await import(process.env.NOIR_BUNDLE);
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(process.env.PLAYWRIGHT_PKG || '/Users/alexgerzon/Documents/Projects/spy-social/.claude/handoff/scratchpad/tools/pw/package.json');
const { chromium } = require('playwright');
const HSD = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1234/';
const HS = HSD + fs.readdirSync(HSD).find((d) => d.startsWith('chrome')) + '/chrome-headless-shell';

const [OUT, CODES, PXS] = process.argv.slice(2);
const PX = Number(PXS || 1000);
fs.mkdirSync(OUT, { recursive: true });
const codes = JSON.parse(fs.readFileSync(CODES, 'utf8'));
const PLATES = ['#8e99ae', '#e8b64c', '#5a8f6a'];
// Three different wearers (skin, face, outfit colour differ; the hair differs too unless the job is the hair).
const WEARERS = [
  { v: 1, skin: 'skin_porcelain', hair: 'hair_afro', hair_color: 'hair_color_ginger', face: 'face_grin', outfit: 'outfit_suit', outfit_color: 'outfit_color_red' },
  { v: 1, skin: 'skin_ebony', hair: 'hair_bun', hair_color: 'hair_color_blonde', face: 'face_wink', outfit: 'outfit_hoodie', outfit_color: 'outfit_color_mint' },
  { v: 1, skin: 'skin_honey', hair: 'hair_locs', hair_color: 'hair_color_silver', face: 'face_cool', outfit: 'outfit_turtleneck', outfit_color: 'outfit_color_yellow' },
];
// A colour's swatch is the standard Her's long hair (hair) or a full beard (facial hair) in that colour, alone; one skin
// for all three wearers (a beard is drawn a little see-through over the skin).
const HAIR = { hair: 'hair_long', skin: 'skin_sand' };
const BEARD = { hair: 'hair_buzz', facial_hair: 'facial_hair_beard', skin: 'skin_sand' };

const svgs = [];
const jobs = [];
const layerJobs = [];
for (const code of codes) {
  const it = N.itemByCode(code);
  if (!it) { console.log('unknown', code); continue; }
  const key = code;
  if (it.slot === 'hat' || it.slot === 'outfit') { layerJobs.push({ key, slot: it.slot, code }); continue; }
  // An outfit colour: the standard agent's trench coat alone, dyed (the outfit's layers, as an outfit's).
  if (it.slot === 'outfit_color') { layerJobs.push({ key, slot: 'outfit', code: 'outfit_trench', colour: code }); continue; }
  if (it.slot === 'background') {
    // A Mythic backdrop moves in the app (kit MythicBackdrop): its still layers (the field and parts, the turning piece
    // at rest, the top) stacked in the bust's square; any other backdrop is the bust's own backdrop layer.
    const kind = N.mythicBackdropOf(code);
    if (kind) {
      const L = N.backdropLayers(kind, PLATES[0], 'bust', 'full');
      const sq = N.CROPS.bust;
      const put = (im) => (im ? im.svg.replace('<svg ', `<svg x="${im.box[0]}" y="${im.box[1]}" width="${im.box[2]}" height="${im.box[2]}" `) : '');
      svgs.push([`${key}.scene`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${sq[0]} ${sq[1]} ${sq[2]} ${sq[2]}">${put(L.base)}${put(L.turn)}${put(L.top)}</svg>`]);
    } else {
      svgs.push([`${key}.scene`, N.avatarXml({ config: { ...N.NEUTRAL_AVATAR, background: code }, spotlight: PLATES[0], layer: 'backdrop' })]);
    }
    continue;
  }
  let wear, without, same;
  if (it.slot === 'hair_color' || it.slot === 'facial_hair_color') {
    same = it.slot === 'hair_color' ? HAIR : { ...BEARD, hair_color: 'hair_color_black' };
    wear = { [it.slot]: code };
    // The one without: another colour far from every item's (a dark one, mulberry, is too near black on a beard).
    without = { [it.slot]: it.slot === 'hair_color' ? 'hair_color_black' : 'facial_hair_color_blonde' };
  } else if (it.slot === 'glasses' || it.slot === 'accessory') {
    // One short haircut for all three (in their own colours), so no hair hides an earring or a collar pin.
    same = { hair: 'hair_buzz' };
    wear = { [it.slot]: code };
    without = null;
  } else { console.log('skip slot', it.slot, code); continue; }
  jobs.push({ key, slot: it.slot, code });
  // An accessory held low or at the side (a telephone, a spyglass, a scarf) runs past the bust's square: the view widened
  // so the whole item shows (the drawing carries on past its edge; what all three agree on is still only the item).
  const view = it.slot === 'accessory' ? (x) => x.replace('viewBox="0 0 200 200"', 'viewBox="-30 -4 260 260"') : (x) => x;
  WEARERS.forEach((w, i) => svgs.push([`${key}.w${i}`, view(N.avatarXml({ config: { ...w, ...same, ...wear }, spotlight: PLATES[i] }))]));
  const base = { ...WEARERS[0], ...same };
  if (without) Object.assign(base, without); else delete base[it.slot];
  svgs.push([`${key}.base`, view(N.avatarXml({ config: base, spotlight: PLATES[0] }))]);
  svgs.push([`${key}.field`, view(N.avatarXml({ config: WEARERS[0], spotlight: PLATES[0], layer: 'backdrop' }))]);
}
fs.writeFileSync(OUT + '/jobs.json', JSON.stringify(jobs));

const b = await chromium.launch({ executablePath: HS });
const p = await b.newPage({ viewport: { width: PX, height: PX } });
for (const [name, xml] of svgs) {
  await p.setContent(`<html><body style="margin:0;background:#000">${xml.replace('<svg ', `<svg width="${PX}" height="${PX}" `)}</body></html>`);
  await p.screenshot({ path: `${OUT}/${name}.png`, clip: { x: 0, y: 0, width: PX, height: PX } });
}
// Hats and outfits: their own layers of the full-body figure (the Archive's layers.mjs, by code).
const LAYERS = {
  hat: (k) => k === 'hat' || k === 'hat:rim' || k === 'hat:motion',
  outfit: (k) => !k.endsWith(':cast') && k !== 'shadow' && !/head|hand|shoe|legLo|legUp/.test(k),
};
const LPX = 1200;
for (const j of layerJobs) {
  const config = { ...N.NEUTRAL_AVATAR, [j.slot]: j.code, ...(j.colour ? { outfit_color: j.colour } : {}) };
  const keep = LAYERS[j.slot];
  const still = (cfg) => {
    const parts = N.avatarParts({ config: cfg });
    const fig = N.fullBodyFigure(parts, PLATES[0], 'stand', { rim: '#ffffff', cast: 'scene' }, null);
    const W = N.solve(fig.rig, N.clipPose('stand', 0, fig.rig, true));
    return N.fullBodyStill({ ...fig, pieces: fig.pieces.filter((pc) => keep(pc.key)) }, W);
  };
  const v = N.FIGURE_VIEW;
  const wrap = (m) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${v.x} ${v.y} ${v.w} ${v.h}" width="${Math.round((LPX * v.w) / v.h)}" height="${LPX}">${m}</svg>`;
  const shots = [[wrap(still(config)), `${OUT}/${j.key}.layers.png`]];
  if (j.slot === 'outfit') shots.push([wrap(still({ ...config, skin: 'skin_ebony' })), `${OUT}/${j.key}.layers-skin2.png`]);
  for (const [x, path] of shots) {
    await p.setContent(`<html><body style="margin:0;background:transparent">${x}</body></html>`);
    await (await p.$('svg')).screenshot({ path, omitBackground: true });
  }
}
await b.close();
console.log('rendered', svgs.length, 'bust/scene,', layerJobs.length, 'layer jobs');
