"use client";

import ResultDisplay from "@/resultDisplay";
import { useIsEmbedRoute, useParentScrollHeight, useParentScrollYStore, useParentViewportHeightStore } from "@/store";
import { debounce } from "@/utils/debounce";
import { useEffect } from "react";

export default function Embed() {
  const setParentViewportHeight = useParentViewportHeightStore().updateValue;
  const setParentScrollY = useParentScrollYStore().updateValue;
  const setParentScrollHeight  = useParentScrollHeight().updateValue;
  const setIsEmbedRoute = useIsEmbedRoute().updateValue;

  useEffect(() => {
    debounce(createResizeObserver, 300)();
    debounce(parentViewportListener, 300)();
    setIsEmbedRoute(true);
  }, []);

  const createResizeObserver = () => {
    new ResizeObserver(() => {
      window.parent.postMessage(
        { type: "IMMOLY_IFRAME_HEIGHT", height: document.body.scrollHeight },
        "*",
      );
    }).observe(document.body);
  };

  const parentViewportListener = () => {
  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "PARENT_VIEWPORT") {
      setParentViewportHeight(event.data.viewportHeight);
      setParentScrollY(event.data.scrollY);
      setParentScrollHeight(event.data.scrollHeight);
    }
  });
  }

  return (
    <div className="p-3 md:pt-8">
      <ResultDisplay showButton={false} />
    </div>
  );
}
