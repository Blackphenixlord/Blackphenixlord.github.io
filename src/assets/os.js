/* JC/OS — behaviour shared by every page.
   Effects are rebuilt in plain JS from the Magic UI library (MIT,
   https://magicui.design): Hyper Text (decrypt), Typing Animation, Magic Card
   (spotlight + tilt), Blur Fade (reveal). Nothing here loads anything remote. */
(() => {
  const d = document, html = d.documentElement;
  const $ = (s, r = d) => r.querySelector(s);
  const $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const mqRM = matchMedia('(prefers-reduced-motion: reduce)');
  const rm = () => mqRM.matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };

  /* ── Toast ──────────────────────────────────────────────────────────── */
  const toastEl = $('[data-toast]');
  let toastT;
  const toast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('on'), 2600);
  };

  /* ── Decrypt + type (aria-hidden copies only) ───────────────────────────
     The element keeps its real text, made transparent, so it holds the
     layout; the scramble runs in an absolutely positioned overlay on top.
     Nothing reflows, so this costs no layout shift. */
  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@<>/\\=+*';
  const overlay = (el) => {
    const o = d.createElement('span');
    o.className = 'fx-o';
    o.setAttribute('aria-hidden', 'true');
    el.style.setProperty('--fx', getComputedStyle(el).color);
    el.classList.add('fx-on');
    el.append(o);
    return [o, () => { o.remove(); el.classList.remove('fx-on'); }];
  };
  function decrypt(el, dur = 900) {
    if (rm() || el.dataset.busy) return;
    const text = el.textContent;
    el.dataset.busy = '1';
    const [o, done] = overlay(el);
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const n = Math.floor(p * text.length);
      let s = '';
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        s += i < n || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      o.textContent = s;
      if (p < 1) requestAnimationFrame(step);
      else { done(); delete el.dataset.busy; }
    };
    requestAnimationFrame(step);
  }
  /* Resolves when the line is fully typed (at once with reduced motion). */
  function type(el, speed = 28) {
    if (rm() || el.dataset.busy) return Promise.resolve();
    const text = el.dataset.typed || el.textContent;
    el.dataset.busy = '1';
    const [o, done] = overlay(el);
    const per = Math.max(1, Math.round(16 / Math.max(speed, 1)));
    let i = 0;
    return new Promise((res) => {
      const tick = () => {
        i = Math.min(text.length, i + per);
        o.textContent = text.slice(0, i);
        if (i < text.length) setTimeout(tick, speed + Math.random() * speed);
        else { done(); delete el.dataset.busy; res(); }
      };
      tick();
    });
  }

  /* ── Reveal on scroll + pause loops off-screen ───────────────────────── */
  const io = 'IntersectionObserver' in window;
  const reveal = (root = d) => {
    const els = $$('.reveal:not(.in)', root);
    if (!io || rm()) { els.forEach((e) => e.classList.add('in')); return; }
    const ob = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('in');
      ob.unobserve(el);
      $$('[data-type]', el).forEach((t) => type(t, 22));
      $$('[data-decrypt]', el).forEach((t) => decrypt(t));
    }), { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    els.forEach((e) => ob.observe(e));
  };
  if (io) {
    const po = new IntersectionObserver((ents) => ents.forEach((en) => en.target.classList.toggle('paused', !en.isIntersecting)));
    $$('.missions, .hero, .bar-read').forEach((s) => po.observe(s));
  }
  d.addEventListener('visibilitychange', () => html.classList.toggle('paused', d.hidden));

  /* ── Tilt + spotlight on program cards (fine pointers only) ──────────── */
  if (fine) {
    $$('[data-tilt]').forEach((card) => {
      const inner = card.firstElementChild;
      let raf = 0, ev;
      const apply = () => {
        raf = 0;
        const r = inner.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
        inner.style.setProperty('--mx', `${x * 100}%`);
        inner.style.setProperty('--my', `${y * 100}%`);
        if (!rm()) {
          inner.style.setProperty('--ry', `${(x - 0.5) * 7}deg`);
          inner.style.setProperty('--rx', `${(0.5 - y) * 7}deg`);
        }
      };
      card.addEventListener('pointermove', (e) => { ev = e; if (!raf) raf = requestAnimationFrame(apply); });
      card.addEventListener('pointerleave', () => { inner.style.setProperty('--rx', '0deg'); inner.style.setProperty('--ry', '0deg'); });
    });
  }

  /* ── Menubar readouts: scroll position and clock ─────────────────────── */
  const scrollEl = $('[data-scroll]'), clockEl = $('[data-clock]');
  if (scrollEl) {
    let q = 0;
    const upd = () => {
      q = 0;
      const max = html.scrollHeight - innerHeight;
      scrollEl.textContent = String(Math.round(max > 0 ? (scrollY / max) * 100 : 0)).padStart(3, '0') + '%';
    };
    addEventListener('scroll', () => { if (!q) q = requestAnimationFrame(upd); }, { passive: true });
    upd();
  }
  if (clockEl) {
    const tick = () => { if (!d.hidden) clockEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); };
    tick(); setInterval(tick, 20000);
  }

  /* ── Settings ────────────────────────────────────────────────────────── */
  const settings = {
    scan() {
      const off = html.classList.toggle('no-scan');
      store.set('jc-scan', off ? 'off' : 'on');
      toast(off ? 'scan lines: off' : 'scan lines: on');
    },
    dys() {
      const on = html.classList.toggle('dys');
      store.set('jc-dys', on ? 'on' : 'off');
      toast(on ? 'dyslexia mode: on' : 'dyslexia mode: off');
    },
  };

  /* ── Launcher (Ctrl+K / ⌘K) ──────────────────────────────────────────── */
  const ln = $('[data-launcher]');
  if (ln && typeof ln.showModal === 'function') {
    const q = $('.ln-q', ln), list = $('.ln-list', ln), none = $('[data-none]', ln);
    const opts = $$('[role="option"]', list);
    let cur = -1;
    const visible = () => opts.filter((o) => !o.hidden);
    const select = (i) => {
      const v = visible();
      opts.forEach((o) => o.setAttribute('aria-selected', 'false'));
      if (!v.length) { cur = -1; q.removeAttribute('aria-activedescendant'); return; }
      cur = (i + v.length) % v.length;
      v[cur].setAttribute('aria-selected', 'true');
      q.setAttribute('aria-activedescendant', v[cur].id);
      v[cur].scrollIntoView({ block: 'nearest' });
    };
    const filter = () => {
      const s = q.value.trim().toLowerCase();
      opts.forEach((o) => {
        const hay = (o.textContent + ' ' + (o.dataset.k || '')).toLowerCase();
        o.hidden = o.hasAttribute('data-secret') ? !/^rick/.test(s) : !!s && !s.split(/\s+/).every((w) => hay.includes(w));
      });
      $$('.ln-g', list).forEach((g) => {
        let n = g.nextElementSibling, any = false;
        while (n && !n.classList.contains('ln-g')) { if (!n.hidden) any = true; n = n.nextElementSibling; }
        g.hidden = !any;
      });
      none.hidden = visible().length > 0;
      select(0);
    };
    const run = (o) => {
      if (!o) return;
      if (o.dataset.act) { ln.close(); settings[o.dataset.act](); return; }
      if (o.id === 'ln-a-rick') { ln.close(); html.classList.add('degauss'); setTimeout(() => (location.href = o.dataset.href), 220); return; }
      location.href = o.dataset.href;
    };
    const open = () => { if (ln.open) return; q.value = ''; filter(); ln.showModal(); q.focus(); };
    $$('[data-launch]').forEach((b) => b.addEventListener('click', open));
    $('[data-close]', ln).addEventListener('click', () => ln.close());
    ln.addEventListener('click', (e) => {
      if (e.target === ln) { ln.close(); return; }
      const o = e.target.closest('[role="option"]');
      if (o) run(o);
    });
    q.addEventListener('input', filter);
    q.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); select(cur + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); select(cur - 1); }
      else if (e.key === 'Enter') { e.preventDefault(); run(visible()[cur]); }
    });
    d.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); ln.open ? ln.close() : open(); }
    });
  }

  /* ── Easter eggs (listed in the footer) ─────────────────────────────── */
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let kpos = 0, odT;
  d.addEventListener('keydown', (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kpos = k === KONAMI[kpos] ? kpos + 1 : (k === KONAMI[0] ? 1 : 0);
    if (kpos === KONAMI.length) {
      kpos = 0;
      html.classList.add('overdrive');
      d.dispatchEvent(new CustomEvent('jc:overdrive'));
      toast('OVERDRIVE ENGAGED');
      clearTimeout(odT);
      odT = setTimeout(() => html.classList.remove('overdrive'), 8000);
    }
  });
  let clicks = [], dgT;
  d.addEventListener('click', (e) => {
    if (!e.target.closest('[data-egg-logo]')) return;
    const now = Date.now();
    clicks = clicks.filter((t) => now - t < 2000).concat(now);
    if (clicks.length >= 5) {
      clicks = [];
      html.classList.remove('degauss'); void html.offsetWidth; html.classList.add('degauss');
      toast('degaussing…');
      clearTimeout(dgT); dgT = setTimeout(() => html.classList.remove('degauss'), 950);
    }
  });

  /* ── Projects filter ─────────────────────────────────────────────────── */
  const fbar = $('[data-filters]');
  if (fbar) {
    const cards = $$('[data-cats]'), empty = $('[data-empty]');
    fbar.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('button', fbar).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const f = b.dataset.f;
      let n = 0;
      cards.forEach((c) => { const show = f === 'all' || c.dataset.cats.split(' ').includes(f); c.hidden = !show; if (show) n++; });
      empty.hidden = n > 0;
      const live = $('[data-count]');
      if (live) live.textContent = `${n} of ${cards.length} shown`;
    });
  }

  /* ── Boot film (home, once per session) ──────────────────────────────── */
  const ready = () => {
    d.dispatchEvent(new CustomEvent('jc:ready'));
    reveal();
    /* The first screen is never hidden for a reveal (it would hold back
       LCP); it gets its decrypt and typing straight away instead. */
    $$('.hero-title [data-decrypt], .app-title [data-decrypt], .ro-n [data-decrypt]').forEach((h) => setTimeout(() => decrypt(h, 1100), 80));
    $$('.app [data-type]').forEach((t) => type(t, 22));
    $$('[data-typed]').forEach((t) => setTimeout(() => type(t, 26), 500));
  };
  const boot = $('[data-boot]');
  if (boot && html.classList.contains('booting')) {
    const log = $('[data-boot-log]', boot), meter = $('[data-boot-meter]', boot);
    const when = new Date().toDateString();
    const LINES = [
      ['JC/OS 2026.05 LTS  .  joshua-collado.local', 'hi', 260],
      ['', '', 60],
      ['joshua-collado login: joshua', '', 330],
      ['Password: ' + '•'.repeat(8), '', 300],
      ['Authenticating...', '', 380],
      ['[ LOGIN OK ]', 'ok', 220],
      ['Last login: ' + when + '  from 127.0.0.1', '', 160],
      ['mounting /missions/nasa-hunch ........ [ OK ]', 'ok', 150],
      ['mounting /missions/los-alamos ........ [ OK ]', 'ok', 150],
      ['starting window server ............... [ OK ]', 'ok', 170],
      ['', '', 40],
      ['|  Welcome, Joshua Collado.  NASA . Los Alamos . Nerdvana . RECON  |', 'hi', 420],
    ];
    let i = 0, t, over = false;
    const finish = () => {
      if (over) return;
      over = true;
      clearTimeout(t);
      try { sessionStorage.setItem('jc-booted', '1'); } catch (e) { /* ignore */ }
      boot.classList.add('is-off');
      setTimeout(() => { html.classList.remove('booting'); boot.remove(); ready(); }, 480);
    };
    const grant = () => {
      boot.classList.add('is-grant');
      t = setTimeout(finish, 950);
    };
    const next = () => {
      if (i >= LINES.length) { t = setTimeout(grant, 120); return; }
      const [txt, cls, wait] = LINES[i++];
      const line = d.createElement('span');
      if (cls) line.className = cls;
      line.textContent = txt + '\n';
      log.append(line);
      meter.style.transform = `scaleX(${i / LINES.length})`;
      t = setTimeout(next, wait);
    };
    ['keydown', 'pointerdown'].forEach((ev) => addEventListener(ev, finish, { once: true }));
    t = setTimeout(next, 200);
  } else {
    if (boot) boot.remove();
    ready();
  }

  /* Re-scramble the name on hover, like a signal re-locking. */
  const ht = $('.hero-title');
  if (ht && fine) ht.addEventListener('pointerenter', () => {
    const el = $('[data-decrypt]', ht);
    if (el && !el.dataset.busy && !rm()) { ht.classList.remove('glitch'); void ht.offsetWidth; ht.classList.add('glitch'); decrypt(el, 650); }
  });

  window.JC = { toast, decrypt, type, reveal, settings };
})();
