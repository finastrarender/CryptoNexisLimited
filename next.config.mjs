import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function normalizeSiteUrl(raw) {
  const fallback = "http://localhost:3000";
  if (!raw?.trim()) return fallback;

  const value = raw.trim();
  if (/^https?:\/\//i.test(value)) return value;

  const protocol = /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(value) ? "http" : "https";
  return `${protocol}://${value}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["mongoose"],
  turbopack: {
    root: __dirname,
  },
  /**
   * next-auth/react still reads NEXTAUTH_URL in the client bundle. Mirror AUTH_URL so
   * session/csrf requests stay aligned and avoid ClientFetchError from wrong origins.
   */
  env: {
    NEXTAUTH_URL: normalizeSiteUrl(
      process.env.AUTH_URL || process.env.NEXTAUTH_URL || process.env.VERCEL_URL,
    ),
  },
};

export default nextConfig;

