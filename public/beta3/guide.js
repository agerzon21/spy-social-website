/* Beta 3 tester guide: language switch (en / es / ru; ?lang=, #<lang>-anchor, saved pick, browser language). */
(function () {
  var LANGS = ['en', 'es', 'ru'];
  var RUN = { en: '<b>Beta 3</b> · Tester guide', es: '<b>Beta 3</b> · Guía para testers', ru: '<b>Beta 3</b> · Памятка тестера' };
  var TITLE = { en: 'SpySocial Beta 3 Guide', es: 'SpySocial Beta 3: guía', ru: 'SpySocial Beta 3: памятка' };
  function pick() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) { q = null; }
    if (q && LANGS.indexOf(q) >= 0) return q;
    var h = (location.hash || '').match(/^#(en|es|ru)-/);
    if (h) return h[1];
    try { var s = localStorage.getItem('b3guide.lang'); if (s && LANGS.indexOf(s) >= 0) return s; } catch (e) {}
    var n = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) >= 0 ? n : 'en';
  }
  function set(l, save) {
    var root = document.documentElement;
    root.setAttribute('data-lang', l); root.setAttribute('lang', l);
    document.getElementById('run').innerHTML = RUN[l];
    document.title = TITLE[l];
    var bs = document.querySelectorAll('.langs button');
    for (var i = 0; i < bs.length; i++) bs[i].setAttribute('aria-pressed', bs[i].getAttribute('data-set') === l ? 'true' : 'false');
    if (save) { try { localStorage.setItem('b3guide.lang', l); } catch (e) {} }
  }
  var bs = document.querySelectorAll('.langs button');
  for (var i = 0; i < bs.length; i++) bs[i].addEventListener('click', function () { set(this.getAttribute('data-set'), true); window.scrollTo(0, 0); });
  set(pick(), false);
  try { var el = location.hash && document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView(); } catch (e) {}
})();
