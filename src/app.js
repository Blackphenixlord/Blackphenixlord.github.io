/* ──────────────────────────────────────────────────────────────────────────
   app.js — every piece of shared page chrome, once.

   This replaces ~2,700 lines of near-identical JavaScript that had been
   copy-pasted into all 12 pages and then drifted apart. Each module below
   guards on the elements it needs, so the same file is safe on every page.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var $ = function (id) { return document.getElementById(id); };

  /* ── Navigation ───────────────────────────────────────────────────────── */
  (function () {
    var burger = $('nav-hamburger');
    var links = document.querySelector('.nav-links');
    if (!burger || !links) return;

    function setOpen(open) {
      links.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    }

    burger.addEventListener('click', function () {
      setOpen(!links.classList.contains('open'));
    });

    /* Close on navigation-ish interactions so the menu never strands the page. */
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        setOpen(false);
        burger.focus();
      }
    });
  })();

  /* ── Custom cursor ────────────────────────────────────────────────────────
     The ring trails the dot. The easing has to run every frame, not only on
     mousemove — the original updated `rx`/`ry` inside the mousemove handler,
     so the ring stuttered to a halt whenever the pointer paused.            */
  (function () {
    var dot = $('cursor-dot');
    var ring = $('cursor-ring');
    if (!dot || !ring || coarse || reduceMotion) return;

    document.body.classList.add('has-custom-cursor');

    var mx = 0, my = 0, rx = 0, ry = 0, seen = false;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (!seen) { rx = mx; ry = my; seen = true; }
      dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
    }, { passive: true });

    (function frame() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      requestAnimationFrame(frame);
    })();

    /* Delegated, so it also covers anything added to the page later. */
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a,button,[role="option"],input,textarea')) ring.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('a,button,[role="option"],input,textarea')) ring.classList.remove('cursor-hover');
    });
  })();

  /* ── Scroll progress ──────────────────────────────────────────────────── */
  (function () {
    var bar = $('scroll-progress');
    if (!bar) return;
    var ticking = false;

    function paint() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(paint); }
    }, { passive: true });
    window.addEventListener('resize', paint, { passive: true });
    paint();
  })();

  /* ── Scroll reveal ────────────────────────────────────────────────────────
     `.reveal` is only hidden when JS and motion are both available (the `js`
     class is set in <head>). Without either, content is simply visible, so a
     shared link's first frame is never a page of blank sections.            */
  (function () {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', (i % 5) * 70 + 'ms');
      obs.observe(el);
    });
  })();

  /* ── Footer year ──────────────────────────────────────────────────────── */
  (function () {
    var y = $('footer-year');
    if (y) y.textContent = new Date().getFullYear();
  })();

  /* ── Accent colour ────────────────────────────────────────────────────────
     Now that the stylesheet reads its accent from custom properties, changing
     the theme is two property writes. This used to inject ~20 `!important`
     overrides because the colours were hardcoded throughout the CSS.        */
  var ACCENTS = {
    green:  { hex: '#28c840', rgb: '40,200,64'  },
    red:    { hex: '#ff5f57', rgb: '255,95,87'  },
    yellow: { hex: '#febc2e', rgb: '254,188,46' },
    cyan:   { hex: '#00d4ff', rgb: '0,212,255'  }
  };

  function applyAccent(name) {
    var c = ACCENTS[name];
    if (!c) return;
    var root = document.documentElement;
    root.style.setProperty('--accent', c.hex);
    root.style.setProperty('--accent-rgb', c.rgb);
    /* Inline SVG marks can't inherit a CSS variable through presentation
       attributes, so they're synced directly. */
    document.querySelectorAll('.la-stroke').forEach(function (el) { el.setAttribute('stroke', c.hex); });
    document.querySelectorAll('.la-fill, .la-fill-tint, .la-fill-dim').forEach(function (el) { el.setAttribute('fill', c.hex); });
  }

  /* ── Tweaks panel ─────────────────────────────────────────────────────── */
  (function () {
    var fab = $('tweaks-fab');
    var panel = $('tweaks-panel');
    if (!fab || !panel) return;

    function store(key, val) {
      try { localStorage.setItem(key, val); } catch (e) { /* private mode */ }
    }
    function read(key) {
      try { return localStorage.getItem(key); } catch (e) { return null; }
    }

    function setPanel(open) {
      panel.classList.toggle('tweaks-open', open);
      fab.setAttribute('aria-expanded', String(open));
    }

    panel.querySelectorAll('.tweaks-swatch').forEach(function (sw) {
      sw.addEventListener('click', function () {
        panel.querySelectorAll('.tweaks-swatch').forEach(function (s) {
          s.classList.remove('active');
          s.setAttribute('aria-checked', 'false');
        });
        sw.classList.add('active');
        sw.setAttribute('aria-checked', 'true');
        var name = sw.getAttribute('data-color');
        applyAccent(name);
        store('tweak-color', name);
      });
    });

    var cursorCb = $('tweak-cursor');
    if (cursorCb) cursorCb.addEventListener('change', function () {
      document.body.classList.toggle('has-custom-cursor', this.checked);
      var d = $('cursor-dot'), r = $('cursor-ring');
      if (d) d.style.display = this.checked ? '' : 'none';
      if (r) r.style.display = this.checked ? '' : 'none';
      store('tweak-cursor', this.checked ? '1' : '0');
    });

    var dyslexiaCb = $('tweak-dyslexia');
    if (dyslexiaCb) dyslexiaCb.addEventListener('change', function () {
      document.body.classList.toggle('dyslexia-mode', this.checked);
      store('tweak-dyslexia', this.checked ? '1' : '0');
    });

    var scrollCb = $('tweak-scrollbar');
    if (scrollCb) scrollCb.addEventListener('change', function () {
      var bar = $('scroll-progress');
      if (bar) bar.style.display = this.checked ? '' : 'none';
      store('tweak-scrollbar', this.checked ? '1' : '0');
    });

    /* Restore saved preferences. */
    var color = read('tweak-color');
    if (color && ACCENTS[color]) {
      panel.querySelectorAll('.tweaks-swatch').forEach(function (s) {
        var on = s.getAttribute('data-color') === color;
        s.classList.toggle('active', on);
        s.setAttribute('aria-checked', String(on));
      });
      if (color !== 'green') applyAccent(color);
    }
    if (read('tweak-cursor') === '0' && cursorCb) {
      cursorCb.checked = false;
      document.body.classList.remove('has-custom-cursor');
      ['cursor-dot', 'cursor-ring'].forEach(function (id) { var e = $(id); if (e) e.style.display = 'none'; });
    }
    if (read('tweak-dyslexia') === '1' && dyslexiaCb) {
      dyslexiaCb.checked = true;
      document.body.classList.add('dyslexia-mode');
    }
    if (read('tweak-scrollbar') === '0' && scrollCb) {
      scrollCb.checked = false;
      var bar = $('scroll-progress');
      if (bar) bar.style.display = 'none';
    }

    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      setPanel(!panel.classList.contains('tweaks-open'));
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('#tweaks-panel') && !e.target.closest('#tweaks-fab')) setPanel(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('tweaks-open')) {
        setPanel(false);
        fab.focus();
      }
    });
  })();

  /* ── Command palette ──────────────────────────────────────────────────── */
  (function () {
    var overlay = $('cp-overlay');
    var input = $('cp-input');
    var list = $('cp-list');
    if (!overlay || !input || !list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll('.cp-item[data-action]'));
    var shown = items.slice();
    var idx = 0;
    var lastFocus = null;

    function isOpen() { return overlay.classList.contains('cp-visible'); }

    function open() {
      lastFocus = document.activeElement;
      overlay.removeAttribute('hidden');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.classList.add('cp-visible');
          input.value = '';
          filter('');
          input.focus();
        });
      });
      document.body.style.overflow = 'hidden';
      var f = $('tweaks-fab');
      if (f) f.style.opacity = '0';
    }

    function close() {
      overlay.classList.remove('cp-visible');
      setTimeout(function () { overlay.setAttribute('hidden', ''); }, 220);
      document.body.style.overflow = '';
      var f = $('tweaks-fab');
      if (f) f.style.opacity = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function select(i) {
      items.forEach(function (el) {
        el.classList.remove('cp-selected');
        el.setAttribute('aria-selected', 'false');
      });
      if (!shown.length) return;
      idx = Math.max(0, Math.min(i, shown.length - 1));
      shown[idx].classList.add('cp-selected');
      shown[idx].setAttribute('aria-selected', 'true');
      shown[idx].scrollIntoView({ block: 'nearest' });
      input.setAttribute('aria-activedescendant', shown[idx].id || '');
    }

    function filter(q) {
      q = q.trim().toLowerCase();
      items.forEach(function (el) {
        var lbl = el.querySelector('.cp-label');
        var hit = !q || (lbl && lbl.textContent.toLowerCase().indexOf(q) !== -1);
        el.hidden = !hit;
      });
      shown = items.filter(function (el) { return !el.hidden; });
      select(0);
    }

    function run(el) {
      if (!el) return;
      var action = el.getAttribute('data-action');
      close();
      setTimeout(function () {
        if (action === 'nav') window.location.href = el.getAttribute('data-href');
        else if (action === 'toggle-scan') document.body.classList.toggle('no-scanlines');
        else if (action === 'toggle-music') { var m = $('music-toggle'); if (m) m.click(); }
        else if (action === 'rick') window.location.href = 'rick.html';
      }, 180);
    }

    input.addEventListener('input', function () { filter(this.value); });
    list.addEventListener('click', function (e) {
      var it = e.target.closest('.cp-item[data-action]');
      if (it) run(it);
    });

    var hint = $('nav-cp-hint');
    if (hint) hint.addEventListener('click', function () { isOpen() ? close() : open(); });

    document.addEventListener('keydown', function (e) {
      /* Ctrl/Cmd+K is the convention. Ctrl+S is kept because the UI has
         advertised it, but it is only claimed while the palette is usable. */
      var mod = e.ctrlKey || e.metaKey;
      if (mod && (e.key === 'k' || e.key === 'K' || e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        isOpen() ? close() : open();
        return;
      }
      if (!isOpen()) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); select(idx + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); select(idx - 1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var typed = input.value.trim().toLowerCase();
        if (typed === 'rick' || typed === 'rickroll' || typed === 'rick roll') {
          close();
          setTimeout(function () { window.location.href = 'rick.html'; }, 180);
          return;
        }
        run(shown[idx]);
      }
    });

    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  })();

  /* ── Photo carousel ───────────────────────────────────────────────────── */
  document.querySelectorAll('.photo-carousel').forEach(function (car) {
    var track = car.querySelector('.carousel-track');
    var slides = track ? track.querySelectorAll('.carousel-img') : [];
    var prev = car.querySelector('.carousel-prev');
    var next = car.querySelector('.carousel-next');
    if (!track || !slides.length || !prev || !next) return;

    var idx = 0;
    var perPage = function () { return window.innerWidth <= 700 ? 1 : 3; };

    function update() {
      var step = slides[0].offsetWidth + 12;
      track.style.transform = 'translate3d(-' + (idx * step) + 'px,0,0)';
      prev.disabled = idx === 0;
      next.disabled = idx + perPage() >= slides.length;
    }

    prev.addEventListener('click', function () {
      idx = Math.max(0, idx - perPage());
      update();
    });
    next.addEventListener('click', function () {
      idx = Math.min(slides.length - perPage(), idx + perPage());
      update();
    });
    window.addEventListener('resize', function () {
      idx = Math.min(idx, Math.max(0, slides.length - perPage()));
      update();
    }, { passive: true });

    /* <picture> never fires load — the inner <img> does. */
    var firstImg = slides[0].tagName === 'PICTURE' ? slides[0].querySelector('img') : slides[0];
    if (firstImg) firstImg.addEventListener('load', update);
    update();
  });
})();
