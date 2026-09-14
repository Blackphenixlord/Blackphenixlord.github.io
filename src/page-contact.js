/* Contact — behaviour that exists only on this page.
   Shared chrome (nav, cursor, palette, tweaks, reveal) lives in app.js. */
// ── Terminal intro typewriter ─────────────────────────────────────────
(function terminalIntro() {
  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cmdEl    = document.getElementById('ct-cmd-text');
  var cursorEl = document.getElementById('ct-cursor');
  var outputEl = document.getElementById('ct-output');
  // CSS animation handles the layout reveal; this is decoration only
  if (!cmdEl || noMotion) return;
  var command = 'open contact.html';
  var i = 0;
  function typeCmd() {
    if (i < command.length) {
      cmdEl.textContent += command[i++];
      setTimeout(typeCmd, 55 + Math.random() * 35);
    } else {
      setTimeout(function () {
        if (cursorEl) cursorEl.style.display = 'none';
        if (outputEl) outputEl.style.display = 'block';
      }, 220);
    }
  }
  setTimeout(typeCmd, 380);
})();

// ── Typewriter placeholders ───────────────────────────────────────────
(function typePlaceholders() {
  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (noMotion) {
    document.querySelectorAll('[data-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', el.getAttribute('data-placeholder'));
    });
    return;
  }
  var fields = Array.from(document.querySelectorAll('[data-placeholder]'));
  var delay  = 900; // start after terminal intro begins

  fields.forEach(function (field) {
    var text = field.getAttribute('data-placeholder');
    var idx  = 0;
    field.setAttribute('placeholder', '');
    setTimeout(function startType() {
      if (idx <= text.length) {
        field.setAttribute('placeholder', text.slice(0, idx));
        idx++;
        setTimeout(startType, 50);
      }
    }, delay);
    delay += text.length * 52 + 200; // stagger each field
  });
})();

// ── Form submission ────────────────────────────────────────────────────
// This site is static: there is no server behind it to accept a POST, and a
// browser cannot send mail on its own. So the form does the part it honestly
// can -- validate the input and compose the message -- then hands it over on
// the visitor's terms rather than silently redirecting them into a mail app.
//
// Setting site.contactEndpoint (Formspree, Web3Forms, anything that accepts a
// POST) switches this to a real background send with no hand-off at all.
(function setupForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var endpoint  = form.getAttribute('data-endpoint') || '';
  var statusEl  = document.getElementById('form-success');
  var readyEl   = document.getElementById('form-ready');
  var previewEl = document.getElementById('form-ready-preview');
  var mailLink  = document.getElementById('form-open-mail');
  var copyBtn   = document.getElementById('form-copy');
  var editBtn   = document.getElementById('form-edit');
  var submitBtn = form.querySelector('.form-submit');
  var btnLabel  = submitBtn ? submitBtn.textContent : '';
  var ADDRESS   = 'joshuacollado636@gmail.com';

  var FIELDS = [
    { id: 'contact-name',    err: 'err-name',    label: 'Your name' },
    { id: 'contact-email',   err: 'err-email',   label: 'Your email' },
    { id: 'contact-subject', err: 'err-subject', label: 'A subject' },
    { id: 'contact-message', err: 'err-message', label: 'A message' }
  ];

  var val = function (id) { return (document.getElementById(id) || {}).value || ''; };

  function problem(field) {
    var el = document.getElementById(field.id);
    if (!el) return '';
    var v = el.value.trim();
    if (!v) return field.label + ' is required.';
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      return 'That email address does not look right.';
    }
    if (field.id === 'contact-message' && v.length < 10) {
      return 'A little more detail would help — at least 10 characters.';
    }
    return '';
  }

  function show(field, msg) {
    var el = document.getElementById(field.id);
    var errEl = document.getElementById(field.err);
    if (errEl) errEl.textContent = msg;
    if (el) {
      el.classList.toggle('is-invalid', !!msg);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }
    return !msg;
  }

  FIELDS.forEach(function (field) {
    var el = document.getElementById(field.id);
    if (!el) return;
    el.addEventListener('blur', function () { show(field, problem(field)); });
    el.addEventListener('input', function () {
      if (el.classList.contains('is-invalid')) show(field, problem(field));
    });
  });

  function setStatus(kind, text) {
    if (!statusEl) return;
    statusEl.className = 'form-success is-' + kind;
    statusEl.textContent = text;
    statusEl.style.display = text ? 'block' : 'none';
  }

  function compose() {
    return 'From: ' + val('contact-name').trim() +
           ' <' + val('contact-email').trim() + '>\n' +
           'Subject: ' + val('contact-subject').trim() + '\n\n' +
           val('contact-message').trim();
  }

  function openComposer() {
    var body = compose();
    previewEl.textContent = body;
    mailLink.setAttribute('href',
      'mailto:' + ADDRESS +
      '?subject=' + encodeURIComponent(val('contact-subject').trim()) +
      '&body=' + encodeURIComponent(body));

    form.classList.add('is-composed');
    readyEl.hidden = false;
    readyEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    mailLink.focus();
  }

  function closeComposer() {
    readyEl.hidden = true;
    form.classList.remove('is-composed');
    copyBtn.textContent = 'Copy message';
    var first = document.getElementById('contact-message');
    if (first) first.focus();
  }

  if (editBtn) editBtn.addEventListener('click', closeComposer);

  if (copyBtn) copyBtn.addEventListener('click', function () {
    var text = previewEl.textContent;
    function done() {
      copyBtn.textContent = 'Copied';
      copyBtn.classList.add('is-done');
      setTimeout(function () {
        copyBtn.textContent = 'Copy message';
        copyBtn.classList.remove('is-done');
      }, 2200);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, selectFallback);
    } else {
      selectFallback();
    }
    /* Clipboard access can be refused; selecting the text still lets them copy. */
    function selectFallback() {
      var r = document.createRange();
      r.selectNodeContents(previewEl);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      copyBtn.textContent = 'Press Ctrl+C';
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstBad = null;
    FIELDS.forEach(function (field) {
      var msg = problem(field);
      show(field, msg);
      if (msg && !firstBad) firstBad = field;
    });
    if (firstBad) {
      var el = document.getElementById(firstBad.id);
      if (el) el.focus();
      setStatus('error', 'Please fix the highlighted fields.');
      return;
    }

    var trap = form.querySelector('[name="_gotcha"]');
    if (trap && trap.value) return;

    /* No endpoint: compose here and let them choose how it goes out. */
    if (!endpoint) {
      setStatus('', '');
      openComposer();
      return;
    }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'sending...'; }
    setStatus('info', 'Sending...');

    fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        /* A 200 is not proof on its own: Web3Forms answers 200 with
           {success:false} when the key is wrong or the quota is spent, and
           Formspree returns an `errors` array. Read the body before claiming
           anything was sent. */
        return res.json().catch(function () { return {}; }).then(function (data) {
          var failed =
            !res.ok ||
            data.success === false ||
            (data.errors && data.errors.length);
          if (failed) {
            throw new Error(data.message || (data.errors && data.errors[0] && data.errors[0].message) || ('HTTP ' + res.status));
          }
          return data;
        });
      })
      .then(function () {
        form.reset();
        FIELDS.forEach(function (f) { show(f, ''); });
        setStatus('ok', 'Message sent. I usually reply within 24-48 hours.');
      })
      .catch(function (err) {
        /* Never lose the message: fall back to the composer so they still
           have it, rather than stranding them with an error. */
        setStatus('error',
          'That did not go through' +
          (err && err.message ? ' (' + err.message + ')' : '') +
          '. Send it yourself below, or email ' + ADDRESS + ' directly.');
        openComposer();
      })
      .then(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = btnLabel; }
      });
  });
})();
