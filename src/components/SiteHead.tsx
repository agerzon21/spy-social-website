import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { LANGUAGES, matchLang, useLang, useT, type Strings } from '../i18n'
import { LIVE, ONLINE_SAFETY_TEXT } from '../lib/legalRelease'

/** The address search engines know the site by: the bare spysocial.app redirects here (vercel.json). */
const ORIGIN = 'https://www.spysocial.app'

type PageKey = keyof Strings['meta']['titles']
type DescribedPage = keyof Strings['meta']['descriptions']

/**
 * Pages search engines shouldn't index: invites (/join, /join/<code>, /join/e/<id>), the account-email landings,
 * anything unknown (the 404 page, which the server answers with 200 like every route) and the roadmap until it's
 * announced (LIVE.roadmap). They get noindex and no alternates or canonical; vercel.json also sends X-Robots-Tag for
 * the fixed ones.
 */
const UNLISTED = new Set<PageKey>([
  'join',
  'joinEvent',
  'resetPassword',
  'confirmSuccess',
  'notFound',
  ...(LIVE.roadmap ? [] : (['roadmap'] as const)),
])

/** Which page a path is, for its title. The home page takes the site's own title, anything unknown notFound's. */
function pageOf(path: string): PageKey | null {
  if (path === '/') return null
  if (path.startsWith('/join/e/')) return 'joinEvent'
  if (path === '/join' || path.startsWith('/join/')) return 'join'
  const pages: Record<string, PageKey> = {
    '/support': 'faq',
    '/contact-us': 'contact',
    '/rules': 'rules',
    // The Safety page's route exists only with the launch text (App.tsx); without it /safety is the 404 page.
    ...(ONLINE_SAFETY_TEXT ? { '/safety': 'safety' as const } : {}),
    '/privacy': 'privacy',
    '/terms': 'terms',
    '/child-safety': 'childSafety',
    '/whats-new': 'whatsNew',
    '/roadmap': 'roadmap',
    '/delete-account': 'deleteAccount',
    '/reset-password': 'resetPassword',
    '/confirm-success': 'confirmSuccess',
  }
  return pages[path] ?? 'notFound'
}

/**
 * Every page's <head> in its language: <html lang> and dir (public/lang.js set them before the first paint; this
 * keeps them), the title and the page's own description, and for the pages search engines index, the canonical
 * address (the page in this language: ?lang=xx when the address asked for it) and the same page in the other nine
 * languages (?lang=xx, which public/lang.js reads), with the bare address as the default. A page's own Helmet
 * (Agree, an expired confirmation link) can still set its title after this one.
 */
const SiteHead = () => {
  const { pathname, search } = useLocation()
  const { lang, language } = useLang()
  const t = useT()
  // One address per page: no trailing slash (/privacy/ is /privacy).
  const path = pathname.replace(/\/+$/, '') || '/'
  const page = pageOf(path)
  const title = page ? `${t.meta.titles[page]} · ${t.meta.siteName}` : t.meta.defaultTitle
  const description = page && page in t.meta.descriptions ? t.meta.descriptions[page as DescribedPage] : t.meta.description
  const indexed = !(page && UNLISTED.has(page))
  const here = `${ORIGIN}${path}`
  const asked = matchLang(new URLSearchParams(search).get('lang'))
  const canonical = asked === lang ? `${here}?lang=${lang}` : here

  return (
    <Helmet htmlAttributes={{ lang, dir: language.rtl ? 'rtl' : 'ltr' }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:locale" content={language.og} />
      {!indexed && <meta name="robots" content="noindex" />}
      {indexed && <link rel="canonical" href={canonical} />}
      {indexed && LANGUAGES.map((l) => <link key={l.code} rel="alternate" hrefLang={l.code} href={`${here}?lang=${l.code}`} />)}
      {indexed && <link rel="alternate" hrefLang="x-default" href={here} />}
    </Helmet>
  )
}

export default SiteHead
