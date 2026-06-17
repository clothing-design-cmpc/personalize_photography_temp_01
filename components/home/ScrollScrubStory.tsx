"use client";

// LensVerse — ScrollScrubStory
// Apple iPhone-assembly-style scroll storytelling: ONE video is pinned for the
// entire scroll length of all 7 chapters. Scrolling scrubs the video frame by
// frame (tied to scroll position, not autoplay). Each chapter's text content
// cross-fades in in sync with scroll progress, sitting on top of the video.

import type { ReactNode } from "react";
import { useScrollScrubVideo } from "@/hooks/useScrollScrubVideo";

export interface ScrubChapter {
  eyebrow: string;
  heading: string;
  body:    string;
  // Optional extra content (e.g. gear chip list for Gadgets chapter)
  extra?: ReactNode;
}

interface ScrollScrubStoryProps {
  videoSrcWebm: string;
  chapters: ScrubChapter[];
}

// ─── ScrollScrubStory ──────────────────────────────────────────────────────
export default function ScrollScrubStory({ videoSrcWebm, chapters }: ScrollScrubStoryProps) {
  const { sectionRef, videoRef, activeChapterIndex, isVideoReady } =
    useScrollScrubVideo({ chapterCount: chapters.length });

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        // Each chapter gets a full viewport height of scroll distance to scrub through
        height: `${chapters.length * 100}vh`,
      }}
    >
      {/* Pinned video + text overlay layer */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg)",
        }}
      >
        {/* Scroll-scrubbed video — muted, no autoplay/loop since scroll drives playback */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isVideoReady ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <source src={videoSrcWebm} type="video/webm" />
        </video>

        {/* Loading state before video metadata is ready */}
        {!isVideoReady && (
          <div className="webglFallbackHero" style={{ position: "absolute", inset: 0 }} />
        )}

        {/* Dark scrim for text legibility */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(9,9,11,0.65) 0%, rgba(9,9,11,0.45) 35%, rgba(9,9,11,0.85) 100%)",
          }}
        />

        {/* Chapter text — cross-fades based on activeChapterIndex */}
        <div
          className="containerNarrow"
          style={{ position: "relative", zIndex: 2, textAlign: "center" }}
        >
          {chapters.map((chapter, index) => (
            <div
              key={chapter.heading}
              style={{
                position: index === activeChapterIndex ? "relative" : "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: index === activeChapterIndex ? 1 : 0,
                transform:
                  index === activeChapterIndex
                    ? "translateY(0)"
                    : "translateY(24px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                pointerEvents: index === activeChapterIndex ? "auto" : "none",
              }}
            >
              <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>
                {chapter.eyebrow}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text)",
                  marginBottom: "var(--space-lg)",
                }}
              >
                {chapter.heading}
              </h2>
              <p
                style={{
                  maxWidth: "52ch",
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: "var(--color-text-muted)",
                }}
              >
                {chapter.body}
              </p>
              {chapter.extra}
            </div>
          ))}
        </div>

        {/* Chapter progress dots */}
        <div
          style={{
            position: "absolute",
            bottom: "var(--space-2xl)",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "var(--space-sm)",
            zIndex: 2,
          }}
          aria-hidden="true"
        >
          {chapters.map((chapter, index) => (
            <span
              key={chapter.heading}
              style={{
                width: index === activeChapterIndex ? 24 : 8,
                height: 8,
                borderRadius: 9999,
                background:
                  index === activeChapterIndex
                    ? "var(--color-accent)"
                    : "rgba(255,255,255,0.25)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
