import {
  combineReducers,
  configureStore,
  type StoreEnhancer,
} from "@reduxjs/toolkit";
import { createReduxEnhancer } from "@sentry/react";
import { useDispatch, useSelector } from "react-redux";
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

const preloadedPresentState = loadState();

const sentryReduxEnhancer = createReduxEnhancer() as StoreEnhancer;

const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  enhancers: (getDefaultEnhancers) =>
    // eslint-disable-next-line unicorn/prefer-spread -- need for correct types
    getDefaultEnhancers().concat(sentryReduxEnhancer),
  preloadedState: preloadedPresentState && {
    future: [],
    past: [],
    present: preloadedPresentState,
  },
  reducer: createRootReducer(),
});

type AppDispatch = typeof store.dispatch;

type RootState = ReturnType<typeof store.getState>;

export type PresentState = RootState["present"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

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

// eslint-disable-next-line unicorn/prefer-module -- Hot Module Replacement logic
module.hot?.accept(() => {
  store.replaceReducer(createRootReducer());
});

export default store;
