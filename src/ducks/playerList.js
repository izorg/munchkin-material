export const ADD_PLAYER_TO_LIST = 'app/ADD_PLAYER_TO_LIST';
export const MOVE_PLAYER = 'app/MOVE_PLAYER';
export const REMOVE_PLAYER_FROM_LIST = 'app/REMOVE_PLAYER_FROM_LIST';

const initialState = [];

export default (state = initialState, action) => {
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

    case REMOVE_PLAYER_FROM_LIST: {
      const index = state.indexOf(action.id);

      return [...state.slice(0, index), ...state.slice(index + 1)];
    }

    /* istanbul ignore next  */
    default:
      return state;
  }
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

export const removePlayerFromList = (id) => ({
  type: REMOVE_PLAYER_FROM_LIST,
  id,
});
