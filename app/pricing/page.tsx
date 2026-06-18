// LensVerse — Pricing Page
// Static package tiers. Numbers below are placeholder example pricing —
// edit the `pricingTiers` array to reflect real rates before launch.

import Link from "next/link";

interface PricingTier {
  name:        string;
  price:       string;
  cadence:     string;
  description: string;
  features:    string[];
  isFeatured:  boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name:        "Essential",
    price:       "₱8,000",
    cadence:     "per session",
    description: "A focused single-location session for portraits, small events, or simple product shoots.",
    features: [
      "Up to 2 hours of coverage",
      "1 photographer",
      "30+ edited high-resolution images",
      "Online gallery, downloadable for 30 days",
    ],
    isFeatured: false,
  },
  {
    name:        "Signature",
    price:       "₱18,000",
    cadence:     "per session",
    description: "Our most-booked package — a full half-day of coverage for weddings, travel, and brand shoots.",
    features: [
      "Up to 6 hours of coverage",
      "1 photographer + 1 assistant",
      "100+ edited high-resolution images",
      "Online gallery, downloadable for 90 days",
      "Engagement or pre-shoot consultation included",
    ],
    isFeatured: true,
  },
  {
    name:        "Premiere",
    price:       "₱45,000",
    cadence:     "per session",
    description: "Full-day, multi-location coverage for weddings, commercial campaigns, and destination travel.",
    features: [
      "8–10 hours of coverage",
      "2 photographers",
      "200+ edited high-resolution images",
      "Online gallery, downloadable forever",
      "Printed album included",
      "Priority booking for your date",
    ],
    isFeatured: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="sectionPadding" style={{ textAlign: "center" }}>
        <div className="containerNarrow">
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>Investment</p>
          <h1
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight:    800,
              letterSpacing: "-0.02em",
              marginBottom:  "var(--space-lg)",
            }}
          >
            Pricing
          </h1>
          <p style={{ maxWidth: "56ch", margin: "0 auto" }}>
            Every session is a little different, so these are starting points —
            book a consultation and we&apos;ll tailor a package to what you actually need.
          </p>
        </div>
      </section>

      <section className="sectionPadding" style={{ paddingTop: 0 }}>
        <div
          className="containerContent"
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap:                 "var(--space-lg)",
            alignItems:          "stretch",
          }}
        >
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className="glassCard"
              style={{
                padding:       "var(--space-2xl)",
                display:       "flex",
                flexDirection: "column",
                gap:           "var(--space-lg)",
                border: tier.isFeatured
                  ? "1px solid var(--color-accent)"
                  : "1px solid var(--color-border)",
                position: "relative",
              }}
            >
              {tier.isFeatured && (
                <span
                  style={{
                    position:      "absolute",
                    top:           "-0.75rem",
                    left:          "var(--space-2xl)",
                    background:    "var(--color-accent)",
                    color:         "var(--color-bg)",
                    fontSize:      "0.6875rem",
                    fontWeight:    700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding:       "0.25rem 0.75rem",
                    borderRadius:  "999px",
                  }}
                >
                  Most Popular
                </span>
              )}

              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize:   "1.5rem",
                    fontWeight: 700,
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  {tier.name}
                </h2>
                <p style={{ display: "flex", alignItems: "baseline", gap: "var(--space-xs)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 800 }}>
                    {tier.price}
                  </span>
                  <span style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                    {tier.cadence}
                  </span>
                </p>
              </div>

              <p style={{ color: "var(--color-text-muted)" }}>{tier.description}</p>

              <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", listStyle: "none", flex: 1 }}>
                {tier.features.map((feature) => (
                  <li key={feature} style={{ display: "flex", gap: "var(--space-sm)" }}>
                    <span style={{ color: "var(--color-accent)", flexShrink: 0 }}>✓</span>
                    <span style={{ color: "var(--color-text-muted)" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className={tier.isFeatured ? "buttonPrimary" : "buttonSecondary"}
                style={{ width: "100%", textAlign: "center" }}
              >
                Book {tier.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="sectionPadding" style={{ textAlign: "center" }}>
        <div className="containerNarrow">
          <p style={{ marginBottom: "var(--space-xl)" }}>
            Need something outside these tiers — a multi-day shoot, a commercial retainer, or a custom add-on?
          </p>
          <Link href="/contact" className="buttonSecondary">Get a Custom Quote</Link>
        </div>
      </section>
    </>
  );
}
