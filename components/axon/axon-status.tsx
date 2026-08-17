"use client";

import { motion } from "framer-motion";
import { Lock, ArrowUpRight } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const phases = [
  {
    phase: "Phase 01",
    title: "Concept & Design",
    state: "Complete",
    body: "The clinical problem, the product thesis, and the system design are settled.",
  },
  {
    phase: "Phase 02",
    title: "Engineering Prototype",
    state: "In progress",
    body: "Building and bench-testing the wearable and the clinician console end to end.",
  },
  {
    phase: "Phase 03",
    title: "Supervised Pilot",
    state: "Next",
    body: "A small, supervised study with clinical partners to validate accuracy in the field.",
  },
  {
    phase: "Phase 04",
    title: "Approval & Rollout",
    state: "Planned",
    body: "Regulatory review, then a staged rollout with health providers and partners.",
  },
];

const stateStyles: Record<string, string> = {
  Complete: "border-glow/30 bg-glow/10 text-glow",
  "In progress": "border-white/25 bg-white/10 text-white",
  Next: "border-meteorite/25 bg-meteorite/5 text-meteorite",
  Planned: "border-meteorite/15 bg-transparent text-meteorite/70",
};

export function AxonStatus() {
  return (
    <section
      id="status"
      className="relative border-t border-meteorite/10 px-6 py-28 md:py-36"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_20%,rgba(43,65,98,0.16),transparent_72%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-midnight/70 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            <span className="text-[11px] tracking-[0.24em] text-platinum uppercase">
              Programme Status
            </span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease: easeOut }}
            className="font-heading text-gradient-silver text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-balance"
          >
            Axon is in active development.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
            className="mt-6 leading-relaxed text-meteorite"
          >
            Axon is a live programme inside GeTech Labs — engineering underway,
            not yet a product on a shelf. What you have just read is the system
            we are building and the standard we are holding it to. We are
            publishing our direction openly, and building it properly.
          </motion.p>
        </div>

        {/* roadmap */}
        <div className="grid gap-4 md:grid-cols-4">
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.75, delay: 0.1 + i * 0.11, ease: easeOut }}
              className="relative flex flex-col rounded-2xl border border-meteorite/12 bg-gradient-to-b from-white/[0.035] to-transparent p-6"
            >
              {/* connector */}
              {i < phases.length - 1 && (
                <span
                  className="absolute top-11 -right-2 hidden h-px w-4 bg-meteorite/20 md:block"
                  aria-hidden
                />
              )}
              <div className="mb-5 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] tracking-[0.16em] text-meteorite/60 uppercase">
                  {p.phase}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] uppercase ${stateStyles[p.state]}`}
                >
                  {p.state}
                </span>
              </div>
              <h3 className="font-heading mb-2.5 text-base font-semibold text-white">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-meteorite">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* investor / partner note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.9, delay: 0.25, ease: easeOut }}
          className="glass mt-6 flex flex-col items-start gap-6 rounded-2xl p-7 md:flex-row md:items-center md:justify-between md:p-9"
        >
          <div className="flex gap-4">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-meteorite/20 bg-obsidian/60 text-meteorite">
              <Lock size={16} />
            </span>
            <div>
              <h3 className="font-heading mb-2 text-base font-semibold text-white">
                For investors and partners
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-meteorite">
                This page is an overview, not a datasheet — technical
                specifications, validation data, and commercial terms are shared
                directly under NDA. If you are an investor, clinician, or health
                organisation who wants to shape what Axon becomes, we would like
                to talk.
              </p>
            </div>
          </div>
          <a
            href="/#contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-glow/30 bg-glow/10 px-6 py-3.5 text-sm font-medium text-white transition-all duration-500 hover:border-glow/55 hover:shadow-[inset_0_0_24px_rgba(125,211,252,0.16)]"
          >
            Request a conversation
            <ArrowUpRight
              size={15}
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
