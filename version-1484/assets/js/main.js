(function () {
  function ready(callback) {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  ready(function () {
    var toggle = document.querySelector('[data-menu-toggle]');
    var mobileNav = document.querySelector('[data-mobile-nav]');

    if (toggle && mobileNav) {
      toggle.addEventListener('click', function () {
        mobileNav.classList.toggle('open');
      });
    }

    var hero = document.querySelector('[data-hero]');
    if (hero) {
      var slides = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-slide]'));
      var dots = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-dot]'));
      var prev = hero.querySelector('[data-hero-prev]');
      var next = hero.querySelector('[data-hero-next]');
      var index = 0;
      var timer = null;

      function show(nextIndex) {
        if (!slides.length) {
          return;
        }
        index = (nextIndex + slides.length) % slides.length;
        slides.forEach(function (slide, i) {
          slide.classList.toggle('active', i === index);
        });
        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === index);
        });
      }

      function restart() {
        window.clearInterval(timer);
        timer = window.setInterval(function () {
          show(index + 1);
        }, 5000);
      }

      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          show(Number(dot.getAttribute('data-hero-dot')) || 0);
          restart();
        });
      });

      if (prev) {
        prev.addEventListener('click', function () {
          show(index - 1);
          restart();
        });
      }

      if (next) {
        next.addEventListener('click', function () {
          show(index + 1);
          restart();
        });
      }

      show(0);
      restart();
    }

    var roots = document.querySelectorAll('[data-filter-root]');
    roots.forEach(function (root) {
      var input = root.querySelector('[data-filter-input]');
      var year = root.querySelector('[data-filter-year]');
      var count = root.querySelector('[data-filter-count]');
      var list = root.parentElement.querySelector('[data-filter-list]');

      if (!list) {
        return;
      }

      var cards = Array.prototype.slice.call(list.querySelectorAll('[data-card]'));

      function normalize(value) {
        return String(value || '').toLowerCase().trim();
      }

      function apply() {
        var query = normalize(input ? input.value : '');
        var selectedYear = year ? year.value : '';
        var visible = 0;

        cards.forEach(function (card) {
          var haystack = normalize([
            card.getAttribute('data-title'),
            card.getAttribute('data-year'),
            card.getAttribute('data-region'),
            card.getAttribute('data-type'),
            card.getAttribute('data-genre')
          ].join(' '));
          var yearMatch = !selectedYear || card.getAttribute('data-year') === selectedYear;
          var queryMatch = !query || haystack.indexOf(query) !== -1;
          var shouldShow = yearMatch && queryMatch;

          card.classList.toggle('hidden-by-filter', !shouldShow);
          if (shouldShow) {
            visible += 1;
          }
        });

        if (count) {
          count.textContent = visible + ' 部';
        }
      }

      if (input) {
        input.addEventListener('input', apply);
      }
      if (year) {
        year.addEventListener('change', apply);
      }

      var params = new URLSearchParams(window.location.search);
      var q = params.get('q');
      if (q && input) {
        input.value = q;
      }
      apply();
    });
  });
})();
