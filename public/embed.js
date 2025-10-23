function setIframeWidth(iframe) {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  iframe.style.width = `calc(100vw - ${scrollbarWidth}px)`;
}

(() => {
  const script = document.currentScript;
  const id = script.dataset.id;
  const origin = new URL(script.src).origin;

  const iframe = document.createElement("iframe");
  iframe.src = `${origin}/embed/${id}`;
  iframe.style.width = "100%";
  iframe.style.border = "none";
  iframe.style.overflow = "hidden";
  iframe.setAttribute("scrolling", "no");

  if (script.dataset.width === "screen") {
    setIframeWidth(iframe);
    window.addEventListener('resize', () => setIframeWidth(iframe));
  }

  script.parentNode.insertBefore(iframe, script.nextSibling);

  window.addEventListener("message", (event) => {
    if (event.origin !== origin) return;
    if (event.data?.type === "IMMOLY_IFRAME_HEIGHT") {
      iframe.style.height = event.data.height + "px";
    }
  });
})();

