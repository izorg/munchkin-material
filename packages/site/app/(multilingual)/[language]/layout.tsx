import { type Viewport } from "next";
import Script from "next/script";
import { type PropsWithChildren } from "react";

import { Analytics } from "../../../components/Analytics";
import { I18nProvider } from "../../../components/I18nProvider";
import { ThemeRegistry } from "../../../components/ThemeRegistry";
import {
  getLocalMessages,
  type Language,
  localeByLanguage,
} from "../../../lib/i18n";
import { munchkinFont } from "../../../lib/munchkinFont";

export const viewport: Viewport = {
  colorScheme: "light dark",
};

type LayoutProps = PropsWithChildren<{
  params: {
    language: Language;
  };
}>;

const Layout = async ({ children, params }: LayoutProps) => {
  const locale = localeByLanguage[params.language];
  const messages = await getLocalMessages(locale);

  return (
    <html className={munchkinFont.variable} lang={locale}>
      <body>
        <I18nProvider locale={locale} messages={messages}>
          <ThemeRegistry>{children}</ThemeRegistry>
        </I18nProvider>
        <Analytics />
        <Script id="globalThis" strategy="beforeInteractive">
          window.globalThis = window;
        </Script>
      </body>
    </html>
  );
};

export default Layout;
