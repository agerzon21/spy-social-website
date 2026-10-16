import roleLocal from '../../assets/screenshots/role-local.webp'
import translate from '../../assets/screenshots/translate.webp'
import clueEs from '../../assets/home/clue-es.webp'
import clueRu from '../../assets/home/clue-ru.webp'
import { LIVE } from '../../lib/legalRelease'
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

const CARDS = [
  { src: roleLocal, alt: "Role reveal: a Local's card shows the secret location, Theater", caption: 'English' },
  { src: clueEs, alt: 'Role card in Spanish: Teatro', caption: 'Español' },
  { src: clueRu, alt: 'Role card in Russian: Театр', caption: 'Русский' },
]

/** Every player in their own language; chat translated. */
const Languages = () => (
  <section className={`${s.section} ${s.flushTop}`} aria-labelledby="lang-title">
    <div className={`${ui.wrap} ${s.langs}`}>
      <div>
        <Eyebrow>Ten languages</Eyebrow>
        <DisplayHeading id="lang-title">Same table. Your language.</DisplayHeading>
        <p className={s.sub} style={{ marginBottom: 22 }}>
          Every player sees the game in their own language, the secret included.
        </p>
        <ul className={s.tongues} aria-label="Languages">
          {TONGUES.map(([lang, name]) => (
            <li key={lang} lang={lang}>
              {lang === 'ar' ? <span dir="rtl">{name}</span> : name}
            </li>
          ))}
        </ul>
        <div className={s.chat}>
          <PhoneShot src={translate} alt="Chat translation: a Spanish message in the lobby chat shown in English" small />
          <p>
            {LIVE.autoTranslation
              ? 'Chat too: a message in another language is translated into yours as it arrives.'
              : 'Chat too: tap Translate on any message to read it in yours.'}
          </p>
        </div>
      </div>
      <ul className={s.trio} aria-label="One role card in three languages">
        {CARDS.map((c) => (
          <li key={c.caption}>
            <figure>
              <PhoneShot src={c.src} alt={c.alt} small />
              <figcaption>{c.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default Languages
