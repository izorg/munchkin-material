import { connect } from 'react-redux';
import { push } from 'connected-react-router/lib/actions';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { startCombat } from 'munchkin-core/lib/ducks/combat';
import { addMonster } from 'munchkin-core/lib/ducks/monsters';
import createMonster from 'munchkin-core/lib/utils/createMonster';

import Component from './Component';

const goToCombat = (playerId) => (dispatch, getState) => {
  const {
    app: { combatFinished },
    combat: { playerId: combatPlayerId },
  } = getState();

  if (combatFinished || playerId !== combatPlayerId) {
    dispatch(startCombat(playerId))
      .then(() => {
        dispatch(addMonster(createMonster()));
        dispatch(push(`/player/${playerId}/combat`));
      })
      .catch(noop);
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
