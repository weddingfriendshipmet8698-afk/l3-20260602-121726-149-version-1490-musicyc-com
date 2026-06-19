(function () {
  function ready(callback) {
    if (document.readyState !== 'loading') {
      callback();
      return;
    }
    document.addEventListener('DOMContentLoaded', callback);
  }

  ready(function () {
    var toggle = document.querySelector('[data-menu-toggle]');
    var mobileNav = document.querySelector('[data-mobile-nav]');

    if (toggle && mobileNav) {
      toggle.addEventListener('click', function () {
        mobileNav.classList.toggle('is-open');
      });
    }

    var hero = document.querySelector('[data-hero-slider]');

    if (hero) {
      var slides = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-slide]'));
      var dots = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-dot]'));
      var prev = hero.querySelector('[data-hero-prev]');
      var next = hero.querySelector('[data-hero-next]');
      var index = 0;
      var timer = null;

      function showSlide(nextIndex) {
        if (!slides.length) {
          return;
        }

        index = (nextIndex + slides.length) % slides.length;

        slides.forEach(function (slide, slideIndex) {
          slide.classList.toggle('is-active', slideIndex === index);
        });

        dots.forEach(function (dot, dotIndex) {
          dot.classList.toggle('is-active', dotIndex === index);
        });
      }

      function restart() {
        if (timer) {
          window.clearInterval(timer);
        }

        timer = window.setInterval(function () {
          showSlide(index + 1);
        }, 5200);
      }

      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          showSlide(Number(dot.getAttribute('data-hero-dot')) || 0);
          restart();
        });
      });

      if (prev) {
        prev.addEventListener('click', function () {
          showSlide(index - 1);
          restart();
        });
      }

      if (next) {
        next.addEventListener('click', function () {
          showSlide(index + 1);
          restart();
        });
      }

      showSlide(0);
      restart();
    }

    var playerBoxes = Array.prototype.slice.call(document.querySelectorAll('[data-player]'));

    playerBoxes.forEach(function (box) {
      var video = box.querySelector('video');
      var overlay = box.querySelector('.play-overlay');
      var source = box.getAttribute('data-src');
      var hls = null;
      var loaded = false;

      function loadSource() {
        if (!video || !source || loaded) {
          return;
        }

        loaded = true;

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = source;
          return;
        }

        if (window.Hls && window.Hls.isSupported()) {
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

      function playVideo() {
        loadSource();

        if (overlay) {
          overlay.classList.add('is-hidden');
        }

        var attempt = video.play();

        if (attempt && typeof attempt.catch === 'function') {
          attempt.catch(function () {
            if (overlay) {
              overlay.classList.remove('is-hidden');
            }
          });
        }
      }

      if (overlay && video) {
        overlay.addEventListener('click', playVideo);
      }

      if (video) {
        video.addEventListener('click', function () {
          if (video.paused) {
            playVideo();
          }
        });

        video.addEventListener('play', function () {
          if (overlay) {
            overlay.classList.add('is-hidden');
          }
        });
      }

      window.addEventListener('beforeunload', function () {
        if (hls) {
          hls.destroy();
        }
      });
    });

    var searchInput = document.querySelector('[data-search-input]');
    var searchResults = document.querySelector('[data-search-results]');

    if (searchInput && searchResults) {
      var params = new URLSearchParams(window.location.search);
      var initial = params.get('q') || '';
      searchInput.value = initial;

      function filterCards() {
        var keyword = searchInput.value.trim().toLowerCase();
        var cards = Array.prototype.slice.call(searchResults.querySelectorAll('.movie-card'));

        cards.forEach(function (card) {
          var text = [
            card.getAttribute('data-title'),
            card.getAttribute('data-region'),
            card.getAttribute('data-year'),
            card.getAttribute('data-genre'),
            card.textContent
          ].join(' ').toLowerCase();

          card.classList.toggle('is-filter-hidden', keyword && text.indexOf(keyword) === -1);
        });
      }

      searchInput.addEventListener('input', filterCards);
      filterCards();
    }
  });
})();
