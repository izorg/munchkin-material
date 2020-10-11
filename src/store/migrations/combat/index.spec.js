import state from './state.json';

import migrate from './index';

test('combat migration should move combatFinished value from app to comabt reducer', () => {
  const { app, combat } = migrate(state);

  expect(app.combatFinished).toBeUndefined();
  expect(combat.finished).toBe(true);
});
