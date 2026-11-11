/* eslint-disable -- runs inside the app repo (its jest and lint), not the site */
/**
 * The Archive's words and tables, exported from the app's own code (scripts/archive-data/run.sh copies this into an app
 * checkout's localization/__tests__ and runs it there; it is not part of either repo's test suite). One file per
 * language, public/archive/data/<code>.json:
 *
 *   words      Unique, Legendary, the five Intercept tiers (intercepts.tier1..5)
 *   palettes   the ten named colours a Unique's second digit picks (lib/unique/palettes): name, the jewel tone and the
 *              second tone as the art paints them (lib/unique/colourSets drawnTreatment on a sample copy)
 *   items      each Legendary that can come as a Unique: its name and kind line (components/intercepts/ItemBits), its
 *              attributes digit by digit (lib/unique/attributes attributeSpecs: label and the ten values' names), its
 *              codename pool and the shuffle's offset (lib/unique/codename codenameParts)
 *   codenames  the language's codename words (template, 16 mood words, 8 nouns a pool: uniqueCodenames)
 *
 * The site reads a copy's float digit by digit with these, exactly as the app's certificate does, so a Unique minted
 * after the export still gets its attributes and codename.
 */
import { expect, it, jest } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

/* eslint-disable import/first */
import i18n from '../i18n';
import { LANGUAGE_LIST } from '../languages';
import { itemName, itemKindLine } from '@/components/intercepts/ItemBits';
import { attributeSpecs, variantAttribute, COLOUR_ATTRIBUTE, type AttributeSpec } from '@/lib/unique/attributes';
import { CODENAME_POOLS, codenameParts, CODENAMES_PER_ITEM } from '@/lib/unique/codename';
import { UNIQUE_PALETTES, PALETTE_ITEMS } from '@/lib/unique/palettes';
import { drawnTreatment } from '@/lib/unique/colourSets';
import { CODENAME_WORDS } from '@/localization/translations/uniqueCodenames';
import { UNMASKED_DISGUISES, LASER_TRAP_LOOT } from '@/lib/unique/localLegendaries';
import { isLegendaryWearable, wearableAttributes, wearableHue } from '@/lib/unique/legendaryWearables';
/* eslint-enable import/first */

const OUT_DIR = process.env.SITE_ARCHIVE_OUT as string;

/** The locals' variants have their own keys (as the item catalogue's scene names them). */
function localVariant(item: string): AttributeSpec | null {
  if (item === 'local_unmasked') return { id: 'variant', place: 1, values: UNMASKED_DISGUISES, valueKey: (id) => `celebrations.local.unmasked.variants.${id}` };
  if (item === 'local_laser_trap') return { id: 'variant', place: 1, values: LASER_TRAP_LOOT, valueKey: (id) => `celebrations.local.laser_trap.variants.${id}` };
  return null;
}

function specsOf(item: string): AttributeSpec[] {
  const s = attributeSpecs(item);
  if (s) {
    if (!s.some((x) => x.place === 1)) {
      const v = localVariant(item);
      if (v) return [v, ...s];
    }
    return s;
  }
  const v = variantAttribute(item) ?? localVariant(item);
  return [...(v ? [v] : []), ...(PALETTE_ITEMS.has(item) ? [COLOUR_ATTRIBUTE] : [])];
}

/** A float whose digits 1..4 are all k (the rest a middle shade): what each attribute reads at k. */
const at = (k: number) => Number(`0.${k}${k}${k}${k}55`);

/** The Legendary hat, glasses and outfit: digit 2 a palette of their own, digits 3 and 4 their own (lib/unique/legendaryWearables). */
function wearableSpecs(item: string, t: (k: string) => string): { id: string; place: number; label: string; values: { id: string; name: string }[] }[] {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => wearableAttributes(item, at(k)));
  return rows[0].map((r, i) => ({
    id: r.kind,
    place: r.digit,
    label: t(r.labelKey),
    values: rows.map((row) => ({ id: row[i].nameKey.split('.').pop() as string, name: t(row[i].nameKey) })),
  }));
}

/** The copy's colour as its art paints it, for a float whose second digit is k (the certificate's swatch). */
function swatch(item: string, k: number): string | null {
  const mark = { seed: Number(`0.3${k}5500`), pattern: 500, serial: 1, item } as never;
  if (isLegendaryWearable(item)) return wearableHue(mark, item)?.colour ?? null;
  const tr = drawnTreatment(mark, item) as unknown as { base?: string } | null;
  return tr?.base ?? null;
}

it('exports the Archive data', () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const codes = Object.keys(CODENAME_POOLS).sort();
  const isKey = (s: string) => /^[a-z0-9_]+(\.[a-z0-9_]+)+$/.test(s);
  const missing: string[] = [];
  // A palette's colours, as the art paints them: a palette item's copy whose second digit is the palette's.
  const swatches = UNIQUE_PALETTES.map((p, k) => {
    const t = drawnTreatment({ seed: Number(`0.3${k}5500`), pattern: 500, serial: 1, item: 'celebration_heist' } as never, 'celebration_heist') as unknown as Record<string, unknown> | null;
    return { id: p.id, base: (t?.base as string) ?? null, second: ((t?.second ?? t?.partnerBase ?? t?.accent) as string) ?? null };
  });
  for (const { code: lng } of LANGUAGE_LIST as readonly { code: string }[]) {
    const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, { ...(o ?? {}), lng }) as string;
    const tt = (k: string) => {
      const s = t(k);
      if (!s || isKey(s)) missing.push(`${lng}:${k}`);
      return s;
    };
    const items: Record<string, unknown> = {};
    for (const code of codes) {
      const kind = code === 'hologram' ? 'title' : 'avatar';
      const ci = { kind: kind as never, code, slot: null };
      const p1 = codenameParts(code, 1);
      // n(1) = (offset + 53) mod 128, so offset = n(1) - 53 (mod 128): the site's shuffle is the app's.
      const n1 = p1 ? p1.mod + 16 * p1.noun : 0;
      items[code] = {
        kind,
        name: itemName(t, ci),
        kindLine: itemKindLine(t, ci),
        pool: CODENAME_POOLS[code],
        offset: (((n1 - 53) % CODENAMES_PER_ITEM) + CODENAMES_PER_ITEM) % CODENAMES_PER_ITEM,
        palette: PALETTE_ITEMS.has(code),
        attrs: [
          ...specsOf(code).map((s) => ({
            id: s.id,
            place: s.place,
            label: tt(`unique.attribute.${s.id}`),
            values: s.values.map((v) => ({ id: v, name: tt(s.valueKey(v)) })),
          })),
          ...(isLegendaryWearable(code) ? wearableSpecs(code, tt) : []),
        ].map((a) => (a.place === 2 ? { ...a, values: a.values.map((v, k) => ({ ...v, hex: swatch(code, k) })) } : a)),
      };
    }
    const w = (CODENAME_WORDS as Record<string, { template: string; mods: readonly string[]; nouns: Record<string, readonly string[]> }>)[lng];
    const out = {
      lang: lng,
      words: {
        unique: tt('rarity.unique'),
        legendary: tt('rarity.legendary'),
        tiers: [1, 2, 3, 4, 5].map((n) => tt(`intercepts.tier${n}`)),
      },
      palettes: swatches.map((s) => ({ ...s, name: tt(`unique.colours.${s.id}`) })),
      items,
      codenames: { template: w.template, mods: w.mods, nouns: w.nouns },
    };
    fs.writeFileSync(path.join(OUT_DIR, `${lng}.json`), `${JSON.stringify(out)}\n`);
  }
  expect(missing).toEqual([]);
});
