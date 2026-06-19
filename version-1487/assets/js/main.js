document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector("[data-menu-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      mobileNav.classList.toggle("open");
    });
  }

  var slides = Array.prototype.slice.call(document.querySelectorAll("[data-hero-slide]"));
  var dots = Array.prototype.slice.call(document.querySelectorAll("[data-hero-dot]"));
  var index = 0;

  function setHero(nextIndex) {
    if (!slides.length) {
      return;
    }

    index = (nextIndex + slides.length) % slides.length;
    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("active", slideIndex === index);
    });
    dots.forEach(function (dot, dotIndex) {
      dot.classList.toggle("active", dotIndex === index);
    });
  }

  dots.forEach(function (dot, dotIndex) {
    dot.addEventListener("click", function () {
      setHero(dotIndex);
    });
  });

  if (slides.length > 1) {
    setInterval(function () {
      setHero(index + 1);
    }, 5200);
  }
});
