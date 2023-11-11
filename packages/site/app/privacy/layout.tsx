import { type PropsWithChildren } from "react";

import { ThemeRegistry } from "../../components/ThemeRegistry";

const Layout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body>
      <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
    </body>
  </html>
);

export default Layout;
