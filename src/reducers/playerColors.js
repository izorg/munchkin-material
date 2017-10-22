import { ADD_PLAYER, REMOVE_PLAYER } from 'munchkin-core/lib/constants/actionTypes';

import getRandomMaterialColor from '../helpers/getRandomMaterialColor';

const initialState = {};

const playerColors = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      return {
        ...state,
        [action.player.id]: getRandomMaterialColor(),
      };
    }

    case REMOVE_PLAYER: {
      const { [String(action.id)]: removed, ...rest } = state;

      return rest;
    }

    default:
      return state;
  }
};

export default playerColors;
