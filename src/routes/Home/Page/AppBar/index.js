import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import {
  removePlayer,
  setCombatHelperBonus,
  setCombatPlayerBonus,
  updatePlayer,
} from 'munchkin-core';

import { removePlayerFromList } from '../../../../ducks/playerList';

import * as modes from '../../modes';

import Component from './Component';

const mapStateToProps = (state) => ({
  empty: state.playerList.length === 0,
  selectedPlayerIds: state.app.selectedPlayerIds,
});

const mapDispatchToProps = {
  onMultiSelectDeactivate: goBack,
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
  onPlayersDelete: (selectedPlayerIds) => (dispatch) => {
    selectedPlayerIds.forEach((id) => {
      dispatch(removePlayerFromList(id));
      dispatch(removePlayer(id));
    });
    dispatch(goBack());
  },
  onPlayersReset: () => (dispatch, getState) => {
    const { playerList, players } = getState();

    // const undo = [];

    playerList.forEach((id) => {
      const player = players[id];

      if (player.level !== 1 || player.gear !== 0) {
        // undo.push(player);

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

    // if (undo.length) {
    //   console.log('undo', undo);
    // }
  },
  onToggleEditClick: (mode) =>
    mode === modes.EDIT ? goBack() : push(`/${modes.EDIT}`),
  onTurnFinish: () => setCombatPlayerBonus(0),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
