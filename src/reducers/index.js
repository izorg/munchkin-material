import {
  combatReducer,
  monstersReducer,
  playersReducer,
  versionsReducer,
} from 'munchkin-core';

import app from '../ducks/app';
import playerList from '../ducks/playerList';

export default {
  app,
  combat: combatReducer,
  monsters: monstersReducer,
  playerList,
  players: playersReducer,
  versions: versionsReducer,
};
