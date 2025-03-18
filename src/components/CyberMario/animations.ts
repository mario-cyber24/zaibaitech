import { Variants } from 'framer-motion';

export const chatWindowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

export const messageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    x: 0,
  },
  visible: (custom: 'user' | 'bot') => ({
    opacity: 1,
    y: 0,
    x: custom === 'user' ? [20, 0] : [-20, 0],
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 40,
    },
  }),
};

export const toolPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    x: '100%',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.2,
    },
  },
};

export const typingIndicatorVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 40,
    },
  },
};

export const optionButtonVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 40,
    },
  },
  hover: {
    scale: 1.02,
    backgroundColor: '#f3f4f6',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20,
    },
  },
  tap: {
    scale: 0.98,
  },
};

export const chatButtonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.9,
  },
};