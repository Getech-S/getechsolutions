"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "../magnetic-button";
import { AlignmentLogo } from "../logo";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function AxonMission() {
  return (
    <section
      id="pilot"
      className="relative overflow-hidden border-t border-meteorite/10 px-6 py-32 md:py-44"
    >
      {/* horizon glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(43,65,98,0.4),transparent_72%)]"
        aria-hidden
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-glow/50 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-7 inline-block rounded-full border border-nordic/50 bg-midnight/60 px-4 py-1.5 text-[11px] tracking-[0.24em] text-meteorite uppercase"
        >
          The Mission
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.05, delay: 0.1, ease: easeOut }}
          className="font-heading text-gradient-silver text-[clamp(2.1rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-tight text-balance"
        >
          Built in Rwanda.
          <br />
          Built for the World.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.95, delay: 0.25, ease: easeOut }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-meteorite sm:text-lg"
        >
          Every stroke Axon catches early is a life that carries on — someone
          who keeps their speech, their movement, their independence. Through
          GeTech Solutions, we are proving that life-saving innovation can be
          built locally, and priced so that the people who need it most are the
          ones who get it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.4, ease: easeOut }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.22}>
            <a
              href="/#contact"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-obsidian transition-all duration-500 hover:shadow-[0_0_46px_rgba(125,211,252,0.4)]"
            >
              Partner With Us
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-meteorite/25 px-8 py-4 text-sm font-medium text-platinum transition-all duration-500 hover:border-glow/40 hover:bg-nordic/15 hover:text-white"
            >
              Back to GeTech Solutions
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 flex flex-col items-center gap-4"
        >
          <AlignmentLogo size={30} animated={false} />
          <p className="text-xs text-meteorite/50">
            Axon is a GeTech Solutions product · © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
