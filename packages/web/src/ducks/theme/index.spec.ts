import { describe, expect, test } from "@jest/globals";

import { key as id } from "../../theme/colors/munchkin";

import reducer, { initialState, setTheme, type ThemeState } from "./index";

describe("Theme reducer", () => {
  test("should apply theme", () => {
    const payload: ThemeState = {
      id,
      mode: "dark",
      pureBlack: true,
    };

    const state = reducer(initialState, setTheme(payload));

    expect(state).toStrictEqual(payload);
  });
});
