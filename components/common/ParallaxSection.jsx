'use client';

// ============================================================
// ParallaxSection — Reusable section wrapper with parallax bg
// Pass bgImage, overlayOpacity, speed (0–1), and children
// Disables parallax on mobile (useWindowSize check)
// Respects prefers-reduced-motion
// ============================================================

import { useRef, useEffect, useState } from 'react';
import { prefersReducedMotion, isMobileDevice } from '../../lib/parallax-utils';

export default function ParallaxSection({
  bgImage,
  overlayOpacity = 0.5,
  speed = 0.35,
  minHeight = '500px',
  className = '',
  style = {},
  children,
  id,
}) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const rafRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    // Disable parallax on mobile or if user prefers reduced motion
    if (isMobileDevice() || prefersReducedMotion()) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, []);

  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const section = sectionRef.current;
        const bg = bgRef.current;
        if (!section || !bg) return;
        const rect = section.getBoundingClientRect();
        const offset = rect.top * speed;
        bg.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [disabled, speed]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight,
        ...style,
      }}
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-20% 0',
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: disabled ? 'scroll' : 'unset',
          willChange: disabled ? 'auto' : 'transform',
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: `rgba(15, 30, 51, ${overlayOpacity})`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </section>
  );
}
