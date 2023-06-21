import { expect, test } from "@jest/globals";

import availableColors from "../../../utils/availableColors";

import state from "./state.json";

import migrate from "./index";

test("player colors should be converted to tokens", () => {
  // @ts-expect-error migration data
  const { players } = migrate(state);

  for (const player of Object.values(players)) {
    const { color } = player;

    expect([null, ...availableColors, undefined].includes(color)).toBe(true);
  }
});
