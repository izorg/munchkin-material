import state from './state.json';

import migrate from './index';

test('Settings migration should move from app', () => {
  const { settings } = migrate(state);

  expect(settings).toBe(state.app);
});
