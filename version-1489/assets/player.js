(function () {
    var players = document.querySelectorAll('.movie-player');

    players.forEach(function (box) {
        var video = box.querySelector('video');
        var button = box.querySelector('.player-cover');
        var stream = box.getAttribute('data-stream');
        var hls = null;
        var ready = false;

        var load = function () {
            if (!video || !stream || ready) {
                return;
            }

            ready = true;

            if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = stream;
            } else if (window.Hls && window.Hls.isSupported()) {
                hls = new window.Hls({
                    enableWorker: true,
                    lowLatencyMode: true
                });
                hls.loadSource(stream);
                hls.attachMedia(video);
            } else {
                video.src = stream;
            }
        };

        var play = function () {
            load();
            if (button) {
                button.classList.add('is-hidden');
            }
            var result = video.play();
            if (result && typeof result.catch === 'function') {
                result.catch(function () {
                    if (button) {
                        button.classList.remove('is-hidden');
                    }
                });
            }
        };

        if (button) {
            button.addEventListener('click', play);
        }

        if (video) {
            video.addEventListener('play', function () {
                if (button) {
                    button.classList.add('is-hidden');
                }
            });
            video.addEventListener('pause', function () {
                if (button && video.currentTime === 0) {
                    button.classList.remove('is-hidden');
                }
            });
        }

        window.addEventListener('beforeunload', function () {
            if (hls) {
                hls.destroy();
            }
        });
    });
})();
