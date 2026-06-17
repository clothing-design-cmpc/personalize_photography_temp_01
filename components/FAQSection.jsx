'use client';

// ============================================================
// FAQSection — Animated accordion with smooth height transition
// Only one item open at a time
// Arrow rotates 180° on open
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { slideUp, containerVariants, childVariants } from '../lib/animations';
import styles from '../app/styles/faq.module.css';

function FAQItem({ item, isOpen, onToggle }) {
  const answerRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (isOpen && answerRef.current) {
      setMaxHeight(answerRef.current.scrollHeight + 'px');
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen]);

  return (
    <motion.div
      className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
      variants={childVariants}
    >
      <button
        className={styles.faqQuestion}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span>{item.question}</span>
        <span className={`${styles.faqArrow} ${isOpen ? styles.faqArrowOpen : ''}`}>
          ▾
        </span>
      </button>

      <div
        id={`faq-answer-${item.id}`}
        className={styles.faqAnswer}
        style={{ maxHeight }}
        ref={answerRef}
        role="region"
      >
        <p className={styles.faqAnswerContent}>{item.answer}</p>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [faqs, setFaqs] = useState([]);
  const [openFaqId, setOpenFaqId] = useState(null);

  useEffect(() => {
    fetch('/data/faq.json')
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch(() => setFaqs([]));
  }, []);

  function handleToggle(faqId) {
    setOpenFaqId((prev) => (prev === faqId ? null : faqId));
  }

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
          <p className="sectionEyebrow">FAQs</p>
          <h2 className="sectionHeading">Questions, answered</h2>
          <p className="sectionSubtext">
            Everything you need to know before your arrival. Can't find your answer? Write to us directly.
          </p>
        </motion.div>

        {/* FAQ accordion list */}
        <motion.div
          className={styles.faqList}
          variants={containerVariants}
          initial="initial"
          animate={isVisible ? 'animate' : 'exit'}
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              item={faq}
              isOpen={openFaqId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
