/* istanbul ignore file */

import { type ThemeState } from "../../../ducks/theme";

type OldThemeState = {
  type: ThemeState["mode"];
} & Omit<ThemeState, "mode">;

const migrateThemeMode = (state: {
  theme: OldThemeState | ThemeState;
}): { theme: ThemeState } => {
  const { theme } = state;

  if (theme && "type" in theme) {
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

export default migrateThemeMode;
