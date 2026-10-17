import roleSpy from '../../assets/screenshots/role-spy.webp'
import spyTalk from '../../assets/screenshots/spy-talk.webp'
import vote from '../../assets/screenshots/vote.webp'
import solve from '../../assets/screenshots/solve.webp'
import { useT } from '../../i18n'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

// The four steps' screens, in the order of the steps' words (src/i18n: home.round.steps).
const SHOTS = [roleSpy, spyTalk, vote, solve]

/** A round in four steps, each with its screen. */
const OneRound = () => {
  const t = useT().home.round
  return (
    <section className={`${s.section} ${s.round}`} aria-labelledby="round-title">
      <div className={ui.wrap}>
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <DisplayHeading id="round-title">{t.title}</DisplayHeading>
        <ol className={s.steps}>
          {t.steps.map((step, i) => (
            <li key={SHOTS[i]} className={s.step}>
              <span className={s.stepN} aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <b className={s.stepTitle}>{step.title}</b>
                <span className={s.stepText}>{step.text}</span>
              </div>
              <img className={s.stepShot} src={SHOTS[i]} alt={step.alt} width={660} height={1428} loading="lazy" decoding="async" />
            </li>
          ))}
        </ol>
        <p className={s.win}>{t.win}</p>
      </div>
    </section>
  )
}

export default OneRound
