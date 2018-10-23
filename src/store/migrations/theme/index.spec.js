import migrate from './index';
import state from './state.json';

test('moves theme to separate reducer', () => {
  const id = state.app.theme;

  const { app, theme } = migrate(state);

  expect(app.theme).toBeUndefined();
  expect(theme.id).toBe(id);
  expect(theme.type).toBe('light');
});
