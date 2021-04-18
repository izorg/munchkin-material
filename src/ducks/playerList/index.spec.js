import reducer, {
  addPlayerToList,
  initialState,
  movePlayer,
  shufflePlayers,
} from "./index";

describe("Player List reducer", () => {
  test("should add player", () => {
    const id = "1";

    const state = reducer(initialState, addPlayerToList(id));

    expect(state).toStrictEqual([id]);
  });

  test("should move player", () => {
    const state = reducer([1, 2, 3], movePlayer(0, 2));

    expect(state).toStrictEqual([2, 3, 1]);
  });

  test("should shuffle players", () => {
    const state = [1, 2, 3];

    const playerList = reducer([1, 2, 3], shufflePlayers());

    expect(playerList).not.toBe(state);
    expect(playerList).toHaveLength(state.length);
  });
});
