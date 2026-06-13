"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollPageToTop } from "@/lib/nav-link";

export default function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    scrollPageToTop("auto");
  }, [pathname]);

  return null;
}
