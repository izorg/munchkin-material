import { compose } from "redux";

import migrations from "./migrations";

import { StorePresentState } from "./index";

const key = "redux";

export const loadState = (): StorePresentState | undefined => {
  let serializedState;

  try {
    serializedState = localStorage.getItem(key);
  } catch (error) {
    console.warn("Can't load state from localStorage");

    return undefined;
  }

  if (serializedState === null) {
    return undefined;
  }

  return compose(...migrations)(
    JSON.parse(serializedState)
  ) as StorePresentState;
};

export const saveState = (state: StorePresentState): void => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.warn("Can't save state to localStorage");
  }
};
