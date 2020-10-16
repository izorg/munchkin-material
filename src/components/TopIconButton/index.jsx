import { IconButton, makeStyles } from '@material-ui/core';
import { forwardRef } from 'react';

const displayName = 'TopIconButton';

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
  { name: displayName },
);

const TopIconButton = forwardRef((props, ref) => {
  const classes = useStyles();

  return <IconButton ref={ref} classes={classes} color="inherit" {...props} />;
});

TopIconButton.displayName = displayName;

export default TopIconButton;
