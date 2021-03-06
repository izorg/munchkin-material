import { List } from "@material-ui/core";

import InsomniaItem from "./InsomniaItem";
import LevelLimitItem from "./LevelLimitItem";
import PrivacyItem from "./PrivacyItem";
import RateItem from "./RateItem";
import RestorePurchasesItem from "./RestorePurchasesItem";
import ShareItem from "./ShareItem";
import SingleModeItem from "./SingleModeItem";
import ThemeItem from "./ThemeItem";
import VersionItem from "./VersionItem";

const MenuList = (): JSX.Element => (
  <List component="div">
    <ThemeItem />
    <SingleModeItem />
    <LevelLimitItem />
    <InsomniaItem />
    <RateItem />
    <ShareItem />
    <RestorePurchasesItem />
    <PrivacyItem />
    <VersionItem />
  </List>
);

export default MenuList;
