import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography, withStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const styles = (theme) => ({
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
    marginBottom: theme.spacing.unit * 2,
    opacity: 0.2,
    width: 96,
  },
});

const Nobody = ({ classes }) => (
  <div className={classes.nobody}>
    <AccountCircle className={classes.nobodyIcon} />
    <Typography
      align="center"
      color="inherit"
      component="div"
      variant="subtitle1"
    >
      <FormattedMessage
        id="player.list.empty"
        defaultMessage="No players in the list"
      />
    </Typography>
  </div>
);

export default withStyles(styles)(Nobody);
