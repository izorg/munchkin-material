import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      bottom: theme.spacing(2),
      position: 'fixed',
      right: theme.spacing(2),
      zIndex: 2,

      [theme.breakpoints.up('sm')]: {
        bottom: theme.spacing(3),
        right: theme.spacing(3),

        '@supports (padding: max(0px))': {
          right: `max(${theme.spacing(3)}px, env(safe-area-inset-right))`,
        },
      },
    },
  }),
  { name: 'FabButton' },
);

const FabButton = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Fab className={clsx(className, classes.root)} color="primary" {...rest} />
  );
};

export default FabButton;
