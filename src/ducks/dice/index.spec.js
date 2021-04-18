import reducer, { throwDice } from "./index";

describe("Dice reducer", () => {
  test("should set dice value from action", () => {
    const action = throwDice();

    const dice = reducer(null, action);

    expect(dice).toBe(action.payload);
  });
});
