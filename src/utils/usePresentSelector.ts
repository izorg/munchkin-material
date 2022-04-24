import { type TypedUseSelectorHook } from "react-redux";

import { type PresentState, useAppSelector } from "../store";

const usePresentSelector: TypedUseSelectorHook<PresentState> = (selector) =>
  useAppSelector((state) => selector(state.present));

export default usePresentSelector;
