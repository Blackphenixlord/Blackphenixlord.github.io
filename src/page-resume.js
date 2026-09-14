/* Resume — behaviour that exists only on this page.
   Shared chrome (nav, cursor, palette, tweaks, reveal) lives in app.js. */
// ── Resume terminal ───────────────────────────────────────────────────────
(function () {
  const RESUME_CMDS = {
    education: 'UTRGV – Dual Enrollment · 2025–2027<br>Science Academy · 2023–2027<br>Rising Scholars Academy · 2021–2023',
    internships: 'NASA HUNCH – Inventory Chain System · Presented Rounds 1 &amp; 2 · Visited NASA in Houston twice<br>Los Alamos Lab – VR Training Experience · Only student selected<br>RECON Technologies – City of Progresso Website<br>Nerdvana – STEM Sandbox for Elementary Schools',
    skills: '<span style="color:#a0aab4">Languages:</span> Python · Java · JavaScript · HTML/CSS · SQL · C<br><span style="color:#a0aab4">Tools:</span> Git · Android · VR/Unity · Full-Stack Dev<br><span style="color:#a0aab4">Focus:</span> AI · Automation · Security',
    contact: 'Email: <a href="mailto:joshuacollado636@gmail.com" style="color:var(--accent);text-decoration:underline">joshuacollado636@gmail.com</a>',
    help: '<span style="color:#a0aab4">Available commands:</span><br><span style="color:var(--accent)">education</span> · <span style="color:var(--accent)">internships</span> · <span style="color:var(--accent)">skills</span> · <span style="color:var(--accent)">contact</span> · <span style="color:var(--accent)">clear</span> · <span style="color:var(--accent)">reset</span>',
    clear: '__CLEAR__',
    reset: '__RESET__',
  };
  const RESUME_LINES = [
    '// joshua@collado · résumé snapshot',
    'UTRGV Dual Enrollment · Science Academy · South Texas',
    'Internships: NASA · Los Alamos · RECON · Nerdvana',
    'Type <span style="color:var(--accent)">education</span>, <span style="color:var(--accent)">internships</span>, or <span style="color:var(--accent)">help</span> to explore.',
  ];

  const card = document.getElementById('resume-terminal-card');
  const output = document.getElementById('resume-terminal-output');
  const promptRow = document.getElementById('resume-terminal-prompt');
  const inputEl = document.getElementById('resume-terminal-input');
  const typedEl = document.getElementById('resume-terminal-typed');
  const hintEl = document.getElementById('resume-terminal-hint');
  if (!card) return;

  let pIdx = 0, cIdx = 0, started = false;

  function appendLine(html) {
    const p = document.createElement('p');
    p.style.cssText = 'margin:0 0 6px;color:#b0ffb8;font-family:\'Share Tech Mono\',monospace;font-size:0.92rem;line-height:1.55';
    p.innerHTML = html;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  }

  function typeLines() {
    if (pIdx >= RESUME_LINES.length) {
      promptRow.style.display = 'flex';
      hintEl.style.opacity = '1';
      return;
    }
    const text = RESUME_LINES[pIdx];
    const p = document.createElement('p');
    p.style.cssText = 'margin:0 0 8px;color:#b0ffb8;font-family:\'Share Tech Mono\',monospace;font-size:0.92rem;line-height:1.55';
    output.appendChild(p);
    p.innerHTML = '';

    function typeNext() {
      if (cIdx < text.length) {
        // detect html tags and inject whole
        if (text[cIdx] === '<') {
          const end = text.indexOf('>', cIdx);
          p.innerHTML += text.slice(cIdx, end + 1);
          cIdx = end + 1;
        } else {
          const ch = text[cIdx++];
          p.innerHTML += ch === ' ' ? '&nbsp;' : ch;
        }
        const d = text[cIdx - 1] === ' ' ? 4 : /[.,!?—]/.test(text[cIdx - 1]) ? 18 : 6 + Math.random() * 4;
        setTimeout(typeNext, d);
      } else {
        cIdx = 0; pIdx++;
        setTimeout(typeLines, 200);
      }
    }
    typeNext();
  }

  function startTyping() {
    pIdx = 0; cIdx = 0; started = true;
    typeLines();
  }

  function appendResponse(html) {
    const p = document.createElement('p');
    p.style.cssText = 'margin:4px 0 12px;color:var(--accent);font-family:\'Share Tech Mono\',monospace;font-size:0.88rem;line-height:1.6';
    p.innerHTML = html;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  }

  card.addEventListener('click', () => inputEl.focus({ preventScroll: true }));
  card.addEventListener('touchend', (e) => {
    e.preventDefault();
    setTimeout(() => inputEl.focus({ preventScroll: true }), 10);
  }, { passive: false });

  const ghostEl = document.getElementById('resume-terminal-ghost');
  const cmdKeys = Object.keys(RESUME_CMDS);
  const history = [];
  let histIdx = -1;

  function updateGhost(val) {
    const lower = val.toLowerCase();
    const match = lower ? cmdKeys.find(k => k.startsWith(lower) && k !== lower) : null;
    ghostEl.textContent = match ? match.slice(lower.length) : '';
  }

  inputEl.addEventListener('input', () => {
    typedEl.textContent = inputEl.value;
    updateGhost(inputEl.value);
  });

  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (ghostEl.textContent) {
        inputEl.value += ghostEl.textContent;
        typedEl.textContent = inputEl.value;
        ghostEl.textContent = '';
      }
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      histIdx = Math.min(histIdx + 1, history.length - 1);
      inputEl.value = history[history.length - 1 - histIdx];
      typedEl.textContent = inputEl.value;
      ghostEl.textContent = '';
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx <= 0) { histIdx = -1; inputEl.value = ''; typedEl.textContent = ''; ghostEl.textContent = ''; return; }
      histIdx--;
      inputEl.value = history[history.length - 1 - histIdx];
      typedEl.textContent = inputEl.value;
      ghostEl.textContent = '';
      return;
    }
    if (e.key !== 'Enter') return;
    const cmd = inputEl.value.trim().toLowerCase();
    inputEl.value = ''; typedEl.textContent = ''; ghostEl.textContent = '';
    if (!cmd) return;
    history.push(cmd);
    histIdx = -1;
    const echo = document.createElement('p');
    echo.style.cssText = 'margin:8px 0 2px;font-family:\'Share Tech Mono\',monospace;font-size:0.88rem;color:#a0aab4';
    echo.innerHTML = '<span style="color:#a0aab4">joshua@collado:~$</span> ' + cmd;
    output.appendChild(echo);
    const resp = RESUME_CMDS[cmd];
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
      appendResponse('<span style="color:#ff6b6b">command not found:</span> ' + cmd + ' — try <span style="color:var(--accent)">help</span>');
    }
    output.scrollTop = output.scrollHeight;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting && !started) { startTyping(); obs.unobserve(card); } });
  }, { threshold: 0.3 });
  obs.observe(card);
})();
