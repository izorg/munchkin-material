import state from './state.json';

import migrate from './index';

test('Pure black migration should set default value if absent', () => {
  const {
    theme: { pureBlack },
  } = migrate(state);

  expect(pureBlack).toBe(false);
});
