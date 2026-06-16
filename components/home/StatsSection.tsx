"use client";

// LensVerse — StatsSection
// Grid of animated counters showcasing studio achievements

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

// ─── Stats config ──────────────────────────────────────────────────────────
const stats = [
  { value: 480, suffix: "+", label: "Sessions Shot" },
  { value: 12,  suffix: "",  label: "Years Experience" },
  { value: 36,  suffix: "",  label: "Countries Traveled" },
  { value: 99,  suffix: "%", label: "Client Satisfaction" },
];

// ─── StatsSection ─────────────────────────────────────────────────────────────
export default function StatsSection() {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      aria-label="Studio Statistics"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        paddingBlock: "var(--space-3xl)",
      }}
    >
      <div className="containerContent">
        <div
          ref={elementRef}
          className="statsGrid"
          style={{
            display: "grid",
            gap: "var(--space-xl)",
            textAlign: "center",
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              style={{
                opacity:   isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${index * 0.1}s,
                             transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
              }}
            >
              <p
                className="statsNumber"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  color: "var(--color-accent)",
                  lineHeight: 1,
                  marginBottom: "var(--space-sm)",
                }}
              >
                <AnimatedCounter targetValue={stat.value} suffix={stat.suffix} />
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
