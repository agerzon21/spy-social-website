import type { IconType } from 'react-icons'
import { FaDiscord, FaInstagram, FaThreads, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { LinkRow, LinkRows } from './ui/LinkRow'
import s from './SocialLinks.module.css'

// Plain outbound links only: nothing is embedded and no third-party script or image loads, so the
// CSP in vercel.json and the Privacy page need no change. The icons are inline SVG from react-icons.
interface SocialAccount {
  name: string
  handle: string
  url: string
  icon: IconType
}

const SOCIAL_ACCOUNTS: SocialAccount[] = [
  { name: 'Instagram', handle: '@spysocial.game', url: 'https://www.instagram.com/spysocial.game', icon: FaInstagram },
  { name: 'TikTok', handle: '@spysocial.game', url: 'https://www.tiktok.com/@spysocial.game', icon: FaTiktok },
  { name: 'YouTube', handle: '@SpySocialGame', url: 'https://www.youtube.com/@SpySocialGame', icon: FaYoutube },
  { name: 'X', handle: '@spysocialgame', url: 'https://x.com/spysocialgame', icon: FaXTwitter },
  { name: 'Threads', handle: '@spysocial.game', url: 'https://www.threads.com/@spysocial.game', icon: FaThreads },
  { name: 'Discord', handle: 'SpySocial server', url: 'https://discord.gg/B8MG3xrV6f', icon: FaDiscord },
]

const label = (a: SocialAccount) => `SpySocial on ${a.name}`

interface SocialLinksProps {
  // 'icons': a compact icon row (footer). 'list': a titled section of rows (Support pages).
  variant?: 'icons' | 'list'
}

const SocialLinks = ({ variant = 'icons' }: SocialLinksProps) => {
  if (variant === 'icons') {
    return (
      <nav aria-label="Follow SpySocial" className={s.icons}>
        {SOCIAL_ACCOUNTS.map((a) => (
          <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer" aria-label={label(a)} title={label(a)} className={s.icon}>
            <a.icon aria-hidden focusable={false} />
          </a>
        ))}
      </nav>
    )
  }

  return (
    <section aria-labelledby="follow-spysocial" className={s.section}>
      <p id="follow-spysocial" className={s.title}>
        Follow SpySocial
      </p>
      <LinkRows>
        {SOCIAL_ACCOUNTS.map((a) => (
          <LinkRow
            key={a.name}
            href={a.url}
            newTab
            ariaLabel={label(a)}
            icon={<a.icon aria-hidden focusable={false} />}
            label={a.name}
            note={a.handle}
            arrow={'↗'}
          />
        ))}
      </LinkRows>
    </section>
  )
}

export default SocialLinks
