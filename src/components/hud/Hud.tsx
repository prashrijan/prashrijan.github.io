"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { chapters } from "@/lib/data";
import { useExperience } from "@/lib/store";
import Lenis from "lenis";

function scrollToChapter(index: number) {
  const el = document.getElementById(`chapter-${index}`);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Hud() {
  const { chapter, soundOn, toggleSound, theme, toggleTheme, setTerminalOpen } =
    useExperience();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-white/5">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: progress,
            background:
              "linear-gradient(90deg,#7c5cff,#38e1ff,#ff8a5c)",
          }}
        />
      </div>

      {/* Brand / name — top left */}
      <div className="fixed left-5 top-5 z-50 flex items-center gap-2 mix-blend-difference">
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          Prashrijan
        </span>
        <span className="hidden text-[10px] uppercase tracking-[0.25em] text-white/60 sm:inline">
          Shrestha
        </span>
      </div>

      {/* Controls — top right */}
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
        <HudButton label={soundOn ? "Sound on" : "Sound off"} onClick={toggleSound}>
          {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
        </HudButton>
        <HudButton
          label={theme === "night" ? "Night" : "Day"}
          onClick={toggleTheme}
        >
          {theme === "night" ? <MoonIcon /> : <SunIcon />}
        </HudButton>
        <HudButton label="Terminal" onClick={() => setTerminalOpen(true)}>
          <TerminalIcon />
        </HudButton>
      </div>

      {/* Chapter rail — right edge, desktop only */}
      <nav
        aria-label="Chapters"
        className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex"
      >
        {chapters.map((c) => {
          const active = chapter === c.id;
          return (
            <button
              key={c.id}
              onClick={() => scrollToChapter(c.id)}
              className="group flex items-center gap-2"
              aria-current={active ? "true" : undefined}
            >
              <AnimatePresence>
                {active && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="font-sans text-[11px] tracking-wide text-white/80"
                  >
                    {c.label}
                  </motion.span>
                )}
                {!active && (
                  <span className="pointer-events-none font-sans text-[11px] tracking-wide text-white/0 transition-colors group-hover:text-white/40">
                    {c.label}
                  </span>
                )}
              </AnimatePresence>
              <span
                className={`h-[6px] w-[6px] rounded-full transition-all duration-500 ${
                  active
                    ? "scale-150 bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]"
                    : "bg-white/30 group-hover:bg-white/60"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}

function HudButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition hover:scale-105 hover:border-white/30 hover:text-white"
    >
      {children}
    </button>
  );
}

/* --- minimal inline icons --- */
const I = "h-4 w-4";
function SoundOnIcon() {
  return (
    <svg className={I} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16 8a5 5 0 0 1 0 8" />
    </svg>
  );
}
function SoundOffIcon() {
  return (
    <svg className={I} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M22 9l-6 6M16 9l6 6" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg className={I} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg className={I} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
    </svg>
  );
}
function TerminalIcon() {
  return (
    <svg className={I} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M13 15h4" />
    </svg>
  );
}
