// Item-alone from the full-body figure's own layers (lib/avatar/fullBody pieces, with the copy's dye): a hat's
// 'hat' pieces, an accessory's 'pet' pieces, an outfit's clothing pieces (torso, arms, over-arms, hips, skirt) with
// the skin pieces (head, hands) left out. Rim and lit passes kept, the cast shadows left out. Transparent PNG.
//   node gen3.mjs <out dir> <uniques.json> [px]
const N = await import(process.env.NOIR_BUNDLE);
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(process.env.PLAYWRIGHT_PKG || '/Users/alexgerzon/Documents/Projects/spy-social/.claude/handoff/scratchpad/tools/pw/package.json');
const { chromium } = require('playwright');
const HSD = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1234/';
const HS = HSD + fs.readdirSync(HSD).find((d) => d.startsWith('chrome')) + '/chrome-headless-shell';
const [OUT, UNIQ, PXS] = process.argv.slice(2);
const PX = Number(PXS || 1200);
const PLATE = '#8e99ae';
const BASE = { ...N.NEUTRAL_AVATAR };
const LAYERS = {
  hat: (k) => k === 'hat' || k === 'hat:rim' || k === 'hat:motion',
  accessory: (k) => k === 'pet' || k === 'pet:rim' || k === 'pet:motion',
  outfit: (k) => !k.endsWith(':cast') && k !== 'shadow' && !/head|hand|shoe|legLo|legUp/.test(k),
};
const live = JSON.parse(fs.readFileSync(UNIQ, 'utf8')).copies;
const jobs = [];
for (const c of live) {
  const it = N.itemByCode(c.item_code);
  if (!it || !LAYERS[it.slot]) continue;
  jobs.push({ key: `u-${c.item_code}-${c.serial}`, slot: it.slot, code: c.item_code, mark: { ...N.markSeedOf(null, c.float), pattern: c.pattern, serial: c.serial } });
}
for (const code of [...new Set(jobs.map((j) => j.code))]) jobs.push({ key: `l-${code}`, slot: N.itemByCode(code).slot, code, mark: null });

const b = await chromium.launch({ executablePath: HS });
const p = await b.newPage({ viewport: { width: PX, height: PX } });
const report = [];
for (const j of jobs) {
  const config = { ...BASE, [j.slot]: j.code };
  const parts = N.avatarParts({ config });
  const dye = j.mark ? N.noirDyeOf(parts, { [j.slot]: j.mark }) : null;
  const fig = N.fullBodyFigure(parts, PLATE, 'stand', { rim: '#ffffff', cast: 'scene' }, dye);
  const W = N.solve(fig.rig, N.clipPose('stand', 0, fig.rig, true));
  const keep = LAYERS[j.slot];
  const kept = fig.pieces.filter((pc) => keep(pc.key));
  const markup = N.fullBodyStill({ ...fig, pieces: kept }, W);
  const v = N.FIGURE_VIEW;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${v.x} ${v.y} ${v.w} ${v.h}" width="${Math.round((PX * v.w) / v.h)}" height="${PX}">${markup}</svg>`;
  fs.writeFileSync(`${OUT}/${j.key}.layers.svg`, svg);
  const shots = [[svg, `${OUT}/${j.key}.layers.png`]];
  if (j.slot === 'outfit') {
    // The torso piece carries the neck: the same layers on another skin, so finish.py drops what changed (the skin).
    const p2 = N.avatarParts({ config: { ...config, skin: 'skin_ebony' } });
    const d2 = j.mark ? N.noirDyeOf(p2, { [j.slot]: j.mark }) : null;
    const f2 = N.fullBodyFigure(p2, PLATE, 'stand', { rim: '#ffffff', cast: 'scene' }, d2);
    const m2 = N.fullBodyStill({ ...f2, pieces: f2.pieces.filter((pc) => keep(pc.key)) }, N.solve(f2.rig, N.clipPose('stand', 0, f2.rig, true)));
    shots.push([svg.replace(markup, m2), `${OUT}/${j.key}.layers-skin2.png`]);
  }
  for (const [x, path] of shots) {
    await p.setContent(`<html><body style="margin:0;background:transparent">${x}</body></html>`);
    await (await p.$('svg')).screenshot({ path, omitBackground: true });
  }
  report.push(`${j.key} ${kept.map((x) => x.key).join(',')}`);
}
await b.close();
console.log(report.join('\n'));
