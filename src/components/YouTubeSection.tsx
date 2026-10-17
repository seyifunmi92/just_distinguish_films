import {
  getVideo,
  KIND_LABEL,
  showreelVideoId,
  YOUTUBE_CHANNEL_NAME,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_HANDLE,
  YOUTUBE_SUBSCRIBE_URL,
} from "@/data/site";
import { watchUrl } from "@/lib/video";
import ClipReveal from "./ClipReveal";
import CtaButton from "./CtaButton";
import { PlayIcon, YouTubeIcon } from "./icons";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import YouTubeThumb from "./YouTubeThumb";

const showreel = getVideo(showreelVideoId);
const alsoOnChannel = ["7tVaWpvEGL8", "mKnAky2SjIA", "pBxCSjnEOCI"].map(getVideo);

export default function YouTubeSection() {
  return (
    <section id="youtube" aria-labelledby="youtube-title" className="section">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal as="p" className="eyebrow">
            {YOUTUBE_CHANNEL_NAME}
          </Reveal>
          <SplitReveal id="youtube-title" text="The stories continue on YouTube." className="display-xl mt-6" />
          <Reveal className="mt-8">
            <p className="lede">
              Trailers, behind-the-scenes and productions from Just Distinguish Films live on our YouTube channel. Subscribe to be the first to watch when the next story drops.
            </p>
          </Reveal>

          <Reveal className="mt-9 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="Just Distinguish TV channel logo" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-display text-2xl font-bold uppercase tracking-[0.06em]">
                {YOUTUBE_CHANNEL_NAME}
                <YouTubeIcon className="h-6 w-6 text-ember" />
              </p>
              <p className="text-sm text-smoke">{YOUTUBE_HANDLE}</p>
            </div>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap gap-4">
            <CtaButton href={YOUTUBE_CHANNEL_URL} external>
              Visit our YouTube channel
            </CtaButton>
            <CtaButton href={YOUTUBE_SUBSCRIBE_URL} external variant="ghost" arrow={false}>
              Subscribe
            </CtaButton>
          </Reveal>
        </div>

        <div className="min-w-0">
          <a href={watchUrl(showreel.id)} target="_blank" rel="noopener noreferrer" className="film-card block">
            <ClipReveal className="film-frame">
              <YouTubeThumb id={showreel.id} alt="Still from the Just Distinguish Productions showreel" />
              <span className="film-shade" />
              <span className="film-line" />
              <span className="film-play">
                <PlayIcon className="ml-1 h-7 w-7" />
              </span>
              <span className="chip absolute left-3 top-3">Start here</span>
              <span className="chip absolute bottom-3 right-3 tabular-nums">{showreel.duration}</span>
            </ClipReveal>
            <div className="mt-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold">{KIND_LABEL[showreel.kind]}</p>
              <h3 className="mt-2 font-display text-[1.9rem] font-bold uppercase leading-[1.02] tracking-[0.02em]">{showreel.title}</h3>
              <span className="sr-only"> (opens YouTube in a new tab)</span>
            </div>
          </a>

          <Reveal as="div" className="mt-10">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-smoke">Also on the channel</p>
            <ul className="mt-4 grid gap-1">
              {alsoOnChannel.map((v) => (
                <li key={v.id}>
                  <a
                    href={watchUrl(v.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="film-card group flex items-center gap-4 border-t border-line py-3 transition-colors duration-500 hover:border-ember"
                  >
                    <span className="film-frame block w-28 shrink-0 sm:w-36">
                      <YouTubeThumb id={v.id} alt={`Still from ${v.film}`} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.64rem] font-bold uppercase tracking-[0.22em] text-gold">
                        {KIND_LABEL[v.kind]} · <span className="tabular-nums">{v.duration}</span>
                      </span>
                      <span className="mt-1 block font-display text-xl font-bold uppercase leading-tight tracking-[0.03em]">{v.title}</span>
                    </span>
                    <span className="sr-only"> (opens YouTube in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
