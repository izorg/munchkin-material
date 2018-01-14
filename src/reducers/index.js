import * as reducers from 'munchkin-core/es/reducers';

import app from './app';
import playerColors from './playerColors';
import playerList from './playerList';

export default {
  ...reducers,
  app,
  playerColors,
  playerList,
};
