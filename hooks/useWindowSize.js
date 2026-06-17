'use client';

// ============================================================
// useWindowSize — Tracks viewport dimensions on resize
// Debounces resize event to avoid excessive re-renders
// Returns { width, height } of the current window
// ============================================================

import { useEffect, useState, useCallback } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    let debounceTimer;

    const debouncedResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    handleResize(); // Set initial size

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(debounceTimer);
    };
  }, [handleResize]);

  return windowSize;
}
