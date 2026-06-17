import type { Metadata } from "next";
import { getSiteGlobalCached } from "@/lib/content/site-global";
import { resolvePageForRequest } from "@/lib/content/pages";
import { slugToHref } from "@/lib/slugs";
import {
  buildSocialMetadata,
  DEFAULT_DESCRIPTION,
  resolveMetadataTitle,
} from "@/lib/metadata/social";

type SeoDefaults = { defaultTitle?: string; defaultDescription?: string };

export async function buildPageMetadata(slug: string): Promise<Metadata> {
  const [page, global] = await Promise.all([resolvePageForRequest(slug), getSiteGlobalCached()]);
  if (!page) {
    return {
      title: "Not found",
      ...buildSocialMetadata({
        title: "Page not found",
        description: DEFAULT_DESCRIPTION,
        path: slugToHref(slug),
      }),
    };
  }

  const d = (global?.seoDefaults as SeoDefaults | undefined) ?? {};
  const rawTitle = page.seoTitle || d.defaultTitle || page.title;
  const description = page.seoDescription || d.defaultDescription || DEFAULT_DESCRIPTION;

  return {
    title: resolveMetadataTitle(rawTitle),
    description,
    alternates: page.canonicalPath ? { canonical: page.canonicalPath } : undefined,
    ...buildSocialMetadata({
      title: rawTitle,
      description,
      path: slugToHref(slug),
      image: page.ogImage,
      canonicalPath: page.canonicalPath,
    }),
  };
}
