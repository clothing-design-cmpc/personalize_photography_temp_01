'use client';

// ============================================================
// useScrollTrigger — GSAP ScrollTrigger integration hook
// Animates in on scroll down, fades out on scroll up (bidirectional)
// toggleActions: 'play reverse play reverse' handles both directions
// ============================================================

import { useEffect, useRef } from 'react';

export function useScrollTrigger(config = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    let scrollTriggerInstance = null;

    const initScrollTrigger = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const element = elementRef.current;
      if (!element) return;

      const animation = gsap.fromTo(
        element,
        { opacity: 0, y: config.fromY ?? 60 },
        {
          opacity: 1,
          y: 0,
          duration: config.duration ?? 0.8,
          ease: config.ease ?? 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: config.start ?? 'top 80%',
            end: config.end ?? 'bottom 20%',
            // play on enter, reverse on leave-back, play again on re-enter, reverse again
            toggleActions: config.once
              ? 'play none none none'
              : 'play reverse play reverse',
          },
        }
      );

      scrollTriggerInstance = animation.scrollTrigger;
    };

    initScrollTrigger();

    return () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, [config.duration, config.ease, config.fromY, config.start, config.end, config.once]);

  return { elementRef };
}
