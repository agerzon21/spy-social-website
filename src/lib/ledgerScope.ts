/**
 * What the public ledger covers (ledger-uniques-1111; app repo server file 20261231999989_ledger_uniques_1111, owner
 * decision Nov 11): UNIQUES ONLY. Other minted items (regular Intercept items, Game Night titles, the Beta Pin, Field
 * Tester) keep their numbers and are kept in SpySocial's own records, but get no ledger line. Used only while
 * LIVE.ledgerUniquesOnly is on: the ledger page's search description and the Archive's "Traded up" card (its ten
 * Legendary copies are no longer burned on the ledger).
 */
import type { LangCode } from '../i18n/languages'

/** The /ledger page's description for search results (replaces meta.descriptions.ledger). */
export const LEDGER_DESCRIPTION_UNIQUES: Record<LangCode, string> = {
  en: 'The public record of every SpySocial Unique: each copy, its number and what happens to it. Anyone can check it.',
  es: 'El registro público de cada Único de SpySocial: cada copia, su número y lo que le pasa. Cualquiera puede comprobarlo.',
  ru: 'Публичный реестр уникальных предметов SpySocial: каждая копия, её номер и всё, что с ней происходит. Проверить его может любой.',
  'zh-Hans': 'SpySocial 每件唯一物品的公开记录：每一份副本、它的编号及其经历，人人都可核验。',
  hi: 'SpySocial के हर अद्वितीय आइटम का सार्वजनिक रिकॉर्ड: हर कॉपी, उसका नंबर और उसके साथ जो कुछ होता है। इसे कोई भी जाँच सकता है।',
  ar: 'السجل العام لكل قطعة فريدة في SpySocial: كل نسخة ورقمها وكل ما يحدث لها. ويمكن لأي شخص التحقق منه.',
  fr: 'Le registre public de chaque Unique SpySocial : chaque exemplaire, son numéro et ce qui lui arrive. Chacun peut le vérifier.',
  bn: 'SpySocial-এর প্রতিটি অনন্য আইটেমের সর্বজনীন রেকর্ড: প্রতিটি কপি, তার নম্বর আর তার সঙ্গে যা ঘটে। যে কেউ এটি যাচাই করতে পারে।',
  'pt-BR': 'O registro público de cada Único do SpySocial: cada cópia, seu número e o que acontece com ela. Qualquer pessoa pode conferir.',
  id: 'Catatan publik setiap Unik SpySocial: setiap salinan, nomornya, dan apa yang terjadi padanya. Siapa saja bisa memeriksanya.',
}

/** The Archive home's "Traded up" card text (replaces home.sources.tradeUp.text): the ten copies aren't on the ledger. */
export const TRADE_UP_TEXT_UNIQUES: Record<LangCode, string> = {
  en: 'Ten Legendary copies go in, one Unique comes out. The ten are destroyed for good.',
  es: 'Entran diez copias Legendarias y sale un Único. Las diez se destruyen para siempre.',
  ru: 'Десять легендарных копий на входе, один уникальный на выходе. Десять копий уничтожаются навсегда.',
  'zh-Hans': '投入十件传说副本，产出一件唯一物品。那十件会被永久销毁。',
  hi: 'दस लेजेंडरी कॉपियाँ अंदर, एक अद्वितीय आइटम बाहर। वे दस हमेशा के लिए नष्ट हो जाती हैं।',
  ar: 'تدخل عشر نسخ أسطورية، وتخرج قطعة فريدة واحدة. وتُتلف النسخ العشر نهائيًا.',
  fr: 'Dix exemplaires Légendaires entrent, un Unique sort. Les dix sont détruits pour de bon.',
  bn: 'দশটি লেজেন্ডারি কপি ঢোকে, একটি অনন্য বেরোয়। দশটি কপি চিরতরে নষ্ট হয়ে যায়।',
  'pt-BR': 'Entram dez cópias Lendárias, sai um Único. As dez são destruídas para sempre.',
  id: 'Sepuluh salinan Legendaris masuk, satu Unik keluar. Kesepuluhnya dimusnahkan selamanya.',
}
