"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { useExperience } from "@/lib/store";
import {
  profile,
  skills,
  projects,
  education,
  chapters,
} from "@/lib/data";

type Line = { type: "in" | "out"; text: string };

const BANNER = `Prashrijan OS v1.0 — type 'help' to explore. (Esc to close)`;

function goto(n: number) {
  const el = document.getElementById(`chapter-${n}`);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Terminal() {
  const { terminalOpen, setTerminalOpen, toggleTheme, toggleSound, unlock } =
    useExperience();
  const [history, setHistory] = useState<Line[]>([{ type: "out", text: BANNER }]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Global hotkey: backtick toggles the terminal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        setTerminalOpen(!terminalOpen);
      }
      if (e.key === "Escape") setTerminalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [terminalOpen, setTerminalOpen]);

  useEffect(() => {
    if (terminalOpen) {
      unlock("terminal");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [terminalOpen, unlock]);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  }, [history]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    const [base, arg] = cmd.split(/\s+/);
    const out: string[] = [];

    switch (base) {
      case "":
        break;
      case "help":
        out.push(
          "available commands:",
          "  about       who is Prash",
          "  skills      the tech stack",
          "  projects    shipped products",
          "  education   the foundations",
          "  contact     how to reach me",
          "  goto <1-7>  jump to a chapter",
          "  theme       toggle day / night",
          "  sound       toggle ambient sound",
          "  whoami      a recruiter's tl;dr",
          "  clear       wipe the screen"
        );
        break;
      case "about":
        out.push(
          `${profile.name} — ${profile.role}, ${profile.location}.`,
          profile.manifesto
        );
        break;
      case "skills":
        out.push(skills.map((s) => s.name).join("  ·  "));
        break;
      case "projects":
        projects.forEach((p) =>
          out.push(`${p.name} — ${p.kind} → ${p.live}`)
        );
        break;
      case "education":
        out.push(`${education.degree}`, `${education.school} (${education.period})`);
        break;
      case "contact":
        out.push(
          `email    ${profile.email}`,
          `phone    ${profile.phone}`,
          `github   ${profile.github}`,
          `linkedin ${profile.linkedin}`
        );
        break;
      case "goto": {
        const n = Number(arg);
        if (n >= 1 && n <= 7) {
          out.push(`→ ${chapters[n - 1].label}`);
          setTerminalOpen(false);
          setTimeout(() => goto(n), 200);
        } else out.push("usage: goto <1-7>");
        break;
      }
      case "theme":
        toggleTheme();
        out.push("toggled theme.");
        break;
      case "sound":
        toggleSound();
        out.push("toggled ambient sound.");
        break;
      case "whoami":
        out.push(
          "A full-stack developer who ships. Two products live in production,",
          "three certifications, MERN + TypeScript, and an allergy to",
          "\"that's how we've always done it.\" Open to work."
        );
        break;
      case "sudo":
        out.push("nice try. Prash builds with people, not root. 🙂");
        unlock("sudo");
        break;
      case "ls":
        out.push(chapters.map((c) => c.label.toLowerCase().replace(/\s+/g, "-")).join("  "));
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        out.push(`command not found: ${base}. type 'help'.`);
    }

    setHistory((h) => [
      ...h,
      { type: "in", text: raw },
      ...out.map((text) => ({ type: "out" as const, text })),
    ]);
  }

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setTerminalOpen(false)}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/15 bg-[#0a0c14]/95 shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-white/40">
                prash@portfolio ~ %
              </span>
            </div>
            <div
              ref={bodyRef}
              className="h-72 space-y-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
            >
              {history.map((l, i) => (
                <div
                  key={i}
                  className={l.type === "in" ? "text-cyan" : "text-white/70"}
                >
                  {l.type === "in" ? (
                    <span>
                      <span className="text-emerald-400">➜ </span>
                      {l.text}
                    </span>
                  ) : (
                    <span className="whitespace-pre-wrap">{l.text}</span>
                  )}
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  run(input);
                  setInput("");
                }}
                className="flex items-center gap-2 pt-1"
              >
                <span className="text-emerald-400">➜</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 bg-transparent font-mono text-[13px] text-chalk outline-none"
                  placeholder="type a command…"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
