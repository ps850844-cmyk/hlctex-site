(function () {
  "use strict";

  var grid = document.querySelector("[data-product-grid]");
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-product-card]"));
  var filters = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var count = document.querySelector("[data-result-count]");
  var empty = document.querySelector("[data-empty-message]");
  var panel = document.querySelector("[data-filter-panel]");
  var toggle = document.querySelector("[data-filter-toggle]");

  function activeValues(group) {
    return filters
      .filter(function (input) {
        return input.getAttribute("data-filter") === group && input.checked;
      })
      .map(function (input) {
        return input.value;
      });
  }

  function matches(card, group, selected) {
    if (!selected.length) return true;
    var values = (card.getAttribute("data-" + group) || "").split(/\s+/);
    return selected.some(function (value) {
      return values.indexOf(value) !== -1;
    });
  }

  function applyFilters() {
    var groups = ["composition", "weight", "construction", "application"];
    var selections = {};
    groups.forEach(function (group) {
      selections[group] = activeValues(group);
    });

    var visible = 0;
    cards.forEach(function (card) {
      var show = groups.every(function (group) {
        return matches(card, group, selections[group]);
      });
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (count) count.textContent = String(visible);
    if (empty) empty.hidden = visible !== 0;
  }

  filters.forEach(function (input) {
    input.addEventListener("change", applyFilters);
  });

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.lastChild.textContent = open ? " Hide filters" : " Show filters";
    });
  }

  applyFilters();
})();
