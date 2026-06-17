// LensVerse — Services Page
// Full breakdown of every service category. Anchor IDs match the slugs used by
// ServicesPreview.tsx (/services#wedding, /services#portrait, etc.) and by the
// "Services" links in Header.tsx and Footer.tsx — this page is what they point to.

import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding, portrait, travel, commercial, and event photography — see what's included in every LensVerse session.",
};

interface ServiceDetail {
  slug:        string;
  eyebrow:     string;
  title:       string;
  description: string;
  included:    string[];
  idealFor:    string;
  icon:        ReactNode;
}

// ─── Service content ──────────────────────────────────────────────────────────
// Source of truth for every service category shown on this page. Icons match
// the ones already used in ServicesPreview.tsx so the visual language stays
// consistent between the homepage teaser cards and this full page.
const serviceDetails: ServiceDetail[] = [
  {
    slug:    "wedding",
    eyebrow: "Full-Day Coverage",
    title:   "Wedding",
    description:
      "Your wedding day moves fast, and I'm there for all of it — getting ready, the ceremony, the reception, and the in-between moments nobody else catches. I shoot documentary-first, stepping in for portraits only when it won't pull you out of the day.",
    included: [
      "8–10 hours of continuous coverage",
      "Second photographer for ceremony and reception",
      "Private online gallery with downloadable high-resolution files",
      "Engagement session included with full-day packages",
    ],
    idealFor: "Couples who want their actual day remembered, not a staged version of it.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2c-2 3-4 5-4 8a4 4 0 008 0c0-3-2-5-4-8z"/>
        <path d="M12 14v8"/>
        <path d="M8 18h8"/>
      </svg>
    ),
  },
  {
    slug:    "portrait",
    eyebrow: "Studio & On-Location",
    title:   "Portrait",
    description:
      "Whether it's a solo session, a couple, or the whole family, the session is built around how you actually move and interact — not a checklist of forced poses. We can shoot in-studio or at a location that means something to you.",
    included: [
      "60–90 minute session, studio or on-location",
      "Wardrobe and posing guidance before the shoot",
      "20+ retouched images delivered digitally",
      "Optional add-on: printed albums or framed prints",
    ],
    idealFor: "Individuals, couples, and families who want portraits that actually look like them.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4"/>
        <path d="M5 21v-2a7 7 0 0114 0v2"/>
      </svg>
    ),
  },
  {
    slug:    "travel",
    eyebrow: "Documentary Style",
    title:   "Travel",
    description:
      "I travel light and shoot fast, following the trip instead of staging it. These sessions work for personal travel documentation, content for travel brands, or a few focused days capturing a specific destination.",
    included: [
      "Full-day or multi-day coverage, tailored to your itinerary",
      "Mix of candid documentary shots and a few directed portraits",
      "Fast-turnaround preview gallery within 48 hours",
      "Usage rights for personal or commercial use, depending on package",
    ],
    idealFor: "Travelers, creators, and brands who want a destination told honestly.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
  },
  {
    slug:    "commercial",
    eyebrow: "Product & Brand",
    title:   "Commercial",
    description:
      "Clean product shots, lifestyle brand imagery, headshots, and on-site corporate photography — planned around how the final images will actually be used, whether that's an e-commerce listing, a pitch deck, or a campaign.",
    included: [
      "Pre-shoot consultation to plan shot list and usage",
      "Studio or on-location shooting",
      "Color-corrected, export-ready files in required formats",
      "Commercial usage license included",
    ],
    idealFor: "Brands, agencies, and businesses that need imagery they can actually publish.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2"/>
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>
      </svg>
    ),
  },
  {
    slug:    "events",
    eyebrow: "Celebrations & Corporate",
    title:   "Events",
    description:
      "From corporate conferences to birthdays and milestone celebrations, I cover the moments your guests will actually want to see again — the energy of the room, not just a lineup of posed group shots.",
    included: [
      "Flexible hourly coverage based on event length",
      "Candid coverage plus a short window for organized group photos",
      "Same-week delivery of a curated highlight gallery",
      "Optional second shooter for larger events",
    ],
    idealFor: "Companies and hosts who want their event remembered the way it actually felt.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
  },
];

// ─── ServiceSection ────────────────────────────────────────────────────────────
// Renders one full service category as an anchored section (id = slug).
// Alternates background tint between entries to create visual rhythm down the page.
function ServiceSection({ service, index }: { service: ServiceDetail; index: number }) {
  const isShaded = index % 2 === 1;

  return (
    <section
      id={service.slug}
      className="sectionPadding"
      aria-label={service.title}
      style={{ background: isShaded ? "var(--color-surface)" : "var(--color-bg)" }}
    >
      <div
        className="containerContent"
        style={{
          display:             "grid",
          gridTemplateColumns: "1fr",
          gap:                 "var(--space-xl)",
        }}
      >
        <div
          className="glassCard"
          style={{ padding: "var(--space-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
            <div
              style={{
                color:        "var(--color-accent)",
                width:        56,
                height:       56,
                borderRadius: "50%",
                background:   "rgba(212,165,116,0.1)",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                flexShrink:   0,
              }}
            >
              {service.icon}
            </div>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--space-xs)" }}>{service.eyebrow}</p>
              <h2
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight:    800,
                  letterSpacing: "-0.02em",
                }}
              >
                {service.title}
              </h2>
            </div>
          </div>

          <p style={{ fontSize: "1.0625rem", maxWidth: "70ch" }}>{service.description}</p>

          <div>
            <p
              style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         "var(--color-text)",
                marginBottom:  "var(--space-md)",
              }}
            >
              What&apos;s Included
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", listStyle: "none" }}>
              {service.included.map((item) => (
                <li key={item} style={{ display: "flex", gap: "var(--space-sm)", color: "var(--color-text-muted)" }}>
                  <span style={{ color: "var(--color-accent)", flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p style={{ fontSize: "0.9375rem", fontStyle: "italic" }}>{service.idealFor}</p>

          <div>
            <Link href="/booking" className="buttonPrimary">
              Book {service.title}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ServicesPage ──────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      {/* Page intro */}
      <section className="sectionPadding" style={{ textAlign: "center" }}>
        <div className="containerNarrow">
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>
            What I Offer
          </p>
          <h1
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight:    800,
              letterSpacing: "-0.02em",
              marginBottom:  "var(--space-lg)",
            }}
          >
            Services
          </h1>
          <p style={{ maxWidth: "56ch", margin: "0 auto" }}>
            Five categories, one approach — show up fully present, shoot honestly,
            and deliver work that actually feels like the moment it came from.
            Pricing is tailored to each session; book a free consultation for a
            custom quote.
          </p>
        </div>
      </section>

      {/* Service sections */}
      {serviceDetails.map((service, index) => (
        <ServiceSection key={service.slug} service={service} index={index} />
      ))}

      {/* Closing CTA */}
      <section className="sectionPadding" style={{ background: "var(--color-bg)", textAlign: "center" }}>
        <div className="containerNarrow">
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>
            Ready When You Are
          </p>
          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2rem, 4vw, 2.75rem)",
              fontWeight:    800,
              letterSpacing: "-0.02em",
              marginBottom:  "var(--space-lg)",
            }}
          >
            Let&apos;s Talk About Your Story
          </h2>
          <p style={{ marginBottom: "var(--space-2xl)" }}>
            Not sure which service fits? Reach out and we&apos;ll figure it out together.
          </p>
          <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/booking" className="buttonPrimary">Book a Session</Link>
            <Link href="/portfolio" className="buttonSecondary">View Portfolio</Link>
          </div>
        </div>
      </section>
    </>
  );
}