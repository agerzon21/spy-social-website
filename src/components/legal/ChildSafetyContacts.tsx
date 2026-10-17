import { useT } from '../../i18n'
import { rich } from '../../i18n/rich'
import { InfoTable, type InfoRow } from './InfoTable'
import { B, OutLink, SupportEmail } from './LegalText'

// Where to report child sexual exploitation: emergency numbers, NCMEC's
// CyberTipline, CEOP and us. Shared by the Safety page and the Child Safety
// Standards page. Details checked on each organization's own site on
// 2026-10-04.

const rows: InfoRow[] = [
  {
    label: 'A child is in danger right now',
    cells: [
      <>
        Call the police: <B>999</B> in the UK, <B>911</B> in the US, <B>112</B> in the EU, or your local emergency
        number. Do this first, before anything else on this page.
      </>,
    ],
  },
  {
    label: 'NCMEC CyberTipline',
    note: 'Child sexual exploitation, from any country',
    cells: [
      <>
        Report online at <OutLink href="https://report.cybertip.org">report.cybertip.org</OutLink>, or call
        1-800-843-5678 (1-800-THE-LOST), any time. Run by the National Center for Missing &amp; Exploited Children.
      </>,
    ],
  },
  {
    label: 'CEOP',
    note: 'In the UK',
    cells: [
      <>
        If you're worried about online sexual abuse, or about the way someone has been talking to a child online,
        report it to CEOP, part of the National Crime Agency:{' '}
        <OutLink href="https://www.ceop.police.uk/Safety-Centre/">ceop.police.uk/Safety-Centre</OutLink>. Young people
        can report too, and a Child Protection Advisor reads every report.
      </>,
    ],
  },
  {
    label: 'SpySocial',
    cells: [
      <>
        Report the player in the app and choose <B>Child Safety</B>, and email <SupportEmail subject="Child safety" />{' '}
        with "Child safety" in the subject. We remove the content, ban the accounts involved, and report it to NCMEC and
        other authorities as the law requires.
      </>,
    ],
  },
]

/**
 * The table. The Child Safety Standards (English only for now) show it in English; `localized` (the Safety page)
 * shows it in the page's language (src/i18n: safety.contacts), with the same organizations, numbers and links.
 */
export const ChildSafetyContacts = ({ localized = false }: { localized?: boolean }) => {
  const t = useT().safety
  if (!localized) return <InfoTable head={['Who', 'How']} rows={rows} firstWidth="30%" />
  const c = t.contacts
  const out = (href: string) => (words: React.ReactNode) => <OutLink href={href}>{words}</OutLink>
  const parts = { b: (words: React.ReactNode) => <B>{words}</B>, email: () => <SupportEmail subject="Child safety" /> }
  const translated: InfoRow[] = [
    { label: c.danger.label, cells: [rich(c.danger.text, parts)] },
    { label: 'NCMEC CyberTipline', note: c.ncmec.note, cells: [rich(c.ncmec.text, { ...parts, link: out('https://report.cybertip.org') })] },
    { label: 'CEOP', note: c.ceop.note, cells: [rich(c.ceop.text, { ...parts, link: out('https://www.ceop.police.uk/Safety-Centre/') })] },
    { label: 'SpySocial', cells: [rich(c.spysocial.text, parts)] },
  ]
  return <InfoTable head={[t.tableWho, t.tableHow]} rows={translated} firstWidth="30%" />
}
