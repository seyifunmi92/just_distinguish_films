import { Fragment } from "react";

/** Splits text into masked words so a heading can rise into view line by line. Server-safe. */
export default function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="word-mask">
            <span data-word className="word-inner">
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
