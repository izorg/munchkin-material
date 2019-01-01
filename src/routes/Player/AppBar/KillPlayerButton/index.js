import { connect } from 'react-redux';
import { get } from 'lodash/fp';
import { killPlayer } from 'munchkin-core';

import { setUndo, UNDO_KILL_PLAYER } from '../../../../ducks/undo';

import Component from './Component';

const mapDispatchToProps = {
  onClick: (playerId) => (dispatch, getState) => {
    const player = get(['players', playerId], getState());

    dispatch(killPlayer(playerId));
    dispatch(
      setUndo({
        type: UNDO_KILL_PLAYER,
        player,
      }),
    );
  },
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Component);
