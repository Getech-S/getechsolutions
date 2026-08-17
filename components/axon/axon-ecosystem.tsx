"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Watch, BrainCircuit, Smartphone, Stethoscope } from "lucide-react";
import {
  VisualWristband,
  VisualAI,
  VisualApp,
  VisualDoctor,
} from "./axon-steps-visuals";

const easeOut = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    n: "01",
    icon: Watch,
    title: "The Wristband",
    kicker: "Always On",
    body: "Low-power sensors track your pulse, blood oxygen, and blood pressure trends without interruption — the exact signals that rise before a stroke, watched on the days nobody is testing you.",
    Visual: VisualWristband,
  },
  {
    n: "02",
    icon: BrainCircuit,
    title: "The AI Brain",
    kicker: "No False Alarms",
    body: "Our algorithm learns your body. Motion sensors tell it whether your heart is racing because you are walking, or because something is genuinely wrong. An alarm people learn to ignore saves nobody — so Axon only raises one when it matters.",
    Visual: VisualAI,
  },
  {
    n: "03",
    icon: Smartphone,
    title: "The Axon App",
    kicker: "In Your Hands",
    body: "Everything Axon sees goes to you as well. The app turns weeks of readings into plain language — how your pressure is trending, what is changing, and when it is worth seeing someone. Your own health stops being something you only hear about at a clinic.",
    Visual: VisualApp,
  },
  {
    n: "04",
    icon: Stethoscope,
    title: "The Doctor's Link",
    kicker: "Zero Latency",
    body: "In a stroke, damage is measured in minutes. So Axon isn't designed to just beep at you — it is built to put a red alert on a doctor's dashboard in under 1.5 seconds, so they can reach you immediately. Warning becomes treatment before the damage is done.",
    Visual: VisualDoctor,
  },
];

export function AxonEcosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // Progress through the pinned block, measured straight off its rect —
  // 0 when it locks to the top, 1 when its final screen scrolls away.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p =
        travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      setProgress(p);
      // one equal band per step across the pinned scroll distance
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const ActiveVisual = steps[active].Visual;

  return (
    <section id="how-it-works" className="relative">
      {/* ——— Section intro ——— */}
      <div className="px-6 pt-28 pb-16 text-center md:pt-40">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-6 inline-block rounded-full border border-nordic/50 bg-midnight/60 px-4 py-1.5 text-[11px] tracking-[0.24em] text-meteorite uppercase"
        >
          How It Works
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.1, ease: easeOut }}
          className="font-heading text-gradient-silver mx-auto max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-balance"
        >
          The Ecosystem
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
          className="mx-auto mt-5 max-w-xl text-meteorite"
        >
          Four parts, one unbroken chain — from the first warning sign on your
          wrist, to your own phone, to a doctor acting on it in seconds.
        </motion.p>
      </div>

      {/* ——— Pinned scroll story (desktop) ——— */}
      <div ref={ref} className="relative hidden h-[420vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-16 px-8">
            {/* copy column */}
            <div className="relative">
              {/* progress rail */}
              <div className="absolute top-1 -left-8 h-[calc(100%-0.5rem)] w-px bg-meteorite/12">
                <div
                  className="w-px origin-top bg-gradient-to-b from-glow/80 to-nordic-bright/50 transition-transform duration-300 ease-out"
                  style={{
                    height: "100%",
                    transform: `scaleY(${0.04 + progress * 0.96})`,
                  }}
                />
              </div>

              <div className="mb-9 flex gap-3">
                {steps.map((s, i) => (
                  <span
                    key={s.n}
                    className={`h-1 flex-1 rounded-full transition-all duration-700 ${
                      i === active
                        ? "bg-glow/80"
                        : i < active
                          ? "bg-nordic-bright/50"
                          : "bg-meteorite/15"
                    }`}
                  />
                ))}
              </div>

              {/* All three are mounted and crossfaded with CSS so a fast
                  scroll never waits on an exit animation to finish. */}
              <div className="relative min-h-[23rem]">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = i === active;
                  return (
                    <div
                      key={s.n}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 transition-all duration-500 ease-out ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : i < active
                            ? "pointer-events-none -translate-y-6 opacity-0"
                            : "pointer-events-none translate-y-6 opacity-0"
                      }`}
                    >
                      <div className="mb-5 flex items-center gap-4">
                        <span className="font-heading text-sm text-nordic-bright tabular-nums">
                          {s.n}
                        </span>
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-glow/25 bg-glow/8 text-glow">
                          <Icon size={19} />
                        </span>
                        <span className="rounded-full border border-meteorite/15 px-3 py-1 text-[10px] tracking-[0.2em] text-meteorite uppercase">
                          {s.kicker}
                        </span>
                      </div>

                      <h3 className="font-heading mb-5 text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-tight text-white">
                        {s.title}
                      </h3>
                      <p className="max-w-md text-lg leading-relaxed text-meteorite">
                        {s.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* visual column */}
            <div className="relative flex h-[460px] items-center justify-center">
              <div
                className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(43,65,98,0.28),transparent_75%)]"
                aria-hidden
              />
              {/* Keyed on the step so the visual remounts and replays its
                  own entrance animation each time it becomes active. */}
              <motion.div
                key={steps[active].n}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="h-full w-full"
              >
                <ActiveVisual />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ——— Stacked story (mobile & tablet) ——— */}
      <div className="space-y-20 px-6 pb-8 lg:hidden">
        {steps.map((s) => {
          const Icon = s.icon;
          const Visual = s.Visual;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: easeOut }}
            >
              <div className="mb-4 flex items-center gap-3.5">
                <span className="font-heading text-xs text-nordic-bright tabular-nums">
                  {s.n}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-glow/25 bg-glow/8 text-glow">
                  <Icon size={17} />
                </span>
                <span className="rounded-full border border-meteorite/15 px-2.5 py-1 text-[9px] tracking-[0.18em] text-meteorite uppercase">
                  {s.kicker}
                </span>
              </div>
              <h3 className="font-heading mb-3 text-2xl font-bold text-white">
                {s.title}
              </h3>
              <p className="mb-8 leading-relaxed text-meteorite">{s.body}</p>
              <div className="relative h-[420px] rounded-2xl border border-meteorite/10 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(43,65,98,0.22),transparent_75%)] p-4">
                <Visual />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
