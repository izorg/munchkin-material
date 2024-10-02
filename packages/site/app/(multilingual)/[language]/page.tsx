import { HomePage } from "../../../components/HomePage";
import { type Language } from "../../../lib/i18n";
import * as languages from "../../../lib/languages";

export const generateStaticParams = () =>
  Object.values(languages).map((language) => ({
    language,
  }));

type Params = { language: Language };

type PageProps = {
  params: Params;
};

const Page = (props: PageProps) => {
  const { params } = props;
  const { language } = params;

  return <HomePage language={language} />;
};

export default Page;
