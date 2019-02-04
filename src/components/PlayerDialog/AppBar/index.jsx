import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { noop } from 'lodash/fp';

import AppBar from '../../TopAppBar';
import BackButton from '../../BackButton';
import Title from '../../Title';
import TopIconButton from '../../TopIconButton';

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

    <TopIconButton color="inherit" type="submit">
      <Check />
    </TopIconButton>
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
