import type { Variants, Transition } from 'framer-motion';

// ─── Common Transitions ───────────────────────────────────────────────────────
export const transitions = {
  default: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  } as Transition,
  slow: {
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1],
  } as Transition,
  fast: {
    duration: 0.3,
    ease: [0.16, 1, 0.3, 1],
  } as Transition,
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as Transition,
  springBounce: {
    type: 'spring',
    stiffness: 400,
    damping: 20,
  } as Transition,
};

// ─── Fade Variants ────────────────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.default,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.default,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.default,
  },
};

// ─── Scale Variants ───────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.springBounce,
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.default,
  },
};

// ─── Container Stagger ────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// ─── Text Animations ──────────────────────────────────────────────────────────
export const textReveal: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const charReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.02,
    },
  }),
};

export const wordReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.06,
    },
  }),
};

// ─── Clip Path Animations ─────────────────────────────────────────────────────
export const clipRevealUp: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const clipRevealLeft: Variants = {
  hidden: { clipPath: 'inset(0% 0% 0% 100%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ─── Card Animations ──────────────────────────────────────────────────────────
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.1,
    },
  }),
};

// ─── Drawer / Slide Animations ────────────────────────────────────────────────
export const slideInRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: '0%',
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: '0%',
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

// ─── Page Transitions ─────────────────────────────────────────────────────────
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

// ─── Loader Animations ────────────────────────────────────────────────────────
export const loaderExit: Variants = {
  visible: { y: '0%', opacity: 1 },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.7, 0, 0.84, 0],
      delay: 0.2,
    },
  },
};

// ─── Hover Variants ───────────────────────────────────────────────────────────
export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } },
};

export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } },
};

// ─── Number Counter Animation ─────────────────────────────────────────────────
export const counterVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Blur Reveal ─────────────────────────────────────────────────────────────
export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
