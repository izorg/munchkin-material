import { HomePage } from "../../../domains/home-page";
import { LANGUAGE } from "../../../domains/i18n";

export const generateStaticParams = () =>
  Object.values(LANGUAGE).map((language) => ({
    language,
  }));

type Params = { language: LANGUAGE };

type PageProps = {
  params: Params;
};

const Page = (props: PageProps) => {
  const { params } = props;
  const { language } = params;

  return <HomePage language={language} />;
};

export default Page;
