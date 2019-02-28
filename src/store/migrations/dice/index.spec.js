import migrate from './index';
import state from './state.json';

test('moves dice to separate reducer', () => {
  const { app, dice } = migrate(state);

  expect(app.dice).toBeUndefined();
  expect(dice).toBe(state.app.dice);
});
