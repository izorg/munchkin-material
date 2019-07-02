import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';

import {
  setCombatHelperBonus,
  setCombatPlayerBonus,
} from '../../../ducks/combat';
import { removePlayerFromList } from '../../../ducks/playerList';
import { removePlayer, updatePlayer } from '../../../ducks/players';
import { setUndo, UNDO_RESET_PLAYERS } from '../../../ducks/undo';

import * as modes from '../modes';

import Component from './Component';

const mapStateToProps = (state) => ({
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
  onToggleEditClick: (mode) =>
    mode === modes.EDIT ? goBack() : push(`/${modes.EDIT}`),
  onTurnFinish: () => setCombatPlayerBonus(0),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
