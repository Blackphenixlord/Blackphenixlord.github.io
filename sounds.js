/* ── Portfolio Sound Engine — Web Audio API, zero external files ── */
(function () {
  let _ctx = null, _on = localStorage.getItem('sfx') === '1';

  function ctx() {
    if (!_ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      _ctx = new AC();
    }
    if (_ctx.state === 'suspended') _ctx.resume();
    return _ctx;
  }

  /* Core tone generator */
  function tone(freq, dur, vol, type, delay) {
    if (!_on) return;
    const c = ctx(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type = type || 'square';
    o.frequency.value = freq;
    const t = c.currentTime + (delay || 0);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(dur, 0.015));
    o.start(t);
    o.stop(t + dur + 0.015);
  }

  /* Sound presets */
  window.sfx = {
    enabled: () => _on,
    /* Mechanical key — two-layer: high click transient + low thud body */
    type: () => {
      tone(1300 + Math.random() * 400, 0.007, 0.10, 'square');
      tone(85,  0.025, 0.12, 'triangle');
    },
    /* UI hover — soft IDE tab ping */
    hover: () => tone(1900, 0.022, 0.04, 'sine'),
    /* Nav hover — slightly crisper */
    navHov: () => tone(2100, 0.018, 0.035, 'sine'),
    /* Button click — deep mechanical press (transient + thud + mid body) */
    click: () => {
      tone(1500, 0.006, 0.14, 'square');
      tone(72,   0.038, 0.16, 'triangle');
      tone(320,  0.014, 0.07, 'square');
    },
    /* Terminal Enter — mechanical press + confirm beep */
    enter: () => {
      tone(1500, 0.006, 0.14, 'square');
      tone(72,   0.038, 0.16, 'triangle');
      tone(880,  0.045, 0.07, 'sine', 0.055);
    },
    /* Compile error — cascading terminal bell buzz */
    error: () => {
      tone(220, 0.14, 0.10, 'sawtooth');
      tone(185, 0.12, 0.08, 'sawtooth', 0.10);
      tone(150, 0.10, 0.06, 'sawtooth', 0.18);
    },
    /* Build success — ascending musical scale like CI pass */
    success: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.10, 0.09, 'sine', i * 0.068)),
    /* Logo click — power-on harmonic sweep */
    logo: () => { for (let i = 0; i < 7; i++) tone(110 * Math.pow(1.28, i), 0.09, 0.09, 'square', i * 0.052); },
    /* Boot — terminal startup sequence */
    boot: () => [220, 277, 330, 415, 523, 659].forEach((f, i) => tone(f, 0.11, 0.08, 'square', i * 0.075)),
    /* Scroll reveal — faint IDE notification ping */
    reveal: () => tone(1047, 0.04, 0.04, 'sine'),
    /* CTA hover — warm confirm tone */
    ctaHov: () => { tone(659, 0.05, 0.07, 'sine'); tone(880, 0.035, 0.04, 'sine', 0.028); },
  };

  /* ── Toggle button ─────────────────────────────────────────────── */
  function render() {
    const btn = document.getElementById('sound-toggle');
    if (!btn) return;
    btn.textContent = _on ? '[ SFX: ON ]' : '[ SFX: OFF ]';
    btn.style.color = _on ? '#00ff41' : '#3a5a3a';
    btn.style.borderColor = _on ? 'rgba(0,255,65,0.45)' : '#1a3a1a';
  }

  document.getElementById('sound-toggle')?.addEventListener('click', () => {
    _on = !_on;
    localStorage.setItem('sfx', _on ? '1' : '0');
    if (_on) { ctx(); sfx.boot(); }
    render();
  });

  /* ── Shared per-page hooks (run after DOM ready) ───────────────── */
  function init() {
    /* Nav link hover */
    let _nh = 0;
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('mouseenter', () => {
        const n = Date.now(); if (n - _nh < 90) return; _nh = n;
        sfx.navHov();
      })
    );

    /* CTA / outline / submit buttons */
    document.querySelectorAll(
      '.hero-btn-primary, .hero-btn-outline, .btn-green'
    ).forEach(b => {
      b.addEventListener('mouseenter', () => sfx.ctaHov());
      b.addEventListener('click',      () => sfx.click());
    });

    /* Logo */
    document.querySelector('.logo-block')?.addEventListener('click', () => sfx.logo());

    /* Word / project / resume cards */
    let _ch = 0;
    document.querySelectorAll('.word-card, .project-card, .resume-block').forEach(c =>
      c.addEventListener('mouseenter', () => {
        const n = Date.now(); if (n - _ch < 115) return; _ch = n;
        sfx.hover();
      })
    );

    /* Skill tags */
    document.querySelectorAll('.skill-tag').forEach(t =>
      t.addEventListener('click', () => sfx.click())
    );

    /* Contact form typing */
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(inp =>
      inp.addEventListener('input', () => sfx.type())
    );

    /* Contact link cards */
    let _cl = 0;
    document.querySelectorAll('.contact-layout .contact-links a').forEach(a =>
      a.addEventListener('mouseenter', () => {
        const n = Date.now(); if (n - _cl < 115) return; _cl = n;
        sfx.hover();
      })
    );

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
