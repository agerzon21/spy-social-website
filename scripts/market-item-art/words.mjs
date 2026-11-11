// The Market's item lines (market-art-1111): every avatar item's and title's description in the ten languages, from the
// app's own localization/translations/itemDescriptions at <app ref> (one line under the name on an item's card), and the
// titles named on the server (dynamic-titles.json: titles.meta name / names / desc / descs, read Nov 11) whose names the
// ledger doesn't send yet. Writes src/pages/market/words/<lang>.json: { d: { "avatar:<code>" | "title:<code>" |
// "intercept:<tier>": line },
// n: { "title:<code>": name } }.
//   node scripts/market-item-art/words.mjs <app ref> [app repo]
import { execSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = join(HERE, '..', '..');
const [ref, app = join(SITE, '..', 'spy-social')] = process.argv.slice(2);
if (!ref) { console.error('usage: node words.mjs <app ref> [app repo]'); process.exit(2); }
const work = mkdtempSync(join(HERE, '.words.'));
try {
  execSync(`git -C "${app}" archive "${ref}" localization/translations/itemDescriptions localization/languages.ts | tar -x -C "${work}"`);
  writeFileSync(join(work, 'entry.ts'), "export { ITEM_DESCRIPTION_WORDS } from './localization/translations/itemDescriptions';\n");
  const esbuild = createRequire(join(SITE, 'package.json'))('esbuild');
  await esbuild.build({ entryPoints: [join(work, 'entry.ts')], bundle: true, format: 'esm', platform: 'neutral', alias: { '@': work }, outfile: join(work, 'w.mjs'), logLevel: 'warning' });
  const { ITEM_DESCRIPTION_WORDS: W } = await import(join(work, 'w.mjs'));
  const dyn = JSON.parse(readFileSync(join(HERE, 'dynamic-titles.json'), 'utf8'));
  const out = join(SITE, 'src/pages/market/words');
  mkdirSync(out, { recursive: true });
  for (const [lang, words] of Object.entries(W)) {
    const d = {};
    for (const [code, line] of Object.entries(words.avatar)) d[`avatar:${code}`] = line;
    for (const [code, line] of Object.entries(words.title)) d[`title:${code}`] = line;
    // A sealed Intercept by its tier (item_desc.intercept.tier1..5, app feat/intercept-desc-1111).
    for (const [tier, line] of Object.entries(words.intercept ?? {})) d[`intercept:${tier.replace('tier', '')}`] = line;
    const n = {};
    for (const t of dyn) {
      n[`title:${t.code}`] = t.names[lang] ?? t.name;
      d[`title:${t.code}`] = t.descs?.[lang] ?? t.desc ?? words.family.gn;
    }
    writeFileSync(join(out, `${lang}.json`), JSON.stringify({ d, n }) + '\n');
    console.log(lang, Object.keys(d).length, 'lines');
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
