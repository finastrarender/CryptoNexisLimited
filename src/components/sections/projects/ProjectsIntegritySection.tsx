import type { z } from "zod";
import ProjectsIntegrityIcon from "@/components/icons/ProjectsIntegrityIcon";
import type { projectsIntegrityDataSchema } from "@/schemas/sections";

type ProjectsIntegrityContent = z.infer<typeof projectsIntegrityDataSchema>;

const DEFAULT_HEADING = "Institutional Integrity by Design";

function normalizeHeading(heading: string): string {
  return heading.replace(/\s+/g, " ").trim();
}

const DEFAULT_DESCRIPTION =
  "Cryptonexis operates at the intersection of regulatory compliance and technological frontier, ensuring each partnership is built on a foundation of absolute transparency.";

const DEFAULT_ITEMS = [
  {
    icon: "badgeCheck",
    title: "Licensed and compliant",
    description:
      "Operating under strict UAE regulatory frameworks and governance standards.",
  },
  {
    icon: "mapPin",
    title: "Strategic UAE location",
    description:
      "Headquartered in the RAK Economic Zone, a global hub for digital asset innovation.",
  },
  {
    icon: "compassNav",
    title: "Focused expertise",
    description:
      "Deep specialization in NFT architecture and institutional blockchain deployments.",
  },
  {
    icon: "eyeOpen",
    title: "Transparent operations",
    description:
      "Real-time reporting and absolute clarity in all asset management protocols.",
  },
];

export default function ProjectsIntegritySection({
  content,
}: {
  content?: ProjectsIntegrityContent;
}) {
  const heading = normalizeHeading(content?.heading?.trim() || DEFAULT_HEADING);
  const description = content?.description?.trim() || DEFAULT_DESCRIPTION;
  const items =
    content?.items && content.items.length > 0 ? content.items : DEFAULT_ITEMS;

  return (
    <section className="cx-projects-integrity" aria-labelledby="projects-integrity-heading">
      <div className="section-shell cx-projects-integrity__shell">
        <div className="cx-projects-integrity__intro">
          <h2 id="projects-integrity-heading" className="cx-projects-integrity__heading">
            {heading}
          </h2>
          <p className="cx-projects-integrity__lede">{description}</p>
        </div>

        <ul className="cx-projects-integrity__list">
          {items.map((item) => (
            <li key={item.title} className="cx-projects-integrity__item">
              <span className="cx-projects-integrity__icon" aria-hidden="true">
                <ProjectsIntegrityIcon
                  name={item.icon || "badgeCheck"}
                  className="cx-projects-integrity__icon-svg"
                />
              </span>
              <div className="cx-projects-integrity__content">
                <h3 className="cx-projects-integrity__item-title">{item.title}</h3>
                <p className="cx-projects-integrity__item-text">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
