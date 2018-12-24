import React from 'react';
import { List } from '@material-ui/core';

import InsomniaItem from './InsomniaItem';
import LevelLimitItem from './LevelLimitItem';
import PrivacyItem from './PrivacyItem';
import RateItem from './RateItem';
import ShareItem from './ShareItem';
import SingleModeItem from './SingleModeItem';
import ThemeItem from './ThemeItem';
import VersionItem from './VersionItem';

const MenuList = () => (
  <List component="div">
    <ThemeItem />
    <SingleModeItem />
    <LevelLimitItem />
    <InsomniaItem />
    <RateItem />
    <ShareItem />
    <PrivacyItem />
    <VersionItem />
  </List>
);

export default MenuList;
