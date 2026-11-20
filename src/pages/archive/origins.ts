/**
 * The launch set's seal on the Archive (readiness R18b / B12, archive-origins-1119): the app's look 43C "Seal" (app repo
 * components/kit/SetBadge.tsx, owner's pick C on picks page 4 #43, Nov 17): a small red wax seal holding the season's
 * mark "S1", the set's word "ORIGINS" beside it. Only a Season 1 copy carries it: one minted in the set `s1.intercepts`
 * (the app's lib/mintSet ORIGINS_SET), which the launch hour's genesis makes (Dec 8). The Archive already reads each
 * copy's set from the server (mint_unique_public: op uniques' copies[].set, op unique's set.code), so no server change.
 * Behind LIVE.archiveOrigins (off until Dec 6): before it the card keeps its set line as it is.
 *
 * The words are the app's own (localization/translations/mintSet.ts mint_set.*), all ten languages; Arabic's seal holds
 * the Western "S1" like the app's (the Arabic letters are hard to read that small).
 */
import type { LangCode } from '../../i18n'
import { LIVE } from '../../lib/legalRelease'

/** The launch set's code (mint_sets.code; the app's ORIGINS_SET). */
export const ORIGINS_SET = 's1.intercepts'

const RLM = '‏'

export type OriginsWords = { season: string; word: string; name: string }

/** mint_set.s1_season / s1_word / s1_name, as the app has them. */
const W: Record<LangCode, OriginsWords> = {
  en: { season: 'S1', word: 'Origins', name: 'Season 1 · Origins' },
  ru: { season: 'С1', word: 'Истоки', name: 'Сезон 1 · Истоки' },
  es: { season: 'T1', word: 'Orígenes', name: 'Temporada 1 · Orígenes' },
  'pt-BR': { season: 'T1', word: 'Origens', name: 'Temporada 1 · Origens' },
  fr: { season: 'S1', word: 'Origines', name: 'Saison 1 · Origines' },
  id: { season: 'M1', word: 'Asal Mula', name: 'Musim 1 · Asal Mula' },
  hi: { season: 'S1', word: 'ओरिजिन्स', name: 'सीज़न 1 · ओरिजिन्स' },
  bn: { season: 'S1', word: 'অরিজিনস', name: 'সিজন 1 · অরিজিনস' },
  ar: { season: 'S1', word: `${RLM}البدايات`, name: `${RLM}الموسم 1 · البدايات` },
  'zh-Hans': { season: 'S1', word: '起源', name: '第 1 赛季 · 起源' },
}

export const originsWords = (lang: LangCode): OriginsWords => W[lang] ?? W.en

/** Whether a copy of this set shows the seal: a Season 1 copy, with the site's switch on. */
export function showsOrigins(setCode: string | null | undefined): boolean {
  return LIVE.archiveOrigins && setCode === ORIGINS_SET
}
