"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionInViewProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
};

export function MotionInView({
  children,
  className,
  delay = 0,
  direction = "up",
}: MotionInViewProps) {
  const reduceMotion = useReducedMotion();

  const offset = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
  }[direction];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
