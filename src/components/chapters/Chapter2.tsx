"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Chapter from "@/components/Chapter";
import Reveal from "@/components/Reveal";
import { memories } from "@/lib/data";
import { useExperience } from "@/lib/store";

const ICONS: Record<string, React.ReactNode> = {
  flag: <path d="M4 21V4m0 0c4-2 8 2 12 0v9c-4 2-8-2-12 0" />,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M8 20h8M12 16v4" /></>,
  code: <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15 9l-2 4-4 2 2-4 4-2z" /></>,
};

export default function Chapter2() {
  const [open, setOpen] = useState<string | null>(null);
  const unlock = useExperience((s) => s.unlock);

  return (
    <Chapter index={2} className="min-h-[100svh] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-white/40">
            Chapter 02 — Curiosity
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight text-chalk sm:text-5xl">
            A room full of <span className="text-gradient italic">firsts</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-mist">
            Float through the objects that started it all. Tap one to open the
            memory.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {memories.map((m, i) => (
            <motion.button
              key={m.id}
              onClick={() => {
                setOpen(open === m.id ? null : m.id);
                unlock(`memory-${m.id}`);
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="group relative flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-sm transition-colors hover:border-[var(--accent)]/40"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <span className="animate-float" style={{ animationDelay: `${i * 0.7}s` }}>
                <svg
                  className="h-9 w-9 text-white/70 transition-colors group-hover:text-[var(--accent)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[m.icon]}
                </svg>
              </span>
              <span className="font-sans text-xs font-medium text-chalk">
                {m.title}
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-[var(--accent)]/30 transition-opacity group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6 sm:p-8"
            >
              <p className="font-display text-lg italic leading-relaxed text-chalk sm:text-2xl">
                “{memories.find((m) => m.id === open)?.line}”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  );
}
