/* Home — behaviour that exists only on this page.
   Shared chrome (nav, cursor, palette, tweaks, reveal) lives in app.js. */
// ── Blinking cursor ────────────────────────────────────────────────────────
// cursor blink now handled by CSS animation (.cursor class)

// ── Interactive terminal typewriter ───────────────────────────────────────
(function () {
  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const output = document.getElementById('terminal-output');
  const promptRow = document.getElementById('terminal-prompt');
  const typedSpan = document.getElementById('terminal-typed');
  const hiddenInput = document.getElementById('terminal-input');
  const hintEl = document.getElementById('terminal-hint');

  // Paragraphs to type — use \x01 to start a highlighted span, \x02 to end
  const paragraphs = [
    '\x01// who am i\x02',
    'My name is \x01Joshua Collado\x02, and I\'m a dual enrollment student at \x01UTRGV\x02 through the Science Academy — studying engineering, computer science, and the future. I\'m from South Texas, and I\'m on a mission to use technology to make life better, smarter, and more collaborative.',
    'I\'ve had the privilege of working with \x01NASA\x02 on an Inventory Chain System that granted me 2 visits to the Houston HQ, building a \x01Virtual Reality training experience\x02 with \x01Los Alamos National Laboratory\x02, developing a city website with \x01RECON Technologies\x02, and co-creating a STEM sandbox for elementary schools with \x01Nerdvana\x02.',
    'Right now I\'m designing \x01Evie\x02 — a personal AI assistant that connects Android and Windows into a unified home automation network. My goal is to become a \x01software engineer and AI developer\x02 who builds systems that actually change how people live and work.',
  ];

  // Build HTML from a paragraph string (handles \x01...\x02 highlights)
  function buildHTML(str) {
    return str.replace(/\x01(.*?)\x02/g, '<strong>$1</strong>');
  }

  // Skip straight to full content (no-motion or fallback)
  function showImmediate() {
    paragraphs.forEach(p => {
      const el = document.createElement('p');
      el.innerHTML = buildHTML(p);
      output.appendChild(el);
    });
    promptRow.style.display = 'flex';
    hintEl.style.opacity = '1';
    hintEl.style.transition = 'opacity 0.6s';
    focusInput();
  }

  if (noMotion) { showImmediate(); return; }

  // Typewriter: types one paragraph at a time into a <p>
  let started = false;
  function startTyping() {
    if (started) return;
    started = true;
    let pIdx = 0;

    function typeParagraph() {
      if (pIdx >= paragraphs.length) {
        // Done — show prompt
        setTimeout(() => {
          promptRow.style.display = 'flex';
          hintEl.style.opacity = '1';
          hintEl.style.transition = 'opacity 0.8s ease 0.3s';
          focusInput();
        }, 320);
        return;
      }

      const raw = paragraphs[pIdx];
      const pEl = document.createElement('p');
      pEl.style.opacity = '0';
      output.appendChild(pEl);

      // Fade paragraph in
      requestAnimationFrame(() => {
        pEl.style.transition = 'opacity 0.3s';
        pEl.style.opacity = '1';
      });

      // Build chars array — treat highlighted spans as atomic units
      // so we don't type mid-tag
      const tokens = [];
      let buf = '';
      let inHL = false;
      for (let i = 0; i < raw.length; i++) {
        if (raw[i] === '\x01') { if (buf) { tokens.push({ t: 'plain', v: buf }); buf = ''; } inHL = true; buf = ''; }
        else if (raw[i] === '\x02') { tokens.push({ t: 'hl', v: buf }); buf = ''; inHL = false; }
        else { buf += raw[i]; }
      }
      if (buf) tokens.push({ t: 'plain', v: buf });

      // Flatten into char list, each char carrying its token index
      const chars = [];
      tokens.forEach((tok, ti) => {
        [...tok.v].forEach((ch, ci) => chars.push({ ch, ti, ci, tok }));
      });

      let ci = 0;
      function typeChar() {
        if (ci >= chars.length) {
          pIdx++;
          setTimeout(typeParagraph, pIdx < paragraphs.length ? 100 : 0);
          return;
        }
        // Rebuild innerHTML up to current char
        let html = '';
        let lastTi = -1;
        for (let k = 0; k <= ci; k++) {
          const c = chars[k];
          if (c.tok.t === 'hl') {
            if (c.ti !== lastTi) { html += '<strong>'; lastTi = c.ti; }
            html += c.ch === '<' ? '&lt;' : c.ch === '>' ? '&gt;' : c.ch === '&' ? '&amp;' : c.ch;
            // Close strong if next char is different token or last char
            if (k === ci || chars[k + 1]?.ti !== c.ti) html += '</strong>';
          } else {
            lastTi = -1;
            html += c.ch === '<' ? '&lt;' : c.ch === '>' ? '&gt;' : c.ch === '&' ? '&amp;' : c.ch;
          }
        }
        pEl.innerHTML = html;
        ci++;
        // Variable speed: faster on spaces, slow after punctuation
        const ch = chars[ci - 1]?.ch;
        const delay = ch === ' ' ? 4 : /[.,!?—]/.test(ch) ? 18 : 6 + Math.random() * 4;
        setTimeout(typeChar, delay);
      }
      typeChar();
    }

    typeParagraph();
  }

  // Trigger on scroll into view
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { obs.disconnect(); startTyping(); }
  }, { threshold: 0.3 });
  obs.observe(document.getElementById('terminal-card'));

  // ── Interactive prompt commands ─────────────────────────────────────────
  const COMMANDS = {
    whoami: '<span style="color:var(--accent)">Joshua Collado</span> — engineer, developer, builder.<br>UTRGV Dual Enrollment · Science Academy · South Texas.',
    skills: '<span style="color:#a0aab4">Languages:</span> Python · Java · JavaScript · HTML/CSS · SQL · C<br><span style="color:#a0aab4">Tools:</span> Git · Android · VR/Unity · Full-Stack Dev<br><span style="color:#a0aab4">Focus:</span> AI · Automation · Security',
    contact: 'Email: <a href="mailto:joshuacollado656@gmail.com" style="color:var(--accent);text-decoration:underline">joshuacollado656@gmail.com</a><br>Or head to the <a href="contact.html" style="color:var(--accent);text-decoration:underline">Contact</a> page.',
    projects: 'RECON Technologies · City of Progresso Civic Platform<br>NASA HUNCH · Inventory Chain System (Houston finals)<br>Los Alamos Lab · VR Training Experience<br>Project Evie · AI Home Automation (in progress)',
    help: '<span style="color:#a0aab4">Available commands:</span><br><span style="color:var(--accent)">whoami</span> · <span style="color:var(--accent)">skills</span> · <span style="color:var(--accent)">contact</span> · <span style="color:var(--accent)">projects</span> · <span style="color:var(--accent)">clear</span> · <span style="color:var(--accent)">reset</span> · <span style="color:var(--accent)">help</span>',
    clear: '__CLEAR__',
    reset: '__RESET__',
    hello: '<span style="color:var(--accent)">Hey! 👋</span> Thanks for stopping by.',
    hi: '<span style="color:var(--accent)">Hey! 👋</span> Thanks for stopping by.',
  };

  function focusInput() {
    hiddenInput?.focus({ preventScroll: true });
  }

  function appendResponse(html) {
    const r = document.createElement('p');
    r.className = 'terminal-response';
    r.innerHTML = html;
    r.style.opacity = '0';
    output.appendChild(r);
    requestAnimationFrame(() => { r.style.transition = 'opacity 0.35s'; r.style.opacity = '1'; });
    output.scrollTop = output.scrollHeight;
  }

  const ghostSpan = document.getElementById('terminal-ghost');
  const cmdKeys = Object.keys(COMMANDS);
  const history = [];
  let histIdx = -1;

  function updateGhost(val) {
    const lower = val.toLowerCase();
    const match = lower ? cmdKeys.find(k => k.startsWith(lower) && k !== lower) : null;
    ghostSpan.textContent = match ? match.slice(lower.length) : '';
  }

  hiddenInput?.addEventListener('input', () => {
    typedSpan.textContent = hiddenInput.value;
    updateGhost(hiddenInput.value);
  });

  hiddenInput?.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (ghostSpan.textContent) {
        hiddenInput.value += ghostSpan.textContent;
        typedSpan.textContent = hiddenInput.value;
        ghostSpan.textContent = '';
      }
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      histIdx = Math.min(histIdx + 1, history.length - 1);
      hiddenInput.value = history[history.length - 1 - histIdx];
      typedSpan.textContent = hiddenInput.value;
      ghostSpan.textContent = '';
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx <= 0) { histIdx = -1; hiddenInput.value = ''; typedSpan.textContent = ''; ghostSpan.textContent = ''; return; }
      histIdx--;
      hiddenInput.value = history[history.length - 1 - histIdx];
      typedSpan.textContent = hiddenInput.value;
      ghostSpan.textContent = '';
      return;
    }
    if (e.key !== 'Enter') return;
    const cmd = hiddenInput.value.trim().toLowerCase();
    hiddenInput.value = '';
    typedSpan.textContent = '';
    ghostSpan.textContent = '';
    if (!cmd) return;
    history.push(cmd);
    histIdx = -1;
    // Echo the command
    const echo = document.createElement('p');
    echo.className = 'terminal-echo';
    echo.innerHTML = '<span style="color:#a0aab4">joshua@collado:~$</span> ' + cmd;
    output.appendChild(echo);
    // Respond
    const resp = COMMANDS[cmd];
    if (resp === '__CLEAR__') {
      output.innerHTML = '';
    } else if (resp === '__RESET__') {
      output.innerHTML = '';
      promptRow.style.display = 'none';
      hintEl.style.opacity = '0';
      started = false;
      startTyping();
    } else if (resp) {
      appendResponse(resp);
    } else {
      appendResponse('<span style="color:#ff5f57">command not found:</span> ' + cmd + ' &nbsp;— try <span style="color:var(--accent)">help</span>');
    }
    output.scrollTop = output.scrollHeight;
  });

  // Click or tap anywhere on the card to focus input
  document.getElementById('terminal-card')?.addEventListener('click', focusInput);
  document.getElementById('terminal-card')?.addEventListener('touchend', (e) => {
    e.preventDefault();
    setTimeout(() => focusInput(), 10);
  }, { passive: false });
})();

// ── Hero-tag typewriter ────────────────────────────────────────────────────
const heroTagEl = document.querySelector('.hero-tag');
if (heroTagEl) {
  const full = heroTagEl.textContent;
  heroTagEl.textContent = '';
  let i = 0;
  const tick = () => { if (i < full.length) { heroTagEl.textContent += full[i++]; setTimeout(tick, 55 + Math.random() * 45); } };
  setTimeout(tick, 500);
}


// ── Skill-tag click ripple ────────────────────────────────────────────────
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.style.position = 'relative';
  tag.style.overflow = 'hidden';
  tag.addEventListener('click', e => {
    const rect = tag.getBoundingClientRect();
    const ripple = document.createElement('span');
    Object.assign(ripple.style, {
      position: 'absolute',
      left: (e.clientX - rect.left) + 'px',
      top: (e.clientY - rect.top) + 'px',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#00ff4444',
      transform: 'translate(-50%,-50%) scale(0)',
      transition: 'transform 0.45s ease-out, opacity 0.45s ease-out',
      pointerEvents: 'none',
    });
    tag.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = 'translate(-50%,-50%) scale(24)';
      ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 480);
  });
});

// ── Sync logo height to hero-name height ──────────────────────────────────
// NOTE: must use logo.style (inline) — CSS media-query width overrides setAttribute
function syncLogo() {
  const name = document.querySelector('.hero-name');
  const text = document.querySelector('.hero-text');
  const logo = document.querySelector('.hero-logo');
  const block = document.querySelector('.logo-block');
  if (!name || !logo || !block || !text) return;

  if (window.innerWidth >= 900) {
    const nameRect = name.getBoundingClientRect();
    const textRect = text.getBoundingClientRect();
    const h = name.offsetHeight;
    const offset = Math.max(0, nameRect.top - textRect.top);
    // Inline styles beat the CSS media-query rule
    logo.style.width = h + 'px';
    logo.style.height = h + 'px';
    block.style.marginTop = offset + 'px';
    block.style.alignSelf = 'flex-start';
  } else {
    logo.style.width = '';
    logo.style.height = '';
    block.style.marginTop = '';
    block.style.alignSelf = '';
  }
}
// Fire multiple times: fonts.ready may beat Orbitron rendering; load + delays catch it
document.fonts.ready.then(() => { syncLogo(); setTimeout(syncLogo, 150); });
window.addEventListener('load', () => { syncLogo(); setTimeout(syncLogo, 300); });
window.addEventListener('resize', () => requestAnimationFrame(syncLogo));
