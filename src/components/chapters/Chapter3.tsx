"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Chapter from "@/components/Chapter";
import Reveal from "@/components/Reveal";
import InViewMount from "@/components/InViewMount";
import { skills } from "@/lib/data";

const SkillGalaxy = dynamic(() => import("@/components/three/SkillGalaxy"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-white/30">
      Spinning up the galaxy…
    </div>
  ),
});

type Skill = (typeof skills)[number];

export default function Chapter3() {
  const [active, setActive] = useState<Skill | null>(null);

  return (
    <Chapter index={3} className="min-h-[100svh] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-white/40">
            Chapter 03 — Learning
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight text-chalk sm:text-5xl">
            A small universe — every skill is a{" "}
            <span className="text-gradient italic">star</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-mist">
            No progress bars. No percentages. Drag to spin the cluster, hover a
            star, and read the proof — every skill earned on a real, shipped
            product.
          </p>
        </Reveal>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative h-[440px] w-full rounded-3xl border border-white/5 bg-black/20 sm:h-[520px]">
            <InViewMount className="h-full w-full">
              <SkillGalaxy onHover={setActive} />
            </InViewMount>
            <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.3em] text-white/30">
              drag to spin · hover a star
            </span>
          </div>

          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
                >
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.25em]"
                    style={{ color: active.color }}
                  >
                    {active.group}
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-chalk">
                    {active.name}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-mist">
                    {active.proof}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-dashed border-white/10 p-6"
                >
                  <p className="font-sans text-sm leading-relaxed text-white/40">
                    Hover any star to see where the skill was actually used.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.slice(0, 6).map((s) => (
                      <span
                        key={s.name}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/50"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
