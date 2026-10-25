"use client";

import { motion } from "framer-motion";
import Chapter from "@/components/Chapter";
import Reveal from "@/components/Reveal";
import { profile, stats } from "@/lib/data";

const links = [
  {
    label: "GitHub",
    value: profile.githubHandle,
    href: profile.github,
    pos: { top: "12%", left: "18%" },
  },
  {
    label: "LinkedIn",
    value: "prashrijanshrestha",
    href: profile.linkedin,
    pos: { top: "22%", left: "72%" },
  },
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    pos: { top: "60%", left: "30%" },
  },
  {
    label: "Résumé",
    value: "Request a copy",
    href: `mailto:${profile.email}?subject=Résumé request&body=Hi Prash, I'd love a copy of your résumé.`,
    pos: { top: "55%", left: "78%" },
  },
];

export default function Chapter7() {
  return (
    <Chapter index={7} className="min-h-[100svh] py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-display text-3xl text-chalk sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-1 font-sans text-[11px] uppercase tracking-wide text-white/40">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Constellation */}
        <div className="relative mt-20">
          <div className="relative mx-auto h-[280px] max-w-3xl sm:h-[320px]">
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
                style={l.pos}
                className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              >
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-white shadow-[0_0_16px_var(--accent)]" />
                </span>
                <span className="whitespace-nowrap rounded-full border border-white/10 bg-void/70 px-3 py-1 font-sans text-xs text-chalk backdrop-blur transition-colors group-hover:border-[var(--accent)]/50">
                  <span className="font-medium">{l.label}</span>
                  <span className="ml-2 text-white/40">{l.value}</span>
                </span>
              </motion.a>
            ))}
          </div>

          <Reveal>
            <h2 className="mt-4 text-center font-display text-4xl font-medium leading-tight text-chalk sm:text-6xl">
              Let's build something
              <br />
              <span className="text-gradient italic">meaningful</span> together.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-md text-center font-sans text-sm leading-relaxed text-mist">
              Got a product to ship, a role to fill, or just want to argue about
              tabs vs spaces? My inbox is open.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full bg-chalk px-6 py-3 font-sans text-sm font-semibold text-void transition hover:scale-105"
              >
                Say hello
              </a>
              <a
                href={profile.phoneHref}
                className="rounded-full border border-white/20 px-6 py-3 font-sans text-sm text-chalk transition hover:border-white/50"
              >
                {profile.phone}
              </a>
            </div>
          </Reveal>
        </div>

        <footer className="mt-24 flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-center">
          <p className="font-sans text-xs text-white/40">
            Designed &amp; built with chiya in Sydney — {profile.name}, 2026.
          </p>
          <p className="font-mono text-[10px] text-white/25">
            Next.js · TypeScript · Three.js · GSAP · Framer Motion · Lenis ·
            Tailwind
          </p>
        </footer>
      </div>
    </Chapter>
  );
}
