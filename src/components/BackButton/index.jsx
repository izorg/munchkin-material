import React from 'react';
import { withStyles } from '@material-ui/core';
import { ArrowBack, KeyboardArrowLeft } from '@material-ui/icons';

import TopIconButton from '../TopIconButton';

import { ios } from '../../utils/platforms';

const styles = {
  iosIcon: {
    transform: 'scale(1.5)',
  },
};

const BackButton = ({ classes, ...rest }) => (
  <TopIconButton color="inherit" {...rest}>
    {ios ? <KeyboardArrowLeft className={classes.iosIcon} /> : <ArrowBack />}
  </TopIconButton>
);

export default withStyles(styles)(BackButton);
