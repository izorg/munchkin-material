import { List } from '@material-ui/core';
import React from 'react';

import InsomniaItem from './InsomniaItem';
import LevelLimitItem from './LevelLimitItem';
import PrivacyItem from './PrivacyItem';
import RateItem from './RateItem';
import RestorePurchasesItem from './RestorePurchasesItem';
import ShareItem from './ShareItem';
import SingleModeItem from './SingleModeItem';
import ThemeItem from './ThemeItem';
import TranslateItem from './TranslateItem';
import VersionItem from './VersionItem';

const MenuList = () => (
  <List component="div">
    <ThemeItem />
    <SingleModeItem />
    <LevelLimitItem />
    <InsomniaItem />
    <RateItem />
    <ShareItem />
    <RestorePurchasesItem />
    <TranslateItem />
    <PrivacyItem />
    <VersionItem />
  </List>
);

MenuList.displayName = 'MenuList';

export default MenuList;
