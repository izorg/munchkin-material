import { type Metadata } from "next";

import { generateHomePageMetadata, HomePage } from "../../components/HomePage";
import { LANGUAGE_EN } from "../../lib/languages";

export const generateMetadata = async (): Promise<Metadata> =>
  generateHomePageMetadata(LANGUAGE_EN);

const Page = () => <HomePage language={LANGUAGE_EN} />;

export default Page;
