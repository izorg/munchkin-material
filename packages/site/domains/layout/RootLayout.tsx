import { GoogleAnalytics } from "@next/third-parties/google";
import { type Viewport } from "next";
import { type PropsWithChildren } from "react";

import { munchkinFont } from "../fonts";
import { getServerIntl, I18nProvider, type LANGUAGE } from "../i18n";
import { getLocaleDirection } from "../l10n";
import { ThemeRegistry } from "../theme";

export const viewport: Viewport = {
  colorScheme: "light dark",
};

type RootLayoutProps = PropsWithChildren<{
  language: LANGUAGE;
}>;

export const RootLayout = async ({ children, language }: RootLayoutProps) => {
  const { locale, messages } = await getServerIntl(language);
  const direction = getLocaleDirection(locale);

  return (
    <html className={munchkinFont.variable} dir={direction} lang={locale}>
      <GoogleAnalytics gaId="G-3HCBBLXXS0" />
      <body>
        <I18nProvider locale={locale} messages={messages}>
          <ThemeRegistry direction={direction}>{children}</ThemeRegistry>
        </I18nProvider>
      </body>
    </html>
  );
};
