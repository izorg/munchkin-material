import state from './state.json';

import migrate from './index';

test('moves dice to separate reducer', () => {
  const { app, dice } = migrate(state);

  expect(app.dice).toBeUndefined();
  expect(dice).toBe(state.app.dice);
});
