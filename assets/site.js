(function () {
    var menuButton = document.querySelector("[data-menu-toggle]");
    var mobilePanel = document.querySelector("[data-mobile-panel]");

    if (menuButton && mobilePanel) {
        menuButton.addEventListener("click", function () {
            mobilePanel.classList.toggle("is-open");
        });
    }

    var slides = Array.prototype.slice.call(document.querySelectorAll("[data-hero-slide]"));
    var dots = Array.prototype.slice.call(document.querySelectorAll("[data-hero-dot]"));
    var heroIndex = 0;

    function showSlide(index) {
        if (!slides.length) {
            return;
        }
        heroIndex = (index + slides.length) % slides.length;
        slides.forEach(function (slide, current) {
            slide.classList.toggle("is-active", current === heroIndex);
        });
        dots.forEach(function (dot, current) {
            dot.classList.toggle("is-active", current === heroIndex);
        });
    }

    dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
            showSlide(Number(dot.getAttribute("data-hero-dot")) || 0);
        });
    });

    if (slides.length > 1) {
        setInterval(function () {
            showSlide(heroIndex + 1);
        }, 5200);
    }

    var searchInput = document.querySelector("[data-card-search]");
    var yearSelect = document.querySelector("[data-filter-year]");
    var typeSelect = document.querySelector("[data-filter-type]");
    var cards = Array.prototype.slice.call(document.querySelectorAll(".movie-card, .rank-row"));

    function normalize(value) {
        return String(value || "").toLowerCase().trim();
    }

    function filterCards() {
        var keyword = normalize(searchInput ? searchInput.value : "");
        var year = normalize(yearSelect ? yearSelect.value : "");
        var type = normalize(typeSelect ? typeSelect.value : "");

        cards.forEach(function (card) {
            var haystack = normalize([
                card.getAttribute("data-title"),
                card.getAttribute("data-type"),
                card.getAttribute("data-region")
            ].join(" "));
            var cardYear = normalize(card.getAttribute("data-year"));
            var cardType = normalize(card.getAttribute("data-type"));
            var matched = true;

            if (keyword && haystack.indexOf(keyword) === -1) {
                matched = false;
            }
            if (year && cardYear !== year) {
                matched = false;
            }
            if (type && cardType !== type) {
                matched = false;
            }

            card.classList.toggle("is-hidden-card", !matched);
        });
    }

    [searchInput, yearSelect, typeSelect].forEach(function (control) {
        if (control) {
            control.addEventListener("input", filterCards);
            control.addEventListener("change", filterCards);
        }
    });
}());
