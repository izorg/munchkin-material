import React from 'react';
import { withStyles } from 'material-ui/styles/index';

import { classesObject } from '../../../utils/propTypes';

import Layout, { LayoutContent, LayoutHeader } from '../../../components/Layout';

import AppBar from './AppBar';
import Slider from './Slider';

const styles = {
  sliderContent: {
    display: 'flex',
    paddingLeft: 0,
    paddingRight: 0,
  },

  '@media (orientation: portrait)': {
    sliderContent: {
      paddingBottom: 56,
    },
  },
};

const PlayerScreenComponent = ({ classes }) => (
  <Layout>
    <LayoutHeader>
      <AppBar />
    </LayoutHeader>
    <LayoutContent className={classes.sliderContent}>
      <Slider />
    </LayoutContent>
  </Layout>
);

PlayerScreenComponent.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(PlayerScreenComponent);
