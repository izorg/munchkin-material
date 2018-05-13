import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';

import Layout from '../../../../components/Layout';

import AppBar from './AppBar';
import Slider from './Slider';

const styles = {
  sliderContent: {
    display: 'flex',
    flex: 1,
  },
};

class PlayerPage extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <AppBar />
        <div className={classes.sliderContent}>
          <Slider />
        </div>
      </Layout>
    );
  }
}

export default withStyles(styles)(PlayerPage);
