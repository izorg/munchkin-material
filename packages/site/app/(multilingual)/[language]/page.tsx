import { HomePage } from "../../../domains/home-page";
import { type LANGUAGE } from "../../../domains/i18n";

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
