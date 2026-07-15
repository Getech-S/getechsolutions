"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FlaskConical } from "lucide-react";
import { Magnetic } from "./magnetic-button";

const HeroCanvas = dynamic(() => import("./hero-canvas"), {
  ssr: false,
  loading: () => null,
});

const audiences = ["Startups", "Companies", "Visionaries", "Communities"];
const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % audiences.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D revolving core — full-bleed on mobile, right half on desktop */}
      <div
        className="absolute inset-0 z-0 lg:inset-y-0 lg:left-1/2 lg:right-0"
        aria-hidden
      >
        <HeroCanvas />
      </div>

      {/* Ambient overlays above the canvas */}
      <div className="grid-lines absolute inset-0 z-[1]" aria-hidden />
      <div
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_70%_45%,rgba(43,65,98,0.28),transparent_70%)]"
        aria-hidden
      />
      {/* Mobile-only scrim so copy stays legible over the 3D core */}
      <div
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_55%_at_50%_45%,rgba(2,4,6,0.62),transparent_80%)] lg:hidden"
        aria-hidden
      />

      {/* Copy — left column on desktop */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-6 text-center lg:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55, ease: easeOut }}
          className="font-heading text-gradient-silver animate-shimmer text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:max-w-xl xl:text-7xl"
          style={{ animationDuration: "8s" }}
        >
          Engineering
          <br />
          High-Impact
          <br />
          Digital Futures
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: easeOut }}
          className="mx-auto mt-8 max-w-2xl text-base text-platinum [text-shadow:0_2px_18px_rgba(2,4,6,0.95)] sm:text-lg lg:mx-0 lg:max-w-lg lg:text-meteorite lg:[text-shadow:none]"
        >
          We build lasting tech solutions for{" "}
          <span className="relative inline-block h-[1.5em] w-[11ch] overflow-hidden align-bottom text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={audiences[index]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="absolute inset-0 font-semibold text-white"
              >
                {audiences[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease: easeOut }}
          className="pointer-events-auto mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
        >
          <Magnetic strength={0.2}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-obsidian transition-all duration-500 hover:shadow-[0_0_36px_rgba(255,255,255,0.25)]"
            >
              Work With Us
              <ArrowRight
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href="#labs"
              className="inline-flex items-center gap-2 rounded-xl border border-meteorite/25 px-7 py-3.5 text-sm font-medium text-platinum transition-all duration-500 hover:border-glow/40 hover:bg-nordic/15 hover:text-white"
            >
              <FlaskConical size={16} />
              Explore Our Labs
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-meteorite/25 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-glow/70"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
