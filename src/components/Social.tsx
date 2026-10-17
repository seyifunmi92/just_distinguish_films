import { socials } from "@/data/site";
import { ArrowIcon, SocialIcon } from "./icons";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

export default function Social() {
  return (
    <section id="social" aria-labelledby="social-title" className="section">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">
          Stay connected
        </Reveal>
        <SplitReveal id="social-title" text="Follow the story" className="display-xl mt-6" />
        <Reveal className="mt-6">
          <p className="lede">Stay connected with Just Distinguish Films.</p>
        </Reveal>

        <Reveal as="ul" className="mt-14 border-t border-line" stagger>
          {socials.map((s) => (
            <li key={s.id} className="border-b border-line">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative isolate flex items-center justify-between gap-6 overflow-hidden px-2 py-7 sm:px-6 sm:py-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-crimson transition-transform duration-700 [transition-timing-function:var(--ease-cine)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="flex min-w-0 items-center gap-5 sm:gap-8">
                  <SocialIcon id={s.id} className="h-8 w-8 shrink-0 sm:h-10 sm:w-10" />
                  <span className="truncate font-display text-[clamp(1.9rem,5vw,4rem)] font-extrabold uppercase leading-none tracking-[0.01em]">{s.label}</span>
                </span>
                <span className="flex shrink-0 items-center gap-4">
                  <span className="hidden text-sm tracking-[0.08em] text-smoke transition-colors duration-500 group-hover:text-bone sm:block">{s.handle}</span>
                  <ArrowIcon className="h-7 w-7 -rotate-45 transition-transform duration-700 [transition-timing-function:var(--ease-cine)] group-hover:rotate-0" />
                  <span className="sr-only">
                    {s.handle} (opens in a new tab)
                  </span>
                </span>
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
