"use client";

// LensVerse — TestimonialsSlider
// Auto-rotating testimonial carousel with manual prev/next + dot indicators

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { TestimonialSkeleton } from "@/components/ui/LoadingSkeleton";

interface Testimonial {
  id:         string;
  clientName: string;
  occasion:   string;
  rating:     number;
  quote:      string;
  photoUrl?:  string;
}

// ─── StarRating ───────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "#d4a574" : "none"}
          stroke="#d4a574"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// ─── TestimonialsSlider ───────────────────────────────────────────────────────
export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [activeIndex, setActiveIndex]   = useState(0);

  // Fetch testimonials on mount
  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % Math.max(testimonials.length, 1));
  }, [testimonials.length]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) =>
      (prev - 1 + testimonials.length) % Math.max(testimonials.length, 1)
    );
  }, [testimonials.length]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (testimonials.length < 2) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length, goToNext]);

  if (isLoading) {
    return (
      <section className="sectionPadding" style={{ background: "var(--color-surface)" }}>
        <div className="containerNarrow">
          <TestimonialSkeleton />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      className="sectionPadding"
      aria-label="Client Testimonials"
      style={{ background: "var(--color-surface)", overflow: "hidden" }}
    >
      <div className="containerNarrow">

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>
            Client Stories
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
            }}
          >
            What Clients Say
          </h2>
        </div>

        {/* Slider */}
        <div
          className="testimonialsSlider"
          style={{ position: "relative", minHeight: 260 }}
        >
          <div
            key={activeTestimonial.id}
            className="glassCard"
            style={{
              padding: "var(--space-2xl)",
              textAlign: "center",
              animation: "slideInCarousel 0.5s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            {activeTestimonial.photoUrl && (
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto var(--space-lg)",
                  border: "2px solid var(--color-accent)",
                  position: "relative",
                }}
              >
                <Image
                  src={activeTestimonial.photoUrl}
                  alt={activeTestimonial.clientName}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--space-lg)" }}>
              <StarRating rating={activeTestimonial.rating} />
            </div>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                lineHeight: 1.6,
                color: "var(--color-text)",
                marginBottom: "var(--space-lg)",
                fontStyle: "italic",
              }}
            >
              "{activeTestimonial.quote}"
            </p>

            <p style={{ fontWeight: 600, color: "var(--color-text)" }}>
              {activeTestimonial.clientName}
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {activeTestimonial.occasion}
            </p>
          </div>

          {/* Prev / Next controls */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                aria-label="Previous testimonial"
                style={{
                  position: "absolute",
                  left: -8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid var(--color-border-mid)",
                  background: "var(--color-bg)",
                  color: "var(--color-text)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ‹
              </button>
              <button
                onClick={goToNext}
                aria-label="Next testimonial"
                style={{
                  position: "absolute",
                  right: -8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid var(--color-border-mid)",
                  background: "var(--color-bg)",
                  color: "var(--color-text)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {testimonials.length > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "var(--space-sm)",
              marginTop: "var(--space-xl)",
            }}
          >
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: i === activeIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 9999,
                  border: "none",
                  background:
                    i === activeIndex
                      ? "var(--color-accent)"
                      : "var(--color-border-mid)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
