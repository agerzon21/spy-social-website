import { useState } from 'react'
import { Link } from 'react-router-dom'
import poster from '../../assets/screenshots/spy-sketch.webp'
import { useT } from '../../i18n'
import { rich } from '../../i18n/rich'
import { LIVE } from '../../lib/legalRelease'
import { PLAY_URL } from '../../lib/playUrl'
import ActionLink from '../ui/ActionLink'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M8 5v14l11-7z" />
  </svg>
)

/**
 * A creator's YouTube Short (shown while creatorShortLive(LIVE)). Our own poster stands in for the player, so nothing
 * loads from YouTube (no cookies, no request) until the visitor presses play.
 */
const CreatorShort = () => {
  const t = useT().home.creatorShort
  const { youtubeId, creator, channelUrl } = LIVE.creatorShort
  const [playing, setPlaying] = useState(false)

  return (
    <section className={`${s.section} ${s.short}`} aria-labelledby="short-title">
      <div className={`${ui.wrap} ${s.shortGrid}`}>
        <div className={s.shortCopy}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <DisplayHeading id="short-title">{t.title(creator)}</DisplayHeading>
          <p className={s.shortCredit}>
            {rich(t.credit(creator), {
              link: (c) => (
                <a href={channelUrl} target="_blank" rel="noopener noreferrer">
                  {c}
                </a>
              ),
            })}
          </p>
          <ActionLink href={PLAY_URL}>{t.cta}</ActionLink>
        </div>
        <div className={s.shortPlayer}>
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0`}
              title={t.title(creator)}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button type="button" className={s.shortPoster} onClick={() => setPlaying(true)} aria-label={t.play(creator)}>
              <img src={poster} alt="" width={660} height={1428} loading="lazy" decoding="async" />
              <span className={s.shortPlay}>
                <PlayIcon />
              </span>
            </button>
          )}
          {!playing && (
            <p className={s.shortNote}>
              {rich(t.consent, { link: (c) => <Link to="/privacy">{c}</Link> })}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default CreatorShort
