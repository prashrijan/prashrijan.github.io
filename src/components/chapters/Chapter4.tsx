"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Chapter from "@/components/Chapter";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

export default function Chapter4() {
  const [activeId, setActiveId] = useState<string>(projects[0].id);
  const active = projects.find((p) => p.id === activeId)!;

  return (
    <Chapter index={4} className="min-h-[100svh] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-white/40">
            Chapter 04 — Building
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-medium leading-tight text-chalk sm:text-5xl">
            Built, shipped,{" "}
            <span className="text-gradient italic">still running</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-mist">
            Not concepts. Real products with real users — pick one and step
            inside.
          </p>
        </Reveal>

        {/* Selector tabs */}
        <div className="mt-12 flex flex-wrap gap-3">
          {projects.map((p) => {
            const on = p.id === activeId;
            return (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`rounded-full border px-5 py-2 font-sans text-sm transition ${
                  on
                    ? "border-transparent text-void"
                    : "border-white/15 text-white/70 hover:border-white/40"
                }`}
                style={on ? { background: p.accent } : undefined}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Featured product */}
        <AnimatePresence mode="wait">
          <motion.article
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid gap-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6 sm:p-10 lg:grid-cols-2"
          >
            {/* Left: media */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/40">
              {active.video ? (
                <video
                  key={active.video}
                  className="h-full w-full object-cover"
                  src={active.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div
                  className="flex h-full w-full flex-col items-center justify-center gap-4"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${active.accent}33, transparent 70%)`,
                  }}
                >
                  <span
                    className="font-display text-5xl font-semibold"
                    style={{ color: active.accent }}
                  >
                    {active.name}
                  </span>
                  <span className="font-sans text-xs uppercase tracking-[0.3em] text-white/40">
                    live · {active.year}
                  </span>
                </div>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] uppercase tracking-widest text-white/80 backdrop-blur">
                Live in production
              </span>
            </div>

            {/* Right: details */}
            <div className="flex flex-col">
              <span
                className="font-sans text-[11px] uppercase tracking-[0.25em]"
                style={{ color: active.accent }}
              >
                {active.kind}
              </span>
              <h3 className="mt-2 font-display text-3xl text-chalk sm:text-4xl">
                {active.name}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-mist">
                {active.summary}
              </p>

              <ul className="mt-5 space-y-2.5">
                {active.impact.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 font-sans text-sm leading-relaxed text-chalk/90"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: active.accent }}
                    />
                    {line}
                  </li>
                ))}
              </ul>

              {/* Architecture / stack */}
              <div className="mt-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Architecture
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {active.stack.map((tech, i) => (
                    <span key={tech} className="flex items-center gap-2">
                      <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-chalk/90">
                        {tech}
                      </span>
                      {i < active.stack.length - 1 && (
                        <span className="text-white/20">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                <a
                  href={active.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-sm font-medium text-void transition hover:gap-3"
                  style={{ background: active.accent }}
                >
                  Open live demo
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                </a>
                <span className="font-mono text-xs text-white/40">
                  {active.live.replace("https://", "")}
                </span>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </Chapter>
  );
}
