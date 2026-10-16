import { useState } from 'react'
import cyan from '../../assets/home/agents/f-cyan.svg'
import orange from '../../assets/home/agents/f-orange.svg'
import fedora from '../../assets/home/agents/f-spy.svg'
import lime from '../../assets/home/agents/f-lime.svg'
import lilac from '../../assets/home/agents/f-lilac.svg'
import s from './home.module.css'

// Five Noir agents against a height wall. The one in the trench coat, fedora and shades stands in the spotlight;
// the spy is the quiet one at the end. Tapping a suspect stamps a verdict and says it out loud for screen readers.
const SUSPECTS = [
  { src: cyan, spy: false },
  { src: orange, spy: false },
  { src: fedora, spy: false },
  { src: lime, spy: false },
  { src: lilac, spy: true },
]
const MARKS = ["7'", "6'", "5'", "4'", "3'", "2'", "1'"]

const LineUp = () => {
  const [lit, setLit] = useState(2)
  const [shown, setShown] = useState<Set<number>>(() => new Set())
  const [said, setSaid] = useState('')

  const accuse = (i: number) => {
    setLit(i)
    setShown((prev) => new Set(prev).add(i))
    setSaid(SUSPECTS[i].spy ? `Suspect ${i + 1} was the spy` : `Suspect ${i + 1} is a Local`)
  }

  return (
    <div className={s.lineupWrap}>
      <div className={s.lineup} role="group" aria-label="A line-up of five agents. Tap one to accuse them.">
        <div className={s.marks} aria-hidden="true">
          {MARKS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div className={s.spot} aria-hidden="true" />
        <div className={s.pool} aria-hidden="true" />
        <div className={s.suspects}>
          {SUSPECTS.map((x, i) => (
            <button
              key={x.src}
              type="button"
              className={[s.suspect, lit === i ? s.lit : '', shown.has(i) ? s.shown : ''].filter(Boolean).join(' ')}
              aria-label={`Accuse suspect ${i + 1}`}
              onClick={() => accuse(i)}
            >
              <span className={s.plate}>{i + 1}</span>
              <span className={`${s.verdict} ${x.spy ? s.spy : s.local}`} aria-hidden="true">
                {x.spy ? 'Spy!' : 'Local'}
              </span>
              <img src={x.src} alt="" width={512} height={818} />
            </button>
          ))}
        </div>
      </div>
      <p className={s.tapnote}>
        <span>Tap a suspect to accuse</span>
        <span aria-live="polite">{said}</span>
      </p>
    </div>
  )
}

export default LineUp
