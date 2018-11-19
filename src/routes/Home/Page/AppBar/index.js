import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import {
  removePlayer,
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
    const { playerList } = getState();

    playerList.map((id) =>
      dispatch(
        updatePlayer({
          gear: 0,
          id,
          level: 1,
        }),
      ),
    );
  },
  onToggleEditClick: (mode) =>
    mode === modes.EDIT ? goBack() : push(`/${modes.EDIT}`),
  onTurnFinish: () => setCombatPlayerBonus(0),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
