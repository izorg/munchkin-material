import { goBack, push } from 'connected-react-router/lib/actions';
import { noop } from 'lodash';
import {
  addMonster,
  addPlayer,
  setCombatHelper,
  setCombatHelperBonus,
  startCombat,
  setPlayerGender,
  updatePlayer,
} from 'munchkin-core/lib/actions';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/gender';
import createMonster from 'munchkin-core/lib/utils/createMonster';
import createPlayer from 'munchkin-core/lib/utils/createPlayer';

import * as types from '../utils/actionTypes';

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

export const setFullVersion = (fullVersion = true) => ({
  type: types.SET_FULL_VERSION,
  fullVersion,
});

export const setLocale = (locale) => ({
  type: types.SET_LOCALE,
  locale,
});

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

export const togglePlayerGender = (id) => (dispatch, getState) => {
  const player = getState().players[id];
  const { gender } = player;

  if (gender === MALE) {
    dispatch(setPlayerGender(id, FEMALE));
  } else if (gender === FEMALE) {
    dispatch(setPlayerGender(id, MALE));
  }
};

export const unselectAllPlayers = () => ({
  type: types.UNSELECT_ALL_PLAYERS,
});
