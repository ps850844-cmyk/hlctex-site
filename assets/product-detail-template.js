(function () {
  var gallery = document.querySelector("[data-product-gallery]");
  var mainImage = document.querySelector("[data-gallery-main]");
  var dialog = document.querySelector("[data-gallery-dialog]");
  var dialogImage = document.querySelector("[data-gallery-dialog-image]");

  if (gallery && mainImage) {
    gallery.querySelectorAll("[data-gallery-thumb]").forEach(function (button) {
      button.addEventListener("click", function () {
        var nextImage = button.getAttribute("data-image");
        var nextAlt = button.getAttribute("data-alt") || "";
        if (!nextImage) return;
        mainImage.src = nextImage;
        mainImage.alt = nextAlt;
        gallery.querySelectorAll("[data-gallery-thumb]").forEach(function (thumb) {
          var active = thumb === button;
          thumb.classList.toggle("is-active", active);
          thumb.setAttribute("aria-selected", active ? "true" : "false");
        });
      });
    });
  }

  function openGallery() {
    if (!dialog || !dialogImage || !mainImage) return;
    dialogImage.src = mainImage.currentSrc || mainImage.src;
    dialogImage.alt = mainImage.alt;
    if (typeof dialog.showModal === "function") dialog.showModal();
  }

  function closeGallery() {
    if (dialog && dialog.open) dialog.close();
  }

  document.querySelectorAll("[data-gallery-open]").forEach(function (button) {
    button.addEventListener("click", openGallery);
  });
  document.querySelectorAll("[data-gallery-close]").forEach(function (button) {
    button.addEventListener("click", closeGallery);
  });
  if (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeGallery();
    });
  }

  var quantity = document.querySelector("[data-quantity]");
  function updateQuantity(delta) {
    if (!quantity) return;
    var current = Math.max(1, Number(quantity.value) || 1);
    quantity.value = String(Math.max(1, current + delta));
  }
  document.querySelectorAll("[data-quantity-minus]").forEach(function (button) {
    button.addEventListener("click", function () { updateQuantity(-1); });
  });
  document.querySelectorAll("[data-quantity-plus]").forEach(function (button) {
    button.addEventListener("click", function () { updateQuantity(1); });
  });

  document.querySelectorAll("[data-product-tabs]").forEach(function (tabs) {
    tabs.querySelectorAll("[data-product-tab]").forEach(function (button) {
      button.addEventListener("click", function () {
        var target = button.getAttribute("data-product-tab");
        tabs.querySelectorAll("[data-product-tab]").forEach(function (tab) {
          var active = tab === button;
          tab.classList.toggle("is-active", active);
          tab.setAttribute("aria-selected", active ? "true" : "false");
        });
        tabs.querySelectorAll("[data-product-panel]").forEach(function (panel) {
          var active = panel.getAttribute("data-product-panel") === target;
          panel.classList.toggle("is-active", active);
          panel.hidden = !active;
        });
      });
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeGallery();
  });
})();
