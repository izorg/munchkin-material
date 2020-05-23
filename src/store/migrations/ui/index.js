import { initialState } from '../../../ducks/ui';

export default (state) => {
  const {
    app: { menuCollapsed, ...app },
    ui,
  } = state;

  if (menuCollapsed !== undefined) {
    return {
      ...state,
      app,
      ui: {
        ...initialState,
        ...ui,
        menuCollapsed,
      },
    };
  }

  return state;
};
