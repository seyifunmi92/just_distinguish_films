"use client";

import { useEffect, useRef } from "react";
import { heroStillIds, TAGLINE } from "@/data/site";
import { ensureGsap, MOTION_OK } from "@/lib/motion";
import CtaButton from "./CtaButton";
import Words from "./Words";
import YouTubeThumb from "./YouTubeThumb";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(el);
      const html = document.documentElement;

      let seen = false;
      try {
        seen = sessionStorage.getItem("jdf-intro") === "1";
      } catch {
        /* storage unavailable, play the full intro */
      }

      // Hold the page still while the curtain is down.
      html.style.overflow = "hidden";
      const unlock = () => {
        html.style.overflow = "";
        gsap.set(q("[data-intro]"), { display: "none" });
        try {
          sessionStorage.setItem("jdf-intro", "1");
        } catch {
          /* ignore */
        }
      };

      gsap.set(q("[data-word]"), { yPercent: 118 });
      const open = seen ? 0.2 : 2.7; // moment the curtain opens

      const tl = gsap.timeline();

      if (!seen) {
        tl.fromTo(
          q("[data-intro-logo]"),
          { autoAlpha: 0, scale: 0.92, filter: "blur(16px)" },
          { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.9, ease: "power2.out" },
          0.3,
        ).to(q("[data-intro-logo]"), { autoAlpha: 0, scale: 1.05, filter: "blur(10px)", duration: 0.9, ease: "power2.in" }, 2.3);
      }

      tl.to(q("[data-intro-top]"), { yPercent: -101, duration: 1.7, ease: "power4.inOut" }, open)
        .to(q("[data-intro-bottom]"), { yPercent: 101, duration: 1.7, ease: "power4.inOut" }, open)
        .fromTo(q("[data-hero-bg]"), { scale: 1.25 }, { scale: 1, duration: 7, ease: "power2.out" }, open)
        .fromTo(q("[data-hero-fx]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 2.4, ease: "power1.inOut" }, open + 0.3)
        .to(q("[data-word]"), { yPercent: 0, duration: 1.7, ease: "power4.out", stagger: 0.1 }, open + 0.9)
        .fromTo(
          q("[data-hero]"),
          { autoAlpha: 0, y: 26, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out", stagger: 0.17, clearProps: "filter,transform" },
          open + 1.7,
        )
        .add(unlock, open + 1.8);

      return () => {
        tl.kill();
        html.style.overflow = "";
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* Opening curtain: black screen, logo, then the letterbox opens. */}
      <div data-intro className="intro" aria-hidden="true">
        <div data-intro-top className="intro-half intro-top" />
        <div data-intro-bottom className="intro-half intro-bottom" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-intro-logo src="/logo.jpg" alt="" width={240} height={240} className="intro-logo" />
      </div>

      <div data-hero-bg className="absolute inset-0 -z-20 will-change-transform" aria-hidden="true">
        {heroStillIds.map((id, i) => (
          <div key={id} className="hero-still" style={{ animationDelay: `${i * 7}s` }}>
            <YouTubeThumb id={id} alt="" eager={i === 0} className="h-full w-full" />
          </div>
        ))}
      </div>
      <div data-hero-fx className="hero-fx absolute inset-0 -z-10" aria-hidden="true" />

      <div className="wrap relative pb-[clamp(3.5rem,10vh,7rem)] pt-40">
        <p data-hero className="eyebrow">
          Movies &amp; Entertainment
        </p>

        <h1 id="hero-title" className="hero-title mt-6">
          <span className="block">
            <Words text="Just" />
          </span>
          <span className="block">
            <Words text="Distinguish" />
          </span>
          <span className="block text-ember">
            <Words text="Films" />
          </span>
        </h1>

        <p data-hero className="serif-italic mt-8 text-[clamp(1.9rem,4vw,3.4rem)] leading-none text-gold">
          {TAGLINE}
        </p>

        <p data-hero className="lede mt-6">
          Cinema with heart, made to be felt. Step into our trailers, behind-the-scenes and productions, streaming now on our YouTube channel.
        </p>

        <div data-hero className="mt-10 flex flex-wrap gap-4">
          <CtaButton href="#films">Watch our films</CtaButton>
          <CtaButton href="#about" variant="ghost">
            Explore Just Distinguish
          </CtaButton>
        </div>

        <div data-hero className="absolute bottom-[clamp(3.5rem,10vh,7rem)] right-[var(--gutter)] hidden flex-col items-center gap-4 md:flex" aria-hidden="true">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-smoke [writing-mode:vertical-rl]">Scroll</span>
          <span className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
