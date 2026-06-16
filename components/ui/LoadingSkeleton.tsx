// LensVerse — LoadingSkeleton
// Renders shimmer placeholder blocks while content is loading

interface LoadingSkeletonProps {
  // Width of the skeleton block (CSS value or "100%")
  width?: string;
  // Height of the skeleton block
  height?: string;
  // Border radius
  borderRadius?: string;
  // Additional inline styles
  style?: React.CSSProperties;
}

// ─── LoadingSkeleton ──────────────────────────────────────────────────────────
export default function LoadingSkeleton({
  width        = "100%",
  height       = "1rem",
  borderRadius = "6px",
  style,
}: LoadingSkeletonProps) {
  return (
    <div
      className="skeletonLoad"
      aria-hidden="true"
      style={{ width, height, borderRadius, ...style }}
    />
  );
}

// ─── PortfolioCardSkeleton ────────────────────────────────────────────────────
// Skeleton for a portfolio / featured work card
export function PortfolioCardSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <LoadingSkeleton height="280px" borderRadius="12px" />
      <LoadingSkeleton width="60%" height="1rem" />
      <LoadingSkeleton width="40%" height="0.75rem" />
    </div>
  );
}

// ─── TestimonialSkeleton ──────────────────────────────────────────────────────
// Skeleton for a testimonial card
export function TestimonialSkeleton() {
  return (
    <div
      style={{
        padding: "2rem",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <LoadingSkeleton width="48px" height="48px" borderRadius="50%" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <LoadingSkeleton width="40%" height="0.875rem" />
          <LoadingSkeleton width="60%" height="0.75rem" />
        </div>
      </div>
      <LoadingSkeleton height="0.875rem" />
      <LoadingSkeleton height="0.875rem" />
      <LoadingSkeleton width="70%" height="0.875rem" />
    </div>
  );
}
