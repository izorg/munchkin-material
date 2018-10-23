import {
  combatReducer,
  monstersReducer,
  playersReducer,
  versionsReducer,
} from 'munchkin-core';

import app from '../ducks/app';
import playerList from '../ducks/playerList';
import theme from '../ducks/theme';
import update from '../ducks/update';

export default {
  app,
  combat: combatReducer,
  monsters: monstersReducer,
  playerList,
  players: playersReducer,
  theme,
  update,
  versions: versionsReducer,
};
