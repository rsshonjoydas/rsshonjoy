export const textVariant = (delay: any) => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

export const fadeIn = (direction: any, type: any, delay: any, duration: any) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

// fade up spring
export const fadeUpSpring = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 60,
    },
  },

  hidden: {
    opacity: 0,
    y: 200,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 60,
    },
  },
};

// fade left
export const fadeLeft = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },

  hidden: {
    opacity: 0,
    x: -200,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },
};

// fade left
export const fadeBottom = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },

  hidden: {
    opacity: 0,
    y: -200,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },
};

// fade left
export const fadeRight = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },

  hidden: {
    opacity: 0,
    x: 200,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },
};

// fade top
export const fadeTop = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },

  hidden: {
    opacity: 0,
    y: 200,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },
};

export const zoomIn = (delay: any, duration: any) => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

export const slideIn = (direction: any, type: any, delay: any, duration: any) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

export const staggerContainer = (staggerChildren: any, delayChildren: any) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren: delayChildren || 0,
    },
  },
});

// worked li
export const workedOne = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },

  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },
};

export const workedTwo = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },

  hidden: {
    opacity: 0,
    y: 100,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },
};

export const workedThree = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },

  hidden: {
    opacity: 0,
    y: 150,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  },
};

// initial step
export const motionStep = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true },
};
