"use client";

import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { ReactNode } from "react";
import {
  defaultVariants,
  fadeVariants,
  slideRightVariants,
  slideLeftVariants,
  slideUpVariants,
  slideDownVariants,
  scaleVariants,
  transitionConfig,
} from "./PageTransitionVariants";

type TransitionType =
  | "default"
  | "fade"
  | "slideRight"
  | "slideLeft"
  | "slideUp"
  | "slideDown"
  | "scale";
type TransitionSpeed = "default" | "fast" | "slow" | "spring";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  variant?: TransitionType;
  speed?: TransitionSpeed;
}

const variantMap: Record<TransitionType, Variants> = {
  default: defaultVariants,
  fade: fadeVariants,
  slideRight: slideRightVariants,
  slideLeft: slideLeftVariants,
  slideUp: slideUpVariants,
  slideDown: slideDownVariants,
  scale: scaleVariants,
};

export default function PageTransition({
  children,
  className,
  variant = "default",
  speed = "default",
}: PageTransitionProps) {
  const variants = variantMap[variant];
  const transition = transitionConfig[speed];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transition as Transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Wrapper untuk AnimatePresence jika diperlukan
interface AnimatedPageWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: TransitionType;
  speed?: TransitionSpeed;
}

export function AnimatedPageWrapper({
  children,
  className,
  variant = "default",
  speed = "default",
}: AnimatedPageWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition className={className} variant={variant} speed={speed}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}
