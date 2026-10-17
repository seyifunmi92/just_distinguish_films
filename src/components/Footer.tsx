import { ceo, EMAIL, SITE_NAME, socials, YOUTUBE_CHANNEL_URL, YOUTUBE_HANDLE } from "@/data/site";
import { FilmStrip } from "./Dividers";
import { SocialIcon } from "./icons";
import Reveal from "./Reveal";

const links = [
  { href: "#home", label: "Home" },
  { href: "#films", label: "Films" },
  { href: "#coming-soon", label: "Coming Soon" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black">
      <FilmStrip />

      <div className="wrap pb-10 pt-[clamp(5rem,12vw,9rem)]">
        {/* Closing credits */}
        <Reveal stagger y={22} className="mx-auto grid max-w-4xl gap-12 text-center">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-smoke">A Just Distinguish Films production</p>
          <p className="serif-italic text-[clamp(2.4rem,6.5vw,5.5rem)] leading-[1.02] text-bone">
            Directed by <span className="text-gold">Just Distinguish Films.</span>
          </p>
          <div className="credit-row">
            <p className="credit-role">Chief Executive Officer</p>
            <p className="credit-name">{ceo.name}</p>
          </div>
          <div className="credit-row">
            <p className="credit-role">Watch us on YouTube</p>
            <p className="credit-name">
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="transition-colors duration-500 hover:text-ember">
                {YOUTUBE_HANDLE}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
          <div className="credit-row">
            <p className="credit-role">Contact</p>
            <p className="credit-name !text-[clamp(1.1rem,2.2vw,1.7rem)] normal-case tracking-[0.03em]">
              <a href={`mailto:${EMAIL}`} className="break-all transition-colors duration-500 hover:text-ember">
                {EMAIL}
              </a>
            </p>
          </div>
        </Reveal>

        <div className="mt-[clamp(4rem,9vw,7rem)] flex flex-col items-center justify-between gap-8 border-t border-line pt-8 md:flex-row">
          <a href="#home" className="flex items-center gap-3" aria-label={`${SITE_NAME}, back to top`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" loading="lazy" />
            <span className="font-display text-lg font-bold uppercase tracking-[0.12em]">{SITE_NAME}</span>
          </a>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="nav-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-5">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} ${s.handle} (opens in a new tab)`}
                  className="text-smoke transition-colors duration-500 hover:text-ember"
                >
                  <SocialIcon id={s.id} className="h-6 w-6" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-center text-xs tracking-[0.08em] text-smoke md:text-left">
          © {year} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
