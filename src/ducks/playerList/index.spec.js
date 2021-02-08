import {
  ADD_PLAYER_TO_LIST,
  MOVE_PLAYER,
  SHUFFLE_PLAYERS,
} from "./actionTypes";

import reducer from "./index";

describe("Player List reducer", () => {
  test("should add player", () => {
    let playerList = reducer(undefined, {
      id: 1,
      type: ADD_PLAYER_TO_LIST,
    });

    expect(playerList[0]).toStrictEqual(1);

    playerList = reducer(playerList, {
      id: 2,
      type: ADD_PLAYER_TO_LIST,
    });

    expect(playerList[1]).toStrictEqual(2);
  });

  test("should move player", () => {
    const playerList = reducer([1, 2, 3], {
      newPosition: 2,
      oldPosition: 0,
      type: MOVE_PLAYER,
    });

    expect(playerList).toStrictEqual([2, 3, 1]);
  });

  test("should shuffle players", () => {
    const state = [1, 2, 3];

    const playerList = reducer([1, 2, 3], {
      type: SHUFFLE_PLAYERS,
    });

    expect(playerList).not.toBe(state);
    expect(playerList).toHaveLength(state.length);
  });
});
