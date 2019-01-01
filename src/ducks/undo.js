export const APPLY_UNDO = 'app/APPLY_UNDO';
export const REMOVE_UNDO = 'app/REMOVE_UNDO';
export const SET_UNDO = 'app/SET_UNDO';

export const UNDO_KILL_PLAYER = 'app/UNDO_KILL_PLAYER';
export const UNDO_RESET_PLAYERS = 'app/UNDO_RESET_PLAYERS';

const initialState = null;

export default (state, action) => {
  switch (action.type) {
    case APPLY_UNDO: {
      return initialState;
    }

    case REMOVE_UNDO: {
      return initialState;
    }

    case SET_UNDO: {
      return action.undo;
    }

    /* istanbul ignore next  */
    default:
      return initialState;
  }
};

export const applyUndo = () => ({
  type: APPLY_UNDO,
});

export const removeUndo = () => ({
  type: REMOVE_UNDO,
});

export const setUndo = (undo) => ({
  type: SET_UNDO,
  undo,
});
