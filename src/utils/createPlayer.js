import { v4 as uuid } from 'uuid';

import { MALE } from './sex';

export const defaultData = {
  gear: 0,
  sex: MALE,
  level: 1,
};

const createPlayer = (data) => ({
  id: uuid(),
  ...defaultData,
  ...data,
});

export default createPlayer;
