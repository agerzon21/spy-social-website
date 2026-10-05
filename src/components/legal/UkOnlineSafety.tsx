import { ListItem } from '@chakra-ui/react'
import { InfoTable, type InfoRow } from './InfoTable'
import { B, Bullets, H2, H3, P, PageLink, SupportEmail } from './LegalText'
import { LIVE, OPERATOR, photosInUse } from '../../lib/legalRelease'

// Terms of Service section 22: what the UK Online Safety Act 2023 asks a
// service's terms to say (s10(5), (7) and s12(9)-(11), s21; Ofcom's Illegal
// Content Code ICU G1, D11, D12 and Protection of Children Code PCU G1, D13).
// Written from the 2.2 records (handoff uk-osa-records-2026-10.md, gap G3):
// each kind of priority illegal content and of content harmful to children,
// the automated tools, and the complaint routes with the times SpySocial
// keeps (every report read within 24 hours; appeals as section 8 says).
// What depends on shipped features follows src/lib/legalRelease.ts.

export const UK_SECTION_NUMBER = 22

const UkOnlineSafety = () => {
  const photos = photosInUse(LIVE)
  const dc = LIVE.drawingCheck
  const without = [
    'direct messages',
    'friend or follower lists',
    'player search',
    'feeds, posts or comments',
    'reposting',
    'voice or video chat',
    ...(photos ? [] : ['photo or video uploads']),
  ]
  const noUploads = photos
    ? "There's no way to send photos or videos. Versions of the app before 2.2 let a player add a profile photo, which only shows next to their name; we may check photos automatically and remove ones that break the rules."
    : "There's no way to upload or send photos or videos: the only pictures are Spy Sketch drawings, drawn with a finger during a turn, and avatars built from the parts the app offers."
  const drawingCheck = dc
    ? ' In public rooms, the drawing check takes a turn that breaks the rules off the drawing.'
    : ''

  const illegal: InfoRow[] = [
    {
      label: 'Terrorism',
      note: 'Content that encourages terrorism, spreads terrorist material, or supports a proscribed (banned) organization.',
      cells: [
        <>
          There's nowhere to post, share files or spread anything beyond one room, and links are refused in public rooms.
          We remove it and ban the account, we ban any account run by or for a proscribed organization, and we tell the
          police when someone's life or safety may be at risk.
        </>,
      ],
    },
    {
      label: 'Child sexual exploitation and abuse',
      note: 'Grooming, sexual content involving anyone under 18 (drawings included), and links to it.',
      cells: [
        <>
          Never allowed (see Child safety in section 7). There are no direct messages, friend lists or player search, so
          nobody can contact a player outside a shared room. Sharing contact details or social media handles is against
          the rules, and public chat refuses links, email addresses and phone numbers. Every chat message is kept on our
          servers for the times above, so a report comes with the words actually sent. Child Safety is an urgent report
          reason.{dc ? ' The drawing check takes a drawing that sexualizes a child off the board in any room.' : ''} We remove the content, ban the accounts involved, keep the evidence the law requires,
          and report it to the National Center for Missing &amp; Exploited Children (NCMEC) or, where UK law requires,
          to the UK's National Crime Agency.
        </>,
      ],
    },
    {
      label: 'Hate, harassment, stalking, threats and abuse',
      note: 'Including controlling or coercive behavior.',
      cells: [
        <>
          In public rooms the word filter blocks slurs and the worst insults; in private rooms it blocks the most serious
          of them. Block hides a player's chat and keeps you out of each other's rooms, and with no direct messages, search
          or follows, nobody can reach you outside a room or find you again after it. Penalties go from a warning to a
          ban (section 8).
        </>,
      ],
    },
    {
      label: 'Encouraging or assisting suicide or serious self-harm',
      cells: [
        <>
          Not allowed anywhere (section 7). The word filter refuses "kill yourself" and similar phrases in every room.
          Self-Harm Concern is an urgent report reason, and we contact the authorities when we believe someone's life is
          at risk.
        </>,
      ],
    },
    {
      label: 'Intimate image abuse, extreme pornography, cyberflashing and animal cruelty',
      note: 'Offences about photos and videos.',
      cells: [<>{noUploads} Sexual content and nudity aren't allowed in drawings or anywhere else.</>],
    },
    {
      label: 'Fraud, scams and other money crimes, drugs, weapons, human trafficking, unlawful immigration and sexual exploitation of adults',
      cells: [
        <>
          Nothing of value can move between players: there's no trading, gifting, tipping, listings or ads
          {LIVE.purchases ? ', and purchases are made only through the App Store or Google Play' : ''}. Links are refused
          in public rooms, and spam, ads and scams aren't allowed anywhere.
        </>,
      ],
    },
    {
      label: 'Foreign interference',
      cells: [<>There are no public posts, feeds or reposting, so nothing reaches beyond the players in one room.</>],
    },
    {
      label: 'Other illegal content',
      note: 'For example, threatening or knowingly false messages.',
      cells: [<>Not allowed (section 7). Reported, removed and acted on like everything above.</>],
    },
  ]

  const children: InfoRow[] = [
    {
      label: 'Pornography',
      note: 'Primary priority content',
      cells: [
        <>
          Not allowed for anyone: no sexual content or nudity (section 7). Explicit sexual words and sexual insults are
          refused in every room. {noUploads}
          {drawingCheck} Sexual Content is an urgent report reason.
        </>,
      ],
    },
    {
      label: 'Suicide',
      note: 'Primary priority content',
      cells: [
        <>
          Not allowed for anyone: nothing that encourages, promotes or gives instructions for suicide (section 7).
          "Kill yourself" and similar phrases are refused in every room. There are no feeds, groups, bios, tags or search
          where this content could gather or be found. Self-Harm Concern is an urgent report reason, and our{' '}
          <PageLink to="/safety">Safety page</PageLink> lists places to get help.
        </>,
      ],
    },
    {
      label: 'Self-harm',
      note: 'Primary priority content',
      cells: [
        <>
          Not allowed for anyone: nothing that encourages, promotes or gives instructions for self-harm (section 7). The
          same protections as for suicide content apply.
        </>,
      ],
    },
    {
      label: 'Eating disorders',
      note: 'Primary priority content',
      cells: [
        <>
          Not allowed for anyone: nothing that encourages, promotes or gives instructions for eating disorders (section
          7). There are no photos of bodies, bios, groups or feeds, and reports are read within 24 hours.
        </>,
      ],
    },
    {
      label: 'Abuse targeting race, religion, sex, sexual orientation, disability or gender reassignment',
      note: 'Priority content',
      cells: [
        <>
          Not allowed (hate and harassment, section 7). The word filter blocks slurs.
          {dc ? ' The drawing check removes a player who draws a hate symbol or a slur, in any room.' : ''} Hate or Harassment
          is a report reason, and Block keeps the player away.
        </>,
      ],
    },
    {
      label: 'Content inciting hatred',
      note: 'Priority content',
      cells: [<>Not allowed (section 7), with the same protections as abuse. Games are short and chats are deleted, so nothing builds up.</>],
    },
    {
      label: 'Bullying',
      note: 'Priority content',
      cells: [
        <>
          Not allowed: no insulting or targeting other players (section 7). Accusing other players is part of the game;
          insulting them isn't. You can block, report or leave at any time, and in a public room players can vote to
          remove someone.
        </>,
      ],
    },
    {
      label: 'Encouraging or instructing serious violence',
      note: 'Priority content',
      cells: [<>Not allowed: no threats and nothing that promotes violence (section 7). Threats can be reported in any room, and penalties go up to a ban.</>],
    },
    {
      label: 'Violent content',
      note: 'Priority content: realistic violence against people, animals or fictional creatures',
      cells: [<>{noUploads} Drawings that promote violence aren't allowed and can be reported.</>],
    },
    {
      label: 'Dangerous stunts and challenges',
      note: 'Priority content',
      cells: [<>Not allowed: nothing that encourages, promotes or gives instructions for dangerous challenges (section 7). There's no video and no feed for a challenge to spread through.</>],
    },
    {
      label: 'Harmful substances',
      note: 'Priority content: encouraging anyone to take harmful substances',
      cells: [
        <>
          Not allowed when it encourages anyone to hurt themselves, and selling or supplying drugs is illegal (section 7).
          There are no listings or payments between players, and links are refused in public rooms.
        </>,
      ],
    },
    {
      label: 'Body shaming',
      note: 'Content that shames or stigmatizes body types or physical features',
      cells: [<>Insults about how someone looks are harassment under the Community Rules: blocked words, reports and penalties apply. There are no photos of bodies to comment on.</>],
    },
    {
      label: 'Content promoting depression, hopelessness or despair',
      cells: [
        <>
          There are no feeds, groups or recommendations to keep showing it, and chats are short and deleted. Self-Harm
          Concern is an urgent report reason, and our <PageLink to="/safety">Safety page</PageLink> lists places to get
          help.
        </>,
      ],
    },
  ]

  const complaints: InfoRow[] = [
    {
      label: dc ? 'A player, a message or a drawing' : 'A player or a message',
      cells: [
        <>
          In the app: long-press the player or their message, then tap Report. A person reads every report within 24
          hours, urgent ones first, and acts on anything that breaks these Terms. The player isn't told who reported
          them, and the app doesn't send you the outcome.
        </>,
      ],
    },
    {
      label: 'Illegal content, without an account or outside the app',
      cells: [
        <>
          Email <SupportEmail subject="Illegal content" />, as section 8 explains. A person reads it within 24 hours; we
          confirm we got it, review it and tell you what we decided.
        </>,
      ],
    },
    {
      label: 'A decision about you or your content',
      note: `A removal, a name change, a warning, a mute, a pause or a ban, including one made by an automated tool`,
      cells: [
        <>
          Appeal by email and quote the reference from your notice (section 8, Appeals). A person looks at it again and
          tells you what we decided. If we got it wrong, we undo it.
        </>,
      ],
    },
    {
      label: 'Our automated tools',
      note: dc
        ? "The word filter or the drawing check stopped or took off something that follows the rules, or was used in a way these Terms don't describe"
        : "The word filter stopped something that follows the rules, or was used in a way these Terms don't describe",
      cells: [
        <>
          Email <SupportEmail subject="Automated tools" /> with "Automated tools" in the subject, and say what happened
          and when. A person reads it within 24
          hours. If the tool got it wrong, we undo what it did{dc ? ' (for example, lift a strike or a penalty)' : ''} and
          fix the tool where we can, and we tell you what we did and that you can also go to court (below).
        </>,
      ],
    },
    {
      label: 'How we meet our online safety duties',
      note: "For example, that we didn't act on illegal or harmful content, that our protections for children fall short, or that we didn't respect your freedom of expression or privacy when applying these Terms",
      cells: [
        <>
          Email <SupportEmail subject="Online safety complaint" /> with "Online safety complaint" in the subject. A
          person reads it within 24 hours and replies with
          what we found and what, if anything, we're changing.
        </>,
      ],
    },
  ]

  return (
    <>
      <H2 id="uk-online-safety">{UK_SECTION_NUMBER}. Online Safety in the UK</H2>
      <P>
        The UK's Online Safety Act 2023 asks services like SpySocial to explain how they protect people from illegal
        content, and how they protect children from content that's harmful to them. This section does that for every kind
        of content the Act names. It applies wherever you play, and it doesn't allow anything that section 7 or the
        Community Rules forbid. Our <PageLink to="/safety">Safety page</PageLink> explains the same things for teens and
        for parents and carers.
      </P>

      <H3>How SpySocial is built</H3>
      <P>
        Much of the protection comes from what SpySocial doesn't have: there are no {without.slice(0, -1).join(', ')}, or{' '}
        {without[without.length - 1]}. Players meet only inside a game room, chat only with the players in that room, and
        can't look each other up afterwards.
        {LIVE.onePool &&
          " Players can't create public rooms, and no player hosts one: the public rooms are Play Online's tables, where the app seats players automatically under the same standard rules, and game nights we host."}{' '}
        Chat messages{LIVE.storedQuestions ? ' and typed questions and answers' : ''}{' '}
        are deleted about 24 hours after they're sent in a private room, and 14 days after in a public room. Public rooms
        and events need a saved account, an age of 13 or older and agreement to the Community Rules, and a player with a
        pause or a ban can't join them.
      </P>

      <H3>How we keep harmful content off SpySocial, and remove it fast</H3>
      <Bullets>
        <ListItem>
          A person reads every report within 24 hours. Reports about child safety, self-harm, sexual content and personal
          information are marked urgent and read first.
        </ListItem>
        <ListItem>
          A report comes with our own copy of the chat around it, so we can check it without waiting for screenshots.
        </ListItem>
        <ListItem>
          When something breaks these Terms, we take it down (a message, a drawing or a name) and act against the account
          as section 8 describes.
        </ListItem>
        <ListItem>
          We tell the authorities when the law requires it, or when we believe someone's life or safety is at risk.
        </ListItem>
      </Bullets>

      <H3>Automated tools</H3>
      <Bullets>
        <ListItem>
          <B>Word filter.</B> Names, usernames and room codes are checked against our whole list of blocked words. Chat
          messages{LIVE.storedQuestions ? ' and typed questions and answers' : ''} are checked before anyone else sees
          them: in public rooms for slurs, explicit sexual words, insults and other blocked words, with links, email
          addresses and phone numbers refused; in private rooms for the most serious words, such as slurs, sexual insults
          and telling someone to kill themselves. The filter works best in English, Spanish and Russian. It stops a
          message or a name from going out; it never penalizes anyone by itself.
        </ListItem>
        {dc ? (
          <ListItem>
            <B>Drawing check.</B> It looks at every Spy Sketch drawing turn in public rooms, and at a drawing reported in
            a private room, and acts as section 8 describes.
          </ListItem>
        ) : (
          <ListItem>
            <B>Drawings</B> aren't checked automatically yet. A person reviews the drawings players report.
          </ListItem>
        )}
      </Bullets>

      <H3>Illegal content</H3>
      <P>
        Illegal content is never allowed. For each kind of priority illegal content the Act names, this is how we keep
        people from coming across it and keep the time it's on SpySocial short:
      </P>
      <InfoTable head={['Kind of content', 'What we do']} rows={illegal} />

      <H3>Content harmful to children</H3>
      <P>
        SpySocial is for players 13 and older (section 2), and teens play in the same rooms as adults. We don't use age
        verification or age estimation. Instead, the kinds of content the Act treats as most harmful to children (primary
        priority content) aren't allowed for anyone, anywhere in SpySocial, and we take them down when we find them. For
        each kind:
      </P>
      <InfoTable head={['Kind of content', 'How we protect children']} rows={children} />

      <H3>Complaints</H3>
      <InfoTable head={['What it’s about', 'How, and what happens']} rows={complaints} />
      <P>
        You can complain in English or in any language the app offers. If you'd rather not hear from us again about a
        complaint, say so and we won't contact you about it.
      </P>

      <H3>Your right to go to court</H3>
      <P>
        These routes don't affect your right to go to court. In particular, if we take down your content, or suspend or
        ban your account, in breach of these Terms, you can bring a claim against us for breach of contract. Section 17
        says which law and courts apply, and that if you're a consumer you keep any right to bring a claim in the courts
        where you live, including in the UK.
      </P>

      <H3>Who is responsible</H3>
      <P>
        {OPERATOR.name ?? 'The operator of SpySocial'}{OPERATOR.name ? ', the operator of SpySocial,' : ''} is responsible
        for these protections and for handling complaints. Section 21 has our contact details.
      </P>
    </>
  )
}

export default UkOnlineSafety
