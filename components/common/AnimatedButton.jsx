'use client';

// ============================================================
// AnimatedButton — Reusable button with Motion press + hover
// Variants: primary (gold), secondary (navy outline), ghost (text)
// Supports onClick, href (renders as <a>), disabled state
// ============================================================

import { motion } from 'motion/react';
import styles from './AnimatedButton.module.css';

export default function AnimatedButton({
  children,
  variant = 'primary',   // 'primary' | 'secondary' | 'ghost'
  href,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  ariaLabel,
  ...rest
}) {
  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.05 },
    whileTap:   disabled ? {} : { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  };

  const cls = [
    styles.btn,
    styles[variant],
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={cls}
      onClick={disabled ? undefined : onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
