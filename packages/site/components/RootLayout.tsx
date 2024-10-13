import { GoogleAnalytics } from "@next/third-parties/google";
import { type Viewport } from "next";
import { type PropsWithChildren } from "react";

import { getLocalMessages, type Language, localeByLanguage } from "../lib/i18n";
import { munchkinFont } from "../lib/munchkinFont";

import { I18nProvider } from "./I18nProvider";
import { ThemeRegistry } from "./ThemeRegistry";

export const viewport: Viewport = {
  colorScheme: "light dark",
};

type RootLayoutProps = PropsWithChildren<{
  language: Language;
}>;

export const RootLayout = async ({ children, language }: RootLayoutProps) => {
  const locale = localeByLanguage[language];
  const messages = await getLocalMessages(locale);

  return (
    <html className={munchkinFont.variable} lang={locale}>
      <GoogleAnalytics gaId="G-3HCBBLXXS0" />
      <body>
        <script>window.globalThis = window;</script>
        <I18nProvider locale={locale} messages={messages}>
          <ThemeRegistry>{children}</ThemeRegistry>
        </I18nProvider>
      </body>
    </html>
  );
};
