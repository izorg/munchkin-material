import { key as id } from "../../theme/colors/munchkin";

import reducer, { initialState, setTheme } from "./index";

describe("Theme reducer", () => {
  test("should apply theme", () => {
    const payload = {
      id,
      mode: "dark",
      pureBlack: true,
    };

    const state = reducer(initialState, setTheme(payload));

    expect(state).toStrictEqual(payload);
  });
});
