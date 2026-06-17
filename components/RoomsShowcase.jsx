'use client';

// ============================================================
// RoomsShowcase — 3-column room card grid
// Cards scale up on scroll (staggered), image zooms on hover
// Card lifts on hover with increased shadow
// ============================================================

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { slideUp, cardContainerVariants, cardChildVariants } from '../lib/animations';
import styles from '../app/styles/rooms.module.css';

export default function RoomsShowcase() {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [rooms, setRooms] = useState([]);

  // Load rooms data from JSON
  useEffect(() => {
    fetch('/data/rooms.json')
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch(() => setRooms([]));
  }, []);

  // Formats PHP price with comma separator
  function formatPrice(amount) {
    return '₱' + amount.toLocaleString('en-PH');
  }

  // Renders star icons based on rating
  function renderStars(ratingCount) {
    return Array.from({ length: ratingCount }, (_, starIndex) => (
      <span key={starIndex} className={styles.star}>★</span>
    ));
  }

  return (
    <section id="rooms" className={styles.section}>
      <div className="container">
        {/* Section heading */}
        <motion.div
          className={styles.header}
          ref={elementRef}
          variants={slideUp}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          <p className="sectionEyebrow">Accommodation</p>
          <h2 className="sectionHeading">Your private world within ours</h2>
          <p className="sectionSubtext">
            Each villa, suite, and pavilion is a distinct experience — designed around its setting, not a brand standard.
          </p>
        </motion.div>

        {/* Room cards */}
        <motion.div
          className={styles.grid}
          variants={cardContainerVariants}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              className={styles.card}
              variants={cardChildVariants}
            >
              {/* Room image with zoom on hover */}
              <div className={styles.imageWrapper}>
                <img
                  src={room.image}
                  alt={room.name}
                  className={styles.roomImage}
                  loading="lazy"
                />
                <span className={styles.categoryBadge}>{room.category}</span>
              </div>

              {/* Card body */}
              <div className={styles.cardBody}>
                <div className={styles.starRating} aria-label={`${room.rating} stars`}>
                  {renderStars(room.rating)}
                </div>
                <h3 className={styles.cardTitle}>{room.name}</h3>
                <p className={styles.cardTagline}>{room.tagline}</p>
                <p className={styles.cardDescription}>{room.description}</p>

                {/* Feature tags */}
                <div className={styles.cardFeatures}>
                  {room.features.map((feature) => (
                    <span key={feature} className={styles.featureTag}>{feature}</span>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className={styles.cardFooter}>
                  <div className={styles.priceBlock}>
                    <span className={styles.priceAmount}>{formatPrice(room.price)}</span>
                    <span className={styles.priceLabel}>{room.priceLabel}</span>
                  </div>
                  <button
                    className={styles.viewDetailsButton}
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Book Room →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
