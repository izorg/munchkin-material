/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";

import { removePlayers } from "../players";

import { addPlayerToList, movePlayer, shufflePlayers } from "./actions";
import reducer from "./reducer";

describe("Player List reducer", () => {
  test("should add player", () => {
    const id = "1";

    const state = reducer(undefined, addPlayerToList(id));

    expect(state).toStrictEqual([id]);
  });

  test("should move player", () => {
    const state = reducer(["1", "2", "3"], movePlayer(0, 2));

    expect(state).toStrictEqual(["2", "3", "1"]);
  });

  test("should remove players", () => {
    const state = reducer(["1", "2", "3"], removePlayers(["2", "1"]));

    expect(state).toStrictEqual(["3"]);
  });

  test("should shuffle players", () => {
    const initialState = ["1", "2", "3"];

    const state = reducer(initialState, shufflePlayers());

    expect(state).not.toBe(initialState);
    expect(state).toHaveLength(initialState.length);
  });
});
