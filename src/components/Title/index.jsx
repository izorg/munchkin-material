import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(
  (theme) => ({
    title: {
      flex: 1,
      paddingLeft: 24,
      paddingRight: 8,

      [theme.breakpoints.up('md')]: {
        paddingLeft: 20,
      },
    },
  }),
  { name: 'Title' },
);

const Title = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <Typography
      className={clsx(classes.title, className)}
      color="inherit"
      noWrap
      variant="h6"
      {...props}
    />
  );
};

export default Title;
