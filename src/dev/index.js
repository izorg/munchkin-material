import { addPlayer, removePlayer } from 'munchkin-core';

import { setLocale } from '../ducks/app';
import { addPlayerToList, removePlayerFromList } from '../ducks/playerList';
import { getLocale } from '../i18n';

import players from './players';

const setTestData = () => {
  const { dispatch } = window.app.store;
  const { app, playerList } = window.app.store.getState();

  playerList.forEach((id) => {
    dispatch(removePlayerFromList(id));
    dispatch(removePlayer(id));
  });

  const locale = app.locale || getLocale();

  players[locale].forEach((data) => {
    dispatch(addPlayer(data.player));
    dispatch(addPlayerToList(data.player.id));
  });
};

window.munchkinDev = {
  setLocale: (locale) => {
    const { dispatch } = window.app.store;

    dispatch(setLocale(locale));
  },
  setTestData,
};
