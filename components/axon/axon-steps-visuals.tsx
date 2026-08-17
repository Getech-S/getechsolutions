"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Droplets,
  Gauge,
  Footprints,
  ShieldCheck,
  Siren,
  TrendingDown,
  Bell,
} from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

/* ——————————————————————————————————————————————
   STEP 1 — The Wristband: always-on vitals
—————————————————————————————————————————————— */
export function VisualWristband() {
  const vitals = [
    { icon: Activity, label: "Pulse", value: "72", unit: "bpm" },
    { icon: Droplets, label: "Blood Oxygen", value: "98", unit: "%" },
    { icon: Gauge, label: "BP Trend", value: "128/82", unit: "mmHg" },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* pulse rings radiating from the sensor */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute h-40 w-40 rounded-full border border-glow/30"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 2.1], opacity: [0.55, 0] }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            delay: i * 1.13,
            ease: "easeOut",
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-sm space-y-3">
        {/* the band, seen from above */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="glass mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-3xl border-glow/25"
        >
          <motion.div
            animate={{ scale: [1, 1.16, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-glow/15"
          >
            <Activity size={26} className="text-glow" />
          </motion.div>
        </motion.div>

        {vitals.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.13, ease: easeOut }}
              className="glass flex items-center justify-between rounded-xl px-4 py-3.5"
            >
              <span className="flex items-center gap-3 text-xs text-meteorite">
                <Icon size={15} className="text-glow/80" />
                {v.label}
              </span>
              <span className="font-heading text-base font-semibold text-white tabular-nums">
                {v.value}
                <span className="ml-1 text-[10px] font-normal text-meteorite">
                  {v.unit}
                </span>
              </span>
            </motion.div>
          );
        })}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="pt-1 text-center text-[10px] tracking-[0.28em] text-meteorite/60 uppercase"
        >
          Low-power sensors · 24/7
        </motion.p>
      </div>
    </div>
  );
}

/* ——————————————————————————————————————————————
   STEP 2 — The AI Brain: context filters the noise
—————————————————————————————————————————————— */
export function VisualAI() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative z-10 w-full max-w-sm">
        {/* noisy input */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-4 flex justify-center gap-1.5"
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-meteorite/45"
              animate={{ height: [10, 8 + Math.random() * 30, 10] }}
              transition={{
                duration: 1.1 + Math.random(),
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut",
              }}
              style={{ height: 14 }}
            />
          ))}
        </motion.div>

        {/* the filter membrane */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.75, delay: 0.15, ease: easeOut }}
          className="glass relative overflow-hidden rounded-2xl border-glow/25 px-5 py-6"
        >
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-glow/70 to-transparent"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
          />
          <p className="mb-4 text-center text-[10px] tracking-[0.28em] text-glow/80 uppercase">
            Context Engine
          </p>

          <div className="space-y-2.5">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
              className="flex items-center justify-between rounded-lg border border-meteorite/12 bg-obsidian/60 px-3.5 py-2.5"
            >
              <span className="flex items-center gap-2.5 text-xs text-meteorite">
                <Footprints size={14} className="text-meteorite/70" />
                Pulse 141 · walking
              </span>
              <span className="text-[10px] tracking-wider text-meteorite/70 uppercase">
                Ignored
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.58, ease: easeOut }}
              className="flex items-center justify-between rounded-lg border border-meteorite/12 bg-obsidian/60 px-3.5 py-2.5"
            >
              <span className="flex items-center gap-2.5 text-xs text-meteorite">
                <ShieldCheck size={14} className="text-meteorite/70" />
                BP 132/85 · resting
              </span>
              <span className="text-[10px] tracking-wider text-meteorite/70 uppercase">
                Normal
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{
                opacity: 1,
                x: 0,
                borderColor: [
                  "rgba(226,84,92,0.3)",
                  "rgba(226,84,92,0.75)",
                  "rgba(226,84,92,0.3)",
                ],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.78 },
                x: { duration: 0.6, delay: 0.78, ease: easeOut },
                borderColor: { duration: 1.8, repeat: Infinity, delay: 1.2 },
              }}
              className="flex items-center justify-between rounded-lg border bg-[#e2545c]/8 px-3.5 py-2.5"
            >
              <span className="flex items-center gap-2.5 text-xs text-white">
                <Siren size={14} className="text-[#e2545c]" />
                BP 189/121 · at rest
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-[#e2545c] uppercase">
                Escalate
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-4 text-center text-[10px] tracking-[0.28em] text-meteorite/60 uppercase"
        >
          Motion-aware · learns your baseline
        </motion.p>
      </div>
    </div>
  );
}

/* ——————————————————————————————————————————————
   STEP 3 — The Axon App: your own health, in plain language
—————————————————————————————————————————————— */
export function VisualApp() {
  const bars = [52, 61, 48, 70, 58, 44, 39];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* soft halo behind the phone */}
      <div
        className="absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.12),transparent_70%)]"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: easeOut }}
        className="relative z-10 w-[16.5rem] rounded-[2rem] border border-meteorite/20 bg-midnight p-3 shadow-[0_28px_70px_rgba(2,4,6,0.9)]"
      >
        {/* speaker slot */}
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-meteorite/25" />

        <div className="space-y-2.5 rounded-[1.5rem] bg-obsidian/80 p-3.5">
          {/* app header */}
          <div className="flex items-center justify-between">
            <span className="font-heading text-[11px] tracking-[0.2em] text-platinum uppercase">
              Axon
            </span>
            <Bell size={12} className="text-meteorite/60" />
          </div>

          {/* today's reading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
            className="rounded-xl border border-glow/20 bg-glow/[0.06] p-3.5"
          >
            <p className="mb-1 text-[9px] tracking-[0.2em] text-meteorite uppercase">
              Blood pressure today
            </p>
            <div className="flex items-end justify-between">
              <span className="font-heading text-2xl font-bold text-white tabular-nums">
                124<span className="text-meteorite">/</span>79
              </span>
              <span className="flex items-center gap-1 rounded-full border border-glow/30 px-2 py-0.5 text-[9px] text-glow">
                <TrendingDown size={9} />
                Steady
              </span>
            </div>
          </motion.div>

          {/* weekly trend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: easeOut }}
            className="rounded-xl border border-meteorite/12 p-3.5"
          >
            <p className="mb-3 text-[9px] tracking-[0.2em] text-meteorite uppercase">
              Last 7 days
            </p>
            <div className="flex h-14 items-end gap-1.5">
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-nordic to-glow/70"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.07,
                    ease: easeOut,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* plain-language insight */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: easeOut }}
            className="rounded-xl border border-meteorite/12 bg-midnight/70 p-3.5"
          >
            <p className="text-[11px] leading-relaxed text-platinum">
              Your pressure is settling. Evenings are still running high — worth
              mentioning at your next visit.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.28em] text-meteorite/60 uppercase"
      >
        Your data · In your hands
      </motion.p>
    </div>
  );
}

/* ——————————————————————————————————————————————
   STEP 4 — The Doctor's Link: alert in under 1.5s
—————————————————————————————————————————————— */
export function VisualDoctor() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative z-10 w-full max-w-sm">
        {/* transit path */}
        <div className="relative mb-5 flex items-center justify-between px-2">
          {["Band", "Cloud", "App", "Doctor"].map((node, i) => (
            <div key={node} className="z-10 flex flex-col items-center gap-2">
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-glow"
                animate={{
                  scale: [1, 1.7, 1],
                  boxShadow: [
                    "0 0 0px rgba(125,211,252,0)",
                    "0 0 16px rgba(125,211,252,0.9)",
                    "0 0 0px rgba(125,211,252,0)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.45,
                  ease: "easeInOut",
                }}
              />
              <span className="text-[9px] tracking-[0.2em] text-meteorite/70 uppercase">
                {node}
              </span>
            </div>
          ))}
          <div className="absolute inset-x-4 top-[5px] h-px bg-meteorite/20" />
          <motion.div
            className="absolute top-[3px] left-4 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
            animate={{ left: ["4%", "92%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* doctor's dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: easeOut }}
          className="glass overflow-hidden rounded-2xl"
        >
          <div className="flex items-center gap-1.5 border-b border-meteorite/10 px-4 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-meteorite/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-meteorite/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-glow/60" />
            <span className="ml-2 text-[10px] text-meteorite/60">
              axon · clinician console
            </span>
          </div>

          <div className="space-y-2.5 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.85, ease: easeOut }}
              className="rounded-xl border border-[#e2545c]/45 bg-[#e2545c]/10 p-3.5"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-semibold text-white">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-[#e2545c]"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  />
                  Red Alert · Patient #A-114
                </span>
                <span className="text-[10px] text-[#e2545c]">now</span>
              </div>
              <p className="text-[11px] text-meteorite">
                Hypertensive spike at rest — 189/121 mmHg
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              className="flex gap-2"
            >
              <span className="flex-1 rounded-lg bg-white px-3 py-2 text-center text-[11px] font-semibold text-obsidian">
                Message patient
              </span>
              <span className="rounded-lg border border-meteorite/20 px-3 py-2 text-[11px] text-meteorite">
                View trend
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* latency badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: easeOut }}
          className="mt-4 flex items-center justify-center gap-2.5"
        >
          <span className="font-heading text-3xl font-bold text-white tabular-nums">
            1.5
          </span>
          <span className="text-[10px] leading-tight tracking-[0.2em] text-meteorite/70 uppercase">
            second target
            <br />
            to doctor
          </span>
        </motion.div>
      </div>
    </div>
  );
}
