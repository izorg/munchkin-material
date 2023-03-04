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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.dispatch(setAppLocale());
  }
};

const setTestData = () => {
  const { playerList, settings } = store.getState().present;

  store.dispatch(removePlayers(playerList));
  store.dispatch(ActionCreators.clearHistory());

  const locale = settings.locale || getLocale();

  Object.entries(players)
    .find(([key]) => key === locale)?.[1]
    .forEach((data) => {
      store.dispatch(addPlayer(data.player));
      store.dispatch(addPlayerToList(data.player.id));
    });
};

window.munchkinDev = {
  setLocale,
  setTestData,
};
