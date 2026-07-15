"use client";

import { motion } from "framer-motion";
import { AlignmentLogo } from "./logo";
import { Reveal } from "./reveal";

const principles = [
  {
    number: "01",
    title: "Focus",
    body: "One problem, deeply understood. We reduce complexity until only the essential remains.",
  },
  {
    number: "02",
    title: "Precision",
    body: "Every pixel, every millisecond, every line of code — engineered with intent.",
  },
  {
    number: "03",
    title: "Alignment",
    body: "Your vision and our craft, brought into a single orbit. The dot finds its arc.",
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-28 md:py-36">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_50%_50%,rgba(43,65,98,0.16),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* The mark, monumental */}
          <Reveal type="scale">
            <div className="relative mx-auto flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
              <motion.div
                className="absolute inset-0 rounded-full border border-nordic/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-6 rounded-full border border-dashed border-meteorite/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              />
              <AlignmentLogo size={140} />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="mb-4 inline-block rounded-full border border-nordic/50 bg-midnight/60 px-4 py-1.5 text-xs tracking-[0.22em] text-meteorite uppercase">
                The Alignment
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading text-gradient-silver mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                A single arc. A single dot.
                <br />
                One perfect solution.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mb-10 text-meteorite">
                GeTech Solutions exists to bring singular, precise answers into
                complex ecosystems. We partner with startups, companies,
                individuals, and organizations to engineer digital products
                that endure.
              </p>
            </Reveal>

            <div className="space-y-6">
              {principles.map((p, i) => (
                <Reveal key={p.number} delay={0.15 + i * 0.1}>
                  <div className="flex gap-5 border-l border-nordic/40 pl-5 transition-colors duration-500 hover:border-glow/50">
                    <span className="font-heading text-sm text-nordic-bright">
                      {p.number}
                    </span>
                    <div>
                      <h3 className="font-heading mb-1 font-semibold text-white">
                        {p.title}
                      </h3>
                      <p className="text-sm text-meteorite">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
