import type { z } from "zod";
import type { aboutMissionDataSchema } from "@/schemas/sections";

type AboutMissionContent = z.infer<typeof aboutMissionDataSchema>;

export default function AboutMissionSection({ content }: { content: AboutMissionContent }) {
  const pillars = content.pillars.slice(0, 2);

  return (
    <section className="cx-about-mission" aria-label="Our mission">
      <div className="section-shell cx-about-mission__inner">
        <p className="cx-about-mission__label">{content.label}</p>

        <div className="cx-about-mission__content">
          <h2 className="cx-about-mission__headline">
            {content.headlineLead}{" "}
            <strong className="cx-about-mission__headline-bold">{content.headlineBold}</strong>
          </h2>
          <p className="cx-about-mission__description">{content.description}</p>

          <div className="cx-about-mission__divider" aria-hidden="true" />

          <div className="cx-about-mission__grid">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="cx-about-mission__pillar">
                <h3 className="cx-about-mission__pillar-title">{pillar.title}</h3>
                <p className="cx-about-mission__pillar-text">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
