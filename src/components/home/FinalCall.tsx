import { LIVE } from '../../lib/legalRelease'
import DisplayHeading from '../ui/DisplayHeading'
import StoreBadges from '../ui/StoreBadges'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

/** The last word: the stores again. */
const FinalCall = () => (
  <section className={`${s.section} ${s.final}`} aria-labelledby="final-title">
    <div className={ui.wrap}>
      <DisplayHeading id="final-title">Your table is waiting</DisplayHeading>
      <p className={s.finalText}>
        Free to play, no ads.{LIVE.purchases ? ' Optional packs if you want more places and words.' : ''}
      </p>
      <StoreBadges center />
    </div>
  </section>
)

export default FinalCall
