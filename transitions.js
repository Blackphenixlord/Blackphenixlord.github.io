/* ── Page Curtain Transition ─────────────────────────────────────────────
   ENTER  : curtain covers screen → hold → sweeps UP with expo-out ease
   EXIT   : curtain covers from below with expo-in ease → navigate
   Smooth : translate3d (GPU layer) + forced reflow — no flash frame
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  var curtain = document.getElementById('page-curtain');
  if (!curtain) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    curtain.style.display = 'none';
    return;
  }

  /* Separate easing per direction — matches how premium sites feel:
     REVEAL: expo-out — snaps open fast, floats to a stop. Feels instant.
     COVER : expo-in  — accelerates into screen. Feels decisive. */
  var EASE_OUT  = 'cubic-bezier(0.16, 1, 0.3, 1)';
  var EASE_IN   = 'cubic-bezier(0.7, 0, 0.84, 0)';
  var ENTER_DUR = 1100; /* ms — reveal */
  var EXIT_DUR  = 640;  /* ms — cover  */
  var HOLD      = 120;  /* ms — pause on load so JC mark registers */

  curtain.classList.add('is-covering');

  /* Force curtain onto its own GPU compositing layer immediately */
  curtain.style.transform = 'translate3d(0, 0, 0)';

  /* ── Page enter ── */
  function revealPage() {
    curtain.style.transition = 'transform ' + ENTER_DUR + 'ms ' + EASE_OUT;
    curtain.style.transform  = 'translate3d(0, -100%, 0)';

    curtain.addEventListener('transitionend', function onDone() {
      curtain.removeEventListener('transitionend', onDone);
      curtain.classList.remove('is-covering');
      document.body.classList.add('page-revealed');
    });
  }

  setTimeout(function () {
    requestAnimationFrame(function () {
      requestAnimationFrame(revealPage);
    });
  }, HOLD);

  /* ── Page exit ── */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href) return;

    if (href.charAt(0) === '#'        ||
        href.indexOf('mailto:') === 0 ||
        href.indexOf('http')    === 0 ||
        href.indexOf('//')      === 0 ||
        link.target             === '_blank') return;

    e.preventDefault();

    /* Lock scroll so page doesn't shift during the cover animation */
    document.body.style.overflow = 'hidden';
    curtain.classList.add('is-covering');

    /* Snap curtain to bottom — getBoundingClientRect() forces a synchronous
       layout flush so the snap is committed before the animation starts.
       More reliable than double-rAF for preventing the flash frame. */
    curtain.style.transition = 'none';
    curtain.style.transform  = 'translate3d(0, 100%, 0)';
    void curtain.getBoundingClientRect();

    curtain.style.transition = 'transform ' + EXIT_DUR + 'ms ' + EASE_IN;
    curtain.style.transform  = 'translate3d(0, 0, 0)';

    curtain.addEventListener('transitionend', function navigate() {
      curtain.removeEventListener('transitionend', navigate);
      window.location.href = href;
    });
  }, true);
})();
