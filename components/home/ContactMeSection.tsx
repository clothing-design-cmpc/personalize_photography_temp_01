"use client";

// LensVerse — ContactMeSection
// Final homepage section — direct CTA into the full Contact page,
// styled consistently with the video-background story sections

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContactMeSection() {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.25 });

  return (
    <section
      ref={elementRef as React.RefObject<HTMLDivElement>}
      style={{
        position: "relative",
        minHeight: "80dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        <source src="/photographer-story.webm" type="video/webm" />
      </video>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,165,116,0.1) 0%, rgba(9,9,11,0.9) 75%)",
        }}
      />

      <div
        className="containerNarrow"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>
          Contact Me
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
            marginBottom: "var(--space-lg)",
            lineHeight: 1.1,
          }}
        >
          Let&apos;s Talk About{" "}
          <span style={{ color: "var(--color-accent)" }}>Your Story</span>
        </h2>
        <p
          style={{
            color: "var(--color-text-muted)",
            maxWidth: "48ch",
            margin: "0 auto var(--space-2xl)",
            fontSize: "1.0625rem",
          }}
        >
          Whether it&apos;s a wedding, a portrait session, or a brand shoot —
          reach out and tell me what you have in mind.
        </p>

        <div
          style={{
            display: "flex",
            gap: "var(--space-md)",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/contact" className="buttonPrimary">
            Get in Touch
          </Link>
          <Link href="/services" className="buttonSecondary">
            Book a Session
          </Link>
        </div>
      </div>
    </section>
  );
}
