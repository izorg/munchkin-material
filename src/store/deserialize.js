import Monster from 'munchkin-core/es/classes/Monster';
import Player from 'munchkin-core/es/classes/Player';

export default (serializedData) => {
  const subset = JSON.parse(serializedData);

  if (subset) {
    if (subset.monsters) {
      Object.values(subset.monsters).forEach((monster) => {
        subset.monsters[monster.id] = new Monster(monster);
      });
    }

    if (subset.players) {
      Object.values(subset.players).forEach((player) => {
        subset.players[player.id] = new Player(player);
      });
    }

    return subset;
  }

  return serializedData;
};
