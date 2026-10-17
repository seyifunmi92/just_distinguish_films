/**
 * Single source of truth for everything editable on the site.
 * To add a film: add an entry to `videos` (paste the YouTube video ID) and list its id in `railVideoIds`.
 */

export const SITE_NAME = "Just Distinguish Films";
export const TAGLINE = "Stories Worth Feeling.";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://justdistinguishfilms.com").replace(/\/$/, "");
export const EMAIL = "moradekeadegboyega@justdistinguishfilms.com";

export const YOUTUBE_HANDLE = "@justdistingishTV";
export const YOUTUBE_CHANNEL_NAME = "Just Distinguish TV";
export const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/${YOUTUBE_HANDLE}`;
export const YOUTUBE_SUBSCRIBE_URL = `${YOUTUBE_CHANNEL_URL}?sub_confirmation=1`;

/* ------------------------------------------------------------------ */
/* Videos                                                              */
/* ------------------------------------------------------------------ */

export type VideoKind = "trailer" | "behind-the-scenes" | "showreel";

export interface Video {
  /** YouTube video ID (the part after v= in the watch URL). */
  id: string;
  film: string;
  title: string;
  kind: VideoKind;
  /** ISO date the video was uploaded to YouTube. */
  uploaded: string;
  /** m:ss */
  duration: string;
  blurb: string;
}

export const KIND_LABEL: Record<VideoKind, string> = {
  trailer: "Trailer",
  "behind-the-scenes": "Behind the scenes",
  showreel: "Showreel",
};

export const WATCH_LABEL: Record<VideoKind, string> = {
  trailer: "Watch trailer",
  "behind-the-scenes": "Watch now",
  showreel: "Watch showreel",
};

export const videos: Video[] = [
  {
    id: "IHIxqM-Xt0s",
    film: "A Million Baby",
    title: "A Million Baby (Official Trailer)",
    kind: "trailer",
    uploaded: "2017-05-10",
    duration: "1:00",
    blurb: "The official trailer for A Million Baby.",
  },
  {
    id: "mKnAky2SjIA",
    film: "Catch Me If You Can",
    title: "Catch Me If You Can (Trailer)",
    kind: "trailer",
    uploaded: "2017-10-24",
    duration: "1:21",
    blurb: "With Jide Kosoko and Tosin Sido.",
  },
  {
    id: "pBxCSjnEOCI",
    film: "The Courier",
    title: "The Courier (Official Trailer)",
    kind: "trailer",
    uploaded: "2017-05-14",
    duration: "0:59",
    blurb: "The official trailer, produced by Moradeke Adegboyega.",
  },
  {
    id: "7tVaWpvEGL8",
    film: "A Million Baby",
    title: "A Million Baby: Behind the Scenes",
    kind: "behind-the-scenes",
    uploaded: "2017-07-10",
    duration: "9:55",
    blurb: "On set with Odunlade Adekola, Ayo Mogaji and Moradeke Adegboyega.",
  },
  {
    id: "xRWvqS-aa5k",
    film: "A Million Baby",
    title: "A Million Baby (Movie Trailer)",
    kind: "trailer",
    uploaded: "2017-06-03",
    duration: "1:08",
    blurb: "A second trailer, produced by Moradeke Adegboyega.",
  },
  {
    id: "CwVezTnB5cE",
    film: "Showreel",
    title: "Just Distinguish Productions Movie Showreel",
    kind: "showreel",
    uploaded: "2018-08-17",
    duration: "3:46",
    blurb: "A look across our productions, featuring Moyo Lawal, Seun Akindele, Tosin Sido and Moradeke Adegboyega.",
  },
];

export function getVideo(id: string): Video {
  const v = videos.find((x) => x.id === id);
  if (!v) throw new Error(`Unknown video id: ${id}`);
  return v;
}

/** Cards shown in the "Our Films" rail, in order. */
export const railVideoIds = ["IHIxqM-Xt0s", "mKnAky2SjIA", "pBxCSjnEOCI", "7tVaWpvEGL8", "xRWvqS-aa5k"];

/** Stills that cross-fade behind the hero headline. */
export const heroStillIds = ["IHIxqM-Xt0s", "mKnAky2SjIA", "pBxCSjnEOCI", "xRWvqS-aa5k"];

export const featuredVideoId = "IHIxqM-Xt0s";
export const showreelVideoId = "CwVezTnB5cE";

/* ------------------------------------------------------------------ */
/* Coming soon                                                         */
/* ------------------------------------------------------------------ */

export interface UpcomingFilm {
  title: string;
  synopsis: string;
  genre?: string;
  /** Free text, e.g. "December 2026". */
  releaseDate?: string;
  /** Path under /public, e.g. "/posters/title.jpg". */
  poster?: string;
  teaserUrl?: string;
}

/**
 * Add real upcoming productions here. While this list is empty the site shows
 * a single "Next production, announcing soon" teaser card instead of inventing titles.
 */
export const comingSoon: UpcomingFilm[] = [];

/* ------------------------------------------------------------------ */
/* People and social                                                   */
/* ------------------------------------------------------------------ */

export const ceo = {
  name: "Moradeke Adegboyega",
  role: "CEO, Just Distinguish Films",
  /** Path under /public, e.g. "/moradeke.jpg". Leave null to show the brand artwork instead. */
  portrait: null as string | null,
  instagram: "moradekeadegboyega",
  bio: [
    "Moradeke Adegboyega leads Just Distinguish Films and is credited as producer on the trailers for A Million Baby and The Courier.",
    "The company's work is built around one idea: a film should be felt before it is explained.",
  ],
};

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
}

/** Only platforms with a confirmed handle are listed. Add more as they are confirmed. */
export const socials: SocialLink[] = [
  { id: "youtube", label: "YouTube", handle: YOUTUBE_HANDLE, url: YOUTUBE_CHANNEL_URL },
  { id: "instagram", label: "Instagram", handle: "@justdistinguishtv", url: "https://www.instagram.com/justdistinguishtv/" },
  {
    id: "instagram-ceo",
    label: "Instagram · Moradeke",
    handle: "@moradekeadegboyega",
    url: "https://www.instagram.com/moradekeadegboyega/",
  },
];
