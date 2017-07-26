import { GENDER, Player } from 'munchkin-core';
import { addPlayer, removePlayer } from 'munchkin-core/lib/actions';

import { setLocale } from '../actions';
import { getLocale } from '../i18n';

const setTestData = () => {
  const { dispatch } = window.store;
  const { app, playerList } = window.store.getState();

  playerList.forEach(id => dispatch(removePlayer(id)));

  switch (app.locale || getLocale()) {
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
      ].forEach(player => dispatch(addPlayer(player)));
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
      ].forEach(player => dispatch(addPlayer(player)));
      break;
    }

    default:
      break;
  }
};

window.munchkinTest = {
  setLocale: (locale) => {
    const { dispatch } = window.store;

    dispatch(setLocale(locale));
  },
  setTestData,
};
