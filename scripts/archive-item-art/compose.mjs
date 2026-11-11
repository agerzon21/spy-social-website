// Composes the Archive tiles for options A/B/C: the copy's own foil ring (the current tile's border, kept) round a
// new inside: the item alone (mask.py's cut-out) or, for a backdrop, its scene alone.
//   node compose.mjs <renders dir> <tiles dir (public/archive/art)> <out dir> <key>... (key: u-<item>-<serial>)
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(process.env.PLAYWRIGHT_PKG || '/Users/alexgerzon/Documents/Projects/spy-social/.claude/handoff/scratchpad/tools/pw/package.json');
const { chromium } = require('playwright');
const HSD = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1234/';
const HS = HSD + fs.readdirSync(HSD).find((d) => d.startsWith('chrome')) + '/chrome-headless-shell';
const [R, T, O, ...keys] = process.argv.slice(2);
fs.mkdirSync(O, { recursive: true });
const uri = (p, type) => `data:${type};base64,${fs.readFileSync(p).toString('base64')}`;
const IN = { x: 58, y: 58, s: 524 }; // the tile's inside on its 640 square

// What sits inside, per option. `item` is a transparent cut-out; `scene` a full-bleed picture (a backdrop alone).
const inside = {
  A: ({ item, scene }) => `
    <div class="f" style="background:radial-gradient(circle at 50% 36%, #4a5878 0%, #26314a 42%, #141b2b 78%, #0e131f 100%)"></div>
    ${scene ? `<img class="scene" src="${scene}">` : `
    <div class="floor" style="left:20%;right:20%;bottom:9%;height:8%;background:radial-gradient(closest-side, rgba(0,0,0,.55), rgba(0,0,0,0))"></div>
    <img class="item" src="${item}" style="max-width:80%;max-height:66%;top:50%;transform:translate(-50%,-52%);filter:drop-shadow(0 10px 14px rgba(0,0,0,.45))">`}`,
  B: ({ item, scene, serial }) => `
    <div class="f" style="background:#1d2436;background-image:repeating-linear-gradient(45deg, rgba(255,255,255,.025) 0 2px, transparent 2px 7px)"></div>
    <div class="card" style="left:9%;top:9%;width:82%;height:80%;transform:rotate(-2.2deg);background:#f2e9d0;box-shadow:0 14px 28px rgba(0,0,0,.55);border-radius:6px;overflow:hidden">
      <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(120,90,40,.07) 1px, transparent 1px);background-size:9px 9px"></div>
      <div style="position:absolute;left:6%;right:6%;top:6%;bottom:6%;border:2px solid rgba(23,32,51,.18);border-radius:3px"></div>
      ${scene ? `<img src="${scene}" style="position:absolute;left:9%;top:9%;width:82%;height:82%;object-fit:cover;border-radius:2px;box-shadow:0 2px 0 rgba(0,0,0,.15)">` :
      `<img class="item" src="${item}" style="max-width:78%;max-height:72%;bottom:12%;filter:drop-shadow(0 6px 6px rgba(23,32,51,.35))">`}
    </div>
    <div class="tag" style="right:6%;top:5%;transform:rotate(7deg);background:#c9a24a;color:#101522;font:700 30px/1 'Bebas Neue','Oswald',Impact,sans-serif;letter-spacing:2px;padding:10px 16px 8px 30px;border-radius:4px 10px 10px 4px;box-shadow:0 6px 10px rgba(0,0,0,.4)">
      <span style="position:absolute;left:10px;top:50%;width:10px;height:10px;margin-top:-5px;border-radius:50%;background:#1d2436"></span>#${String(serial).padStart(5, '0')}</div>`,
  C: ({ item, scene }) => `
    <div class="f" style="background:linear-gradient(#0d121d, #161d2c 64%, #0b0f18 64%, #121827)"></div>
    <div class="f" style="background:conic-gradient(from 160deg at 50% -8%, transparent 0deg, rgba(255,243,214,.16) 14deg, rgba(255,243,214,.16) 26deg, transparent 40deg)"></div>
    ${scene ? `
    <div class="card" style="left:16%;top:12%;width:68%;height:52%;background:#2a2016;padding:10px;box-shadow:0 0 0 3px #c9a24a, 0 16px 30px rgba(0,0,0,.6)"><img src="${scene}" style="width:100%;height:100%;object-fit:cover;display:block"></div>
    <div class="card" style="left:30%;top:69%;width:40%;height:9%;background:#34405a;border-radius:4px;box-shadow:inset 0 3px 0 rgba(255,255,255,.12)"></div>` : `
    <div class="card" style="left:27%;top:68%;width:46%;height:6%;background:linear-gradient(#5a6684,#34405a);border-radius:50%"></div>
    <div class="card" style="left:30%;top:71%;width:40%;height:30%;background:linear-gradient(90deg,#26304a,#3b4763 45%,#222b42)"></div>
    <div class="card" style="left:20%;top:8%;width:60%;height:63%;border:2px solid rgba(220,235,255,.22);border-bottom:none;border-radius:6px 6px 0 0;background:linear-gradient(115deg, rgba(255,255,255,.07) 0 18%, transparent 18% 26%, rgba(255,255,255,.04) 26% 30%, transparent 30%)"></div>
    <img class="item" src="${item}" style="max-width:60%;max-height:54%;bottom:31%;filter:drop-shadow(0 8px 10px rgba(0,0,0,.55))">`}`,
};

const b = await chromium.launch({ executablePath: HS });
const p = await b.newPage({ viewport: { width: 640, height: 640 } });
for (const key of keys) {
  const m = /^u-(.+)-(\d+)$/.exec(key);
  const [, code, serial] = m;
  const tile = uri(`${T}/${key}.webp`, 'image/webp');
  const itemPath = `${R}/${key}.item.png`;
  const scenePath = `${R}/${key}.scene.png`;
  const item = fs.existsSync(itemPath) ? uri(itemPath, 'image/png') : null;
  const scene = fs.existsSync(scenePath) ? uri(scenePath, 'image/png') : null;
  if (!item && !scene) { console.log('skip', key); continue; }
  for (const opt of Object.keys(inside)) {
    await p.setContent(`<html><head><style>
      body{margin:0;width:640px;height:640px;position:relative;overflow:hidden;background:#000}
      .ring{position:absolute;inset:0;width:640px;height:640px}
      .in{position:absolute;left:${IN.x}px;top:${IN.y}px;width:${IN.s}px;height:${IN.s}px;overflow:hidden;border-radius:4px}
      .f,.scene{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .card,.tag,.floor{position:absolute}
      .item{position:absolute;left:50%;transform:translateX(-50%);object-fit:contain}
    </style></head><body><img class="ring" src="${tile}"><div class="in">${inside[opt]({ item, scene, serial })}</div></body></html>`);
    await p.waitForTimeout(60);
    await p.screenshot({ path: `${O}/${opt}-${key}.png` });
  }
}
await b.close();
console.log('composed', keys.length);
