import createMonster from '../../utils/createMonster';
import { ADD_MONSTER, REMOVE_MONSTER } from '../monsters/actionTypes';
import { REMOVE_PLAYERS, RESET_PLAYERS } from '../players/actionTypes';

import {
  FINISH_COMBAT,
  SET_COMBAT_HELPER,
  SET_COMBAT_HELPER_BONUS,
  SET_COMBAT_PLAYER_BONUS,
  START_COMBAT,
} from './actionTypes';

export const finishCombat = () => ({
  type: FINISH_COMBAT,
});

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
  monster: createMonster(),
  playerId,
});

export const initialState = {
  finished: false,
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

    case FINISH_COMBAT:
      return {
        ...state,
        finished: true,
      };

    case REMOVE_MONSTER: {
      const { monsters, ...rest } = state;
      const index = monsters.indexOf(action.id);

      return {
        ...rest,
        monsters: [...monsters.slice(0, index), ...monsters.slice(index + 1)],
      };
    }

    case REMOVE_PLAYERS:
      if (action.playerList.includes(state.helperId)) {
        return {
          ...state,
          helperBonus: 0,
          helperId: null,
        };
      }

      return state;

    case RESET_PLAYERS: {
      let reset = state;

      if (action.playerList.includes(state.playerId)) {
        reset = {
          ...reset,
          playerBonus: 0,
        };
      }

      if (action.playerList.includes(state.helperId)) {
        reset = {
          ...reset,
          helperBonus: 0,
        };
      }

      return reset;
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
        finished: false,
        monsters: [action.monster.id],
        playerId: action.playerId,
      };

    default:
      return state;
  }
};

export default reducer;
