import migrate from './index';
import state from './state.json';

test('sets menuCollapsed to true by default', () => {
  const { app } = migrate(state);

  expect(app.menuCollapsed).toBe(true);
});
