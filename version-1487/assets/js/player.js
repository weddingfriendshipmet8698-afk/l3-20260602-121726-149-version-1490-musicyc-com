document.addEventListener("DOMContentLoaded", function () {
  var video = document.querySelector("[data-player]");
  var button = document.querySelector("[data-play-button]");

  if (!video) {
    return;
  }

  var source = video.getAttribute("data-source");

  if (source) {
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
    } else if (window.Hls && window.Hls.isSupported()) {
      var hls = new window.Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      hls.loadSource(source);
      hls.attachMedia(video);
    } else {
      video.src = source;
    }
  }

  function playVideo() {
    var playResult = video.play();
    if (playResult && typeof playResult.then === "function") {
      playResult.then(function () {
        if (button) {
          button.classList.add("hidden");
        }
      }).catch(function () {
        if (button) {
          button.classList.remove("hidden");
        }
      });
    } else if (button) {
      button.classList.add("hidden");
    }
  }

  if (button) {
    button.addEventListener("click", playVideo);
  }

  video.addEventListener("play", function () {
    if (button) {
      button.classList.add("hidden");
    }
  });

  video.addEventListener("pause", function () {
    if (button) {
      button.classList.remove("hidden");
    }
  });
});
