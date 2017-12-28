import connect from 'react-redux/es/connect/connect';
import { goBack, push } from 'connected-react-router/lib/actions';

import { setActivePlayer, togglePlayer, unselectAllPlayers } from '../../../../../../actions';
import * as modes from '../../../../modes';
import { getModeFromPathname } from '../../../../path';

import Component from './Component';

const mapStateToProps = (state, ownProps) => {
  const { playerId } = ownProps;
  const mode = getModeFromPathname(state.router.location.pathname);

  return {
    color: state.playerColors[playerId],
    mode,
    player: state.players[playerId],
    selected: mode === modes.MULTI && state.app.selectedPlayerIds.includes(playerId),
  };
};

const selectPlayer = (playerId, mode) => (dispatch, getState) => {
  if (mode === modes.MULTI) {
    const { app: { selectedPlayerIds } } = getState();

    if (selectedPlayerIds.length === 1 && selectedPlayerIds[0] === playerId) {
      dispatch(goBack());
    } else {
      dispatch(togglePlayer(playerId));
    }
  } else {
    dispatch(setActivePlayer(playerId));
    dispatch(push(`/player/${playerId}`));
  }
};

const mapDispatchToProps = {
  onCheck: selectPlayer,
  onClick: (playerId, mode) => (dispatch) => {
    if (mode === modes.EDIT) {
      dispatch(setActivePlayer(playerId));
      dispatch(push(`/${modes.EDIT}/${playerId}`));
    } else {
      dispatch(selectPlayer(playerId, mode));
    }
  },
  onPress: (playerId, mode) => (dispatch) => {
    if (mode !== modes.EDIT) {
      dispatch(unselectAllPlayers());
      dispatch(togglePlayer(playerId));
      dispatch(push(`/${modes.MULTI}`));
    }
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
