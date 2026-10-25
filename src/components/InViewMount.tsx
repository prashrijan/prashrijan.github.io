"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders children only once the wrapper scrolls within `rootMargin` of the
 * viewport, and (by default) keeps them mounted afterwards. Used to defer the
 * heavier WebGL scenes so they never cost anything on first paint.
 */
export default function InViewMount({
  children,
  rootMargin = "200px",
  keepMounted = true,
  className = "",
  fallback = null,
}: {
  children: React.ReactNode;
  rootMargin?: string;
  keepMounted?: boolean;
  className?: string;
  fallback?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (keepMounted) obs.disconnect();
        } else if (!keepMounted) {
          setInView(false);
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, keepMounted]);

  return (
    <div ref={ref} className={className}>
      {inView ? children : fallback}
    </div>
  );
}
