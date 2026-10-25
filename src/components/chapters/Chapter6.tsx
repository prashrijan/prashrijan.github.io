"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Chapter from "@/components/Chapter";
import Reveal from "@/components/Reveal";
import InViewMount from "@/components/InViewMount";
import { future, education, certifications } from "@/lib/data";

const FutureCity = dynamic(() => import("@/components/three/FutureCity"), {
  ssr: false,
});

export default function Chapter6() {
  return (
    <Chapter index={6} className="min-h-[100svh] py-24">
      {/* City rises behind the content */}
      <InViewMount
        className="pointer-events-none absolute inset-0 opacity-70"
        rootMargin="300px"
      >
        <FutureCity />
      </InViewMount>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-white/40">
            Chapter 06 — The Future
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight text-chalk sm:text-5xl">
            A city that's still{" "}
            <span className="text-gradient italic">under construction</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-mist">
            Every tower is a goal. Some are built, some are scaffolding — which
            is exactly the point.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {future.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group rounded-2xl border border-white/10 bg-void/60 p-6 backdrop-blur-md transition-colors hover:border-[var(--accent)]/40"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-xl text-chalk">{f.title}</h3>
                <span className="shrink-0 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-[var(--accent)]">
                  {f.status}
                </span>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-mist">
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Foundations: education + certs */}
        <Reveal>
          <div className="mt-12 grid gap-4 rounded-2xl border border-white/10 bg-void/60 p-6 backdrop-blur-md sm:grid-cols-2 sm:p-8">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
                Foundations
              </span>
              <h3 className="mt-3 font-display text-xl text-chalk">
                {education.degree}
              </h3>
              <p className="mt-1 font-sans text-sm text-mist">
                {education.school}
              </p>
              <p className="mt-1 font-mono text-xs text-white/40">
                {education.period}
              </p>
            </div>
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
                Certifications
              </span>
              <ul className="mt-3 space-y-2">
                {certifications.map((c) => (
                  <li
                    key={c.name}
                    className="flex items-center gap-3 font-sans text-sm text-chalk/90"
                  >
                    <svg className="h-4 w-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>
                      {c.name}
                      <span className="text-white/40"> · {c.issuer}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Chapter>
  );
}
