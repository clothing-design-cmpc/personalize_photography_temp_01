'use client';

// ============================================================
// ScrollReveal — Wrap any element to animate in on scroll down
// and fade out on scroll up (bidirectional)
// Props: variant (from animations.js), delay, className
// ============================================================

import { motion } from 'motion/react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { slideUp } from '../../lib/animations';

export default function ScrollReveal({
  children,
  variant = slideUp,
  delay = 0,
  className = '',
  once = false,
  tag = 'div',
}) {
  const { elementRef, isVisible } = useIntersectionObserver({}, once);
  const MotionTag = motion[tag] || motion.div;

  const variantWithDelay = {
    ...variant,
    animate: {
      ...variant.animate,
      transition: {
        ...(variant.animate?.transition || {}),
        delay,
      },
    },
  };

  return (
    <MotionTag
      ref={elementRef}
      className={className}
      variants={variantWithDelay}
      initial="initial"
      animate={isVisible ? 'animate' : 'exit'}
    >
      {children}
    </MotionTag>
  );
}
