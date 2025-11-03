import { Variants } from "framer-motion";

// Fade transition
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Slide from right
export const slideRightVariants: Variants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

// Slide from left
export const slideLeftVariants: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

// Slide from bottom
export const slideUpVariants: Variants = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
};

// Slide from top
export const slideDownVariants: Variants = {
  initial: { y: "-100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "100%", opacity: 0 },
};

// Scale transition
export const scaleVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

// Default transition (fade + slide up)
export const defaultVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Transition configurations
export const transitionConfig = {
  default: {
    type: "tween" as const,
    ease: "easeInOut" as const,
    duration: 0.3,
  },
  fast: {
    type: "tween" as const,
    ease: "easeInOut" as const,
    duration: 0.2,
  },
  slow: {
    type: "tween" as const,
    ease: "easeInOut" as const,
    duration: 0.5,
  },
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
};
