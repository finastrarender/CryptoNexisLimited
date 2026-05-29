import type { z } from "zod";
import type { heroDataSchema } from "@/schemas/sections";

type HeroContent = z.infer<typeof heroDataSchema>;

const CRYPTONEXIS_HERO_IMAGE = "/home/hero-building.jpg";
const LEGACY_HERO_IMAGES = new Set(["/home/hero-bg.jpg", "/home/hero-bg.svg", ""]);

function resolveHeroImage(src?: string) {
  const trimmed = src?.trim() ?? "";
  if (!trimmed || LEGACY_HERO_IMAGES.has(trimmed)) {
    return CRYPTONEXIS_HERO_IMAGE;
  }
  return trimmed;
}

export default function HeroSection({
  content,
  anchorId,
}: {
  content: HeroContent;
  pageSlug?: string;
  anchorId?: string;
}) {
  const heroImage = resolveHeroImage(content.backgroundImage);

  const label =
    typeof content.badge === "string" && content.badge.trim() !== ""
      ? content.badge
      : "INSTITUTIONAL DIGITAL ASSETS";

  const titleLines =
    Array.isArray(content.title) && content.title.length > 0
      ? content.title
      : ["Licensed NFT", "Creator and", "Issuer"];

  const lede =
    typeof content.lede === "string" && content.lede.trim() !== ""
      ? content.lede
      : "Operating in the RAK Digital Assets Oasis, Ras Al Khaimah";

  const description =
    typeof content.description === "string" && content.description.trim() !== ""
      ? content.description
      : "Cryptonexis Limited is a licensed entity focused on NFT creation and NFT issuance for artists, brands, businesses, and project owners.";

  const overlayLabel = content.overlayLabel?.trim() || "NETWORK PROTOCOL";
  const overlayText =
    content.overlayText?.trim() ||
    "Secure, audited infrastructure for high value asset issuance.";

  const primaryLabel = content.primaryAction?.label?.trim() || "VIEW SERVICES →";
  const secondaryLabel = content.secondaryAction?.label?.trim() || "INQUIRE NOW";

  return (
    <section className="cx-hero" id={anchorId ?? undefined}>
      <div className="section-shell cx-hero__inner">
        <div className="cx-hero__copy">
          <p className="cx-hero__label">{label}</p>
          <h1 className="cx-hero__title">
            {titleLines.slice(0, 3).map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="cx-hero__lede">{lede}</p>
          <p className="cx-hero__description">{description}</p>
          <div className="cx-hero__actions">
            <a className="cx-button cx-button--primary" href={content.primaryAction.href}>
              {primaryLabel}
            </a>
            <a className="cx-button cx-button--secondary" href={content.secondaryAction.href}>
              {secondaryLabel}
            </a>
          </div>
        </div>

        <div className="cx-hero__visual">
          <div className="cx-hero__frame">
            <div className="cx-hero__media">
              <img
                className="cx-hero__image"
                src={heroImage}
                alt="Institutional architecture representing secure digital asset infrastructure"
                width={640}
                height={800}
                decoding="async"
                fetchPriority="high"
              />
              <div className="cx-hero__card">
                <p className="cx-hero__card-label">{overlayLabel}</p>
                <p className="cx-hero__card-text">{overlayText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
