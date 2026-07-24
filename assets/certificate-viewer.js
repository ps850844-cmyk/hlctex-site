(function () {
  "use strict";

  const viewer = document.querySelector("[data-certificate-viewer]");
  if (!viewer) return;

  const slides = Array.from(viewer.querySelectorAll("[data-certificate-slide]"));
  const prevButton = viewer.querySelector("[data-certificate-prev]");
  const nextButton = viewer.querySelector("[data-certificate-next]");
  const counter = viewer.querySelector("[data-certificate-counter]");
  const title = viewer.querySelector("[data-certificate-title]");
  const original = viewer.querySelector("[data-certificate-original]");
  const pageButtons = Array.from(viewer.querySelectorAll("[data-certificate-page]"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  function loadNearby(index) {
    [index - 1, index, index + 1].forEach(function (itemIndex) {
      const slide = slides[itemIndex];
      if (!slide) return;
      const image = slide.querySelector("img[data-src]");
      if (!image) return;
      image.src = image.dataset.src;
      image.removeAttribute("data-src");
    });
  }

  function show(index, focusButton) {
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    activeIndex = nextIndex;

    slides.forEach(function (slide, slideIndex) {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.classList.toggle("is-before", slideIndex < activeIndex);
      slide.classList.toggle("is-after", slideIndex > activeIndex);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    pageButtons.forEach(function (button, buttonIndex) {
      const isActive = buttonIndex === activeIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", isActive ? "page" : "false");
      if (isActive && focusButton) button.focus({ preventScroll: true });
    });

    const currentSlide = slides[activeIndex];
    counter.textContent = String(activeIndex + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
    title.textContent = currentSlide.dataset.title;
    original.href = currentSlide.dataset.pdf;
    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;
    viewer.style.setProperty("--certificate-progress", ((activeIndex + 1) / slides.length * 100) + "%");
    loadNearby(activeIndex);
  }

  prevButton.addEventListener("click", function () {
    show(activeIndex - 1, false);
  });

  nextButton.addEventListener("click", function () {
    show(activeIndex + 1, false);
  });

  pageButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      show(index, true);
    });
  });

  viewer.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(activeIndex - 1, false);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(activeIndex + 1, false);
    } else if (event.key === "Home") {
      event.preventDefault();
      show(0, false);
    } else if (event.key === "End") {
      event.preventDefault();
      show(slides.length - 1, false);
    }
  });

  viewer.addEventListener("touchstart", function (event) {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  viewer.addEventListener("touchend", function (event) {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    show(activeIndex + (deltaX < 0 ? 1 : -1), false);
  }, { passive: true });

  if (reducedMotion) viewer.classList.add("is-reduced-motion");
  show(0, false);
})();
