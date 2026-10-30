import type { IconType } from 'react-icons'
import {
  FaGlobe,
  FaLanguage,
  FaMedal,
  FaMoon,
  FaMusic,
  FaPalette,
  FaPencil,
  FaRankingStar,
  FaShieldHalved,
  FaStopwatch,
  FaTicket,
  FaTrophy,
  FaUserSecret,
} from 'react-icons/fa6'
import agent from '../assets/home/agents/f-spy.svg'
import SocialLinks from '../components/SocialLinks'
import DisplayHeading from '../components/ui/DisplayHeading'
import Eyebrow from '../components/ui/Eyebrow'
import ui from '../components/ui/ui.module.css'
import { useLang, useT } from '../i18n'
import { formatDate } from '../i18n/rich'
import { LIVE, avatarsLive } from '../lib/legalRelease'
import s from './Roadmap.module.css'

/** The 2.2 launch day, written as the release notes write dates; if the launch moves, change it here. */
const LAUNCH_DAY = 'December 8, 2026'

/** The icons of the 2.2 cards and of the plans, by position (src/i18n: roadmap.now.features, roadmap.next.plans). */
const FEATURE_ICONS: IconType[] = [FaGlobe, FaPencil, FaLanguage, FaUserSecret, FaMoon, FaPalette, FaTicket, FaMusic, FaStopwatch, FaShieldHalved]
/** The Game nights card's position: it names the launch-week nights once LIVE.launchGameNights is on (roadmap.now.launchWeek). */
const GAME_NIGHTS_CARD = 4
const PLAN_ICONS: IconType[] = [FaRankingStar, FaMedal, FaTrophy]

/**
 * The roadmap: SpySocial 2.2 on the launch day, then what's planned (no dates), down one timeline. Unannounced
 * while LIVE.roadmap is off: nothing links to it, search engines are asked not to index it (SiteHead) and the
 * sitemap leaves it out (vite.config.ts). From the launch (website update 1 turns the avatar creator on, which is
 * avatarsLive, as for What's New's 2.2 entry) the 2.2 stage reads "Out now" instead of the launch day.
 */
const Roadmap = () => {
  const t = useT()
  const r = t.roadmap
  const { language } = useLang()
  const out = avatarsLive(LIVE)
  // "December 8" stays on one line.
  const day = formatDate(LAUNCH_DAY, language.locale, { year: false }).replace(/ /g, ' ')

  return (
    <div className={s.page}>
      <div className={s.hero}>
        <div className={`${ui.wrap} ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <Eyebrow>{r.eyebrow}</Eyebrow>
            <DisplayHeading as="h1" size={1} className={s.title}>
              {r.title}
              <span className={s.mark}>{t.home.hero.titleMark}</span>
            </DisplayHeading>
            <p className={s.lede}>{out ? r.ledeOut : r.lede(day)}</p>
          </div>
          {/* Decoration (a computer's width only): the agent in the fedora from the home line-up, in the spotlight. */}
          <div className={s.heroArt} aria-hidden="true">
            <img src={agent} alt="" width={512} height={818} decoding="async" />
          </div>
        </div>
      </div>

      <div className={ui.wrap}>
        <ol className={s.timeline}>
          <li className={`${s.stage} ${s.now}`}>
            <section aria-labelledby="roadmap-now">
              <p className={s.when}>{out ? r.now.out : r.now.coming(day)}</p>
              <DisplayHeading id="roadmap-now">{r.now.title}</DisplayHeading>
              <p className={s.sub}>{r.now.sub}</p>
              <ul className={s.features}>
                {r.now.features.map((feature, i) => {
                  const Icon = FEATURE_ICONS[i] ?? FaGlobe
                  const text =
                    i === GAME_NIGHTS_CARD && LIVE.launchGameNights ? `${feature.text} ${r.now.launchWeek}` : feature.text
                  return (
                    <li key={feature.title} className={s.feature}>
                      <DisplayHeading as="h3" size={4} className={s.featureTitle}>
                        <Icon className={s.icon} aria-hidden focusable={false} />
                        <span>{feature.title}</span>
                      </DisplayHeading>
                      <p className={s.text}>{text}</p>
                    </li>
                  )
                })}
              </ul>
              <p className={s.more}>{r.now.more}</p>
            </section>
          </li>

          <li className={`${s.stage} ${s.next}`}>
            <section aria-labelledby="roadmap-next">
              <p className={s.when}>
                <span className={s.stamp}>{r.next.status}</span>
                <span className={s.noDates}>{r.next.noDates}</span>
              </p>
              <DisplayHeading id="roadmap-next">{r.next.title}</DisplayHeading>
              <p className={s.sub}>{r.next.sub}</p>
              <ul className={s.plans}>
                {r.next.plans.map((plan, i) => {
                  const Icon = PLAN_ICONS[i] ?? FaTrophy
                  return (
                    <li key={plan.title} className={s.plan}>
                      <Icon className={s.planIcon} aria-hidden focusable={false} />
                      <DisplayHeading as="h3" size={3} className={s.planTitle}>
                        {plan.title}
                      </DisplayHeading>
                      <p className={s.text}>{plan.text}</p>
                    </li>
                  )
                })}
              </ul>
            </section>
          </li>
        </ol>

        <div className={s.outro}>
          <p className={s.outroText}>{r.outro}</p>
          <SocialLinks />
        </div>
      </div>
    </div>
  )
}

export default Roadmap
