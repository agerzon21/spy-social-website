import { useRef, useState, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaAndroid, FaApple } from 'react-icons/fa'
import { FiGlobe } from 'react-icons/fi'
import DisplayHeading from '../components/ui/DisplayHeading'
import ui from '../components/ui/ui.module.css'
import s from './Party.module.css'
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/stores'

/**
 * /megan: the one link the owner sends round at Megan's birthday (unlisted: noindex, in no nav; /megans-party
 * redirects here). Phone first, for a noisy room: a poster greeting, the two big "which phone" buttons (the app first:
 * everyone gets the same game and the Beta Pin), each opening a short box with the one link it needs, the Beta Pin
 * line, the browser version as a smaller way in, then how to join and how to play in a few lines. English only, so its
 * words live here, outside the site's ten-language tables. No forms, nothing collected.
 */

const TESTFLIGHT_URL = 'https://testflight.apple.com/join/dBMZkzhf'
const PLAY_TEST_URL = 'https://play.google.com/apps/internaltest/4700842666167568102'
const BROWSER_URL = 'https://play.spysocial.app'

type Way = 'iphone' | 'android'

const Chevron = () => (
  <svg className={s.chevron} viewBox="0 0 12 8" aria-hidden="true" focusable="false">
    <path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** One "which phone" button and, once tapped, its box of steps. */
const Choice = ({
  id,
  icon,
  label,
  open,
  onToggle,
  children,
}: {
  id: Way
  icon: ReactNode
  label: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}) => (
  <div className={s.choice} id={`way-${id}`}>
    <button type="button" className={s.choiceBtn} aria-expanded={open} aria-controls={`box-${id}`} onClick={onToggle}>
      <span className={s.choiceIcon} aria-hidden="true">
        {icon}
      </span>
      <span className={s.choiceLabel}>{label}</span>
      <Chevron />
    </button>
    <div id={`box-${id}`} className={s.box} hidden={!open}>
      {children}
    </div>
  </div>
)

const Party = () => {
  const [open, setOpen] = useState<Way | null>(null)
  const browserRef = useRef<HTMLAnchorElement>(null)
  const toggle = (way: Way) => setOpen((now) => (now === way ? null : way))

  // The Android box's "play in your browser" brings the browser link into view and onto the focus.
  const toBrowser = () => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    browserRef.current?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'center' })
    browserRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className={s.page} lang="en" dir="ltr">
      <Helmet>
        <title>Happy 30th, Megan! · SpySocial</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className={`${ui.wrap} ${s.inner}`}>
        <p className={s.kicker}>Megan &amp; Kyung's party</p>
        <DisplayHeading as="h1" size={1} className={s.title}>
          Happy 30th, Megan<span className={s.accent}>!</span>
        </DisplayHeading>
        <p className={s.lede}>Tonight we're playing SpySocial. One of us is the spy. Find them.</p>

        <h2 className={s.label}>Get the app</h2>
        <div className={s.choices}>
          <Choice id="iphone" icon={<FaApple />} label="I have an iPhone" open={open === 'iphone'} onToggle={() => toggle('iphone')}>
            <a className={`${ui.btn} ${ui.primary} ${s.go}`} href={TESTFLIGHT_URL}>
              Get SpySocial on TestFlight
            </a>
            <p>It asks you to get TestFlight first. Then tap Accept → Install.</p>
            <p>Open SpySocial once, close it fully and open it again (that loads the latest version).</p>
          </Choice>

          <Choice id="android" icon={<FaAndroid />} label="I have an Android" open={open === 'android'} onToggle={() => toggle('android')}>
            <p>Tell Alex the Gmail on your phone. Once he's added it, open this link → Accept → install from Google Play.</p>
            <a className={`${ui.btn} ${ui.primary} ${s.go}`} href={PLAY_TEST_URL}>
              Open after Alex adds you
            </a>
            <button type="button" className={s.textBtn} onClick={toBrowser}>
              Don't want to wait? Play in your browser ↓
            </button>
          </Choice>
        </div>

        <p className={s.pin}>
          <b>Make a free account in the app:</b> your agent gets the Beta Pin, only for people who test before launch.
        </p>

        <div className={s.browser}>
          <a ref={browserRef} className={s.browserLink} href={BROWSER_URL}>
            <FiGlobe aria-hidden focusable={false} />
            Can't install? Play in your browser
          </a>
          <p className={s.note}>Works on any phone. Add it to your home screen if you like.</p>
        </div>

        <h2 className={s.label}>Then</h2>
        <ol className={s.steps}>
          <li>Open SpySocial</li>
          <li>Make a free account (that's your Beta Pin)</li>
          <li>Tap Join a room</li>
          <li>Type the code Alex shows you</li>
        </ol>
        <p className={s.note}>Tonight: Spy Talk and Spy Sketch.</p>

        <h2 className={s.label}>How to play in 20 seconds</h2>
        <ul className={s.rules}>
          <li>Everyone gets the secret location or word, except the spy.</li>
          <li>Take turns asking and answering questions, or drawing clues.</li>
          <li>Vote out the spy before they guess the secret.</li>
        </ul>

        <h2 className={s.label}>Thank you</h2>
        <p className={s.pin}>
          <b>Thanks for helping us test!</b> SpySocial launches on November 10. If you have fun tonight, tell your friends: it
          would mean a lot to us.
        </p>
        <p className={s.note}>
          Want it after tonight? It's free on the{' '}
          <a className={s.inlineLink} href={APP_STORE_URL}>App Store</a> and{' '}
          <a className={s.inlineLink} href={PLAY_STORE_URL}>Google Play</a>, and the new version arrives there on launch day.
        </p>
      </div>
    </div>
  )
}

export default Party
