import { connect } from 'react-redux';
import { goBack, push } from 'connected-react-router/lib/actions';
import { setCombatPlayerBonus } from 'munchkin-core/lib/ducks/combat';
import { removePlayer, updatePlayer } from 'munchkin-core/lib/ducks/players';

import { removePlayerFromList } from '../../../../../ducks/playerList';

import * as modes from '../../../modes';
import { modeSelector } from '../../../selectors';

import Component from './Component';

const mapStateToProps = (state) => ({
  empty: state.playerList.length === 0,
  mode: modeSelector(state),
  selectedPlayerIds: state.app.selectedPlayerIds,
  singleMode: state.app.singleMode,
});

const mapDispatchToProps = {
  onMultiSelectDeactivate: goBack,
  onPlayersDelete: (selectedPlayerIds) => (dispatch) => {
    selectedPlayerIds.forEach((id) => {
      dispatch(removePlayerFromList(id));
      dispatch(removePlayer(id));
    });
    dispatch(goBack());
  },
  onResetPlayer: () => (dispatch, getState) => {
    const { combat: { playerId: id } } = getState();

    dispatch(
      updatePlayer({
        gear: 0,
        id,
        level: 1,
      }),
    );
    dispatch(setCombatPlayerBonus(0));
  },
  onToggleEditClick: (mode) =>
    mode === modes.EDIT ? goBack() : push(`/${modes.EDIT}`),
  onTurnFinish: () => setCombatPlayerBonus(0),
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
