/* ── Portfolio Background Music — YouTube IFrame API ──────────────────────
   The API script and its iframe are third-party code, so nothing loads until
   the visitor actually turns music on. A saved "on" preference also waits for
   a gesture: browsers block autoplay without one, and loading YouTube on every
   page to play nothing is pure cost.
   ─────────────────────────────────────────────────────────────────────────── */
(function () {
  var VIDEO_ID = 's19c4Ysywyg';
  var LOOP_ID  = 'jfKfPfyJRdk';

  var player   = null;
  var ready    = false;
  var loading  = false;
  var on       = localStorage.getItem('lofi') === '1';

  /* ── Load the YouTube API, once, on demand ── */
  function loadPlayer() {
    if (loading) return;
    loading = true;

    var wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;' +
                         'pointer-events:none;bottom:0;left:0;overflow:hidden;z-index:-1;';
    wrap.innerHTML = '<div id="yt-bg"></div>';
    document.body.appendChild(wrap);

    window.onYouTubeIframeAPIReady = function () {
      player = new YT.Player('yt-bg', {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0, loop: 1, playlist: LOOP_ID,
          controls: 0, disablekb: 1, fs: 0,
          modestbranding: 1, iv_load_policy: 3, rel: 0
        },
        events: {
          onReady: function () {
            ready = true;
            player.setVolume(35);
            if (on) player.playVideo();
            render();
          }
        }
      });
    };

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    document.head.appendChild(tag);
  }

  /* ── Button state ── */
  function render() {
    var btn = document.getElementById('music-toggle');
    if (!btn) return;
    var label = on ? (ready ? 'on' : 'loading') : 'off';
    btn.textContent = '♫ lofi: ' + label;
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.style.color = on ? '#00ff41' : '#3a5a3a';
    btn.style.borderColor = on ? 'rgba(0,255,65,0.45)' : '#1a3a1a';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('music-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      on = !on;
      localStorage.setItem('lofi', on ? '1' : '0');

      if (on && !loading) {
        loadPlayer();            /* first ever "on" — fetch the API now */
      } else if (ready && player) {
        on ? player.playVideo() : player.pauseVideo();
      }
      render();
    });

    render();
  });
})();
