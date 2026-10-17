import ClipReveal from "./ClipReveal";
import Parallax from "./Parallax";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import YouTubeThumb from "./YouTubeThumb";

export default function Story() {
  return (
    <section id="about" aria-labelledby="about-title" className="section overflow-hidden">
      <div className="wrap grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal as="p" className="eyebrow">
            The story
          </Reveal>
          <SplitReveal id="about-title" text="We don't just make films. We create experiences." className="display-lg mt-6" />
          <div className="mt-10 grid gap-6">
            <Reveal>
              <p className="lede">
                Just Distinguish Films is a film production company built on a simple belief: a story should be felt before it is explained.
              </p>
            </Reveal>
            <Reveal>
              <p className="lede">
                From the first frame of a trailer to the last name in the credits, our work aims to give audiences something to carry out of the room, whether that is a laugh, a tear or an argument on the way home.
              </p>
            </Reveal>
            <Reveal>
              <p className="lede">Every production is made for the screen and shared where audiences already are: on our YouTube channel.</p>
            </Reveal>
          </div>
        </div>

        <div className="relative mx-auto aspect-[5/6] w-full max-w-xl" aria-hidden="true">
          <Parallax range={6} className="absolute left-0 top-0 w-[66%]">
            <ClipReveal className="film-frame aspect-[4/5] border border-line">
              <YouTubeThumb id="mKnAky2SjIA" alt="" />
              <span className="film-shade" />
            </ClipReveal>
          </Parallax>
          <Parallax range={14} className="absolute right-0 top-[8%] w-[40%]">
            <ClipReveal className="film-frame aspect-[3/4] border border-line" delay={0.2}>
              <YouTubeThumb id="pBxCSjnEOCI" alt="" />
              <span className="film-shade" />
            </ClipReveal>
          </Parallax>
          <Parallax range={9} className="absolute bottom-0 right-[10%] w-[52%]">
            <ClipReveal className="film-frame aspect-[4/3] border border-line" delay={0.4}>
              <YouTubeThumb id="xRWvqS-aa5k" alt="" />
              <span className="film-shade" />
            </ClipReveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
