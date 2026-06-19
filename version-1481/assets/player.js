(function () {
  window.initPagePlayer = function (source) {
    var video = document.querySelector('video[data-player]');
    var button = document.querySelector('.play-cover');
    var ready = false;
    var hls = null;

    var attach = function () {
      if (ready || !video || !source) {
        return;
      }
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
      ready = true;
    };

    var start = function () {
      attach();
      if (button) {
        button.classList.add('is-hidden');
      }
      if (video) {
        var promise = video.play();
        if (promise && typeof promise.catch === 'function') {
          promise.catch(function () {});
        }
      }
    };

    if (button) {
      button.addEventListener('click', start);
    }
    if (video) {
      video.addEventListener('click', function () {
        if (video.paused) {
          start();
        }
      });
      video.addEventListener('play', function () {
        if (button) {
          button.classList.add('is-hidden');
        }
      });
    }
    window.addEventListener('pagehide', function () {
      if (hls) {
        hls.destroy();
      }
    });
  };
})();
