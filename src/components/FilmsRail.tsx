"use client";

import { useRef, type ReactNode } from "react";
import { ArrowIcon } from "./icons";

/** Netflix-style horizontal rail with snap scrolling and arrow controls. */
export default function FilmsRail({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollByPage = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrowClass =
    "grid h-12 w-12 place-items-center rounded-full border border-white/20 text-bone transition-[background-color,border-color,box-shadow] duration-500 hover:border-ember hover:bg-crimson hover:shadow-[0_0_30px_rgba(230,57,70,0.45)]";

  return (
    <>
      <div className="wrap mb-12 flex flex-wrap items-end justify-between gap-8">
        {heading}
        <div className="flex gap-3">
          <button type="button" className={arrowClass} aria-label="Previous films" onClick={() => scrollByPage(-1)}>
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button type="button" className={arrowClass} aria-label="Next films" onClick={() => scrollByPage(1)}>
            <ArrowIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div ref={ref} className="rail" role="region" aria-label="Our films" tabIndex={0}>
        {children}
      </div>
    </>
  );
}
