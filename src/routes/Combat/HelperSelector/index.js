import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { setCombatHelper } from 'munchkin-core';
import { flow, get, isEqual } from 'lodash/fp';

import Component from './Component';
import { getQuery } from '../../../utils/location';

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
