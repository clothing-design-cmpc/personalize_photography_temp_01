"use client";

// LensVerse — StorySection
// Generic homepage scrollytelling block: video background (dimmed/blurred),
// text that rises up into view and animates, optional breathing image that
// pulses between two sizes on a loop. Each section can flip text/image side.

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface StorySectionProps {
  eyebrow:  string;
  heading:  string;
  body:     string;
  // Optional supporting image — if provided, breathing animation applies
  imageSrc?: string;
  imageAlt?: string;
  // Which side the image sits on (text always present)
  imagePosition?: "left" | "right";
  // Video to use as section background (defaults to photographer-story.webm)
  videoSrc?: string;
  // Background tint strength
  scrimOpacity?: number;
  children?: React.ReactNode;
}

// ─── StorySection ─────────────────────────────────────────────────────────
export default function StorySection({
  eyebrow,
  heading,
  body,
  imageSrc,
  imageAlt = "",
  imagePosition = "right",
  videoSrc = "/photographer-story.webm",
  scrimOpacity = 0.82,
  children,
}: StorySectionProps) {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.3 });

  const textBlock = (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--color-text)",
          marginBottom: "var(--space-lg)",
          lineHeight: 1.15,
        }}
      >
        {heading}
      </h2>
      <p
        style={{
          fontSize: "1.0625rem",
          lineHeight: 1.75,
          color: "var(--color-text-muted)",
          maxWidth: "52ch",
        }}
      >
        {body}
      </p>
      {children}
    </div>
  );

  const imageBlock = imageSrc ? (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4/5",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.8s ease 0.15s",
        background:
          "linear-gradient(135deg, rgba(212,165,116,0.15), rgba(123,168,168,0.1))",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={imageAlt}
        onError={(e) => {
          // Hide broken image, leave gradient placeholder visible
          (e.target as HTMLImageElement).style.display = "none";
        }}
        className="animBreathing"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  ) : null;

  return (
    <section
      ref={elementRef as React.RefObject<HTMLDivElement>}
      style={{
        position: "relative",
        minHeight: "90dvh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingBlock: "var(--space-3xl)",
      }}
    >
      {/* Video background */}
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
        }}
      >
        <source src={videoSrc} type="video/webm" />
      </video>

      {/* Scrim */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(9, 9, 11, ${scrimOpacity})`,
        }}
      />

      <div
        className="containerContent storySectionGrid"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: imageSrc ? "1fr 1fr" : "1fr",
          gap: "var(--space-2xl)",
          alignItems: "center",
        }}
      >
        {imagePosition === "left" && imageBlock}
        {textBlock}
        {imagePosition === "right" && imageBlock}
      </div>
    </section>
  );
}
