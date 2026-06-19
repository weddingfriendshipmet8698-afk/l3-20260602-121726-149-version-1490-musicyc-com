(function () {
  window.startMoviePlayer = function (source) {
    var wrap = document.querySelector('[data-player-wrap]');
    var video = document.querySelector('[data-player-video]');
    var cover = document.querySelector('[data-player-cover]');
    var message = document.querySelector('[data-player-message]');
    var trigger = document.querySelector('[data-detail-play]');
    var hls = null;
    var loaded = false;

    if (!wrap || !video || !source) {
      return;
    }

    function setMessage(value) {
      if (message) {
        message.textContent = value || '';
      }
    }

    function load() {
      if (loaded) {
        return;
      }
      loaded = true;

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = source;
      } else if (window.Hls && window.Hls.isSupported()) {
        hls = new window.Hls({
          enableWorker: true,
          lowLatencyMode: true
        });
        hls.loadSource(source);
        hls.attachMedia(video);
      } else {
        video.src = source;
      }
    }

    function play() {
      load();
      wrap.classList.add('is-playing');
      setMessage('');
      var result = video.play();
      if (result && typeof result.catch === 'function') {
        result.catch(function () {
          setMessage('点击画面继续播放');
        });
      }
    }

    if (cover) {
      cover.addEventListener('click', play);
    }

    if (trigger) {
      trigger.addEventListener('click', play);
    }

    video.addEventListener('click', function () {
      if (video.paused) {
        play();
      }
    });

    video.addEventListener('play', function () {
      wrap.classList.add('is-playing');
    });

    video.addEventListener('error', function () {
      setMessage('视频加载中，请稍后重试');
    });

    window.addEventListener('beforeunload', function () {
      if (hls) {
        hls.destroy();
      }
    });
  };
})();
