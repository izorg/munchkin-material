import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ArrowLeft, ChevronLeft } from 'mdi-material-ui';

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
    <TopIconButton color="inherit" edge="start" {...props}>
      {ios ? <ChevronLeft className={classes.iosIcon} /> : <ArrowLeft />}
    </TopIconButton>
  );
};

BackButton.displayName = 'BackButton';

export default BackButton;
