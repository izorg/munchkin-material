import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import NavigationCheck from 'material-ui-icons/Check';
import { noop } from 'lodash';

import AppBar from '../../../../components/AppBar';
import Title from '../../../../components/Title';

const styles = {
  leftButton: {
    marginRight: 8,
  },

  title: {
    marginLeft: 12,
  },
};

class PlayerFormScreenAppBarComponent extends PureComponent {
  render() {
    const { classes, edit, onCancel } = this.props;

    return (
      <AppBar>
        <IconButton
          className={classes.leftButton}
          color="inherit"
          onClick={onCancel}
        >
          <NavigationArrowBack />
        </IconButton>

        <Title className={classes.title}>
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

        <IconButton color="inherit" type="submit">
          <NavigationCheck />
        </IconButton>
      </AppBar>
    );
  }
}

PlayerFormScreenAppBarComponent.propTypes = {
  edit: PropTypes.bool,
  onCancel: PropTypes.func,
};

PlayerFormScreenAppBarComponent.defaultProps = {
  edit: false,
  onCancel: noop,
};

export default withStyles(styles)(PlayerFormScreenAppBarComponent);
