import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
/** The address search engines know the site by (components/SiteHead.tsx). */
const ORIGIN = 'https://www.spysocial.app';
/**
 * Pages that join sitemap.xml only while their switch in src/lib/legalRelease.ts's LIVE is on (their routes work
 * either way): the roadmap with LIVE.roadmap; the Game Night rules with LIVE.gameNightRules and the transparency page
 * with LIVE.transparencyPage (those routes exist only while they're on). public/sitemap.xml lists every other page.
 */
const SWITCHED_PAGES = [
    // The Beta 2 playtester page: listed until the launch version (LIVE.launchSite sends /beta home); '!' means off.
    { path: '/beta', live: '!launchSite' },
    { path: '/roadmap', live: 'roadmap' },
    { path: '/game-night-rules', live: 'gameNightRules' },
    { path: '/transparency', live: 'transparencyPage' },
    // The Safety page joins with the launch text (a switch of its own, beside LIVE).
    { path: '/safety', live: 'ONLINE_SAFETY_TEXT' },
];
/**
 * One of the site's own modules as the source has it now (a .ts file with no imports: legalRelease.ts,
 * i18n/languages.ts). Read through esbuild rather than imported here, so `tsc -b` keeps this config's project to
 * this file and emits nothing into src/.
 */
async function siteModule(root, file) {
    const path = resolve(root, file);
    const { code } = await transformWithEsbuild(await readFile(path, 'utf8'), path, { loader: 'ts', format: 'esm' });
    return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}
/** A page's entries as public/sitemap.xml writes them: the bare address and each language's, each with all the alternates. */
function entries(path, langs) {
    const here = `${ORIGIN}${path}`;
    const links = [
        ...langs.map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${here}?lang=${lang}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${here}"/>`,
    ].join('\n');
    return [here, ...langs.map((lang) => `${here}?lang=${lang}`)]
        .map((loc) => `  <url>\n    <loc>${loc}</loc>\n${links}\n  </url>\n`)
        .join('');
}
/** Adds the switched pages that are on to the built sitemap.xml (public/sitemap.xml, copied into the build as is). */
function switchedSitemap() {
    let root = process.cwd();
    let outDir = resolve(root, 'dist');
    return {
        name: 'spysocial-switched-sitemap',
        apply: 'build',
        configResolved(config) {
            root = config.root;
            outDir = resolve(config.root, config.build.outDir);
        },
        async writeBundle() {
            const legal = (await siteModule(root, 'src/lib/legalRelease.ts'));
            const LIVE = { ...legal.LIVE, ONLINE_SAFETY_TEXT: legal.ONLINE_SAFETY_TEXT };
            const on = SWITCHED_PAGES.filter((page) => page.live === null ? true : page.live.startsWith('!') ? LIVE[page.live.slice(1)] !== true : LIVE[page.live] === true);
            if (!on.length)
                return;
            const { LANGUAGES } = (await siteModule(root, 'src/i18n/languages.ts'));
            const file = resolve(outDir, 'sitemap.xml');
            const xml = await readFile(file, 'utf8');
            if (!xml.includes('</urlset>'))
                throw new Error(`${file} has no </urlset>`);
            const added = on.map((page) => entries(page.path, LANGUAGES.map((lang) => lang.code))).join('');
            await writeFile(file, xml.replace('</urlset>', `${added}</urlset>`));
        },
    };
}
/** HTML-escapes a value for an attribute or the title. */
const attr = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** The site's pages that get their own link preview (title, description, address, card) in the built HTML. */
const PREVIEW_PAGES = [
    { path: '/support', key: 'faq' },
    { path: '/contact-us', key: 'contact' },
    { path: '/rules', key: 'rules' },
    { path: '/safety', key: 'safety' },
    { path: '/privacy', key: 'privacy' },
    { path: '/terms', key: 'terms' },
    { path: '/child-safety', key: 'childSafety' },
    { path: '/whats-new', key: 'whatsNew' },
    { path: '/roadmap', key: 'roadmap' },
    { path: '/delete-account', key: 'deleteAccount' },
    { path: '/transparency', key: 'transparency' },
    { path: '/game-night-rules', key: 'gameNightRules' },
    { path: '/ledger', key: 'ledger' },
    { path: '/beta', key: 'beta' },
];
/** The store listings (src/lib/stores.ts) and the social accounts (components/SocialLinks), for the structured data. */
const APP_STORE_URL = 'https://apps.apple.com/us/app/spysocial-a-party-game/id6746734390';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.gerz.spysocial';
const SAME_AS = [
    'https://www.instagram.com/spysocial.game',
    'https://www.tiktok.com/@spysocial.game',
    'https://www.youtube.com/@SpySocialGame',
    'https://x.com/spysocialgame',
    'https://www.threads.com/@spysocial.game',
    'https://discord.gg/B8MG3xrV6f',
];
/** index.html's and en.ts's description, without the stores: what src/components/SiteHead.tsx says in English. */
function prelaunch(text) {
    const stores = ' Available on iOS and Google Play.';
    if (!text.includes(stores))
        throw new Error('prelaunch: the description no longer names the stores as this expects');
    return text.split(stores).join(' The new SpySocial launches December 8.');
}
async function loadSite(root) {
    const legal = (await siteModule(root, 'src/lib/legalRelease.ts'));
    const { default: en } = (await siteModule(root, 'src/i18n/locales/en.ts'));
    const { LANGUAGES } = (await siteModule(root, 'src/i18n/languages.ts'));
    // Until the launch the description doesn't name the stores (STORES_OPEN, src/lib/legalRelease.ts).
    const words = legal.LIVE.launchSite === true ? en : { ...en, meta: { ...en.meta, description: prelaunch(en.meta.description) } };
    return { LIVE: legal.LIVE, ONLINE_SAFETY_TEXT: legal.ONLINE_SAFETY_TEXT, en: words, langs: LANGUAGES.map((l) => l.code) };
}
/** The app's structured data (schema.org): the publisher, the site and the app on both stores, free. Launch version only. */
function structuredData(site) {
    const data = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${ORIGIN}/#org`,
                name: 'SpySocial',
                url: `${ORIGIN}/`,
                logo: `${ORIGIN}/images/logo.png`,
                email: 'support@spysocial.app',
                sameAs: SAME_AS,
            },
            { '@type': 'WebSite', '@id': `${ORIGIN}/#site`, name: 'SpySocial', url: `${ORIGIN}/`, inLanguage: site.langs, publisher: { '@id': `${ORIGIN}/#org` } },
            {
                '@type': 'MobileApplication',
                '@id': `${ORIGIN}/#app`,
                name: 'SpySocial',
                description: site.en.meta.description,
                url: `${ORIGIN}/`,
                image: `${ORIGIN}/images/og-launch.jpg`,
                operatingSystem: 'iOS, Android',
                applicationCategory: 'GameApplication',
                applicationSubCategory: 'Party game',
                genre: 'Social deduction',
                softwareVersion: '2.2',
                inLanguage: site.langs,
                installUrl: [APP_STORE_URL, PLAY_STORE_URL],
                sameAs: [APP_STORE_URL, PLAY_STORE_URL],
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                publisher: { '@id': `${ORIGIN}/#org` },
            },
        ],
    };
    // Inside <script>: no "</" can close it early.
    return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}
/**
 * The launch version's <head> (LIVE.launchSite): the large link-preview card (public/images/og-launch.jpg, made from
 * Google Play's feature graphic by scripts/store-shots.mjs) on X / Twitter and everywhere else, and the structured data.
 */
function launchHead() {
    let root = process.cwd();
    return {
        name: 'spysocial-launch-head',
        configResolved(config) {
            root = config.root;
        },
        async transformIndexHtml(html) {
            const site = await loadSite(root);
            if (site.LIVE.launchSite !== true)
                return prelaunch(html);
            const image = `${ORIGIN}/images/og-launch.jpg`;
            const swaps = [
                [/(<meta property="og:image" content=")[^"]*"/, `$1${image}"`],
                [/(<meta property="og:image:width" content=")[^"]*"/, '$11200"'],
                [/(<meta property="og:image:height" content=")[^"]*"/, '$1630"'],
                [/(<meta property="og:image:alt" content=")[^"]*"/, `$1${attr('SpySocial: Spy Talk and Spy Sketch, five agents in a police line-up')}"`],
                [/(<meta name="twitter:card" content=")[^"]*"/, '$1summary_large_image"'],
                [/(<meta name="twitter:image" content=")[^"]*"/, `$1${image}"`],
            ];
            for (const [re, to] of swaps) {
                if (!re.test(html))
                    throw new Error(`launchHead: index.html has no match for ${re}`);
                html = html.replace(re, to);
            }
            return html.replace('</head>', `    ${structuredData(site)}\n  </head>`);
        },
    };
}
/**
 * Each page's link preview. Reddit, Discord, iMessage and the other link previewers don't run the page's script, so
 * they'd see the home page's title and card everywhere; the build writes dist/<page>/index.html for each page in
 * PREVIEW_PAGES, the same page with its English title and description (src/i18n/locales/en.ts: meta.titles,
 * meta.descriptions) and its own address. vercel.json serves each at its path. /beta keeps its own large card
 * (public/images/og-beta.jpg) until the launch version, which sends /beta home (its file is the home page's then);
 * a page whose route is off (its switch) gets the home page's file too.
 */
function pagePreviews() {
    let root = process.cwd();
    let outDir = resolve(root, 'dist');
    return {
        name: 'spysocial-page-previews',
        apply: 'build',
        configResolved(config) {
            root = config.root;
            outDir = resolve(config.root, config.build.outDir);
        },
        async writeBundle() {
            const site = await loadSite(root);
            const { LIVE, en } = site;
            const home = await readFile(resolve(outDir, 'index.html'), 'utf8');
            const routeOn = {
                '/safety': site.ONLINE_SAFETY_TEXT,
                '/transparency': LIVE.transparencyPage === true,
                '/game-night-rules': LIVE.gameNightRules === true,
                '/ledger': LIVE.mintedCollectibles === true,
                '/beta': LIVE.launchSite !== true,
            };
            for (const page of PREVIEW_PAGES) {
                let html = home;
                if (routeOn[page.path] !== false) {
                    const title = attr(`${en.meta.titles[page.key]} · ${en.meta.siteName}`);
                    const description = attr(en.meta.descriptions[page.key] ?? en.meta.description);
                    const swaps = [
                        [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
                        [/(<meta name="description"[^>]*content=")[^"]*"/, `$1${description}"`],
                        [/(<meta property="og:url" content=")[^"]*"/, `$1${ORIGIN}${page.path}"`],
                        [/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`],
                        [/(<meta property="og:description" content=")[^"]*"/, `$1${description}"`],
                        [/(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`],
                        [/(<meta name="twitter:description" content=")[^"]*"/, `$1${description}"`],
                    ];
                    if (page.path === '/beta') {
                        const image = `${ORIGIN}/images/og-beta.jpg?v=nov12`;
                        swaps.push([/(<meta property="og:image" content=")[^"]*"/, `$1${image}"`], [/(<meta property="og:image:width" content=")[^"]*"/, '$11200"'], [/(<meta property="og:image:height" content=")[^"]*"/, '$1630"'], [/(<meta property="og:image:alt" content=")[^"]*"/, `$1${attr('SpySocial Beta 2 playtest: Thursday, November 12, 7-8 PM Eastern')}"`], [/(<meta name="twitter:card" content=")[^"]*"/, '$1summary_large_image"'], [/(<meta name="twitter:image" content=")[^"]*"/, `$1${image}"`]);
                    }
                    for (const [re, to] of swaps) {
                        if (!re.test(html))
                            throw new Error(`pagePreviews: index.html has no match for ${re}`);
                        html = html.replace(re, to);
                    }
                }
                await mkdir(resolve(outDir, page.path.slice(1)), { recursive: true });
                await writeFile(resolve(outDir, page.path.slice(1), 'index.html'), html);
            }
        },
    };
}
/** A `const NAME = new Date('...')` in one of the site's sources: the page below reads the same instant the site does. */
async function sourceDate(root, file, name) {
    const found = new RegExp(`\\b${name}\\s*=\\s*(?:new Date\\()?'([^']+)'`).exec(await readFile(resolve(root, file), 'utf8'));
    const date = found ? new Date(found[1]) : null;
    if (!date || Number.isNaN(date.getTime()))
        throw new Error(`helloPage: no date ${name} in ${file}`);
    return date;
}
/**
 * /hello, the page the merch QR opens: src/hello/page.ts, written to dist/hello/index.html at build time from the
 * site's own words, colours, faces and dates, with no JavaScript bundle (it's for a weak signal). It adds this one
 * file: the rest of the build stays as it was. public/hello/hello.js is its small script.
 */
function helloPage() {
    let root = process.cwd();
    let outDir = resolve(root, 'dist');
    let env = {};
    return {
        name: 'spysocial-hello-page',
        apply: 'build',
        configResolved(config) {
            root = config.root;
            outDir = resolve(config.root, config.build.outDir);
            env = config.env;
        },
        async writeBundle() {
            const site = await loadSite(root);
            // From the launch flip /hello is the app's own file, whose route goes home: nobody is told to wait for what's out.
            if (site.LIVE.launchSite === true) {
                await mkdir(resolve(outDir, 'hello'), { recursive: true });
                await writeFile(resolve(outDir, 'hello', 'index.html'), await readFile(resolve(outDir, 'index.html'), 'utf8'));
                return;
            }
            const { LANGUAGES } = (await siteModule(root, 'src/i18n/languages.ts'));
            const { HELLO_STRINGS } = (await siteModule(root, 'src/hello/strings.ts'));
            const { helloHtml } = (await siteModule(root, 'src/hello/page.ts'));
            const { DISCORD_URL } = (await siteModule(root, 'src/lib/social.ts'));
            const { noir } = (await siteModule(root, 'src/theme/skins/noir.ts'));
            const { daylight } = (await siteModule(root, 'src/theme/skins/daylight.ts'));
            const launch = await sourceDate(root, 'src/lib/launchDay.ts', 'LAUNCH_DAY');
            const closes = await sourceDate(root, 'src/lib/betaSignup.ts', 'CLOSES_AT');
            const start = await sourceDate(root, 'src/pages/Beta.tsx', 'START');
            const closeShown = await sourceDate(root, 'src/pages/Beta.tsx', 'CLOSE_SHOWN');
            const ET = 'America/New_York';
            const DAY = { weekday: 'long', month: 'long', day: 'numeric', timeZone: ET };
            const DATE = { month: 'long', day: 'numeric', timeZone: ET };
            const languages = await Promise.all(LANGUAGES.map(async ({ code, native, rtl, locale }) => {
                // A language's table is English where it leaves something out, as on the rest of the site (src/i18n).
                const own = code === 'en' ? {} : (await siteModule(root, `src/i18n/locales/${code}.ts`)).default;
                const t = deepOver(site.en, own);
                const pitch = /<b>(.*?)<\/b>/.exec(t.home.hero.lede)?.[1];
                if (!pitch)
                    throw new Error(`helloPage: no bold line in ${code}'s home.hero.lede`);
                const words = HELLO_STRINGS[code];
                if (!words)
                    throw new Error(`helloPage: no words for ${code} in src/hello/strings.ts`);
                const day = new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric' }).format(launch);
                const when = new Intl.DateTimeFormat(locale, DATE).format(start);
                // The date stays on one line (8\u00a0ноября), wherever the sentence wraps.
                const closeDay = new Intl.DateTimeFormat(locale, DAY).format(closeShown).replace(/(\d) (?=\S)|(\S) (?=\d)/g, '$1$2\u00a0');
                const closeTime = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', timeZone: ET }).format(closeShown).replace(/ /g, ' ');
                return {
                    code,
                    native,
                    rtl,
                    title: t.home.hero.title,
                    mark: t.home.hero.titleMark,
                    eyebrow: t.home.hero.eyebrow,
                    pitch,
                    day,
                    words,
                    remindButton: words.remind.button(day.replace(/ /g, '\u00a0')),
                    doneDetail: words.remind.doneDetail(day),
                    discord: t.beta.discord,
                    betaEyebrow: t.beta.eyebrow,
                    // The day, then "Adults 18+" and "24 seats" (/beta's own facts, in the order 1 hour, adults, seats, phones).
                    betaFacts: [when, t.beta.facts[1], t.beta.facts[2]],
                    betaCloses: t.beta.join.closes(closeDay, closeTime),
                    betaSignUp: t.beta.signUp,
                    age: t.home.safety.title,
                    languageLabel: t.language.menu,
                };
            }));
            const files = await readdir(resolve(outDir, 'static'));
            const asset = (pattern) => {
                const name = files.find((file) => pattern.test(file));
                if (!name)
                    throw new Error(`helloPage: no ${pattern} in the build's static files`);
                return `/static/${name}`;
            };
            const vars = (skin) => {
                const c = skin.colors;
                const a = skin.art;
                return Object.entries({
                    page: c.page,
                    field: c.surfaceStrong,
                    danger: c.danger,
                    'warn-surface': c.warnSurface,
                    text: c.text,
                    body: c.body,
                    line: c.lineStrong,
                    control: c.control,
                    accent: c.accent,
                    'on-accent': c.onAccent,
                    'accent-text': c.accentText,
                    highlight: c.highlight,
                    focus: c.focus,
                    'hero-sky': a.heroSky,
                    'wall-line': a.wallLine,
                    pool: a.pool,
                })
                    .map(([k, v]) => `--${k}:${v};`)
                    .join('');
            };
            // As src/lib/supabase.ts has them. A deploy without them must fail here, or the form could never send.
            const supabaseUrl = env.VITE_SUPABASE_URL ?? '';
            const anonKey = env.VITE_SUPABASE_ANON_KEY ?? '';
            if (process.env.VERCEL && !(supabaseUrl && anonKey))
                throw new Error('helloPage: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing');
            const html = helloHtml({
                languages,
                darkVars: vars(noir),
                lightVars: vars(daylight),
                fontDisplay: noir.fonts.display,
                fontBody: noir.fonts.body,
                fonts: {
                    display: asset(/^big-shoulders-display-latin-(?!ext-)[\w-]+\.woff2$/),
                    displayCyrillic: asset(/^oswald-cyrillic-[\w-]+\.woff2$/),
                    body: asset(/^barlow-600-latin-(?!ext-)[\w-]+\.woff2$/),
                },
                discordUrl: DISCORD_URL,
                rpcUrl: supabaseUrl ? `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/rpc/launch_reminder_signup` : '',
                anonKey,
                closesAt: closes.toISOString(),
                metaTitle: 'SpySocial: the new version launches December 8',
                metaDescription: 'SpySocial is the party game of social deception. The new version launches December 8. The version in the stores today is the old one, so wait for this one.',
                origin: ORIGIN,
            });
            await mkdir(resolve(outDir, 'hello'), { recursive: true });
            await writeFile(resolve(outDir, 'hello', 'index.html'), html);
        },
    };
}
/** src/i18n's `over`: a translation over English, English wherever it leaves something out. */
function deepOver(base, top) {
    if (typeof base === 'object' && base !== null && !Array.isArray(base)) {
        if (typeof top !== 'object' || top === null || Array.isArray(top))
            return base;
        return Object.fromEntries(Object.entries(base).map(([k, v]) => [k, deepOver(v, top[k])]));
    }
    if (Array.isArray(base))
        return Array.isArray(top) ? top : base;
    return typeof top === typeof base ? top : base;
}
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), launchHead(), switchedSitemap(), pagePreviews(), helloPage()],
    // Built files live in /static/ (renamed from /assets/ on 2026-10-17, so no browser keeps a stale copy from before)
    build: { assetsDir: 'static' },
});
