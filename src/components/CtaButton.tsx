"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ensureGsap, FINE_POINTER, MOTION_OK } from "@/lib/motion";
import { ArrowIcon } from "./icons";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  small?: boolean;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
};

/** Cinematic button: red glow, arrow slide and a slight magnetic pull toward the pointer. */
export default function CtaButton({
  href,
  children,
  variant = "primary",
  external = false,
  small = false,
  arrow = true,
  magnetic = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !magnetic) return;
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });

    return () => mm.revert();
  }, [magnetic]);

  const classes = ["cta", variant === "primary" ? "cta-primary" : "cta-ghost", small ? "cta-sm" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a ref={ref} href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span>{children}</span>
      {arrow ? <ArrowIcon className="cta-arrow" /> : null}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
