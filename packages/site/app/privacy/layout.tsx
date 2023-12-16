import { GoogleTagManager } from "@next/third-parties/google";
import type { Viewport } from "next";
import { type PropsWithChildren } from "react";

import { ThemeRegistry } from "../../components/ThemeRegistry";

export const viewport: Viewport = {
  colorScheme: "light",
};

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
    <GoogleTagManager gtmId="GTM-5Z3D8FX" />
  </>
);

export default Layout;
