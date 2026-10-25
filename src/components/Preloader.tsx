"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExperience } from "@/lib/store";

const lines = [
  "booting experience…",
  "loading memories…",
  "rendering the galaxy…",
  "compiling the future…",
];

export default function Preloader() {
  const { ready, setReady } = useExperience();
  const [pct, setPct] = useState(0);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2200;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      setLine(Math.min(lines.length - 1, Math.floor(eased * lines.length)));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setReady(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setReady]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="font-display text-5xl font-medium text-chalk sm:text-7xl">
              {pct}
              <span className="text-white/30">%</span>
            </span>
            <div className="h-px w-56 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--accent)] to-cyan"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
              {lines[line]}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
