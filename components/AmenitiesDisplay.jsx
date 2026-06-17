'use client';

// ============================================================
// AmenitiesDisplay — 4-column amenity grid
// Icons animate with spring/bounce effect on scroll reveal
// Card hovers invert colors (cream to navy)
// Uses Lucide React SVG icons (consistent stroke, no emoji)
// ============================================================

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Waves, Sparkles, UtensilsCrossed, Sailboat, Sun, Flame,
  Dumbbell, BookOpen, BellRing, Car, Bike, Film,
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { slideUp, scaleBounce } from '../lib/animations';
import styles from '../app/styles/amenities.module.css';

// Map icon name strings from JSON to Lucide components
const iconMap = {
  Waves, Sparkles, UtensilsCrossed, Sailboat, Sun, Flame,
  Dumbbell, BookOpen, BellRing, Car, Bike, Film,
};

// Stagger container variant for amenity grid
const amenityContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export default function AmenitiesDisplay() {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [amenities, setAmenities] = useState([]);

  // Load amenities data
  useEffect(() => {
    fetch('/data/amenities.json')
      .then((res) => res.json())
      .then((data) => setAmenities(data))
      .catch(() => setAmenities([]));
  }, []);

  return (
    <section id="amenities" className={styles.section}>
      <div className={styles.sectionBg} aria-hidden="true" />

      <div className="container">
        {/* Section heading */}
        <motion.div
          className={styles.header}
          ref={elementRef}
          variants={slideUp}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          <p className="sectionEyebrow">Facilities</p>
          <h2 className="sectionHeading">Everything you need. Nothing you don't.</h2>
          <p className="sectionSubtext">
            Thoughtfully selected amenities — not a checklist of features, but a considered ecosystem for rest and discovery.
          </p>
        </motion.div>

        {/* Amenity cards */}
        <motion.div
          className={styles.grid}
          variants={amenityContainerVariants}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          {amenities.map((amenity) => {
            // Resolve icon component from string name
            const IconComponent = iconMap[amenity.icon];
            return (
              <motion.div
                key={amenity.id}
                className={styles.card}
                variants={scaleBounce}
              >
                <span className={styles.amenityIcon} aria-hidden="true">
                  {IconComponent && (
                    <IconComponent size={32} strokeWidth={1.5} />
                  )}
                </span>
                <h3 className={styles.amenityName}>{amenity.name}</h3>
                <p className={styles.amenityDescription}>{amenity.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
