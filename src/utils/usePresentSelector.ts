import { useSelector } from "react-redux";

import { type PresentState, type StoreState } from "../store";

const usePresentSelector = <Data>(
  selector: (state: PresentState) => Data
): Data => useSelector((state: StoreState) => selector(state.present));

export default usePresentSelector;
