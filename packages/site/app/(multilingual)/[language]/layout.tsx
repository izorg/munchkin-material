import { type PropsWithChildren } from "react";

import { RootLayout } from "../../../components/RootLayout";
import { type Language } from "../../../lib/i18n";

export { viewport } from "../../../components/RootLayout";

type LayoutProps = PropsWithChildren<{
  params: {
    language: Language;
  };
}>;

const Layout = ({ children, params: { language } }: LayoutProps) => (
  <RootLayout language={language}>{children}</RootLayout>
);

export default Layout;
