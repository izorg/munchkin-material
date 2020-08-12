import { initialState } from '../../../ducks/ui';

export default (state) => {
  const {
    app: { menuCollapsed, selectedPlayerIds, ...app },
  } = state;

  let migratedState = state;

  if (menuCollapsed !== undefined) {
    migratedState = {
      ...migratedState,
      app,
      ui: {
        ...initialState,
        ...migratedState.ui,
        menuCollapsed,
      },
    };
  }

  if (selectedPlayerIds !== undefined) {
    migratedState = {
      ...migratedState,
      app,
      ui: {
        ...initialState,
        ...migratedState.ui,
        selectedPlayerIds,
      },
    };
  }

  return migratedState;
};
