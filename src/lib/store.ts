"use client";

import { create } from "zustand";

interface ExperienceState {
  /** 1-7, the chapter currently in view. */
  chapter: number;
  setChapter: (c: number) => void;

  /** Ambient soundtrack on/off. */
  soundOn: boolean;
  toggleSound: () => void;

  /** "night" (default, cinematic) or "day". */
  theme: "day" | "night";
  toggleTheme: () => void;

  /** Whether the intro preloader has finished. */
  ready: boolean;
  setReady: (v: boolean) => void;

  /** Terminal easter-egg visibility. */
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;

  /** Achievements unlocked by interaction (chapter keys). */
  unlocked: string[];
  unlock: (id: string) => void;
}

export const useExperience = create<ExperienceState>((set) => ({
  chapter: 1,
  setChapter: (c) => set({ chapter: c }),

  soundOn: false,
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),

  theme: "night",
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === "night" ? "day" : "night" })),

  ready: false,
  setReady: (v) => set({ ready: v }),

  terminalOpen: false,
  setTerminalOpen: (v) => set({ terminalOpen: v }),

  unlocked: [],
  unlock: (id) =>
    set((s) =>
      s.unlocked.includes(id) ? s : { unlocked: [...s.unlocked, id] }
    ),
}));
