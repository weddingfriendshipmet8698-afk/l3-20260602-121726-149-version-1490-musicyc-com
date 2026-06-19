(function () {
  var menuButton = document.querySelector('[data-menu-toggle]');
  var mobilePanel = document.querySelector('[data-mobile-panel]');
  if (menuButton && mobilePanel) {
    menuButton.addEventListener('click', function () {
      mobilePanel.classList.toggle('is-open');
      document.body.classList.toggle('menu-open', mobilePanel.classList.contains('is-open'));
    });
  }

  var hero = document.querySelector('[data-hero]');
  if (hero) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-slide]'));
    var dots = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-dot]'));
    var prev = hero.querySelector('[data-hero-prev]');
    var next = hero.querySelector('[data-hero-next]');
    var current = 0;
    var timer = null;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, slideIndex) {
        slide.classList.toggle('is-active', slideIndex === current);
      });
      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle('is-active', dotIndex === current);
      });
    }

    function start() {
      timer = window.setInterval(function () {
        show(current + 1);
      }, 5200);
    }

    function restart() {
      window.clearInterval(timer);
      start();
    }

    if (prev) {
      prev.addEventListener('click', function () {
        show(current - 1);
        restart();
      });
    }

    if (next) {
      next.addEventListener('click', function () {
        show(current + 1);
        restart();
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        show(parseInt(dot.getAttribute('data-hero-dot'), 10));
        restart();
      });
    });

    start();
  }

  var searchInput = document.querySelector('[data-card-search]');
  var yearFilter = document.querySelector('[data-year-filter]');
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-title]'));

  function normalize(value) {
    return String(value || '').toLowerCase();
  }

  function applyFilters() {
    var query = normalize(searchInput ? searchInput.value : '');
    var yearValue = yearFilter ? yearFilter.value : '';

    cards.forEach(function (card) {
      var haystack = normalize([
        card.getAttribute('data-title'),
        card.getAttribute('data-year'),
        card.getAttribute('data-region'),
        card.getAttribute('data-genre'),
        card.getAttribute('data-category')
      ].join(' '));
      var year = parseInt(card.getAttribute('data-year') || '0', 10);
      var queryMatch = !query || haystack.indexOf(query) !== -1;
      var yearMatch = true;

      if (yearValue === '2025') {
        yearMatch = year === 2025;
      } else if (yearValue === '2024') {
        yearMatch = year === 2024;
      } else if (yearValue === '2023') {
        yearMatch = year === 2023;
      } else if (yearValue === '2020') {
        yearMatch = year >= 2020;
      } else if (yearValue === '2010') {
        yearMatch = year >= 2010;
      }

      card.style.display = queryMatch && yearMatch ? '' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  if (yearFilter) {
    yearFilter.addEventListener('change', applyFilters);
  }
})();
