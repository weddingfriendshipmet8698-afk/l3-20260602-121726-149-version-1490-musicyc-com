(function () {
  var menuButton = document.querySelector('.menu-toggle');
  var mobilePanel = document.querySelector('.mobile-panel');
  if (menuButton && mobilePanel) {
    menuButton.addEventListener('click', function () {
      mobilePanel.classList.toggle('open');
    });
  }

  var slider = document.querySelector('[data-hero-slider]');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hero-slide'));
    var dots = Array.prototype.slice.call(slider.querySelectorAll('.hero-dots button'));
    var index = 0;
    var showSlide = function (next) {
      if (!slides.length) {
        return;
      }
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
      });
    };
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        showSlide(Number(dot.getAttribute('data-slide')) || 0);
      });
    });
    window.setInterval(function () {
      showSlide(index + 1);
    }, 5200);
  }

  var forms = Array.prototype.slice.call(document.querySelectorAll('[data-filter-form]'));
  forms.forEach(function (form) {
    var scope = document.querySelector('.filter-scope') || document;
    var input = form.querySelector('.search-box');
    var region = form.querySelector('.region-filter');
    var year = form.querySelector('.year-filter');
    var cards = Array.prototype.slice.call(scope.querySelectorAll('.movie-card'));
    var applyFilter = function () {
      var keyword = input ? input.value.trim().toLowerCase() : '';
      var regionValue = region ? region.value : '';
      var yearValue = year ? year.value : '';
      cards.forEach(function (card) {
        var text = [card.getAttribute('data-title'), card.getAttribute('data-tags')].join(' ').toLowerCase();
        var matchKeyword = !keyword || text.indexOf(keyword) !== -1;
        var matchRegion = !regionValue || card.getAttribute('data-region') === regionValue;
        var matchYear = !yearValue || card.getAttribute('data-year') === yearValue;
        card.classList.toggle('is-filter-hidden', !(matchKeyword && matchRegion && matchYear));
      });
    };
    [input, region, year].forEach(function (el) {
      if (el) {
        el.addEventListener('input', applyFilter);
        el.addEventListener('change', applyFilter);
      }
    });
  });
})();
