export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export const fadeInUp = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const fadeInDown = {
  hidden: { 
    opacity: 0,
    y: -20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const fadeInLeft = {
  hidden: { 
    opacity: 0,
    x: -20
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const fadeInRight = {
  hidden: { 
    opacity: 0,
    x: 20
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const slideUp = {
  hidden: { 
    y: 100,
    opacity: 0
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const zoomIn = {
  hidden: { 
    scale: 0.8,
    opacity: 0
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export const staggerChildren = (delay = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: delay
    }
  }
});
