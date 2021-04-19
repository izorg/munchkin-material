import { v4 as uuid } from "uuid";

import createMonster from "../../utils/createMonster";
import { addMonster, removeMonster } from "../monsters";
import { removePlayers } from "../players";

import reducer, {
  finishCombat,
  initialState,
  setCombatHelper,
  setCombatHelperBonus,
  setCombatPlayerBonus,
  startCombat,
} from "./index";

describe("Combat reducer", () => {
  test("adds monster", () => {
    const combat = reducer(undefined, addMonster(createMonster()));

    expect(combat.monsters).toHaveLength(1);
  });

  test("should finish combat", () => {
    const state = reducer(initialState, finishCombat());

    expect(state.finished).toBe(true);
  });

  test("removes monster", () => {
    const monster = createMonster();
    const { id } = monster;

    const combat = reducer({ monsters: [id] }, removeMonster(id));

    expect(combat.monsters).toHaveLength(0);
  });

  test("sets player bonus", () => {
    const bonus = -3;

    const combat = reducer(undefined, setCombatPlayerBonus(bonus));

    expect(combat.playerBonus).toBe(bonus);
  });

  test("sets helper bonus", () => {
    const bonus = 3;

    const combat = reducer(undefined, setCombatHelperBonus(bonus));

    expect(combat.helperBonus).toBe(bonus);
  });

  test("sets helper id", () => {
    const id = 1;

    const combat = reducer(undefined, setCombatHelper(id));

    expect(combat.helperId).toBe(id);
  });

  test("starts combat", () => {
    const playerId = 10;

    const combat = reducer(undefined, startCombat(playerId));

    expect(combat.playerId).toBe(playerId);
    expect(combat.monsters).toHaveLength(1);
  });

  test("should remove helper on related player remove", () => {
    const helperId = uuid();

    const state = { helperBonus: 2, helperId };

    expect(reducer(state, removePlayers([helperId]))).toStrictEqual({
      helperBonus: 0,
      helperId: null,
    });
  });

  test("should ignore combat unrelated player removal", () => {
    const state = { helperBonus: 2, helperId: uuid() };

    expect(reducer(state, removePlayers([uuid()]))).toBe(state);
  });

  test("should ignore unknown action", () => {
    const state = {};

    expect(reducer(state, {})).toBe(state);
  });
});
