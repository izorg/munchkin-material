import { type PropsWithChildren } from "react";

import { LANGUAGE } from "../../../domains/i18n";
import { RootLayout } from "../../../domains/layout";

import { type Params } from "./page";

export { viewport } from "../../../domains/layout";

export const generateStaticParams = () =>
  Object.values(LANGUAGE).map((language) => ({
    language,
  }));

type LayoutProps = PropsWithChildren<{
  params: Params;
}>;

const Layout = (props: LayoutProps) => {
  const { children, params } = props;
  const { language } = params;

  return <RootLayout language={language}>{children}</RootLayout>;
};

export default Layout;
