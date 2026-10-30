import { ListItem } from '@chakra-ui/react'
import { LegalPage } from '../components/legal/LegalPage'
import { B, Bullets, H2, P, PageLink, SupportEmail } from '../components/legal/LegalText'
import { LIVE } from '../lib/legalRelease'
import { PUBLISHED_INCIDENTS, RULE_CHANGES } from '../lib/transparency'

// The transparency page (www.spysocial.app/transparency): what the monthly report covers, the incidents published so
// far and the rule changes (Economy Integrity design, owner-approved 2026-10-30, decision 10: monthly). In English like
// the legal pages. Its route, footer link and sitemap entry exist only while LIVE.transparencyPage is on. A skeleton
// until the first report; the numbers come from the app server's ledgers (Intel's coin_ledger and its daily digest,
// the collectibles ledger), never typed in by hand.

/** The day this page's text last changed. */
const UPDATED = 'October 30, 2026'

const KIND: Record<string, string> = { reset: 'Reset', bug: 'Bug', outage: 'Outage' }

const Transparency: React.FC = () => (
  <LegalPage english title="Transparency Report" updated={<>Last Updated: {UPDATED}</>}>
    <P>
      Intel and the items you collect in SpySocial mean something only if nobody can quietly make or take them, us
      included. Each month we publish here what happened to them: how much was made, spent and corrected, every
      incident, and every change to the rules. The numbers come straight from our records, which are only ever added
      to.
    </P>

    <H2>The monthly report</H2>
    <P>
      The first report comes on the 1st of the month after SpySocial 2.2 opens to everyone, and covers the month before.
      Each report has:
    </P>
    <Bullets>
      <ListItem>
        <B>Intel:</B> how much was made, by source (games, daily claims, streaks, shredding), how much was spent, by what
        it was spent on, and how much all players hold at the end of the month.
      </ListItem>
      <ListItem>
        <B>Corrections:</B> for each kind (a reversed line, a bug refund, a fair-play take-back, an outage's Intel), how
        many there were, how many players they affected and the total, with each correction's reason and its incident
        or the category of its case. Never who was corrected.
      </ListItem>
      <ListItem>
        <B>Collectibles:</B> copies minted, copies taken back and why (in error, or for cheating), copies given back
        after an appeal, sets that closed, and Intercepts given, by how they were earned (our own gifts included).
      </ListItem>
      <ListItem>
        <B>Fair play:</B> cases opened and closed, sanctions by category, and appeals, with how many were upheld.
      </ListItem>
      <ListItem>
        <B>Incidents and rule changes:</B> the month's incidents with their summaries, and every change to how much
        Intel games give, to prices and to odds, with the old and new values.
      </ListItem>
      <ListItem>
        The totals as a file you can download. Any number covering fewer than 5 players shows as "fewer than 5". Our own
        test accounts are left out, and their total is stated.
      </ListItem>
    </Bullets>

    <H2>Incidents</H2>
    <P>
      When something goes wrong with Intel or items (a bug, an outage, or the reset before launch), we publish what
      happened and the rule that works out each player's amount here first, and only then put it right. A published
      incident is never changed.
    </P>
    {PUBLISHED_INCIDENTS.length === 0 ? (
      <P>No incidents yet.</P>
    ) : (
      <Bullets>
        {PUBLISHED_INCIDENTS.map((i) => (
          <ListItem key={i.id}>
            <B>
              {i.id} · {i.title}
            </B>{' '}
            ({KIND[i.kind]}, published {i.published}). {i.summary} <B>How each player's amount is worked out:</B> {i.rule}
          </ListItem>
        ))}
      </Bullets>
    )}

    <H2>Rule changes</H2>
    {RULE_CHANGES.length === 0 ? (
      <P>None yet.</P>
    ) : (
      <Bullets>
        {RULE_CHANGES.map((c) => (
          <ListItem key={`${c.day}-${c.what}`}>
            {c.day}: {c.what}, from {c.from} to {c.to}.
          </ListItem>
        ))}
      </Bullets>
    )}

    <H2>How Intel is corrected</H2>
    <P>
      {LIVE.intelCorrections ? (
        <>
          We never add or take Intel by hand. We correct it in only three ways, each a new line in the player's Intel
          ledger with its reason: reversing one line by exactly its amount, refunding a bug we've published here, or
          taking back what a closed fair-play case covers. Bigger corrections wait 24 hours first, and a player can
          appeal within 30 days. Section 9 of our <PageLink to="/terms">Terms</PageLink> has the details.
        </>
      ) : (
        <>
          We never add or take Intel by hand: every change to a player's Intel is a line in their Intel ledger with its
          reason, and lines are never changed or deleted. Section 9 of our <PageLink to="/terms">Terms</PageLink> has the
          details.
        </>
      )}
    </P>
    {LIVE.intelCorrections && (
      <P>
        Every day, a fingerprint of the day's Intel lines is sealed into our collectibles ledger's daily checkpoint, so a
        line changed later would no longer match a record that's already been published.
      </P>
    )}

    <H2>Questions</H2>
    <P>
      If you think a correction to your account is wrong, or you'd like the record of one, write to <SupportEmail />.
    </P>
  </LegalPage>
)

export default Transparency
