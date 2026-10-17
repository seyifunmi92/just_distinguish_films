"use client";

import { useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

/** Shows the email as selectable text with a copy button that falls back to selecting it. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      const node = textRef.current;
      if (!node) return;
      const range = document.createRange();
      range.selectNodeContents(node);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span ref={textRef} className="break-all font-display text-[clamp(1.4rem,3vw,2.2rem)] font-bold tracking-[0.04em]">
        {email}
      </span>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-[2px] border border-white/20 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-smoke transition-colors duration-500 hover:border-ember hover:text-bone"
      >
        {copied ? <CheckIcon className="h-4 w-4 text-gold" /> : <CopyIcon className="h-4 w-4" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
