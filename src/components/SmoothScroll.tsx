"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap, MOTION_OK } from "@/lib/motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Smooth, inertial scrolling that stays in sync with GSAP ScrollTrigger. Off for reduced-motion users. */
export default function SmoothScroll() {
  useEffect(() => {
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const lenis = new Lenis({ duration: 1.3, smoothWheel: true, wheelMultiplier: 0.9 });
      window.__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const onClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const link = (e.target as Element | null)?.closest?.("a[href^='#']");
        const hash = link?.getAttribute("href");
        if (!hash || hash === "#") return;
        const target = hash === "#home" ? 0 : document.querySelector<HTMLElement>(hash);
        if (target === null) return;
        e.preventDefault();
        lenis.scrollTo(target, { duration: 1.9, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
        if (target instanceof HTMLElement) target.focus({ preventScroll: true });
        history.replaceState(null, "", hash);
      };
      document.addEventListener("click", onClick);

      return () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
        window.__lenis = undefined;
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
