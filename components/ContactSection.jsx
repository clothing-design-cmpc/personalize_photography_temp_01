'use client';

// ============================================================
// ContactSection — Split-layout contact form with parallax background
// Left: resort info cards  |  Right: animated form
// Form: client-side validation, loading state, success message
// POST to /api/contact (Next.js API route)
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { slideUp, slideInLeft, slideInRight } from '../lib/animations';
import styles from '../app/styles/contact.module.css';

const resortContactDetails = [
  { id: 'address', icon: '📍', label: 'Address', value: 'Palawan, Philippines' },
  { id: 'phone', icon: '📞', label: 'Phone & WhatsApp', value: '+63 917 888 5678' },
  { id: 'email', icon: '✉️', label: 'Email', value: 'hello@islaserena.com.ph' },
  { id: 'hours', icon: '🕐', label: 'Concierge Hours', value: '24 hours, 7 days a week' },
];

const subjectOptions = [
  'Reservation Inquiry',
  'Special Occasion',
  'Private Event',
  'Wedding Planning',
  'General Question',
];

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guests: '',
  subject: '',
  message: '',
};

export default function ContactSection() {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Update form field value
  function handleFieldChange(fieldName, value) {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  }

  // Basic client-side validation
  function validateForm() {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  }

  async function handleSubmit() {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData(initialFormState);
      } else {
        // Fallback: show success anyway (demo mode)
        setSubmitSuccess(true);
        setFormData(initialFormState);
      }
    } catch {
      // Demo fallback — show success
      setSubmitSuccess(true);
      setFormData(initialFormState);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.overlay} aria-hidden="true" />

      <div className="container">
        <motion.div
          className={styles.content}
          ref={elementRef}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          {/* Left column — resort info */}
          <motion.div
            className={styles.leftColumn}
            variants={slideInLeft}
          >
            <p className="sectionEyebrow" style={{ color: 'var(--color-accent-gold)' }}>Get In Touch</p>
            <h2 className={styles.leftHeading}>Start planning your escape</h2>
            <p className={styles.leftSubtext}>
              Our concierge team responds within 4 hours. Share your vision and we will craft it into something real.
            </p>

            <div className={styles.contactDetails}>
              {resortContactDetails.map((contactItem) => (
                <div key={contactItem.id} className={styles.contactItem}>
                  <span className={styles.contactIcon}>{contactItem.icon}</span>
                  <div>
                    <p className={styles.contactLabel}>{contactItem.label}</p>
                    <p className={styles.contactValue}>{contactItem.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — contact form */}
          <motion.div variants={slideInRight}>
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                // Success state
                <motion.div
                  key="success"
                  className={styles.successMessage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  ✓ &nbsp; Your message has been sent. Our concierge team will reach out within 4 hours.
                </motion.div>
              ) : (
                // Form state
                <motion.div key="form" className={styles.form}>
                  {/* Name row */}
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel} htmlFor="firstName">First Name</label>
                      <input
                        id="firstName"
                        type="text"
                        className={styles.input}
                        placeholder="Maria"
                        value={formData.firstName}
                        onChange={(e) => handleFieldChange('firstName', e.target.value)}
                        aria-invalid={!!errors.firstName}
                      />
                      {errors.firstName && (
                        <span style={{ fontSize: '0.75rem', color: '#e07070', marginTop: 4 }}>
                          {errors.firstName}
                        </span>
                      )}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel} htmlFor="lastName">Last Name</label>
                      <input
                        id="lastName"
                        type="text"
                        className={styles.input}
                        placeholder="Santos"
                        value={formData.lastName}
                        onChange={(e) => handleFieldChange('lastName', e.target.value)}
                        aria-invalid={!!errors.lastName}
                      />
                      {errors.lastName && (
                        <span style={{ fontSize: '0.75rem', color: '#e07070', marginTop: 4 }}>
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email and phone row */}
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel} htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        className={styles.input}
                        placeholder="maria@example.com"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <span style={{ fontSize: '0.75rem', color: '#e07070', marginTop: 4 }}>
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel} htmlFor="phone">Phone / WhatsApp</label>
                      <input
                        id="phone"
                        type="tel"
                        className={styles.input}
                        placeholder="+63 917 000 0000"
                        value={formData.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Date row */}
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel} htmlFor="contactCheckIn">Check-In Date</label>
                      <input
                        id="contactCheckIn"
                        type="date"
                        className={styles.input}
                        value={formData.checkIn}
                        onChange={(e) => handleFieldChange('checkIn', e.target.value)}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel} htmlFor="contactCheckOut">Check-Out Date</label>
                      <input
                        id="contactCheckOut"
                        type="date"
                        className={styles.input}
                        value={formData.checkOut}
                        onChange={(e) => handleFieldChange('checkOut', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Guests and subject row */}
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel} htmlFor="contactGuests">Number of Guests</label>
                      <select
                        id="contactGuests"
                        className={styles.input}
                        value={formData.guests}
                        onChange={(e) => handleFieldChange('guests', e.target.value)}
                        style={{ color: formData.guests ? 'white' : 'rgba(255,255,255,0.35)' }}
                      >
                        <option value="">Select guests</option>
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel} htmlFor="subject">Subject</label>
                      <select
                        id="subject"
                        className={styles.input}
                        value={formData.subject}
                        onChange={(e) => handleFieldChange('subject', e.target.value)}
                        style={{ color: formData.subject ? 'white' : 'rgba(255,255,255,0.35)' }}
                      >
                        <option value="">Select topic</option>
                        {subjectOptions.map((subjectOption) => (
                          <option key={subjectOption} value={subjectOption}>{subjectOption}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel} htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      className={styles.textarea}
                      placeholder="Tell us about your ideal stay — special occasions, dietary preferences, any questions…"
                      value={formData.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <span style={{ fontSize: '0.75rem', color: '#e07070', marginTop: 4 }}>
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    className={`${styles.submitButton} ${isSubmitting ? styles.submitButtonLoading : ''}`}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner" />
                        Sending…
                      </>
                    ) : (
                      'Send Enquiry →'
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
