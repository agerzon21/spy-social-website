/**
 * /hello: the page the merch QR opens (vercel.json sends the bare https://spysocial.app there). Festival crowd, phones,
 * bad light, weak signal: so one plain HTML file with its CSS and all ten languages inside, no React and no Chakra.
 * The words are on screen with the first few KB; the faces swap in when they arrive.
 *
 * vite.config.ts (helloPage) renders it at build time from the site's own sources and writes dist/hello/index.html.
 * Nothing in src/ imports this folder, so the rest of the site's build is byte for byte what it was without it.
 *
 * The language: public/lang.js sets <html lang> and dir before the first paint, exactly as on every other page (?lang=,
 * the visitor's earlier choice, the browser's languages, English), and the CSS shows that language's <main>. Without
 * the script it's English. The theme: public/theme.js, like every page. The Beta 2 block: public/hello/hello.js.
 *
 * COMES OFF AT THE LAUNCH: this page tells people to wait, and has no store buttons. When 2.2 is out, take the first
 * redirect out of vercel.json, and spysocial.app is the home page again.
 *
 * No imports but types, and pure functions only: the build reads this file through esbuild.
 */
import type { HelloStrings } from './strings'

/** What the build hands over for one language: the site's words already written out. */
export interface HelloLanguage {
  code: string
  native: string
  rtl: boolean
  title: string
  mark: string
  eyebrow: string
  pitch: string
  day: string
  words: HelloStrings
  /** words.remind's functions written out with the launch day. */
  remindButton: string
  doneDetail: string
  discord: string
  betaEyebrow: string
  betaFacts: string[]
  betaCloses: string
  betaSignUp: string
  age: string
  languageLabel: string
}

export interface HelloInput {
  languages: HelloLanguage[]
  /** The two themes' colours and art, from src/theme/skins as --name: value lists. */
  darkVars: string
  lightVars: string
  fontDisplay: string
  fontBody: string
  fonts: { display: string; displayCyrillic: string; body: string }
  discordUrl: string
  /** The reminder RPC's address and the public anon key, as the site's own Supabase client has them. */
  rpcUrl: string
  anonKey: string
  closesAt: string | null
  metaTitle: string
  metaDescription: string
  origin: string
}

const esc = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** The spy head, the merch art's (merch/build/designs.mjs, spyHead), and the two icons: defined once, used by all ten languages. */
const SYMBOLS = `<svg hidden><symbol id="i-head" viewBox="-13 -13 261 268"><g fill="#fefaea" stroke="#fefaea" stroke-width="26" stroke-linejoin="round"><circle cx="117.68" cy="141.4" r="100"/><path d="M117.68 13.94C108.32 13.94 99.46 11.64 91.07 7.56C84.74 4.49 78.33 -0.79 70.93 0.1C61.57 1.23 59.54 10.84 57.7 18.39C54.83 30.18 51.98 41.98 49.17 53.79C47.71 59.94 46.74 66.44 44.68 72.42C40.91 74.08 36.42 74.53 32.43 75.58C25.16 77.48 17.86 79.91 11.25 83.54C7.18 85.77 2.27 88.86 0.53 93.39C-1.05 97.51 1.09 101.37 4.1 104.14C9.65 109.25 17.36 112.21 24.43 114.52C53.63 124.02 87.1 126.26 117.68 126.26C148.26 126.26 181.74 124.02 210.94 114.52C218.01 112.21 225.72 109.25 231.27 104.14C234.28 101.37 236.42 97.51 234.84 93.39C233.1 88.86 228.19 85.77 224.12 83.54C217.51 79.91 210.21 77.48 202.94 75.58C198.95 74.53 194.46 74.08 190.69 72.42C188.63 66.44 187.66 59.94 186.2 53.79C183.39 41.98 180.54 30.18 177.67 18.39C175.83 10.84 173.8 1.23 164.44 0.1C157.04 -0.79 150.63 4.49 144.3 7.56C135.91 11.64 127.05 13.94 117.68 13.94Z"/></g><circle cx="117.68" cy="141.4" r="100" fill="#ff9500"/><path d="M117.68 13.94C108.32 13.94 99.46 11.64 91.07 7.56C84.74 4.49 78.33 -0.79 70.93 0.1C61.57 1.23 59.54 10.84 57.7 18.39C54.83 30.18 51.98 41.98 49.17 53.79C47.71 59.94 46.74 66.44 44.68 72.42C40.91 74.08 36.42 74.53 32.43 75.58C25.16 77.48 17.86 79.91 11.25 83.54C7.18 85.77 2.27 88.86 0.53 93.39C-1.05 97.51 1.09 101.37 4.1 104.14C9.65 109.25 17.36 112.21 24.43 114.52C53.63 124.02 87.1 126.26 117.68 126.26C148.26 126.26 181.74 124.02 210.94 114.52C218.01 112.21 225.72 109.25 231.27 104.14C234.28 101.37 236.42 97.51 234.84 93.39C233.1 88.86 228.19 85.77 224.12 83.54C217.51 79.91 210.21 77.48 202.94 75.58C198.95 74.53 194.46 74.08 190.69 72.42C188.63 66.44 187.66 59.94 186.2 53.79C183.39 41.98 180.54 30.18 177.67 18.39C175.83 10.84 173.8 1.23 164.44 0.1C157.04 -0.79 150.63 4.49 144.3 7.56C135.91 11.64 127.05 13.94 117.68 13.94Z" fill="#0a0a0a"/><path d="M117.68 138.77C96.99 138.77 76.23 137.46 55.76 134.4C50.86 133.66 45.98 132.81 41.14 131.77C37.75 131.04 34.41 130.15 31.3 132.23C25.08 136.4 28.89 144.12 30.68 149.64C35.16 163.52 38.03 178.51 52.83 184.95C57.43 186.96 62.58 187.54 67.5 188.3C73.64 189.25 79.75 190.37 85.88 191.37C90.14 192.07 95.25 193.78 99.44 192.06C107.18 188.87 108.13 176.74 117.68 176.74C127.24 176.74 128.19 188.87 135.93 192.06C140.12 193.78 145.23 192.07 149.49 191.37C155.62 190.37 161.73 189.25 167.87 188.3C172.79 187.54 177.93 186.96 182.54 184.95C197.34 178.51 200.21 163.52 204.69 149.64C206.48 144.12 210.28 136.4 204.07 132.23C200.96 130.15 197.62 131.04 194.23 131.77C189.39 132.81 184.51 133.66 179.61 134.4C159.13 137.46 138.38 138.77 117.68 138.77ZM58.93 149.27C54.92 149.91 53.13 154.43 54.2 157.99C56 163.96 60.73 169.11 66.07 172.16C74.94 177.23 86.43 177.24 95.13 171.77C99.46 169.04 106.57 161.69 100.22 157.02C97.35 154.91 92.44 154.91 89.02 154.27C82.21 153 75.39 151.76 68.56 150.57C65.58 150.05 61.96 148.78 58.93 149.27ZM176.43 149.27C173.41 148.78 169.79 150.05 166.81 150.57C159.98 151.76 153.16 153 146.34 154.27C142.93 154.91 138.02 154.91 135.15 157.02C128.8 161.69 135.91 169.04 140.24 171.77C148.94 177.24 160.43 177.23 169.3 172.16C174.64 169.11 179.37 163.96 181.17 157.99C182.24 154.43 180.45 149.91 176.43 149.27Z" fill="#0a0a0a" fill-rule="evenodd"/></symbol><symbol id="i-discord" viewBox="0 0 640 512"><path fill="currentColor" d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></symbol><symbol id="i-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" d="M5 12h14M13 6l6 6-6 6"/></symbol></svg>`
const icon = (id: string, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} aria-hidden="true" focusable="false"><use href="#i-${id}"/></svg>`

function css(input: HelloInput): string {
  const { languages, fonts } = input
  const face = (family: string, weight: string, url: string, range: string) =>
    `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url('${url}') format('woff2');unicode-range:${range}}`
  const latin = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2212,U+2215'
  return [
    face('Oswald', '500 700', fonts.displayCyrillic, 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116'),
    face('Big Shoulders Display', '100 900', fonts.display, latin),
    face('Barlow', '600', fonts.body, latin),
    `:root{${input.darkVars}--font-display:${input.fontDisplay};--font-body:${input.fontBody};color-scheme:dark}`,
    `:root[data-theme="light"]{${input.lightVars}color-scheme:light}`,
    STYLES,
    // Each language's <main> shows under its own <html lang>; lang.js set that before the first paint.
    languages.map((l) => `html[lang="${l.code}"] main[data-l="${l.code}"]`).join(',') + '{display:flex}',
  ].join('')
}

const STYLES = `
*{box-sizing:border-box}
[hidden]{display:none!important}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{--head:min(34vw,15vh,132px);margin:0;min-height:100vh;min-height:100svh;background:var(--page);color:var(--text);font:600 17px/1.4 var(--font-body);position:relative;overflow-x:hidden}
@supports (height:1svh){body{--head:min(34vw,15svh,132px)}}
body::before{content:'';position:absolute;inset:0;pointer-events:none;background:
  repeating-linear-gradient(180deg,var(--wall-line) 0 1.5px,transparent 1.5px 34px) top/100% 340px no-repeat,
  radial-gradient(90% 280px at 50% 130px,var(--pool),transparent 70%),
  radial-gradient(130% 440px at 50% -60px,var(--hero-sky),transparent 70%);
  -webkit-mask-image:linear-gradient(180deg,#000 120px,transparent 340px);mask-image:linear-gradient(180deg,#000 120px,transparent 340px)}
main{display:none;position:relative;flex-direction:column;align-items:center;min-height:100vh;min-height:100svh;width:100%;max-width:480px;margin-inline:auto;
  padding:max(clamp(10px,2.4vh,30px),env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(4px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));text-align:center}
.head{flex:none;margin-top:auto;display:block;width:var(--head);height:calc(var(--head)*1.027);margin-bottom:calc(var(--head)*-.1);position:relative}
h1{position:relative;margin:0;font-family:var(--font-display);font-weight:900;text-transform:uppercase;line-height:.84;letter-spacing:.005em;
  font-size:calc(min(25.5vw,calc(var(--head)*1.05),122px)*var(--fit,1));text-shadow:.045em .045em 0 var(--accent);text-wrap:balance;color:var(--text)}
h1 span{color:var(--accent);text-shadow:none}
.eyebrow{margin:14px 0 0;font-size:13px;line-height:1.25;letter-spacing:.12em;text-transform:uppercase;color:var(--highlight);text-wrap:balance}
.pitch{margin:4px 0 0;font-size:clamp(17px,5vw,21px);line-height:1.22;color:var(--text);text-wrap:balance}
.when{width:100%;margin:auto 0;padding:12px 0}
.when p{margin:0}
.before,.after{font-size:clamp(18px,5.2vw,22px);line-height:1.2;color:var(--text)}
.day{font-family:var(--font-display);font-weight:900;text-transform:uppercase;line-height:.98;letter-spacing:.01em;font-size:calc(min(19vw,92px)*var(--fit-day,1));color:var(--accent-text);white-space:nowrap}
.when .stores{margin-top:8px;font-size:clamp(15px,4.4vw,18px);line-height:1.32;color:var(--body);text-wrap:balance}
.stores b{font-weight:600;color:var(--text);white-space:nowrap}
.remind{width:100%}
.remind form{display:flex;flex-direction:column;gap:8px;margin:0}
.remind input[type="email"]{display:block;width:100%;min-height:52px;padding:0 14px;border:1.5px solid var(--control);border-radius:0;background:var(--field);color:var(--text);font:600 17px/1.2 var(--font-body);text-align:start;-webkit-appearance:none;appearance:none}
.remind input[type="email"]::placeholder{color:var(--body);opacity:1}
.remind input[type="email"]:focus{outline:2px solid var(--focus);outline-offset:1px}
.age{display:flex;align-items:center;justify-content:center;gap:10px;min-height:44px;margin:-4px 0;font-size:16px;line-height:1.2;color:var(--text);cursor:pointer}
.age input{flex:none;width:24px;height:24px;margin:0;accent-color:var(--accent)}
.trap{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.msg{margin:0;padding:8px 10px;border-inline-start:3px solid var(--danger);background:var(--warn-surface);font-size:15px;line-height:1.3;color:var(--text);text-align:start}
.note{margin:6px 0 0;font-size:13px;line-height:1.3;color:var(--body);text-wrap:balance}
.note a{padding:12px 6px;margin:-12px -6px;color:var(--body);text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px;white-space:nowrap}
.done{padding:14px 12px;border:1.5px solid var(--accent);outline:none}
.done p{margin:0}
.done .title{font-family:var(--font-display);font-weight:800;text-transform:uppercase;font-size:30px;line-height:1.05;letter-spacing:.03em;color:var(--accent-text)}
.done .detail{margin-top:4px;font-size:16px;line-height:1.3;color:var(--text)}
.btn:disabled{opacity:.72}
.btn{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;min-height:58px;padding:8px 20px;text-decoration:none;font:800 24px/1.05 var(--font-display);letter-spacing:.08em;text-transform:uppercase;-webkit-tap-highlight-color:transparent}
.btn svg{flex:none;width:30px;height:24px}
.btn .arrow{width:22px;height:22px}
html[dir="rtl"] .arrow{transform:scaleX(-1)}
.primary{flex:none;border:0;border-radius:0;cursor:pointer;background:var(--accent);color:var(--on-accent);font-size:clamp(19px,6vw,26px);-webkit-appearance:none;appearance:none}
.secondary{min-height:48px;border:1.5px solid var(--control);color:var(--text);font-size:20px}
.discord{margin-top:12px}
.btn:focus-visible,a:focus-visible,summary:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
.beta{width:100%;margin-top:14px;padding-top:12px;border-top:1.5px solid var(--line)}
.beta p{margin:0}
.beta .eyebrow{margin:0}
.beta .facts{display:flex;flex-wrap:wrap;justify-content:center;gap:0 14px;margin-top:4px;font-size:clamp(15px,4.4vw,17px);line-height:1.3;color:var(--text)}
.facts span{white-space:nowrap}
.beta .closes{margin:1px 0 8px;font-size:14px;line-height:1.3;color:var(--body);hyphens:manual;-webkit-hyphens:manual;text-wrap:balance}
.fine{display:contents}
footer{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;column-gap:14px;width:100%;margin-top:auto;padding-top:6px;font-size:13px;line-height:1.25;color:var(--body)}
footer span,footer a,summary{display:inline-flex;align-items:center;min-height:44px}
footer a,summary{color:var(--body);text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
details{margin:0}
details[open]{flex-basis:100%}
summary{justify-content:center;cursor:pointer;list-style:none}
summary::-webkit-details-marker{display:none}
.langs{display:grid;grid-template-columns:1fr 1fr;gap:0 12px;padding:0 0 8px}
.langs a{justify-content:center;font-size:15px;color:var(--text);text-decoration:none}
html:is([lang='ar'],[lang='hi'],[lang='bn']) body *{letter-spacing:0!important}
html:is([lang='ar'],[lang='hi'],[lang='bn'],[lang='zh-Hans']) .eyebrow{font-size:15px}
html:is([lang='es'],[lang='fr'],[lang='pt-BR']){--fit:.8}
html[lang='id']{--fit:.86}
html[lang='ru']{--fit:.68}
html:is([lang='ar'],[lang='hi'],[lang='bn'],[lang='zh-Hans']){--fit:.72}
html:is([lang='es'],[lang='pt-BR']){--fit-day:.72}
html[lang='fr']{--fit-day:.92}
html[lang='bn']{--fit:.6;--fit-day:.8}
html[lang='hi']{--fit:.66;--fit-day:.86}
html[lang='zh-Hans']{--fit:.68;--fit-day:.86}
html[lang='ru'] h1{line-height:1;font-weight:700}
html[lang='ru'] :is(.pitch,.stores){hyphens:auto;-webkit-hyphens:auto}
html:is([lang='ar'],[lang='hi'],[lang='bn'],[lang='zh-Hans']) :is(h1,.day,.btn){line-height:1.25}
html:is([lang='ar'],[lang='hi'],[lang='bn']) h1{font-weight:800}
`

function pageFor(l: HelloLanguage, input: HelloInput): string {
  const { words: w } = l
  const others = input.languages
    .map((o) => `<a href="?lang=${esc(o.code)}" lang="${esc(o.code)}"${o.rtl ? ' dir="rtl"' : ''}>${esc(o.native)}</a>`)
    .join('')
  const beta = input.closesAt
    ? `<section class="beta" data-beta hidden><p class="eyebrow">${esc(l.betaEyebrow)}</p><p class="facts">${l.betaFacts.map((fact) => `<span>${esc(fact)}</span>`).join('')}</p><p class="closes">${esc(l.betaCloses)}</p><a class="btn secondary" href="/beta">${esc(l.betaSignUp)}${icon('arrow', 'arrow')}</a></section>`
    : ''
  return `<main data-l="${esc(l.code)}" lang="${esc(l.code)}" dir="${l.rtl ? 'rtl' : 'ltr'}">
${icon('head', 'head')}
<h1>${esc(l.title)}<span>${esc(l.mark)}</span></h1>
<p class="eyebrow">${esc(l.eyebrow)}</p>
<p class="pitch">${esc(l.pitch)}</p>
<div class="when"><p class="before">${esc(w.before)}</p><p class="day">${esc(l.day)}</p>${w.after ? `<p class="after">${esc(w.after)}</p>` : ''}<p class="stores">${esc(w.stores)} <b>${esc(w.wait)}</b></p></div>
<section class="remind"><form data-remind data-sending="${esc(w.remind.sending)}" method="get" action="/hello" novalidate>
<input type="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" required placeholder="${esc(w.remind.email)}" aria-label="${esc(w.remind.email)}">
<label class="age"><input type="checkbox" required><span>${esc(w.remind.age)}</span></label>
<label class="trap" aria-hidden="true">Website<input data-trap name="website" type="text" tabindex="-1" autocomplete="off"></label>
<p class="msg" data-m="bad" role="alert" hidden>${esc(w.remind.badEmail)}</p><p class="msg" data-m="age" role="alert" hidden>${esc(w.remind.ageMissing)}</p><p class="msg" data-m="net" role="alert" hidden>${esc(w.remind.network)}</p><p class="msg" data-m="busy" role="alert" hidden>${esc(w.remind.busy)}</p><p class="msg" data-m="no" role="alert" hidden>${esc(w.remind.refused)}</p>
<button class="btn primary" type="submit"><span data-label>${esc(l.remindButton)}</span></button>
</form>
<div class="done" data-done role="status" tabindex="-1" hidden><p class="title">${esc(w.remind.done)}</p><p class="detail">${esc(l.doneDetail)}</p></div>
<p class="note">${esc(w.remind.note)} <a href="/privacy#launch-reminder">${esc(w.remind.privacy)}</a></p></section>
<a class="btn secondary discord" href="${esc(input.discordUrl)}" rel="noopener noreferrer">${icon('discord')}${esc(l.discord)}</a>
${beta}
<footer><div class="fine"><span>${esc(l.age)}</span></div><details><summary>${esc(l.languageLabel)}: ${esc(l.native)}</summary><nav class="langs">${others}</nav></details></footer>
</main>`
}

/** The whole page. */
export function helloHtml(input: HelloInput): string {
  const title = esc(input.metaTitle)
  const description = esc(input.metaDescription)
  const closes = `${input.closesAt ? ` data-beta-closes="${esc(input.closesAt)}"` : ''} data-rpc="${esc(input.rpcUrl)}" data-key="${esc(input.anonKey)}"`
  return `<!DOCTYPE html>
<html lang="en" dir="ltr"${closes}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#0a111c">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="SpySocial">
<meta property="og:url" content="${esc(input.origin)}/hello">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${esc(input.origin)}/images/og-image.jpg">
<script src="/theme.js"></script>
<script src="/lang.js"></script>
<script src="/hello/hello.js" defer></script>
<style>${css(input)}</style>
<noscript><style>.remind{display:none}</style></noscript>
</head>
<body>
${SYMBOLS}
${input.languages.map((l) => pageFor(l, input)).join('\n')}
</body>
</html>
`
}
