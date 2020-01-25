import { Check } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React from 'react';

import noop from '../../../utils/noop';
import BackButton from '../../BackButton';
import Title from '../../Title';
import AppBar from '../../TopAppBar';
import TopIconButton from '../../TopIconButton';

const displayName = 'PlayerDialogAppBar';

const PlayerDialogAppBar = ({ onCancel, title }) => (
  <AppBar>
    <BackButton onClick={onCancel} />

    <Title>{title}</Title>

    <TopIconButton color="inherit" edge="end" type="submit">
      <Check />
    </TopIconButton>
  </AppBar>
);

PlayerDialogAppBar.propTypes = {
  onCancel: PropTypes.func,
  title: PropTypes.node,
};

PlayerDialogAppBar.defaultProps = {
  onCancel: noop,
  title: null,
};

PlayerDialogAppBar.displayName = displayName;

export default PlayerDialogAppBar;
