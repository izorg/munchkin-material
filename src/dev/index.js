import { setLocale } from '../ducks/app';
import { addPlayerToList, removePlayerFromList } from '../ducks/playerList';
import { addPlayer, removePlayer } from '../ducks/players';
import { getLocale } from '../i18n';
import '../pwa';

import players from './players';

const { dispatch } = window.store;

const setTestData = () => {
  const { app, playerList } = window.store.getState();

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
    dispatch(setLocale(locale));
  },
  setTestData,
};
