import { addPlayerToList } from '../ducks/playerList';
import { addPlayer, removePlayers } from '../ducks/players';
import { setLocale as setAppLocale } from '../ducks/settings';
import { getLocale } from '../i18n';
import '../web';

import players from './players';

const setLocale = (locale) => {
  const { dispatch } = window.reduxStore;

  dispatch(setAppLocale(locale));
};

const setTestData = () => {
  const { dispatch } = window.reduxStore;

  const { playerList, settings } = window.reduxStore.getState().present;

  dispatch(removePlayers(playerList));

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
