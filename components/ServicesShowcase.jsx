'use client';

// ============================================================
// ServicesShowcase — Tabbed service cards on parallax background
// Tab click fades out current content and fades in new content
// Cards stagger on tab switch and on first scroll-in
// Uses Lucide React SVG icons (consistent stroke, no emoji)
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Leaf, CircleDot, Flower2, Candle, ChefHat, GlassWater,
  Anchor, Mountain, Fish,
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { slideUp, cardContainerVariants, childVariants } from '../lib/animations';
import styles from '../app/styles/services.module.css';

// Map icon name strings from JSON to Lucide components
const iconMap = {
  Leaf, CircleDot, Flower2, Candle, ChefHat, GlassWater,
  Anchor, Mountain, Fish,
};

export default function ServicesShowcase() {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [servicesData, setServicesData] = useState(null);
  const [activeTabId, setActiveTabId] = useState('wellness');

  // Load services data from JSON
  useEffect(() => {
    fetch('/data/services.json')
      .then((res) => res.json())
      .then((data) => {
        setServicesData(data);
        if (data.tabs?.[0]) setActiveTabId(data.tabs[0].id);
      })
      .catch(() => setServicesData(null));
  }, []);

  // Get currently active tab services
  const activeTab = servicesData?.tabs?.find((tab) => tab.id === activeTabId);

  return (
    <section id="services" className={styles.section}>
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
          <p className="sectionEyebrow" style={{ color: 'var(--color-accent-gold)' }}>Experiences</p>
          <h2 className="sectionHeadingLight">Every day, something to remember</h2>
          <p className="sectionSubtext" style={{ color: 'rgba(255,255,255,0.7)' }}>
            From deep-tissue healing to cliff-edge dining — curated for those who want more than a sunlounger.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          className={styles.tabs}
          variants={cardContainerVariants}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          {servicesData?.tabs?.map((tab) => (
            <motion.button
              key={tab.id}
              className={`${styles.tab} ${activeTabId === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTabId(tab.id)}
              variants={childVariants}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Animated service cards — fade when tab changes */}
        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div
              key={activeTabId}
              className={styles.serviceGrid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {activeTab.services.map((service, serviceIndex) => {
                // Resolve icon component from string name
                const IconComponent = iconMap[service.icon];
                return (
                  <motion.div
                    key={service.id}
                    className={styles.serviceCard}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
                  >
                    <div className={styles.serviceIcon} aria-hidden="true">
                      {IconComponent && (
                        <IconComponent size={28} strokeWidth={1.5} />
                      )}
                    </div>
                    <h3 className={styles.serviceName}>{service.name}</h3>
                    <p className={styles.serviceDuration}>{service.duration}</p>
                    <p className={styles.serviceDescription}>{service.description}</p>
                    <button
                      className={styles.learnMoreLink}
                      onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Enquire →
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
