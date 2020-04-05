import { makeStyles, useTheme } from '@material-ui/core';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'mdi-material-ui';
import React from 'react';

import { ios } from '../../utils/platforms';
import TopIconButton from '../TopIconButton';

const displayName = 'BackButton';

const useStyles = makeStyles(
  {
    iosIcon: {
      transform: 'scale(1.5)',
    },
  },
  { name: displayName },
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

BackButton.displayName = displayName;

export default BackButton;
