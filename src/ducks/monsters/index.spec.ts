import createMonster from "../../utils/createMonster";
import { startCombat } from "../combat";

import {
  addMonster,
  decrementMonsterBonus,
  decrementMonsterLevel,
  incrementMonsterBonus,
  incrementMonsterLevel,
  removeMonster,
} from "./actions";

import reducer from "./index";

describe("Monsters reducer", () => {
  test("adds monster", () => {
    const monster = createMonster();

    const monsters = reducer(undefined, addMonster(monster));

    expect(monsters[monster.id]).toBe(monster);
  });

  test("decrements/increments bonus/level", () => {
    const monster = createMonster();
    const { id } = monster;

    let monsters = reducer({ [id]: monster }, incrementMonsterLevel(id));

    expect(monsters[id].level).toBe(2);

    monsters = reducer(monsters, decrementMonsterLevel(id));

    expect(monsters[id].level).toBe(1);

    monsters = reducer(monsters, incrementMonsterBonus(id));

    expect(monsters[id].bonus).toBe(1);

    monsters = reducer(monsters, decrementMonsterBonus(id));

    expect(monsters[id].bonus).toBe(0);
  });

  test("removes monster", () => {
    const monster = createMonster();
    const { id } = monster;

    const monsters = reducer({ [monster.id]: monster }, removeMonster(id));

    expect(monsters[id]).toBeUndefined();
  });

  test("starts combat", () => {
    const monsters = reducer(undefined, startCombat("1"));

    expect(Object.values(monsters)).toHaveLength(1);
  });
});
