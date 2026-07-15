"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Leaf,
  Church,
  Activity,
  MapPin,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const easeOut = [0.22, 1, 0.36, 1] as const;

const verticals = [
  {
    id: "healthcare",
    icon: HeartPulse,
    label: "Healthcare",
    title: "Clinical clarity, human-first care",
    description:
      "Minimalist clinical dashboards, wellness tracking, and patient engagement tools that make health data calm and legible.",
    features: [
      "IoT wellness tracking & remote vitals",
      "AI-assisted clinical dashboards",
      "Telehealth engagement portals",
    ],
    visual: (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-emerald-400/15 bg-obsidian/70 p-4">
          <div className="flex items-center gap-3">
            <Activity size={16} className="text-emerald-300/80" />
            <span className="text-xs text-meteorite">Resting Heart Rate</span>
          </div>
          <span className="font-heading text-lg font-semibold text-white">
            62 <span className="text-xs text-meteorite">bpm</span>
          </span>
        </div>
        {/* Vitals sparkline */}
        <div className="rounded-xl border border-emerald-400/15 bg-obsidian/70 p-4">
          <svg viewBox="0 0 200 40" className="h-12 w-full" aria-hidden>
            <motion.path
              d="M0 28 L28 26 L44 30 L58 10 L70 34 L86 24 L110 26 L126 12 L140 30 L162 22 L200 24"
              fill="none"
              stroke="#6ee7b7"
              strokeWidth="1.5"
              strokeOpacity="0.7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
          <p className="mt-1 text-[10px] tracking-widest text-meteorite/60 uppercase">
            Wellness trend · 7 days
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "wildlife",
    icon: Leaf,
    label: "Wildlife & Conservation",
    title: "Technology in service of the wild",
    description:
      "Eco-tech platforms, GPS mapping, and wildlife monitoring interfaces built for researchers and rangers in the field.",
    features: [
      "IoT GPS collars & geofenced alerts",
      "AI wildlife population monitoring",
      "Field-ready offline-first apps",
    ],
    visual: (
      <div className="relative h-40 overflow-hidden rounded-xl border border-emerald-400/15 bg-obsidian/70">
        {/* Topographic-style map */}
        <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
          {[18, 32, 46, 60, 74].map((r, i) => (
            <ellipse
              key={i}
              cx="80"
              cy="55"
              rx={r}
              ry={r * 0.55}
              fill="none"
              stroke="#34d399"
              strokeOpacity={0.14 - i * 0.02}
              strokeWidth="0.8"
            />
          ))}
          <motion.circle
            r="3"
            fill="#6ee7b7"
            animate={{
              cx: [60, 95, 130, 105, 60],
              cy: [40, 30, 55, 72, 40],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="150" cy="35" r="2" fill="#9BA4B2" opacity="0.6" />
          <circle cx="45" cy="70" r="2" fill="#9BA4B2" opacity="0.6" />
        </svg>
        <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full border border-emerald-400/20 bg-obsidian/80 px-3 py-1">
          <MapPin size={11} className="text-emerald-300/80" />
          <span className="text-[10px] tracking-widest text-meteorite uppercase">
            Collar #A17 · Live
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "communities",
    icon: Church,
    label: "Churches & Communities",
    title: "Engagement that feels like belonging",
    description:
      "Clean engagement portals, communication hubs, and giving platforms that bring congregations and communities closer.",
    features: [
      "Member engagement portals",
      "AI-assisted communication hubs",
      "Events, giving & volunteering",
    ],
    visual: (
      <div className="space-y-3">
        {[
          { name: "Sunday Gathering", meta: "1.2k attending", pct: 86 },
          { name: "Community Outreach", meta: "348 volunteers", pct: 64 },
          { name: "Youth Fellowship", meta: "212 members", pct: 48 },
        ].map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: easeOut }}
            className="rounded-xl border border-emerald-400/15 bg-obsidian/70 p-3.5"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Users size={13} className="text-emerald-300/80" />
                <span className="text-xs text-platinum">{row.name}</span>
              </div>
              <span className="text-[10px] text-meteorite">{row.meta}</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-nordic/25">
              <motion.div
                className="h-full rounded-full bg-emerald-400/50"
                initial={{ width: 0 }}
                animate={{ width: `${row.pct}%` }}
                transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    ),
  },
];

export function Labs() {
  const [active, setActive] = useState(0);
  const vertical = verticals[active];

  return (
    <section id="labs" className="relative px-6 py-28 md:py-36">
      {/* Soft green ambient tint distinguishes the Labs universe */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_30%,rgba(52,211,153,0.05),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="GeTech Labs"
          title="IoT & AI Solutions"
          description="We are building IoT and AI solutions that go across healthcare, churches, and wildlife — connected devices and intelligent systems where technology meets purpose."
        />

        {/* Category switcher */}
        <Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {verticals.map((v, i) => {
              const Icon = v.icon;
              const isActive = i === active;
              return (
                <button
                  key={v.id}
                  onClick={() => setActive(i)}
                  className={`relative flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm transition-all duration-500 ${
                    isActive
                      ? "border-emerald-400/30 bg-emerald-400/10 text-white"
                      : "border-meteorite/15 bg-midnight/50 text-meteorite hover:border-meteorite/30 hover:text-platinum"
                  }`}
                >
                  <Icon size={15} />
                  {v.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active vertical card */}
        <Reveal delay={0.1}>
          <div className="bento-cell noise overflow-hidden p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={vertical.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: easeOut }}
                className="grid items-center gap-10 md:grid-cols-2"
              >
                <div>
                  <h3 className="font-heading mb-4 text-2xl font-semibold text-white md:text-3xl">
                    {vertical.title}
                  </h3>
                  <p className="mb-7 text-meteorite">{vertical.description}</p>
                  <ul className="space-y-3">
                    {vertical.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-sm text-platinum"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="group mt-8 inline-flex items-center gap-2 text-sm text-emerald-300/80 transition-colors hover:text-emerald-200"
                  >
                    Start a {vertical.label} project
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
                <div>{vertical.visual}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
