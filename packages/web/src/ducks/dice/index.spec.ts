/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";

import reducer, { initialState, throwDice } from "./index";

describe("Dice reducer", () => {
  test("should set random dice value", () => {
    const dice = reducer(initialState, throwDice());

    expect(dice).not.toBeNull();
    expect(dice).toBeGreaterThanOrEqual(1);
    expect(dice).toBeLessThanOrEqual(6);
  });
});
