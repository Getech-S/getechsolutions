"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
};

/** Elegant slide-up / fade / scale-in on scroll, triggered once. */
export function Reveal({
  children,
  type = "up",
  delay = 0,
  duration = 0.9,
  className,
}: {
  children: ReactNode;
  type?: "up" | "fade" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants[type]}
      transition={{ duration, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
