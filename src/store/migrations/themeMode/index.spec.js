import state from './state.json';

import migrate from './index';

test('theme property type should be renamed to mode', () => {
  const {
    theme: { mode },
  } = migrate(state);

  expect(mode).toBe(state.theme.type);
});
