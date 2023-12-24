import { type Viewport } from "next";
import Script from "next/script";
import { type PropsWithChildren } from "react";

import { Analytics } from "../../components/Analytics";
import { ThemeRegistry } from "../../components/ThemeRegistry";
import { munchkinFont } from "../../lib/munchkinFont";

export const viewport: Viewport = {
  colorScheme: "light",
};

const Layout = ({ children }: PropsWithChildren) => (
  <html className={munchkinFont.variable} lang="en">
    <body>
      <ThemeRegistry>{children}</ThemeRegistry>
      <Analytics />
      <Script id="globalThis" strategy="beforeInteractive">
        window.globalThis = window;
      </Script>
    </body>
  </html>
);

export default Layout;
