'use client';

// ============================================================
// Hero — Full-viewport hero section with parallax background
// Staggered fade+slide animations on heading, subheading, buttons
// Parallax implemented with requestAnimationFrame on scroll
// ============================================================

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { isMobileDevice, prefersReducedMotion } from '../lib/parallax-utils';
import styles from '../app/styles/hero.module.css';

export default function Hero() {
  const backgroundRef = useRef(null);
  const rafIdRef = useRef(null);

  // Parallax scroll handler — moves background at 0.5x scroll speed
  useEffect(() => {
    function handleScroll() {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        if (!backgroundRef.current) return;
        if (isMobileDevice() || prefersReducedMotion()) return;
        const scrollY = window.scrollY;
        backgroundRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  function handleBookClick() {
    const bookingSection = document.querySelector('#booking');
    if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth' });
  }

  function handleGalleryClick() {
    const gallerySection = document.querySelector('#gallery');
    if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="home" className={styles.hero}>
      {/* Parallax background image */}
      <div ref={backgroundRef} className={styles.heroBackground} />

      {/* Dark gradient overlay */}
      <motion.div
        className={styles.heroOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Content */}
      <div className={styles.heroContent}>
        {/* Eyebrow label */}
        <motion.p
          className={styles.heroEyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Private Island Sanctuary · Philippines
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className={styles.heroHeading}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
        >
          Where the world{' '}
          <span className={styles.heroHeadingAccent}>quiets</span>
          {' '}down
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className={styles.heroSubheading}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        >
          An intimate resort tucked between ancient forest and open sea.
          Six villas. Forty guests. One unforgettable island.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className={styles.heroButtons}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
        >
          <button className={styles.btnPrimary} onClick={handleBookClick}>
            Book Your Stay
          </button>
          <button className={styles.btnOutline} onClick={handleGalleryClick}>
            Explore Gallery
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </motion.div>
    </section>
  );
}
