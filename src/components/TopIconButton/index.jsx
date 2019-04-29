import React, { forwardRef } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      [theme.breakpoints.down('sm')]: {
        margin: 4,
        padding: 8,
      },
    },
  }),
  { name: 'TopIconButton' },
);

const TopIconButton = forwardRef(({ className, ...rest }, ref) => {
  const classes = useStyles();

  return (
    <IconButton ref={ref} className={clsx(classes.root, className)} {...rest} />
  );
});

export default TopIconButton;
