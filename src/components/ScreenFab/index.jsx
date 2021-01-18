import { Fab, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { forwardRef } from 'react';

const displayName = 'ScreenFab';

const useStyles = makeStyles(
  /* eslint-disable sort-keys */
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
          right: `max(${theme.spacing(3)}, env(safe-area-inset-right))`,
        },
      },
    },
  }),
  /* eslint-enable */
  { name: displayName },
);

const ScreenFab = forwardRef(({ className, ...rest }, ref) => {
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

ScreenFab.displayName = displayName;

export default ScreenFab;
