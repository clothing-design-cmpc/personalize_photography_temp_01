'use client';

// ============================================================
// BookingWidget — Animated card that slides up from below hero
// Staggered field animations, input focus states
// Submit shows loading state then success message
// ============================================================

import { useState } from 'react';
import { motion } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { containerVariants, childVariants } from '../lib/animations';
import styles from '../app/styles/booking.module.css';

export default function BookingWidget() {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [isLoading, setIsLoading] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [roomType, setRoomType] = useState('');

  // Simulates a booking availability check
  async function handleCheckAvailability() {
    if (!checkInDate || !checkOutDate) return;
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setIsLoading(false);

    const contactSection = document.querySelector('#contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="booking" className={styles.bookingSection}>
      <div className="container">
        <motion.div
          ref={elementRef}
          className={styles.bookingCard}
          initial={{ opacity: 0, y: 60 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className={styles.bookingHeading}>Check Availability</p>

          <motion.div
            className={styles.bookingFields}
            variants={containerVariants}
            initial="initial"
            animate={isVisible ? 'animate' : 'exit'}
          >
            {/* Check-in date */}
            <motion.div className={styles.fieldGroup} variants={childVariants}>
              <label className={styles.fieldLabel} htmlFor="checkInDate">Check In</label>
              <input
                id="checkInDate"
                type="date"
                className={styles.fieldInput}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </motion.div>

            {/* Check-out date */}
            <motion.div className={styles.fieldGroup} variants={childVariants}>
              <label className={styles.fieldLabel} htmlFor="checkOutDate">Check Out</label>
              <input
                id="checkOutDate"
                type="date"
                className={styles.fieldInput}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </motion.div>

            {/* Guest count */}
            <motion.div className={styles.fieldGroup} variants={childVariants}>
              <label className={styles.fieldLabel} htmlFor="guestCount">Guests</label>
              <select
                id="guestCount"
                className={styles.fieldInput}
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
              >
                <option value="">Select guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </motion.div>

            {/* Check availability button */}
            <motion.div variants={childVariants}>
              <button
                className={`${styles.checkButton} ${isLoading ? styles.checkButtonLoading : ''}`}
                onClick={handleCheckAvailability}
              >
                {isLoading ? (
                  <>
                    <span className="spinner" />
                    Checking…
                  </>
                ) : (
                  'Check Availability'
                )}
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
