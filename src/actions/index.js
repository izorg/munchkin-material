import { goBack, push } from 'connected-react-router/lib/actions';
import {
  addMonster,
  addPlayer,
  setCombatHelper,
  setCombatHelperBonus,
  startCombat,
  setPlayerGender,
  updatePlayer,
} from 'munchkin-core/es/actions';
import { FEMALE, MALE } from 'munchkin-core/es/utils/gender';
import createMonster from 'munchkin-core/es/utils/createMonster';
import createPlayer from 'munchkin-core/es/utils/createPlayer';

import * as types from '../utils/actionTypes';

export const disableDiceButtonTooltipTriggerFocus = () => ({
  type: types.DISABLE_DICE_BUTTON_TOOLTIP_TRIGGER_FOCUS,
});

export const enableDiceButtonTooltipTriggerFocus = () => ({
  type: types.ENABLE_DICE_BUTTON_TOOLTIP_TRIGGER_FOCUS,
});

export const goToCombat = playerId => (dispatch, getState) => {
  const { app: { fullVersion } } = getState();

  if (fullVersion) {
    if (playerId !== getState().combat.playerId) {
      dispatch(startCombat(playerId));
      dispatch(addMonster(createMonster()));
    }

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

export const setActivePlayer = id => ({
  type: types.SET_ACTIVE_PLAYER,
  id,
});

export const setFullVersion = (fullVersion = true) => ({
  type: types.SET_FULL_VERSION,
  fullVersion,
});

export const setLocale = locale => ({
  type: types.SET_LOCALE,
  locale,
});

export const setPlayerColor = ({ color, id }) => ({
  type: types.SET_PLAYER_COLOR,
  color,
  id,
});

export const submitPlayer = values => (dispatch) => {
  const { color, id, name = '' } = values;

  if (name.trim()) {
    const player = createPlayer(values);

    if (id) {
      dispatch(updatePlayer(player));
    } else {
      dispatch(addPlayer(player));
    }

    dispatch(setPlayerColor({
      id: player.id,
      color,
    }));

    dispatch(setActivePlayer(player.id));
  }

  dispatch(goBack());
};

export const throwDice = () => ({
  type: types.THROW_DICE,
  dice: Math.floor(Math.random() * 6) + 1,
});

export const toggleEditMode = force => ({
  type: types.TOGGLE_EDIT_MODE,
  editMode: force,
});

export const togglePlayer = id => ({
  type: types.TOGGLE_PLAYER,
  id,
});

export const togglePlayerGender = id => (dispatch, getState) => {
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
