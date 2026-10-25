"use client";

import { motion } from "framer-motion";
import Chapter from "@/components/Chapter";
import Reveal from "@/components/Reveal";
import { thinking } from "@/lib/data";

export default function Chapter5() {
  return (
    <Chapter index={5} className="min-h-[100svh] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-white/40">
            Chapter 05 — Problem Solver
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight text-chalk sm:text-5xl">
            How I <span className="text-gradient italic">think</span> about the
            hard parts.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-mist">
            Architecture, data, performance, product. Four decisions from real
            builds — and the reasoning behind each.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* spine */}
          <div className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[var(--accent)]/60 via-white/10 to-transparent md:left-1/2" />

          <div className="space-y-10">
            {thinking.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className={`relative pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                {/* node */}
                <span
                  className={`absolute top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-void text-xs font-semibold text-[var(--accent)] left-0 ${
                    i % 2 === 0
                      ? "md:left-auto md:-right-4 md:translate-x-1/2"
                      : "md:-left-4 md:-translate-x-1/2"
                  }`}
                >
                  0{i + 1}
                </span>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-[var(--accent)]/40">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
                    {t.facet}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-chalk">
                    {t.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-mist">
                    {t.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Chapter>
  );
}
