import {
  combatReducer,
  monstersReducer,
  playersReducer,
  versionsReducer,
} from 'munchkin-core';

import app from './ducks/app';
import dice from './ducks/dice';
import playerList from './ducks/playerList';
import theme from './ducks/theme';
import undo from './ducks/undo';
import update from './ducks/update';

export default {
  app,
  combat: combatReducer,
  dice,
  monsters: monstersReducer,
  playerList,
  players: playersReducer,
  theme,
  undo,
  update,
  versions: versionsReducer,
};
