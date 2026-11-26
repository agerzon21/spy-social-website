import agent from '../assets/home/agents/f-lilac.svg'
import SocialLinks from '../components/SocialLinks'
import DisplayHeading from '../components/ui/DisplayHeading'
import Eyebrow from '../components/ui/Eyebrow'
import ui from '../components/ui/ui.module.css'
import { useLang, useT } from '../i18n'
import { isoDay, newsBy, newsDate, newsText, useNewsDay, type NewsEntry } from '../news'
import NewsLinks from '../news/NewsLinks'
import s from './News.module.css'

/** One announcement on the timeline: its day (with the weekday), title, two or three lines, and its links. */
const Item = ({ entry }: { entry: NewsEntry }) => {
  const { lang, language } = useLang()
  const words = newsText(entry, lang)
  return (
    <li id={entry.id} className={s.item}>
      <article aria-labelledby={`news-${entry.id}`}>
        {entry.undated ? null : (
          <p className={s.when}>
            <time dateTime={isoDay(entry.date)} suppressHydrationWarning>
              {newsDate(entry, language.locale)}
            </time>
          </p>
        )}
        <DisplayHeading as="h3" size={4} id={`news-${entry.id}`} className={s.itemTitle}>
          {words.title}
        </DisplayHeading>
        <p className={s.text}>{words.body}</p>
        {entry.links?.length ? <NewsLinks links={entry.links} lang={lang} className={s.links} /> : null}
      </article>
    </li>
  )
}

/**
 * News (/news): the betas, the launch and the Game Nights on one timeline, from one list (src/news/entries.ts).
 * What's still ahead comes first, soonest at the top (a lit node, a card); what's behind follows, newest first (an
 * open node, plain). The split follows today's date in Eastern Time (useNewsDay). The roadmap's poster and timeline.
 */
const News = () => {
  const t = useT()
  const n = t.news
  const today = useNewsDay()
  const { upcoming, earlier } = newsBy(today)

  return (
    <div className={s.page} data-news-day={today}>
      <div className={s.hero}>
        <div className={`${ui.wrap} ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <Eyebrow>{n.eyebrow}</Eyebrow>
            <DisplayHeading as="h1" size={1} className={s.title}>
              {n.title}
              <span className={s.mark}>{t.home.hero.titleMark}</span>
            </DisplayHeading>
            <p className={s.lede}>{n.lede}</p>
          </div>
          {/* Decoration (a computer's width only): an agent from the home line-up, in the spotlight. */}
          <div className={s.heroArt} aria-hidden="true">
            <img src={agent} alt="" width={512} height={818} decoding="async" />
          </div>
        </div>
      </div>

      <div className={ui.wrap}>
        {upcoming.length > 0 && (
          <section className={`${s.group} ${s.coming}`} aria-labelledby="news-coming">
            <h2 id="news-coming" className={s.groupTitle}>
              {n.upcoming}
            </h2>
            <ol className={s.timeline}>
              {upcoming.map((entry) => (
                <Item key={entry.id} entry={entry} />
              ))}
            </ol>
          </section>
        )}
        {earlier.length > 0 && (
          <section className={`${s.group} ${s.past}`} aria-labelledby="news-earlier">
            <h2 id="news-earlier" className={s.groupTitle}>
              {n.earlier}
            </h2>
            <ol className={s.timeline}>
              {earlier.map((entry) => (
                <Item key={entry.id} entry={entry} />
              ))}
            </ol>
          </section>
        )}

        <div className={s.outro}>
          <p className={s.outroText}>{n.outro}</p>
          <SocialLinks landmark={false} />
        </div>
      </div>
    </div>
  )
}

export default News
