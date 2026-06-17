"use client";

// LensVerse — useScrollChapters
// Tracks scroll progress through a tall pinned section and returns:
// - progress: 0–1 float across the whole section
// - activeChapterIndex: which chapter should currently be visible

import { useEffect, useRef, useState } from "react";

interface UseScrollChaptersOptions {
  // Total number of text chapters to step through
  chapterCount: number;
}

// ─── useScrollChapters ─────────────────────────────────────────────────────
export function useScrollChapters({ chapterCount }: UseScrollChaptersOptions) {
  // Attach this ref to the tall outer wrapper (e.g. height: chapterCount * 100vh)
  const sectionRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress]               = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;

      // How far we've scrolled into the section, clamped 0–1
      const scrolledIntoSection = -rect.top;
      const rawProgress = sectionHeight > 0
        ? scrolledIntoSection / sectionHeight
        : 0;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      setProgress(clampedProgress);

      // Map progress to a discrete chapter index
      const chapterIndex = Math.min(
        Math.floor(clampedProgress * chapterCount),
        chapterCount - 1
      );
      setActiveChapterIndex(chapterIndex);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chapterCount]);

  return { sectionRef, progress, activeChapterIndex };
}
