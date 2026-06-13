import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "../styles.css";

export const metadata: Metadata = {
  title: {
    default: "CRYPTONEXIS LIMITED",
    template: "%s | Cryptonexis Limited",
  },
  description:
    "Cryptonexis Limited — RAK Economic Zone licensed NFT creator and issuer for institutional digital asset creation, issuance, and compliance-first advisory.",
  metadataBase: new URL(getSiteUrl()),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* suppressHydrationWarning on html/body: browser extensions often inject attrs (e.g. cz-shortcut-listen). */
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="owtc-app" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

