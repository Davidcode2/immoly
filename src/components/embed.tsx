"use client";

import ResultDisplay from "@/resultDisplay";
import {
  useIsEmbedRoute,
  useParentScrollHeight,
  useParentScrollYStore,
  useParentViewportHeightStore,
} from "@/store";
import { debounce } from "@/utils/debounce";
import { useEffect, useRef } from "react";

export default function Embed() {
  const setParentViewportHeight = useParentViewportHeightStore().updateValue;
  const setParentScrollY = useParentScrollYStore().updateValue;
  const setParentScrollHeight = useParentScrollHeight().updateValue;
  const setIsEmbedRoute = useIsEmbedRoute().updateValue;

  const parentOriginRef = useRef(null);
  const resizeObserverRef = useRef<null | ResizeObserver>(null);

  useEffect(() => {
    setIsEmbedRoute(true);

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const handleMessage = (event: any) => {
      if (event.data?.type !== "PARENT_VIEWPORT") {
        return;
      }

      const newOrigin = event.origin;

      if (!parentOriginRef.current) {
        parentOriginRef.current = newOrigin;

        const debouncedPostHeight = debounce(() => {
          if (parentOriginRef.current) {
            window.parent.postMessage(
              {
                type: "IMMOLY_IFRAME_HEIGHT",
                height: document.body.scrollHeight,
              },
              parentOriginRef.current,
            );
          }
        }, 150);

        const observer = new ResizeObserver(debouncedPostHeight);
        observer.observe(document.body);
        resizeObserverRef.current = observer;

        debouncedPostHeight();
      } else if (newOrigin !== parentOriginRef.current) {
        console.warn(
          `Embed rejected message from untrusted origin: ${newOrigin}`,
        );
        return;
      }

      setParentViewportHeight(event.data.viewportHeight);
      setParentScrollY(event.data.scrollY);
      setParentScrollHeight(event.data.scrollHeight);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [
    setIsEmbedRoute,
    setParentScrollHeight,
    setParentScrollY,
    setParentViewportHeight,
  ]);

  return (
    <div className="p-3 md:pt-8">
      <ResultDisplay showButton={false} />
    </div>
  );
}
