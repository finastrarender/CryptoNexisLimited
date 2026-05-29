import type { z } from "zod";
import type { aboutHeroDataSchema } from "@/schemas/sections";

type AboutHeroContent = z.infer<typeof aboutHeroDataSchema>;

export default function AboutHeroSection({ content }: { content: AboutHeroContent }) {
  const eyebrow = content.eyebrow?.trim() || "ESTABLISHED 2024";
  const titleLines =
    content.titleLines && content.titleLines.length > 0
      ? content.titleLines
      : content.titleMain
        ? [content.titleAccent, content.titleMain].filter(Boolean)
        : ["Institutional", "Integrity", "By Design"];

  const sideCopy =
    content.sideCopy?.trim() ||
    "A digital environment where quiet authority meets architectural precision. We build for the long term.";

  const description =
    content.description?.trim() ||
    "Cryptonexis Limited is a Company Limited by Shares based in Ras Al Khaimah, UAE. The company is licensed by RAK Digital Assets Oasis to carry out NFT creation and NFT issuance.";

  const imageSrc =
    content.image?.trim() || content.backgroundImage?.trim() || "/home/hero-building.jpg";

  return (
    <section className="cx-about-hero">
      <div className="section-shell cx-about-hero__shell">
        <p className="cx-about-hero__eyebrow">{eyebrow}</p>

        <div className="cx-about-hero__head">
          <h1 className="cx-about-hero__title">
            {titleLines.slice(0, 4).map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="cx-about-hero__side">{sideCopy}</p>
        </div>

        <p className="cx-about-hero__description">{description}</p>

        <div className="cx-about-hero__media">
          <img
            className="cx-about-hero__image"
            src={imageSrc}
            alt="Cryptonexis institutional headquarters architecture"
            width={1600}
            height={720}
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
