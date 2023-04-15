import { describe, expect, test } from "@jest/globals";

import reducer, { initialState, throwDice } from "./index";

describe("Dice reducer", () => {
  test("should set random dice value", () => {
    const action = throwDice();

    const dice = reducer(initialState, action);

    expect(dice).toBeGreaterThanOrEqual(1);
    expect(dice).toBeLessThanOrEqual(6);
  });
});
