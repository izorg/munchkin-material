import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import actions from '../../actions';
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
      dispatch(actions.removePlayer(id));
    });
    dispatch(actions.setMultiMode(false));
  },
  onMultiSelectActivate: (id) => {
    dispatch(actions.setMultiMode(true));
    dispatch(actions.togglePlayer(id));
  },
  onMultiSelectDeactivate: () => {
    dispatch(actions.setMultiMode(false));
  },
  onPlayerEdit: (player) => {
    dispatch(actions.setActivePlayer(player.id));
    dispatch(push(`/player/${player.id}/edit`));
  },
  onPlayerMove: (oldIndex, newIndex) => dispatch(actions.movePlayer(oldIndex, newIndex)),
  onPlayerSelect: (player, multiMode, selectedPlayerIds) => {
    if (multiMode) {
      if (selectedPlayerIds.length === 1 && selectedPlayerIds[0] === player.id) {
        dispatch(actions.togglePlayer(player.id));
        dispatch(actions.setMultiMode(false));
      } else {
        dispatch(actions.togglePlayer(player.id));
      }
    } else {
      dispatch(actions.toggleEditMode(false));
      dispatch(actions.setActivePlayer(player.id));
      dispatch(push(`/player/${player.id}`));
    }
  },
  onToggleEditClick: () => dispatch(actions.toggleEditMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);
