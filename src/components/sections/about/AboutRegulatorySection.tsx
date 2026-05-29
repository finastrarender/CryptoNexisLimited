import type { z } from "zod";
import type { aboutRegulatoryDataSchema } from "@/schemas/sections";
import SimpleIcon from "../SimpleIcon";

type AboutRegulatoryContent = z.infer<typeof aboutRegulatoryDataSchema>;

export default function AboutRegulatorySection({ content }: { content: AboutRegulatoryContent }) {
  const stats = content.stats.slice(0, 2);
  const cardItems = content.cardItems.slice(0, 5);

  return (
    <section className="cx-about-regulatory" aria-label="Regulatory compliance">
      <div className="section-shell cx-about-regulatory__inner">
        <div className="cx-about-regulatory__left">
          <p className="cx-about-regulatory__badge">{content.badge}</p>
          <h2 className="cx-about-regulatory__title">{content.title}</h2>
          <p className="cx-about-regulatory__description">{content.description}</p>

          <div className="cx-about-regulatory__stats">
            {stats.map((stat, index) => (
              <div key={`${stat.value}-${stat.label}`} className="cx-about-regulatory__stat-wrap">
                {index > 0 ? <span className="cx-about-regulatory__stat-rule" aria-hidden="true" /> : null}
                <div className="cx-about-regulatory__stat">
                  <p className="cx-about-regulatory__stat-value">{stat.value}</p>
                  <p className="cx-about-regulatory__stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="cx-about-regulatory__card" aria-label="Institutional guardrails">
          <span className="cx-about-regulatory__card-icon" aria-hidden="true">
            <SimpleIcon name="gavel" className="cx-about-regulatory__card-icon-svg" />
          </span>
          <h3 className="cx-about-regulatory__card-title">{content.cardTitle}</h3>
          <ul className="cx-about-regulatory__list">
            {cardItems.map((item) => (
              <li key={item} className="cx-about-regulatory__list-item">
                <span className="cx-about-regulatory__list-icon" aria-hidden="true">
                  <SimpleIcon name="shield" className="cx-about-regulatory__list-icon-svg" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
