import { getVideo, railVideoIds } from "@/data/site";
import FilmCard from "./FilmCard";
import FilmsRail from "./FilmsRail";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

const items = railVideoIds.map(getVideo);

export default function FilmsSection() {
  return (
    <section id="films" aria-labelledby="films-title" className="section overflow-hidden">
      <FilmsRail
        heading={
          <div>
            <Reveal as="p" className="eyebrow">
              Now showing
            </Reveal>
            <SplitReveal id="films-title" text="Our Films" className="display-xl mt-6" />
            <Reveal className="mt-6">
              <p className="lede">Trailers and behind-the-scenes from our productions. Every card opens the video on YouTube.</p>
            </Reveal>
          </div>
        }
      >
        {items.map((video, i) => (
          <FilmCard key={video.id} video={video} index={i} />
        ))}
      </FilmsRail>
    </section>
  );
}
