import { expect, test } from "@jest/globals";

import availableColors from "../../../utils/availableColors";

import state from "./state.json";

import migrate from "./index";

test("player colors should be converted to tokens", () => {
  // @ts-expect-error migration data
  const { players } = migrate(state);

  Object.values(players).forEach((player) => {
    const { color } = player;

    expect([...availableColors, null, undefined].includes(color)).toBe(true);
  });
});
