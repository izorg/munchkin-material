import { ADD_MONSTER, REMOVE_MONSTER } from '../monsters/actionTypes';

import {
  SET_COMBAT_HELPER,
  SET_COMBAT_HELPER_BONUS,
  SET_COMBAT_PLAYER_BONUS,
  START_COMBAT,
} from './actionTypes';

export const setCombatHelper = (id) => ({
  type: SET_COMBAT_HELPER,
  id,
});

export const setCombatHelperBonus = (bonus) => ({
  type: SET_COMBAT_HELPER_BONUS,
  bonus,
});

export const setCombatPlayerBonus = (bonus) => ({
  type: SET_COMBAT_PLAYER_BONUS,
  bonus,
});

export const startCombat = (playerId) => ({
  type: START_COMBAT,
  playerId,
});

export const initialState = {
  helperBonus: 0,
  helperId: null,
  monsters: [],
  playerBonus: 0,
  playerId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MONSTER:
      return {
        ...state,
        monsters: [...state.monsters, action.monster.id],
      };

    case REMOVE_MONSTER: {
      const { monsters, ...rest } = state;
      const index = monsters.indexOf(action.id);

      return {
        ...rest,
        monsters: [...monsters.slice(0, index), ...monsters.slice(index + 1)],
      };
    }

    case SET_COMBAT_PLAYER_BONUS:
      return {
        ...state,
        playerBonus: action.bonus,
      };

    case SET_COMBAT_HELPER:
      return {
        ...state,
        helperId: action.id,
      };

    case SET_COMBAT_HELPER_BONUS:
      return {
        ...state,
        helperBonus: action.bonus,
      };

    case START_COMBAT:
      return {
        ...initialState,
        playerId: action.playerId,
      };

    default:
      return state;
  }
};

export default reducer;
