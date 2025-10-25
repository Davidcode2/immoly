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

// --- Iframe & Communication Helper Functions ---

function setIframeWidth(iframe) {
  requestAnimationFrame(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    iframe.style.width = `calc(100vw - ${scrollbarWidth}px)`;
  });
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

function listenForViewportRequest(cleanup) {
  cleanup.add(window, "message", (e) => {
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

function appendNoScrollStyleElement() {
  const styleElement = document.createElement("style");
  const noScrollClass = createNoScrollCssRule();
  styleElement.textContent = noScrollClass;
  document.head.appendChild(styleElement);
}

function createNoScrollCssRule() {
  const cssRule = `
  .immoly-no-scroll {
    overflow: hidden !important;
  }
`;
  return cssRule;
}


function lockBodyScrollListener(cleanup) {
  cleanup.add(window, "message", (e) => {
    if (e.data.type === "LOCK_BODY_SCROLL") {
      console.log("received lock message");
      document.body.classList.add('immoly-no-scroll');
    }
  });
}

function unlockBodyScrollListener(cleanup) {
  cleanup.add(window, "message", (e) => {
    if (e.data.type === "UNLOCK_BODY_SCROLL") {
      console.log("received unlock message");
      document.body.classList.remove('immoly-no-scroll');
    }
  });
}

function setIframeWidthBasedOnDataset(script, iframe, cleanup) {
  if (script.dataset.width === "screen") {
    const debouncedSetWidth = debounce(() => setIframeWidth(iframe), 150);
    setIframeWidth(iframe);
    cleanup.add(window, "resize", debouncedSetWidth);
  }
}

function createIframe(origin, id) {
  const iframe = document.createElement("iframe");
  iframe.src = `${origin}/embed/${id}`;
  iframe.style.width = "100%";
  iframe.style.border = "none";
  iframe.style.overflow = "hidden";
  iframe.setAttribute("scrolling", "no");
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
  return iframe;
}

function insertIframeAfterScript(script, iframe) {
  script.parentNode.insertBefore(iframe, script.nextSibling);
}

function setupIframeHeightListener(iframe, origin, cleanup) {
  cleanup.add(window, "message", (event) => {
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
}

function setupViewportSync(iframe, origin, cleanup) {
  let scheduled = false;

  function postHeightIfNeeded() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      postViewportHeight(iframe, origin);
      scheduled = false;
    });
  }

  iframe.addEventListener("load", () => {
    postViewportHeight(iframe, origin);
    cleanup.add(window, "scroll", postHeightIfNeeded, { passive: true });
    cleanup.add(window, "load", () => postViewportHeight(iframe, origin));
  });
}

/*
 * cleanup
 *
 */
function createCleanupManager() {
  const handlers = [];

  return {
    add(target, type, handler, options) {
      target.addEventListener(type, handler, options);
      handlers.push(() => target.removeEventListener(type, handler, options));
    },
    run() {
      handlers.forEach((off) => off());
      handlers.length = 0; // clear references
    },
  };
}

function observeIframeRemoval(iframe, cleanup) {
  const observer = new MutationObserver(() => {
    if (!document.body.contains(iframe)) {
      cleanup.run();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function setupUnloadCleanup(cleanup) {
  window.addEventListener("beforeunload", () => cleanup.run());
}

// --- Initialization (entry point) ---

(function initWidget() {
  const cleanupManager = createCleanupManager();
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

  const iframe = createIframe(origin, id);
  insertIframeAfterScript(script, iframe);

  appendNoScrollStyleElement();

  setIframeWidthBasedOnDataset(script, iframe, cleanupManager);
  setupViewportSync(iframe, origin, cleanupManager);
  setupIframeHeightListener(iframe, origin, cleanupManager);
  listenForViewportRequest(cleanupManager);

  unlockBodyScrollListener(cleanupManager);
  lockBodyScrollListener(cleanupManager);

  observeIframeRemoval(iframe, cleanupManager);
  setupUnloadCleanup(cleanupManager);
})();
