import type { z } from "zod";
import type { aboutOverviewDataSchema } from "@/schemas/sections";
import { aboutSectionImageAlt } from "@/lib/image-alt";

type AboutIntroContent = z.infer<typeof aboutOverviewDataSchema>;

const AboutIntroSection = ({ content }: { content: AboutIntroContent }) => {
  const [primaryStat, secondaryStat] = content.stats;
  const [primaryImage, secondaryImage] = content.images;

  return (
    <section className="about-intro">
      <div className="section-shell about-intro__content">
        <div className="about-intro__copy">
          <p className="section-label about-intro__eyebrow">{content.eyebrow}</p>
          <h2 className="about-intro__title">{content.title}</h2>
          <div className="about-intro__body">
            <p className="about-intro__paragraph">{content.description}</p>
            <p className="about-intro__paragraph">{content.subDescription}</p>
          </div>
          <div className="about-intro__stats" aria-label="Company impact metrics">
            <div className="about-intro__stat">
              <p className="about-intro__stat-value">{primaryStat?.value ?? ""}</p>
              <p className="about-intro__stat-label">{primaryStat?.label ?? ""}</p>
            </div>
            <div className="about-intro__stat">
              <p className="about-intro__stat-value">{secondaryStat?.value ?? ""}</p>
              <p className="about-intro__stat-label">{secondaryStat?.label ?? ""}</p>
            </div>
          </div>
        </div>

        <div className="about-intro__media">
          <div className="about-intro__image-stack">
            <div className="about-intro__image-frame about-intro__image-frame--primary">
              <img
                src={primaryImage}
                alt={aboutSectionImageAlt({
                  title: content.title,
                  context: content.eyebrow,
                  variant: "primary",
                })}
                width={760}
                height={560}
                decoding="async"
                className="about-intro__image"
              />
            </div>
            <div className="about-intro__image-frame about-intro__image-frame--secondary">
              <img
                src={secondaryImage}
                alt={aboutSectionImageAlt({
                  title: content.title,
                  context: content.eyebrow,
                  variant: "secondary",
                })}
                height={420}
                decoding="async"
                className="about-intro__image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntroSection;
