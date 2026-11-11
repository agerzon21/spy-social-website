/**
 * Why a minted copy was removed (ledger-reasons-1111; app repo server file 20261231999988_ledger_reasons_1111, owner
 * decision Nov 11). When SpySocial takes a copy away for integrity (a bot farm, cheating, a fraud refund, a glitch or
 * duplicate, a correction of ours), the ledger says so: the original lines stay, and a new burn line's note reads
 * "burn:<code> case:<ref>" (ref: R-<case>, I-<published incident>, L-<owner log line>; never a player). Older removal
 * notes (burn:cheating / burn:error / burn:revoke) read as the same words. Shown only while LIVE.ledgerReasons is on.
 */
import type { LangCode } from '../i18n'

export type RemovalCode = 'integrity_farm' | 'integrity_cheat' | 'fraud_refund' | 'bug_glitch' | 'owner_correction'
export type Removal = { code: RemovalCode; ref: string | null }

const CODES: RemovalCode[] = ['integrity_farm', 'integrity_cheat', 'fraud_refund', 'bug_glitch', 'owner_correction']
const OLD: Record<string, RemovalCode> = { cheating: 'integrity_cheat', error: 'bug_glitch', revoke: 'owner_correction' }
const REF = /^[RIL]-[1-9][0-9]{0,17}$/

/** A removal as the server answers it ({code, ref}), or null for anything else. */
export function asRemoval(x: unknown): Removal | null {
  if (!x || typeof x !== 'object') return null
  const o = x as Record<string, unknown>
  const code = typeof o.code === 'string' ? (OLD[o.code] ?? o.code) : null
  if (!code || !CODES.includes(code as RemovalCode)) return null
  return { code: code as RemovalCode, ref: typeof o.ref === 'string' && REF.test(o.ref) ? o.ref : null }
}

/** A burn line's note in plain codes: "burn:integrity_farm case:R-118" -> {integrity_farm, R-118}; anything else null. */
export function removalOfNote(note: string): Removal | null {
  const m = /^burn:([a-z_]+)(?: case:([RIL]-[1-9][0-9]{0,17}))?$/.exec(note)
  return m ? asRemoval({ code: m[1], ref: m[2] ?? null }) : null
}

type Words = {
  /** The status: the copy was removed (not used up in a trade-up or a shred). */
  removed: string
  /** "Removed: bot farm, Nov 11, 2026" */
  line: (why: string, day: string) => string
  /** "Case R-118" */
  case: (ref: string) => string
  why: Record<RemovalCode, string>
  /** Under the line: what a removal means for the record. */
  note: string
  /** A collectible's supply: minted, removed, in circulation. */
  supply: (minted: string, removed: string, held: string) => [string, string, string]
}

const WORDS: Record<LangCode, Words> = {
  en: {
    removed: 'Removed',
    line: (why, day) => `Removed: ${why}, ${day}`,
    case: (ref) => `Case ${ref}`,
    why: { integrity_farm: 'bot farm', integrity_cheat: 'cheating', fraud_refund: 'fraud refund', bug_glitch: 'glitch or duplicate', owner_correction: 'corrected by SpySocial' },
    note: 'Taken away to keep the game fair. Its earlier lines stay on the ledger, and its number is never used again.',
    supply: (m, r, h) => [`${m} minted`, `${r} removed`, `${h} in circulation`],
  },
  es: {
    removed: 'Eliminado',
    line: (why, day) => `Eliminado: ${why}, ${day}`,
    case: (ref) => `Caso ${ref}`,
    why: { integrity_farm: 'granja de bots', integrity_cheat: 'trampas', fraud_refund: 'reembolso fraudulento', bug_glitch: 'fallo o duplicado', owner_correction: 'corrección de SpySocial' },
    note: 'Se eliminó para que el juego siga siendo justo. Sus líneas anteriores siguen en el registro y su número no se vuelve a usar nunca.',
    supply: (m, r, h) => [`${m} acuñados`, `${r} eliminados`, `${h} en circulación`],
  },
  ru: {
    removed: 'Изъят',
    line: (why, day) => `Изъят: ${why}, ${day}`,
    case: (ref) => `Дело ${ref}`,
    why: { integrity_farm: 'бот-ферма', integrity_cheat: 'читерство', fraud_refund: 'мошеннический возврат платежа', bug_glitch: 'сбой или дубликат', owner_correction: 'исправление SpySocial' },
    note: 'Изъят ради честной игры. Его прежние строки остаются в реестре, а его номер больше никогда не используется.',
    supply: (m, r, h) => [`Выпущено: ${m}`, `Изъято: ${r}`, `В обороте: ${h}`],
  },
  'zh-Hans': {
    removed: '已移除',
    line: (why, day) => `已移除：${why}，${day}`,
    case: (ref) => `案件 ${ref}`,
    why: { integrity_farm: '机器人刷取', integrity_cheat: '作弊', fraud_refund: '欺诈退款', bug_glitch: '漏洞或重复', owner_correction: 'SpySocial 更正' },
    note: '为保证游戏公平而移除。它之前的记录行仍保留在账本上，它的编号永远不会再被使用。',
    supply: (m, r, h) => [`已铸造 ${m}`, `已移除 ${r}`, `流通中 ${h}`],
  },
  hi: {
    removed: 'ज़ब्त',
    line: (why, day) => `ज़ब्त: ${why}, ${day}`,
    case: (ref) => `केस ${ref}`,
    why: { integrity_farm: 'बॉट फ़ार्म', integrity_cheat: 'चीटिंग', fraud_refund: 'धोखे से लिया गया रिफ़ंड', bug_glitch: 'गड़बड़ी या डुप्लिकेट', owner_correction: 'SpySocial का सुधार' },
    note: 'खेल को निष्पक्ष रखने के लिए ज़ब्त किया गया। इसकी पिछली पंक्तियाँ लेजर में रहती हैं, और इसका नंबर फिर कभी इस्तेमाल नहीं होता।',
    supply: (m, r, h) => [`${m} मिंट`, `${r} ज़ब्त`, `${h} चलन में`],
  },
  ar: {
    removed: 'أُزيلت',
    line: (why, day) => `أُزيلت: ${why}، ${day}`,
    case: (ref) => `القضية ${ref}`,
    why: { integrity_farm: 'مزرعة روبوتات', integrity_cheat: 'غش', fraud_refund: 'استرداد مالي احتيالي', bug_glitch: 'خلل أو نسخة مكررة', owner_correction: 'تصحيح من SpySocial' },
    note: 'أُزيلت حفاظًا على نزاهة اللعبة. تبقى سطورها السابقة في السجل، ولا يُستخدم رقمها مرة أخرى أبدًا.',
    supply: (m, r, h) => [`سُكّ ${m}`, `أُزيل ${r}`, `متداول ${h}`],
  },
  fr: {
    removed: 'Supprimé',
    line: (why, day) => `Supprimé\u00A0: ${why}, ${day}`,
    case: (ref) => `Dossier ${ref}`,
    why: { integrity_farm: 'ferme de bots', integrity_cheat: 'triche', fraud_refund: 'remboursement frauduleux', bug_glitch: 'bug ou doublon', owner_correction: 'correction de SpySocial' },
    note: 'Supprimé pour que le jeu reste équitable. Ses lignes précédentes restent dans le registre, et son numéro ne sera jamais réutilisé.',
    supply: (m, r, h) => [`${m}\u00A0frappés`, `${r}\u00A0supprimés`, `${h}\u00A0en circulation`],
  },
  bn: {
    removed: 'বাজেয়াপ্ত',
    line: (why, day) => `বাজেয়াপ্ত: ${why}, ${day}`,
    case: (ref) => `কেস ${ref}`,
    why: { integrity_farm: 'বট ফার্ম', integrity_cheat: 'চিটিং', fraud_refund: 'প্রতারণামূলক রিফান্ড', bug_glitch: 'ত্রুটি বা নকল কপি', owner_correction: 'SpySocial-এর সংশোধন' },
    note: 'খেলা ন্যায্য রাখতে বাজেয়াপ্ত করা হয়েছে। এর আগের লাইনগুলো লেজারে থেকে যায়, আর এর নম্বর আর কখনো ব্যবহার করা হয় না।',
    supply: (m, r, h) => [`${m} মিন্ট`, `${r} বাজেয়াপ্ত`, `${h} প্রচলনে`],
  },
  'pt-BR': {
    removed: 'Removido',
    line: (why, day) => `Removido: ${why}, ${day}`,
    case: (ref) => `Caso ${ref}`,
    why: { integrity_farm: 'fazenda de bots', integrity_cheat: 'trapaça', fraud_refund: 'reembolso fraudulento', bug_glitch: 'falha ou duplicata', owner_correction: 'correção da SpySocial' },
    note: 'Removido para manter o jogo justo. As linhas anteriores continuam no registro, e o número dele nunca mais é usado.',
    supply: (m, r, h) => [`${m} cunhados`, `${r} removidos`, `${h} em circulação`],
  },
  id: {
    removed: 'Dicabut',
    line: (why, day) => `Dicabut: ${why}, ${day}`,
    case: (ref) => `Kasus ${ref}`,
    why: { integrity_farm: 'peternakan bot', integrity_cheat: 'curang', fraud_refund: 'refund curang', bug_glitch: 'glitch atau duplikat', owner_correction: 'koreksi SpySocial' },
    note: 'Dicabut agar permainan tetap adil. Baris-baris sebelumnya tetap ada di buku besar, dan nomornya tidak akan pernah dipakai lagi.',
    supply: (m, r, h) => [`${m} dicetak`, `${r} dicabut`, `${h} beredar`],
  },
}

export function removalWords(lang: LangCode): Words {
  return WORDS[lang] ?? WORDS.en
}
