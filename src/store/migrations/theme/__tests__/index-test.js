import { key } from '../../../../styles/themes/munchkin';

import migrate from '../index';
import state from './state.json';

test('migrates adds default theme', () => {
  const { app } = migrate(state);

  expect(app.theme).toBe(key);
});
