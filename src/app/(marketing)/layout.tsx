import {
  defaultApplyNowModal,
  defaultFooterColumns,
  defaultFooterMeta,
  defaultNavItems,
} from "@/data/site-defaults";
import { getSiteGlobalCached } from "@/lib/content/site-global";
import { normalizeSitePath } from "@/lib/site-path";
import SiteFooter, { type FooterColumn } from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ApplyNowModal from "@/components/apply/ApplyNowModal";

export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await getSiteGlobalCached();

  const navItems =
    (global?.navItems as typeof defaultNavItems) ?? defaultNavItems;
  const headerBrand =
    (global?.headerBrand as string | undefined) ??
    (global?.footerMeta as { brand?: string } | undefined)?.brand ??
    defaultFooterMeta.brand;
  const footerColumns: FooterColumn[] =
    (global?.footerColumns as FooterColumn[] | undefined) ?? defaultFooterColumns;
  const footerMeta =
    (global?.footerMeta as typeof defaultFooterMeta) ?? defaultFooterMeta;
  const footerCtaLabel =
    (footerMeta as { ctaLabel?: string }).ctaLabel ?? "REQUEST CREDENTIALS";
  const footerCtaHref = (footerMeta as { ctaHref?: string }).ctaHref ?? "/contact";
  const applyNowModal = {
    ...defaultApplyNowModal,
    ...((global?.applyNowModal as Partial<typeof defaultApplyNowModal> | undefined) ?? {}),
  };
  return (
    <div className="owtc-app cx-site">
      <SiteHeader navItems={navItems} brandTitle={headerBrand} />
      <main className="cx-site__main">{children}</main>
      <ApplyNowModal content={applyNowModal} />
      <SiteFooter
        columns={footerColumns}
        meta={footerMeta}
        ctaLabel={footerCtaLabel}
        ctaHref={normalizeSitePath(footerCtaHref, "/contact")}
      />
    </div>
  );
}
