export default (state) => {
  const {
    app: { theme: id, ...app },
    theme,
  } = state;

  if (theme) {
    return state;
  }

  return {
    ...state,
    app,
    theme: {
      id,
      type: 'light',
    },
  };
};
