import { ceo } from "@/data/site";
import ClipReveal from "./ClipReveal";
import CtaButton from "./CtaButton";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

export default function Ceo() {
  return (
    <section id="leadership" aria-labelledby="leadership-title" className="section">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <ClipReveal className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[3px] border border-line bg-ash">
          {ceo.portrait ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={ceo.portrait} alt={`Portrait of ${ceo.name}`} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 55% at 50% 38%, rgba(193,18,31,0.45), transparent 70%), linear-gradient(to bottom, #1b1416, #0a0708)",
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.jpg"
                alt="Just Distinguish TV logo"
                width={240}
                height={240}
                className="absolute left-1/2 top-[40%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-6 pt-24 text-center">
                <p className="font-display text-3xl font-bold uppercase tracking-[0.08em]">{ceo.name}</p>
              </div>
            </>
          )}
        </ClipReveal>

        <div>
          <Reveal as="p" className="eyebrow">
            Creative leadership
          </Reveal>
          <SplitReveal id="leadership-title" text={ceo.name} className="display-lg mt-6" />
          <Reveal className="mt-4">
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.28em] text-gold">{ceo.role}</p>
          </Reveal>
          <div className="mt-8 grid gap-5">
            {ceo.bio.map((paragraph) => (
              <Reveal key={paragraph}>
                <p className="lede">{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap gap-4">
            <CtaButton href={`https://www.instagram.com/${ceo.instagram}/`} external variant="ghost">
              @{ceo.instagram}
            </CtaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
