import { GENDER, Player } from 'munchkin';

import actions from './actions';
import { getLocale } from './i18n';

window.setTestData = () => {
  const { dispatch } = window.store;
  const { players } = window.store.getState();

  players.forEach(({ id }) => dispatch(actions.removePlayer(id)));

  switch (getLocale()) {
    case 'en': {
      [
        new Player({
          gear: 13,
          level: 3,
          name: 'Barack Obama',
        }),
        new Player({
          gear: 20,
          level: 5,
          name: 'Donald Trump',
        }),
      ].forEach(player => dispatch(actions.addPlayer(player)));
      break;
    }

    case 'ru': {
      [
        new Player({
          gear: 30,
          level: 3,
          name: 'Илья Муромец',
        }),
        new Player({
          gear: 13,
          level: 6,
          name: 'Соловей Разбойник',
        }),
        new Player({
          gear: 7,
          gender: GENDER.FEMALE,
          level: 8,
          name: 'Василиса Премудрая',
        }),
      ].forEach(player => dispatch(actions.addPlayer(player)));
      break;
    }

    default:
      break;
  }
};
