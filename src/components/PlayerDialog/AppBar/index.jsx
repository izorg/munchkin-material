import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, withStyles } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { noop } from 'lodash/fp';

import AppBar from '../../AppBar';
import BackButton from '../../BackButton';
import Title from '../../Title';

const styles = {
  leftButton: {
    marginRight: 8,
  },

  title: {
    marginLeft: 12,
  },
};

const PlayerFormScreenAppBarComponent = ({ classes, onCancel, title }) => (
  <AppBar>
    <BackButton className={classes.leftButton} onClick={onCancel} />

    <Title className={classes.title}>{title}</Title>

    <IconButton color="inherit" type="submit">
      <Check />
    </IconButton>
  </AppBar>
);

PlayerFormScreenAppBarComponent.propTypes = {
  onCancel: PropTypes.func,
  title: PropTypes.node,
};

PlayerFormScreenAppBarComponent.defaultProps = {
  onCancel: noop,
  title: null,
};

export default withStyles(styles)(PlayerFormScreenAppBarComponent);
