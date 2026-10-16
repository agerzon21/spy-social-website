import { useMemo } from 'react'
import { LIVE } from '../../lib/legalRelease'
import { currentPlatform } from '../../lib/platform'
import { PLAY_URL } from '../../lib/playUrl'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import IconLink from '../ui/IconLink'
import StoreBadges from '../ui/StoreBadges'
import ui from '../ui/ui.module.css'
import LineUp from './LineUp'
import s from './home.module.css'

const ScreenIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" d="M3 5h18v11H3zM9 20h6M12 16v4" />
  </svg>
)
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/** The first screen: what the game is in one line, the store badges, a way into a room, and the line-up. */
const HomeHero = () => {
  // The browser version, on a computer once it's live (LIVE.browserLinks); phones get the stores.
  const showBrowser = useMemo(() => LIVE.browserLinks && currentPlatform() === 'desktop', [])

  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={`${ui.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <Eyebrow>The party game of social deception</Eyebrow>
          <DisplayHeading as="h1" size={1} id="hero-title">
            Trust no one<span className={s.accent}>.</span>
          </DisplayHeading>
          <p className={s.heroLede}>
            <strong>Find the spy — or fool everyone trying.</strong> One of your friends is the spy. Everyone else knows
            the secret location. Ask questions or draw clues, then vote before the spy works out where you are.
          </p>
          <StoreBadges />
          <ul className={s.facts}>
            <li>3–21 players</li>
            <li>Real-time multiplayer</li>
            <li>Free to play</li>
          </ul>
          <div className={s.alt}>
            {showBrowser && (
              <IconLink href={PLAY_URL} icon={<ScreenIcon />}>
                Play in your browser
              </IconLink>
            )}
            <IconLink to="/#join" icon={<ArrowIcon />}>
              Join with a room code
            </IconLink>
          </div>
        </div>
        <LineUp />
      </div>
    </section>
  )
}

export default HomeHero
