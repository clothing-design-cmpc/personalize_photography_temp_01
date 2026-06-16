"use client";

// LensVerse — WebGLFallback
// Detects WebGL support and renders children if available, fallback UI otherwise
// Used as wrapper around all Three.js scene components

import { useEffect, useState, type ReactNode } from "react";

interface WebGLFallbackProps {
  // The Three.js scene to render when WebGL is supported
  children: ReactNode;
  // Fallback content shown when WebGL is unavailable
  fallback?: ReactNode;
}

// ─── detectWebGLSupport ───────────────────────────────────────────────────────
// Returns true if the browser supports WebGL rendering
function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

// ─── WebGLFallback ────────────────────────────────────────────────────────────
export default function WebGLFallback({ children, fallback }: WebGLFallbackProps) {
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setIsWebGLSupported(detectWebGLSupport());
  }, []);

  // During SSR / hydration — render nothing to avoid mismatch
  if (isWebGLSupported === null) return null;

  if (!isWebGLSupported) {
    return (
      <>
        {fallback ?? (
          <div className="webglFallbackHero" aria-hidden="true" />
        )}
      </>
    );
  }

  return <>{children}</>;
}
