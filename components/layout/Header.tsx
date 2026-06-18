"use client";

// LensVerse — Header
// Sticky navigation bar with desktop nav links and mobile slide-in drawer

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Navigation links config ──────────────────────────────────────────────────
const navigationLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Galleries", href: "/galleries" },
  { label: "Services",  href: "/services"  },
  { label: "Pricing",   href: "/pricing"   },
  { label: "About",     href: "/about"     },
  { label: "Blog",      href: "/blog"      },
  { label: "Contact",   href: "/contact"   },
];

// ─── Header ──────────────────────────────────────────────────────────────────
export default function Header() {
  const pathname = usePathname();

  // Controls mobile drawer open/closed state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Controls header background — transparent at top, filled on scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen for scroll to toggle filled header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: `background ${0.3}s cubic-bezier(0.22, 1, 0.36, 1),
                       border-color ${0.3}s cubic-bezier(0.22, 1, 0.36, 1),
                       backdrop-filter ${0.3}s cubic-bezier(0.22, 1, 0.36, 1)`,
          background: isScrolled
            ? "rgba(9, 9, 11, 0.88)"
            : "transparent",
          borderBottom: isScrolled
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        }}
      >
        <div
          className="headerInner"
          style={{
            maxWidth: "var(--max-width-content)",
            margin: "0 auto",
            paddingInline: "var(--space-xl)",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="LensVerse — Back to homepage"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.375rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            <span style={{ color: "var(--color-accent)" }}>Lens</span>
            <span>Verse</span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="headerNav"
            aria-label="Main navigation"
            style={{
              alignItems: "center",
              gap: "var(--space-xl)",
            }}
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color:
                    pathname === link.href
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                  textDecoration: "none",
                  transition: "color 0.18s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLAnchorElement).style.color =
                      "var(--color-text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLAnchorElement).style.color =
                      "var(--color-text-muted)";
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div
            className="headerNav"
            style={{ alignItems: "center", gap: "var(--space-md)" }}
          >
            <Link href="/services" className="buttonPrimary">
              Book Session
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="headerMobileMenuButton"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            style={{
              display: "none", /* shown via mediaQueries.css */
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              background: "transparent",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              cursor: "pointer",
              color: "var(--color-text)",
              flexShrink: 0,
            }}
          >
            {/* Animated hamburger / X icon */}
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                width: 20,
              }}
            >
              <span
                style={{
                  display: "block",
                  height: 1.5,
                  background: "currentColor",
                  borderRadius: 2,
                  transformOrigin: "center",
                  transition: "transform 0.22s ease, opacity 0.22s ease",
                  transform: isMobileMenuOpen
                    ? "translateY(6.5px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  height: 1.5,
                  background: "currentColor",
                  borderRadius: 2,
                  transition: "opacity 0.22s ease",
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  height: 1.5,
                  background: "currentColor",
                  borderRadius: 2,
                  transformOrigin: "center",
                  transition: "transform 0.22s ease",
                  transform: isMobileMenuOpen
                    ? "translateY(-6.5px) rotate(-45deg)"
                    : "none",
                }}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* Mobile slide-in drawer */}
      <nav
        aria-label="Mobile navigation"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          width: "min(320px, 85vw)",
          background: "rgba(14, 14, 16, 0.98)",
          borderLeft: "1px solid var(--color-border)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          display: "flex",
          flexDirection: "column",
          padding: "var(--space-2xl) var(--space-xl)",
          paddingTop: "6rem",
          gap: "var(--space-xs)",
          overflowY: "auto",
        }}
      >
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 600,
              color:
                pathname === link.href
                  ? "var(--color-accent)"
                  : "var(--color-text)",
              textDecoration: "none",
              padding: "var(--space-sm) 0",
              borderBottom: "1px solid var(--color-border)",
              transition: "color 0.18s ease",
            }}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/services"
          className="buttonPrimary"
          style={{
            marginTop: "var(--space-xl)",
            textAlign: "center",
          }}
        >
          Book Session
        </Link>
      </nav>
    </>
  );
}
