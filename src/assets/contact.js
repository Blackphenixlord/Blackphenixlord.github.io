/* Contact form.
   - site.contactAccessKey set: POST to Web3Forms with the key.
   - site.contactEndpoint set: POST the form to that URL, asking for JSON.
   - neither: compose the message on the page; the visitor sends it from
     their own mail app or copies it. No third party involved.
   Success is only reported when the service's JSON says so. */
(() => {
  const form = document.querySelector('[data-contact]');
  if (!form) return;
  const compose = document.querySelector('[data-compose]');
  const msg = form.querySelector('[data-msg]');
  const submit = form.querySelector('[data-submit]');
  const key = form.dataset.key.trim();
  const endpoint = form.dataset.endpoint.trim() || (key ? 'https://api.web3forms.com/submit' : '');
  const to = form.dataset.to;
  const F = (n) => form.elements[n];
  const val = (n) => F(n).value.trim();
  const labels = { name: 'your_name', email: 'your_email', subject: 'subject', message: 'message' };

  const setErr = (n, text) => {
    const el = F(n);
    const err = document.getElementById(el.getAttribute('aria-describedby'));
    err.textContent = text;
    if (text) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  };
  const validate = () => {
    let first = null;
    for (const n of Object.keys(labels)) {
      let e = '';
      if (!val(n)) e = labels[n] + ' is required.';
      else if (n === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val(n))) e = 'That email address does not look right.';
      else if (n === 'message' && val(n).length < 10) e = 'A little more detail would help — at least 10 characters.';
      setErr(n, e);
      if (e && !first) first = F(n);
    }
    return first;
  };
  const say = (text, kind) => { msg.textContent = text; msg.className = 'form-msg ' + (kind || ''); };

  Object.keys(labels).forEach((n) => F(n).addEventListener('input', () => {
    if (F(n).getAttribute('aria-invalid')) setErr(n, '');
  }));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bad = validate();
    if (bad) { say('Please fix the highlighted fields.', 'bad'); bad.focus(); return; }
    if (val('botcheck')) return;

    if (!endpoint) {
      const body = `${val('message')}\n\n— ${val('name')} <${val('email')}>`;
      compose.querySelector('[data-compose-text]').textContent = `To: ${to}\nSubject: ${val('subject')}\n\n${body}`;
      compose.querySelector('[data-mailto]').href =
        `mailto:${to}?subject=${encodeURIComponent(val('subject'))}&body=${encodeURIComponent(body)}`;
      form.hidden = true; compose.hidden = false; compose.focus();
      say('');
      return;
    }

    submit.disabled = true;
    say('sending…');
    try {
      const data = new FormData(form);
      if (key) { data.append('access_key', key); data.append('from_name', 'jc-portfolio.codes'); }
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      let json = {};
      try { json = await res.json(); } catch (_) { /* not JSON */ }
      const ok = res.ok && (key ? json.success === true : json.ok === true || json.success === true);
      if (!ok) throw new Error(json.message || `HTTP ${res.status}`);
      form.reset();
      say('Message sent. I usually reply within 24-48 hours.', 'ok');
    } catch (err) {
      say(`That did not go through (${err.message}). Email me directly: ${to}`, 'bad');
    } finally {
      submit.disabled = false;
    }
  });

  compose.querySelector('[data-edit]').addEventListener('click', () => {
    compose.hidden = true; form.hidden = false; F('message').focus();
  });
  compose.querySelector('[data-copy]').addEventListener('click', async (e) => {
    const text = compose.querySelector('[data-compose-text]').textContent;
    try { await navigator.clipboard.writeText(text); window.JC?.toast('copied to clipboard'); }
    catch (_) {
      const sel = getSelection(), r = document.createRange();
      r.selectNodeContents(compose.querySelector('[data-compose-text]'));
      sel.removeAllRanges(); sel.addRange(r);
      window.JC?.toast('Press Ctrl+C to copy');
    }
    e.currentTarget.focus();
  });
})();
