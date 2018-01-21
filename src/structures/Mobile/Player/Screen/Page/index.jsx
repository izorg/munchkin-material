import React from 'react';
import { withStyles } from 'material-ui/styles';

import Layout, { LayoutContent } from '../../../../../components/Layout';

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
    <AppBar />
    <LayoutContent className={classes.sliderContent}>
      <Slider />
    </LayoutContent>
  </Layout>
);

export default withStyles(styles)(PlayerScreenComponent);
