import connect from 'react-redux/es/connect/connect';

import { activateMultiSelect, editPlayer, selectPlayer } from '../../actions';
import modes from '../../modes';
import { getModeFromLocation } from '../../path';

import Component from './Component';

const mapStateToProps = (state, ownProps) => {
  const { playerId } = ownProps;
  const mode = getModeFromLocation(state.router.location.pathname);

  return {
    color: state.playerColors[playerId],
    mode,
    player: state.players[playerId],
    selected: mode === modes.MULTI && state.app.selectedPlayerIds.includes(playerId),
  };
};

const mapDispatchToProps = dispatch => ({
  onCheck: (playerId, mode) => dispatch(selectPlayer(playerId, mode)),
  onClick: (playerId, mode) => {
    if (mode === modes.EDIT) {
      dispatch(editPlayer(playerId));
    } else {
      dispatch(selectPlayer(playerId, mode));
    }
  },
  onPress: (playerId, mode) => {
    if (mode !== modes.EDIT) {
      dispatch(activateMultiSelect(playerId));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
