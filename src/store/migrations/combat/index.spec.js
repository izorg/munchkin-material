import state from './state.json';

import migrate from './index';

test('Combat migration should move combatFinished value from app to comabt reducer', () => {
  const { app, combat } = migrate(state);

  expect(app.combatFinished).toBe(undefined);
  expect(combat.finished).toBe(true);
});
