"use client";

// LensVerse — FeaturedWork
// Masonry grid of up to 6 featured portfolio items
// Fetches from /api/portfolio?featured=true with hover zoom + title overlay

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { PortfolioCardSkeleton } from "@/components/ui/LoadingSkeleton";

interface PortfolioItem {
  id:        string;
  slug:      string;
  title:     string;
  category:  string;
  location:  string;
  year:      number;
  coverImage: string;
}

// ─── FeaturedWorkCard ─────────────────────────────────────────────────────────
// Individual card with image, hover overlay, category badge, and link
function FeaturedWorkCard({
  item,
  index,
  isVisible,
}: {
  item:      PortfolioItem;
  index:     number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/portfolio/${item.slug}`}
      style={{
        display: "block",
        breakInside: "avoid",
        marginBottom: "var(--space-lg)",
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        opacity:   isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.1}s,
                     transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View ${item.title}`}
    >
      {/* Cover image */}
      <div style={{ position: "relative", width: "100%", paddingTop: "66%" }}>
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          sizes="(max-width:767px) 100vw, (max-width:1023px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            transform: isHovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>

      {/* Category badge */}
      <div
        style={{
          position: "absolute",
          top: "var(--space-md)",
          left: "var(--space-md)",
          padding: "0.25rem 0.75rem",
          background: "rgba(9,9,11,0.75)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid var(--color-border-mid)",
          borderRadius: 9999,
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-accent)",
        }}
      >
        {item.category}
      </div>

      {/* Hover title overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(9,9,11,0.85) 0%, transparent 50%)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          display: "flex",
          alignItems: "flex-end",
          padding: "var(--space-lg)",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--color-text)",
              marginBottom: "0.25rem",
            }}
          >
            {item.title}
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
            }}
          >
            {item.location} · {item.year}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ─── FeaturedWork ─────────────────────────────────────────────────────────────
export default function FeaturedWork() {
  const [items, setItems]     = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  // Fetch featured portfolio items on mount
  useEffect(() => {
    fetch("/api/portfolio?featured=true&limit=6")
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <section
      className="sectionPadding"
      aria-label="Featured Work"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="containerContent">

        {/* Section header */}
        <div
          ref={elementRef}
          style={{
            textAlign: "center",
            marginBottom: "var(--space-3xl)",
            opacity:   isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              marginBottom: "var(--space-lg)",
            }}
          >
            Featured Projects
          </h2>
          <p style={{ maxWidth: "44ch", margin: "0 auto", color: "var(--color-text-muted)" }}>
            A curated selection of our most celebrated photography work.
          </p>
        </div>

        {/* Masonry grid */}
        <div
          className="featuredWorkGrid"
          style={{ columnGap: "var(--space-lg)" }}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ breakInside: "avoid", marginBottom: "var(--space-lg)" }}>
                  <PortfolioCardSkeleton />
                </div>
              ))
            : items.map((item, index) => (
                <FeaturedWorkCard
                  key={item.id}
                  item={item}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
        </div>

        {/* View all link */}
        {!isLoading && (
          <div style={{ textAlign: "center", marginTop: "var(--space-2xl)" }}>
            <Link href="/portfolio" className="buttonSecondary">
              View All Work
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
