import React from 'react';
import { FormattedMessage } from 'react-intl';
import Typography from 'material-ui/es/Typography';
import { withStyles } from 'material-ui/es/styles';
import AccountCircle from 'material-ui-icons/AccountCircle';

import { classesObject } from '../../../utils/propTypes';

const styles = theme => ({
  nobody: {
    color: theme.palette.text.hint,
    fontSize: '1em',
    textAlign: 'center',
  },

  nobodyIcon: {
    height: 96,
    marginBottom: 16,
    opacity: 0.2,
    width: 96,
  },
});

const PlayerListEmpty = ({ classes }) => (
  <div className={classes.nobody}>
    <AccountCircle className={classes.nobodyIcon} />
    <Typography align="center" className={classes.nobody} component="div">
      <FormattedMessage
        id="player.list.empty"
        defaultMessage="No players in the list"
      />
    </Typography>
  </div>
);

PlayerListEmpty.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(PlayerListEmpty);
