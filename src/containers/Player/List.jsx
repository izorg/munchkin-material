import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { movePlayer, removePlayer } from 'munchkin/lib/actions';

import { setActivePlayer, setMultiMode, toggleEditMode, togglePlayer } from '../../actions';
import PlayerList from '../../components/Player/List';

const mapStateToProps = state => ({
  editMode: state.app.editMode,
  multiMode: state.app.multiMode,
  players: state.players,
  selectedPlayerIds: state.app.selectedPlayerIds,
});

const mapDispatchToProps = dispatch => ({
  onDeletePlayers: (playerIds) => {
    playerIds.forEach((id) => {
      dispatch(removePlayer(id));
    });
    dispatch(setMultiMode(false));
  },
  onMultiSelectActivate: (id) => {
    dispatch(setMultiMode(true));
    dispatch(togglePlayer(id));
  },
  onMultiSelectDeactivate: () => {
    dispatch(setMultiMode(false));
  },
  onPlayerEdit: (player) => {
    dispatch(setActivePlayer(player.id));
    dispatch(push(`/player/${player.id}/edit`));
  },
  onPlayerMove: (oldIndex, newIndex) => dispatch(movePlayer(oldIndex, newIndex)),
  onPlayerSelect: (player, multiMode, selectedPlayerIds) => {
    if (multiMode) {
      if (selectedPlayerIds.length === 1 && selectedPlayerIds[0] === player.id) {
        dispatch(togglePlayer(player.id));
        dispatch(setMultiMode(false));
      } else {
        dispatch(togglePlayer(player.id));
      }
    } else {
      dispatch(toggleEditMode(false));
      dispatch(setActivePlayer(player.id));
      dispatch(push(`/player/${player.id}`));
    }
  },
  onToggleEditClick: () => dispatch(toggleEditMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);
