import { EMAIL, SITE_NAME, SITE_URL, socials, videos } from "@/data/site";
import { isoDuration, thumbUrl, watchUrl } from "@/lib/video";

/** Organization, WebSite and one VideoObject per YouTube video. Only real, confirmed links are included. */
export function buildJsonLd() {
  const orgId = `${SITE_URL}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.jpg`,
        email: EMAIL,
        sameAs: socials.map((s) => s.url),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en",
        publisher: { "@id": orgId },
      },
      ...videos.map((v) => ({
        "@type": "VideoObject",
        name: v.title,
        description: v.blurb,
        thumbnailUrl: [thumbUrl(v.id, "hqdefault")],
        uploadDate: v.uploaded,
        duration: isoDuration(v.duration),
        contentUrl: watchUrl(v.id),
        embedUrl: `https://www.youtube.com/embed/${v.id}`,
        publisher: { "@id": orgId },
      })),
    ],
  };
}
