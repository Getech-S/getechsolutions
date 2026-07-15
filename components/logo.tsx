"use client";

import { motion } from "framer-motion";

/**
 * "The Alignment" — a single open crescent arc cradling a floating focal dot.
 * Focus, precision, and a singular perfect solution entering an ecosystem.
 */
export function AlignmentLogo({
  size = 36,
  animated = true,
}: {
  size?: number;
  animated?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="GeTech Solutions — The Alignment"
      role="img"
    >
      <defs>
        <linearGradient id="arcGradient" x1="8" y1="40" x2="40" y2="12">
          <stop offset="0%" stopColor="#2B4162" />
          <stop offset="55%" stopColor="#9BA4B2" />
          <stop offset="100%" stopColor="#D1D5DB" />
        </linearGradient>
        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The open crescent — cradle of the solution */}
      <path
        d="M 40.5 24 A 16.5 16.5 0 1 1 24 7.5"
        stroke="url(#arcGradient)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Soft glow halo behind the focal dot */}
      <circle cx="34.5" cy="10.5" r="8" fill="url(#dotGlow)" opacity="0.35" />

      {/* The focal dot — the singular perfect solution */}
      {animated ? (
        <motion.circle
          cx="34.5"
          cy="10.5"
          r="4"
          fill="#FFFFFF"
          animate={{ opacity: [1, 0.6, 1], r: [4, 4.4, 4] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <circle cx="34.5" cy="10.5" r="4" fill="#FFFFFF" />
      )}
    </svg>
  );
}
