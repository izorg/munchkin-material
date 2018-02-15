import { key as theme } from '../../../styles/themes/munchkin';

export default (state) => {
  const { app } = state;

  if (!app.theme) {
    return {
      ...state,
      app: {
        ...app,
        theme,
      },
    };
  }

  return state;
};
