'use client';

// ============================================================
// Lightbox — Full-screen image overlay with prev/next nav
// Triggered by passing an images array and activeIndex
// Closes on backdrop click, Escape key, or X button
// Keyboard: ArrowLeft / ArrowRight / Escape
// ============================================================

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Lightbox.module.css';

export default function Lightbox({ images, activeIndex, onClose, onPrev, onNext }) {
  const isOpen = activeIndex !== null && activeIndex !== undefined;

  // Close on Escape, navigate with arrow keys
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [isOpen, onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Lock body scroll while open
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, isOpen]);

  const activeImage = isOpen ? images[activeIndex] : null;

  return (
    <AnimatePresence>
      {isOpen && activeImage && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Prev button */}
          <button
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Image */}
          <motion.div
            key={activeIndex}
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt || ''}
              className={styles.image}
            />
            {activeImage.caption && (
              <p className={styles.caption}>{activeImage.caption}</p>
            )}
          </motion.div>

          {/* Next button */}
          <button
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next image"
          >
            ›
          </button>

          {/* Counter */}
          <p className={styles.counter}>
            {activeIndex + 1} / {images.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
