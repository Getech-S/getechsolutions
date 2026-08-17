"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Magnetic } from "../magnetic-button";

const AxonCanvas = dynamic(() => import("./axon-canvas"), {
  ssr: false,
  loading: () => null,
});

const easeOut = [0.22, 1, 0.36, 1] as const;

export function AxonHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The band sinks and dims as the story begins
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y: canvasY, opacity: canvasOpacity }}
        className="absolute inset-0 z-0"
        aria-hidden
      >
        <AxonCanvas />
      </motion.div>

      {/* Depth wash + legibility scrim */}
      <div
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_25%,rgba(2,4,6,0.82)_85%)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[1] h-64 bg-gradient-to-t from-obsidian to-transparent"
        aria-hidden
      />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-glow/25 bg-midnight/70 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-glow" />
          </span>
          <span className="text-[11px] tracking-[0.24em] text-platinum uppercase">
            Axon by GeTech Solutions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, delay: 0.45, ease: easeOut }}
          className="font-heading text-gradient-silver text-[clamp(2.5rem,7.5vw,5.5rem)] font-bold leading-[1.02] tracking-tight text-balance"
        >
          Predicting the Unpredictable.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: easeOut }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-platinum [text-shadow:0_2px_20px_rgba(2,4,6,0.9)] sm:text-lg"
        >
          The Axon Stroke Monitor. Clinical-grade stroke prevention and
          continuous cardiovascular tracking, built affordably for everyone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: easeOut }}
          className="mt-11 flex justify-center"
        >
          <Magnetic strength={0.22}>
            <a
              href="#pilot"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-white px-8 py-4 text-sm font-semibold text-obsidian transition-all duration-500 hover:shadow-[0_0_46px_rgba(125,211,252,0.4)]"
            >
              Join the Pilot Program
              <ArrowRight
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.2 }}
        style={{ opacity: copyOpacity }}
        className="absolute bottom-9 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-meteorite/60"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
