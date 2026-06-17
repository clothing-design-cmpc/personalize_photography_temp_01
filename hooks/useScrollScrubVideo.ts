"use client";

// LensVerse — useScrollScrubVideo
// Apple-style scroll-scrubbed video: maps scroll progress through a tall
// pinned section directly to the video's currentTime, so the user's scroll
// "plays" the video frame-by-frame instead of it autoplaying on a loop.

import { useEffect, useRef, useState } from "react";

interface UseScrollScrubVideoOptions {
  // Number of discrete chapters to break scroll progress into
  chapterCount: number;
}

// ─── useScrollScrubVideo ───────────────────────────────────────────────────
export function useScrollScrubVideo({ chapterCount }: UseScrollScrubVideoOptions) {
  // Attach to the tall outer wrapper — height = chapterCount * 100vh
  const sectionRef = useRef<HTMLDivElement>(null);
  // Attach to the <video> element that gets scrubbed
  const videoRef = useRef<HTMLVideoElement>(null);

  const [progress, setProgress]               = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isVideoReady, setIsVideoReady]        = useState(false);

  // Mark video as ready once metadata (duration) is loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function handleLoadedMetadata() {
      setIsVideoReady(true);
    }

    if (video.readyState >= 1) {
      // Metadata already loaded (cached)
      setIsVideoReady(true);
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      const video   = videoRef.current;
      if (!section || !video || !isVideoReady || !video.duration) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;

      const scrolledIntoSection = -rect.top;
      const rawProgress = sectionHeight > 0
        ? scrolledIntoSection / sectionHeight
        : 0;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      setProgress(clampedProgress);

      // Scrub the video — map progress directly to currentTime
      const targetTime = clampedProgress * video.duration;
      // Avoid redundant seeks (helps performance on some browsers)
      if (Math.abs(video.currentTime - targetTime) > 0.01) {
        video.currentTime = targetTime;
      }

      // Map progress to a discrete chapter index for text overlay
      const chapterIndex = Math.min(
        Math.floor(clampedProgress * chapterCount),
        chapterCount - 1
      );
      setActiveChapterIndex(chapterIndex);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chapterCount, isVideoReady]);

  return { sectionRef, videoRef, progress, activeChapterIndex, isVideoReady };
}
