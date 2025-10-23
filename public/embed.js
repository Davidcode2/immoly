function setIframeWidth(iframe) {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  iframe.style.width = `calc(100vw - ${scrollbarWidth}px)`;
}

function postViewportHeight(iframe) {
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY || window.pageYOffset;
  const scrollHeight = document.body.scrollHeight;

  iframe.contentWindow.postMessage({
    type: "PARENT_VIEWPORT",
    viewportHeight,
    scrollHeight,
    scrollY
  }, "*")
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

  let timeout;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    window.addEventListener("scroll", () => postViewportHeight(iframe));
    window.addEventListener("load", () => postViewportHeight(iframe));
  }, 500);
})();

