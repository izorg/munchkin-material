import { START_COMBAT } from "../combat/actionTypes";

import {
  ADD_MONSTER,
  DECREMENT_MONSTER_BONUS,
  DECREMENT_MONSTER_LEVEL,
  INCREMENT_MONSTER_BONUS,
  INCREMENT_MONSTER_LEVEL,
  REMOVE_MONSTER,
  UPDATE_MONSTER,
} from "./actionTypes";

export const addMonster = (monster) => ({
  monster,
  type: ADD_MONSTER,
});

export const decrementMonsterBonus = (id) => ({
  id,
  type: DECREMENT_MONSTER_BONUS,
});

export const decrementMonsterLevel = (id) => ({
  id,
  type: DECREMENT_MONSTER_LEVEL,
});

export const incrementMonsterBonus = (id) => ({
  id,
  type: INCREMENT_MONSTER_BONUS,
});

export const incrementMonsterLevel = (id) => ({
  id,
  type: INCREMENT_MONSTER_LEVEL,
});

export const removeMonster = (id) => ({
  id,
  type: REMOVE_MONSTER,
});

export const monsterReducer = (state, action) => {
  switch (action.type) {
    case DECREMENT_MONSTER_BONUS:
      return {
        ...state,
        bonus: state.bonus - 1,
      };

    case DECREMENT_MONSTER_LEVEL:
      return {
        ...state,
        level: state.level - 1,
      };

    case INCREMENT_MONSTER_BONUS:
      return {
        ...state,
        bonus: state.bonus + 1,
      };

    case INCREMENT_MONSTER_LEVEL:
      return {
        ...state,
        level: state.level + 1,
      };

    case UPDATE_MONSTER:
      return {
        ...state,
        ...action.monster,
      };

    default:
      return state;
  }
};

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MONSTER: {
      return {
        ...state,
        [action.monster.id]: action.monster,
      };
    }

    case DECREMENT_MONSTER_BONUS:
    case DECREMENT_MONSTER_LEVEL:
    case INCREMENT_MONSTER_BONUS:
    case INCREMENT_MONSTER_LEVEL: {
      const monster = monsterReducer(state[action.id], action);

      return {
        ...state,
        [monster.id]: monster,
      };
    }

    case REMOVE_MONSTER: {
      const { [action.id]: removed, ...rest } = state;

      return rest;
    }

    case START_COMBAT:
      return {
        [action.monster.id]: action.monster,
      };

    case UPDATE_MONSTER: {
      const { id } = action.monster;
      const monster = monsterReducer(state[id], action);

      return {
        ...state,
        [id]: monster,
      };
    }

    default:
      return state;
  }
};

export default reducer;
