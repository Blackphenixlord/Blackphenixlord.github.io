/* ── Portfolio Background Music — YouTube IFrame API ── */
(function () {
  var player  = null;
  var ready   = false;
  var _on     = localStorage.getItem('lofi') === '1';

  /* Inject YouTube IFrame API script */
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  /* Hidden 1×1 player container */
  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;bottom:0;left:0;overflow:hidden;z-index:-1;';
  wrap.innerHTML = '<div id="yt-bg"></div>';
  document.body.appendChild(wrap);

  /* Called automatically by YouTube API when ready */
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('yt-bg', {
      /* Lofi Girl 24/7 live stream */
      videoId: 's19c4Ysywyg',
      playerVars: {
        autoplay    : 0,
        loop        : 1,
        playlist    : 'jfKfPfyJRdk',
        controls    : 0,
        disablekb   : 1,
        fs          : 0,
        modestbranding: 1,
        iv_load_policy: 3,
        rel         : 0,
      },
      events: {
        onReady: function () {
          ready = true;
          player.setVolume(35);
          if (_on) player.playVideo();
          render();
        },
      },
    });
  };

  /* Update button appearance */
  function render() {
    var btn = document.getElementById('music-toggle');
    if (!btn) return;
    btn.textContent   = _on ? '♫ ut: on' : '♫ ut: off';
    btn.style.color   = _on ? '#00ff41'     : '#3a5a3a';
    btn.style.borderColor = _on ? 'rgba(0,255,65,0.45)' : '#1a3a1a';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('music-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      _on = !_on;
      localStorage.setItem('lofi', _on ? '1' : '0');
      if (ready && player) {
        _on ? player.playVideo() : player.pauseVideo();
      }
      render();
    });

    render();
  });
})();
