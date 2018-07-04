import { connect } from 'react-redux';
import { push } from 'connected-react-router/lib/actions';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import PropTypes from 'prop-types';
import { addMonster, createMonster, startCombat } from 'munchkin-core';

import Component from './Component';

const goToCombat = (playerId) => async (dispatch, getState) => {
  const {
    app: { combatFinished },
    combat: { playerId: combatPlayerId },
  } = getState();

  if (combatFinished || playerId !== combatPlayerId) {
    try {
      await dispatch(startCombat(playerId));
      dispatch(addMonster(createMonster()));
      dispatch(push(`/player/${playerId}/combat`));
    } catch (error) {}
  } else {
    dispatch(push(`/player/${playerId}/combat`));
  }
};

const mapDispatchToProps = {
  goToCombat,
};

const contextTypes = {
  playerId: PropTypes.string,
};

export default compose(
  getContext(contextTypes),
  connect(
    undefined,
    mapDispatchToProps,
  ),
)(Component);
