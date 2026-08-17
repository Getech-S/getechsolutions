"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { AlignmentLogo } from "../logo";
import { Magnetic } from "../magnetic-button";

export function AxonNav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <>
      {/* reading progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-nordic-bright via-glow to-nordic-bright"
        style={{ scaleX: progress }}
        aria-hidden
      />

      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className="glass flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3"
          aria-label="Axon"
        >
          <a href="/" className="group flex items-center gap-3">
            <ArrowLeft
              size={15}
              className="text-meteorite transition-all duration-500 group-hover:-translate-x-0.5 group-hover:text-white"
            />
            <AlignmentLogo size={28} />
            <span className="font-heading hidden text-xs tracking-[0.2em] text-meteorite uppercase transition-colors group-hover:text-platinum sm:inline">
              GeTech Solutions
            </span>
          </a>

          <div className="flex items-center gap-5">
            <span className="font-heading hidden text-sm font-semibold tracking-[0.22em] text-white uppercase md:inline">
              Axon
            </span>
            <Magnetic strength={0.25}>
              <a
                href="#pilot"
                className="inline-flex items-center rounded-xl border border-glow/30 bg-glow/10 px-5 py-2.5 text-xs font-medium text-white transition-all duration-500 hover:border-glow/55 hover:shadow-[inset_0_0_22px_rgba(125,211,252,0.16)]"
              >
                Join the Pilot
              </a>
            </Magnetic>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
