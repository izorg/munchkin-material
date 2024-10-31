import { HomePage } from "../../../domains/home-page";
import { type LANGUAGE } from "../../../domains/i18n";

export type Params = { language: LANGUAGE };

type PageProps = {
  params: Promise<Params>;
};

const Page = async (props: PageProps) => {
  const { params } = props;
  const { language } = await params;

  return <HomePage language={language} />;
};

export default Page;
