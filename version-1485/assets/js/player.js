function initMoviePlayer(videoUrl) {
    var video = document.querySelector('.js-player-video');
    var cover = document.querySelector('.player-cover');
    var button = document.querySelector('.player-button');
    var message = document.querySelector('.player-message');
    var hlsInstance = null;

    function showMessage() {
        if (message) {
            message.style.display = 'block';
        }
    }

    function bindSource() {
        if (!video || video.getAttribute('data-ready') === '1') {
            return;
        }
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoUrl;
        } else if (window.Hls && window.Hls.isSupported()) {
            hlsInstance = new Hls({
                enableWorker: true,
                lowLatencyMode: true
            });
            hlsInstance.loadSource(videoUrl);
            hlsInstance.attachMedia(video);
            hlsInstance.on(Hls.Events.ERROR, function (event, data) {
                if (data && data.fatal) {
                    showMessage();
                }
            });
        } else {
            video.src = videoUrl;
        }
        video.setAttribute('data-ready', '1');
    }

    function start() {
        if (!video) {
            return;
        }
        bindSource();
        if (cover) {
            cover.classList.add('is-hidden');
        }
        video.controls = true;
        var attempt = video.play();
        if (attempt && attempt.catch) {
            attempt.catch(function () {
                video.controls = true;
            });
        }
    }

    if (cover) {
        cover.addEventListener('click', start);
    }
    if (button) {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            start();
        });
    }
    if (video) {
        video.addEventListener('click', function () {
            if (video.paused) {
                start();
            }
        });
        video.addEventListener('error', showMessage);
    }
    window.addEventListener('pagehide', function () {
        if (hlsInstance) {
            hlsInstance.destroy();
        }
    });
}
