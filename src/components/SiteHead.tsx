import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { LANGUAGES, useLang, useT, type Strings } from '../i18n'

/** The address search engines know the site by (index.html's og:url). */
const ORIGIN = 'https://spysocial.app'

type PageKey = keyof Strings['meta']['titles']

/** Pages shared by link only (noindex): no alternates for search engines. They set their own title. */
const UNLISTED = new Set(['/megan'])

/** Which page a path is, for its title. The home page and anything unknown take the site's own title. */
function pageOf(path: string): PageKey | null {
  if (path === '/') return null
  if (path.startsWith('/join/e/')) return 'joinEvent'
  if (path === '/join' || path.startsWith('/join/')) return 'join'
  const pages: Record<string, PageKey> = {
    '/support': 'faq',
    '/contact-us': 'contact',
    '/rules': 'rules',
    '/safety': 'safety',
    '/privacy': 'privacy',
    '/terms': 'terms',
    '/child-safety': 'childSafety',
    '/whats-new': 'whatsNew',
    '/delete-account': 'deleteAccount',
    '/reset-password': 'resetPassword',
    '/confirm-success': 'confirmSuccess',
  }
  return pages[path.replace(/\/+$/, '')] ?? 'notFound'
}

/**
 * Every page's <head> in its language: <html lang> and dir (public/lang.js set them before the first paint; this
 * keeps them), the title and description, and the same page in the other nine languages for search engines
 * (?lang=xx, which public/lang.js reads), with the bare address as the default. A page's own Helmet (Agree) can
 * still set its title after this one.
 */
const SiteHead = () => {
  const { pathname } = useLocation()
  const { lang, language } = useLang()
  const t = useT()
  const page = pageOf(pathname)
  const title = page ? `${t.meta.titles[page]} · ${t.meta.siteName}` : t.meta.defaultTitle
  const here = `${ORIGIN}${pathname}`

  return (
    <Helmet htmlAttributes={{ lang, dir: language.rtl ? 'rtl' : 'ltr' }}>
      <title>{title}</title>
      <meta name="description" content={t.meta.description} />
      <meta property="og:locale" content={language.og} />
      {!UNLISTED.has(pathname) &&
        LANGUAGES.map((l) => <link key={l.code} rel="alternate" hrefLang={l.code} href={`${here}?lang=${l.code}`} />)}
      {!UNLISTED.has(pathname) && <link rel="alternate" hrefLang="x-default" href={here} />}
    </Helmet>
  )
}

export default SiteHead
