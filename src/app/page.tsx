import Ceo from "@/components/Ceo";
import ComingSoon from "@/components/ComingSoon";
import Contact from "@/components/Contact";
import { FilmStrip, Marquee } from "@/components/Dividers";
import FeaturedFilm from "@/components/FeaturedFilm";
import FilmsSection from "@/components/FilmsSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Social from "@/components/Social";
import Story from "@/components/Story";
import YouTubeSection from "@/components/YouTubeSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <FilmStrip />
        <YouTubeSection />
        <FilmsSection />
        <FeaturedFilm />
        <ComingSoon />
        <Story />
        <Ceo />
        <Marquee />
        <Social />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
