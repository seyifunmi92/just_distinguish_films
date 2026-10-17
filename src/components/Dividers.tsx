/** Slowly moving film-strip perforations, used as a transition between scenes. */
export function FilmStrip() {
  return <div className="film-strip" aria-hidden="true" />;
}

const phrase = "Stories worth feeling";

/** Large outlined typographic band, decorative only. */
export function Marquee() {
  const item = (
    <span className="marquee-item">
      {phrase}
      <span className="marquee-dot" />
      Just Distinguish Films
      <span className="marquee-dot" />
    </span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {item}
        {item}
      </div>
    </div>
  );
}
