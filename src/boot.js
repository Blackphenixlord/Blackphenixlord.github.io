/* -- Boot Screen - Login sequence ----------------------------------------
   Plays once per session. Click / any key to skip.
   Colors: green #28c840 . yellow #febc2e . red #ff5f57 (logo traffic lights)
   ---------------------------------------------------------------------- */
(function () {
  var scr  = document.getElementById('boot-screen');
  var out  = document.getElementById('boot-output');
  var hint = document.getElementById('boot-skip');
  if (!scr || !out) return;

  if (sessionStorage.getItem('booted') === '1') {
    scr.style.display = 'none';
    document.body.classList.remove('booting');
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    scr.style.display = 'none';
    document.body.classList.remove('booting');
    sessionStorage.setItem('booted', '1');
    return;
  }

  /* -- Helpers -- */
  function gap() {
    var p = document.createElement('p');
    p.className = 'boot-line';
    p.innerHTML = '&nbsp;';
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;
  }

  function println(text, color) {
    var p = document.createElement('p');
    p.className = 'boot-line';
    p.style.color = color || '#c9d1d9';
    p.textContent = text;
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;
    return p;
  }

  function typeLine(prefix, text, color, speed, onDone) {
    var p = document.createElement('p');
    p.className = 'boot-line';
    if (prefix) {
      var pre = document.createElement('span');
      pre.style.color = '#c9d1d9';
      pre.textContent = prefix;
      p.appendChild(pre);
    }
    var span = document.createElement('span');
    span.style.color = color || '#00ff41';
    p.appendChild(span);
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;

    var chars = Array.from(text);
    var ci = 0;
    function tick() {
      if (skipped) return;
      if (ci >= chars.length) { if (onDone) onDone(); return; }
      span.textContent += chars[ci++];
      out.scrollTop = out.scrollHeight;
      setTimeout(tick, speed + Math.random() * speed * 0.35);
    }
    tick();
  }

  /* -- Dismiss -- */
  function dismiss() {
    removeSkip();
    scr.classList.add('boot-exit');
    sessionStorage.setItem('booted', '1');
    scr.addEventListener('transitionend', function () {
      scr.style.display = 'none';
      document.body.classList.remove('booting');
      document.body.classList.add('boot-done');
    }, { once: true });
  }

  /* -- Skip -- */
  var skipped = false;
  function skip() { if (skipped) return; skipped = true; dismiss(); }
  function onKey(e) { if (e.key !== 'Tab') skip(); }
  scr.addEventListener('click', skip);
  scr.addEventListener('touchend', skip);
  document.addEventListener('keydown', onKey);
  function removeSkip() {
    scr.removeEventListener('click', skip);
    scr.removeEventListener('touchend', skip);
    document.removeEventListener('keydown', onKey);
  }

  setTimeout(function () { if (hint) hint.style.opacity = '1'; }, 800);

  /* -- Sequence -- */
  function run() {
    gap();
    println('JC/OS 2026.05 LTS  .  joshua-collado.local', '#4a5568');
    gap();

    setTimeout(function () {
      if (skipped) return;
      typeLine('', 'joshua-collado login: ', '#c9d1d9', 32, function () {
        setTimeout(function () {
          if (skipped) return;
          typeLine('joshua-collado login: ', 'joshua', '#28c840', 90, function () {
            setTimeout(function () {
              if (skipped) return;
              gap();
              typeLine('', 'Password: ', '#c9d1d9', 32, function () {
                setTimeout(function () {
                  if (skipped) return;
                  typeLine('Password: ', String.fromCharCode(8226,8226,8226,8226,8226,8226,8226,8226), '#febc2e', 110, function () {
                    setTimeout(function () {
                      if (skipped) return;
                      gap();
                      println('Authenticating...', '#4a5568');
                      setTimeout(function () {
                        if (skipped) return;
                        var auth = println('[ LOGIN OK ]', '#28c840');
                        auth.style.fontWeight = 'bold';
                        setTimeout(function () {
                          if (skipped) return;
                          gap();
                          println('Last login: ' + new Date().toDateString() + '  from 127.0.0.1', '#4a5568');
                          gap();
                          setTimeout(function () {
                            if (skipped) return;
                            println('+------------------------------------------------------------------+', '#1a2a1a');
                            println('|  Welcome, Joshua Collado.  NASA . Los Alamos . Nerdvana . RECON  |', '#00cc33');
                            println('+------------------------------------------------------------------+', '#1a2a1a');
                            gap();
                            setTimeout(function () {
                              if (skipped) return;
                              var p = document.createElement('p');
                              p.className = 'boot-line';
                              p.innerHTML =
                                '<span style="color:#28c840">joshua</span>' +
                                '<span style="color:#4a5568">@</span>' +
                                '<span style="color:#febc2e">collado</span>' +
                                '<span style="color:#4a5568">:</span>' +
                                '<span style="color:#00aaff">~</span>' +
                                '<span style="color:#c9d1d9">$ </span>' +
                                '<span class="boot-cursor">|</span>';
                              out.appendChild(p);
                              out.scrollTop = out.scrollHeight;
                              setTimeout(dismiss, 1200);
                            }, 300);
                          }, 200);
                        }, 500);
                      }, 600);
                    }, 320);
                  });
                }, 260);
              });
            }, 320);
          });
        }, 280);
      });
    }, 200);
  }

  run();
})();