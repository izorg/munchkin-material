import state from "./state.json";

import migrate from "./index";

test("uI migration should move menuCollapsed value from app to ui reducer", () => {
  const { app, ui } = migrate(state);

  expect(app.menuCollapsed).toBeUndefined();
  expect(ui.menuCollapsed).toBe(state.app.menuCollapsed);
});

test("uI migration should move selectedPlayerIds value from app to ui reducer", () => {
  const { app, ui } = migrate(state);

  expect(app.selectedPlayerIds).toBeUndefined();
  expect(ui.selectedPlayerIds).toBe(state.app.selectedPlayerIds);
});
