"use client";

// LensVerse — VideoHero
// Replaces the Three.js camera scene hero with a full-bleed looping WebM
// video background, kicking off the homepage's scrollytelling sequence

import Link from "next/link";

// ─── VideoHero ────────────────────────────────────────────────────────────
export default function VideoHero() {
  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        background: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background video */}
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
          objectFit: "cover",
        }}
      >
        <source src="/photographer-story.webm" type="video/webm" />
      </video>

      {/* Dark scrim for text legibility */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.35) 40%, rgba(9,9,11,0.85) 100%)",
        }}
      />

      {/* Text + CTA overlay */}
      <div
        className="heroContentOverlay animZoomIn"
        style={{ paddingTop: "72px", position: "relative", zIndex: 2 }}
      >
        <p
          className="eyebrow animFadeInUp"
          style={{ marginBottom: "var(--space-lg)", animationDelay: "0.1s" }}
        >
          LensVerse
        </p>

        <h1
          className="heroHeadline"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--color-text)",
            marginBottom: "var(--space-lg)",
            animation: "fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both",
            maxWidth: "14ch",
            lineHeight: 1.05,
          }}
        >
          Capturing Stories{" "}
          <span style={{ color: "var(--color-accent)" }}>Beyond The Lens</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--color-text-muted)",
            maxWidth: "44ch",
            lineHeight: 1.7,
            marginBottom: "var(--space-2xl)",
            animation: "fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both",
          }}
        >
          Luxury wedding, portrait, travel, and commercial photography.
        </p>

        <div
          className="heroCtaGroup"
          style={{
            display: "flex",
            gap: "var(--space-md)",
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both",
          }}
        >
          <Link href="/portfolio" className="buttonPrimary">
            View Portfolio
          </Link>
          <Link href="/services" className="buttonSecondary">
            Book Session
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "var(--space-2xl)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-sm)",
          zIndex: 2,
          animation: "fadeIn 1s ease 1.2s both",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(212,165,116,0.6), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
