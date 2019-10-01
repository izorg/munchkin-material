import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'mdi-material-ui';

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
  const { direction } = useTheme();

  let icon;

  if (ios) {
    icon =
      direction === 'rtl' ? (
        <ChevronRight className={classes.iosIcon} />
      ) : (
        <ChevronLeft className={classes.iosIcon} />
      );
  } else {
    icon = direction === 'rtl' ? <ArrowRight /> : <ArrowLeft />;
  }

  return (
    <TopIconButton color="inherit" edge="start" {...props}>
      {icon}
    </TopIconButton>
  );
};

BackButton.displayName = 'BackButton';

export default BackButton;
