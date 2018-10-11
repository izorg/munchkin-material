import React from 'react';
import List from '@material-ui/core/List';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withStyles } from '@material-ui/core/styles';

import InsomniaItem from './InsomniaItem';
import LevelLimitItem from './LevelLimitItem';
import PrivacyItem from './PrivacyItem';
import RateItem from './RateItem';
import ShareItem from './ShareItem';
import SingleModeItem from './SingleModeItem';
import ThemeItem from './ThemeItem';
import VersionItem from './VersionItem';

const styles = {
  menu: {
    maxWidth: 320,
    width: 'calc(100vw - 56px)',

    '@supports(padding: env(safe-area-inset-left))': {
      maxWidth: 'calc(320px + env(safe-area-inset-left))',
      paddingLeft: 'env(safe-area-inset-left)',
    },
  },
};

const HomeMenuDrawer = ({ classes, ...rest }) => (
  <SwipeableDrawer hysteresis={0.5} minFlingVelocity={300} {...rest}>
    <List className={classes.menu} component="div">
      <ThemeItem />
      <SingleModeItem />
      <LevelLimitItem />
      <InsomniaItem />
      <RateItem />
      <ShareItem />
      <PrivacyItem />
      <VersionItem />
    </List>
  </SwipeableDrawer>
);

export default withStyles(styles)(HomeMenuDrawer);
