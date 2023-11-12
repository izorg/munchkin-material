import { GoogleTagManager } from "@next/third-parties/google";
import { type PropsWithChildren } from "react";

import { ThemeRegistry } from "../../components/ThemeRegistry";

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
    <GoogleTagManager gtmId="GTM-5Z3D8FX" />
  </>
);

export default Layout;
