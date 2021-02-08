import reducer, { THROW_DICE } from "./index";

describe("Dice reducer", () => {
  test("should set dice value from action", () => {
    const dice = reducer(undefined, {
      dice: 1,
      type: THROW_DICE,
    });

    expect(dice).toBe(1);
  });
});
