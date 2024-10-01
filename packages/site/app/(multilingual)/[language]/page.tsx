import { type Metadata } from "next";

import {
  generateHomePageMetadata,
  HomePage,
} from "../../../components/HomePage";
import { type Language } from "../../../lib/i18n";
import * as languages from "../../../lib/languages";

export const generateStaticParams = () =>
  Object.values(languages).map((language) => ({
    language,
  }));

type Params = { language: Language };

type MetadataProps = {
  params: Params;
};

export const generateMetadata = async ({
  params,
}: MetadataProps): Promise<Metadata> =>
  generateHomePageMetadata(params.language);

type PageProps = {
  params: Params;
};

const Page = (props: PageProps) => {
  const { params } = props;
  const { language } = params;

  return <HomePage language={language} />;
};

export default Page;
