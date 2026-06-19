(function () {
    var toggle = document.querySelector('[data-mobile-toggle]');
    var nav = document.querySelector('[data-mobile-nav]');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('is-open');
        });
    }

    var hero = document.querySelector('[data-hero]');
    if (hero) {
        var slides = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-slide]'));
        var dots = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-dot]'));
        var active = 0;
        var timer = null;

        var show = function (index) {
            active = (index + slides.length) % slides.length;
            slides.forEach(function (slide, idx) {
                slide.classList.toggle('is-active', idx === active);
            });
            dots.forEach(function (dot, idx) {
                dot.classList.toggle('is-active', idx === active);
            });
        };

        var start = function () {
            timer = window.setInterval(function () {
                show(active + 1);
            }, 5200);
        };

        dots.forEach(function (dot, idx) {
            dot.addEventListener('click', function () {
                if (timer) {
                    window.clearInterval(timer);
                }
                show(idx);
                start();
            });
        });

        if (slides.length > 1) {
            start();
        }
    }

    var scopes = document.querySelectorAll('[data-filter-scope]');
    scopes.forEach(function (scope) {
        var section = scope.closest('section') || document;
        var input = scope.querySelector('[data-filter-input]');
        var yearSelect = scope.querySelector('[data-filter-year]');
        var typeSelect = scope.querySelector('[data-filter-type]');
        var reset = scope.querySelector('[data-filter-reset]');
        var items = Array.prototype.slice.call(section.querySelectorAll('.filter-list [data-title]'));
        var years = [];
        var types = [];

        items.forEach(function (item) {
            var year = item.getAttribute('data-year') || '';
            var type = item.getAttribute('data-type') || '';
            if (year && years.indexOf(year) === -1) {
                years.push(year);
            }
            if (type && types.indexOf(type) === -1) {
                types.push(type);
            }
        });

        years.sort(function (a, b) {
            return Number(b) - Number(a);
        });
        types.sort();

        years.forEach(function (year) {
            var option = document.createElement('option');
            option.value = year;
            option.textContent = year + '年';
            yearSelect.appendChild(option);
        });

        types.forEach(function (type) {
            var option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeSelect.appendChild(option);
        });

        var params = new URLSearchParams(window.location.search);
        if (params.get('q') && input) {
            input.value = params.get('q');
        }

        var apply = function () {
            var q = (input && input.value ? input.value : '').trim().toLowerCase();
            var year = yearSelect ? yearSelect.value : '';
            var type = typeSelect ? typeSelect.value : '';

            items.forEach(function (item) {
                var text = [
                    item.getAttribute('data-title'),
                    item.getAttribute('data-year'),
                    item.getAttribute('data-type'),
                    item.getAttribute('data-region'),
                    item.getAttribute('data-genre')
                ].join(' ').toLowerCase();
                var matched = true;

                if (q && text.indexOf(q) === -1) {
                    matched = false;
                }
                if (year && item.getAttribute('data-year') !== year) {
                    matched = false;
                }
                if (type && item.getAttribute('data-type') !== type) {
                    matched = false;
                }

                item.classList.toggle('is-filter-hidden', !matched);
            });
        };

        if (input) {
            input.addEventListener('input', apply);
        }
        if (yearSelect) {
            yearSelect.addEventListener('change', apply);
        }
        if (typeSelect) {
            typeSelect.addEventListener('change', apply);
        }
        if (reset) {
            reset.addEventListener('click', function () {
                if (input) {
                    input.value = '';
                }
                if (yearSelect) {
                    yearSelect.value = '';
                }
                if (typeSelect) {
                    typeSelect.value = '';
                }
                apply();
            });
        }

        apply();
    });
})();
