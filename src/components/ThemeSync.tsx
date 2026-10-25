"use client";

import { useEffect } from "react";
import { useExperience } from "@/lib/store";

/** Mirrors the store theme onto <html data-theme> so CSS variables switch. */
export default function ThemeSync() {
  const theme = useExperience((s) => s.theme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return null;
}
