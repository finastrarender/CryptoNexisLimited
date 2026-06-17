const BRAND = "Cryptonexis Limited";

export function resolveAltText(custom: string | undefined, fallback: string): string {
  const value = custom?.trim();
  return value || fallback;
}

export function projectImageAlt(item: {
  title?: string;
  category?: string;
  imageAlt?: string;
}): string {
  return resolveAltText(
    item.imageAlt,
    item.title?.trim() && item.category?.trim()
      ? `${item.title.trim()} — ${item.category.trim()} digital asset project by ${BRAND}`
      : item.title?.trim()
        ? `${item.title.trim()} — ${BRAND} project portfolio`
        : `${BRAND} institutional digital asset project`,
  );
}

export function executivePortraitAlt(member: {
  name?: string;
  role?: string;
  imageAlt?: string;
}): string {
  return resolveAltText(
    member.imageAlt,
    member.name?.trim() && member.role?.trim()
      ? `Portrait of ${member.name.trim()}, ${member.role.trim()} at ${BRAND}`
      : member.name?.trim()
        ? `Portrait of ${member.name.trim()}, ${BRAND} executive leadership`
        : `${BRAND} executive leadership portrait`,
  );
}

export function rakZoneMapAlt(options?: {
  imageAlt?: string;
  location?: string;
}): string {
  const location = options?.location?.trim() || "RAK Economic Zone, Ras Al Khaimah, UAE";
  return resolveAltText(
    options?.imageAlt,
    `Map showing ${location} and ${BRAND} headquarters location`,
  );
}

export function regionalHubMapAlt(options?: {
  imageAlt?: string;
  title?: string;
  subtitle?: string;
}): string {
  const place = [options?.title?.trim(), options?.subtitle?.trim()].filter(Boolean).join(", ");
  return resolveAltText(
    options?.imageAlt,
    place
      ? `Regional map of ${place} — ${BRAND} institutional hub`
      : `Regional map of Ras Al Khaimah RAK Economic Zone — ${BRAND} hub`,
  );
}

export function aboutSectionImageAlt(options: {
  imageAlt?: string;
  title?: string;
  context?: string;
  variant?: "primary" | "secondary";
}): string {
  const title = options.title?.trim();
  const context = options.context?.trim();
  const variant = options.variant ?? "primary";

  const fallback =
    variant === "secondary"
      ? context && title
        ? `${title} — ${context} at ${BRAND}`
        : `${BRAND} institutional headquarters in the UAE`
      : context && title
        ? `${title} — ${context} at ${BRAND}`
        : `${BRAND} institutional digital asset operations`;

  return resolveAltText(options.imageAlt, fallback);
}

export function globalReachImageAlt(options: {
  imageAlt?: string;
  title?: string;
}): string {
  return resolveAltText(
    options.imageAlt,
    options.title?.trim()
      ? `${options.title.trim()} — ${BRAND} global infrastructure`
      : `${BRAND} global infrastructure and connectivity`,
  );
}

export function uploadedImagePreviewAlt(label: string): string {
  const trimmed = label.trim();
  return trimmed ? `Preview of ${trimmed}` : "Uploaded image preview";
}
