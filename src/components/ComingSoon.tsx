import { comingSoon, YOUTUBE_SUBSCRIBE_URL } from "@/data/site";
import ClipReveal from "./ClipReveal";
import CtaButton from "./CtaButton";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

/** Film-leader countdown poster, shown until real upcoming titles are added in data/site.ts. */
function LeaderPoster() {
  return (
    <ClipReveal className="leader mx-auto w-full max-w-[22rem]">
      <div className="leader-ring" aria-hidden="true">
        <span className="leader-sweep" />
      </div>
      <div className="leader-num" aria-hidden="true">
        <span>3</span>
        <span>2</span>
        <span>1</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 grid gap-2 p-6 text-center">
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.3em] text-gold">Next production</p>
        <p className="font-display text-4xl font-extrabold uppercase leading-none">Announcing soon</p>
      </div>
    </ClipReveal>
  );
}

export default function ComingSoon() {
  const hasTitles = comingSoon.length > 0;

  return (
    <section id="coming-soon" aria-labelledby="coming-soon-title" className="section">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className={hasTitles ? "lg:col-span-2" : ""}>
          <Reveal as="p" className="eyebrow">
            In the works
          </Reveal>
          <SplitReveal id="coming-soon-title" text="Coming Soon" className="display-xl mt-6" />
          <Reveal className="mt-8">
            <p className="lede">
              {hasTitles
                ? "The next stories from Just Distinguish Films."
                : "New stories are on the way. Subscribe on YouTube and be the first to see them when they arrive."}
            </p>
          </Reveal>
          {!hasTitles ? (
            <Reveal className="mt-10">
              <CtaButton href={YOUTUBE_SUBSCRIBE_URL} external>
                Stay tuned
              </CtaButton>
            </Reveal>
          ) : null}
        </div>

        {hasTitles ? (
          <ul className="grid gap-12 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            {comingSoon.map((film) => (
              <li key={film.title}>
                <ClipReveal className="leader">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {film.poster ? <img src={film.poster} alt={`Poster for ${film.title}`} className="absolute inset-0 h-full w-full object-cover" /> : null}
                </ClipReveal>
                <div className="mt-5">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold">
                    Coming soon{film.releaseDate ? ` · ${film.releaseDate}` : ""}
                    {film.genre ? ` · ${film.genre}` : ""}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-bold uppercase leading-none">{film.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">{film.synopsis}</p>
                  <div className="mt-5">
                    <CtaButton href={film.teaserUrl ?? YOUTUBE_SUBSCRIBE_URL} external variant="ghost" small>
                      {film.teaserUrl ? "Watch teaser" : "Stay tuned"}
                    </CtaButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <LeaderPoster />
        )}
      </div>
    </section>
  );
}
