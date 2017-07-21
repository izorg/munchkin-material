import { change } from 'redux-form';
import { actions } from 'munchkin';

import { PLAYER_FORM } from '../constants';
import * as types from '../constants/actionTypes';

export const hideBanner = () => ({
  type: types.HIDE_BANNER,
});

export const importContact = () => (dispatch) => {
  navigator.contacts.pickContact(({ displayName, photos }) => {
    const form = PLAYER_FORM;

    dispatch(change(form, 'name', displayName));

    if (photos) {
      dispatch(change(form, 'avatar', photos[0].value));
    }
  });
};

export const resetDice = () => ({
  type: types.RESET_DICE,
});

export const setActivePlayer = id => ({
  type: types.SET_ACTIVE_PLAYER,
  id,
});

export const setLocale = locale => ({
  type: types.SET_LOCALE,
  locale,
});

export const setMultiMode = multiMode => ({
  type: types.SET_MULTI_MODE,
  multiMode,
});

export const showBanner = () => ({
  type: types.SHOW_BANNER,
});

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

export default {
  ...actions,
  hideBanner,
  resetDice,
  setActivePlayer,
  setLocale,
  setMultiMode,
  showBanner,
  throwDice,
  toggleEditMode,
  togglePlayer,
};
