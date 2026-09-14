/* Projects — behaviour that exists only on this page.
   Shared chrome (nav, cursor, palette, tweaks, reveal) lives in app.js. */
(function () {
  var btns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.work-card[data-categories]');
  var empty = document.getElementById('work-empty');
  if (!btns.length || !cards.length) return;

  function apply(filter) {
    var shown = 0;
    cards.forEach(function (card) {
      var cats = (card.getAttribute('data-categories') || '').split(' ');
      var hit = filter === 'all' || cats.indexOf(filter) !== -1;
      card.hidden = !hit;
      if (hit) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      apply(btn.getAttribute('data-filter'));
    });
  });
})();
