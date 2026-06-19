(function () {
  var toggle = document.querySelector('.menu-toggle');
  var mobile = document.querySelector('.mobile-nav');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      mobile.classList.toggle('is-open');
    });
  }

  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.hero-dots button'));
  if (slides.length > 1) {
    var active = 0;
    var showSlide = function (index) {
      active = index % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === active);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === active);
      });
    };
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showSlide(i);
      });
    });
    window.setInterval(function () {
      showSlide(active + 1);
    }, 5200);
  }

  var forms = Array.prototype.slice.call(document.querySelectorAll('[data-search-form]'));
  forms.forEach(function (form) {
    var keyword = form.querySelector('[data-search-input]');
    var year = form.querySelector('[data-year-filter]');
    var region = form.querySelector('[data-region-filter]');
    var cards = Array.prototype.slice.call(document.querySelectorAll('.movie-card'));
    var apply = function () {
      var q = keyword ? keyword.value.trim().toLowerCase() : '';
      var y = year ? year.value : '';
      var r = region ? region.value : '';
      cards.forEach(function (card) {
        var text = [
          card.getAttribute('data-title'),
          card.getAttribute('data-year'),
          card.getAttribute('data-region'),
          card.getAttribute('data-genre')
        ].join(' ').toLowerCase();
        var matchText = !q || text.indexOf(q) !== -1;
        var matchYear = !y || card.getAttribute('data-year') === y;
        var matchRegion = !r || card.getAttribute('data-region') === r;
        card.classList.toggle('hidden-card', !(matchText && matchYear && matchRegion));
      });
    };
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      apply();
    });
    [keyword, year, region].forEach(function (el) {
      if (el) {
        el.addEventListener('input', apply);
        el.addEventListener('change', apply);
      }
    });
  });
})();
