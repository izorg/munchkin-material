import { type Viewport } from "next";
import { type PropsWithChildren } from "react";

import { Analytics } from "../../components/Analytics";
import { I18nProvider } from "../../components/I18nProvider";
import { ThemeRegistry } from "../../components/ThemeRegistry";
import { getLocalMessages, localeByLanguage } from "../../lib/i18n";
import { type Language } from "../../lib/i18n";
import { munchkinFont } from "../../lib/munchkinFont";

export const viewport: Viewport = {
  colorScheme: "light",
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
      </body>
    </html>
  );
};

export default Layout;
