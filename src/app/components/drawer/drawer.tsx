"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Handle } from "./handle";

type DraggableContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// --- Constants for Physics ---
const FRICTION = 0.95; // How quickly the animation slows down (0-1)
const MIN_VELOCITY = 0.1; // Velocity threshold to stop the animation
const INITIAL_HEIGHT_VH = 60; // Starting height in vh
const MIN_HEIGHT_VH = 10; // Minimum height in vh
const MAX_HEIGHT_VH = 90; // Maximum height in vh

export function DraggableContainer({
  children,
  className = "",
}: DraggableContainerProps) {
  const [height, setHeight] = useState<number>(INITIAL_HEIGHT_VH);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // --- Refs for Drag and Animation State ---
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  
  // --- Refs for Velocity Calculation ---
  const velocityYRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const lastMoveYRef = useRef(0);

  // --- Animation Loop ---
  const animate = useCallback(() => {
    if (Math.abs(velocityYRef.current) < MIN_VELOCITY) {
      // Stop animation if velocity is negligible
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    setHeight((prevHeight) => {
      // Apply velocity
      const newHeight = prevHeight - velocityYRef.current;
      
      // Apply friction to slow down
      velocityYRef.current *= FRICTION;

      // Clamp height within boundaries and stop if hit
      if (newHeight <= MIN_HEIGHT_VH || newHeight >= MAX_HEIGHT_VH) {
        velocityYRef.current = 0; // Stop movement
        return Math.max(MIN_HEIGHT_VH, Math.min(MAX_HEIGHT_VH, newHeight));
      }
      
      return newHeight;
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const startInertiaAnimation = useCallback(() => {
    // Cancel any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    // Start the new animation
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Stop any ongoing inertia animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    isDraggingRef.current = true;
    const touchY = e.touches[0].clientY;
    startYRef.current = touchY;
    startHeightRef.current = containerRef.current?.offsetHeight || 0;
    
    // Reset velocity tracking
    velocityYRef.current = 0;
    lastMoveTimeRef.current = performance.now();
    lastMoveYRef.current = touchY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current) return;
    
    const now = performance.now();
    const touchY = e.touches[0].clientY;
    const deltaTime = now - lastMoveTimeRef.current;
    
    // Calculate position change
    const deltaY = touchY - startYRef.current;
    const newPixelHeight = startHeightRef.current - deltaY;

    // Convert pixel height to vh for state update
    const newVhHeight = (newPixelHeight / window.innerHeight) * 100;
    setHeight(Math.max(MIN_HEIGHT_VH, Math.min(MAX_HEIGHT_VH, newVhHeight)));

    // Calculate velocity (vh per millisecond) for inertia
    if (deltaTime > 0) {
      const moveDeltaY = touchY - lastMoveYRef.current;
      const moveDeltaVh = (moveDeltaY / window.innerHeight) * 100;
      velocityYRef.current = moveDeltaVh / deltaTime;
    }
    
    // Update trackers for next move
    lastMoveTimeRef.current = now;
    lastMoveYRef.current = touchY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    // Start the inertia animation if there's enough velocity
    if (Math.abs(velocityYRef.current) > MIN_VELOCITY) {
      startInertiaAnimation();
    }
  }, [startInertiaAnimation]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use passive: false to allow preventDefault if needed, but not necessary here
    container.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    
    // Cleanup function
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      // Also cancel animation on component unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={containerRef}
      className={`fixed right-0 bottom-0 left-0 w-full rounded-t-2xl bg-white ${className}`}
      style={{ height: `${height}vh`, touchAction: 'none' }} // touchAction: 'none' prevents browser from interfering
    >
      <Handle />
      <div className="h-[calc(100%-2rem)] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
