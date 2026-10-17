import { KIND_LABEL, WATCH_LABEL, type Video } from "@/data/site";
import { watchUrl } from "@/lib/video";
import ClipReveal from "./ClipReveal";
import { ArrowIcon, PlayIcon } from "./icons";
import YouTubeThumb from "./YouTubeThumb";

export default function FilmCard({ video, index }: { video: Video; index: number }) {
  const year = video.uploaded.slice(0, 4);

  return (
    <a href={watchUrl(video.id)} target="_blank" rel="noopener noreferrer" className="film-card block">
      <ClipReveal className="film-frame" delay={Math.min(index, 3) * 0.12}>
        <YouTubeThumb id={video.id} alt={`Still from ${video.film}`} />
        <span className="film-shade" />
        <span className="film-line" />
        <span className="film-play">
          <PlayIcon className="ml-1 h-7 w-7" />
        </span>
        <span className="chip absolute left-3 top-3">{KIND_LABEL[video.kind]}</span>
        <span className="chip absolute right-3 top-3 tabular-nums">{video.duration}</span>
        <span className="film-over">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.22em]">{WATCH_LABEL[video.kind]}</span>
          <ArrowIcon className="h-5 w-5 text-ember" />
        </span>
      </ClipReveal>

      <div className="mt-5">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold">
          {video.film} · {year}
        </p>
        <h3 className="mt-2 font-display text-[1.75rem] font-bold uppercase leading-[1.02] tracking-[0.02em]">{video.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-smoke">{video.blurb}</p>
        <p className="mt-4 inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ember">
          {WATCH_LABEL[video.kind]} on YouTube
          <ArrowIcon className="h-4 w-4" />
          <span className="sr-only"> (opens in a new tab)</span>
        </p>
      </div>
    </a>
  );
}
