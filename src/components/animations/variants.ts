'use client';

import type { Variants } from "framer-motion";

const transition = {
  duration: 0.6,
  ease: [0.2, 0.8, 0.2, 1],
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition,
  },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      ...transition,
      delayChildren,
      staggerChildren,
    },
  },
});


