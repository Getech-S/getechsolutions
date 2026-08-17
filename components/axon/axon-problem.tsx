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
    body: "Hypertension usually carries no symptoms at all. You cannot feel your pressure climbing toward a crisis.",
  },
  {
    label: "Sudden",
    body: "When a stroke comes, damage is measured in minutes. Every one that passes costs brain tissue that does not grow back.",
  },
  {
    label: "Preventable",
    body: "Caught early, dangerous pressure is treatable. The vast majority of strokes never have to happen at all.",
  },
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

        <div className="mx-auto mt-9 max-w-2xl space-y-5">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.85, delay: 0.25 + i * 0.16, ease: easeOut }}
              className="text-base leading-relaxed text-meteorite sm:text-lg"
            >
              {line}
            </motion.p>
          ))}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.9, delay: 0.78, ease: easeOut }}
            className="pt-4 text-xl font-semibold text-white sm:text-2xl"
          >
            Axon watches for those signs — and gets a doctor involved while
            there is still time to act.
          </motion.p>
        </div>

        {/* the three stakes */}
        <div className="mt-16 grid gap-4 text-left sm:grid-cols-3">
          {stakes.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.13, ease: easeOut }}
              className="rounded-2xl border border-meteorite/10 bg-obsidian/60 p-6 backdrop-blur-sm"
            >
              <p
                className={`mb-3 text-[10px] tracking-[0.26em] uppercase ${
                  s.label === "Preventable" ? "text-glow/85" : "text-[#e2545c]/80"
                }`}
              >
                {s.label}
              </p>
              <p className="text-sm leading-relaxed text-meteorite">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mx-auto mt-12 max-w-xl text-sm leading-relaxed text-meteorite/70"
        >
          Axon is also built to cost a fraction of a clinical monitor — because
          a warning system that only reaches the wealthy isn&apos;t much of a
          warning system.
        </motion.p>
      </div>
    </section>
  );
}
