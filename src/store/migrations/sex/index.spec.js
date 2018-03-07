import migrate from './index';
import state from './state.json';

test('changes gender to sex', () => {
  const id = Object.keys(state.players)[0];
  const { gender } = state.players[id];

  const { players } = migrate(state);

  expect(players[id].sex).toBe(gender);
  expect(players[id].gender).toBeUndefined();
});
