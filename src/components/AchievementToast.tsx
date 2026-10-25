"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExperience } from "@/lib/store";

/** Little game-style "achievement unlocked" toast for hidden interactions. */
export default function AchievementToast() {
  const unlocked = useExperience((s) => s.unlocked);
  const [toast, setToast] = useState<string | null>(null);
  const seen = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (unlocked.length > seen.current) {
      const latest = unlocked[unlocked.length - 1];
      seen.current = unlocked.length;
      const label = labelFor(latest, unlocked.length);
      setToast(label);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(null), 3200);
    }
  }, [unlocked]);

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 rounded-full border border-[var(--accent)]/40 bg-void/90 px-5 py-2.5 shadow-[0_0_30px_rgba(124,92,255,0.25)] backdrop-blur"
          >
            <svg className="h-5 w-5 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z" />
            </svg>
            <div className="leading-tight">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
                Achievement unlocked
              </p>
              <p className="font-sans text-sm text-chalk">{toast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function labelFor(id: string, count: number): string {
  if (id === "terminal") return "Found the terminal";
  if (id === "sudo") return "Tried to sudo";
  if (id.startsWith("memory-")) return "Opened a memory";
  if (count >= 6) return "Curious explorer";
  return "Story fragment found";
}
