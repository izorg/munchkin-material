import { type PropsWithChildren } from "react";

import { LANGUAGE } from "../../domains/i18n";
import { RootLayout } from "../../domains/layout";

export { viewport } from "../../domains/layout";

const Layout = ({ children }: PropsWithChildren) => (
  <RootLayout language={LANGUAGE.EN}>{children}</RootLayout>
);

export default Layout;
