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
// With site.contactEndpoint set, this posts for real and reports what actually
// happened. Without one it falls back to a prefilled mailto: and says so —
// the previous version announced "sent!" unconditionally, even when the mail
// client never opened.
(function setupForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var endpoint  = form.getAttribute('data-endpoint') || '';
  var successEl = document.getElementById('form-success');
  var submitBtn = form.querySelector('.form-submit');
  var btnLabel  = submitBtn ? submitBtn.textContent : '';

  var FIELDS = [
    { id: 'contact-name',    err: 'err-name',    label: 'Your name' },
    { id: 'contact-email',   err: 'err-email',   label: 'Your email' },
    { id: 'contact-subject', err: 'err-subject', label: 'A subject' },
    { id: 'contact-message', err: 'err-message', label: 'A message' }
  ];

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

  /* Validate on blur, and clear the error as soon as they start fixing it. */
  FIELDS.forEach(function (field) {
    var el = document.getElementById(field.id);
    if (!el) return;
    el.addEventListener('blur', function () { show(field, problem(field)); });
    el.addEventListener('input', function () {
      if (el.classList.contains('is-invalid')) show(field, problem(field));
    });
  });

  function setStatus(kind, text) {
    if (!successEl) return;
    successEl.className = 'form-success is-' + kind;
    successEl.textContent = text;
    successEl.style.display = 'block';
  }

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

    /* Honeypot: a real person never fills this. */
    var trap = form.querySelector('[name="_gotcha"]');
    if (trap && trap.value) return;

    var data = new FormData(form);

    if (!endpoint) {
      /* No backend configured — hand off to the mail client and be honest
         that we cannot confirm delivery from here. */
      var body = 'From: ' + data.get('name') + ' <' + data.get('email') + '>\n\n' + data.get('message');
      window.location.href = 'mailto:joshuacollado636@gmail.com'
        + '?subject=' + encodeURIComponent(data.get('subject'))
        + '&body=' + encodeURIComponent(body);
      setStatus('info', 'Opening your email app with the message ready to send.');
      return;
    }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'sending...'; }
    setStatus('info', 'Sending...');

    fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        FIELDS.forEach(function (f) { show(f, ''); });
        setStatus('ok', 'Message sent. I usually reply within 24-48 hours.');
      })
      .catch(function () {
        setStatus('error',
          'That did not go through. Email joshuacollado636@gmail.com directly and it will reach me.');
      })
      .then(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = btnLabel; }
      });
  });
})();
