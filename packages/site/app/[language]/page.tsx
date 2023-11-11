import { type Metadata } from "next";

import { Home } from "../../components/Home";
import { getServerIntl, localeByLanguage } from "../../lib/i18n";
import type { Language } from "../../lib/i18n";
import * as languages from "../../lib/languages";

export const generateStaticParams = () =>
  Object.values(languages).map((language) => ({
    language,
  }));

type MetadataProps = {
  params: {
    language: Language;
  };
};

export const generateMetadata = async ({
  params,
}: MetadataProps): Promise<Metadata> => {
  const { language } = params;

  const intl = await getServerIntl(localeByLanguage[language]);

  return {
    title: intl.formatMessage({
      id: "home.title",
    }),
  };
};

const Page = () => <Home />;

export default Page;
