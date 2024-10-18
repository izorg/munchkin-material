import { type PropsWithChildren } from "react";

import { type LANGUAGE } from "../../../domains/i18n";
import { RootLayout } from "../../../domains/layout";

export { viewport } from "../../../domains/layout";

type LayoutProps = PropsWithChildren<{
  params: {
    language: LANGUAGE;
  };
}>;

const Layout = ({ children, params: { language } }: LayoutProps) => (
  <RootLayout language={language}>{children}</RootLayout>
);

export default Layout;
