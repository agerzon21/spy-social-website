/* eslint-disable -- runs inside the app repo (its jest and lint), not the site */
/**
 * The /ledger page's item names, exported from the app's own localisation (scripts/ledger-names/run.sh copies this
 * into an app checkout's localization/__tests__ and runs it there; it is not part of either repo's test suite).
 * One file per language, public/ledger/names/<code>.json: { unique, items: { "<avatar|title>:<item_code>": [name, kind line] } },
 * named by the same functions the app's Intercept reveal and Inventory use (components/intercepts/ItemBits itemName,
 * itemKindLine). Every avatar item, border, celebration and title the app knows, plus every code the live ledger lists.
 */
import { expect, it, jest } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

/* eslint-disable import/first */
import i18n from '../i18n';
import { LANGUAGE_LIST } from '../languages';
import { ITEMS } from '@/lib/avatar/catalog';
import { BORDERS, TITLES } from '@/lib/lockerCatalog';
import { CELEBRATIONS, LOCAL_CELEBRATIONS } from '@/lib/celebrations/catalog';
import { canDraw } from '@/lib/crates/items';
import { itemName, itemKindLine } from '@/components/intercepts/ItemBits';
/* eslint-enable import/first */

const OUT_DIR = process.env.SITE_NAMES_OUT as string;
const SUPPLY = process.env.SITE_SUPPLY as string;

it('exports the ledger names', () => {
  const live = JSON.parse(fs.readFileSync(SUPPLY, 'utf8')).collectibles as { item_kind: string; item_code: string; name: string | null }[];
  const cands = new Map<string, { kind: 'avatar' | 'title'; code: string }>();
  const add = (kind: 'avatar' | 'title', code: unknown) => { if (typeof code === 'string' && code) cands.set(`${kind}:${code}`, { kind, code }); };
  for (const c of live) add(c.item_kind === 'title' ? 'title' : 'avatar', c.item_code);
  const anyCodes = (list: readonly object[]) => list.forEach((d) => { const o = d as Record<string, unknown>; add('avatar', o.item); add('avatar', o.code); });
  ITEMS.forEach((i) => add('avatar', (i as unknown as { code: string }).code));
  anyCodes(BORDERS); anyCodes(CELEBRATIONS); anyCodes(LOCAL_CELEBRATIONS);
  TITLES.forEach((t) => add('title', (t as unknown as { code: string }).code));
  const isKey = (s: string) => /^[a-z0-9_]+(\.[a-z0-9_]+)+$/.test(s);
  const unnamed: string[] = [];
  for (const { code: lng } of LANGUAGE_LIST as readonly { code: string }[]) {
    const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, { ...(o ?? {}), lng }) as string;
    const items: Record<string, [string, string]> = {};
    for (const [key, item] of [...cands].sort(([a], [b]) => a.localeCompare(b))) {
      const ci = { kind: item.kind as never, code: item.code, slot: null };
      if (!canDraw(ci)) continue;
      const name = itemName(t, ci);
      if (!name || isKey(name)) continue;
      items[key] = [name, itemKindLine(t, ci)];
    }
    if (lng === 'en') {
      for (const c of live) {
        const key = `${c.item_kind === 'title' ? 'title' : 'avatar'}:${c.item_code}`;
        if (!items[key] && !c.name) unnamed.push(key);
      }
    }
    const unique = t('rarity.unique');
    expect(isKey(unique)).toBe(false);
    fs.writeFileSync(path.join(OUT_DIR, `${lng}.json`), `${JSON.stringify({ unique, items })}\n`);
  }
  // Every collectible on the live ledger has a name: the app's, or the ledger's own (Game Night titles, code titles).
  expect(unnamed).toEqual([]);
});
