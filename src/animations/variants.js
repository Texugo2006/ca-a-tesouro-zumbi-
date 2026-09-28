// Animation variants for characters and UI components
export const characterAnimations = {
  kael: {
    idle: {
      y: [0, -4, 0],
      rotate: [0, -0.5, 0],
      transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
    },
    entry: {
      scale: [0, 1.2, 1],
      opacity: [0, 1],
      y: [30, -5, 0],
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    success: {
      y: [0, -18, -4, -12, 0],
      rotate: [0, -8, 8, -4, 0],
      scale: [1, 1.15, 1.05, 1.1, 1],
      transition: { duration: 0.8, ease: 'backOut' }
    },
    error: {
      x: [0, -12, 12, -8, 8, 0],
      rotate: [0, -5, 5, -3, 3, 0],
      transition: { duration: 0.5 }
    },
    special: {
      scale: [1, 1.25, 1.15],
      x: [0, -20, 35, 0],
      rotate: [0, -15, 20, 0],
      transition: { duration: 0.7, times: [0, 0.3, 0.6, 1] }
    },
    clue: {
      scale: [1, 1.12, 1],
      y: [0, -8, 0],
      transition: { duration: 0.6, repeat: 2 }
    }
  },

  shadow: {
    idle: {
      opacity: [0.85, 1, 0.85],
      y: [0, -5, 0],
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
    },
    entry: {
      opacity: [0, 0, 1],
      scale: [0.3, 1.3, 1],
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
    success: {
      y: [0, -25, 0],
      scale: [1, 1.2, 1],
      opacity: [1, 0.4, 1],
      transition: { duration: 0.6, times: [0, 0.5, 1] }
    },
    error: {
      x: [0, -10, 10, -6, 6, 0],
      opacity: [1, 0.5, 0.8, 1],
      transition: { duration: 0.45 }
    },
    special: {
      opacity: [1, 0.1, 0.9, 0.2, 1],
      x: [0, 40, -40, 20, 0],
      scale: [1, 1.2, 0.9, 1.1, 1],
      transition: { duration: 0.8 }
    },
    clue: {
      scale: [1, 1.15, 1],
      filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
      transition: { duration: 0.7 }
    }
  },

  lyra: {
    idle: {
      y: [0, -6, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    },
    entry: {
      scale: [0.4, 1.1, 1],
      rotate: [-180, 10, 0],
      opacity: [0, 1],
      transition: { duration: 0.7 }
    },
    success: {
      y: [0, -15, 0],
      scale: [1, 1.18, 1],
      rotate: [0, 360],
      transition: { duration: 0.9, ease: 'easeInOut' }
    },
    error: {
      x: [0, -8, 8, -4, 4, 0],
      rotate: [0, -4, 4, 0],
      transition: { duration: 0.5 }
    },
    special: {
      scale: [1, 1.3, 1.2],
      rotate: [0, -15, 15, -5, 0],
      filter: ['drop-shadow(0 0 0px #F4C542)', 'drop-shadow(0 0 25px #6DD5FA)', 'drop-shadow(0 0 10px #F4C542)'],
      transition: { duration: 1 }
    },
    clue: {
      y: [0, -10, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 0.6 }
    }
  },

  redd: {
    idle: {
      y: [0, -3, 0],
      rotate: [0, 1, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    },
    entry: {
      x: [-60, 10, 0],
      opacity: [0, 1],
      transition: { duration: 0.6 }
    },
    success: {
      y: [0, -20, 0],
      rotate: [0, 12, -12, 5, 0],
      scale: [1, 1.2, 1],
      transition: { duration: 0.75 }
    },
    error: {
      x: [0, -10, 10, -5, 5, 0],
      y: [0, 4, 0],
      transition: { duration: 0.5 }
    },
    special: {
      scale: [1, 1.25, 1],
      x: [0, -15, 25, 0],
      rotate: [0, -10, 15, 0],
      transition: { duration: 0.8 }
    },
    clue: {
      scale: [1, 1.15, 1],
      transition: { duration: 0.5 }
    }
  },

  hana: {
    idle: {
      y: [0, -2, 0],
      transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
    },
    entry: {
      scale: [0.8, 1],
      opacity: [0, 1],
      transition: { duration: 0.8, ease: 'easeOut' }
    },
    success: {
      y: [0, -12, 0],
      scale: [1, 1.1, 1],
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.7 }
    },
    error: {
      x: [0, -6, 6, -3, 3, 0],
      transition: { duration: 0.4 }
    },
    special: {
      x: [0, -30, 40, 0],
      scale: [1, 1.15, 1],
      transition: { duration: 0.65, ease: 'easeInOut' }
    },
    clue: {
      y: [0, -6, 0],
      transition: { duration: 0.5 }
    }
  },

  zira: {
    idle: {
      y: [0, -4, 0],
      transition: { duration: 2.1, repeat: Infinity, ease: 'easeInOut' }
    },
    entry: {
      y: [-50, 5, 0],
      opacity: [0, 1],
      transition: { duration: 0.6 }
    },
    success: {
      y: [0, -16, 0],
      scale: [1, 1.15, 1],
      rotate: [0, 8, -8, 0],
      transition: { duration: 0.7 }
    },
    error: {
      x: [0, -8, 8, 0],
      transition: { duration: 0.4 }
    },
    special: {
      scale: [1, 0.95, 1.25, 1],
      x: [0, -15, 30, 0],
      transition: { duration: 0.7 }
    },
    clue: {
      scale: [1, 1.12, 1],
      transition: { duration: 0.5 }
    }
  },

  nova: {
    idle: {
      y: [0, -3, 0],
      rotate: [0, 1, -1, 0],
      transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
    },
    entry: {
      scale: [0.5, 1.1, 1],
      opacity: [0, 1],
      transition: { duration: 0.6 }
    },
    success: {
      y: [0, -15, 0],
      rotate: [0, -10, 10, 0],
      scale: [1, 1.15, 1],
      transition: { duration: 0.75 }
    },
    error: {
      x: [0, -8, 8, -4, 4, 0],
      transition: { duration: 0.5 }
    },
    special: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: { duration: 0.9, ease: 'easeInOut' }
    },
    clue: {
      scale: [1, 1.2, 1],
      y: [0, -8, 0],
      transition: { duration: 0.6 }
    }
  },

  brak: {
    idle: {
      y: [0, -2, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    },
    entry: {
      y: [-80, 0],
      scale: [0.7, 1.1, 1],
      opacity: [0, 1],
      transition: { duration: 0.6, ease: 'bounceOut' }
    },
    success: {
      y: [0, -15, 0],
      scale: [1, 1.2, 1],
      transition: { duration: 0.6 }
    },
    error: {
      x: [0, -10, 10, 0],
      transition: { duration: 0.4 }
    },
    special: {
      y: [0, -30, 8, 0],
      scale: [1, 1.25, 1.1, 1],
      transition: { duration: 0.75 }
    },
    clue: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.5 }
    }
  },

  teo: {
    idle: {
      y: [0, -3, 0],
      transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
    },
    entry: {
      opacity: [0, 1],
      scale: [0.8, 1],
      transition: { duration: 0.6 }
    },
    success: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.12, 1],
      transition: { duration: 0.7 }
    },
    error: {
      x: [0, -6, 6, -3, 3, 0],
      transition: { duration: 0.4 }
    },
    special: {
      scale: [1, 1.15, 1],
      filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1)'],
      transition: { duration: 0.8 }
    },
    clue: {
      y: [0, -6, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 0.5 }
    }
  },

  vesper: {
    idle: {
      y: [0, -4, 0],
      rotate: [0, -1, 1, 0],
      transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
    },
    entry: {
      x: [50, -8, 0],
      opacity: [0, 1],
      transition: { duration: 0.5 }
    },
    success: {
      y: [0, -18, 0],
      scale: [1, 1.2, 1],
      rotate: [0, -12, 12, 0],
      transition: { duration: 0.7 }
    },
    error: {
      x: [0, -10, 10, 0],
      transition: { duration: 0.45 }
    },
    special: {
      x: [0, -25, 30, -10, 0],
      scale: [1, 1.2, 1],
      transition: { duration: 0.7 }
    },
    clue: {
      scale: [1, 1.15, 1],
      transition: { duration: 0.5 }
    }
  }
};

export const pageTransitions = {
  initial: { opacity: 0, scale: 0.96, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 1.02, y: -10, transition: { duration: 0.25, ease: 'easeIn' } }
};

export const modalTransitions = {
  initial: { opacity: 0, scale: 0.85, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'backOut' } },
  exit: { opacity: 0, scale: 0.9, y: 15, transition: { duration: 0.2 } }
};
