import state from './state.json';

import migrate from './index';

test('sets menuCollapsed to true by default', () => {
  const { app } = migrate(state);

  expect(app.menuCollapsed).toBe(true);
});
