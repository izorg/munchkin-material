import {
  combatReducer,
  monstersReducer,
  playersReducer,
  versionsReducer,
} from 'munchkin-core';

import app from '../ducks/app';
import playerList from '../ducks/playerList';
import update from '../ducks/update';

export default {
  app,
  combat: combatReducer,
  monsters: monstersReducer,
  playerList,
  players: playersReducer,
  update,
  versions: versionsReducer,
};
