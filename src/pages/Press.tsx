import type { ReactNode } from 'react'
import { FaArrowDown, FaDownload, FaEnvelope } from 'react-icons/fa6'
import cream from '../assets/brand/wordmark-cream-outline.svg'
import ink from '../assets/brand/wordmark-ink.svg'
import agent from '../assets/home/agents/f-lilac.svg'
import SiteLink from '../components/SiteLink'
import SocialLinks from '../components/SocialLinks'
import ActionLink from '../components/ui/ActionLink'
import DisplayHeading from '../components/ui/DisplayHeading'
import Eyebrow from '../components/ui/Eyebrow'
import ui from '../components/ui/ui.module.css'
import { useLang, useT } from '../i18n'
import { formatDate, rich } from '../i18n/rich'
import { LAUNCH_DAY } from '../lib/launchDay'
import { LIVE, ONLINE_SAFETY_TEXT, OPERATOR, STORES_OPEN, avatarsLive } from '../lib/legalRelease'
import { SHOTS, shot } from '../lib/shots22'
import { PRESS_EMAIL } from '../lib/social'
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/stores'
import { pressStrings } from './press/strings'
import s from './Press.module.css'

/** The membership's US prices (the store reads of Nov 16, memory: membership only): never a pack's price. */
const PRICES_USD = { month: 3.99, year: 24.99, life: 59.99 }

/** The press address as a link, with "Press" as the mail's subject. */
const PressEmail = () => (
  <a href={`mailto:${PRESS_EMAIL}?subject=Press`} className={s.inlineLink} dir="ltr">
    {PRESS_EMAIL}
  </a>
)

/** A file to download: its format and size ("PNG · 1024 × 1024"), saved under `name`. */
interface PressFile {
  format: string
  href: string
  name: string
}

/** The site's own artwork, by what it is: the preview shows on a panel of its own background. */
const ASSETS: { key: 'logoInk' | 'logoCream' | 'icon' | 'banner'; preview: string; panel: 'light' | 'dark' | 'icon' | 'none'; files: PressFile[] }[] = [
  {
    key: 'logoInk',
    preview: ink,
    panel: 'light',
    files: [
      { format: 'SVG', href: ink, name: 'spysocial-logo.svg' },
      { format: 'PNG · 464 × 138', href: '/images/logo.png', name: 'spysocial-logo.png' },
    ],
  },
  {
    key: 'logoCream',
    preview: cream,
    panel: 'dark',
    files: [
      { format: 'SVG', href: cream, name: 'spysocial-logo-dark-backgrounds.svg' },
      { format: 'PNG · 644 × 208', href: '/images/logo-light.png', name: 'spysocial-logo-dark-backgrounds.png' },
    ],
  },
  { key: 'icon', preview: '/images/icon.png', panel: 'icon', files: [{ format: 'PNG · 1024 × 1024', href: '/images/icon.png', name: 'spysocial-icon.png' }] },
  {
    key: 'banner',
    preview: '/images/og-launch.jpg',
    panel: 'none',
    files: [{ format: 'JPG · 1200 × 630', href: '/images/og-launch.jpg', name: 'spysocial-banner.jpg' }],
  },
]

/** A download link: an icon, the format, and a name for screen readers that says what the file is. */
const FileLink = ({ file, what, label }: { file: PressFile; what: string; label: (what: string, format: string) => string }) => (
  <a href={file.href} download={file.name} className={s.file} aria-label={label(what, file.format)}>
    <FaDownload aria-hidden focusable={false} />
    <span dir="ltr">{file.format}</span>
  </a>
)

/** One row of the fact sheet. */
const Fact = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={s.fact}>
    <dt>{label}</dt>
    <dd>{children}</dd>
  </div>
)

/**
 * The press page (www.spysocial.app/press, press-page-1116): a short and a long description, the fact sheet, the
 * logos, icon, banner and store screenshots to download (the site's own files), the safety stance and the press
 * contact. Words in ./press/strings (ten languages). Until 2.2 is out it says the launch day is coming; the store
 * links join the fact sheet when the stores open (STORES_OPEN), as on the rest of the site.
 */
const Press = () => {
  const t = useT()
  const { lang, language } = useLang()
  const p = pressStrings(lang)
  // Out from the launch, as the Roadmap reads it.
  const out = avatarsLive(LIVE) || LIVE.launchSite
  const day = formatDate(LAUNCH_DAY, language.locale)
  const money = (n: number) => {
    try {
      return new Intl.NumberFormat(language.locale, { style: 'currency', currency: 'USD' }).format(n)
    } catch {
      return `$${n}`
    }
  }
  const email = { email: () => <PressEmail /> }

  return (
    <div className={s.page}>
      <div className={s.hero}>
        <div className={`${ui.wrap} ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <DisplayHeading as="h1" size={1} className={s.title}>
              {p.title}
              <span className={s.mark}>{t.home.hero.titleMark}</span>
            </DisplayHeading>
            <p className={s.lede}>{p.lede}</p>
            <div className={s.actions}>
              <ActionLink href={`mailto:${PRESS_EMAIL}?subject=Press`}>
                <FaEnvelope aria-hidden focusable={false} className={s.btnIcon} />
                {p.email}
              </ActionLink>
              <ActionLink href="#press-assets" tone="secondary">
                <FaArrowDown aria-hidden focusable={false} className={s.btnIcon} />
                {p.toAssets}
              </ActionLink>
            </div>
          </div>
          {/* Decoration (a computer's width only): an agent from the home line-up, in the spotlight. */}
          <div className={s.heroArt} aria-hidden="true">
            <img src={agent} alt="" width={512} height={818} decoding="async" />
          </div>
        </div>
      </div>

      <div className={ui.wrap}>
        <section className={s.section} aria-labelledby="press-about">
          <Eyebrow>{p.about.eyebrow}</Eyebrow>
          <DisplayHeading id="press-about">{p.about.title}</DisplayHeading>
          <p className={s.short} suppressHydrationWarning>
            {p.about.short(day, out)}
          </p>
          <DisplayHeading as="h3" size={4} className={s.subhead}>
            {p.about.moreTitle}
          </DisplayHeading>
          <ul className={s.cards}>
            {p.about.sections.map((part, i) => (
              <li key={part.title} className={s.card}>
                <span className={s.n} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <DisplayHeading as="h4" size={4} className={s.cardTitle}>
                  {part.title}
                </DisplayHeading>
                <p className={s.text}>{part.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.section} aria-labelledby="press-facts">
          <Eyebrow>{p.facts.eyebrow}</Eyebrow>
          <DisplayHeading id="press-facts">{p.facts.title}</DisplayHeading>
          <dl className={s.facts}>
            <Fact label={p.facts.labels.name}>SpySocial</Fact>
            <Fact label={p.facts.labels.developer}>{OPERATOR.isCompany ? p.facts.developer : OPERATOR.name}</Fact>
            <Fact label={p.facts.labels.genre}>{p.facts.genre}</Fact>
            <Fact label={p.facts.labels.platforms}>{p.facts.platforms}</Fact>
            <Fact label={p.facts.labels.players}>{p.facts.players}</Fact>
            <Fact label={p.facts.labels.release}>
              <span suppressHydrationWarning>{p.facts.release(day, out)}</span>
            </Fact>
            <Fact label={p.facts.labels.price}>{p.facts.price}</Fact>
            <Fact label={p.facts.labels.membership}>
              <span suppressHydrationWarning>{p.facts.membership(money(PRICES_USD.month), money(PRICES_USD.year), money(PRICES_USD.life))}</span>
            </Fact>
            <Fact label={p.facts.labels.languages}>{p.facts.languages}</Fact>
            <Fact label={p.facts.labels.age}>{p.facts.age}</Fact>
            <Fact label={p.facts.labels.website}>
              <a href="https://www.spysocial.app/" className={s.inlineLink} dir="ltr">
                spysocial.app
              </a>
            </Fact>
            {STORES_OPEN && (
              <Fact label={p.facts.labels.stores}>
                <span className={s.pair}>
                  <a href={APP_STORE_URL} className={s.inlineLink}>
                    App Store
                  </a>
                  <a href={PLAY_STORE_URL} className={s.inlineLink}>
                    Google Play
                  </a>
                </span>
              </Fact>
            )}
            <Fact label={p.facts.labels.community}>
              <SocialLinks landmark={false} />
            </Fact>
            <Fact label={p.facts.labels.press}>{rich(p.facts.press, email)}</Fact>
          </dl>
        </section>

        <section className={s.section} aria-labelledby="press-assets-title" id="press-assets">
          <Eyebrow>{p.assets.eyebrow}</Eyebrow>
          <DisplayHeading id="press-assets-title">{p.assets.title}</DisplayHeading>
          <p className={s.sub}>{p.assets.sub}</p>
          <ul className={s.assets}>
            {ASSETS.map((asset) => {
              const what = p.assets[asset.key]
              return (
                <li key={asset.key} className={s.asset}>
                  <div className={`${s.preview} ${s[`panel_${asset.panel}`] ?? ''}`}>
                    <img src={asset.preview} alt="" loading="lazy" decoding="async" />
                  </div>
                  <DisplayHeading as="h3" size={4} className={s.assetTitle}>
                    {what}
                  </DisplayHeading>
                  <div className={s.files}>
                    {asset.files.map((file) => (
                      <FileLink key={file.href} file={file} what={what} label={p.assets.file} />
                    ))}
                  </div>
                </li>
              )
            })}
          </ul>

          <DisplayHeading as="h3" size={3} className={s.subhead}>
            {p.assets.shotsTitle}
          </DisplayHeading>
          <p className={s.sub}>{p.assets.shotsSub}</p>
          <ul className={s.shots}>
            {SHOTS.map((name) => {
              const what = t.launch.shots[name]
              return (
                <li key={name} className={s.shot}>
                  <img
                    src={shot(lang, name, 300)}
                    srcSet={`${shot(lang, name, 300)} 300w, ${shot(lang, name, 600)} 600w`}
                    sizes="(min-width: 1000px) 180px, (min-width: 600px) 30vw, 45vw"
                    alt={what}
                    width={300}
                    height={652}
                    loading="lazy"
                    decoding="async"
                  />
                  <FileLink
                    file={{ format: 'WebP · 600 × 1304', href: shot(lang, name, 600), name: `spysocial-${name}-${lang}.webp` }}
                    what={what}
                    label={p.assets.file}
                  />
                </li>
              )
            })}
          </ul>
        </section>

        <section className={s.section} aria-labelledby="press-safety">
          <Eyebrow>{p.safety.eyebrow}</Eyebrow>
          <DisplayHeading id="press-safety">{p.safety.title}</DisplayHeading>
          <ul className={s.points}>
            {p.safety.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className={s.pair}>
            {ONLINE_SAFETY_TEXT && (
              <SiteLink to="/safety" className={s.inlineLink}>
                {t.footer.safety}
              </SiteLink>
            )}
            <SiteLink to="/child-safety" className={s.inlineLink}>
              {t.footer.childSafety}
            </SiteLink>
            <SiteLink to="/rules" className={s.inlineLink}>
              {t.footer.rules}
            </SiteLink>
          </p>
        </section>

        <section className={s.contact} aria-labelledby="press-contact">
          <DisplayHeading id="press-contact" size={3}>
            {p.contact.title}
          </DisplayHeading>
          <p className={s.contactText}>{rich(p.contact.text, email)}</p>
          <ActionLink href={`mailto:${PRESS_EMAIL}?subject=Press`}>
            <FaEnvelope aria-hidden focusable={false} className={s.btnIcon} />
            {p.email}
          </ActionLink>
        </section>
      </div>
    </div>
  )
}

export default Press
