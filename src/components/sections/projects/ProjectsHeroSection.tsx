import type { z } from "zod";
import type { projectsHeroDataSchema } from "@/schemas/sections";

type ProjectsHeroContent = z.infer<typeof projectsHeroDataSchema>;

const DEFAULT_EYEBROW = "INSTITUTIONAL PORTFOLIO";

const DEFAULT_TITLE = ["Strategic Digital", "Assets & NFT", "Infrastructure"];

const DEFAULT_DESCRIPTION =
  "Archiving the evolution of institutional-grade tokenization and distributed ledger deployments across the MENA region.";

function BuildingWatermark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 64" aria-hidden="true">
      <path
        d="M8 58V28l12-8 12 8v30M40 58V22l12-8 12 8v36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M4 58h72" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M20 58V38h8v20M52 58V34h8v24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M32 14 40 8 48 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectsHeroSection({ content }: { content?: ProjectsHeroContent }) {
  const eyebrow = content?.eyebrow?.trim() || DEFAULT_EYEBROW;
  const titleLines =
    content?.titleLines && content.titleLines.length > 0 ? content.titleLines : DEFAULT_TITLE;
  const description = content?.description?.trim() || DEFAULT_DESCRIPTION;

  return (
    <section className="cx-projects-hero" aria-labelledby="projects-hero-title">
      <div className="section-shell cx-projects-hero__shell">
        <p className="cx-projects-hero__eyebrow">{eyebrow}</p>
        <h1 id="projects-hero-title" className="cx-projects-hero__title">
          {titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="cx-projects-hero__description">{description}</p>
      </div>
      <BuildingWatermark className="cx-projects-hero__watermark" />
    </section>
  );
}
