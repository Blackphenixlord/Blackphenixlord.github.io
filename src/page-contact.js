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

// ── Form submission (mailto) ──────────────────────────────────────────
(function setupForm() {
  var form      = document.getElementById('contact-form');
  var successEl = document.getElementById('form-success');
  if (!form) return;
  var submitBtn = form.querySelector('.form-submit');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name    = (document.getElementById('contact-name')    || {}).value || '';
    var email   = (document.getElementById('contact-email')   || {}).value || '';
    var subject = (document.getElementById('contact-subject') || {}).value || 'Message from Portfolio';
    var message = (document.getElementById('contact-message') || {}).value || '';

    var body = 'From: ' + name + ' <' + email + '>\n\n' + message;
    var mailto = 'mailto:joshuacollado636@gmail.com'
      + '?subject=' + encodeURIComponent(subject)
      + '&body='    + encodeURIComponent(body);

    window.location.href = mailto;

    // Show success state after brief delay
    submitBtn.textContent = '✓ sent!';
    successEl.style.display = 'block';
    setTimeout(function () {
      form.reset();
      submitBtn.textContent = 'send_message →';
    }, 3000);
  });
})();
