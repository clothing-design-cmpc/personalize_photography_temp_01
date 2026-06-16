"use client";

// LensVerse — AnimatedCounter
// Counts from 0 to a target value over 2s when scrolled into view
// Triggered via IntersectionObserver

import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface AnimatedCounterProps {
  // Final value to count up to
  targetValue: number;
  // Optional suffix displayed after the number (e.g. "+", "k", "%")
  suffix?: string;
  // Animation duration in ms (default 2000)
  duration?: number;
}

// ─── AnimatedCounter ──────────────────────────────────────────────────────────
export default function AnimatedCounter({
  targetValue,
  suffix = "",
  duration = 2000,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime   = performance.now();
    const startValue  = 0;

    // Easing function: ease-out cubic
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    function tick(currentTime: number) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const currentValue = Math.round(startValue + (targetValue - startValue) * easedProgress);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isVisible, targetValue, duration]);

  return (
    <span ref={elementRef}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}
