import { Fab, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

const displayName = 'DialogFab';

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
  { name: displayName },
);

const DialogFab = forwardRef(({ className, ...rest }, ref) => {
  const classes = useStyles();

  return (
    <Fab
      ref={ref}
      className={clsx(className, classes.root)}
      color="primary"
      {...rest}
    />
  );
});

DialogFab.displayName = displayName;

export default DialogFab;
