import { addPlayerToList, removePlayerFromList } from '../ducks/playerList';
import { addPlayer, removePlayer } from '../ducks/players';
import { setLocale as setAppLocale } from '../ducks/settings';
import { getLocale } from '../i18n';
import '../pwa';

import players from './players';

const setLocale = (locale) => {
  const { dispatch } = window.reduxStore;

  dispatch(setAppLocale(locale));
};

const setTestData = () => {
  const { dispatch } = window.reduxStore;

  const { playerList, settings } = window.reduxStore.getState();

  playerList.forEach((id) => {
    dispatch(removePlayerFromList(id));
    dispatch(removePlayer(id));
  });

  const locale = settings.locale || getLocale();

  players[locale].forEach((data) => {
    dispatch(addPlayer(data.player));
    dispatch(addPlayerToList(data.player.id));
  });
};

window.munchkinDev = {
  setLocale,
  setTestData,
};
