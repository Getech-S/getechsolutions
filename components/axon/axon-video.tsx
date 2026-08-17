"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Watch, Cloud, MonitorSmartphone } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Cinematic placeholder for the Axon product film.
 *
 * To ship the real film, replace the <AmbientFilm /> block with:
 *   <video className="h-full w-full object-cover" poster="/axon/poster.jpg" controls
 *          playsInline preload="none"><source src="/axon/axon-film.mp4" type="video/mp4" /></video>
 */
function AmbientFilm() {
  const nodes = [
    { icon: Watch, label: "Wristband", x: "16%" },
    { icon: Cloud, label: "Axon Cloud", x: "50%" },
    { icon: MonitorSmartphone, label: "Clinician", x: "84%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* deep-space ground */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_50%,rgba(43,65,98,0.4),#020406_78%)]" />

      {/* drifting starfield */}
      {Array.from({ length: 34 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-meteorite/40"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 61) % 100}%`,
            width: 1 + (i % 3),
            height: 1 + (i % 3),
          }}
          animate={{ opacity: [0.15, 0.6, 0.15] }}
          transition={{
            duration: 3 + (i % 5),
            repeat: Infinity,
            delay: i * 0.17,
          }}
        />
      ))}

      {/* the transit line */}
      <div className="absolute inset-x-[16%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-nordic/20 via-nordic-bright/45 to-nordic/20" />

      {/* data packets flowing left → right */}
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-glow shadow-[0_0_14px_rgba(125,211,252,0.95)]"
          animate={{ left: ["16%", "84%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
            times: [0, 0.12, 0.88, 1],
          }}
        />
      ))}

      {/* the three nodes */}
      {nodes.map((n, i) => {
        const Icon = n.icon;
        return (
          <div
            key={n.label}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: n.x }}
          >
            <motion.div
              className="glass flex h-14 w-14 items-center justify-center rounded-2xl border-glow/25 sm:h-20 sm:w-20"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(125,211,252,0)",
                  "0 0 34px rgba(125,211,252,0.35)",
                  "0 0 0px rgba(125,211,252,0)",
                ],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            >
              <Icon className="h-5 w-5 text-glow sm:h-7 sm:w-7" />
            </motion.div>
            <p className="mt-3 text-center text-[9px] tracking-[0.2em] text-meteorite/70 uppercase sm:text-[10px]">
              {n.label}
            </p>
          </div>
        );
      })}

      {/* cinematic letterbox + vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_75%_at_50%_50%,transparent_45%,rgba(2,4,6,0.75))]" />
    </div>
  );
}

export function AxonVideo() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // the frame widens and settles as it enters the viewport
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [40, 24]);

  return (
    <section ref={ref} className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mb-6 inline-block rounded-full border border-nordic/50 bg-midnight/60 px-4 py-1.5 text-[11px] tracking-[0.24em] text-meteorite uppercase"
          >
            The Film
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease: easeOut }}
            className="font-heading text-gradient-silver text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-balance"
          >
            See Axon in Action.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
            className="mx-auto mt-5 max-w-xl text-meteorite"
          >
            A warning sign leaving the wrist, clearing the cloud, and landing on
            a clinician&apos;s screen — the whole chain, in real time.
          </motion.p>
        </div>

        <motion.div
          style={{ scale, borderRadius: radius }}
          className="group relative aspect-video w-full overflow-hidden border border-meteorite/12 shadow-[0_40px_120px_rgba(2,4,6,0.85)]"
        >
          <AmbientFilm />

          {/* play affordance */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.button
              type="button"
              aria-label="Play the Axon film"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              className="glass relative flex h-16 w-16 items-center justify-center rounded-full border-white/25 transition-colors duration-500 hover:border-glow/50 sm:h-20 sm:w-20"
            >
              <motion.span
                className="absolute inset-0 rounded-full border border-glow/40"
                animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
              <Play className="ml-1 h-5 w-5 fill-white text-white sm:h-6 sm:w-6" />
            </motion.button>
          </div>

          {/* glass caption bar */}
          <div className="glass absolute inset-x-4 bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3 sm:inset-x-6 sm:bottom-6">
            <span className="flex items-center gap-2.5 text-[11px] text-platinum">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-glow" />
              </span>
              Real-time telemetry — wrist to clinician
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-meteorite/70 uppercase">
              Film in production
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
