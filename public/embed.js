// --- Performance Helper Functions ---

/**
 * Throttles a function to run at most once every `limit` milliseconds.
 */
function throttle(func, limit) {
  let inThrottle;
  let lastResult;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
      lastResult = func.apply(context, args);
    }
    return lastResult;
  };
}

/**
 * Debounces a function to run only once after `delay` milliseconds
 * have passed since the last invocation.
 */
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

function setIframeWidth(iframe) {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  iframe.style.width = `calc(100vw - ${scrollbarWidth}px)`;
}

function postViewportHeight(iframe, targetOrigin) {
  if (!iframe.contentWindow) {
    console.warn("Iframe contentWindow not available. Skipping postMessage.");
    return;
  }

  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY || window.pageYOffset;
  const scrollHeight = document.body.scrollHeight;

  iframe.contentWindow.postMessage(
    {
      type: "PARENT_VIEWPORT",
      viewportHeight,
      scrollHeight,
      scrollY,
    },
    targetOrigin,
  );
}

function listenForViewportRequest() {
  window.addEventListener("message", (e) => {
    if (e.data.type === "REQUEST_PARENT_VIEWPORT") {
      e.source.postMessage(
        {
          type: "PARENT_VIEWPORT",
          scrollY: window.scrollY || window.pageYOffset,
          scrollHeight: document.body.scrollHeight,
          viewportHeight: window.innerHeight,
        },
        e.origin,
      );
    }
  });
}

(() => {
  const script = document.currentScript;
  if (!script) {
    console.error("Could not find currentScript. Embed will not load.");
    return;
  }

  const id = script.dataset.id;
  const origin = new URL(script.src).origin;

  if (!id || !origin) {
    console.error("Missing data-id or script origin. Embed will not load.");
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = `${origin}/embed/${id}`;
  iframe.style.width = "100%";
  iframe.style.border = "none";
  iframe.style.overflow = "hidden";
  iframe.setAttribute("scrolling", "no");

  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");

  script.parentNode.insertBefore(iframe, script.nextSibling);

  // --- Width Handling ---
  if (script.dataset.width === "screen") {
    const debouncedSetWidth = debounce(() => setIframeWidth(iframe), 150);

    setIframeWidth(iframe);
    window.addEventListener("resize", debouncedSetWidth);
  }

  const throttledPostHeight = throttle(
    () => postViewportHeight(iframe, origin),
    5,
  );

  iframe.addEventListener("load", () => {
    postViewportHeight(iframe, origin);
    window.addEventListener("scroll", throttledPostHeight);
    window.addEventListener("load", () => postViewportHeight(iframe, origin));
  });

  window.addEventListener("message", (event) => {
    if (event.origin !== origin) return;

    if (event.data?.type === "IMMOLY_IFRAME_HEIGHT") {
      const height = parseInt(event.data.height, 10);

      if (!isNaN(height) && height >= 0) {
        iframe.style.height = height + "px";
      } else {
        console.warn("Received invalid height from iframe");
      }
    }
  });

  listenForViewportRequest();
})();
