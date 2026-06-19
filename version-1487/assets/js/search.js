document.addEventListener("DOMContentLoaded", function () {
  var input = document.getElementById("movieSearchInput");
  var button = document.getElementById("movieSearchButton");
  var results = document.getElementById("movieSearchResults");
  var status = document.getElementById("movieSearchStatus");
  var data = window.SEARCH_MOVIES || [];

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function render(list, keyword) {
    var limited = list.slice(0, 120);
    results.innerHTML = limited.map(function (movie) {
      var tags = [movie.region, movie.type, movie.year].concat(movie.tags || []).filter(Boolean).slice(0, 6);
      return '<article class="movie-card">' +
        '<a class="poster-link" href="' + escapeHtml(movie.url) + '">' +
        '<img src="' + escapeHtml(movie.image) + '" alt="' + escapeHtml(movie.title) + '" loading="lazy">' +
        '<span class="rating">' + escapeHtml(movie.rating) + '</span>' +
        '</a>' +
        '<div class="card-body">' +
        '<h2><a href="' + escapeHtml(movie.url) + '">' + escapeHtml(movie.title) + '</a></h2>' +
        '<p class="meta-line">' + escapeHtml(movie.year) + ' · ' + escapeHtml(movie.region) + ' · ' + escapeHtml(movie.type) + '</p>' +
        '<p>' + escapeHtml(movie.oneLine) + '</p>' +
        '<div class="tag-row">' + tags.map(function (tag) { return '<span>' + escapeHtml(tag) + '</span>'; }).join('') + '</div>' +
        '</div>' +
        '</article>';
    }).join('');
    status.textContent = keyword ? '找到 ' + list.length + ' 部相关影片' : '热门影片';
  }

  function runSearch() {
    var keyword = (input.value || '').trim().toLowerCase();

    if (!keyword) {
      render(data.slice(0, 60), '');
      return;
    }

    var words = keyword.split(/\s+/).filter(Boolean);
    var list = data.filter(function (movie) {
      var haystack = [movie.title, movie.year, movie.region, movie.type, movie.genre, movie.oneLine].concat(movie.tags || []).join(' ').toLowerCase();
      return words.every(function (word) {
        return haystack.indexOf(word) !== -1;
      });
    });

    render(list, keyword);
  }

  if (button) {
    button.addEventListener("click", runSearch);
  }

  if (input) {
    input.addEventListener("input", runSearch);
    var params = new URLSearchParams(window.location.search);
    var q = params.get("q");
    if (q) {
      input.value = q;
      runSearch();
    }
  }
});
