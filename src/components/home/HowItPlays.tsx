import spyTalk from '../../assets/screenshots/spy-talk.webp'
import spySketch from '../../assets/screenshots/spy-sketch.webp'
import { useT } from '../../i18n'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import PhoneShot from '../ui/PhoneShot'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

/** The two games, side by side on a desk. */
const HowItPlays = () => {
  const t = useT().home.how
  const modes = [
    { ...t.talk, shot: spyTalk },
    { ...t.sketch, shot: spySketch },
  ]
  return (
    <section className={s.section} aria-labelledby="how-title">
      <div className={ui.wrap}>
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <DisplayHeading id="how-title">{t.title}</DisplayHeading>
        <p className={s.sub}>{t.sub}</p>
        <div className={s.modes}>
          {modes.map((m) => (
            <article key={m.shot} className={s.mode}>
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
}

export default HowItPlays
