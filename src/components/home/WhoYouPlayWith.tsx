import teal from '../../assets/home/agents/b-teal.svg'
import coral from '../../assets/home/agents/b-coral.svg'
import rose from '../../assets/home/agents/b-rose.svg'
import lime from '../../assets/home/agents/b-lime.svg'
import yellow from '../../assets/home/agents/b-yellow.svg'
import lilac from '../../assets/home/agents/b-lilac.svg'
import blue from '../../assets/home/agents/b-blue.svg'
import mint from '../../assets/home/agents/b-mint.svg'
import { useT } from '../../i18n'
import { bold, rich } from '../../i18n/rich'
import { LIVE } from '../../lib/legalRelease'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import ui from '../ui/ui.module.css'
import JoinCodeForm from './JoinCodeForm'
import s from './home.module.css'

const AGENTS = [
  ['Teal', teal],
  ['Coral', coral],
  ['Rose', rose],
  ['Lime', lime],
  ['Yellow', yellow],
  ['Lilac', lilac],
  ['Blue', blue],
  ['Mint', mint],
] as const

/**
 * Private rooms (with the room-code box: the header's Join a room lands here, #join) and, once LIVE.playOnline is
 * on, Play Online with the Agent Colors strangers see.
 */
const WhoYouPlayWith = () => {
  const online = LIVE.playOnline
  const t = useT().home.who
  return (
    <section id="join" className={`${s.section} ${s.join}`} aria-labelledby="ways-title">
      <div className={ui.wrap}>
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <DisplayHeading id="ways-title">{online ? t.titleOnline : t.titleCrew}</DisplayHeading>
        <p className={s.sub}>{t.sub}</p>
        <div className={online ? s.ways : `${s.ways} ${s.waysSingle}`}>
          <article className={s.way}>
            <div>
              <DisplayHeading as="h3" size={4}>
                {t.privateTitle}
              </DisplayHeading>
              <p className={s.wayText}>{t.privateText}</p>
            </div>
            <ul className={s.howJoin}>
              {t.howJoin.map((line) => (
                <li key={line}>{rich(line, { b: bold })}</li>
              ))}
            </ul>
            <JoinCodeForm />
          </article>
          {online && (
            <article className={s.way}>
              <DisplayHeading as="h3" size={4}>
                {t.onlineTitle}
              </DisplayHeading>
              <p className={s.wayText}>{t.onlineText}</p>
              <ul className={s.agents} aria-label={t.agentsLabel}>
                {AGENTS.map(([name, src]) => (
                  <li key={name}>
                    <img src={src} alt="" width={200} height={200} loading="lazy" decoding="async" />
                    {t.agents[name]}
                  </li>
                ))}
              </ul>
              <p className={s.note}>{t.needsAccount}</p>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}

export default WhoYouPlayWith
