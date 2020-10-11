import { Check } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React from 'react';

import BackButton from '../../BackButton';
import Title from '../../Title';
import TopAppBar from '../../TopAppBar';
import TopIconButton from '../../TopIconButton';

const displayName = 'PlayerDialogAppBar';

const PlayerDialogAppBar = ({ onCancel, title }) => (
  <TopAppBar>
    <BackButton onClick={onCancel} />

    <Title>{title}</Title>

    <TopIconButton color="inherit" edge="end" type="submit">
      <Check />
    </TopIconButton>
  </TopAppBar>
);

PlayerDialogAppBar.propTypes = {
  onCancel: PropTypes.func,
  title: PropTypes.node,
};

PlayerDialogAppBar.displayName = displayName;

export default PlayerDialogAppBar;
