import {
  combineReducers,
  configureStore,
  StoreEnhancer,
} from "@reduxjs/toolkit";
import { createReduxEnhancer } from "@sentry/react";
import undoable, { includeAction } from "redux-undo";

import { killPlayer, removePlayers, resetPlayers } from "../ducks/players";

import { loadState, saveState } from "./localStorage";
import reducers from "./reducers";

const createRootReducer = () =>
  undoable(combineReducers(reducers), {
    filter: includeAction([
      killPlayer.type,
      removePlayers.type,
      resetPlayers.type,
    ]),
    limit: 1,
    syncFilter: true,
  });

type StoreState = ReturnType<ReturnType<typeof createRootReducer>>;

export type StorePresentState = ReturnType<
  ReturnType<typeof createRootReducer>
>["present"];

const preloadedState = loadState() as StoreState["present"];

const sentryReduxEnhancer = createReduxEnhancer() as StoreEnhancer;

const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  enhancers: [sentryReduxEnhancer],
  preloadedState: {
    future: [],
    past: [],
    present: preloadedState,
  },
  reducer: createRootReducer(),
});

if (process.env.NODE_ENV === "development") {
  window.reduxStore = store;
}

let saveDate = Date.now();
let saveTimeout = 0;
const timeout = 100;

const saveStoreState = () => {
  const state = store.getState().present;

  saveState(state);

  saveDate = Date.now();
};

store.subscribe(() => {
  if (Date.now() - saveDate > timeout) {
    saveStoreState();
  } else if (!saveTimeout) {
    saveTimeout = window.setTimeout(() => {
      saveStoreState();

      saveTimeout = 0;
    }, timeout);
  }
});

(module as __WebpackModuleApi.Module).hot?.accept("./reducers", () =>
  store.replaceReducer(createRootReducer())
);

export default store;
