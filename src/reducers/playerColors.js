import { REMOVE_PLAYER } from 'munchkin-core/es/constants/actionTypes';

import { SET_PLAYER_COLOR } from '../constants/actionTypes';

const initialState = {};

const playerColors = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_PLAYER: {
      const { [String(action.id)]: removed, ...rest } = state;

      return rest;
    }

    case SET_PLAYER_COLOR: {
      return {
        ...state,
        [action.id]: action.color,
      };
    }

    /* istanbul ignore next  */
    default:
      return state;
  }
};

export default playerColors;
