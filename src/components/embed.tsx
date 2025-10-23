"use client";

import ResultDisplay from "@/resultDisplay";
import { debounce } from "@/utils/debounce";
import { useEffect } from "react";

export default function Embed() {
  useEffect(() => {
    debounce(createResizeObserver, 300)();
  }, []);

  const createResizeObserver = () => {
    new ResizeObserver(() => {
      window.parent.postMessage(
        { type: "IMMOLY_IFRAME_HEIGHT", height: document.body.scrollHeight },
        "*",
      );
    }).observe(document.body);
  };

  return (
    <div className="p-3 md:pt-8">
      <ResultDisplay showButton={false} />
    </div>
  );
}
