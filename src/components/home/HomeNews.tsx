import { useLang, useT } from '../../i18n'
import { isoDay, latestNews, newsDate, newsText, useNewsDay } from '../../news'
import IconLink from '../ui/IconLink'
import Link from '../SiteLink'
import ui from '../ui/ui.module.css'
import s from './HomeNews.module.css'

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/**
 * The Latest strip under the hero: the next announcements (src/news: the next three ahead, or the latest two), each
 * its day and title and a link to it on /news, then All news. Nothing when the list is empty.
 */
const HomeNews = () => {
  const n = useT().news
  const { lang, language } = useLang()
  const today = useNewsDay()
  const entries = latestNews(today)
  if (!entries.length) return null

  return (
    <section className={s.strip} aria-labelledby="home-news" data-news-day={today}>
      <div className={`${ui.wrap} ${s.inner}`}>
        <div className={s.head}>
          <h2 id="home-news" className={`${ui.eyebrow} ${s.label}`}>
            {n.latest}
          </h2>
          <IconLink to="/news" icon={<ArrowIcon />}>
            {n.all}
          </IconLink>
        </div>
        <ul className={s.list}>
          {entries.map((entry) => (
            <li key={entry.id} className={s.item}>
              <Link to={`/news#${entry.id}`} className={s.link}>
                {entry.undated ? null : (
                  <time className={s.when} dateTime={isoDay(entry.date)} suppressHydrationWarning>
                    {newsDate(entry, language.locale, true)}
                  </time>
                )}
                <span className={s.title}>{newsText(entry, lang).title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HomeNews
