(() => {
  const frames = document.querySelectorAll("[data-facilities-frame]");

  frames.forEach((frame) => {
    let observer;

    const resizeFrame = () => {
      const documentElement = frame.contentDocument?.documentElement;
      const body = frame.contentDocument?.body;
      if (!documentElement || !body) return;

      const height = Math.max(
        documentElement.scrollHeight,
        documentElement.offsetHeight,
        body.scrollHeight,
        body.offsetHeight
      );

      if (height > 0) frame.style.height = `${height}px`;
    };

    frame.addEventListener("load", () => {
      resizeFrame();
      observer?.disconnect();
      observer = new ResizeObserver(resizeFrame);
      observer.observe(frame.contentDocument.documentElement);
      observer.observe(frame.contentDocument.body);
    });

    window.addEventListener("resize", resizeFrame, { passive: true });
  });
})();
