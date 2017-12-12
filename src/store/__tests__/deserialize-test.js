import Monster from 'munchkin-core/es/classes/Monster';
import Player from 'munchkin-core/es/classes/Player';

import deserialize from '../deserialize';

const data = {
  players: {
    1: {
      id: 1,
      name: 'Ololo',
      level: 1,
      gear: 0,
    },
    2: {
      id: 2,
      name: 'Tralala',
      level: 1,
      gear: 0,
    },
    3: {
      id: 3,
      name: 'Munchkin',
      level: 1,
      gear: 0,
    },
  },
  monsters: {
    1: {
      id: 1,
      level: 10,
      bonus: 0,
    },
    2: {
      id: 2,
      level: 1,
      bonus: 10,
    },
  },
};

const serializedData = JSON.stringify(data);

/* global test, expect */
test('should use Player class', () => {
  const subset = deserialize(serializedData);

  expect(subset.players[1]).toBeInstanceOf(Player);
  expect(subset.players[2].id).toBe(2);

  expect(subset.monsters[1]).toBeInstanceOf(Monster);
  expect(subset.monsters[2].id).toBe(2);
});
