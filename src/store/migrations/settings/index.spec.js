import state from "./state.json";

import migrate from "./index";

test("settings migration should move from app", () => {
  const { settings } = migrate(state);

  expect(settings).toBe(state.app);
});
