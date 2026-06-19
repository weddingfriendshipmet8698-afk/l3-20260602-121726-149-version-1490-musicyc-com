(function () {
  var toggle = document.querySelector('.menu-toggle');
  var panel = document.querySelector('.mobile-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.hero-dot'));
  var current = 0;
  function showSlide(index) {
    if (!slides.length) {
      return;
    }
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === current);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === current);
    });
  }
  var next = document.querySelector('.hero-next');
  var prev = document.querySelector('.hero-prev');
  if (next) {
    next.addEventListener('click', function () {
      showSlide(current + 1);
    });
  }
  if (prev) {
    prev.addEventListener('click', function () {
      showSlide(current - 1);
    });
  }
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      showSlide(i);
    });
  });
  if (slides.length) {
    showSlide(0);
    setInterval(function () {
      showSlide(current + 1);
    }, 5200);
  }

  var searchInput = document.querySelector('[data-filter-input]');
  var genreSelect = document.querySelector('[data-filter-genre]');
  var yearSelect = document.querySelector('[data-filter-year]');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.movie-card'));
  function applyFilter() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var genre = genreSelect ? genreSelect.value : '';
    var year = yearSelect ? yearSelect.value : '';
    cards.forEach(function (card) {
      var text = [card.dataset.title, card.dataset.region, card.dataset.genre].join(' ').toLowerCase();
      var okQuery = !query || text.indexOf(query) !== -1;
      var okGenre = !genre || (card.dataset.genre || '').indexOf(genre) !== -1;
      var okYear = !year || String(card.dataset.year || '') === year;
      card.style.display = okQuery && okGenre && okYear ? '' : 'none';
    });
  }
  [searchInput, genreSelect, yearSelect].forEach(function (node) {
    if (node) {
      node.addEventListener('input', applyFilter);
      node.addEventListener('change', applyFilter);
    }
  });
})();
