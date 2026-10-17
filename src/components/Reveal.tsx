"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { ensureGsap, MOTION_OK } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
  /** Blur-to-sharp. Keep for small text blocks; skip on large containers. */
  blur?: boolean;
  /** Reveal direct children one after another instead of the wrapper as a whole. */
  stagger?: boolean;
};

/** Slow fade-and-rise when the element scrolls into view. */
export default function Reveal({ children, className, as: Tag = "div", delay = 0, y = 34, blur = false, stagger = false }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const targets = stagger ? Array.from(el.children) : el;
      const from: gsap.TweenVars = { autoAlpha: 0, y };
      const to: gsap.TweenVars = {
        autoAlpha: 1,
        y: 0,
        duration: 1.7,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.16 : 0,
        clearProps: blur ? "transform,filter" : "transform",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      };
      if (blur) {
        from.filter = "blur(12px)";
        to.filter = "blur(0px)";
      }
      gsap.fromTo(targets, from, to);
    });

    return () => mm.revert();
  }, [delay, y, blur, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
