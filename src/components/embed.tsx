"use client";

import ResultDisplay from "@/resultDisplay";
import { useIsEmbedRoute } from "@/store";
import { debounce } from "@/utils/debounce";
import { useEffect, useRef } from "react";

export default function Embed() {
  const resizeObserverRef = useRef<null | ResizeObserver>(null);
  const setIsEmbedRoute = useIsEmbedRoute().updateValue;

  useEffect(() => {
    setIsEmbedRoute(true);
  }, []);

  useEffect(() => {
    const handleMessage = () => {
      const debouncedPostHeight = debounce(() => {
        window.parent.postMessage(
          {
            type: "IMMOLY_IFRAME_HEIGHT",
            height: document.body.scrollHeight,
          },
          "*",
        );
      }, 150);

      const observer = new ResizeObserver(debouncedPostHeight);
      observer.observe(document.body);
      resizeObserverRef.current = observer;

      debouncedPostHeight();
    };
    handleMessage();
    return () => {
      window.removeEventListener("message", handleMessage);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="p-3 md:pt-8">
      <ResultDisplay showButton={false} />
    </div>
  );
}
