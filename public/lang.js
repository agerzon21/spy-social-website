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

  // join-speed-1116: a room's invite (/join/<code>) is one page the build drew for every room (src/App.tsx
  // INVITE_SHELL), with no code on its plate: the code goes in --ss-join-code here, which the plate shows
  // (components/ui/RoomCodePlate) until the app has the address's. The code the page shows: ?p= (a code the host
  // changed) first, each read the way src/lib/roomCode.ts keepCodeChars reads it; keep the two in step.
  try {
    var invite = /^\/join\/([^\/]+)\/?$/.exec(window.location.pathname);
    if (invite) {
      var keep = function (s) {
        var CY = '\u0410\u0412\u0415\u041a\u041c\u041d\u041e\u0420\u0421\u0422\u0423\u0425\u0430\u0432\u0435\u043a\u043c\u043d\u043e\u0440\u0441\u0442\u0443\u0445';
        var LA = 'ABEKMHOPCTYXABEKMHOPCTYX';
        var out = '';
        s = String(s || '').replace(/[\s\u00a0\u2000-\u200b\u2060\ufeff\u00ad\u2010-\u2015\u2212-]+/g, '');
        for (var k = 0; k < s.length; k++) {
          var at = CY.indexOf(s.charAt(k));
          out += at >= 0 ? LA.charAt(at) : s.charAt(k);
        }
        return out.toUpperCase().replace(/0/g, 'O').replace(/1/g, 'I').replace(/[^A-Z2-9]/g, '').slice(0, 8);
      };
      var shown = keep(new URLSearchParams(window.location.search).get('p')) || keep(decodeURIComponent(invite[1]));
      if (shown) root.style.setProperty('--ss-join-code', '"' + shown + '"');
    }
  } catch (e) {
    // A malformed address: the plate stays empty until the app shows the page.
  }
})();
