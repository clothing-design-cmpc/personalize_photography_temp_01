'use client';

// ============================================================
// Header — Sticky navigation bar
// Transparent on load, becomes solid on scroll
// Mobile: hamburger with slide-out drawer
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from '../app/styles/header.module.css';

const navigationItems = [
  { label: 'Home', href: '#home' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Dining', href: '#services' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll and toggle solid background
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Smooth scroll to section anchor
  function handleNavClick(href) {
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <motion.header
        className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo */}
        <div
          className={`${styles.logo} ${isScrolled ? styles.logoScrolled : ''}`}
          onClick={() => handleNavClick('#home')}
        >
          Isla Serena
        </div>

        {/* Desktop navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          {navigationItems.map((navItem) => (
            <button
              key={navItem.label}
              className={`${styles.navLink} ${isScrolled ? styles.navLinkScrolled : ''}`}
              onClick={() => handleNavClick(navItem.href)}
            >
              {navItem.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          className={styles.ctaButton}
          onClick={() => handleNavClick('#booking')}
        >
          Book Now
        </button>

        {/* Hamburger button for mobile */}
        <button
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ display: 'none' }}
          id="hamburgerButton"
        >
          <span className={`${styles.hamburgerBar} ${isScrolled ? styles.hamburgerBarScrolled : ''}`} />
          <span className={`${styles.hamburgerBar} ${isScrolled ? styles.hamburgerBarScrolled : ''}`} />
          <span className={`${styles.hamburgerBar} ${isScrolled ? styles.hamburgerBarScrolled : ''}`} />
        </button>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile slide-out drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {navigationItems.map((navItem, index) => (
              <motion.button
                key={navItem.label}
                className={styles.mobileNavLink}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNavClick(navItem.href)}
              >
                {navItem.label}
              </motion.button>
            ))}
            <button
              className={styles.mobileCtaButton}
              onClick={() => handleNavClick('#booking')}
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inject responsive display rules via style tag */}
      <style>{`
        @media (max-width: 768px) {
          nav[aria-label="Main navigation"],
          header > button:not(#hamburgerButton) {
            display: none !important;
          }
          #hamburgerButton {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
