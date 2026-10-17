import { featuredVideoId, getVideo, KIND_LABEL } from "@/data/site";
import { watchUrl } from "@/lib/video";
import CtaButton from "./CtaButton";
import Parallax from "./Parallax";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import YouTubeThumb from "./YouTubeThumb";

const film = getVideo(featuredVideoId);
const behindTheScenes = getVideo("7tVaWpvEGL8");

export default function FeaturedFilm() {
  return (
    <section id="featured" aria-labelledby="featured-title" className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
      <Parallax range={10} className="absolute -inset-y-[14%] inset-x-0 -z-20">
        <YouTubeThumb id={film.id} alt="Still from A Million Baby" className="h-full w-full saturate-90 brightness-75" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-ink/10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/80" aria-hidden="true" />

      <div className="wrap relative grid gap-12 pb-[clamp(4rem,10vw,8rem)] pt-40 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal as="p" className="eyebrow">
            Featured film
          </Reveal>
          <SplitReveal id="featured-title" as="h2" text={film.film} className="mt-6 font-display text-[clamp(4rem,14vw,12rem)] font-extrabold uppercase leading-[0.82]" />
          <Reveal className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-smoke">
            <span className="text-gold">{KIND_LABEL[film.kind]}</span>
            <span aria-hidden="true">/</span>
            <span>{film.uploaded.slice(0, 4)}</span>
            <span aria-hidden="true">/</span>
            <span className="tabular-nums">{film.duration}</span>
          </Reveal>
          <Reveal className="mt-6">
            <p className="lede">Step inside the world of A Million Baby. Watch the official trailer on our YouTube channel, then go behind the scenes with the cast and crew.</p>
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap gap-4">
            <CtaButton href={watchUrl(film.id)} external>
              Watch the trailer
            </CtaButton>
            <CtaButton href={watchUrl(behindTheScenes.id)} external variant="ghost">
              Behind the scenes
            </CtaButton>
          </Reveal>
        </div>

        <Reveal className="grid gap-2 lg:text-right" y={20}>
          <p className="credit-role !text-left lg:!text-right">Produced by</p>
          <p className="credit-name">Moradeke Adegboyega</p>
        </Reveal>
      </div>
    </section>
  );
}
