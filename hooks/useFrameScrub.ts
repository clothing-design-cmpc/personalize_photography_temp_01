"use client";

// LensVerse — useFrameScrub
// Apple-style frame-sequence scrubber hook.
// Maps scroll progress through a tall sticky section to a frame index.
// Returns refs to attach to the sentinel div and canvas, plus active chapter.

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_BASE_URL = "/frames/hero";
const TOTAL_FRAMES   = 192;
const PRIORITY_BATCH = 12;

interface UseFrameScrubOptions {
  chapterCount: number;
}

function buildFrameUrl(index: number, isMobile: boolean): string {
  const tier   = isMobile ? "mobile" : "desktop";
  const padded = String(index + 1).padStart(4, "0");
  return `${FRAME_BASE_URL}/${tier}/frame-${padded}.webp`;
}

export function useFrameScrub({ chapterCount }: UseFrameScrubOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);

  const framesRef      = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const loadedCountRef = useRef(0);
  const progressRef    = useRef(0);
  const rafRef         = useRef<number | null>(null);
  const isMobileRef    = useRef(false);

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [loadProgress,       setLoadProgress]       = useState(0);
  const [isReady,            setIsReady]            = useState(false);

  // ── Draw frame at index onto canvas ──────────────────────────────────────
  const drawFrame = useCallback((index: number): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const targetIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
    const frames      = framesRef.current;

    // Walk backwards to nearest loaded frame
    let frameToUse: HTMLImageElement | null = null;
    for (let i = targetIndex; i >= 0; i--) {
      if (frames[i]?.complete && frames[i]!.naturalWidth > 0) {
        frameToUse = frames[i];
        break;
      }
    }
    if (!frameToUse) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // object-fit: cover
    const cw      = canvas.width;
    const ch      = canvas.height;
    const fw      = frameToUse.naturalWidth;
    const fh      = frameToUse.naturalHeight;
    const scale   = Math.max(cw / fw, ch / fh);
    const drawW   = fw * scale;
    const drawH   = fh * scale;
    const offsetX = (cw - drawW) / 2;
    const offsetY = (ch - drawH) / 2;
    ctx.drawImage(frameToUse, offsetX, offsetY, drawW, drawH);
  }, []);

  // ── Preload all frames ────────────────────────────────────────────────────
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;

    function loadFrame(index: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.src   = buildFrameUrl(index, isMobileRef.current);
        img.onload = () => {
          framesRef.current[index] = img;
          loadedCountRef.current++;
          const p = loadedCountRef.current / TOTAL_FRAMES;
          setLoadProgress(p);
          if (p >= 1) setIsReady(true);
          const currentTarget = Math.floor(progressRef.current * TOTAL_FRAMES);
          if (Math.abs(index - currentTarget) <= 2) drawFrame(index);
          resolve();
        };
        img.onerror = () => resolve();
      });
    }

    async function preloadAll(): Promise<void> {
      const priority = Array.from({ length: PRIORITY_BATCH }, (_, i) => loadFrame(i));
      await Promise.all(priority);
      drawFrame(0);
      setIsReady(true); // show canvas after first batch
      for (let i = PRIORITY_BATCH; i < TOTAL_FRAMES; i++) {
        loadFrame(i);
        if (i % 10 === 0) await new Promise(r => setTimeout(r, 0));
      }
    }

    preloadAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawFrame]);

  // ── Resize canvas to device pixel ratio ──────────────────────────────────
  useEffect(() => {
    function resizeCanvas(): void {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width        = window.innerWidth  * window.devicePixelRatio;
      canvas.height       = window.innerHeight * window.devicePixelRatio;
      canvas.style.width  = "100%";
      canvas.style.height = "100%";
      drawFrame(Math.floor(progressRef.current * TOTAL_FRAMES));
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [drawFrame]);

  // ── rAF loop — draw current frame every animation frame ──────────────────
  useEffect(() => {
    function loop(): void {
      rafRef.current = requestAnimationFrame(loop);
      drawFrame(Math.floor(progressRef.current * (TOTAL_FRAMES - 1)));
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [drawFrame]);

  // ── Scroll → frame index + chapter ───────────────────────────────────────
  useEffect(() => {
    function onScroll(): void {
      const sentinel = sentinelRef.current;
      if (!sentinel) return;

      const rect       = sentinel.getBoundingClientRect();
      const totalH     = sentinel.offsetHeight - window.innerHeight;
      const scrolledIn = -rect.top;
      const rawP       = totalH > 0 ? scrolledIn / totalH : 0;
      const p          = Math.min(Math.max(rawP, 0), 1);

      progressRef.current = p;

      const chapterIndex = Math.min(
        Math.floor(p * chapterCount),
        chapterCount - 1
      );
      setActiveChapterIndex(chapterIndex);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [chapterCount]);

  return { sentinelRef, canvasRef, activeChapterIndex, loadProgress, isReady };
}
