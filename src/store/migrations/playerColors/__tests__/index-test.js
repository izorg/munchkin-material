import state from './state.json';

import migrate from '../index';

test('migrates player colors', () => {
  const { playerColors, players } = migrate(state);

  const id = state.playerList[1];

  expect(playerColors).toBeUndefined();
  expect(players[id].color).toBe(state.playerColors[id]);
});
