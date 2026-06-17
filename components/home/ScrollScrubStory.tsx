"use client";

// LensVerse — ScrollScrubStory
// Frame-sequence scrubber: 192 WebP frames drawn on canvas, scrubbed by scroll.
// One pinned canvas background from Hero through all 8 chapters.
// Each chapter has its own distinct layout variant.

import type { ReactNode } from "react";
import Link from "next/link";
import { useFrameScrub } from "@/hooks/useFrameScrub";

export interface ScrubChapter {
  eyebrow:   string;
  heading:   string;
  body:      string;
  layout:    "hero" | "splitLeft" | "splitRight" | "quote" | "techniques" | "gadgets" | "contact";
  imageSrc?: string;
  extra?:    ReactNode;
}

interface ScrollScrubStoryProps {
  chapters: ScrubChapter[];
}

// ─── Chapter layout renderers ──────────────────────────────────────────────

function LayoutHero({ chapter, isActive }: { chapter: ScrubChapter; isActive: boolean }) {
  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        textAlign:      "center",
        padding:        "0 var(--space-xl)",
        opacity:        isActive ? 1 : 0,
        transform:      isActive ? "translateY(0)" : "translateY(32px)",
        transition:     "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents:  isActive ? "auto" : "none",
        position:       isActive ? "relative" : "absolute",
        inset:          0,
        width:          "100%",
      }}
    >
      <p className="eyebrow" style={{ marginBottom: "var(--space-lg)" }}>
        {chapter.eyebrow}
      </p>
      <h1
        style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(2.5rem, 7vw, 5.5rem)",
          fontWeight:    800,
          letterSpacing: "-0.03em",
          color:         "var(--color-text)",
          marginBottom:  "var(--space-lg)",
          lineHeight:    1.05,
          maxWidth:      "14ch",
        }}
      >
        {chapter.heading.split(" ").map((word, i, arr) =>
          i === arr.length - 1
            ? <span key={i} style={{ color: "var(--color-accent)" }}> {word}</span>
            : <span key={i}>{word} </span>
        )}
      </h1>
      <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.7, color: "var(--color-text-muted)", maxWidth: "44ch", marginBottom: "var(--space-2xl)" }}>
        {chapter.body}
      </p>
      <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/portfolio" className="buttonPrimary">View Portfolio</Link>
        <Link href="/booking"   className="buttonSecondary">Book Session</Link>
      </div>
    </div>
  );
}

function LayoutSplit({ chapter, isActive, imageOnLeft }: { chapter: ScrubChapter; isActive: boolean; imageOnLeft: boolean }) {
  const imagePlaceholder = (
    <div
      style={{
        width:        "100%",
        aspectRatio:  "4/5",
        borderRadius: 16,
        overflow:     "hidden",
        border:       "1px solid var(--color-border-mid)",
        background:   "linear-gradient(135deg, rgba(212,165,116,0.12) 0%, rgba(9,9,11,1) 100%)",
        opacity:      isActive ? 1 : 0,
        transform:    isActive ? "scale(1)" : "scale(0.95)",
        transition:   "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
        position:     "relative",
      }}
    >
      {chapter.imageSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={chapter.imageSrc}
          alt={chapter.heading}
          style={{
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            objectPosition: "top center",
            display:    "block",
          }}
        />
      )}
    </div>
  );

  const textBlock = (
    <div
      style={{
        opacity:   isActive ? 1 : 0,
        transform: isActive ? "translateX(0)" : imageOnLeft ? "translateX(40px)" : "translateX(-40px)",
        transition:"opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>{chapter.eyebrow}</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--color-text)", marginBottom: "var(--space-lg)", lineHeight: 1.15 }}>
        {chapter.heading}
      </h2>
      <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--color-text-muted)", maxWidth: "46ch" }}>
        {chapter.body}
      </p>
      {chapter.extra}
    </div>
  );

  return (
    <div
      style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr",
        gap:                 "var(--space-2xl)",
        alignItems:          "center",
        width:               "100%",
        maxWidth:            "var(--max-width-content)",
        padding:             "0 var(--space-xl)",
        opacity:             isActive ? 1 : 0,
        transition:          "opacity 0.4s ease",
        pointerEvents:       isActive ? "auto" : "none",
        position:            isActive ? "relative" : "absolute",
        inset:               0,
      }}
    >
      {imageOnLeft ? imagePlaceholder : textBlock}
      {imageOnLeft ? textBlock : imagePlaceholder}
    </div>
  );
}

function LayoutQuote({ chapter, isActive }: { chapter: ScrubChapter; isActive: boolean }) {
  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        textAlign:      "center",
        padding:        "0 var(--space-xl)",
        maxWidth:       760,
        opacity:        isActive ? 1 : 0,
        transform:      isActive ? "scale(1)" : "scale(0.96)",
        transition:     "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents:  isActive ? "auto" : "none",
        position:       isActive ? "relative" : "absolute",
        inset:          0,
      }}
    >
      <div style={{ width: 48, height: 3, background: "var(--color-accent)", borderRadius: 9999, marginBottom: "var(--space-xl)" }} />
      <p className="eyebrow" style={{ marginBottom: "var(--space-lg)" }}>{chapter.eyebrow}</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.875rem, 4.5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--color-text)", lineHeight: 1.1, marginBottom: "var(--space-xl)", fontStyle: "italic" }}>
        "{chapter.heading}"
      </h2>
      <p style={{ fontSize: "1.125rem", lineHeight: 1.75, color: "var(--color-text-muted)", maxWidth: "52ch" }}>
        {chapter.body}
      </p>
    </div>
  );
}

function LayoutTechniques({ chapter, isActive }: { chapter: ScrubChapter; isActive: boolean }) {
  const techniques = [
    { icon: "☀",  label: "Natural Light",  desc: "Honest, uncontrolled, beautiful" },
    { icon: "⏱",  label: "Long Sessions",  desc: "Unhurried, never rushed" },
    { icon: "👁",  label: "Candid First",   desc: "Moments over poses" },
    { icon: "🎞",  label: "Film Mindset",   desc: "Each frame has purpose" },
  ];

  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        padding:        "0 var(--space-xl)",
        width:          "100%",
        maxWidth:       900,
        opacity:        isActive ? 1 : 0,
        transform:      isActive ? "translateY(0)" : "translateY(28px)",
        transition:     "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents:  isActive ? "auto" : "none",
        position:       isActive ? "relative" : "absolute",
        inset:          0,
      }}
    >
      <p className="eyebrow" style={{ marginBottom: "var(--space-md)", textAlign: "center" }}>{chapter.eyebrow}</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--color-text)", marginBottom: "var(--space-lg)", textAlign: "center", lineHeight: 1.2 }}>
        {chapter.heading}
      </h2>
      <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--color-text-muted)", maxWidth: "52ch", textAlign: "center", marginBottom: "var(--space-2xl)" }}>
        {chapter.body}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-md)", width: "100%" }}>
        {techniques.map((t, index) => (
          <div
            key={t.label}
            style={{
              background:   "rgba(255,255,255,0.04)",
              border:       "1px solid var(--color-border)",
              borderRadius: 12,
              padding:      "var(--space-lg)",
              textAlign:    "center",
              opacity:      isActive ? 1 : 0,
              transform:    isActive ? "translateY(0)" : "translateY(20px)",
              transition:   `opacity 0.5s ease ${0.1 + index * 0.08}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.08}s`,
            }}
          >
            <div style={{ fontSize: "1.75rem", marginBottom: "var(--space-sm)" }}>{t.icon}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-text)", marginBottom: "var(--space-xs)" }}>{t.label}</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", lineHeight: 1.5 }}>{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LayoutGadgets({ chapter, isActive }: { chapter: ScrubChapter; isActive: boolean }) {
  const gear = [
    { label: "Canon EOS R5",       img: "/images/story/canon-r5-front.png" },
    { label: "RF 24-70mm f/2.8L",  img: "/images/story/canon-r5-top.png"  },
    { label: "Canon EOS Side",     img: "/images/story/canon-r5-side.png"  },
    { label: "iPhone 13 Pro",      img: "/images/story/iphone-back.png"    },
  ];

  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        padding:        "0 var(--space-xl)",
        width:          "100%",
        maxWidth:       900,
        opacity:        isActive ? 1 : 0,
        transform:      isActive ? "translateY(0)" : "translateY(28px)",
        transition:     "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents:  isActive ? "auto" : "none",
        position:       isActive ? "relative" : "absolute",
        inset:          0,
      }}
    >
      <p className="eyebrow" style={{ marginBottom: "var(--space-md)", textAlign: "center" }}>{chapter.eyebrow}</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--color-text)", marginBottom: "var(--space-lg)", textAlign: "center", lineHeight: 1.2 }}>
        {chapter.heading}
      </h2>
      <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--color-text-muted)", maxWidth: "52ch", textAlign: "center", marginBottom: "var(--space-2xl)" }}>
        {chapter.body}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-md)", width: "100%" }}>
        {gear.map((item, index) => (
          <div
            key={item.label}
            style={{
              borderRadius:  12,
              overflow:      "hidden",
              border:        "1px solid var(--color-border)",
              background:    "rgba(255,255,255,0.03)",
              opacity:       isActive ? 1 : 0,
              transform:     isActive ? "translateY(0)" : "translateY(20px)",
              transition:    `opacity 0.5s ease ${0.07 * index}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.07 * index}s`,
            }}
          >
            <div style={{ aspectRatio: "1/1", overflow: "hidden", background: "#111" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.img}
                alt={item.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{ padding: "0.75rem", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-text-muted)", letterSpacing: "0.04em" }}>
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LayoutContact({ chapter, isActive }: { chapter: ScrubChapter; isActive: boolean }) {
  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        textAlign:      "center",
        padding:        "0 var(--space-xl)",
        maxWidth:       680,
        opacity:        isActive ? 1 : 0,
        transform:      isActive ? "translateY(0)" : "translateY(32px)",
        transition:     "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents:  isActive ? "auto" : "none",
        position:       isActive ? "relative" : "absolute",
        inset:          0,
      }}
    >
      <div style={{ width: 64, height: 64, borderRadius: "50%", border: "1px solid var(--color-border-mid)", background: "rgba(212,165,116,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--space-xl)", fontSize: "1.5rem" }}>
        📷
      </div>
      <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>{chapter.eyebrow}</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--color-text)", marginBottom: "var(--space-lg)", lineHeight: 1.1 }}>
        {chapter.heading}
      </h2>
      <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--color-text-muted)", maxWidth: "44ch", marginBottom: "var(--space-2xl)" }}>
        {chapter.body}
      </p>
      <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/contact" className="buttonPrimary">Get in Touch</Link>
        <Link href="/booking" className="buttonSecondary">Book a Session</Link>
      </div>
    </div>
  );
}

function ChapterPanel({ chapter, isActive }: { chapter: ScrubChapter; isActive: boolean }) {
  switch (chapter.layout) {
    case "hero":       return <LayoutHero       chapter={chapter} isActive={isActive} />;
    case "splitLeft":  return <LayoutSplit      chapter={chapter} isActive={isActive} imageOnLeft />;
    case "splitRight": return <LayoutSplit      chapter={chapter} isActive={isActive} imageOnLeft={false} />;
    case "quote":      return <LayoutQuote      chapter={chapter} isActive={isActive} />;
    case "techniques": return <LayoutTechniques chapter={chapter} isActive={isActive} />;
    case "gadgets":    return <LayoutGadgets    chapter={chapter} isActive={isActive} />;
    case "contact":    return <LayoutContact    chapter={chapter} isActive={isActive} />;
    default:           return null;
  }
}

// ─── ScrollScrubStory ──────────────────────────────────────────────────────
export default function ScrollScrubStory({ chapters }: ScrollScrubStoryProps) {
  const { sentinelRef, canvasRef, activeChapterIndex, loadProgress, isReady } =
    useFrameScrub({ chapterCount: chapters.length });

  return (
    // Sentinel: holds chapters.length * 100vh of scroll budget
    <div
      ref={sentinelRef}
      style={{ position: "relative", height: `${chapters.length * 100}vh` }}
    >
      {/* Sticky pinned layer — canvas + text overlays */}
      <div
        style={{
          position:       "sticky",
          top:            0,
          height:         "100dvh",
          overflow:       "hidden",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          background:     "var(--color-bg)",
        }}
      >
        {/* Frame canvas — full bleed */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position:  "absolute",
            inset:     0,
            width:     "100%",
            height:    "100%",
            display:   "block",
            opacity:   isReady ? 1 : 0,
            transition:"opacity 0.4s ease",
            willChange:"contents",
          }}
        />

        {/* Preload progress bar */}
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            bottom:     0,
            left:       0,
            right:      0,
            height:     2,
            zIndex:     10,
            background: "rgba(255,255,255,0.08)",
            opacity:    loadProgress >= 1 ? 0 : 1,
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              height:     "100%",
              width:      `${loadProgress * 100}%`,
              background: "rgba(212,165,116,0.7)",
              transition: "width 0.15s linear",
            }}
          />
        </div>

        {/* Loading placeholder before first batch */}
        {!isReady && (
          <div
            aria-hidden="true"
            style={{
              position:   "absolute",
              inset:      0,
              background: "linear-gradient(135deg, rgba(212,165,116,0.06) 0%, rgba(9,9,11,1) 60%)",
            }}
          />
        )}

        {/* Scrim */}
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            inset:      0,
            background: activeChapterIndex === 0
              ? "linear-gradient(180deg, rgba(9,9,11,0.50) 0%, rgba(9,9,11,0.30) 40%, rgba(9,9,11,0.80) 100%)"
              : "linear-gradient(180deg, rgba(9,9,11,0.70) 0%, rgba(9,9,11,0.60) 50%, rgba(9,9,11,0.90) 100%)",
            transition: "background 0.6s ease",
            zIndex:     1,
          }}
        />

        {/* Chapter panels */}
        <div
          style={{
            position:       "relative",
            zIndex:         2,
            width:          "100%",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
          }}
        >
          {chapters.map((chapter, index) => (
            <ChapterPanel
              key={chapter.heading}
              chapter={chapter}
              isActive={index === activeChapterIndex}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div
          aria-hidden="true"
          style={{
            position:  "absolute",
            bottom:    "var(--space-2xl)",
            left:      "50%",
            transform: "translateX(-50%)",
            display:   "flex",
            gap:       "var(--space-sm)",
            zIndex:    2,
          }}
        >
          {chapters.map((chapter, index) => (
            <span
              key={chapter.heading}
              style={{
                width:        index === activeChapterIndex ? 24 : 8,
                height:       8,
                borderRadius: 9999,
                background:   index === activeChapterIndex ? "var(--color-accent)" : "rgba(255,255,255,0.22)",
                transition:   "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Scroll indicator — first chapter only */}
        {activeChapterIndex === 0 && (
          <div
            aria-hidden="true"
            style={{
              position:      "absolute",
              bottom:        "var(--space-2xl)",
              right:         "var(--space-2xl)",
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              gap:           "var(--space-sm)",
              zIndex:        2,
              animation:     "fadeIn 1s ease 1.2s both",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
              Scroll
            </span>
            <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(212,165,116,0.6), transparent)" }} />
          </div>
        )}
      </div>
    </div>
  );
}
