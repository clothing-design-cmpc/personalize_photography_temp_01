'use client';

// ============================================================
// GalleryGrid — Masonry-style grid with staggered scroll animations
// Image hover: scale + gold overlay + "View" button
// Lightbox: backdrop fade-in, image slide-up, prev/next navigation
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { slideUp, cardContainerVariants, cardChildVariants } from '../lib/animations';
import styles from '../app/styles/gallery.module.css';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80', alt: 'Infinity pool at sunset' },
  { id: 2, src: 'https://images.unsplash.com/photo-1582610116397-edb72f9cb1b5?w=800&q=80', alt: 'Lagoon suite interior' },
  { id: 3, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Mountain and sea view' },
  { id: 4, src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', alt: 'Garden pavilion terrace' },
  { id: 5, src: 'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800&q=80', alt: 'Tropical beach view' },
  { id: 6, src: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=800&q=80', alt: 'Forest villa at night' },
  { id: 7, src: 'https://images.unsplash.com/photo-1560017788-bbf19a257d2e?w=800&q=80', alt: 'Spa and wellness area' },
  { id: 8, src: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80', alt: 'Private beach dining' },
];

export default function GalleryGrid() {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Opens lightbox at selected image index
  function openLightbox(imageIndex) {
    setLightboxIndex(imageIndex);
    document.body.style.overflow = 'hidden';
  }

  // Closes lightbox
  function closeLightbox() {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }

  // Navigate to next image in lightbox
  function showNextImage() {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  }

  // Navigate to previous image in lightbox
  function showPrevImage() {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }

  // Handle keyboard navigation in lightbox
  function handleLightboxKeyDown(event) {
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') showNextImage();
    if (event.key === 'ArrowLeft') showPrevImage();
  }

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        {/* Section heading */}
        <motion.div
          className={styles.header}
          ref={elementRef}
          variants={slideUp}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          <p className="sectionEyebrow" style={{ color: 'var(--color-accent-gold)' }}>Gallery</p>
          <h2 className="sectionHeadingLight">The island, unfiltered</h2>
        </motion.div>

        {/* Image grid */}
        <motion.div
          className={styles.grid}
          variants={cardContainerVariants}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          {galleryImages.map((image, imageIndex) => (
            <motion.div
              key={image.id}
              className={styles.gridItem}
              variants={cardChildVariants}
              onClick={() => openLightbox(imageIndex)}
              role="button"
              tabIndex={0}
              aria-label={`View ${image.alt}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(imageIndex)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={styles.galleryImage}
                loading="lazy"
              />
              <div className={styles.imageOverlay}>
                <span className={styles.viewIcon}>View</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className={styles.lightboxBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            onKeyDown={handleLightboxKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery lightbox"
            tabIndex={-1}
          >
            {/* Lightbox image */}
            <motion.img
              key={lightboxIndex}
              src={galleryImages[lightboxIndex]?.src}
              alt={galleryImages[lightboxIndex]?.alt}
              className={styles.lightboxImage}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Close button */}
            <motion.button
              className={styles.lightboxClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </motion.button>

            {/* Prev button */}
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
              onClick={(e) => { e.stopPropagation(); showPrevImage(); }}
              aria-label="Previous image"
            >
              ←
            </button>

            {/* Next button */}
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
              onClick={(e) => { e.stopPropagation(); showNextImage(); }}
              aria-label="Next image"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
