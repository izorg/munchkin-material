import migrate from '../index';
import state from './state.json';

test('fix chtulhu to cthulhu', () => {
  const { app } = migrate(state);

  expect(app.theme).toBe('cthulhu');
});
