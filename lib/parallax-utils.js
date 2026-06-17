// ============================================================
// PARALLAX UTILS — Helper functions for parallax calculations
// Used by useParallax hook and ParallaxSection component
// ============================================================

/**
 * Calculates the parallax offset for a given scroll position and intensity.
 * Returns CSS transform translateY value.
 *
 * @param {number} scrollY - Current window scroll position
 * @param {number} elementTop - Element's top offset from document top
 * @param {number} intensity - Parallax speed (0.3 = slow, 0.7 = fast)
 * @returns {number} Pixel offset to apply as translateY
 */
export function calculateParallaxOffset(scrollY, elementTop, intensity = 0.5) {
  const relativeScroll = scrollY - elementTop;
  return relativeScroll * intensity;
}

/**
 * Clamps parallax offset to prevent extreme values on very long pages
 *
 * @param {number} offset - Raw calculated offset
 * @param {number} maxOffset - Maximum allowed offset in pixels
 * @returns {number} Clamped offset value
 */
export function clampParallaxOffset(offset, maxOffset = 200) {
  return Math.max(-maxOffset, Math.min(maxOffset, offset));
}

/**
 * Checks if device is mobile (parallax disabled on mobile for performance)
 * @returns {boolean} True if viewport width is <= 768px
 */
export function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
}

/**
 * Checks if user prefers reduced motion
 * @returns {boolean} True if prefers-reduced-motion is set
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
