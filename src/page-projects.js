/* Projects — behaviour that exists only on this page.
   Shared chrome (nav, cursor, palette, tweaks, reveal) lives in app.js. */
// Filter
(function () {
  const btns = document.querySelectorAll('.filter-btn');
  const rows = document.querySelectorAll('.proj-row');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      rows.forEach(row => {
        const cats = (row.dataset.categories || '').split(' ');
        const show = f === 'all' || cats.includes(f);
        row.style.opacity = show ? '' : '0.25';
        row.style.pointerEvents = show ? '' : 'none';
      });
    });
  });
})();
