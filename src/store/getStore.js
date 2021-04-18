import { configureStore } from "@reduxjs/toolkit";
import { createReduxEnhancer } from "@sentry/react";
import { combineReducers } from "redux";
import undoable, { includeAction } from "redux-undo";

import {
  KILL_PLAYER,
  REMOVE_PLAYERS,
  RESET_PLAYERS,
} from "../ducks/players/actionTypes";

import { loadState, saveState } from "./localStorage";
import reducers from "./reducers";

const getStore = () => {
  const createRootReducer = () =>
    undoable(combineReducers(reducers), {
      filter: includeAction([KILL_PLAYER, REMOVE_PLAYERS, RESET_PLAYERS]),
      limit: 1,
      syncFilter: true,
    });

  const preloadedState = loadState();

  const sentryReduxEnhancer = createReduxEnhancer();

  const store = configureStore({
    devTools: process.env.NODE_ENV === "development",
    enhancers: [sentryReduxEnhancer],
    preloadedState,
    reducer: createRootReducer(),
  });

  if (process.env.NODE_ENV === "development") {
    window.reduxStore = store;
  }

  let saveDate = new Date();
  let saveTimeout = 0;
  const timeout = 100;

  const saveStoreState = () => {
    const state = store.getState().present;

    saveState(state);

    saveDate = new Date();
  };

  store.subscribe(() => {
    if (new Date() - saveDate > timeout) {
      saveStoreState();
    } else if (!saveTimeout) {
      saveTimeout = setTimeout(() => {
        saveStoreState();

        saveTimeout = 0;
      }, timeout);
    }
  });

  /* istanbul ignore if  */
  if (module.hot) {
    module.hot.accept("./reducers", () =>
      store.replaceReducer(createRootReducer())
    );
  }

  return store;
};

export default getStore;
