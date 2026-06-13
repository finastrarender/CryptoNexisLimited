import type { MouseEvent } from "react";
import { normalizeSitePath } from "@/lib/site-path";

export type NavHrefParts = {
  path: string;
  hash: string;
  href: string;
};

function normalizeNavPath(path: string): string {
  if (path === "/home") return "/";
  return path;
}

export function parseNavHref(href: string, fallback = "/"): NavHrefParts {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return { path: trimmed, hash: "", href: trimmed };
  }

  const hashIndex = trimmed.indexOf("#");
  const hash = hashIndex >= 0 ? trimmed.slice(hashIndex) : "";
  const pathPart = hashIndex >= 0 ? trimmed.slice(0, hashIndex) : trimmed;
  const path = normalizeNavPath(normalizeSitePath(pathPart, fallback));

  return {
    path,
    hash,
    href: `${path}${hash}`,
  };
}

export function isNavLinkActive(pathname: string, href: string): boolean {
  const { path, hash } = parseNavHref(href);
  if (!path || path.startsWith("http://") || path.startsWith("https://")) return false;
  if (hash) return false;

  const currentPath = normalizeNavPath(pathname);
  if (path === "/") return currentPath === "/";
  return currentPath === path || currentPath.startsWith(`${path}/`);
}

export function scrollPageToTop(behavior: ScrollBehavior = "smooth") {
  window.scrollTo({ top: 0, left: 0, behavior });
}

export function scrollToNavTarget(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.replace(/^#/, "");
  if (!id) {
    scrollPageToTop(behavior);
    return;
  }

  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior, block: "start" });
    return;
  }

  scrollPageToTop(behavior);
}

export function handleNavLinkClick(
  event: MouseEvent<HTMLAnchorElement>,
  pathname: string,
  href: string,
) {
  const { path, hash } = parseNavHref(href);
  if (!path || path.startsWith("http://") || path.startsWith("https://")) return;

  const currentPath = normalizeNavPath(pathname);
  const samePath =
    path === "/"
      ? currentPath === "/"
      : currentPath === path || currentPath.startsWith(`${path}/`);

  if (!samePath) return;

  event.preventDefault();
  if (hash) {
    scrollToNavTarget(hash);
  } else {
    scrollPageToTop();
  }
}
