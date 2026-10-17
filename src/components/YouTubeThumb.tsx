"use client";

import { useEffect, useRef, useState } from "react";
import { thumbUrl, type ThumbQuality } from "@/lib/video";

type Props = { id: string; alt: string; className?: string; eager?: boolean };

/**
 * YouTube thumbnail that prefers the 1280x720 version and drops to the 480x360 one
 * when the large file does not exist (YouTube serves a tiny placeholder for those).
 */
export default function YouTubeThumb({ id, alt, className = "", eager = false }: Props) {
  const [quality, setQuality] = useState<ThumbQuality>("maxresdefault");
  const ref = useRef<HTMLImageElement>(null);

  // Covers images that finished (or failed) loading before React hydrated.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth <= 200 && quality === "maxresdefault") {
      setQuality("hqdefault");
    }
  }, [quality]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={thumbUrl(id, quality)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      onError={() => quality === "maxresdefault" && setQuality("hqdefault")}
      onLoad={(e) => {
        if (quality === "maxresdefault" && e.currentTarget.naturalWidth <= 200) setQuality("hqdefault");
      }}
      className={`object-cover ${className}`}
    />
  );
}
