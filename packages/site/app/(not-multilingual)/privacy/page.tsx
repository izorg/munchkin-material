import { type Metadata } from "next";

import { PrivacyPolicy } from "../../../components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const Page = () => <PrivacyPolicy />;

export default Page;
