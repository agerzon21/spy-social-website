import roleLocal from '../../assets/screenshots/role-local.webp'
import translate from '../../assets/screenshots/translate.webp'
import clueEs from '../../assets/home/clue-es.webp'
import clueRu from '../../assets/home/clue-ru.webp'
import { LIVE } from '../../lib/legalRelease'
import { useT } from '../../i18n'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import PhoneShot from '../ui/PhoneShot'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

// The ten languages in their own names (the app's language picker).
const TONGUES: [string, string][] = [
  ['en', 'English'],
  ['es', 'Español'],
  ['ru', 'Русский'],
  ['fr', 'Français'],
  ['pt-BR', 'Português'],
  ['zh-Hans', '简体中文'],
  ['hi', 'हिन्दी'],
  ['ar', 'العربية'],
  ['bn', 'বাংলা'],
  ['id', 'Bahasa Indonesia'],
]

// The role card's three screens, in the order of their descriptions (src/i18n: home.langs.cardAlts) and captions.
const CARDS = [
  { src: roleLocal, caption: 'English', lang: 'en' },
  { src: clueEs, caption: 'Español', lang: 'es' },
  { src: clueRu, caption: 'Русский', lang: 'ru' },
]

/** Every player in their own language; chat translated. */
const Languages = () => {
  const t = useT().home.langs
  return (
  <section className={`${s.section} ${s.flushTop}`} aria-labelledby="lang-title">
    <div className={`${ui.wrap} ${s.langs}`}>
      <div>
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <DisplayHeading id="lang-title">{t.title}</DisplayHeading>
        <p className={s.sub} style={{ marginBottom: 22 }}>
          {t.sub}
        </p>
        <ul className={s.tongues} aria-label={t.listLabel}>
          {TONGUES.map(([lang, name]) => (
            <li key={lang} lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              {name}
            </li>
          ))}
        </ul>
        <div className={s.chat}>
          <PhoneShot src={translate} alt={t.chatAlt} small />
          <p>{LIVE.autoTranslation ? t.chatAuto : t.chatTap}</p>
        </div>
      </div>
      <ul className={s.trio} aria-label={t.trioLabel}>
        {CARDS.map((c, i) => (
          <li key={c.caption}>
            <figure>
              <PhoneShot src={c.src} alt={t.cardAlts[i]} small />
              <figcaption lang={c.lang}>{c.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  </section>
  )
}

export default Languages
