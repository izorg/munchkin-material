import { v4 as uuid } from "uuid";

import createMonster from "../../utils/createMonster";
import { ADD_MONSTER, REMOVE_MONSTER } from "../monsters/actionTypes";
import { REMOVE_PLAYERS } from "../players/actionTypes";

import reducer, {
  setCombatHelper,
  setCombatHelperBonus,
  setCombatPlayerBonus,
  startCombat,
} from "./index";

describe("Combat reducer", () => {
  test("adds monster", () => {
    const monster = createMonster();

    const combat = reducer(undefined, {
      monster,
      type: ADD_MONSTER,
    });

    expect(combat.monsters[0]).toBe(monster.id);
  });

  test("removes monster", () => {
    const monster = createMonster();
    const { id } = monster;

    const combat = reducer(
      { monsters: [id] },
      {
        id,
        type: REMOVE_MONSTER,
      }
    );

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

    expect(
      reducer(state, { playerList: [helperId], type: REMOVE_PLAYERS })
    ).toStrictEqual({
      helperBonus: 0,
      helperId: null,
    });
  });

  test("should ignore combat unrelated player removal", () => {
    const state = { helperBonus: 2, helperId: uuid() };

    expect(reducer(state, { playerList: [uuid()], type: REMOVE_PLAYERS })).toBe(
      state
    );
  });

  test("should ignore unknown action", () => {
    const state = {};

    expect(reducer(state, {})).toBe(state);
  });
});
