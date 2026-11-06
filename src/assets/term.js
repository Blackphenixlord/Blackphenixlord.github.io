/* Interactive terminals (home, résumé). Each [data-term] carries its own
   commands as <template data-cmd="name"> so every word of output lives in
   the page HTML. Built-ins: clear, reset, ls, cat/open/cd <page>, eggs,
   plus a few hidden ones (sudo, matrix, rick).
   Typed intro lines animate an aria-hidden overlay (see os.js); command
   output goes to a role="log" region so screen readers hear each answer once. */
(() => {
  const PAGES = ['index.html', 'about.html', 'internships.html', 'projects.html', 'resume.html', 'testimonials.html', 'contact.html'];
  const rm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  document.querySelectorAll('[data-term]').forEach((term) => {
    const intro = term.querySelector('[data-term-intro]');
    const log = term.querySelector('[data-term-log]');
    const form = term.querySelector('[data-term-form]');
    const input = form.querySelector('input');
    const ghost = term.querySelector('[data-term-ghost]');
    const scroller = log.parentElement;
    const cmds = {};
    term.querySelectorAll('template[data-cmd]').forEach((t) => { cmds[t.dataset.cmd] = t; });
    if (cmds.hello) cmds.hi = cmds.hello;
    const names = [...Object.keys(cmds), 'clear', 'reset', 'ls', 'eggs'];
    const history = [];
    let hpos = 0;

    /* Type the intro once, when the terminal scrolls into view. */
    const lines = [...intro.children];
    let typed = false;
    const play = async () => {
      if (typed || !window.JC) return;
      typed = true;
      if (rm()) return;
      lines.forEach((l) => l.classList.add('pending'));
      for (const [i, l] of lines.entries()) {
        l.classList.remove('pending');
        await window.JC.type(l, i === 0 ? 30 : 3);
      }
    };
    new IntersectionObserver((ents, ob) => {
      if (ents[0].isIntersecting) { ob.disconnect(); play(); }
    }, { threshold: 0.3 }).observe(term);

    const print = (html, cls = '') => {
      const p = document.createElement('div');
      p.className = 'out ' + cls;
      p.innerHTML = html;
      log.append(p);
      scroller.scrollTop = scroller.scrollHeight;
      return p;
    };
    const matrix = () => {
      const el = print('', 'rain');
      el.setAttribute('aria-hidden', 'true');
      const cols = Math.max(16, Math.floor(el.clientWidth / 9));
      const drops = Array.from({ length: cols }, () => (Math.random() * -20) | 0);
      const grid = Array.from({ length: 16 }, () => Array(cols).fill(' '));
      let n = 0;
      const glyph = () => String.fromCharCode(0x30a0 + ((Math.random() * 96) | 0));
      const id = setInterval(() => {
        for (let c = 0; c < cols; c++) {
          for (let r = 15; r > 0; r--) grid[r][c] = grid[r - 1][c];
          grid[0][c] = drops[c]++ >= 0 && Math.random() > 0.35 ? glyph() : ' ';
        }
        el.textContent = grid.map((r) => r.join('')).join('\n');
        if (++n > (rm() ? 1 : 60)) { clearInterval(id); el.remove(); print('Wake up, Neo… <span class="g">follow the white rabbit.</span>'); }
      }, 50);
    };

    const run = (raw) => {
      const line = raw.trim();
      if (!line) return;
      history.push(line); hpos = history.length;
      const [cmd, ...rest] = line.split(/\s+/);
      const arg = rest.join(' ');
      const c = cmd.toLowerCase();
      if (c === 'clear') { log.textContent = ''; intro.hidden = true; return; }
      if (c === 'reset') { log.textContent = ''; intro.hidden = false; return; }
      print(esc(line), 'echo');
      if (cmds[c]) { print(cmds[c].innerHTML); return; }
      if (c === 'ls') { print(PAGES.map((p) => `<span class="d">-rw-r--r--</span>  ${p}`).join('<br>')); return; }
      if (['cat', 'open', 'cd'].includes(c) && arg) {
        const page = arg.replace(/^\.?\//, '').replace(/^~\/?/, '');
        const file = page.endsWith('.html') ? page : page + '.html';
        if (PAGES.includes(file)) { print(`opening <span class="g">${esc(file)}</span>…`); setTimeout(() => (location.href = '/' + file), 350); }
        else print(`<span class="err">${esc(c)}: ${esc(arg)}: No such file or directory</span>`);
        return;
      }
      if (c === 'sudo') { print('<span class="err">joshua is not in the sudoers file.</span> This incident will be reported.'); return; }
      if (c === 'matrix') { matrix(); return; }
      if (c === 'rick' || line.toLowerCase() === 'rick roll') { print('never gonna give you up…'); setTimeout(() => (location.href = '/rick.html'), 500); return; }
      if (c === 'eggs') {
        const eggs = document.querySelector('.eggs');
        if (eggs) { eggs.open = true; eggs.scrollIntoView({ behavior: rm() ? 'auto' : 'smooth', block: 'center' }); }
        print('<span class="g">~/.easter-eggs</span> opened in the footer.');
        return;
      }
      print(`<span class="err">command not found:</span> ${esc(cmd)} &nbsp;— try <span class="g">help</span>`);
    };

    const complete = () => {
      const v = input.value.toLowerCase();
      const hit = v && names.find((n) => n.startsWith(v) && n !== v);
      ghost.textContent = hit ? hit.slice(v.length) : '';
      if (hit) {
        const m = document.createElement('span');
        m.style.cssText = 'visibility:hidden;white-space:pre';
        m.textContent = input.value;
        ghost.style.left = '';
        ghost.textContent = '';
        ghost.append(m, hit.slice(v.length));
        ghost.style.left = input.offsetLeft + 'px';
      }
      return hit;
    };
    input.addEventListener('input', complete);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') { const h = complete(); if (h) { e.preventDefault(); input.value = h; ghost.textContent = ''; } }
      else if (e.key === 'ArrowUp' && history.length) { e.preventDefault(); hpos = Math.max(0, hpos - 1); input.value = history[hpos]; }
      else if (e.key === 'ArrowDown' && history.length) { e.preventDefault(); hpos = Math.min(history.length, hpos + 1); input.value = history[hpos] || ''; }
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      run(input.value);
      input.value = ''; ghost.textContent = '';
    });
    term.querySelector('.term-body').addEventListener('click', (e) => {
      if (!e.target.closest('a') && !getSelection().toString()) input.focus({ preventScroll: true });
    });
  });
})();
