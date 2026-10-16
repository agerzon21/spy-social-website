import teal from '../../assets/home/agents/b-teal.svg'
import coral from '../../assets/home/agents/b-coral.svg'
import rose from '../../assets/home/agents/b-rose.svg'
import lime from '../../assets/home/agents/b-lime.svg'
import yellow from '../../assets/home/agents/b-yellow.svg'
import lilac from '../../assets/home/agents/b-lilac.svg'
import blue from '../../assets/home/agents/b-blue.svg'
import mint from '../../assets/home/agents/b-mint.svg'
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
  return (
    <section id="join" className={`${s.section} ${s.join}`} aria-labelledby="ways-title">
      <div className={ui.wrap}>
        <Eyebrow>Who you play with</Eyebrow>
        <DisplayHeading id="ways-title">{online ? 'Your crew. Or strangers.' : 'Bring your crew.'}</DisplayHeading>
        <p className={s.sub}>Everyone plays on their own phone or tablet, around one table or on a call.</p>
        <div className={online ? s.ways : `${s.ways} ${s.waysSingle}`}>
          <article className={s.way}>
            <div>
              <DisplayHeading as="h3" size={4}>
                Private room
              </DisplayHeading>
              <p className={s.wayText}>
                Up to 21 players. Friends join with a QR code, an invite link or the room code. You pick the mode and
                the rules.
              </p>
            </div>
            <ul className={s.howJoin}>
              <li>
                <b>Scan</b> the QR code on the host's screen
              </li>
              <li>
                <b>Tap</b> the invite link they send
              </li>
              <li>
                <b>Type</b> the room code here or in the app
              </li>
            </ul>
            <JoinCodeForm />
          </article>
          {online && (
            <article className={s.way}>
              <DisplayHeading as="h3" size={4}>
                Play Online
              </DisplayHeading>
              <p className={s.wayText}>
                Find a Game seats you at a table of 4 or 8. Strangers never see your name, only your Agent Color.
                Scheduled game nights too.
              </p>
              <ul className={s.agents} aria-label="Agent Colors">
                {AGENTS.map(([name, src]) => (
                  <li key={name}>
                    <img src={src} alt="" width={200} height={200} loading="lazy" decoding="async" />
                    Agent {name}
                  </li>
                ))}
              </ul>
              <p className={s.note}>Play Online needs a free account.</p>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}

export default WhoYouPlayWith
