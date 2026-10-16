import spyTalk from '../../assets/screenshots/spy-talk.webp'
import spySketch from '../../assets/screenshots/spy-sketch.webp'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import PhoneShot from '../ui/PhoneShot'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

const MODES = [
  {
    secret: 'The secret is a location',
    name: 'Spy Talk',
    text: 'Take turns asking and answering one question each. Too vague and you look like the spy. Too obvious and the spy finds out where you are.',
    shot: spyTalk,
    alt: 'Spy Talk: each player asks one question and another player answers',
  },
  {
    secret: 'The secret is a word',
    name: 'Spy Sketch',
    text: 'Take turns drawing it on one shared whiteboard. The spy draws along without knowing what it is, and hopes nobody notices.',
    shot: spySketch,
    alt: 'Spy Sketch: players take turns drawing the secret word while the spy fakes it',
  },
]

/** The two games, side by side on a desk. */
const HowItPlays = () => (
  <section className={s.section} aria-labelledby="how-title">
    <div className={ui.wrap}>
      <Eyebrow>How it plays</Eyebrow>
      <DisplayHeading id="how-title">Talk your way out. Or draw.</DisplayHeading>
      <p className={s.sub}>Two games, one rule: everyone at the table knows the secret except the spy.</p>
      <div className={s.modes}>
        {MODES.map((m) => (
          <article key={m.name} className={s.mode}>
            <div>
              <p className={s.secret}>{m.secret}</p>
              <DisplayHeading as="h3" size={3}>
                {m.name}
              </DisplayHeading>
              <p className={s.modeText}>{m.text}</p>
            </div>
            <PhoneShot src={m.shot} alt={m.alt} />
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default HowItPlays
