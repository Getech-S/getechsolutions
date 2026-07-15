"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AlignmentLogo } from "./logo";
import { Magnetic } from "./magnetic-button";

const links = [
  { label: "Services", href: "#services" },
  { label: "Labs", href: "#labs" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`glass flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled ? "shadow-[0_8px_40px_rgba(2,4,6,0.6)]" : ""
        }`}
        aria-label="Primary"
      >
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-3">
          <AlignmentLogo size={34} />
          <span className="font-heading text-sm font-semibold tracking-[0.18em] text-platinum uppercase transition-colors group-hover:text-white">
            GeTech <span className="text-meteorite">Solutions</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm text-meteorite transition-colors duration-300 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-glow/60 after:transition-all after:duration-500 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-nordic/60 bg-nordic/20 px-5 py-2.5 text-sm font-medium text-white transition-all duration-500 hover:border-glow/40 hover:bg-nordic/40 hover:shadow-[inset_0_0_24px_rgba(125,211,252,0.12)]"
            >
              Launch Project
              <ArrowUpRight
                size={15}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-platinum md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass absolute top-[76px] left-4 right-4 rounded-2xl p-6 md:hidden"
          >
            <ul className="flex flex-col gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-heading text-lg text-platinum transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-xl border border-nordic/60 bg-nordic/20 px-5 py-2.5 text-sm font-medium text-white"
                >
                  Launch Project <ArrowUpRight size={15} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
