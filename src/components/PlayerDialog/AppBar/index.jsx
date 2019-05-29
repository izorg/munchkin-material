import React from 'react';
import PropTypes from 'prop-types';
import { Check } from 'mdi-material-ui';
import { noop } from 'lodash/fp';

import AppBar from '../../TopAppBar';
import BackButton from '../../BackButton';
import Title from '../../Title';
import TopIconButton from '../../TopIconButton';

const PlayerFormScreenAppBarComponent = ({ onCancel, title }) => (
  <AppBar>
    <BackButton onClick={onCancel} />

    <Title>{title}</Title>

    <TopIconButton color="inherit" edge="end" type="submit">
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

export default PlayerFormScreenAppBarComponent;
