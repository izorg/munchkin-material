import React from 'react';
import { IconButton, withStyles } from '@material-ui/core';
import { ArrowBack, KeyboardArrowLeft } from '@material-ui/icons';

import { ios } from '../../utils/platforms';

const styles = {
  iosIcon: {
    transform: 'scale(1.5)',
  },
};

const BackButton = ({ classes, ...rest }) => (
  <IconButton color="inherit" {...rest}>
    {ios ? <KeyboardArrowLeft className={classes.iosIcon} /> : <ArrowBack />}
  </IconButton>
);

export default withStyles(styles)(BackButton);
