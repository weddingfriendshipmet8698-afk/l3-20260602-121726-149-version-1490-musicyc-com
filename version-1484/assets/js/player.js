(function () {
  function ready(callback) {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  function attachSource(video, source) {
    if (!source) {
      return Promise.reject(new Error('Missing video source'));
    }

    if (window.Hls && window.Hls.isSupported()) {
      var hls = new window.Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90
      });
      hls.loadSource(source);
      hls.attachMedia(video);
      video._hlsInstance = hls;
      return Promise.resolve();
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = source;
      return Promise.resolve();
    }

    video.src = source;
    return Promise.resolve();
  }

  ready(function () {
    var shells = document.querySelectorAll('[data-player-shell]');

    shells.forEach(function (shell) {
      var video = shell.querySelector('video[data-src]');
      var trigger = shell.querySelector('[data-player-trigger]');
      var loaded = false;

      function start() {
        if (!video) {
          return;
        }

        if (!loaded) {
          loaded = true;
          attachSource(video, video.getAttribute('data-src')).then(function () {
            return video.play();
          }).catch(function () {
            video.controls = true;
          });
        } else {
          video.play();
        }

        if (trigger) {
          trigger.classList.add('is-hidden');
        }
      }

      if (trigger) {
        trigger.addEventListener('click', start);
      }

      if (video) {
        video.addEventListener('play', function () {
          if (trigger) {
            trigger.classList.add('is-hidden');
          }
        });
      }
    });
  });
})();
