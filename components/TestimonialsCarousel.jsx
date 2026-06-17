'use client';

// ============================================================
// TestimonialsCarousel — Auto-advancing testimonial slider
// Slides in from right, previous slides out left (0.6s)
// Auto-advances every 6 seconds, pauses on hover
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { slideUp } from '../lib/animations';
import styles from '../app/styles/testimonials.module.css';

export default function TestimonialsCarousel() {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1); // 1 = right→left, -1 = left→right
  const [isPaused, setIsPaused] = useState(false);
  const autoAdvanceRef = useRef(null);

  // Load testimonials data
  useEffect(() => {
    fetch('/data/testimonials.json')
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch(() => setTestimonials([]));
  }, []);

  // Advance to next testimonial
  const goToNext = useCallback(() => {
    if (!testimonials.length) return;
    setSlideDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  // Go to previous testimonial
  const goToPrev = useCallback(() => {
    if (!testimonials.length) return;
    setSlideDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance every 6 seconds, paused on hover
  useEffect(() => {
    if (!isPaused && testimonials.length > 1) {
      autoAdvanceRef.current = setInterval(goToNext, 6000);
    }
    return () => clearInterval(autoAdvanceRef.current);
  }, [isPaused, goToNext, testimonials.length]);

  function handleDotClick(dotIndex) {
    setSlideDirection(dotIndex > activeIndex ? 1 : -1);
    setActiveIndex(dotIndex);
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        {/* Section heading */}
        <motion.div
          className={styles.header}
          ref={elementRef}
          variants={slideUp}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          <p className="sectionEyebrow" style={{ color: 'var(--color-accent-gold)' }}>Testimonials</p>
          <h2 className="sectionHeadingLight">In their own words</h2>
        </motion.div>

        {/* Carousel */}
        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence custom={slideDirection} mode="wait">
            {activeTestimonial && (
              <motion.div
                key={activeTestimonial.id}
                className={styles.card}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* Stars */}
                <div className={styles.stars} aria-label={`${activeTestimonial.rating} stars`}>
                  {Array.from({ length: activeTestimonial.rating }, (_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>

                {/* Opening quote mark */}
                <div className={styles.quoteIcon} aria-hidden="true">"</div>

                {/* Quote text */}
                <motion.p
                  className={styles.quoteText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeTestimonial.quote}
                </motion.p>

                {/* Reviewer info */}
                <motion.div
                  className={styles.reviewer}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    className={styles.reviewerAvatar}
                    loading="lazy"
                  />
                  <div className={styles.reviewerInfo}>
                    <span className={styles.reviewerName}>{activeTestimonial.name}</span>
                    <span className={styles.reviewerLocation}>{activeTestimonial.location}</span>
                    <span className={styles.reviewerStayType}>{activeTestimonial.stayType}</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation controls */}
        <div className={styles.controls}>
          <button
            className={styles.navButton}
            aria-label="Previous testimonial"
            onClick={goToPrev}
          >
            ←
          </button>

          <div className={styles.dots}>
            {testimonials.map((_, dotIndex) => (
              <button
                key={dotIndex}
                className={`${styles.dot} ${dotIndex === activeIndex ? styles.dotActive : ''}`}
                aria-label={`Go to testimonial ${dotIndex + 1}`}
                onClick={() => handleDotClick(dotIndex)}
              />
            ))}
          </div>

          <button
            className={styles.navButton}
            aria-label="Next testimonial"
            onClick={goToNext}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
