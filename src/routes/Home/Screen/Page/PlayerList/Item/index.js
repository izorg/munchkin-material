import connect from 'react-redux/es/connect/connect';
import { goBack, push } from 'connected-react-router/lib/actions';

import {
  setActivePlayer,
  togglePlayer,
  togglePlayerGender,
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

const onPress = playerId => (dispatch, getState) => {
  const mode = getModeFromPathname(getState().router.location.pathname);

  if (mode !== EDIT) {
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }

    dispatch(unselectAllPlayers());
    dispatch(togglePlayer(playerId));
    dispatch(push(`/${MULTI}`));
  }
};

const onTap = playerId => (dispatch, getState) => {
  const mode = getModeFromPathname(getState().router.location.pathname);

  if (mode === EDIT) {
    dispatch(setActivePlayer(playerId));
    dispatch(push(`/${EDIT}/${playerId}`));
  } else if (mode === MULTI) {
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

const onAvatarTap = playerId => (dispatch, getState) => {
  const mode = getModeFromPathname(getState().router.location.pathname);

  if (!mode) {
    dispatch(unselectAllPlayers());
    dispatch(togglePlayer(playerId));
    dispatch(push(`/${MULTI}`));
  } else {
    dispatch(onTap(playerId));
  }
};

const mapDispatchToProps = {
  onAvatarTap,
  onGenderToggle: togglePlayerGender,
  onPress,
  onTap,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
