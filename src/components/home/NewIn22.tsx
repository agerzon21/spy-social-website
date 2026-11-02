import { FaDiscord } from 'react-icons/fa6'
import { useLang, useT } from '../../i18n'
import { rich } from '../../i18n/rich'
import { DISCORD_URL, PRESS_EMAIL } from '../../lib/social'
import ActionLink from '../ui/ActionLink'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import ui from '../ui/ui.module.css'
import s from './launch.module.css'

/**
 * The 2.2 store screenshots, one set per language (their captions are printed on them): src/assets/shots22/<lang>/
 * <name>-<300|600>.webp, written by scripts/store-shots.mjs from the store-shots tool's output. Only the URLs are
 * bundled; a page loads its own language's files, lazily.
 */
const FILES = import.meta.glob<string>('../../assets/shots22/*/*.webp', { eager: true, query: '?url', import: 'default' })
const SHOTS = ['talk', 'sketch', 'online', 'gamenight', 'market', 'friends'] as const
const shot = (lang: string, name: string, w: 300 | 600): string =>
  FILES[`../../assets/shots22/${lang}/${name}-${w}.webp`] ?? FILES[`../../assets/shots22/en/${name}-${w}.webp`]

/**
 * The launch version's New in 2.2 section (LIVE.launchSite), just under the hero: the store screenshots in a rail,
 * five cards (Spy Sketch, Play Online, Game Night, the Black Market, memberships) and a link to the full notes, then
 * the community strip: the Discord invite and the press and creator contact.
 */
const NewIn22 = () => {
  const strings = useT()
  const t = strings.launch
  const r = strings.roadmap.now
  const { lang } = useLang()

  return (
    <>
      <section className={s.section} aria-labelledby="new-title" id="new">
        <div className={ui.wrap}>
          <Eyebrow>{r.out}</Eyebrow>
          <DisplayHeading id="new-title">{r.title}</DisplayHeading>
          <p className={s.sub}>{r.sub}</p>
        </div>
        <ul className={s.rail} aria-label={t.railLabel}>
          {SHOTS.map((name) => (
            <li key={name}>
              <img
                src={shot(lang, name, 300)}
                srcSet={`${shot(lang, name, 300)} 300w, ${shot(lang, name, 600)} 600w`}
                sizes="(min-width: 1000px) 190px, (min-width: 760px) 220px, 200px"
                alt={t.shots[name]}
                width={300}
                height={652}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
        <div className={ui.wrap}>
          <ol className={s.cards}>
            {t.cards.map((card, i) => (
              <li key={card.title} className={s.card}>
                <span className={s.n} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <DisplayHeading as="h3" size={4}>
                  {card.title}
                </DisplayHeading>
                <p className={s.text}>{card.text}</p>
              </li>
            ))}
          </ol>
          <ActionLink to="/whats-new" tone="secondary" className={s.more}>
            {t.allNotes}
          </ActionLink>
        </div>
      </section>

      <section className={s.community} aria-label={t.community.title}>
        <div className={`${ui.wrap} ${s.communityGrid}`}>
          <div>
            <DisplayHeading as="h2" size={3}>
              {t.community.title}
            </DisplayHeading>
            <p className={s.text}>{t.community.text}</p>
            <ActionLink href={DISCORD_URL} newTab>
              <FaDiscord aria-hidden focusable={false} className={s.icon} />
              {t.community.discord}
            </ActionLink>
          </div>
          <div className={s.press}>
            <DisplayHeading as="h2" size={4}>
              {t.community.pressTitle}
            </DisplayHeading>
            <p className={s.text}>
              {rich(t.community.press, {
                email: () => (
                  <a href={`mailto:${PRESS_EMAIL}?subject=Press`} dir="ltr">
                    {PRESS_EMAIL}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default NewIn22
