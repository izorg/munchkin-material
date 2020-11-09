import { REMOVE_PLAYERS } from '../players/actionTypes';

import {
  ADD_PLAYER_TO_LIST,
  MOVE_PLAYER,
  SHUFFLE_PLAYERS,
} from './actionTypes';

// https://github.com/lodash/lodash/blob/master/shuffle.js
const shuffle = (array) => {
  const { length } = array;

  let index = 0;
  const lastIndex = length - 1;
  const result = [...array];

  while (index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[rand];

    result[rand] = result[index];
    result[index] = value;

    index += 1;
  }

  return result;
};

export const addPlayerToList = (id) => ({
  type: ADD_PLAYER_TO_LIST,
  id,
});

export const movePlayer = (oldPosition, newPosition) => ({
  type: MOVE_PLAYER,
  oldPosition,
  newPosition,
});

export const shufflePlayers = () => ({
  type: SHUFFLE_PLAYERS,
});

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER_TO_LIST: {
      return [...state, action.id];
    }

    case MOVE_PLAYER: {
      const { oldPosition, newPosition } = action;
      const movedPlayer = state[oldPosition];
      const playersWithoutMoved = [
        ...state.slice(0, oldPosition),
        ...state.slice(oldPosition + 1),
      ];

      return [
        ...playersWithoutMoved.slice(0, newPosition),
        movedPlayer,
        ...playersWithoutMoved.slice(newPosition),
      ];
    }

    case REMOVE_PLAYERS:
      return state.filter((id) => !action.playerList.includes(id));

    case SHUFFLE_PLAYERS: {
      return shuffle(state);
    }

    /* istanbul ignore next  */
    default:
      return state;
  }
};

export default reducer;
