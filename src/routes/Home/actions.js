import { goBack, push } from 'connected-react-router/lib/actions';

import { setActivePlayer, togglePlayer, unselectAllPlayers } from '../../actions';
import modes from './modes';

export const activateMultiSelect = playerId => (dispatch) => {
  dispatch(unselectAllPlayers());
  dispatch(togglePlayer(playerId));
  dispatch(push(`/${modes.MULTI}`));
};

export const editPlayer = playerId => (dispatch) => {
  dispatch(setActivePlayer(playerId));
  dispatch(push(`/${modes.EDIT}/${playerId}`));
};

export const selectPlayer = (playerId, mode) => (dispatch, getState) => {
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
