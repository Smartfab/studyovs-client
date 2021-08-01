export const buttonTextVariant = {
  hover: {
    backgroundColor: '#f4863a',
    color: '#fff',
    x: [1, 0],
    transition: {
      duration: 0.2,
    },
  },
}

export const buttonIconVariant = {
  hover: {
    scale: 1.2,
    x: [-10, 10],
    transition: {
      type: 'springs',
      duration: 0.5,
      mass: 0.2,
      stiffness: 0.1,
      yoyo: Infinity,
      damping: 0,
      bounce: 0.5,
    },
  },
}

export const textButtonVariant = {
  hover: {
    color: '#f4863a',
    transition: {
      duration: 0.2,
    },
  },
}

export const textButtonIconVariant = {
  hover: {
    scale: 1.2,
    x: [-10, 10],
    transition: {
      type: 'springs',
      duration: 0.5,
      mass: 0.2,
      stiffness: 0.1,
      yoyo: Infinity,
      damping: 0,
      bounce: 0.5,
    },
  },
}

export const itemContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.4,
      when: 'beforeChildren',
    },
  },
}

export const itemVariant = {
  hidden: { x: -350 },
  visible: {
    x: 0,
  },
}
