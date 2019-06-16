import state from './state.json';

import migrate from './index';

test('removes versions from state', () => {
  const { versions, ...rest } = migrate(state);

  expect(versions).toBeUndefined();
  expect(rest).toEqual({});
});
