import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import NavigationArrowBack from '@material-ui/icons/ArrowBack';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { withStyles } from '@material-ui/core/styles';

import { ios } from '../../utils/platforms';

const styles = {
  icon: {
    transform: 'scale(1.5)',
  },
};

const BackButton = ({ classes, ...rest }) => (
  <IconButton color="inherit" {...rest}>
    {ios ? (
      <KeyboardArrowLeft className={classes.icon} />
    ) : (
      <NavigationArrowBack />
    )}
  </IconButton>
);

export default withStyles(styles)(BackButton);
