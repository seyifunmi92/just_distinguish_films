import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/big-shoulders-display";
import "@fontsource/cormorant-garamond/500-italic.css";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE_NAME, SITE_URL, TAGLINE } from "@/data/site";
import { buildJsonLd } from "@/lib/seo";

const title = `${SITE_NAME} | ${TAGLINE.replace(/\.$/, "")}`;
const description =
  "Just Distinguish Films is a film production company telling stories worth feeling. Watch our trailers and behind-the-scenes on the Just Distinguish TV YouTube channel.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${SITE_NAME}` },
  description,
  applicationName: SITE_NAME,
  keywords: ["Just Distinguish Films", "Just Distinguish TV", "film production", "African cinema", "Nollywood", "movie trailers", "A Million Baby", "The Courier", "Catch Me If You Can"],
  authors: [{ name: "Moradeke Adegboyega" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title,
    description,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0708",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Runs before first paint so the intro curtain and hidden hero states never flash.
const motionScript = `try{var d=document.documentElement;d.classList.add('js');if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-crimson focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:uppercase focus:tracking-[0.18em] focus:text-bone"
        >
          Skip to content
        </a>
        {children}
        <div className="film-grain" aria-hidden="true" />
        <CursorGlow />
        <SmoothScroll />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
