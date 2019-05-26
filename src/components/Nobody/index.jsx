import React from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles, Typography } from '@material-ui/core';
import { AccountCircle } from 'mdi-material-ui';

const useStyles = makeStyles(
  (theme) => ({
    nobody: {
      alignItems: 'center',
      color: theme.palette.text.hint,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },

    nobodyIcon: {
      height: 96,
      marginBottom: theme.spacing(2),
      opacity: 0.2,
      width: 96,
    },
  }),
  { name: 'Nobody' },
);

const Nobody = () => {
  const classes = useStyles();

  return (
    <div className={classes.nobody}>
      <AccountCircle className={classes.nobodyIcon} />
      <Typography
        align="center"
        color="inherit"
        component="div"
        variant="subtitle1"
      >
        <FormattedMessage
          defaultMessage="No players in the list"
          id="player.list.empty"
        />
      </Typography>
    </div>
  );
};

export default Nobody;
