import { ActionCreators } from "redux-undo";

import { addPlayerToList } from "../ducks/playerList";
import { addPlayer, removePlayers } from "../ducks/players";
import { setLocale as setAppLocale } from "../ducks/settings";
import { getLocale, isSupportedLocale } from "../i18n";
import store from "../store";

import players from "./players";

const setLocale = (locale: string) => {
  if (isSupportedLocale(locale)) {
    store.dispatch(setAppLocale(locale));
  } else {
    // @ts-expect-error auto locale select
    store.dispatch(setAppLocale());
  }
};

const setTestData = () => {
  const { playerList, settings } = store.getState().present;

  store.dispatch(removePlayers(playerList));
  store.dispatch(ActionCreators.clearHistory());

  const locale = settings.locale || getLocale();

  const localePlayers = Object.entries(players).find(
    ([key]) => key === locale,
  )?.[1];

  if (localePlayers) {
    for (const player of localePlayers) {
      store.dispatch(addPlayer(player));
      store.dispatch(addPlayerToList(player.id));
    }
  }
};

window.munchkinDev = {
  setLocale,
  setTestData,
};
