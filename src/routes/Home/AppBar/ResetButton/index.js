import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import {
  setCombatHelperBonus,
  setCombatPlayerBonus,
  updatePlayer,
} from 'munchkin-core';
import { setUndo, UNDO_RESET_PLAYERS } from '../../../../ducks/undo';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  singleMode: get(['app', 'singleMode']),
});

const mapDispatchToProps = {
  onPlayerReset: () => (dispatch, getState) => {
    const {
      combat: { playerId: id },
    } = getState();

    dispatch(
      updatePlayer({
        gear: 0,
        id,
        level: 1,
      }),
    );
    dispatch(setCombatPlayerBonus(0));
  },
  onPlayersReset: () => (dispatch, getState) => {
    const { playerList, players } = getState();

    const undo = [];

    playerList.forEach((id) => {
      const player = players[id];

      if (player.level !== 1 || player.gear !== 0) {
        undo.push(player);

        dispatch(
          updatePlayer({
            gear: 0,
            id,
            level: 1,
          }),
        );
      }
    });

    dispatch(setCombatPlayerBonus(0));
    dispatch(setCombatHelperBonus(0));

    if (undo.length) {
      dispatch(
        setUndo({
          type: UNDO_RESET_PLAYERS,
          players: undo,
        }),
      );
    }
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
