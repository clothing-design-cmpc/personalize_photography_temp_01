"use client";

// LensVerse — CtaBanner
// Final homepage section — strong call-to-action to book a session

import Link from "next/link";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// ─── CtaBanner ────────────────────────────────────────────────────────────────
export default function CtaBanner() {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      ref={elementRef as React.RefObject<HTMLDivElement>}
      aria-label="Book a session call to action"
      style={{
        position: "relative",
        paddingBlock: "var(--space-3xl)",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,165,116,0.12) 0%, transparent 70%)",
        borderTop: "1px solid var(--color-border)",
        overflow: "hidden",
      }}
    >
      <div
        className="containerNarrow"
        style={{
          textAlign: "center",
          opacity:   isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>
          Ready When You Are
        </p>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
            marginBottom: "var(--space-lg)",
            lineHeight: 1.1,
          }}
        >
          Let&apos;s Create Something{" "}
          <span style={{ color: "var(--color-accent)" }}>Timeless</span>
        </h2>

        <p
          style={{
            color: "var(--color-text-muted)",
            maxWidth: "48ch",
            margin: "0 auto var(--space-2xl)",
            fontSize: "1.0625rem",
          }}
        >
          Tell us about your vision and we&apos;ll bring it to life — one frame
          at a time.
        </p>

        <div
          style={{
            display: "flex",
            gap: "var(--space-md)",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/booking" className="buttonPrimary">
            Book Your Session
          </Link>
          <Link href="/contact" className="buttonSecondary">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
