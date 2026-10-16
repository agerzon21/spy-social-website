import roleSpy from '../../assets/screenshots/role-spy.webp'
import spyTalk from '../../assets/screenshots/spy-talk.webp'
import vote from '../../assets/screenshots/vote.webp'
import solve from '../../assets/screenshots/solve.webp'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

const STEPS = [
  {
    title: 'The card',
    text: 'You see the secret, or a card that just says Spy.',
    shot: roleSpy,
    alt: "Role reveal: the spy's card says Spy, so they have to find out where everyone is",
  },
  { title: 'The questions', text: 'Prove you know it without giving it away.', shot: spyTalk, alt: 'The question card mid-round' },
  { title: 'The vote', text: 'Call a vote on whoever sounds off.', shot: vote, alt: 'Voting: everyone votes for the player they suspect is the spy' },
  {
    title: 'The gamble',
    text: 'The spy can guess the secret any time. Right wins, wrong is out.',
    shot: solve,
    alt: 'The spy picks the location from the list to win the round',
  },
]

/** A round in four steps, each with its screen. */
const OneRound = () => (
  <section className={`${s.section} ${s.round}`} aria-labelledby="round-title">
    <div className={ui.wrap}>
      <Eyebrow>One round</Eyebrow>
      <DisplayHeading id="round-title">Four beats</DisplayHeading>
      <ol className={s.steps}>
        {STEPS.map((step, i) => (
          <li key={step.title} className={s.step}>
            <span className={s.stepN} aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <b className={s.stepTitle}>{step.title}</b>
              <span className={s.stepText}>{step.text}</span>
            </div>
            <img className={s.stepShot} src={step.shot} alt={step.alt} width={660} height={1428} loading="lazy" decoding="async" />
          </li>
        ))}
      </ol>
      <p className={s.win}>
        Locals win by voting out every spy. Spies win by guessing the secret, or by staying hidden until time runs out.
      </p>
    </div>
  </section>
)

export default OneRound
