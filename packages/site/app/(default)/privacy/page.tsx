import { type Metadata } from "next";

import { PrivacyPolicy } from "../../../domains/privacy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const Page = () => <PrivacyPolicy />;

export default Page;
