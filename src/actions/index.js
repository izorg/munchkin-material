import { change } from 'redux-form/es';
import { goBack, push } from 'react-router-redux/es';
import { addPlayer, setCombatHelper, setCombatHelperBonus, startCombat, updatePlayer } from 'munchkin-core/es/actions';
import Player from 'munchkin-core/es/classes/Player';

import { PLAYER_FORM } from '../constants';
import * as types from '../constants/actionTypes';

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
    }

    dispatch(push(`/player/${playerId}/combat`));
  }
};

export const importContact = () => (dispatch) => {
  navigator.contacts.pickContact(({ displayName, photos }) => {
    const form = PLAYER_FORM;

    dispatch(change(form, 'name', displayName));

    if (photos) {
      dispatch(change(form, 'avatar', photos[0].value));
    }
  });
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
    const player = new Player(values);

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

export const unselectAllPlayers = () => ({
  type: types.UNSELECT_ALL_PLAYERS,
});
