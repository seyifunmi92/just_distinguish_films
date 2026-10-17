"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, FINE_POINTER, MOTION_OK } from "@/lib/motion";

/** A soft crimson light that trails the pointer. Desktop pointers only. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      gsap.set(el, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });
      const xTo = gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" });
      let shown = false;

      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        if (!shown) {
          shown = true;
          gsap.to(el, { opacity: 1, duration: 0.9 });
        }
      };
      const leave = () => {
        shown = false;
        gsap.to(el, { opacity: 0, duration: 0.9 });
      };

      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      return () => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", leave);
      };
    });

    return () => mm.revert();
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
