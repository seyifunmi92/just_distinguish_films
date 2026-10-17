"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ensureGsap, MOTION_OK } from "@/lib/motion";

type Props = { children: ReactNode; className?: string; delay?: number };

/** Masked wipe reveal with a slow settle on the image inside. */
export default function ClipReveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const trigger = { trigger: el, start: "top 92%", once: true };
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, delay, ease: "power4.inOut", scrollTrigger: trigger, clearProps: "clipPath" },
      );
      const img = el.querySelector("img");
      if (img) {
        gsap.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2.4, delay, ease: "power3.out", scrollTrigger: trigger, clearProps: "transform" });
      }
    });

    return () => mm.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
