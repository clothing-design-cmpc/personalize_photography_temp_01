"use client";

// LensVerse — HeroSection
// Full 100dvh section with Three.js camera scene, text overlay, and CTA buttons
// Three.js loaded via dynamic import to prevent SSR and keep initial bundle small

import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import WebGLFallback from "@/components/three/WebGLFallback";

// Dynamically import HeroScene — client-only, no SSR
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

// ─── HeroSection ─────────────────────────────────────────────────────────────
export default function HeroSection() {
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
      {/* Three.js canvas layer — behind all content */}
      <div className="threeCanvasWrapper">
        <WebGLFallback
          fallback={
            <div
              className="webglFallbackHero"
              style={{ position: "absolute", inset: 0 }}
            />
          }
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </WebGLFallback>
      </div>

      {/* Radial scrim — blends canvas edges */}
      <div className="heroEdgeScrim" />

      {/* Bottom fade into next section */}
      <div className="heroBottomFade" />

      {/* Text + CTA overlay */}
      <div
        className="heroContentOverlay animZoomIn"
        style={{ paddingTop: "72px" /* offset for fixed header */ }}
      >
        {/* Eyebrow */}
        <p
          className="eyebrow animFadeInUp"
          style={{
            marginBottom: "var(--space-lg)",
            animationDelay: "0.1s",
          }}
        >
          LensVerse
        </p>

        {/* Headline */}
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

        {/* Subheadline */}
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

        {/* CTA buttons */}
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
