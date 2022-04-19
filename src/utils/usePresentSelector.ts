import { type PresentState, useAppSelector } from "../store";

const usePresentSelector = <Data>(
  selector: (state: PresentState) => Data
): Data => useAppSelector((state) => selector(state.present));

export default usePresentSelector;
