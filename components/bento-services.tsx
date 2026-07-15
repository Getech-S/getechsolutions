"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Network,
  PenTool,
  Smartphone,
  Braces,
  Gauge,
} from "lucide-react";
import { SpotlightCard } from "./spotlight-card";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Counter } from "./counter";

/* ——— Cell visual: slowly pulsing network structure ——— */
function NetworkVisual() {
  const nodes = [
    { x: 50, y: 18 },
    { x: 18, y: 46 },
    { x: 82, y: 42 },
    { x: 34, y: 78 },
    { x: 68, y: 80 },
    { x: 50, y: 50 },
  ];
  const edges: [number, number][] = [
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [0, 2],
    [1, 3],
    [2, 4],
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#2B4162"
          strokeWidth="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2 + i * 0.12 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 5 ? 3 : 2}
          fill={i === 5 ? "#ffffff" : "#9BA4B2"}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

/* ——— Cell visual: draggable wireframe components ——— */
function WireframePlayground() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  const blocks = [
    { w: "w-24", h: "h-8", label: "Button", x: 8, y: 10 },
    { w: "w-32", h: "h-14", label: "Card", x: 120, y: 4 },
    { w: "w-40", h: "h-9", label: "Input", x: 30, y: 72 },
    { w: "w-16", h: "h-16", label: "Avatar", x: 190, y: 68 },
  ];

  return (
    <div
      ref={constraintsRef}
      className="relative h-44 w-full overflow-hidden rounded-xl border border-nordic/25 bg-obsidian/60"
    >
      <p className="absolute right-3 bottom-2 text-[10px] tracking-widest text-meteorite/40 uppercase">
        Drag the components
      </p>
      {blocks.map((b) => (
        <motion.div
          key={b.label}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.12}
          dragMomentum={false}
          whileDrag={{ scale: 1.06, borderColor: "rgba(125,211,252,0.5)" }}
          whileHover={{ borderColor: "rgba(125,211,252,0.35)" }}
          initial={{ x: b.x, y: b.y }}
          className={`absolute ${b.w} ${b.h} flex cursor-grab items-center justify-center rounded-lg border border-meteorite/25 bg-midnight/80 text-[10px] tracking-widest text-meteorite uppercase active:cursor-grabbing`}
        >
          {b.label}
        </motion.div>
      ))}
    </div>
  );
}

/* ——— Cell visual: dark-mode device mockup ——— */
function DeviceMockup() {
  return (
    <div className="relative mx-auto flex h-48 items-end justify-center gap-4">
      {/* Phone */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="animate-float h-44 w-24 rounded-2xl border border-meteorite/20 bg-midnight p-2 shadow-[0_20px_50px_rgba(2,4,6,0.8)]"
      >
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-meteorite/30" />
        <div className="space-y-2">
          <div className="h-12 rounded-lg bg-nordic/40" />
          <div className="h-2 w-3/4 rounded-full bg-meteorite/25" />
          <div className="h-2 w-1/2 rounded-full bg-meteorite/15" />
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-8 rounded-md bg-nordic/25" />
            <div className="h-8 rounded-md bg-nordic/25" />
          </div>
          <div className="h-5 rounded-md bg-glow/20" />
        </div>
      </motion.div>
      {/* Browser window */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hidden h-36 w-52 rounded-xl border border-meteorite/20 bg-midnight p-2 shadow-[0_20px_50px_rgba(2,4,6,0.8)] sm:block"
      >
        <div className="mb-2 flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-meteorite/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-meteorite/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-glow/50" />
        </div>
        <div className="flex gap-2">
          <div className="w-1/3 space-y-1.5">
            <div className="h-2 rounded-full bg-meteorite/25" />
            <div className="h-2 rounded-full bg-meteorite/15" />
            <div className="h-2 rounded-full bg-meteorite/15" />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="h-14 rounded-lg bg-nordic/35" />
            <div className="grid grid-cols-3 gap-1">
              <div className="h-6 rounded bg-nordic/25" />
              <div className="h-6 rounded bg-nordic/25" />
              <div className="h-6 rounded bg-glow/20" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ——— Cell visual: glass-morphic code snippet ——— */
function CodeSnippet() {
  const lines = [
    { indent: 0, tokens: ["const", " solution", " = ", "await", " getech."] },
    { indent: 1, tokens: [".align({ vision: ", '"yours"', " })"] },
    { indent: 1, tokens: [".engineer({ impact: ", '"high"', " })"] },
    { indent: 1, tokens: [".ship();", " // → production"] },
  ];
  return (
    <div className="glass rounded-xl p-4 font-mono text-xs leading-6">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-meteorite/40" />
        <span className="h-2 w-2 rounded-full bg-meteorite/40" />
        <span className="h-2 w-2 rounded-full bg-glow/60" />
        <span className="ml-2 text-[10px] text-meteorite/50">
          solution.ts
        </span>
      </div>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
          style={{ paddingLeft: line.indent * 16 }}
          className="whitespace-nowrap"
        >
          {line.tokens.map((t, j) => (
            <span
              key={j}
              className={
                t.startsWith('"')
                  ? "text-glow/80"
                  : t.startsWith("//") || t.includes("//")
                    ? "text-meteorite/50"
                    : ["const", "await"].includes(t.trim())
                      ? "text-nordic-bright"
                      : "text-platinum/90"
              }
            >
              {t}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

const metrics = [
  { value: 40, suffix: "+", label: "Projects Shipped" },
  { value: 12, suffix: "", label: "Industries Served" },
  { value: 99, suffix: "%", label: "Uptime Delivered" },
  { value: 24, suffix: "/7", label: "Support Coverage" },
];

export function BentoServices() {
  return (
    <section id="services" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Core Services"
          title="Precision-Built Capabilities"
          description="Three disciplines, one alignment — strategy, design, and engineering working as a single system."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
          {/* Consultancy — wide cell */}
          <Reveal className="md:col-span-3" delay={0.05}>
            <SpotlightCard className="h-full p-8">
              <div className="flex h-full flex-col">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-nordic/50 bg-nordic/20 text-glow">
                  <Network size={20} />
                </div>
                <h3 className="font-heading mb-2 text-xl font-semibold text-white">
                  Tech Consultancy
                </h3>
                <p className="mb-6 text-sm text-meteorite">
                  Architecture reviews, digital transformation roadmaps, and
                  systems thinking that de-risks every technical decision.
                </p>
                <div className="mt-auto h-40">
                  <NetworkVisual />
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* UI/UX — wide cell with draggable wireframes */}
          <Reveal className="md:col-span-3" delay={0.15}>
            <SpotlightCard className="h-full p-8">
              <div className="flex h-full flex-col">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-nordic/50 bg-nordic/20 text-glow">
                  <PenTool size={20} />
                </div>
                <h3 className="font-heading mb-2 text-xl font-semibold text-white">
                  UI/UX Design
                </h3>
                <p className="mb-6 text-sm text-meteorite">
                  Interfaces engineered for clarity — design systems,
                  prototypes, and interaction models users feel at home in.
                </p>
                <div className="mt-auto">
                  <WireframePlayground />
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Web & Mobile — large cell */}
          <Reveal className="md:col-span-4" delay={0.1}>
            <SpotlightCard className="h-full p-8">
              <div className="flex h-full flex-col gap-6 sm:flex-row sm:items-center">
                <div className="sm:w-1/2">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-nordic/50 bg-nordic/20 text-glow">
                    <Smartphone size={20} />
                  </div>
                  <h3 className="font-heading mb-2 text-xl font-semibold text-white">
                    Web &amp; Mobile Apps
                  </h3>
                  <p className="text-sm text-meteorite">
                    Production-grade applications with organic user flows —
                    fast, accessible, and built to scale from day one.
                  </p>
                </div>
                <div className="sm:w-1/2">
                  <DeviceMockup />
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Code snippet cell */}
          <Reveal className="md:col-span-2" delay={0.2}>
            <SpotlightCard className="h-full p-8">
              <div className="flex h-full flex-col">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-nordic/50 bg-nordic/20 text-glow">
                  <Braces size={20} />
                </div>
                <h3 className="font-heading mb-2 text-xl font-semibold text-white">
                  Engineering DNA
                </h3>
                <p className="mb-6 text-sm text-meteorite">
                  Clean, typed, and tested — code as craft.
                </p>
                <div className="mt-auto overflow-x-auto">
                  <CodeSnippet />
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Metrics strip */}
          <Reveal className="md:col-span-6" delay={0.15}>
            <SpotlightCard className="p-8">
              <div className="mb-6 flex items-center gap-3 text-meteorite">
                <Gauge size={16} className="text-glow" />
                <span className="text-xs tracking-[0.22em] uppercase">
                  Impact Metrics
                </span>
              </div>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-heading text-4xl font-bold text-white md:text-5xl">
                      <Counter value={m.value} suffix={m.suffix} />
                    </p>
                    <p className="mt-2 text-sm text-meteorite">{m.label}</p>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
