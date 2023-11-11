import { type PropsWithChildren } from "react";

import { I18nProvider } from "../../components/I18nProvider";
import { ThemeRegistry } from "../../components/ThemeRegistry";
import { getLocalMessages, localeByLanguage } from "../../lib/i18n";
import type { Language } from "../../lib/i18n";
import { munchkinFont } from "../../lib/munchkinFont";

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
          <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
        </I18nProvider>
      </body>
    </html>
  );
};

export default Layout;
