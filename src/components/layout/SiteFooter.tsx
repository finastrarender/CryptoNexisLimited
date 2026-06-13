import SimpleIcon from "@/components/sections/SimpleIcon";
import SiteNavLink from "@/components/layout/SiteNavLink";

type FooterLink = { label: string; href: string };
type FooterMetaLink = { label: string; href: string; icon?: string };
export type FooterColumn =
  | { title: string; links: FooterLink[] }
  | { title: string; contact: Array<{ type: "location" | "phone" | "mail"; value: string }> };

export default function SiteFooter({
  columns,
  meta,
  ctaHref = "/contact",
  ctaLabel = "REQUEST CREDENTIALS",
}: {
  columns: FooterColumn[];
  meta: {
    brand: string;
    description: string;
    social: Array<string | FooterMetaLink>;
    copyright: string;
    legal: Array<string | FooterMetaLink>;
  };
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const normalizedColumns = Array.isArray(columns) ? columns : [];
  const linkColumn = normalizedColumns.find(
    (c): c is { title: string; links: FooterLink[] } =>
      "links" in c && Array.isArray((c as { links: unknown }).links),
  );
  const contactColumn = normalizedColumns.find(
    (c): c is { title: string; contact: Array<{ type: "location" | "phone" | "mail"; value: string }> } =>
      "contact" in c && Array.isArray((c as { contact: unknown }).contact),
  );

  return (
    <footer className="site-footer">
      <div className="section-shell site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand-col">
            <p className="site-footer__brand">{meta.brand}</p>
            {meta.description ? (
              <p className="site-footer__description">{meta.description}</p>
            ) : null}
          </div>

          {linkColumn ? (
            <nav className="site-footer__nav-col" aria-label={linkColumn.title}>
              <p className="site-footer__col-heading">{linkColumn.title}</p>
              <ul className="site-footer__links">
                {linkColumn.links.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    <SiteNavLink
                      href={item.href}
                      fallbackPath="/"
                      activeClassName="site-footer__link--active"
                    >
                      {item.label}
                    </SiteNavLink>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {contactColumn ? (
            <div className="site-footer__contact-col">
              <p className="site-footer__col-heading">{contactColumn.title}</p>
              <div className="site-footer__contact-rule" aria-hidden="true" />
              <ul className="site-footer__contact">
                {contactColumn.contact.map((item, index) => (
                  <li key={`${item.type}-${index}`} className="site-footer__contact-item">
                    <span className="site-footer__contact-icon" aria-hidden="true">
                      <SimpleIcon name={item.type} className="site-footer__contact-icon-svg" />
                    </span>
                    {item.type === "mail" ? (
                      <a className="site-footer__contact-value" href={`mailto:${item.value}`}>
                        {item.value}
                      </a>
                    ) : item.type === "phone" ? (
                      <a
                        className="site-footer__contact-value"
                        href={`tel:${item.value.replace(/\s/g, "")}`}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="site-footer__contact-value">{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {meta.copyright ? (
            <p className="site-footer__copyright">{meta.copyright}</p>
          ) : null}

          {contactColumn ? (
            <SiteNavLink href={ctaHref} className="site-footer__cta-button" fallbackPath="/contact">
              {ctaLabel}
            </SiteNavLink>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
