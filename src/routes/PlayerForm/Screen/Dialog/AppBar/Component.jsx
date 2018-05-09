import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from '@material-ui/icons/ArrowBack';
import NavigationCheck from '@material-ui/icons/Check';
import { noop } from 'lodash';

import AppBar from '../../../../../components/AppBar';
import Title from '../../../../../components/Title';

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
    const { classes, onCancel, onSubmit, title } = this.props;

    return (
      <AppBar>
        <IconButton
          className={classes.leftButton}
          color="inherit"
          onClick={onCancel}
        >
          <NavigationArrowBack />
        </IconButton>

        <Title className={classes.title}>{title}</Title>

        <IconButton color="inherit" onClick={onSubmit}>
          <NavigationCheck />
        </IconButton>
      </AppBar>
    );
  }
}

PlayerFormScreenAppBarComponent.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.node,
};

PlayerFormScreenAppBarComponent.defaultProps = {
  onCancel: noop,
  onSubmit: noop,
  title: null,
};

export default withStyles(styles)(PlayerFormScreenAppBarComponent);
