"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ensureGsap, MOTION_OK } from "@/lib/motion";

type Props = { children: ReactNode; className?: string; range?: number };

/** Drifts its content vertically as the parent section scrolls past. Scrubbed, so it follows the scroll exactly. */
export default function Parallax({ children, className, range = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        el,
        { yPercent: -range },
        {
          yPercent: range,
          ease: "none",
          scrollTrigger: { trigger: el.closest("section") ?? el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    return () => mm.revert();
  }, [range]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
