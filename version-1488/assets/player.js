(function () {
  var video = document.querySelector('[data-player-video]');
  var button = document.querySelector('[data-player-button]');
  var configNode = document.getElementById('player-config');
  if (!video || !button || !configNode) {
    return;
  }
  var config;
  try {
    config = JSON.parse(configNode.textContent || '{}');
  } catch (error) {
    config = {};
  }
  var source = config.source || '';
  var started = false;

  function begin() {
    if (started || !source) {
      return;
    }
    started = true;
    button.classList.add('is-hidden');
    video.setAttribute('controls', 'controls');
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = source;
      video.play().catch(function () {});
      return;
    }
    if (window.Hls && window.Hls.isSupported()) {
      var hls = new window.Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(window.Hls.Events.MANIFEST_PARSED, function () {
        video.play().catch(function () {});
      });
      return;
    }
    video.src = source;
    video.play().catch(function () {});
  }

  button.addEventListener('click', begin);
  video.addEventListener('click', function () {
    if (!started) {
      begin();
    }
  });
})();
