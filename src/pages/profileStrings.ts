/**
 * The words of /profile/<username> (pages/Profile, archive-holder-1110). English and Russian; the other eight languages
 * read the English for now, as the Archive's own words do. The buttons are the site's common ones (useT().common).
 */
import type { LangCode } from '../i18n'

const en = {
  eyebrow: 'Player profile',
  phone: 'Profiles live in the SpySocial app. If this player keeps their profile public, the app shows their agent, title and showcase.',
  desktop: 'Profiles live in the SpySocial app. Open this link on your phone to see it there.',
  bad: 'This profile link isn’t right.',
  badText: 'Check the username in the link and try again.',
  back: 'Back to the Archive',
}

export type ProfileStrings = typeof en

const ru: ProfileStrings = {
  eyebrow: 'Профиль игрока',
  phone: 'Профили открываются в приложении SpySocial. Если игрок держит профиль открытым, там видны его агент, титул и витрина.',
  desktop: 'Профили открываются в приложении SpySocial. Откройте эту ссылку на телефоне.',
  bad: 'Ссылка на профиль неверна.',
  badText: 'Проверьте имя пользователя в ссылке и попробуйте снова.',
  back: 'Вернуться в Архив',
}

const BY_LANG: Partial<Record<LangCode, ProfileStrings>> = { en, ru }

export function profileStrings(lang: LangCode): ProfileStrings {
  return BY_LANG[lang] ?? en
}
