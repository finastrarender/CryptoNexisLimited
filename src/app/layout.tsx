import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import {
  buildSocialMetadata,
  DEFAULT_DESCRIPTION,
} from "@/lib/metadata/social";
import "../styles.css";

export const metadata: Metadata = {
  title: {
    default: "CRYPTONEXIS LIMITED",
    template: "%s | Cryptonexis Limited",
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(getSiteUrl()),
  ...buildSocialMetadata({
    title: "CRYPTONEXIS LIMITED | Licensed NFT Creator and Issuer",
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
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

