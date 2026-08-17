"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Beats on the left, then the trace goes flat. */
const TRACE =
  "M0 60 L60 60 L74 60 L82 34 L90 86 L98 60 L150 60 L164 60 L172 36 L180 84 L188 60 L240 60 L254 60 L262 40 L270 80 L278 60 L330 60 L344 60 L352 48 L360 70 L368 60 L430 60 L1200 60";

const lines = [
  "High blood pressure is the leading cause of stroke — and it arrives without a sound.",
  "No pain. No symptoms. Nothing to feel, until the moment it takes something from you: your speech, your movement, your independence, your life.",
  "The warning signs are there for weeks beforehand. Almost nobody is being watched closely enough to see them.",
];

const stakes = [
  {
    label: "Silent",
    accent: "#e2545c",
    body: "Hypertension usually carries no symptoms at all. You cannot feel your pressure climbing toward a crisis.",
  },
  {
    label: "Sudden",
    accent: "#e2545c",
    body: "When a stroke comes, damage is measured in minutes — and the brain tissue lost does not grow back.",
  },
  {
    label: "Preventable",
    accent: "#7dd3fc",
    body: "Caught early, dangerous pressure is treatable. The vast majority of strokes never have to happen at all.",
  },
];

export function AxonProblem() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });

  const draw = useTransform(scrollYProgress, [0.15, 0.9], [0, 1]);
  const flatlineGlow = useTransform(scrollYProgress, [0.6, 0.95], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-meteorite/8 bg-[#010204] px-6 py-28 md:py-40"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_35%,rgba(43,65,98,0.14),transparent_75%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl">
        {/* ——— the case ——— */}
        <div className="text-center">
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

          <div className="mx-auto mt-9 max-w-2xl space-y-5">
            {lines.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{
                  duration: 0.85,
                  delay: 0.25 + i * 0.16,
                  ease: easeOut,
                }}
                className="text-base leading-relaxed text-meteorite sm:text-lg"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        {/* ——— the trace: its own band, so nothing sits on top of it ——— */}
        <div className="relative my-14 md:my-16" aria-hidden>
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-24 w-full md:h-28"
          >
            <motion.path
              d={TRACE}
              fill="none"
              stroke="#2B4162"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: draw }}
            />
            <motion.path
              d={TRACE}
              fill="none"
              stroke="#e2545c"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: draw, opacity: flatlineGlow }}
              className="[filter:drop-shadow(0_0_12px_rgba(226,84,92,0.7))]"
            />
          </svg>
          {/* fade the trace into the page at both edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#010204] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#010204] to-transparent" />
        </div>

        {/* ——— the turn ——— */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.95, ease: easeOut }}
          className="mx-auto max-w-3xl text-center text-[clamp(1.35rem,2.8vw,2rem)] leading-snug font-semibold text-white text-balance"
        >
          Axon watches for those signs — and gets a doctor involved while there
          is still time to act.
        </motion.p>

        {/* ——— the stakes ——— */}
        <div className="mt-16 grid gap-4 text-left sm:grid-cols-3">
          {stakes.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                duration: 0.8,
                delay: 0.12 + i * 0.13,
                ease: easeOut,
              }}
              className="flex flex-col rounded-2xl border border-meteorite/12 bg-gradient-to-b from-white/[0.03] to-transparent p-6"
            >
              <span
                className="mb-4 block h-px w-9"
                style={{ backgroundColor: s.accent }}
              />
              <p
                className="mb-3 text-[10px] tracking-[0.26em] uppercase"
                style={{ color: s.accent }}
              >
                {s.label}
              </p>
              <p className="text-sm leading-relaxed text-meteorite">{s.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ——— cost, as the thing that makes reach possible ——— */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mt-14 max-w-2xl border-t border-meteorite/10 pt-8 text-center text-sm leading-relaxed text-meteorite/85"
        >
          Axon is also being built to cost a fraction of a clinical monitor —
          because a warning system that only reaches the wealthy isn&apos;t much
          of a warning system.
        </motion.p>
      </div>
    </section>
  );
}
