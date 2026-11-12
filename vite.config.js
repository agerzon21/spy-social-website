import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
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
/**
 * The site's own hosts (src/lib/siteHost, subdomains-1110): one build serves them all, and vercel.json serves each
 * host's pages from dist/_host/<host>.html, the app with that host's link preview (title, description, address). Each
 * is in the sitemap while its switches in LIVE are on.
 */
const HOST_PAGES = [
    { host: 'archive', origin: 'https://archive.spysocial.app', key: 'archive', paths: ['/', '/uniques'], live: ['mintedCollectibles', 'uniqueArchive'] },
    { host: 'market', origin: 'https://market.spysocial.app', key: 'market', paths: ['/', '/catalogue'], live: ['marketSite'] },
];
/**
 * www's pages a host also serves (lib/siteHost SHARED: the Archive's Ledger and Transparency page), from that host's own
 * lean app (speed2-1111). On Vercel a file wins over every rewrite, so their www preview files can't sit at
 * dist/<page>/index.html (they'd answer the Archive's address too): they're dist/_page/<page>.html, and the host's are
 * dist/_host/<host>-<page>.html, each with the page's link preview; vercel.json serves each on its host. The ledger's
 * files under /ledger/ (days, proofs, heads.csv) are untouched.
 */
const SHARED_PAGES = { archive: ['/ledger', '/transparency'] };
const isShared = (path) => Object.values(SHARED_PAGES).some((paths) => paths.includes(path));
/** A page's entries as public/sitemap.xml writes them: the bare address and each language's, each with all the alternates. */
function entries(path, langs, origin = ORIGIN) {
    const here = `${origin}${path}`;
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
            const hosts = HOST_PAGES.filter((h) => h.live.every((key) => LIVE[key] === true));
            if (!on.length && !hosts.length)
                return;
            const { LANGUAGES } = (await siteModule(root, 'src/i18n/languages.ts'));
            const langs = LANGUAGES.map((lang) => lang.code);
            const file = resolve(outDir, 'sitemap.xml');
            const xml = await readFile(file, 'utf8');
            if (!xml.includes('</urlset>'))
                throw new Error(`${file} has no </urlset>`);
            // The Archive's and the Market's hosts too: robots.txt (one file, every host) names this sitemap, which lets it
            // list their addresses.
            const added = [
                ...on.map((page) => entries(page.path, langs)),
                ...hosts.flatMap((h) => h.paths.map((path) => entries(path, langs, h.origin))),
            ].join('');
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
/** The invite links' cards (English, as every page's card): a room's and a Game Night's. */
const INVITE_PREVIEWS = [
    {
        path: '/join',
        title: "You're Invited to a SpySocial Room",
        description: 'Open the link to join the room in SpySocial, the party game of social deception: Spy Talk and Spy Sketch with friends.',
    },
    {
        path: '/join/e',
        title: 'Game Night on SpySocial',
        description: 'A SpySocial Game Night: see when it starts in your own time, and join the tables from the app.',
    },
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
        async transformIndexHtml(html, ctx) {
            // The site's own page only: archive.html and market.html are the hosts' apps (hostPages writes their heads).
            if (!/(^|\/)index\.html$/.test(ctx.filename))
                return html;
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
    let env = {};
    return {
        name: 'spysocial-page-previews',
        apply: 'build',
        configResolved(config) {
            root = config.root;
            outDir = resolve(config.root, config.build.outDir);
            env = config.env;
        },
        async writeBundle(_options, bundle) {
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
            // A page's English title and description and its address (www's: the canonical one, on every host).
            const pageSwaps = (page) => {
                const title = attr(`${en.meta.titles[page.key]} · ${en.meta.siteName}`);
                const description = attr(en.meta.descriptions[page.key] ?? en.meta.description);
                return [
                    [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
                    [/(<meta name="description"[^>]*content=")[^"]*"/, `$1${description}"`],
                    [/(<meta property="og:url" content=")[^"]*"/, `$1${ORIGIN}${page.path}"`],
                    [/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`],
                    [/(<meta property="og:description" content=")[^"]*"/, `$1${description}"`],
                    [/(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`],
                    [/(<meta name="twitter:description" content=")[^"]*"/, `$1${description}"`],
                ];
            };
            const swapAll = (html, swaps) => {
                for (const [re, to] of swaps) {
                    if (!re.test(html))
                        throw new Error(`pagePreviews: index.html has no match for ${re}`);
                    html = html.replace(re, to);
                }
                return html;
            };
            for (const page of PREVIEW_PAGES) {
                let html = home;
                if (routeOn[page.path] !== false) {
                    const swaps = pageSwaps(page);
                    if (page.path === '/beta') {
                        const image = `${ORIGIN}/images/og-beta.jpg?v=nov12`;
                        swaps.push([/(<meta property="og:image" content=")[^"]*"/, `$1${image}"`], [/(<meta property="og:image:width" content=")[^"]*"/, '$11200"'], [/(<meta property="og:image:height" content=")[^"]*"/, '$1630"'], [/(<meta property="og:image:alt" content=")[^"]*"/, `$1${attr('SpySocial Beta 2 playtest: Thursday, November 12, 7-8 PM Eastern')}"`], [/(<meta name="twitter:card" content=")[^"]*"/, '$1summary_large_image"'], [/(<meta name="twitter:image" content=")[^"]*"/, `$1${image}"`]);
                    }
                    html = swapAll(html, swaps);
                }
                if (isShared(page.path)) {
                    await mkdir(resolve(outDir, '_page'), { recursive: true });
                    await writeFile(resolve(outDir, '_page', `${page.path.slice(1)}.html`), html);
                }
                else {
                    await mkdir(resolve(outDir, page.path.slice(1)), { recursive: true });
                    await writeFile(resolve(outDir, page.path.slice(1), 'index.html'), html);
                }
            }
            // The invite links (qa-links-1110): a room's (/join/<CODE>, the app's share sheet and QR) and a Game Night's
            // (/join/e/<ID>) said what they are in a Discord or iMessage card; they showed the home page's ("Gather your
            // friends... launches December 8", the square icon). One card per kind, the large one: the link carries no room
            // or night the previewer could read. vercel.json serves dist/join/index.html and dist/join/e/index.html there.
            for (const invite of INVITE_PREVIEWS) {
                let html = home;
                const title = attr(invite.title);
                const description = attr(invite.description);
                const image = `${ORIGIN}/images/og-launch.jpg`;
                const swaps = [
                    [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
                    [/(<meta name="description"[^>]*content=")[^"]*"/, `$1${description}"`],
                    [/(<meta property="og:url" content=")[^"]*"/, `$1${ORIGIN}${invite.path}"`],
                    [/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`],
                    [/(<meta property="og:description" content=")[^"]*"/, `$1${description}"`],
                    [/(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`],
                    [/(<meta name="twitter:description" content=")[^"]*"/, `$1${description}"`],
                    [/(<meta property="og:image" content=")[^"]*"/, `$1${image}"`],
                    [/(<meta property="og:image:width" content=")[^"]*"/, '$11200"'],
                    [/(<meta property="og:image:height" content=")[^"]*"/, '$1630"'],
                    [/(<meta property="og:image:alt" content=")[^"]*"/, `$1${attr('SpySocial: Spy Talk and Spy Sketch, five agents in a police line-up')}"`],
                    [/(<meta name="twitter:card" content=")[^"]*"/, '$1summary_large_image"'],
                    [/(<meta name="twitter:image" content=")[^"]*"/, `$1${image}"`],
                ];
                for (const [re, to] of swaps) {
                    if (!re.test(html))
                        throw new Error(`pagePreviews: index.html has no match for ${re}`);
                    html = html.replace(re, to);
                }
                await mkdir(resolve(outDir, invite.path.slice(1)), { recursive: true });
                await writeFile(resolve(outDir, invite.path.slice(1), 'index.html'), html);
            }
            // Each host's app page (HOST_PAGES; vercel.json serves dist/_host/<host>.html on that host): its English title and
            // description and its own address. With its switches off, the home page's file (the router sends its paths on).
            await mkdir(resolve(outDir, '_host'), { recursive: true });
            for (const h of HOST_PAGES) {
                const app = await hostHtml(outDir, home, h.host, bundle, env.VITE_SUPABASE_URL ?? '');
                // www's pages this host serves too: its app with the page's preview (the home page's while the page is off).
                for (const path of SHARED_PAGES[h.host] ?? []) {
                    const page = PREVIEW_PAGES.find((p) => p.path === path);
                    if (!page)
                        throw new Error(`pagePreviews: no preview for ${path}`);
                    await writeFile(resolve(outDir, '_host', `${h.host}-${path.slice(1)}.html`), routeOn[path] !== false ? swapAll(app, pageSwaps(page)) : app);
                }
                let html = app;
                if (h.live.every((key) => LIVE[key] === true)) {
                    const title = attr(`${en.meta.titles[h.key]} · ${en.meta.siteName}`);
                    const description = attr(en.meta.descriptions[h.key] ?? en.meta.description);
                    const swaps = [
                        [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
                        [/(<meta name="description"[^>]*content=")[^"]*"/, `$1${description}"`],
                        [/(<meta property="og:url" content=")[^"]*"/, `$1${h.origin}/"`],
                        [/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`],
                        [/(<meta property="og:description" content=")[^"]*"/, `$1${description}"`],
                        [/(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`],
                        [/(<meta name="twitter:description" content=")[^"]*"/, `$1${description}"`],
                    ];
                    html = swapAll(html, swaps);
                }
                await writeFile(resolve(outDir, '_host', `${h.host}.html`), html);
            }
        },
    };
}
/**
 * Each host's own app (speed-1111: src/hosts/<host>.tsx, built from <host>.html): its pages, each with the addresses it
 * answers (the early script preloads only the page being opened), and what every page of it loads (the header nav).
 */
const HOST_APPS = {
    archive: {
        pages: [
            [/^\/u\/[^/]+\/\d+\/?$/, 'src/pages/archive/ArchiveItem.tsx'],
            [/^\/uniques\/?$/, 'src/pages/archive/ArchiveBrowse.tsx'],
            [/^\/$/, 'src/pages/archive/ArchiveHome.tsx'],
            // www's pages the Archive serves too (SHARED_PAGES).
            [/^\/ledger\/?$/, 'src/pages/Ledger.tsx'],
            [/^\/transparency\/?$/, 'src/pages/Transparency.tsx'],
        ],
        always: ['src/components/HostNav.tsx'],
    },
    market: {
        pages: [
            [/^\/item\//, 'src/pages/market/MarketItem.tsx'],
            [/^\/movers/, 'src/pages/market/MarketMovers.tsx'],
            [/^\/catalogue/, 'src/pages/market/MarketCatalogue.tsx'],
            [/^\/$/, 'src/pages/market/MarketHome.tsx'],
        ],
        always: ['src/components/HostNav.tsx'],
    },
};
/** Fonts the hosts' first paint can wait for (font-display: swap with a matched fallback, src/theme/fonts.css): not preloaded there. */
const HOST_LATE_FONTS = /<link rel="preload" href="\/static\/barlow-(600|700)-latin-[\w-]+\.woff2"[^>]*>\s*/g;
/**
 * The head start a host's page gives its reads (speed-1111): a small classic script, run as soon as the page is parsed
 * and long before the app's modules have arrived. It starts the fetches the page's first render needs (the ledger read
 * for this address, the picture indexes, the Archive's tables in the reader's language) and keeps each promise in
 * window.__ssEarly under its address, where lib/early.ts hands it to the app's own read of that address; and it
 * modulepreloads the reader's language's chunks (the site's words, the page's words, the item lines). Same addresses as
 * the app builds them (lib/archive.ts, lib/market.ts), or the app just fetches again. A moving backdrop's still (Vault
 * Zero, Panel Break) isn't preloaded: it only stands in while the drawing engine loads, and fetched early it slowed the
 * page's scripts (speed2-1111).
 */
function earlyScript(host, ledger, langChunks, routes) {
    const reads = host === 'archive'
        ? String.raw `f('/archive/data/'+L+'.json');
  if(m=/^\/u\/([^/]+)\/(\d+)\/?$/.exec(P)){l('op=unique&item='+encodeURIComponent(decodeURIComponent(m[1]))+'&serial='+Number(m[2]));
    var key='u-'+decodeURIComponent(m[1])+'-'+Number(m[2]);
    var lv=/^background_(vault_zero|panel_break)$/.test(decodeURIComponent(m[1]));
    [['art','/archive/art/'],['item','/archive/item/']].forEach(function(d){if(lv&&d[0]=='item')return;E['/archive/'+d[0]+'/index.json'].then(function(r){return r.clone().json()}).then(function(k){if(k.indexOf(key)>=0){var i=document.createElement('link');i.rel='preload';i.as='image';i.href=d[1]+key+'.webp';i.fetchPriority='high';document.head.appendChild(i)}},function(){})})}
  else if(/^\/(uniques\/?)?$/.test(P))l('op=uniques');`
        : String.raw `if(m=/^\/item\/([^/]+)\/?$/.exec(P))l('op=market_item&code='+encodeURIComponent(decodeURIComponent(m[1]))+'&lang='+encodeURIComponent(L));
  else l('op=market&lang='+encodeURIComponent(L));`;
    return `/* ${host}.spysocial.app: the page's reads start here (vite.config.ts earlyScript, speed-1111). */
(function(){try{
  var L=document.documentElement.getAttribute('lang')||'en',P=location.pathname,E=window.__ssEarly={},A=${JSON.stringify(ledger)},m;
  var f=function(u){E[u]=fetch(u)},l=function(q){if(A)f(A+'?'+q)};
  if(!new RegExp(${JSON.stringify(`^/(${(SHARED_PAGES[host] ?? []).map((p) => p.slice(1)).join('|') || '-'})/?$`)}).test(P)){
  f('/archive/art/index.json');f('/archive/item/index.json');f('/archive/worn/index.json');f('/archive/scene/index.json');f('/archive/motion/index.json');
  ${reads}}
  var g=function(c){var k=document.createElement('link');k.rel='modulepreload';k.crossOrigin='';k.href='/'+c;document.head.appendChild(k)};
  var R=${JSON.stringify(routes)};for(var i=0;i<R.length;i++)if(new RegExp(R[i][0]).test(P)){R[i][1].forEach(g);R[i][2].forEach(function(c){var k=document.createElement('link');k.rel='stylesheet';k.crossOrigin='';k.href='/'+c;document.head.appendChild(k)});break}
  var C=${JSON.stringify(langChunks)};(C[L]||C.en||[]).forEach(g);
}catch(e){}})();
`;
}
/** The chunks of a language's own words (the site's, the Archive's and the Market's tables, the item lines), by language. */
function langChunks(chunks) {
    const out = {};
    const re = /src\/(?:i18n\/locales|pages\/archive\/locales|pages\/market\/locales|pages\/market\/words)\/([\w-]+)\.(?:ts|json)$/;
    for (const c of chunks) {
        const m = c.facadeModuleId ? re.exec(c.facadeModuleId) : null;
        if (m)
            (out[m[1]] ??= []).push(c.fileName);
    }
    return out;
}
/**
 * A host's page (speed-1111): the site's head (the built index.html: title, previews, theme.js, lang.js, fonts) with
 * the host's own app instead of www's: its script and modulepreloads from the built <host>.html, its CSS inlined, and
 * the host's page chunks (and their CSS) fetched alongside the app instead of after it. hosts/base.css (Chakra's reset
 * and the theme's global styles) stays last, as Chakra's styles were. The early script (earlyScript) comes first. The
 * built <host>.html itself is removed: only vercel.json's dist/_host/<host>.html serves it.
 */
async function hostHtml(outDir, home, host, bundle, ledger) {
    const file = resolve(outDir, `${host}.html`);
    const built = await readFile(file, 'utf8');
    const tags = (html) => html.match(/<script type="module"[^>]*><\/script>|<link rel="(modulepreload|stylesheet)"[^>]*>/g) ?? [];
    const own = tags(built);
    if (!own.some((t) => t.startsWith('<script')))
        throw new Error(`hostHtml: no module script in ${host}.html`);
    let html = home;
    for (const t of tags(home))
        html = html.replace(t, '');
    html = html.replace(HOST_LATE_FONTS, '');
    const read = (href) => readFile(resolve(outDir, href.replace(/^\//, '')), 'utf8');
    const inline = (css) => `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`;
    const chunks = Object.values(bundle).filter((c) => c.type === 'chunk');
    const byName = new Map(chunks.map((c) => [c.fileName, c]));
    const head = [];
    const styles = [];
    // speed2-1111: each inlined file also stays named on the page as a stylesheet link of a type no browser reads (so
    // never fetched or applied; `disabled` alone still downloads in Chrome), so the app's chunk loader, which looks for link[href][rel=stylesheet], doesn't fetch it again and hold
    // the page until it arrives (a page chunk that lists the app's CSS among its own: the Ledger's did, ~0.2 s).
    const inlined = [];
    let last = '';
    for (const t of own) {
        const css = /<link rel="stylesheet"[^>]*href="([^"]+)"/.exec(t);
        if (!css)
            head.push(t);
        else {
            inlined.push(`<link rel="stylesheet" type="text/x-inlined" href="${css[1]}">`);
            const text = await read(css[1]);
            if (text.includes('--chakra-vh'))
                last = inline(text);
            else
                styles.push(inline(text));
        }
    }
    if (!last)
        throw new Error(`hostHtml: no hosts/base.css in ${host}.html`);
    // The host's page chunks and their imports, minus what the app already loads: the nav's in the page, the page being
    // opened's from the early script (its address picks it); their CSS as stylesheets (the app's chunk loader finds them
    // on the page and doesn't fetch them again).
    const have = new Set(own.map((t) => /(?:src|href)="\/([^"]+)"/.exec(t)?.[1]).filter(Boolean));
    const css = new Set();
    const closure = (page, pageCss = css) => {
        const chunk = chunks.find((c) => c.facadeModuleId?.endsWith(page));
        if (!chunk)
            throw new Error(`hostHtml: no chunk for ${page}`);
        const out = [];
        const seen = new Set();
        const add = (name) => {
            if (have.has(name) || seen.has(name))
                return;
            seen.add(name);
            out.push(name);
            const c = byName.get(name);
            for (const dep of c?.imports ?? [])
                add(dep);
            // A chunk's CSS after its imports' (the order the app's chunk loader puts them in: a page's own rules win).
            for (const f of c?.viteMetadata?.importedCss ?? [])
                pageCss.add(f);
        };
        add(chunk.fileName);
        return out;
    };
    const always = HOST_APPS[host].always.flatMap((page) => closure(page));
    for (const name of always)
        have.add(name);
    head.push(...always.map((name) => `<link rel="modulepreload" crossorigin href="/${name}">`));
    // www's pages the host serves too (SHARED_PAGES): their CSS only on their own address, linked by the early script
    // (the host's own pages don't pay for it).
    const routes = HOST_APPS[host].pages.map(([re, page]) => {
        if (!SHARED_PAGES[host]?.some((p) => re.test(p)))
            return [re.source, closure(page), []];
        const own = new Set();
        const files = closure(page, own);
        return [re.source, files, [...own].filter((c) => !css.has(c))];
    });
    const early = earlyScript(host, ledger ? `${ledger.replace(/\/+$/, '')}/functions/v1/ledger` : '', langChunks(chunks), routes);
    const earlyName = `static/early-${host}-${createHash('sha256').update(early).digest('hex').slice(0, 8)}.js`;
    await writeFile(resolve(outDir, earlyName), early);
    // async, high priority: it runs as soon as it arrives (lang.js, before it, has set the page's language).
    head.unshift(`<script async fetchpriority="high" src="/${earlyName}"></script>`);
    const parts = [...head, ...styles, ...[...css].map((c) => `<link rel="stylesheet" crossorigin href="/${c}">`), last, ...inlined];
    await rm(file);
    return html.replace('</head>', `    ${parts.join('\n    ')}\n  </head>`);
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
/** The languages' codes as public/lang.js and vercel.json's rewrites name them (src/i18n/languages.ts). */
const LANG_CODES = ['en', 'es', 'ru', 'zh-Hans', 'hi', 'ar', 'fr', 'bn', 'pt-BR', 'id'];
/**
 * The prerendered file vercel.json's rewrites serve for a www address (www-speed-1112; scripts/prerender.mjs writes
 * dist/_pre/<page>/<base>.html, by the language's base code): the language a ?lang= names, else the one the browser's
 * first language is, else English; Help with a search (?q=) gets the plain app. `vite preview` serves the same way.
 */
function prerenderedFile(outDir, path, query, acceptLanguage) {
    const slug = path === '/' ? 'home' : /^\/([a-z-]+)$/.exec(path)?.[1];
    if (!slug || !existsSync(resolve(outDir, '_pre', slug, 'en.html')))
        return null;
    const q = new URLSearchParams(query);
    if (slug === 'support' && q.has('q'))
        return '/_pre/support/shell.html';
    const bases = LANG_CODES.map((code) => code.split('-')[0]).filter((base) => base !== 'en');
    // vercel.json's values: ?lang=(?<lang>es|ru|zh|...)(?:-Hans|-BR)?, Accept-Language ^\s*(?<lang>es|ru|zh|...)(?:[-_;,].*)?$
    const asked = q.get('lang');
    const fromQuery = asked === null ? null : (new RegExp(`^(${bases.join('|')})(?:-Hans|-BR)?$`).exec(asked)?.[1] ?? 'en');
    const fromHeader = new RegExp(`^\\s*(${bases.join('|')})(?:[-_;,].*)?$`).exec(acceptLanguage)?.[1];
    return `/_pre/${slug}/${fromQuery ?? fromHeader ?? 'en'}.html`;
}
/**
 * www's page leaves the root (speed-1111): on Vercel a file wins over every rewrite, so a dist/index.html answered "/"
 * on archive.spysocial.app and market.spysocial.app too, with www's whole app instead of the host's own. After every
 * other plugin has read it, dist/index.html moves to dist/_host/www.html, which vercel.json's last rewrite serves for
 * www's paths (each host's rewrite comes first). `vite preview` serves the same way.
 */
function wwwHtmlLast() {
    let outDir = resolve(process.cwd(), 'dist');
    return {
        name: 'spysocial-www-html-last',
        // And `vite preview` (which resolves the config as 'serve'), for its routing below.
        apply: (_config, env) => env.command === 'build' || env.isPreview === true,
        configResolved(config) {
            outDir = resolve(config.root, config.build.outDir);
        },
        async closeBundle() {
            await mkdir(resolve(outDir, '_host'), { recursive: true });
            await rename(resolve(outDir, 'index.html'), resolve(outDir, '_host', 'www.html'));
        },
        configurePreviewServer(server) {
            server.middlewares.use((req, _res, next) => {
                const path = (req.url ?? '/').split(/[?#]/)[0];
                const host = (req.headers.host ?? '').split('.')[0];
                // www's prerendered pages (scripts/prerender.mjs), picked as vercel.json's rewrites pick them.
                const pre = host === 'archive' || host === 'market' ? null : prerenderedFile(outDir, path, (req.url ?? '').split('?')[1] ?? '', String(req.headers['accept-language'] ?? ''));
                if (pre)
                    req.url = pre;
                else if (!/\.[a-z0-9]+$/i.test(path) && !existsSync(resolve(outDir, `.${path}`, 'index.html'))) {
                    const page = path.replace(/\/$/, '');
                    // www's pages a host serves too (SHARED_PAGES), as vercel.json's rewrites serve them.
                    if (SHARED_PAGES[host]?.includes(page))
                        req.url = `/_host/${host}-${page.slice(1)}.html`;
                    else if (isShared(page))
                        req.url = `/_page/${page.slice(1)}.html`;
                    else
                        req.url = `/_host/${host === 'archive' || host === 'market' ? host : 'www'}.html`;
                }
                else if (!/\.[a-z0-9]+$/i.test(path))
                    req.url = `${path.replace(/\/$/, '')}/index.html`; // vercel.json's /<page> rewrites
                next();
            });
        },
    };
}
// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => isSsrBuild
    ? {
        // www's prerender (www-speed-1112): `vite build --ssr src/prerender.tsx` with the same plugins that shape the
        // markup (React) and the same asset names, into dist-ssr/; scripts/prerender.mjs runs it after the main build.
        plugins: [react()],
        // Every package bundled in (some are CommonJS that Node's ESM can't name exports from).
        ssr: { noExternal: true },
        build: { assetsDir: 'static', outDir: 'dist-ssr', emptyOutDir: true },
    }
    : {
        plugins: [react(), launchHead(), switchedSitemap(), pagePreviews(), helloPage(), wwwHtmlLast()],
        // Built files live in /static/ (renamed from /assets/ on 2026-10-17, so no browser keeps a stale copy from before)
        build: {
            assetsDir: 'static',
            // Which chunks and CSS each page needs, for scripts/prerender.mjs (which deletes the file after reading it).
            manifest: true,
            // www's page and each host's own app (speed-1111: src/hosts; hostPages above writes dist/_host/<host>.html).
            rollupOptions: { input: Object.fromEntries(['index', 'archive', 'market'].map((name) => [name === 'index' ? 'main' : name, fileURLToPath(new URL(`./${name}.html`, import.meta.url))])) },
        },
    });
