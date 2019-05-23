import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCombatHelper } from 'munchkin-core';
import { flow, get, isEqual } from 'lodash/fp';

import { getQuery } from '../../../utils/location';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  helpers: (state) =>
    state.playerList
      .filter((id) => id !== state.combat.playerId)
      .map((id) => state.players[id]),
  open: flow(
    getQuery,
    get('add'),
    isEqual('helper'),
  ),
});

const mapDispatchToProps = {
  onClose: goBack,
  onSelect: (id) => (dispatch) => {
    dispatch(setCombatHelper(id));
    dispatch(goBack());
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
