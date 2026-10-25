"use client";

import { motion } from "framer-motion";
import Chapter from "@/components/Chapter";
import { profile } from "@/lib/data";

export default function Chapter1() {
  return (
    <Chapter index={1} className="min-h-[100svh]">
      <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.4 }}
          className="font-sans text-xs uppercase tracking-[0.4em] text-white/40"
        >
          Chapter 01 — The Beginning
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-4xl font-display text-4xl font-medium leading-[1.1] text-chalk sm:text-6xl md:text-7xl"
        >
          Every developer
          <br />
          starts somewhere.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 2 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <p className="max-w-md font-sans text-sm leading-relaxed text-mist">
            Mine began in a town in {profile.origin} — the country with the only
            non-rectangular flag on Earth.
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.status}
          </span>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
            Scroll to begin the journey
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1"
          >
            <span className="h-2 w-1 rounded-full bg-white/60" />
          </motion.span>
        </motion.div>
      </div>
    </Chapter>
  );
}
