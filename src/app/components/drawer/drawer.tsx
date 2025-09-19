"use client";

import { useEffect, useRef, useState } from "react";
import { Handle } from "./handle";

type DraggableContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function DraggableContainer({
  children,
  className = "",
}: DraggableContainerProps) {
  const [height, setHeight] = useState<number>(60); // height in vh
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);
  const draggingDirection = useRef<"up" | "down" | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    startYRef.current = e.touches[0].clientY;
    startHeightRef.current = height;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();

    const deltaY = e.touches[0].clientY - startYRef.current;
    if (deltaY < 0) {
      draggingDirection.current = "up";
    } else if (deltaY > 0) {
      draggingDirection.current = "down";
    } else {
      draggingDirection.current = null;
    }
    const deltaVh = (deltaY / window.innerHeight) * 100;
    const newHeight = Math.min(
      100,
      Math.max(5, startHeightRef.current - deltaVh),
    );

    setHeight(newHeight);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [height]);

  return (
    <div
      ref={containerRef}
      className={`right-0 bottom-0 left-0 w-full rounded-2xl shadow-lg transition-transform ${className}`}
      style={{ height: `${height}vh` }}
    >
      <Handle />
      <div className="h-[calc(100%-2rem)] overflow-y-auto">{children}</div>
    </div>
  );
}
