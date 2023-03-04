import { compose, type StateFromReducersMapObject } from "redux";

import migrations from "./migrations";
import reducers from "./reducers";

const key = "redux";

type State = StateFromReducersMapObject<typeof reducers>;

export const loadState = ():
  | StateFromReducersMapObject<typeof reducers>
  | undefined => {
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

  return compose(...migrations)(JSON.parse(serializedState)) as State;
};

export const saveState = (state: State): void => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.warn("Can't save state to localStorage");
  }
};
