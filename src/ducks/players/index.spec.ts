import { v4 as uuid } from "uuid";

import createPlayer from "../../utils/createPlayer";
import { Sex } from "../../utils/types";

import reducer, {
  addPlayer,
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  killPlayer,
  togglePlayerSex,
  updatePlayer,
} from "./index";

describe("Players reducer", () => {
  test("adds player", () => {
    const player = createPlayer({
      name: "Munchkin",
    });

    const players = reducer(undefined, addPlayer(player));

    expect(players[player.id]).toBe(player);
  });

  test("increments/decrements player level/gear", () => {
    const player = createPlayer();
    const { id } = player;

    let players = reducer({ [id]: player }, incrementPlayerLevel(id));

    expect(players[id].level).toBe(2);

    players = reducer(players, decrementPlayerLevel(id));

    expect(players[id].level).toBe(1);

    players = reducer(players, incrementPlayerGear(id));

    expect(players[id].gear).toBe(1);

    players = reducer(players, decrementPlayerGear(id));

    expect(players[id].gear).toBe(0);
  });

  test("kill player", () => {
    const id = uuid();

    const player = createPlayer({ gear: 12, id, level: 6 });

    const players = reducer({ [player.id]: player }, killPlayer(id));

    expect(players[id].gear).toBe(0);
    expect(players[id].level).toBe(6);
  });

  test("toggles sex", () => {
    const id = uuid();

    const player = createPlayer({ id, sex: Sex.Male });

    let players = reducer({ [player.id]: player }, togglePlayerSex(id));

    expect(players[id].sex).toBe(Sex.Female);

    players = reducer(players, togglePlayerSex(id));

    expect(players[id].sex).toBe(Sex.Male);
  });

  test("updates player data", () => {
    const id = uuid();

    const player = createPlayer({ id });

    const players = reducer(
      { [player.id]: player },
      updatePlayer({
        id,
        name: "Lol",
      })
    );

    expect(players[id].name).toBe("Lol");
  });
});
