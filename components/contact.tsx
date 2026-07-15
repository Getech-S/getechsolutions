"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Magnetic } from "./magnetic-button";

type Status = "idle" | "sending" | "sent" | "error";

function FloatingField({
  id,
  label,
  type = "text",
  textarea = false,
  required = true,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const floated = focused || value.length > 0;

  const shared =
    "peer w-full rounded-xl border bg-obsidian/60 px-4 pt-6 pb-2.5 text-sm text-white transition-all duration-500 placeholder-transparent " +
    (focused
      ? "border-nordic-bright/70 shadow-[0_0_0_3px_rgba(43,65,98,0.25)]"
      : "border-meteorite/15 hover:border-meteorite/30");

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${shared} resize-none`}
          placeholder={label}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={shared}
          placeholder={label}
        />
      )}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-300 ${
          floated
            ? "top-2 text-[10px] tracking-widest text-nordic-bright uppercase"
            : "top-4.5 text-sm text-meteorite/60"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/getechsolutions@protonmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            organization: data.get("organization") || "—",
            message: data.get("message"),
            _subject: "New proposal request — getechsolutions.com",
            _template: "table",
          }),
        }
      );
      const body = await res.json().catch(() => ({}));
      if (res.ok && String(body.success) !== "false") setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative px-6 py-28 md:py-36">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_60%,rgba(43,65,98,0.2),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Contact"
          title="Request a Proposal"
          description="Tell us where you're headed. We'll chart the alignment."
        />

        <Reveal type="scale">
          <div className="bento-cell noise p-8 md:p-12">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 14,
                      delay: 0.2,
                    }}
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-glow/30 bg-glow/10 text-glow"
                  >
                    <CheckCircle2 size={28} />
                  </motion.div>
                  <h3 className="font-heading mb-2 text-2xl font-semibold text-white">
                    Transmission Received
                  </h3>
                  <p className="max-w-sm text-sm text-meteorite">
                    Your signal has reached our orbit. Expect a response within
                    24 hours — we&apos;re already thinking about your solution.
                  </p>
                  <motion.span
                    className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.3em] text-glow/60 uppercase"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                  >
                    <span className="h-1 w-1 rounded-full bg-glow" />
                    Secure channel · Encrypted
                  </motion.span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FloatingField id="name" label="Full Name" />
                    <FloatingField id="email" label="Email Address" type="email" />
                  </div>
                  <FloatingField
                    id="organization"
                    label="Company / Organization"
                    required={false}
                  />
                  <FloatingField id="message" label="Project Vision" textarea />
                  <div className="pt-2">
                    <Magnetic strength={0.15} className="w-full">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-semibold text-obsidian transition-all duration-500 hover:shadow-[0_0_36px_rgba(255,255,255,0.22)] disabled:opacity-70"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Transmitting…
                          </>
                        ) : (
                          <>
                            Send Transmission
                            <Send
                              size={15}
                              className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                            />
                          </>
                        )}
                      </button>
                    </Magnetic>
                    {status === "error" && (
                      <p className="mt-4 text-center text-sm text-red-300/80">
                        Transmission failed — please retry, or email us directly
                        at getechsolutions@protonmail.com.
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
