/* istanbul ignore file */

import { type ThemeState } from "../../../ducks/theme";

export type OldThemeState = Omit<ThemeState, "mode"> & {
  type: ThemeState["mode"];
};

export default (state: {
  theme: OldThemeState | ThemeState;
}): { theme: ThemeState } => {
  const { theme } = state;

  if ("type" in theme) {
    const copy = { ...theme };

    delete copy.type;

    return {
      ...state,
      theme: {
        ...copy,
        mode: theme.type,
      },
    };
  }

  return state;
};
