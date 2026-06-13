const LOCAL_HOST_PATTERN = /^(localhost|127\.0\.0\.1)(:\d+)?$/i;

/** Ensures AUTH_URL / VERCEL_URL values include a protocol before use with URL(). */
export function normalizeSiteUrl(raw?: string): string {
  const fallback = "http://localhost:3000";
  if (!raw?.trim()) return fallback;

  const value = raw.trim();
  if (/^https?:\/\//i.test(value)) return value;

  const protocol = LOCAL_HOST_PATTERN.test(value) ? "http" : "https";
  return `${protocol}://${value}`;
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(
    process.env.AUTH_URL || process.env.NEXTAUTH_URL || process.env.VERCEL_URL,
  );
}
