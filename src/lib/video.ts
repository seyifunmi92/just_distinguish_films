export type ThumbQuality = "maxresdefault" | "hqdefault";

export function watchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function thumbUrl(id: string, quality: ThumbQuality = "maxresdefault"): string {
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}

/** "3:46" -> "PT3M46S" (ISO 8601, used for structured data). */
export function isoDuration(clock: string): string {
  const [m = "0", s = "0"] = clock.split(":");
  return `PT${Number(m)}M${Number(s)}S`;
}
