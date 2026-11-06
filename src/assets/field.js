/* The hero's living background: a flickering grid of green cells that
   brightens around the pointer (or a finger), ripples on tap, and drifts on
   its own when nobody is touching it.
   Rebuilt in plain canvas from Magic UI's "Flickering Grid" (MIT,
   https://magicui.design/docs/components/flickering-grid); the pointer field,
   ripples, idle drift and level batching are additions.
   Cost control: cells are drawn in 8 alpha buckets (8 fills per frame, not
   one per cell), phones get bigger cells at 30 fps and a 1.5x pixel cap, and
   the loop stops whenever the hero is off-screen or the tab is hidden. */
(() => {
  const canvas = document.querySelector('[data-field]');
  if (!canvas) return;
  const hero = canvas.parentElement;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const coarse = matchMedia('(pointer: coarse)').matches;
  const small = innerWidth < 760;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CELL = 3;
  const PITCH = small ? 17 : 13;
  const FPS = coarse || small ? 30 : 60;
  const RADIUS = small ? 130 : 200;
  const BASE = 0.22;
  const LEVELS = 8;

  let w = 0, h = 0, dpr = 1, cols = 0, rows = 0, cells = new Float32Array(0);
  let running = false, visible = true, raf = 0, last = 0, acc = 0;
  let boost = 1;
  const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false, seen: 0 };
  const ripples = [];

  function size() {
    const r = hero.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, coarse ? 1.5 : 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    cols = Math.ceil(w / PITCH) + 1;
    rows = Math.ceil(h / PITCH) + 1;
    cells = new Float32Array(cols * rows);
    for (let i = 0; i < cells.length; i++) cells[i] = Math.random() * BASE;
  }

  const buckets = Array.from({ length: LEVELS }, () => []);
  function frame(t, dt) {
    /* Flicker: each cell has a small chance per second to pick a new level. */
    const chance = 0.9 * dt;
    for (let i = 0; i < cells.length; i++) if (Math.random() < chance) cells[i] = Math.random() * BASE;

    /* Pointer eases toward its target; with no pointer, a ghost drifts. */
    if (!ptr.active && t - ptr.seen > 2500) {
      ptr.tx = w * (0.5 + 0.32 * Math.sin(t / 3100));
      ptr.ty = h * (0.45 + 0.28 * Math.sin(t / 2300 + 1));
    }
    ptr.x += (ptr.tx - ptr.x) * Math.min(1, dt * 7);
    ptr.y += (ptr.ty - ptr.y) * Math.min(1, dt * 7);

    for (const b of buckets) b.length = 0;
    const R2 = RADIUS * RADIUS * boost;
    const scan = ((t / 4200) % 1) * (h + 200) - 100;
    for (let c = 0; c < cols; c++) {
      const x = c * PITCH;
      const dx = x - ptr.x;
      for (let r = 0; r < rows; r++) {
        const y = r * PITCH;
        let a = cells[c * rows + r];
        const dy = y - ptr.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2) { const f = 1 - d2 / R2; a += f * f * 0.85; }
        const sd = Math.abs(y - scan);
        if (sd < 40) a += (1 - sd / 40) * 0.12;
        for (let k = 0; k < ripples.length; k++) {
          const rp = ripples[k];
          const rd = Math.abs(Math.hypot(x - rp.x, y - rp.y) - rp.r);
          if (rd < 26) a += (1 - rd / 26) * 0.7 * rp.life;
        }
        if (a > 0.04) buckets[Math.min(LEVELS - 1, (a * LEVELS) | 0)].push(x, y);
      }
    }
    for (let k = ripples.length - 1; k >= 0; k--) {
      const rp = ripples[k];
      rp.r += dt * 520; rp.life -= dt * 0.9;
      if (rp.life <= 0) ripples.splice(k, 1);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    for (let l = 0; l < LEVELS; l++) {
      const b = buckets[l];
      if (!b.length) continue;
      ctx.globalAlpha = (l + 1) / LEVELS;
      ctx.fillStyle = l >= LEVELS - 2 ? '#b8ffc4' : '#28c840';
      ctx.beginPath();
      const s = l >= LEVELS - 3 ? CELL + 1 : CELL;
      for (let i = 0; i < b.length; i += 2) ctx.rect(b[i], b[i + 1], s, s);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop(t) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.1, (t - (last || t)) / 1000);
    last = t; acc += dt;
    if (acc < 1 / FPS - 0.002) return;
    frame(t, acc); acc = 0;
  }
  function start() { if (running || reduce) return; running = true; last = 0; raf = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  const sync = () => (visible && !document.hidden ? start() : stop());

  size();
  if (reduce) { frame(0, 0); } else sync();

  let rt;
  new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { size(); if (reduce) frame(0, 0); }, 120); }).observe(hero);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }).observe(hero);
  document.addEventListener('visibilitychange', sync);

  if (reduce) return;
  const at = (cx, cy) => { const r = hero.getBoundingClientRect(); return [cx - r.left, cy - r.top]; };
  hero.addEventListener('pointermove', (e) => { [ptr.tx, ptr.ty] = at(e.clientX, e.clientY); ptr.active = true; ptr.seen = performance.now(); }, { passive: true });
  hero.addEventListener('pointerleave', () => { ptr.active = false; ptr.seen = performance.now(); });
  hero.addEventListener('touchmove', (e) => { const p = e.touches[0]; if (p) { [ptr.tx, ptr.ty] = at(p.clientX, p.clientY); ptr.active = true; ptr.seen = performance.now(); } }, { passive: true });
  hero.addEventListener('touchend', () => { ptr.active = false; ptr.seen = performance.now(); }, { passive: true });
  hero.addEventListener('pointerdown', (e) => {
    const [x, y] = at(e.clientX, e.clientY);
    if (ripples.length < 4) ripples.push({ x, y, r: 0, life: 1 });
    ptr.tx = x; ptr.ty = y; ptr.seen = performance.now();
  }, { passive: true });
  document.addEventListener('jc:overdrive', () => {
    boost = 3;
    for (let i = 0; i < 3; i++) ripples.push({ x: w / 2, y: h / 2, r: i * 90, life: 1 });
    setTimeout(() => (boost = 1), 8000);
  });
})();
