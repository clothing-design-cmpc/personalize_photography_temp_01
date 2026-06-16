"use client";

// LensVerse — useIntersectionObserver
// Returns a ref and isVisible boolean — used to trigger animations on scroll

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  // Fraction of element that must be visible to trigger (0–1)
  threshold?: number;
  // CSS margin around root — controls trigger offset
  rootMargin?: string;
  // Only trigger once (default true)
  triggerOnce?: boolean;
}

// ─── useIntersectionObserver ──────────────────────────────────────────────────
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold   = 0.15,
  rootMargin  = "0px",
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) {
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first trigger if triggerOnce is true
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isVisible };
}
