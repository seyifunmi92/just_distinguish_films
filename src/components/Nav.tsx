"use client";

import { useEffect, useState } from "react";
import { EMAIL, SITE_NAME, YOUTUBE_CHANNEL_URL, socials } from "@/data/site";
import CtaButton from "./CtaButton";
import { SocialIcon } from "./icons";

const links = [
  { href: "#home", label: "Home" },
  { href: "#films", label: "Films" },
  { href: "#coming-soon", label: "Coming Soon" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Unlock scrolling right away so the smooth-scroll anchor handler can move the page.
  const closeMenu = () => {
    document.documentElement.style.overflow = "";
    setOpen(false);
  };

  return (
    <>
      <header
        className={`nav-enter fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-700 ${
          scrolled || open ? "border-white/5 bg-ink/70 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <nav aria-label="Primary" className="wrap flex h-[4.5rem] items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-3" aria-label={`${SITE_NAME}, back to top`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
            <span className="hidden font-display text-xl font-bold uppercase tracking-[0.12em] sm:block">{SITE_NAME}</span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <CtaButton href={YOUTUBE_CHANNEL_URL} external small className="hidden sm:inline-flex">
              Watch now
            </CtaButton>
            <button
              type="button"
              className="burger lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <div id="mobile-menu" className="mobile-menu lg:hidden" data-open={open} aria-hidden={!open}>
        <ul className="grid gap-2">
          {links.map((l, i) => (
            <li key={l.href} className="m-item" style={{ "--i": i } as React.CSSProperties}>
              <a
                href={l.href}
                onClick={closeMenu}
                className="block font-display text-[clamp(3rem,13vw,5rem)] font-extrabold uppercase leading-[1.02] tracking-[0.01em]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="m-item grid gap-6" style={{ "--i": links.length } as React.CSSProperties}>
          <CtaButton href={YOUTUBE_CHANNEL_URL} external magnetic={false} className="w-full">
            Watch now on YouTube
          </CtaButton>
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-smoke">
            <span className="break-all">{EMAIL}</span>
            <span className="flex gap-4">
              {socials.map((s) => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} ${s.handle}`} className="text-bone">
                  <SocialIcon id={s.id} className="h-6 w-6" />
                </a>
              ))}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
