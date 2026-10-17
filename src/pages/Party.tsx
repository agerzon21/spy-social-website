import { useState, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaAndroid, FaApple } from 'react-icons/fa'
import DisplayHeading from '../components/ui/DisplayHeading'
import ui from '../components/ui/ui.module.css'
import s from './Party.module.css'
import { useCelebration } from './PartyCelebration'
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/stores'

/**
 * /megan: the one link the owner sends round at Megan's birthday (unlisted: noindex, in no nav; /megans-party
 * redirects here). Phone first, for a noisy room: a poster greeting, the two big "which phone" buttons (the app first:
 * everyone gets the same game and the Beta Pin), each opening a short box with the one link it needs, the Beta Pin
 * line, then how to join and how to play in a few lines. English only, so its
 * words live here, outside the site's ten-language tables. No forms, nothing collected.
 */

const TESTFLIGHT_URL = 'https://testflight.apple.com/join/dBMZkzhf'
const PLAY_TEST_URL = 'https://play.google.com/apps/internaltest/4700842666167568102'

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
  const toggle = (way: Way) => setOpen((now) => (now === way ? null : way))
  const celebrate = useCelebration()

  return (
    <div className={s.page} lang="en" dir="ltr">
      <Helmet>
        <title>Happy 30th, Megan! · SpySocial</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className={`${ui.wrap} ${s.inner}`}>
        <p className={s.kicker}>Megan &amp; Kyung's party</p>
        {/* Tapping the headline plays the fireworks again. */}
        <div className={s.replay} onClick={celebrate}>
          <DisplayHeading as="h1" size={1} className={s.title}>
            Happy 30th, Megan<span className={s.accent}>!</span>
          </DisplayHeading>
        </div>
        <p className={s.lede}>A little party game for anyone who wants to join in. Setup takes about a minute.</p>

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
          </Choice>
        </div>

        <p className={s.pin}>
          <b>Make a free account in the app:</b> your agent gets the Beta Pin, only for people who test before launch.
        </p>


        <h2 className={s.label}>Then</h2>
        <ol className={s.steps}>
          <li>Open SpySocial</li>
          <li>Make a free account (that's your Beta Pin)</li>
          <li>Tap Join a room</li>
          <li>Type the code Alex shows you</li>
        </ol>
        <p className={s.note}>Two games inside: Spy Talk and Spy Sketch.</p>

        <h2 className={s.label}>How to play in 20 seconds</h2>
        <ul className={s.rules}>
          <li>Everyone gets the secret location or word, except the spies.</li>
          <li>Take turns asking and answering questions, or drawing clues.</li>
          <li>Vote out the spies before they guess the secret.</li>
        </ul>

        <h2 className={s.label}>Thank you</h2>
        <p className={s.pin}>
          <b>Thanks for helping us test!</b> We hope you enjoyed it. SpySocial launches on November 10. If you liked it, tell
          your friends: it would mean a lot to us.
        </p>
        <p className={s.note}>
          Want it later? It's free on the{' '}
          <a className={s.inlineLink} href={APP_STORE_URL}>App Store</a> and{' '}
          <a className={s.inlineLink} href={PLAY_STORE_URL}>Google Play</a>, and the new version arrives there on launch day.
        </p>

        <details className={s.host}>
          <summary className={s.hostSummary}>For Alex (host)</summary>
          <div className={s.hostBody}>
            <h3 className={s.hostHead}>An Android guest gave you their Gmail</h3>
            <ol className={s.hostSteps}>
              <li>On your laptop, open <b>play.google.com/console</b> → SpySocial.</li>
              <li>Test and release → Testing → <b>Internal testing</b> → the <b>Testers</b> tab.</li>
              <li>Open the email list <b>Alex</b> (the arrow next to it), add their Gmail, then <b>Save changes</b>. That's all: nothing to publish.</li>
              <li>Tell them: tap <b>I have an Android</b> → <b>Open after Alex adds you</b> → Accept invite → install from Google Play. Their Play Store must use that same Gmail.</li>
              <li>"App not available"? Wait 5 minutes and open the link again.</li>
            </ol>
            <h3 className={s.hostHead}>iPhone guests</h3>
            <p className={s.hostText}>Nothing for you to do. If TestFlight says the beta is full, raise the limit in App Store Connect → TestFlight → Friends &amp; Family → Public Link.</p>
            <h3 className={s.hostHead}>Hosting</h3>
            <p className={s.hostText}>Open SpySocial → <b>Private Room</b> → pick Spy Talk or Spy Sketch → show the code or share the link. One room takes 3 to 21 players.</p>
          </div>
        </details>
      </div>
    </div>
  )
}

export default Party
