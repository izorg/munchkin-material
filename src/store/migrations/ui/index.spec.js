import state from './state.json';

import migrate from './index';

test('UI migration should move menuCollapsed value from app to ui reducer', () => {
  const { app, ui } = migrate(state);

  expect(app.menuCollapsed).toBe(undefined);
  expect(ui.menuCollapsed).toBe(state.app.menuCollapsed);
});

test('UI migration should move selectedPlayerIds value from app to ui reducer', () => {
  const { app, ui } = migrate(state);

  expect(app.selectedPlayerIds).toBe(undefined);
  expect(ui.selectedPlayerIds).toBe(state.app.selectedPlayerIds);
});
