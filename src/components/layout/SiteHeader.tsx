"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SiteNavLink from "@/components/layout/SiteNavLink";
import { handleNavLinkClick, isNavLinkActive } from "@/lib/nav-link";
import { normalizeSitePath } from "@/lib/site-path";
export type NavItem = { label: string; href: string; active?: boolean };

export default function SiteHeader({
  navItems,
  brandTitle = "CRYPTONEXIS LIMITED",
}: {
  navItems: NavItem[];
  brandTitle?: string;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  const validNavItems = navItems.filter(
    (item): item is { label: string; href: string; active?: boolean } =>
      typeof item?.href === "string" &&
      item.href.trim() !== "" &&
      typeof item?.label === "string" &&
      item.label.trim() !== "",
  );
  const preferredNav = [
    { keys: ["home"], href: "/", label: "Home" },
    { keys: ["about", "about us"], href: "/about", label: "About us" },
    { keys: ["services"], href: "/services", label: "Services" },
    { keys: ["projects"], href: "/projects", label: "Projects" },
    { keys: ["contact", "contact us"], href: "/contact", label: "Contact us" },
  ];

  const displayNavItems = preferredNav
    .map(({ keys, href, label }) => {
      const found = validNavItems.find((item) =>
        keys.includes(item.label.trim().toLowerCase()),
      );
      if (found) {
        return {
          label: found.label.trim() || label,
          href: normalizeSitePath(found.href, href),
        };
      }
      return { label, href };
    })
    .slice(0, 5);

  return (
    <header className="site-header site-header--institutional">
      <div className="site-header__shell section-shell">
        <div className="site-header__inner">
          <Link
            className="brand"
            href="/"
            aria-label="Cryptonexis Limited home"
            scroll
            onClick={(event) => handleNavLinkClick(event, pathname, "/")}
          >
            <span className="brand__title">{brandTitle.trim() || "CRYPTONEXIS LIMITED"}</span>
          </Link>

          <div className="site-header__end">
            <nav
              className={`site-nav site-nav--institutional${isMenuOpen ? " is-open" : ""}`}
              id="site-navigation"
              aria-label="Primary"
            >
              {displayNavItems.map((item) => {
                const active = isNavLinkActive(pathname, item.href);
                return (
                  <SiteNavLink
                    key={item.label}
                    href={item.href}
                    className="site-nav__link"
                    activeClassName="site-nav__link--active"
                    onNavigate={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {active ? (
                      <span className="site-nav__underline" aria-hidden="true" />
                    ) : null}
                  </SiteNavLink>
                );
              })}
            </nav>

            <button
              suppressHydrationWarning
              className={`menu-toggle menu-toggle--institutional${isMenuOpen ? " is-open" : ""}`}
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="site-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="menu-toggle__icon" aria-hidden="true">
                <span className="menu-toggle__line" />
                <span className="menu-toggle__line" />
                <span className="menu-toggle__line" />
              </span>
              <span className="visually-hidden">
                {isMenuOpen ? "Close menu" : "Open menu"}
              </span>
            </button>
          </div>

          {isMenuOpen ? (
            <button
              type="button"
              className="site-nav-backdrop site-nav-backdrop--institutional"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
}
