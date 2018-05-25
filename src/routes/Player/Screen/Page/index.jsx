import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppBar from './AppBar';
import Slider from './Slider';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },

  sliderContent: {
    display: 'flex',
    flex: 1,
  },
});

class PlayerPage extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar />
        <div className={classes.sliderContent}>
          <Slider />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PlayerPage);
