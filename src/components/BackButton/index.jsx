import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ArrowBack, KeyboardArrowLeft } from '@material-ui/icons';

import TopIconButton from '../TopIconButton';

import { ios } from '../../utils/platforms';

const useStyles = makeStyles(
  {
    iosIcon: {
      transform: 'scale(1.5)',
    },
  },
  { name: 'BackButton' },
);

const BackButton = (props) => {
  const classes = useStyles();

  return (
    <TopIconButton color="inherit" {...props}>
      {ios ? <KeyboardArrowLeft className={classes.iosIcon} /> : <ArrowBack />}
    </TopIconButton>
  );
};

export default BackButton;
