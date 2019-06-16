import uuid from 'uuid/v4';

export const defaultData = {
  bonus: 0,
  level: 1,
};

const createMonster = (data) => ({
  id: uuid(),
  ...defaultData,
  ...data,
});

export default createMonster;
