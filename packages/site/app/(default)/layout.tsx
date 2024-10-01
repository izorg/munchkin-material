import { type PropsWithChildren } from "react";

import { RootLayout } from "../../components/RootLayout";
import { LANGUAGE_EN } from "../../lib/languages";

export { viewport } from "../../components/RootLayout";

const Layout = ({ children }: PropsWithChildren) => (
  <RootLayout language={LANGUAGE_EN}>{children}</RootLayout>
);

export default Layout;
