import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cns from 'classnames';

import AppBar from './AppBar';
import Slider from './Slider';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
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
    const { classes, className, ...rest } = this.props;

    return (
      <div className={cns(classes.root, className)} {...rest}>
        <AppBar />
        <div className={classes.sliderContent}>
          <Slider />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PlayerPage);
