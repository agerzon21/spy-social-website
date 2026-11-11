import type { LangCode } from '../../i18n'
import type { ArchiveSet } from '../../lib/archive'

/*
 * The server's words on a Unique's page in all ten languages, on the site's side (site QA Nov 11): until the app
 * repo's archive_words_1111 is applied the ledger sends a set's name and a copy's "how it was minted" line in English
 * and Russian only (the other eight read "Beta" for "Beta · Intercepts", and no line). These are the same sentences
 * that file writes (_mint_how_words, _mint_intercepts_set_words), in the site's own terms (pages/archive/locales,
 * pages/market/locales). The server's own words always win where it sends them in the reader's language, except an
 * Intercepts set's name, which is built the one way in every language.
 */

type Place = (place: string) => string
type Lines = Record<'icUnique' | 'ic' | 'gnPlayed' | 'gnLocal' | 'gnSpy' | 'gnBonus', Place>

const LINES: Record<LangCode, Lines> = {
  en: {
    icUnique: (p) => `A Unique, from an Intercept or a trade-up in ${p}`,
    ic: (p) => `From an Intercept or a trade-up in ${p}`,
    gnPlayed: (p) => `Played a counted game at ${p}`,
    gnLocal: (p) => `Won as a Local at ${p}`,
    gnSpy: (p) => `Won as a spy at ${p}`,
    gnBonus: (p) => `Picked by the developer at a table of ${p}`,
  },
  ru: {
    icUnique: (p) => `Уникальный, из перехвата или обмена: ${p}`,
    ic: (p) => `Из перехвата или обмена: ${p}`,
    gnPlayed: (p) => `Засчитанная игра: ${p}`,
    gnLocal: (p) => `Победа за местных: ${p}`,
    gnSpy: (p) => `Победа за шпионов: ${p}`,
    gnBonus: (p) => `Выбор разработчика: ${p}`,
  },
  es: {
    icUnique: (p) => `Un Único, de una Intercepción o un canje en ${p}`,
    ic: (p) => `De una Intercepción o un canje en ${p}`,
    gnPlayed: (p) => `Partida contada: ${p}`,
    gnLocal: (p) => `Victoria como Local: ${p}`,
    gnSpy: (p) => `Victoria como espía: ${p}`,
    gnBonus: (p) => `Elección del desarrollador: ${p}`,
  },
  fr: {
    icUnique: (p) => `Un Unique, issu d’une interception ou d’une fusion en ${p}`,
    ic: (p) => `Issu d’une interception ou d’une fusion en ${p}`,
    gnPlayed: (p) => `Partie comptée : ${p}`,
    gnLocal: (p) => `Victoire en Local : ${p}`,
    gnSpy: (p) => `Victoire en espion : ${p}`,
    gnBonus: (p) => `Choix du développeur : ${p}`,
  },
  'pt-BR': {
    icUnique: (p) => `Um Único, de uma Interceptação ou de uma fusão: ${p}`,
    ic: (p) => `De uma Interceptação ou de uma fusão: ${p}`,
    gnPlayed: (p) => `Partida contada: ${p}`,
    gnLocal: (p) => `Vitória como Local: ${p}`,
    gnSpy: (p) => `Vitória como espião: ${p}`,
    gnBonus: (p) => `Escolha do desenvolvedor: ${p}`,
  },
  id: {
    icUnique: (p) => `Unik, dari Sadapan atau tukar tambah di ${p}`,
    ic: (p) => `Dari Sadapan atau tukar tambah di ${p}`,
    gnPlayed: (p) => `Permainan terhitung: ${p}`,
    gnLocal: (p) => `Menang sebagai Warga: ${p}`,
    gnSpy: (p) => `Menang sebagai mata-mata: ${p}`,
    gnBonus: (p) => `Pilihan developer: ${p}`,
  },
  'zh-Hans': {
    icUnique: (p) => `唯一物品，来自密函或合成升级：${p}`,
    ic: (p) => `来自密函或合成升级：${p}`,
    gnPlayed: (p) => `计入的对局：${p}`,
    gnLocal: (p) => `以平民身份获胜：${p}`,
    gnSpy: (p) => `以卧底身份获胜：${p}`,
    gnBonus: (p) => `开发者之选：${p}`,
  },
  ar: {
    icUnique: (p) => `قطعة فريدة، من ملف أو مقايضة: ${p}`,
    ic: (p) => `من ملف أو مقايضة: ${p}`,
    gnPlayed: (p) => `لعبة محتسبة: ${p}`,
    gnLocal: (p) => `فوز بدور المحلي: ${p}`,
    gnSpy: (p) => `فوز بدور الجاسوس: ${p}`,
    gnBonus: (p) => `اختيار المطوّر: ${p}`,
  },
  hi: {
    icUnique: (p) => `अद्वितीय आइटम, इंटरसेप्ट या ट्रेड-अप से: ${p}`,
    ic: (p) => `इंटरसेप्ट या ट्रेड-अप से: ${p}`,
    gnPlayed: (p) => `गिना गया गेम: ${p}`,
    gnLocal: (p) => `स्थानीय बनकर जीत: ${p}`,
    gnSpy: (p) => `जासूस बनकर जीत: ${p}`,
    gnBonus: (p) => `डेवलपर की पसंद: ${p}`,
  },
  bn: {
    icUnique: (p) => `অনন্য, ইন্টারসেপ্ট বা ট্রেড-আপ থেকে: ${p}`,
    ic: (p) => `ইন্টারসেপ্ট বা ট্রেড-আপ থেকে: ${p}`,
    gnPlayed: (p) => `গণনায় ধরা খেলা: ${p}`,
    gnLocal: (p) => `স্থানীয় হয়ে জয়: ${p}`,
    gnSpy: (p) => `গুপ্তচর হয়ে জয়: ${p}`,
    gnBonus: (p) => `ডেভেলপারের পছন্দ: ${p}`,
  },
}

/** The English lines as the server writes them, to read which line a copy has and its place. */
const EN: [keyof Lines, RegExp][] = [
  ['icUnique', /^A Unique, from an Intercept or a trade-up in (.+)$/],
  ['ic', /^From an Intercept or a trade-up in (.+)$/],
  ['gnPlayed', /^Played a counted game at (.+)$/],
  ['gnLocal', /^Won as a Local at (.+)$/],
  ['gnSpy', /^Won as a spy at (.+)$/],
  ['gnBonus', /^Picked by the developer at a table of (.+)$/],
]

/** The Beta test set's words (its name and its one line), as archive_words_1111 writes them. */
const BETA_TEST_NAME: Record<LangCode, string> = {
  en: 'Beta test', ru: 'Бета-тест', es: 'Prueba beta', fr: 'Test bêta', 'pt-BR': 'Teste beta', id: 'Uji beta',
  'zh-Hans': '内测', ar: 'الاختبار التجريبي', hi: 'बीटा टेस्ट', bn: 'বেটা টেস্ট',
}
const BETA_TEST_LINE: Record<LangCode, string> = {
  en: 'Tested SpySocial 2.2 before launch', ru: 'Тестирование SpySocial 2.2 до запуска',
  es: 'Probó SpySocial 2.2 antes del lanzamiento', fr: 'A testé SpySocial 2.2 avant le lancement',
  'pt-BR': 'Testou o SpySocial 2.2 antes do lançamento', id: 'Menguji SpySocial 2.2 sebelum peluncuran',
  'zh-Hans': '在上线前测试了 SpySocial 2.2', ar: 'اختبر SpySocial 2.2 قبل الإطلاق',
  hi: 'लॉन्च से पहले SpySocial 2.2 टेस्ट किया', bn: 'লঞ্চের আগে SpySocial 2.2 টেস্ট করেছেন',
}

/** An Intercepts set's second half, in the site's word for Intercepts (pages/market/locales categories.intercepts). */
const INTERCEPTS: Record<LangCode, string> = {
  en: 'Intercepts', ru: 'Перехваты', es: 'Intercepciones', fr: 'Interceptions', 'pt-BR': 'Interceptações', id: 'Sadapan',
  'zh-Hans': '密函', ar: 'الملفات', hi: 'इंटरसेप्ट', bn: 'ইন্টারসেপ্ট',
}

const pick = (m: Record<string, string> | undefined, lang: string) => m?.[lang] ?? m?.[lang.split('-')[0]] ?? null

/** A set's name in the reader's language: an Intercepts set as "<season> · Intercepts", the Beta test set from its table. */
export function setName(set: ArchiveSet, lang: LangCode): string {
  const season = set.season_names ?? {}
  if (set.track === 'intercepts' && season.en && set.names.en === `${season.en} · Intercepts`) {
    return `${pick(season, lang) ?? season.en} · ${INTERCEPTS[lang] ?? INTERCEPTS.en}`
  }
  if (set.code === 'beta.test' && set.names.en === BETA_TEST_NAME.en) return pick(set.names, lang) ?? BETA_TEST_NAME[lang] ?? BETA_TEST_NAME.en
  return pick(set.names, lang) ?? set.names.en ?? ''
}

/** A place in an English line, in the reader's language: the set's season or the set (a night) when it's one of those. */
function placeIn(place: string, set: ArchiveSet | null, lang: LangCode): string {
  if (set?.season_names?.en === place) return pick(set.season_names, lang) ?? place
  if (set?.names?.en === place) return (set ? setName(set, lang) : null) || place
  return place
}

/**
 * The copy's "how it was minted" line in the reader's language: the server's where it sends that language, else the
 * site's own for a line the server writes, else none (never another language's: the line above it already says how
 * this copy was minted).
 */
export function howLine(how: Record<string, string> | null | undefined, set: ArchiveSet | null, lang: LangCode): string {
  if (!how) return ''
  const own = how[lang]
  if (own) return own
  const en = how.en
  if (!en) return ''
  if (en === BETA_TEST_LINE.en) return BETA_TEST_LINE[lang] ?? ''
  for (const [kind, re] of EN) {
    const m = re.exec(en)
    if (m) return LINES[lang]?.[kind](placeIn(m[1], set, lang)) ?? ''
  }
  return ''
}
