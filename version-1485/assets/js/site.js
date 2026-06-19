(function () {
    var menuButton = document.querySelector('.menu-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (menuButton && navLinks) {
        menuButton.addEventListener('click', function () {
            navLinks.classList.toggle('is-open');
        });
    }

    var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
    var dots = Array.prototype.slice.call(document.querySelectorAll('.hero-dots button'));
    var heroTitle = document.querySelector('.js-hero-title');
    var heroText = document.querySelector('.js-hero-text');
    var heroLink = document.querySelector('.js-hero-link');
    var heroMeta = document.querySelector('.js-hero-meta');
    var activeIndex = 0;

    function applyHero(index) {
        if (!slides.length) {
            return;
        }
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach(function (slide, i) {
            slide.classList.toggle('is-active', i === activeIndex);
        });
        dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === activeIndex);
        });
        var slide = slides[activeIndex];
        if (heroTitle) {
            heroTitle.textContent = slide.getAttribute('data-title') || '';
        }
        if (heroText) {
            heroText.textContent = slide.getAttribute('data-text') || '';
        }
        if (heroLink) {
            heroLink.href = slide.getAttribute('data-href') || '#';
        }
        if (heroMeta) {
            var meta = slide.getAttribute('data-meta') || '';
            heroMeta.innerHTML = meta.split('|').filter(Boolean).map(function (item) {
                return '<span>' + item + '</span>';
            }).join('');
        }
    }

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            applyHero(i);
        });
    });

    if (slides.length) {
        applyHero(0);
        setInterval(function () {
            applyHero(activeIndex + 1);
        }, 5200);
    }

    var input = document.querySelector('.js-search-input');
    var yearFilter = document.querySelector('.js-year-filter');
    var regionFilter = document.querySelector('.js-region-filter');
    var typeFilter = document.querySelector('.js-type-filter');
    var cards = Array.prototype.slice.call(document.querySelectorAll('.movie-card'));
    var empty = document.querySelector('.empty-state');

    function applyFilters() {
        var q = input ? input.value.trim().toLowerCase() : '';
        var year = yearFilter ? yearFilter.value : '';
        var region = regionFilter ? regionFilter.value : '';
        var type = typeFilter ? typeFilter.value : '';
        var visible = 0;
        cards.forEach(function (card) {
            var text = card.getAttribute('data-search-text') || '';
            var matched = true;
            if (q && text.indexOf(q) === -1) {
                matched = false;
            }
            if (year && card.getAttribute('data-year') !== year) {
                matched = false;
            }
            if (region && card.getAttribute('data-region') !== region) {
                matched = false;
            }
            if (type && card.getAttribute('data-type') !== type) {
                matched = false;
            }
            card.style.display = matched ? '' : 'none';
            if (matched) {
                visible += 1;
            }
        });
        if (empty) {
            empty.style.display = visible ? 'none' : 'block';
        }
    }

    [input, yearFilter, regionFilter, typeFilter].forEach(function (el) {
        if (el) {
            el.addEventListener('input', applyFilters);
            el.addEventListener('change', applyFilters);
        }
    });
})();
