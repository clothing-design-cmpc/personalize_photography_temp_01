"use client";

// LensVerse — ServicesPreview
// Grid of service category cards linking to /services with anchor hashes

import Link from "next/link";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// ─── Services config ───────────────────────────────────────────────────────
const services = [
  {
    title: "Wedding",
    slug:  "wedding",
    description: "Full-day coverage of your most important moments.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2c-2 3-4 5-4 8a4 4 0 008 0c0-3-2-5-4-8z"/>
        <path d="M12 14v8"/>
        <path d="M8 18h8"/>
      </svg>
    ),
  },
  {
    title: "Portrait",
    slug:  "portrait",
    description: "Studio and on-location individual or family portraits.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4"/>
        <path d="M5 21v-2a7 7 0 0114 0v2"/>
      </svg>
    ),
  },
  {
    title: "Travel",
    slug:  "travel",
    description: "Documentary-style photography for your adventures.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
  },
  {
    title: "Commercial",
    slug:  "commercial",
    description: "Product, brand, and corporate photography.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2"/>
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>
      </svg>
    ),
  },
  {
    title: "Events",
    slug:  "events",
    description: "Corporate events, parties, and milestone celebrations.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
  },
];

// ─── ServicesPreview ──────────────────────────────────────────────────────────
export default function ServicesPreview() {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      className="sectionPadding"
      aria-label="Services Preview"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="containerContent">

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>
            What We Offer
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
            }}
          >
            Our Services
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={elementRef}
          className="servicesPreviewGrid"
          style={{ display: "grid", gap: "var(--space-lg)" }}
        >
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              className="glassCard"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-md)",
                padding: "var(--space-xl)",
                textDecoration: "none",
                transition: "border-color 0.3s ease, transform 0.3s ease, background 0.3s ease",
                opacity:   isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${index * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--color-accent)";
                el.style.background  = "rgba(212, 165, 116, 0.05)";
                el.style.transform   = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--color-border)";
                el.style.background  = "var(--color-surface)";
                el.style.transform   = "translateY(0)";
              }}
            >
              <div style={{ color: "var(--color-accent)" }}>{service.icon}</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                }}
              >
                {service.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
