/* ──────────────────────────────────────────────────────────────────────────
   motion.js — the site's motion language, in one place.

   Every module here is off when the visitor asks for reduced motion, and none
   of them are load-bearing: with this file blocked the site still navigates,
   scrolls and reads normally.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduceMotion = motionQuery.matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;

  /* Chrome and Safari 18+ run cross-document view transitions natively, which
     is instant. Only browsers without them get the JS curtain, so nobody pays
     an artificial delay for an effect the browser can do itself. */
  var nativeTransitions = 'startViewTransition' in document;

  /* ── Page curtain (fallback navigation transition) ──────────────────────
     Adapted from the transitions.js that shipped in the repo unreferenced.  */
  (function () {
    if (reduceMotion || nativeTransitions) return;

    var curtain = document.createElement('div');
    curtain.className = 'page-curtain';
    curtain.id = 'page-curtain';
    curtain.setAttribute('aria-hidden', 'true');
    document.body.appendChild(curtain);

    var EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
    var EASE_IN = 'cubic-bezier(0.7, 0, 0.84, 0)';
    var REVEAL = 620;
    var COVER = 420;

    /* Reveal on load. */
    curtain.style.transform = 'translate3d(0,0,0)';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        curtain.style.transition = 'transform ' + REVEAL + 'ms ' + EASE_OUT;
        curtain.style.transform = 'translate3d(0,-100%,0)';
        curtain.addEventListener('transitionend', function done() {
          curtain.removeEventListener('transitionend', done);
          curtain.style.visibility = 'hidden';
          document.body.classList.add('page-revealed');
        });
      });
    });

    /* Cover on same-origin navigation. */
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      var link = e.target.closest('a[href]');
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#' || link.target === '_blank' ||
          link.hasAttribute('download') || /^(mailto:|tel:|https?:|\/\/)/.test(href)) return;

      e.preventDefault();
      document.body.style.overflow = 'hidden';
      curtain.style.visibility = '';
      curtain.style.transition = 'none';
      curtain.style.transform = 'translate3d(0,100%,0)';
      void curtain.getBoundingClientRect();   /* flush, so the snap commits */

      curtain.style.transition = 'transform ' + COVER + 'ms ' + EASE_IN;
      curtain.style.transform = 'translate3d(0,0,0)';

      var navigated = false;
      function go() {
        if (navigated) return;
        navigated = true;
        window.location.href = href;
      }
      curtain.addEventListener('transitionend', go, { once: true });
      setTimeout(go, COVER + 250);   /* never strand the visitor */
    }, true);
  })();

  /* ── Smooth scroll ────────────────────────────────────────────────────────
     Desktop pointers only. Touch devices already have momentum scrolling that
     feels better than anything we can synthesise, and overriding it on a phone
     is how smooth-scroll libraries earn their bad reputation.               */
  var lenis = null;
  (function () {
    if (reduceMotion || coarse || typeof window.Lenis !== 'function') return;

    lenis = new window.Lenis({
      duration: 0.9,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* Anchor links and any scrollIntoView the rest of the site performs must
       still land in the right place, so route them through Lenis. */
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
      history.pushState(null, '', '#' + id);
    });

    /* The command palette locks body overflow; Lenis must pause with it. */
    var overlay = document.getElementById('cp-overlay');
    if (overlay && 'MutationObserver' in window) {
      new MutationObserver(function () {
        overlay.classList.contains('cp-visible') ? lenis.stop() : lenis.start();
      }).observe(overlay, { attributes: true, attributeFilter: ['class'] });
    }

    document.documentElement.classList.add('has-smooth-scroll');
  })();

  /* ── Magnetic buttons ─────────────────────────────────────────────────── */
  (function () {
    if (reduceMotion || coarse) return;

    var STRENGTH = 0.28;
    var RANGE = 90;

    document.querySelectorAll('[data-magnetic], .hero-btn-primary, .hero-btn-outline, .tweaks-fab')
      .forEach(function (el) {
        var raf = null;
        var tx = 0, ty = 0;

        /* The offset is published as custom properties rather than written
           straight to `transform`, so the stylesheet can compose it with the
           :active press scale instead of being overridden by an inline style. */
        function reset() {
          if (raf) cancelAnimationFrame(raf);
          el.style.setProperty('--mx', '0px');
          el.style.setProperty('--my', '0px');
          el.style.transition = 'transform var(--dur-slow) var(--ease-out)';
        }

        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2);
          var dy = e.clientY - (r.top + r.height / 2);
          if (Math.hypot(dx, dy) > RANGE + Math.max(r.width, r.height) / 2) return reset();
          tx = dx * STRENGTH;
          ty = dy * STRENGTH;
          el.style.transition = 'transform var(--dur-fast) linear';
          if (raf) cancelAnimationFrame(raf);
          raf = requestAnimationFrame(function () {
            el.style.setProperty('--mx', tx.toFixed(2) + 'px');
            el.style.setProperty('--my', ty.toFixed(2) + 'px');
          });
        });

        el.addEventListener('pointerleave', reset);
        el.addEventListener('blur', reset);
      });
  })();

  /* ── Cursor context ───────────────────────────────────────────────────────
     The ring already followed the pointer; now it says something about what
     is under it.                                                            */
  (function () {
    var ring = document.getElementById('cursor-ring');
    if (!ring || coarse || reduceMotion) return;

    var MODES = [
      ['a, button, [role="option"], .tweaks-swatch, summary', 'is-link'],
      ['input, textarea, [contenteditable="true"]', 'is-text'],
      ['.project-card, .internship-card, .testimonial-card, .proj-row', 'is-card'],
    ];

    function clear() {
      ring.classList.remove('is-link', 'is-text', 'is-card');
    }

    document.addEventListener('pointerover', function (e) {
      if (!e.target.closest) return;
      for (var i = 0; i < MODES.length; i++) {
        if (e.target.closest(MODES[i][0])) {
          clear();
          ring.classList.add(MODES[i][1]);
          return;
        }
      }
      clear();
    }, { passive: true });

    document.addEventListener('pointerdown', function () { ring.classList.add('is-down'); });
    document.addEventListener('pointerup', function () { ring.classList.remove('is-down'); });
  })();

  /* ── Stat count-up ────────────────────────────────────────────────────── */
  (function () {
    var stats = document.querySelectorAll('.stat-num');
    if (!stats.length || reduceMotion || !('IntersectionObserver' in window)) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);

        var el = entry.target;
        var raw = el.textContent.trim();
        var target = parseInt(raw, 10);
        if (isNaN(target)) return;
        var suffix = raw.replace(/^\d+/, '');

        var start = performance.now();
        var DURATION = 900;

        (function tick(now) {
          var p = Math.min(1, (now - start) / DURATION);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.6 });

    stats.forEach(function (el) { obs.observe(el); });
  })();

  /* A motion preference can change mid-session; the honest response to being
     asked for less motion is to stop, not to wait for a reload. */
  motionQuery.addEventListener('change', function (e) {
    if (!e.matches) return;
    if (lenis) lenis.destroy();
    document.documentElement.classList.remove('has-smooth-scroll');
  });
})();
