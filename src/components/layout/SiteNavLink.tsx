"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { handleNavLinkClick, isNavLinkActive, parseNavHref } from "@/lib/nav-link";

type SiteNavLinkProps = {
  href: string;
  className?: string;
  activeClassName?: string;
  children: ReactNode;
  onNavigate?: () => void;
  fallbackPath?: string;
};

export default function SiteNavLink({
  href,
  className = "",
  activeClassName = "",
  children,
  onNavigate,
  fallbackPath = "/",
}: SiteNavLinkProps) {
  const pathname = usePathname();
  const { href: linkHref } = parseNavHref(href, fallbackPath);
  const active = isNavLinkActive(pathname, href);
  const classes = [className, active && activeClassName ? activeClassName : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={linkHref}
      className={classes || undefined}
      aria-current={active ? "page" : undefined}
      scroll
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        handleNavLinkClick(event, pathname, href);
        onNavigate?.();
      }}
    >
      {children}
    </Link>
  );
}
