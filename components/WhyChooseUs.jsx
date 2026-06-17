'use client';

// ============================================================
// WhyChooseUs — 4-card USP grid with staggered scroll animations
// Cards animate in on scroll, hover lifts with gold border
// Uses Lucide React SVG icons (consistent stroke, no emoji)
// ============================================================

import { motion } from 'motion/react';
import { Palmtree, Leaf, BellRing, UtensilsCrossed } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { containerVariants, cardChildVariants, slideUp } from '../lib/animations';
import styles from '../app/styles/whychooseus.module.css';

const uspCards = [
  {
    id: 'exclusive',
    icon: Palmtree,
    title: 'Truly Private',
    text: 'Maximum 40 guests at any time. You will never feel like you are in a crowd — because you never are.',
  },
  {
    id: 'nature',
    icon: Leaf,
    title: 'Untouched Nature',
    text: 'Surrounded by 80 hectares of protected tropical forest, pristine lagoon, and coral reef — largely undisturbed.',
  },
  {
    id: 'service',
    icon: BellRing,
    title: 'Invisible Service',
    text: 'A personal butler learns your preferences before you arrive. Service that feels like it reads your mind.',
  },
  {
    id: 'cuisine',
    icon: UtensilsCrossed,
    title: 'Living Table',
    text: 'Our farm and sea supply 90% of what you eat. The menu changes daily with what the island offers.',
  },
];

export default function WhyChooseUs() {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className={styles.section}>
      {/* Subtle background texture */}
      <div className={styles.sectionBg} aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section heading */}
        <motion.div
          className={styles.header}
          ref={elementRef}
          variants={slideUp}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          <p className="sectionEyebrow">Why Isla Serena</p>
          <h2 className="sectionHeading">A different kind of away</h2>
          <p className="sectionSubtext">
            Most resorts promise luxury. We offer something quieter, rarer, and harder to find.
          </p>
        </motion.div>

        {/* USP card grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          {uspCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                className={styles.card}
                variants={cardChildVariants}
              >
                <div className={styles.cardIcon} aria-hidden="true">
                  <IconComponent size={36} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
