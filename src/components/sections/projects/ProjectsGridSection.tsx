import type { z } from "zod";
import type { projectsGridDataSchema } from "@/schemas/sections";
import { PROJECT_GRID_IMAGE_ALTS } from "@/data/image-alt-defaults";
import { projectImageAlt } from "@/lib/image-alt";

type ProjectsGridContent = z.infer<typeof projectsGridDataSchema>;

const DEFAULT_ITEMS = [
  {
    category: "Real Estate",
    title: "RAK Waterfront Series",
    image: "/projects/rak-waterfront.jpg",
    imageAlt: PROJECT_GRID_IMAGE_ALTS["RAK Waterfront Series"],
  },
  {
    category: "Protocol",
    title: "Ledger Identity V.2",
    image: "/projects/ledger-identity.jpg",
    imageAlt: PROJECT_GRID_IMAGE_ALTS["Ledger Identity V.2"],
  },
  {
    category: "Finance",
    title: "Sovereign Debt Tokens",
    image: "/projects/sovereign-debt.jpg",
    imageAlt: PROJECT_GRID_IMAGE_ALTS["Sovereign Debt Tokens"],
  },
  {
    category: "Logistics",
    title: "Supply Chain Registry",
    image: "/projects/supply-chain.jpg",
    imageAlt: PROJECT_GRID_IMAGE_ALTS["Supply Chain Registry"],
  },
  {
    category: "Governance",
    title: "Citizen DAO Protocol",
    image: "/projects/citizen-dao.jpg",
    imageAlt: PROJECT_GRID_IMAGE_ALTS["Citizen DAO Protocol"],
  },
  {
    category: "Luxury",
    title: "Heritage Asset Vault",
    image: "/projects/heritage-vault.jpg",
    imageAlt: PROJECT_GRID_IMAGE_ALTS["Heritage Asset Vault"],
  },
];

export default function ProjectsGridSection({ content }: { content?: ProjectsGridContent }) {
  const items =
    content?.items && content.items.length > 0 ? content.items : DEFAULT_ITEMS;

  return (
    <section className="cx-projects-grid" aria-label="Project portfolio">
      <ul className="cx-projects-grid__list">
        {items.map((item) => (
          <li key={`${item.category}-${item.title}`} className="cx-projects-grid__item">
            <div className="cx-projects-grid__media">
              <img
                src={item.image}
                alt={projectImageAlt(item)}
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="cx-projects-grid__caption">
              <p className="cx-projects-grid__category">{item.category}</p>
              <h2 className="cx-projects-grid__title">{item.title}</h2>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
