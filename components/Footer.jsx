'use client';

// ============================================================
// Footer — Dark resort footer with brand column and 3 link columns
// Social icons hover to gold, subtle parallax background texture
// ============================================================

import { motion } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { slideUp, containerVariants, childVariants } from '../lib/animations';
import styles from '../app/styles/footer.module.css';

const footerLinks = {
  explore: [
    { label: 'Our Story', href: '#home' },
    { label: 'Rooms & Villas', href: '#rooms' },
    { label: 'Dining', href: '#services' },
    { label: 'Spa & Wellness', href: '#services' },
    { label: 'Adventures', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
  ],
  plan: [
    { label: 'Check Availability', href: '#booking' },
    { label: 'Group Bookings', href: '#contact' },
    { label: 'Weddings & Events', href: '#contact' },
    { label: 'Getting Here', href: '#contact' },
    { label: 'FAQs', href: '#faqs' },
  ],
  contact: [
    { label: 'hello@islaserena.com.ph', href: 'mailto:hello@islaserena.com.ph' },
    { label: '+63 917 888 5678', href: 'tel:+639178885678' },
    { label: 'WhatsApp Us', href: 'https://wa.me/639178885678' },
    { label: 'Palawan, Philippines', href: '#' },
  ],
};

const socialIcons = [
  { icon: '𝕏', label: 'X / Twitter', href: '#' },
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '📘', label: 'Facebook', href: '#' },
  { icon: '▶', label: 'YouTube', href: '#' },
];

export default function Footer() {
  const { elementRef, isVisible } = useIntersectionObserver();

  function handleNavClick(href) {
    if (href.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBg} aria-hidden="true" />

      <div className={`container ${styles.footerContent}`}>
        <motion.div
          className={styles.topRow}
          ref={elementRef}
          variants={containerVariants}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          {/* Brand column */}
          <motion.div className={styles.brandColumn} variants={childVariants}>
            <div className={styles.footerLogo}>Isla Serena</div>
            <p className={styles.footerTagline}>
              A private island sanctuary where nature, silence, and luxury exist without compromise.
            </p>
            {/* Social links */}
            <div className={styles.socialLinks}>
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialIcon}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Explore links */}
          <motion.div className={styles.linkColumn} variants={childVariants}>
            <p className={styles.linkColumnTitle}>Explore</p>
            <ul className={styles.linkList}>
              {footerLinks.explore.map((link) => (
                <li key={link.label} className={styles.linkItem}>
                  <button onClick={() => handleNavClick(link.href)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Plan links */}
          <motion.div className={styles.linkColumn} variants={childVariants}>
            <p className={styles.linkColumnTitle}>Plan Your Visit</p>
            <ul className={styles.linkList}>
              {footerLinks.plan.map((link) => (
                <li key={link.label} className={styles.linkItem}>
                  <button onClick={() => handleNavClick(link.href)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact links */}
          <motion.div className={styles.linkColumn} variants={childVariants}>
            <p className={styles.linkColumnTitle}>Contact</p>
            <ul className={styles.linkList}>
              {footerLinks.contact.map((link) => (
                <li key={link.label} className={styles.linkItem}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className={styles.bottomRow}
          variants={slideUp}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
          transition={{ delay: 0.3 }}
        >
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Isla Serena Private Resort. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
            <a href="#" className={styles.legalLink}>Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
