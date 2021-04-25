import { v4 as uuid } from "uuid";

import createPlayer, { defaultData } from "./createPlayer";
import { Sex } from "./types";

describe("createPlayer", () => {
  test("should create a new player", () => {
    const player = createPlayer();

    expect(player.gear).toBe(defaultData.gear);
    expect(player.sex).toBe(defaultData.sex);
    expect(player.level).toBe(defaultData.level);
  });

  test("should create a player with initial data", () => {
    const data = {
      gear: 3,
      id: uuid(),
      level: 10,
      name: "",
      sex: Sex.Female,
    };

    const player = createPlayer(data);

    expect(player).toStrictEqual(data);
  });
});
