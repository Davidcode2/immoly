"use client";

import { useEffect, useRef, useState } from "react";
import { Handle } from "./handle";

type DraggableContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function DraggableContainer({ children, className = "" }: DraggableContainerProps) {
  const [height, setHeight] = useState<number>(60); // height in vh
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    isDraggingRef.current = true;
    startYRef.current = e.touches[0].clientY;
    startHeightRef.current = height;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDraggingRef.current) return;

    const deltaY = e.touches[0].clientY - startYRef.current;
    const deltaVh = (deltaY / window.innerHeight) * 100;
    const newHeight = Math.min(100, Math.max(5, startHeightRef.current - deltaVh));
    
    setHeight(newHeight);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleQuickGesture = (e: TouchEvent) => {
    const touchY = e.touches[0].clientY;
    const screenHeight = window.innerHeight;
    const threshold = screenHeight * 0.3; // 30% of screen height for gesture detection

    if (touchY < threshold) {
      setHeight(5); // Collapse
    } else if (touchY > screenHeight - threshold) {
      setHeight(60); // Expand to default
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchstart", handleQuickGesture);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchstart", handleQuickGesture);
    };
  }, [height]);

  return (
    <div
      ref={containerRef}
      className={`left-0 right-0 w-full shadow-lg rounded-2xl transition-transform ${className}`}
      style={{ height: `${height}vh` }}
    >
      <Handle />
      <div className="overflow-y-auto h-[calc(100%-2rem)]">
        {children}
      </div>
    </div>
  );
}
