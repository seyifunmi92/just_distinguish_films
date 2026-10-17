"use client";

import { useEffect, useRef, type ElementType } from "react";
import { ensureGsap, MOTION_OK } from "@/lib/motion";
import Words from "./Words";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  delay?: number;
};

/** Heading whose words rise out of a mask when scrolled into view. */
export default function SplitReveal({ text, as: Tag = "h2", className, id, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.08,
          delay,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        },
      );
    });

    return () => mm.revert();
  }, [delay]);

  return (
    <Tag ref={ref} id={id} className={className}>
      <Words text={text} />
    </Tag>
  );
}
