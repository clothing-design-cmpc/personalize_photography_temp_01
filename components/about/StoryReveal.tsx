"use client";

// LensVerse — StoryReveal
// Pins a looping WebM video as a fixed background while the user scrolls through
// a tall section; text "chapters" (mission, vision, technique, etc.) cross-fade
// in and out based on scroll position. Falls back to MP4 if WebM is unsupported.

import { useScrollChapters } from "@/hooks/useScrollChapters";

export interface StoryChapter {
  eyebrow: string;
  heading: string;
  body:    string;
}

interface StoryRevealProps {
  // Path to the WebM video (e.g. "/camera-assembly.webm")
  videoSrcWebm: string;
  // Optional MP4 fallback path for browsers without WebM support
  videoSrcMp4?: string;
  // Ordered list of chapters shown as the user scrolls
  chapters: StoryChapter[];
}

// ─── StoryReveal ──────────────────────────────────────────────────────────────
export default function StoryReveal({
  videoSrcWebm,
  videoSrcMp4,
  chapters,
}: StoryRevealProps) {
  const { sectionRef, activeChapterIndex } = useScrollChapters({
    chapterCount: chapters.length,
  });

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        // Each chapter gets a full viewport height of scroll distance
        height: `${chapters.length * 100}vh`,
      }}
    >
      {/* Pinned video + overlay layer */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background video — blurred cover layer fills edges, sharp contain layer shows full frame */}
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(40px) brightness(0.6)",
            transform: "scale(1.2)",
            opacity: 0.5,
          }}
        >
          <source src={videoSrcWebm} type="video/webm" />
          {videoSrcMp4 && <source src={videoSrcMp4} type="video/mp4" />}
        </video>

        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: 0.55,
          }}
        >
          <source src={videoSrcWebm} type="video/webm" />
          {videoSrcMp4 && <source src={videoSrcMp4} type="video/mp4" />}
        </video>

        {/* Dark scrim for text legibility */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(9,9,11,0.75) 0%, rgba(9,9,11,0.55) 40%, rgba(9,9,11,0.85) 100%)",
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
                    : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                pointerEvents: index === activeChapterIndex ? "auto" : "none",
              }}
            >
              <p
                className="eyebrow"
                style={{ marginBottom: "var(--space-md)" }}
              >
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