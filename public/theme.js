/*
 * Puts the page in its theme before the first paint, so it never flashes the other one: dark (Film Noir) for
 * everyone, light for a visitor who switched to it before (the header's switch keeps that in localStorage).
 * A separate file, not an inline script: the CSP in vercel.json allows scripts from 'self' only. The key and the
 * light page colour match src/theme/mode.ts and src/theme/skins/daylight.ts.
 */
(function () {
  var theme = 'dark';
  try {
    if (localStorage.getItem('ss-theme') === 'light') theme = 'light';
  } catch (e) {
    // Storage blocked: the default.
  }
  var root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  if (theme === 'light') {
    var tint = document.querySelector('meta[name="theme-color"]');
    if (tint) tint.setAttribute('content', '#f8f6f0');
  }
})();
