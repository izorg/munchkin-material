import reducer, { initialState, throwDice } from "./index";

describe("Dice reducer", () => {
  test("should set dice value from action", () => {
    const action = throwDice();

    const dice = reducer(initialState, action);

    expect(dice).toBe(action.payload);
  });
});
