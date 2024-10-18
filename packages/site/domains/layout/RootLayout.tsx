import { GoogleAnalytics } from "@next/third-parties/google";
import { type Viewport } from "next";
import { type PropsWithChildren } from "react";

import { munchkinFont } from "../fonts";
import { getServerIntl, I18nProvider, type LANGUAGE } from "../i18n";
import { ThemeRegistry } from "../theme";

export const viewport: Viewport = {
  colorScheme: "light dark",
};

type RootLayoutProps = PropsWithChildren<{
  language: LANGUAGE;
}>;

export const RootLayout = async ({ children, language }: RootLayoutProps) => {
  const intl = await getServerIntl(language);

  return (
    <html className={munchkinFont.variable} lang={intl.locale}>
      <GoogleAnalytics gaId="G-3HCBBLXXS0" />
      <body>
        <I18nProvider locale={intl.locale} messages={intl.messages}>
          <ThemeRegistry>{children}</ThemeRegistry>
        </I18nProvider>
      </body>
    </html>
  );
};
