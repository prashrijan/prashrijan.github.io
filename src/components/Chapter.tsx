"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/lib/store";

/**
 * Full-viewport story chapter. Reports itself as the active chapter whenever it
 * crosses the middle of the screen, which drives the HUD rail and the backdrop
 * mood. Children handle their own internal motion.
 */
export default function Chapter({
  index,
  children,
  className = "",
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const setChapter = useExperience((s) => s.setChapter);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setChapter(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index, setChapter]);

  return (
    <section
      id={`chapter-${index}`}
      ref={ref}
      data-chapter={index}
      className={`relative w-full ${className}`}
    >
      {children}
    </section>
  );
}
