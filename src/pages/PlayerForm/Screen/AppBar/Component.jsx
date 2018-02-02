import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import NavigationCheck from 'material-ui-icons/Check';
import { noop } from 'lodash';

import Title from '../../../../components/Title';

const styles = {
  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },
};

const PlayerFormScreenAppBar = ({ classes, edit, onCancel, onSubmit }) => (
  <AppBar color="primary" position="static">
    <Toolbar>
      <IconButton
        className={classes.leftButton}
        color="inherit"
        onClick={onCancel}
      >
        <NavigationArrowBack />
      </IconButton>

      <Title>
        {edit ? (
          <FormattedMessage
            id="player.form.titleEdit"
            defaultMessage="Edit munchkin"
          />
        ) : (
          <FormattedMessage
            id="player.form.title"
            defaultMessage="New munchkin"
          />
        )}
      </Title>

      <IconButton
        className={classes.rightButton}
        color="inherit"
        onClick={onSubmit}
      >
        <NavigationCheck />
      </IconButton>
    </Toolbar>
  </AppBar>
);

PlayerFormScreenAppBar.propTypes = {
  edit: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

PlayerFormScreenAppBar.defaultProps = {
  edit: false,
  onCancel: noop,
  onSubmit: noop,
};

export default withStyles(styles)(PlayerFormScreenAppBar);
