"use client";

// LensVerse — useScrollScrubVideo
// Unified scroll-scrub hook: maps scroll progress through a tall pinned
// section to video currentTime. Returns progress (0–1), active chapter
// index, and fine-grained chapter progress (0–1 within each chapter).

import { useEffect, useRef, useState } from "react";

interface UseScrollScrubVideoOptions {
  chapterCount: number;
}

export function useScrollScrubVideo({ chapterCount }: UseScrollScrubVideoOptions) {
  const sectionRef              = useRef<HTMLDivElement>(null);
  const videoRef                = useRef<HTMLVideoElement>(null);

  const [progress, setProgress]                         = useState(0);
  const [activeChapterIndex, setActiveChapterIndex]     = useState(0);
  const [chapterProgress, setChapterProgress]           = useState(0);
  const [isVideoReady, setIsVideoReady]                 = useState(false);

  // Mark ready once video metadata (duration) is available
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function onMetadata() { setIsVideoReady(true); }

    if (video.readyState >= 1) {
      setIsVideoReady(true);
    } else {
      video.addEventListener("loadedmetadata", onMetadata);
    }
    return () => video.removeEventListener("loadedmetadata", onMetadata);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      const video   = videoRef.current;
      if (!section || !video || !isVideoReady || !video.duration) return;

      const rect              = section.getBoundingClientRect();
      const scrollableHeight  = section.offsetHeight - window.innerHeight;
      const scrolledIn        = -rect.top;
      const rawProgress       = scrollableHeight > 0 ? scrolledIn / scrollableHeight : 0;
      const clampedProgress   = Math.min(Math.max(rawProgress, 0), 1);

      setProgress(clampedProgress);

      // Scrub video frame-by-frame via scroll
      const targetTime = clampedProgress * video.duration;
      if (Math.abs(video.currentTime - targetTime) > 0.01) {
        video.currentTime = targetTime;
      }

      // Discrete chapter index
      const chapterIndex = Math.min(
        Math.floor(clampedProgress * chapterCount),
        chapterCount - 1
      );
      setActiveChapterIndex(chapterIndex);

      // Progress within the current chapter (0–1)
      const chapterSize      = 1 / chapterCount;
      const chapterStart     = chapterIndex * chapterSize;
      const localProgress    = (clampedProgress - chapterStart) / chapterSize;
      setChapterProgress(Math.min(Math.max(localProgress, 0), 1));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chapterCount, isVideoReady]);

  return { sectionRef, videoRef, progress, activeChapterIndex, chapterProgress, isVideoReady };
}
