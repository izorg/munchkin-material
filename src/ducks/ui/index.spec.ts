import { v4 as uuid } from "uuid";

import reducer, {
  initialState,
  togglePlayer,
  unselectAllPlayers,
} from "./index";

describe("UI reducer", () => {
  test("should include player in selected", () => {
    const id = uuid();

    const state = reducer(initialState, togglePlayer(id));

    expect(state.selectedPlayerIds).toContain(id);
  });

  test("should exclude player from selected", () => {
    const id = uuid();

    const state = reducer(
      {
        ...initialState,
        selectedPlayerIds: [id],
      },
      togglePlayer(id)
    );

    expect(state.selectedPlayerIds).not.toContain(id);
  });

  test("should unselect all players", () => {
    const state = reducer(
      {
        ...initialState,
        selectedPlayerIds: [uuid(), uuid(), uuid()],
      },
      unselectAllPlayers()
    );

    expect(state.selectedPlayerIds).toHaveLength(0);
  });
});
