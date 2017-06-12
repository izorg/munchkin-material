import { actions } from 'munchkin';

import * as types from '../constants/actionTypes';

export const hideBanner = () => ({
  type: types.HIDE_BANNER,
  bannerVisible: false,
});

const resetDice = () => ({
  type: types.RESET_DICE,
});

const setActivePlayer = id => ({
  type: types.SET_ACTIVE_PLAYER,
  id,
});

const setMultiMode = multiMode => ({
  type: types.SET_MULTI_MODE,
  multiMode,
});

export const showBanner = () => ({
  type: types.SHOW_BANNER,
  bannerVisible: true,
});

const throwDice = () => ({
  type: types.THROW_DICE,
  dice: Math.floor(Math.random() * 6) + 1,
});

const toggleEditMode = force => ({
  type: types.TOGGLE_EDIT_MODE,
  editMode: force,
});

const togglePlayer = id => ({
  type: types.TOGGLE_PLAYER,
  id,
});

export default {
  ...actions,
  hideBanner,
  resetDice,
  setActivePlayer,
  setMultiMode,
  showBanner,
  throwDice,
  toggleEditMode,
  togglePlayer,
};
