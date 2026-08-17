"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Beats on the left, then the trace goes flat. */
const TRACE =
  "M0 60 L60 60 L74 60 L82 34 L90 86 L98 60 L150 60 L164 60 L172 36 L180 84 L188 60 L240 60 L254 60 L262 40 L270 80 L278 60 L330 60 L344 60 L352 48 L360 70 L368 60 L430 60 L1200 60";

const lines = [
  "In many communities, high blood pressure goes undetected",
  "until it becomes a crisis. Existing health trackers cost more",
  "than most families make in months. We are changing that.",
];

export function AxonProblem() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const draw = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.55, 0.9], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-meteorite/8 bg-[#010204] px-6 py-32 md:py-44"
    >
      {/* the trace runs behind the copy */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2" aria-hidden>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-40 w-full opacity-70"
        >
          <motion.path
            d={TRACE}
            fill="none"
            stroke="#2B4162"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: draw }}
          />
          <motion.path
            d={TRACE}
            fill="none"
            stroke="#e2545c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: draw, opacity: glowOpacity }}
            className="[filter:drop-shadow(0_0_10px_rgba(226,84,92,0.65))]"
            strokeDasharray="0 1"
            pathLength={1}
          />
        </svg>
      </div>

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(1,2,4,0.55),#010204_80%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-6 inline-block rounded-full border border-[#e2545c]/25 bg-[#e2545c]/5 px-4 py-1.5 text-[11px] tracking-[0.24em] text-[#e2545c]/85 uppercase"
        >
          The Problem
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.05, delay: 0.1, ease: easeOut }}
          className="font-heading text-[clamp(2.25rem,6vw,4.25rem)] font-bold tracking-tight text-white text-balance"
        >
          The Silent Killer.
        </motion.h2>

        <div className="mt-9 space-y-1.5">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.85, delay: 0.25 + i * 0.14, ease: easeOut }}
              className="text-base leading-relaxed text-meteorite sm:text-lg"
            >
              {line}
            </motion.p>
          ))}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.9, delay: 0.72, ease: easeOut }}
            className="pt-3 text-lg font-semibold text-white sm:text-xl"
          >
            Axon catches the warning signs before it&apos;s too late.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
