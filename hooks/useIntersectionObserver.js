'use client';

// ============================================================
// useIntersectionObserver — Detects when an element enters/exits viewport
// isVisible = true when in view, false when scrolled past (fade out on up)
// Use once=true for one-time animations (no fade out)
// Use once=false (default) for bidirectional scroll animations
// ============================================================

import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}, once = false) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          hasTriggered.current = true;
          // If one-time mode, stop observing after first trigger
          if (once) observer.unobserve(entry.target);
        } else {
          // Only fade out if the element has been visible at least once
          // and we're not in one-time mode
          if (!once && hasTriggered.current) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
        ...options,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [once]);

  return { elementRef, isVisible };
}
