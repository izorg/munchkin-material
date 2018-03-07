import { goBack, push } from 'connected-react-router/lib/actions';
import { noop } from 'lodash';
import {
  addMonster,
  addPlayer,
  setCombatHelper,
  setCombatHelperBonus,
  startCombat,
  setPlayerSex,
  updatePlayer,
} from 'munchkin-core/lib/actions';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/sex';
import createMonster from 'munchkin-core/lib/utils/createMonster';
import createPlayer from 'munchkin-core/lib/utils/createPlayer';

import * as types from '../utils/actionTypes';

export const addPlayerToList = (id) => ({
  type: types.ADD_PLAYER_TO_LIST,
  id,
});

export const finishCombat = () => ({
  type: types.FINISH_COMBAT,
});

export const goToCombat = (playerId) => (dispatch, getState) => {
  const {
    app: { combatFinished },
    combat: { playerId: combatPlayerId },
  } = getState();

  if (combatFinished || playerId !== combatPlayerId) {
    dispatch(startCombat(playerId))
      .then(() => {
        dispatch(addMonster(createMonster()));
        dispatch(push(`/player/${playerId}/combat`));
      })
      .catch(noop);
  } else {
    dispatch(push(`/player/${playerId}/combat`));
  }
};

export const movePlayer = (oldPosition, newPosition) => ({
  type: types.MOVE_PLAYER,
  oldPosition,
  newPosition,
});

export const removeHelper = () => (dispatch) => {
  dispatch(setCombatHelper(null));
  dispatch(setCombatHelperBonus(0));
};

export const removePlayerFromList = (id) => ({
  type: types.REMOVE_PLAYER_FROM_LIST,
  id,
});

export const setFullVersion = (fullVersion = true) => ({
  type: types.SET_FULL_VERSION,
  fullVersion,
});

export const setKeepAwake = (keepAwake) => ({
  type: types.SET_KEEP_AWAKE,
  keepAwake,
});

export const setLocale = (locale) => ({
  type: types.SET_LOCALE,
  locale,
});

const setSingleModePlayer = (id) => ({
  type: types.SET_SINGLE_MODE_PLAYER,
  id,
});

export const setSingleMode = () => (dispatch, getState) => {
  const { app: { singleModePlayerId } } = getState();

  if (!singleModePlayerId) {
    const player = createPlayer();

    dispatch(addPlayer(player));
    dispatch(setSingleModePlayer(player.id));

    return dispatch(startCombat(player.id));
  }

  return dispatch(startCombat(singleModePlayerId));
};

export const setTheme = (theme) => ({
  type: types.SET_THEME,
  theme,
});

export const submitPlayer = (values) => (dispatch) => {
  const { id, name = '' } = values;

  if (name.trim()) {
    const player = createPlayer(values);

    if (id) {
      dispatch(updatePlayer(player));
    } else {
      dispatch(addPlayer(player));
      dispatch(addPlayerToList(player.id));
    }
  }

  dispatch(goBack());
};

export const throwDice = () => ({
  type: types.THROW_DICE,
  dice: Math.floor(Math.random() * 6) + 1,
});

export const togglePlayer = (id) => ({
  type: types.TOGGLE_PLAYER,
  id,
});

export const togglePlayerSex = (id) => (dispatch, getState) => {
  const player = getState().players[id];
  const { sex } = player;

  if (sex === MALE) {
    dispatch(setPlayerSex(id, FEMALE));
  } else if (sex === FEMALE) {
    dispatch(setPlayerSex(id, MALE));
  }
};

export const unselectAllPlayers = () => ({
  type: types.UNSELECT_ALL_PLAYERS,
});
