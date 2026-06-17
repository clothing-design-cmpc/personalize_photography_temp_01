// ============================================================
// ANIMATIONS — Centralized Motion animation config
// Reusable variants for fade, slide, scale, and stagger effects
// All variants include exit states for scroll-up fade-out
// ============================================================

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit:    { opacity: 0, transition: { duration: 0.4 } },
};

export const fadeInSlow = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.2 } },
  exit:    { opacity: 0, transition: { duration: 0.6 } },
};

export const slideUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.8, ease: 'easeOut' } },
  exit:    { opacity: 0, y: 40, transition: { duration: 0.5, ease: 'easeIn'  } },
};

export const slideUpFast = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.6, ease: 'easeOut' } },
  exit:    { opacity: 0, y: 30, transition: { duration: 0.4, ease: 'easeIn'  } },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0,   transition: { duration: 0.6, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -40, transition: { duration: 0.4, ease: 'easeIn'  } },
};

export const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0,  transition: { duration: 0.6, ease: 'easeOut' } },
  exit:    { opacity: 0, x: 40, transition: { duration: 0.4, ease: 'easeIn'  } },
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1,   transition: { duration: 0.6, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.9, transition: { duration: 0.4, ease: 'easeIn'  } },
};

export const scaleBounce = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 15, duration: 0.8 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4, ease: 'easeIn' } },
};

// Container variant — triggers stagger on children
export const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

// Container with longer stagger for card grids
export const cardContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

// Child item for use inside containerVariants
export const childVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.6, ease: 'easeOut' } },
  exit:    { opacity: 0, y: 20, transition: { duration: 0.3, ease: 'easeIn'  } },
};

// Card child — scale + slide
export const cardChildVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1,   y: 0,  transition: { duration: 0.6, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.3, ease: 'easeIn'  } },
};

// Page-level transition wrapper
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
};
