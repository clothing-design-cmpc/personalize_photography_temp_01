'use client';

// ============================================================
// useParallax — Custom hook for parallax scroll effect
// Tracks window scroll and calculates background offset
// Automatically disables on mobile for performance
// ============================================================

import { useEffect, useRef, useState, useCallback } from 'react';
import { isMobileDevice, prefersReducedMotion } from '../lib/parallax-utils';

export function useParallax(intensity = 0.5) {
  const elementRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef(null);

  const handleScroll = useCallback(() => {
    // Cancel any pending animation frame before scheduling a new one
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      if (!elementRef.current) return;
      if (isMobileDevice() || prefersReducedMotion()) {
        setOffset(0);
        return;
      }

      const rect = elementRef.current.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;

      setOffset(distanceFromCenter * intensity * -1);
    });
  }, [intensity]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return { elementRef, offset };
}
