"use client";

// LensVerse — useScrollReveal
// Lighter-weight version of useIntersectionObserver tuned for repeated
// up/down text reveal animations on homepage story sections (not one-shot)

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface UseScrollRevealOptions {
  threshold?: number;
}

// ─── useScrollReveal ──────────────────────────────────────────────────────
// Returns ref + isVisible — re-triggers every time element enters viewport
export function useScrollReveal({ threshold = 0.25 }: UseScrollRevealOptions = {}) {
  return useIntersectionObserver({ threshold, triggerOnce: false });
}
