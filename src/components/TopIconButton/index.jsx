import React, { forwardRef } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: 8,

      [theme.breakpoints.up('md')]: {
        padding: 12,
      },
    },

    edgeStart: {
      marginLeft: -8,

      [theme.breakpoints.up('md')]: {
        marginLeft: -12,
      },
    },

    edgeEnd: {
      marginLeft: 16,
      marginRight: -8,

      [theme.breakpoints.up('md')]: {
        marginLeft: 12,
        marginRight: -12,
      },
    },
  }),
  { name: 'TopIconButton' },
);

const TopIconButton = forwardRef((props, ref) => {
  const classes = useStyles();

  return <IconButton ref={ref} classes={classes} color="inherit" {...props} />;
});

TopIconButton.displayName = 'TopIconButton';

export default TopIconButton;
