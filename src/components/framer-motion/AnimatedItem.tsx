"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedItemProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  delay = 0,
  duration = 0.4,
  y = 20,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedItem;
