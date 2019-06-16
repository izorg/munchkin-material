import uuid from 'uuid/v4';

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
