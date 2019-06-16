import uuid from 'uuid/v4';

import createMonster, { defaultData } from './createMonster';

describe('createMonster', () => {
  test('should create a new monster', () => {
    const monster = createMonster();

    expect(monster.bonus).toBe(defaultData.bonus);
    expect(monster.level).toBe(defaultData.level);
  });

  test('should create a monster with initial data', () => {
    const data = {
      bonus: 3,
      id: uuid(),
      level: 10,
    };

    const monster = createMonster(data);

    expect(monster).toEqual(data);
  });
});
