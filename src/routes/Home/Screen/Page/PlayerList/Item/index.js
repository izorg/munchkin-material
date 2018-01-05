import connect from 'react-redux/es/connect/connect';
import { goBack, push } from 'connected-react-router/lib/actions';

import {
  setActivePlayer,
  togglePlayer,
  unselectAllPlayers,
} from '../../../../../../actions';
import { EDIT, MULTI } from '../../../../modes';
import { getModeFromPathname } from '../../../../path';

import Component from './Component';

const mapStateToProps = (state, ownProps) => {
  const { playerId } = ownProps;
  const mode = getModeFromPathname(state.router.location.pathname);

  return {
    color: state.playerColors[playerId],
    mode,
    player: state.players[playerId],
    selected: mode === MULTI && state.app.selectedPlayerIds.includes(playerId),
  };
};

const onMultiSelectActivate = playerId => (dispatch) => {
  dispatch(unselectAllPlayers());
  dispatch(togglePlayer(playerId));
  dispatch(push(`/${MULTI}`));
};

const onPlayerEdit = playerId => (dispatch) => {
  dispatch(setActivePlayer(playerId));
  dispatch(push(`/${EDIT}/${playerId}`));
};

const onPlayerSelect = playerId => (dispatch) => {
  dispatch(setActivePlayer(playerId));
  dispatch(push(`/player/${playerId}`));
};

const onPlayerToggle = playerId => (dispatch, getState) => {
  dispatch(togglePlayer(playerId));

  const { app: { selectedPlayerIds } } = getState();

  if (!selectedPlayerIds.length) {
    dispatch(goBack());
  }
};

const mapDispatchToProps = {
  onMultiSelectActivate,
  onPlayerEdit,
  onPlayerSelect,
  onPlayerToggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
