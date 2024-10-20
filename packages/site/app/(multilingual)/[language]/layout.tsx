import { type PropsWithChildren } from "react";

import { LANGUAGE } from "../../../domains/i18n";
import { RootLayout } from "../../../domains/layout";

export { viewport } from "../../../domains/layout";

export const generateStaticParams = () =>
  Object.values(LANGUAGE).map((language) => ({
    language,
  }));

type LayoutProps = PropsWithChildren<{
  params: {
    language: LANGUAGE;
  };
}>;

const Layout = ({ children, params: { language } }: LayoutProps) => (
  <RootLayout language={language}>{children}</RootLayout>
);

export default Layout;
