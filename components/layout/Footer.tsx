"use client";

// LensVerse — Footer
// Site-wide footer with logo, navigation columns, social links, and legal

import Link from "next/link";

// ─── Footer nav columns config ────────────────────────────────────────────────
const footerColumns = [
  {
    heading: "Work",
    links: [
      { label: "Portfolio",  href: "/portfolio"  },
      { label: "3D Gallery", href: "/galleries"  },
      { label: "Blog",       href: "/blog"       },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Services",   href: "/services"  },
      { label: "Pricing",    href: "/pricing"   },
      { label: "Booking",    href: "/booking"   },
    ],
  },
  {
    heading: "Studio",
    links: [
      { label: "About",   href: "/about"   },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// ─── Social links config ──────────────────────────────────────────────────────
const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/lensverse",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/lensverse",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@lensverse",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@lensverse",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

// ─── Footer ──────────────────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "rgba(0, 0, 0, 0.4)",
        borderTop: "1px solid var(--color-border)",
        paddingBlock: "var(--space-3xl) var(--space-2xl)",
        marginTop: "auto",
      }}
    >
      <div className="containerContent">

        {/* Main grid: logo/tagline + nav columns */}
        <div
          className="footerGrid"
          style={{
            display: "grid",
            gap: "var(--space-2xl)",
            marginBottom: "var(--space-3xl)",
          }}
        >
          {/* Brand column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            <Link
              href="/"
              aria-label="LensVerse homepage"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                textDecoration: "none",
                display: "inline-flex",
              }}
            >
              <span style={{ color: "var(--color-accent)" }}>Lens</span>
              <span style={{ color: "var(--color-text)" }}>Verse</span>
            </Link>

            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                maxWidth: 280,
              }}
            >
              Capturing stories beyond the lens. Luxury wedding, portrait,
              travel, and commercial photography.
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                    color: "var(--color-text-muted)",
                    transition: "color 0.18s ease, border-color 0.18s ease, background 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.color = "var(--color-accent)";
                    el.style.borderColor = "var(--color-accent)";
                    el.style.background = "rgba(212, 165, 116, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.color = "var(--color-text-muted)";
                    el.style.borderColor = "var(--color-border)";
                    el.style.background = "var(--color-surface)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "var(--space-lg)",
                }}
              >
                {column.heading}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-md)",
                }}
              >
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "0.9375rem",
                        color: "var(--color-text-muted)",
                        textDecoration: "none",
                        transition: "color 0.18s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLAnchorElement).style.color =
                          "var(--color-accent)";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLAnchorElement).style.color =
                          "var(--color-text-muted)";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: "var(--space-xl)" }} />

        {/* Legal row */}
        <div
          className="footerLegal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-md)",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-muted)",
            }}
          >
            © {currentYear} LensVerse. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: "var(--space-xl)" }}>
            <Link
              href="/privacy"
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-muted)",
                textDecoration: "none",
                transition: "color 0.18s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = "var(--color-text)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color =
                  "var(--color-text-muted)";
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-muted)",
                textDecoration: "none",
                transition: "color 0.18s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = "var(--color-text)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color =
                  "var(--color-text-muted)";
              }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}