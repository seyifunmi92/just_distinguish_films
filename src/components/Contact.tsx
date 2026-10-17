import { EMAIL } from "@/data/site";
import ContactForm from "./ContactForm";
import CopyEmail from "./CopyEmail";
import CtaButton from "./CtaButton";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(60%_50%_at_20%_30%,rgba(193,18,31,0.14),transparent_70%)]" aria-hidden="true" />
      <div className="wrap grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <Reveal as="p" className="eyebrow">
            Collaborate
          </Reveal>
          <SplitReveal id="contact-title" text="Have a story to tell?" className="display-xl mt-6" />
          <Reveal className="mt-8">
            <p className="lede">Partnerships, casting, press or just a hello. Write to us and we will get back to you.</p>
          </Reveal>
          <Reveal className="mt-10 grid gap-8">
            <CopyEmail email={EMAIL} />
            <div>
              <CtaButton href={`mailto:${EMAIL}`} arrow>
                Get in touch
              </CtaButton>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
