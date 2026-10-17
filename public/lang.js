/*
 * Puts the page in its language before the first paint, so nothing flips after React starts: <html lang> and, for
 * Arabic, dir="rtl". A ?lang=xx in the address wins and is remembered; then the visitor's earlier choice (the
 * header's language menu keeps it in localStorage); then the browser's languages; then English.
 * A separate file, not an inline script: the CSP in vercel.json allows scripts from 'self' only. The codes, the key
 * and the matching rules are src/i18n/languages.ts's: keep them in step.
 */
(function () {
  var CODES = ['en', 'es', 'ru', 'zh-Hans', 'hi', 'ar', 'fr', 'bn', 'pt-BR', 'id'];
  var KEY = 'ss-lang';
  function match(tag) {
    if (!tag) return null;
    var t = String(tag).replace(/^\s+|\s+$/g, '').replace(/_/g, '-').toLowerCase();
    if (!t) return null;
    var i;
    for (i = 0; i < CODES.length; i++) if (CODES[i].toLowerCase() === t) return CODES[i];
    var base = t.split('-')[0];
    if (base === 'zh') return 'zh-Hans';
    if (base === 'pt') return 'pt-BR';
    for (i = 0; i < CODES.length; i++) if (CODES[i] === base) return CODES[i];
    return null;
  }
  var lang = null;
  try {
    var asked = /[?&]lang=([^&#]*)/.exec(window.location.search);
    lang = asked ? match(decodeURIComponent(asked[1])) : null;
    if (lang) {
      try {
        localStorage.setItem(KEY, lang);
      } catch (e) {
        // Storage blocked: the address still decides this visit.
      }
    }
  } catch (e) {
    lang = null;
  }
  if (!lang) {
    try {
      lang = match(localStorage.getItem(KEY));
    } catch (e) {
      // Storage blocked: the browser's languages.
    }
  }
  if (!lang) {
    var list = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]) || [];
    for (var j = 0; j < list.length && !lang; j++) lang = match(list[j]);
  }
  lang = lang || 'en';
  var root = document.documentElement;
  root.setAttribute('lang', lang);
  root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
})();
