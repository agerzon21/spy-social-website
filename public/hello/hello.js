/*
 * /hello's behaviour, nothing else. A separate file, not an inline script: the CSP in vercel.json allows scripts from
 * 'self' only. Without it the page still reads whole, and <noscript> takes the form away.
 *
 * 1) The Beta 2 sign-up shows only until sign-ups close (<html data-beta-closes>, from CLOSES_AT in
 *    src/lib/betaSignup.ts, put there by the build), and goes by itself if the page is open at that moment.
 * 2) The launch reminder form: the anon RPC launch_reminder_signup(p_email, p_age_ok, p_lang) -> {ok} or {ok: false,
 *    reason: age | lang | email | busy | closed}, always by POST so an address never sits in a URL.
 *    The address is sent only there, and only on Send: nothing is stored here. The fields have no name, so the form
 *    can't put an address in the page's URL. A filled honeypot sends nothing and shows success.
 */
(function () {
  var root = document.documentElement;

  var closes = Date.parse(root.getAttribute('data-beta-closes') || '');
  function setBeta(open) {
    var blocks = document.querySelectorAll('[data-beta]');
    for (var i = 0; i < blocks.length; i++) blocks[i].hidden = !open;
  }
  var left = closes - Date.now();
  if (left > 0) {
    setBeta(true);
    // setTimeout can't wait longer than ~24.8 days: a page open that long checks again when it's reloaded.
    if (left <= 2000000000) window.setTimeout(setBeta, left, false);
  }

  var rpc = root.getAttribute('data-rpc');
  var key = root.getAttribute('data-key');
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function wire(form) {
    var email = form.querySelector('input[type="email"]');
    var age = form.querySelector('input[type="checkbox"]');
    var trap = form.querySelector('[data-trap]');
    var button = form.querySelector('button');
    var label = button.querySelector('[data-label]');
    var ready = label.textContent;
    var wrap = form.parentNode;
    var busy = false;

    function say(which) {
      var lines = form.querySelectorAll('[data-m]');
      for (var i = 0; i < lines.length; i++) lines[i].hidden = lines[i].getAttribute('data-m') !== which;
    }
    function finish() {
      form.hidden = true;
      var done = wrap.querySelector('[data-done]');
      done.hidden = false;
      done.focus();
    }
    function stop(which, field) {
      busy = false;
      button.disabled = false;
      label.textContent = ready;
      say(which);
      if (field) field.focus();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (busy) return;
      if (trap.value) return finish();
      var address = email.value.replace(/^\s+|\s+$/g, '');
      if (!EMAIL.test(address)) return stop('bad', email);
      if (!age.checked) return stop('age', age);
      if (!rpc || !key || !window.fetch) return stop('net');
      busy = true;
      button.disabled = true;
      label.textContent = form.getAttribute('data-sending');
      say('');
      var signal;
      if (window.AbortController) {
        var abort = new AbortController();
        signal = abort.signal;
        window.setTimeout(function () { abort.abort(); }, 20000);
      }
      fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: key, Authorization: 'Bearer ' + key },
        body: JSON.stringify({ p_email: address, p_age_ok: true, p_lang: root.getAttribute('lang') || 'en' }),
        signal: signal,
      }).then(function (response) {
        if (response.status === 429 || response.status >= 500) return stop('busy');
        if (!response.ok) return stop('no');
        return response.json().then(function (body) {
          if (body && body.ok === true) {
            busy = false;
            return finish();
          }
          var reason = body && body.reason;
          if (reason === 'email') return stop('bad', email);
          if (reason === 'age') return stop('age', age);
          if (reason === 'busy') return stop('busy');
          // 'closed', 'lang' or anything this page doesn't know: never treated as success.
          stop('no');
        });
      }).catch(function () {
        stop('net');
      });
    });
  }
  var forms = document.querySelectorAll('form[data-remind]');
  for (var f = 0; f < forms.length; f++) wire(forms[f]);
})();
