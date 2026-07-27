(function () {
  var gallery = document.querySelector("[data-product-gallery]");
  var mainImage = document.querySelector("[data-gallery-main]");
  var dialog = document.querySelector("[data-gallery-dialog]");
  var dialogImage = document.querySelector("[data-gallery-dialog-image]");

  if (gallery && mainImage) {
    gallery.querySelectorAll("[data-gallery-thumb]").forEach(function (button) {
      button.addEventListener("click", function () {
        var nextImage = button.getAttribute("data-image");
        var nextSrcset = button.getAttribute("data-srcset");
        var nextSizes = button.getAttribute("data-sizes");
        var fullImage = button.getAttribute("data-full-image") || nextImage;
        var nextAlt = button.getAttribute("data-alt") || "";
        if (!nextImage) return;
        mainImage.src = nextImage;
        if (nextSrcset) mainImage.setAttribute("srcset", nextSrcset);
        else mainImage.removeAttribute("srcset");
        if (nextSizes) mainImage.setAttribute("sizes", nextSizes);
        else mainImage.removeAttribute("sizes");
        mainImage.setAttribute("data-full-image", fullImage);
        mainImage.alt = nextAlt;
        gallery.querySelectorAll("[data-gallery-thumb]").forEach(function (thumb) {
          var active = thumb === button;
          thumb.classList.toggle("is-active", active);
          thumb.setAttribute("aria-selected", active ? "true" : "false");
        });
      });
    });

    var mainImageButton = gallery.querySelector("[data-gallery-open]");
    if (mainImageButton) {
      mainImageButton.addEventListener("pointermove", function (event) {
        var bounds = mainImageButton.getBoundingClientRect();
        var x = ((event.clientX - bounds.left) / bounds.width) * 100;
        var y = ((event.clientY - bounds.top) / bounds.height) * 100;
        mainImage.style.transformOrigin = x.toFixed(2) + "% " + y.toFixed(2) + "%";
      });
      mainImageButton.addEventListener("pointerleave", function () {
        mainImage.style.transformOrigin = "50% 50%";
      });
    }
  }

  function openGallery() {
    if (!dialog || !dialogImage || !mainImage) return;
    dialogImage.src = mainImage.getAttribute("data-full-image") ||
      mainImage.currentSrc || mainImage.src;
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

  var sampleDialog = document.querySelector("[data-sample-dialog]");
  var sampleForm = document.querySelector("[data-sample-form]");
  var sampleEmail = document.querySelector("[data-sample-email]");
  var sampleError = document.querySelector("[data-sample-error]");

  function openSampleDialog() {
    if (!sampleDialog) return;
    if (typeof sampleDialog.showModal === "function") {
      sampleDialog.showModal();
      if (sampleEmail) sampleEmail.focus();
    }
  }

  function closeSampleDialog() {
    if (sampleDialog && sampleDialog.open) sampleDialog.close();
  }

  document.querySelectorAll("[data-sample-open]").forEach(function (button) {
    button.addEventListener("click", openSampleDialog);
  });
  document.querySelectorAll("[data-sample-close]").forEach(function (button) {
    button.addEventListener("click", closeSampleDialog);
  });

  if (sampleDialog) {
    sampleDialog.addEventListener("click", function (event) {
      if (event.target === sampleDialog) closeSampleDialog();
    });
  }

  if (sampleForm) {
    sampleForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = sampleEmail ? sampleEmail.value.trim() : "";
      if (!email || !sampleEmail.checkValidity()) {
        if (sampleError) sampleError.textContent = "Please enter a valid business email.";
        if (sampleEmail) sampleEmail.focus();
        return;
      }

      if (sampleError) sampleError.textContent = "";
      var styleElement = document.querySelector("[data-template-field='style-number']");
      var productElement = document.querySelector("[data-template-field='product-name']");
      var styleNumber = styleElement ? styleElement.textContent.trim() : "HLC product";
      var productName = productElement ? productElement.textContent.trim() : "Fabric sample";
      var subject = "Sample Request - " + styleNumber;
      var body = [
        "Hello HLC,",
        "",
        "I would like to request a fabric sample.",
        "",
        "Product: " + productName,
        "Style#: " + styleNumber,
        "Requester email: " + email,
        "Product page: " + window.location.href,
        "",
        "Please contact me regarding sample delivery and freight collect details.",
        "",
        "Thank you."
      ].join("\n");

      window.location.href = "mailto:sam@hlctex.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      closeSampleDialog();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeGallery();
      closeSampleDialog();
    }
  });
})();
