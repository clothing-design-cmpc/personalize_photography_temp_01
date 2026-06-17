'use client';

// ============================================================
// LocationMap — Embedded map with staggered contact info cards
// Cards slide in from right on scroll reveal
// Contact links color-shift to gold on hover
// ============================================================

import { motion } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { slideUp, slideInRight, containerVariants, childVariants } from '../lib/animations';
import styles from '../app/styles/location.module.css';

const contactInfoItems = [
  {
    id: 'address',
    icon: '📍',
    label: 'Address',
    value: 'Isla Serena Private Resort\nPuerto Princesa Area, Palawan, Philippines',
  },
  {
    id: 'phone',
    icon: '📞',
    label: 'Phone & WhatsApp',
    value: '+63 917 888 5678',
  },
  {
    id: 'email',
    icon: '✉️',
    label: 'Email',
    value: 'hello@islaserena.com.ph',
  },
  {
    id: 'arrival',
    icon: '✈️',
    label: 'Getting Here',
    value: 'Fly to Puerto Princesa or El Nido. Private transfers arranged.',
  },
];

export default function LocationMap() {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Section heading */}
        <motion.div
          className={styles.header}
          ref={elementRef}
          variants={slideUp}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          <p className="sectionEyebrow">Location</p>
          <h2 className="sectionHeading">Find your way to us</h2>
          <p className="sectionSubtext">
            Tucked into the northern coast of Palawan — the last true frontier. Getting here is part of the adventure.
          </p>
        </motion.div>

        {/* Map and info grid */}
        <div className={styles.contentGrid}>
          {/* Map embed */}
          <motion.div
            className={styles.mapEmbed}
            variants={slideUp}
            initial="initial"
            animate={isVisible ? 'animate' : 'exit'}
            transition={{ delay: 0.2 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992374.9453574857!2d117.17427177143975!3d9.83488977424698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3256abb5c0c43df3%3A0xa8e76ff6d2b2aac5!2sPalawan%2C%20Philippines!5e0!3m2!1sen!2sus!4v1699900000000!5m2!1sen!2sus"
              title="Isla Serena Resort Location on Map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Contact info cards */}
          <motion.div
            className={styles.infoCards}
            variants={containerVariants}
            initial="initial"
            animate={isVisible ? 'animate' : 'exit'}
          >
            {contactInfoItems.map((item) => (
              <motion.div
                key={item.id}
                className={styles.infoCard}
                variants={slideInRight}
              >
                <span className={styles.infoCardIcon}>{item.icon}</span>
                <div>
                  <p className={styles.infoCardLabel}>{item.label}</p>
                  <p className={styles.infoCardValue} style={{ whiteSpace: 'pre-line' }}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
