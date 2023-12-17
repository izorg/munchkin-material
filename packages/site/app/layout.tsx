import { type Viewport } from "next";
import { type PropsWithChildren } from "react";

import { Analytics } from "../components/Analytics";
import { ThemeRegistry } from "../components/ThemeRegistry";

export const viewport: Viewport = {
  colorScheme: "light",
};

const Layout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body>
      <ThemeRegistry>{children}</ThemeRegistry>
      <Analytics />
    </body>
  </html>
);

export default Layout;
