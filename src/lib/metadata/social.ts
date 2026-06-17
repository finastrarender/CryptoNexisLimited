import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const SITE_NAME = "Cryptonexis Limited";
export const DEFAULT_OG_IMAGE = "/home/hero-building.jpg";
export const DEFAULT_DESCRIPTION =
  "Cryptonexis Limited — RAK Economic Zone licensed NFT creator and issuer for institutional digital asset creation, issuance, and compliance-first advisory.";

const BRAND_SUFFIX = /\s*\|\s*Cryptonexis Limited$/i;

/** Layout `%s | Cryptonexis Limited` template — avoid duplicating the brand in stored titles. */
export function resolveMetadataTitle(raw: string): Metadata["title"] {
  const title = raw.trim();
  if (!title) return undefined;

  if (/^CRYPTONEXIS LIMITED\b/i.test(title) || /^Cryptonexis Limited$/i.test(title)) {
    return { absolute: title };
  }

  const pageOnly = title.replace(BRAND_SUFFIX, "").trim();
  return pageOnly || title;
}

/** Full share title for Open Graph / Twitter (always includes brand where appropriate). */
export function resolveShareTitle(raw: string): string {
  const title = raw.trim();
  if (!title) return `CRYPTONEXIS LIMITED | ${SITE_NAME}`;

  if (/^CRYPTONEXIS LIMITED\b/i.test(title) || /^Cryptonexis Limited$/i.test(title)) {
    return title;
  }

  if (BRAND_SUFFIX.test(title)) return title;

  const pageOnly = title.replace(BRAND_SUFFIX, "").trim() || title;
  return `${pageOnly} | ${SITE_NAME}`;
}

export function resolvePageUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, getSiteUrl()).toString();
}

type SocialMetadataInput = {
  title: string;
  description?: string;
  path: string;
  image?: string;
  canonicalPath?: string;
};

export function buildSocialMetadata(
  input: SocialMetadataInput,
): Pick<Metadata, "openGraph" | "twitter"> {
  const shareTitle = resolveShareTitle(input.title);
  const description = input.description?.trim() || DEFAULT_DESCRIPTION;
  const image = input.image?.trim() || DEFAULT_OG_IMAGE;
  const url = input.canonicalPath?.trim()
    ? resolvePageUrl(input.canonicalPath)
    : resolvePageUrl(input.path);

  return {
    openGraph: {
      type: "website",
      locale: "en_AE",
      url,
      siteName: SITE_NAME,
      title: shareTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${shareTitle} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
  };
}
